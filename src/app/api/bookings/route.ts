import { NextResponse } from 'next/server';
import { requireRole } from '@/lib/server-auth';
import { getBookings, addBooking } from '@/lib/db';
import { BookingSchema } from '@/lib/validations';
import { getSettings } from '@/lib/settings-storage';
import { settingsService } from '@/services/settingsService';
import { routeService, RouteWithPrices } from '@/services/routeService';
import { vehicleService } from '@/services/vehicleService';
import { calculateFinalPrice } from '@/lib/pricing';
import { rateLimit } from '@/lib/rate-limit';

const RATE_LIMIT_INTERVAL = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 bookings per 10 minutes per IP

export async function GET() {
    try {
        if (!await requireRole(['ADMIN', 'MANAGER', 'OPERATIONAL_MANAGER'])) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const bookings = await getBookings();
        return NextResponse.json(bookings);
    } catch (error) {
        console.error('[Booking GET] Error fetching bookings:', error);
        return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const requestId = Date.now().toString(36).toUpperCase();
    console.log(`\n========== [Booking ${requestId}] NEW REQUEST ==========`);

    try {
        // ── 0. Rate Limiting ─────────────────────────────────────────────
        let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown-ip';
        if (ip.includes(',')) ip = ip.split(',')[0].trim();
        
        const rateLimitResult = await rateLimit(ip, { 
            interval: RATE_LIMIT_INTERVAL, 
            limit: RATE_LIMIT_MAX_REQUESTS, 
            endpoint: 'bookings_post' 
        });

        if (!rateLimitResult.success) {
            console.warn(`[Booking ${requestId}] 🛑 Rate limit exceeded for IP: ${ip}`);
            return NextResponse.json(
                { success: false, message: 'You have submitted too many bookings recently. Please try again later or contact us via WhatsApp.' },
                { status: 429 }
            );
        }

        // ── 1. Parse body ────────────────────────────────────────────────
        let body: any;
        try {
            body = await request.json();
            console.log(`[Booking ${requestId}] Body parsed. Fields:`, Object.keys(body).join(', '));
        } catch (e) {
            console.error(`[Booking ${requestId}] Failed to parse request body:`, e);
            return NextResponse.json({ success: false, message: 'Invalid request body – could not parse JSON.' }, { status: 400 });
        }

        // ── 2. Zod Validation ────────────────────────────────────────────
        const validation = BookingSchema.safeParse(body);
        if (!validation.success) {
            const formattedErrors = validation.error.format();
            const errorSummary = Object.entries(formattedErrors)
                .filter(([k, v]) => k !== '_errors' && typeof v === 'object' && (v as any)._errors?.length)
                .map(([k, v]) => `${k}: ${(v as any)._errors.join(', ')}`)
                .join(' | ');
            console.error(`[Booking ${requestId}] ❌ Validation failed: ${errorSummary}`);
            return NextResponse.json(
                { success: false, message: 'Some fields are invalid. Please check your details.', errors: formattedErrors },
                { status: 400 }
            );
        }
        console.log(`[Booking ${requestId}] ✅ Validation passed`);
        const bookingData = validation.data;

        // ── 3. Price calculation ─────────────────────────────────────────
        let priceDetails: Record<string, any> = {};
        const selectedVehiclesList: { name: string; quantity: number }[] = [];

        let vehiclesToProcess: { vehicleId: string; quantity: number }[] = [];
        if (bookingData.selectedVehicles && bookingData.selectedVehicles.length > 0) {
            vehiclesToProcess = bookingData.selectedVehicles.map(sv => ({ vehicleId: sv.vehicleId, quantity: sv.quantity }));
        } else if (bookingData.vehicleId) {
            vehiclesToProcess = [{ vehicleId: bookingData.vehicleId, quantity: bookingData.vehicleCount || 1 }];
        }

        if (bookingData.routeId && bookingData.routeId !== 'custom' && vehiclesToProcess.length > 0) {
            try {
                console.log(`[Booking ${requestId}] Calculating price for route ${bookingData.routeId}...`);
                const [routes, vehicles, settings, rawSettingsArr] = await Promise.all([
                    routeService.getRoutes(),
                    vehicleService.getVehicles(),
                    getSettings(),
                    settingsService.getSettings()
                ]);

                const rawSettingsMap = (rawSettingsArr as any[]).reduce((acc: Record<string, string>, curr: any) => {
                    acc[curr.key] = curr.value;
                    return acc;
                }, {} as Record<string, string>);

                const route = (routes as RouteWithPrices[]).find(r => r.id === bookingData.routeId);
                let totalBasePrice = 0;
                const vehicleNames: string[] = [];

                for (const sv of vehiclesToProcess) {
                    const vehicle = (vehicles as any[]).find(v => v.id === sv.vehicleId);
                    if (vehicle) {
                        if (bookingData.date && vehicle.unavailableDates?.includes(bookingData.date)) {
                            return NextResponse.json(
                                { success: false, message: `${vehicle.name} is unavailable on ${bookingData.date}. Please choose a different date or vehicle.` },
                                { status: 409 }
                            );
                        }
                        selectedVehiclesList.push({ name: vehicle.name, quantity: sv.quantity });
                        vehicleNames.push(`${sv.quantity} x ${vehicle.name}`);

                        if (route) {
                            const priceEntry = (route as any).prices?.find((p: any) => p.vehicleId === sv.vehicleId);
                            if (priceEntry) totalBasePrice += priceEntry.price * sv.quantity;
                        }
                    }
                }

                if (totalBasePrice > 0) {
                    const { price, originalPrice, discountApplied, discountType } = calculateFinalPrice(totalBasePrice, settings.discount);
                    
                    let displayPrice = String(price) + ' SAR';
                    if (bookingData.currency === 'USD') {
                        const exchangeRate = rawSettingsMap['exchange_rate'] ? parseFloat(rawSettingsMap['exchange_rate']) : 3.75;
                        const usdAmount = Math.round(price / exchangeRate);
                        displayPrice = `$${usdAmount}`;
                    } else {
                        // Force SAR display for any unknown currency to prevent display price spoofing
                        displayPrice = `${price} SAR`;
                    }

                    priceDetails = { originalPrice, discountApplied, finalPrice: price, discountType, price: displayPrice };
                    console.log(`[Booking ${requestId}] Price calculated: ${displayPrice}`);
                }

                if (vehicleNames.length > 0) {
                    bookingData.vehicle = vehicleNames.join(', ');
                }
            } catch (priceErr) {
                // Non-fatal: log and continue — price can be set manually by admin
                console.warn(`[Booking ${requestId}] ⚠️ Price calculation failed (non-fatal):`, priceErr);
            }
        } else if (bookingData.routeId === 'custom') {
            // Prevent price tampering for custom routes
            console.log(`[Booking ${requestId}] Custom route detected. Forcing "Pending Quote" state.`);
            priceDetails = { price: 'Pending Quote' };
            bookingData.price = 'Pending Quote';
        }

        // ── 4. Get optional user ID ──────────────────────────────────────
        let userId: string | undefined;
        try {
            const { verifyToken } = await import('@/lib/auth-utils');
            const { cookies } = await import('next/headers');
            const cookieStore = await cookies();
            const token = cookieStore.get('admin_token')?.value;
            if (token) {
                const decoded = await verifyToken(token);
                if (decoded?.userId) userId = decoded.userId as string;
            }
        } catch {
            // Guest booking — expected
        }

        // ── 5. SAVE to database ──────────────────────────────────────────
        console.log(`[Booking ${requestId}] Saving booking to database...`);
        let savedBooking: any;
        try {
            savedBooking = await addBooking({
                ...bookingData,
                ...priceDetails,
                status: 'pending',
                paymentStatus: 'unpaid',
                userId,
                selectedVehicles: selectedVehiclesList.map((sv, i) => ({
                    vehicleId: vehiclesToProcess[i]?.vehicleId || '',
                    quantity: sv.quantity,
                    name: sv.name,
                })),
            } as any);
            console.log(`[Booking ${requestId}] ✅ Booking SAVED. ID: ${savedBooking._id || savedBooking.id}`);
        } catch (dbErr: any) {
            console.error(`[Booking ${requestId}] ❌ DATABASE SAVE FAILED:`, dbErr.message);
            // Check for specific MongoDB errors
            if (dbErr.name === 'MongoNetworkError' || dbErr.message?.includes('ECONNREFUSED') || dbErr.message?.includes('querySrv')) {
                return NextResponse.json(
                    { success: false, message: 'We are experiencing a temporary database issue. Please try again in a moment or contact us via WhatsApp.' },
                    { status: 503 }
                );
            }
            return NextResponse.json(
                { success: false, message: 'Failed to save your booking. Please try again or contact us via WhatsApp.' },
                { status: 500 }
            );
        }

        // ── 6. Trigger Background Job (Fast/Fire-and-forget) ──────────────
        const bookingId = (savedBooking._id || savedBooking.id || '').toString();
        
        console.log(`[Booking ${requestId}] Triggering background job for PDF & Emails...`);
        
        try {
            const protocol = request.headers.get('x-forwarded-proto') || 'http';
            const host = request.headers.get('host');
            // If host is available, trigger the background job via an internal fetch
            if (host) {
                const baseUrl = `${protocol}://${host}`;
                fetch(`${baseUrl}/api/jobs/process-booking`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ bookingId }),
                    // Next.js specific: don't cache this request
                    cache: 'no-store'
                }).catch(err => console.error(`[Booking ${requestId}] Background job fetch failed:`, err));
            }
        } catch (jobErr) {
            console.error(`[Booking ${requestId}] Failed to dispatch background job:`, jobErr);
        }

        // We do NOT await the email or PDF generation!
        console.log(`[Booking ${requestId}] Post-save tasks dispatched to background.`);

        // ── 7. Return success ─────────────────────────────────────────────
        console.log(`[Booking ${requestId}] ✅ Returning success response`);
        console.log(`==========================================================\n`);

        const shortId = bookingId.slice(-8).toUpperCase();

        return NextResponse.json({
            success: true,
            message: 'Booking confirmed. PDF receipt sent to your email.',
            bookingId: shortId,   // Human-readable ref e.g. "AK-2026-XXXX"
            bookingRef: shortId,
            _id: bookingId,
            id: bookingId,
            ...savedBooking,
        });

    } catch (error: any) {
        console.error(`[Booking ${requestId}] ❌ UNHANDLED ERROR:`, error.message, error.stack);
        return NextResponse.json(
            { success: false, message: 'An unexpected error occurred. Please try again or contact us via WhatsApp.' },
            { status: 500 }
        );
    }
}
