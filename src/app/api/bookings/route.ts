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
import { processBookingAction } from '@/lib/bookingProcessor';

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

        // Normalize legs
        const legs = bookingData.legs && bookingData.legs.length > 0 
            ? bookingData.legs 
            : (bookingData.routeId ? [{
                routeId: bookingData.routeId,
                pickup: bookingData.pickup || '',
                dropoff: bookingData.dropoff || '',
                date: bookingData.date || '',
                time: bookingData.time || '',
                flightNumber: bookingData.flightNumber
            }] : []);

        const hasCustomRoute = legs.some((leg: any) => leg.routeId === 'custom');

        if (legs.length > 0 && !hasCustomRoute && vehiclesToProcess.length > 0) {
            try {
                console.log(`[Booking ${requestId}] Calculating price for ${legs.length} routes...`);
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

                let totalBasePrice = 0;
                const vehicleNames: string[] = [];
                let vehiclesUnavailable = false;
                let unavailableMessage = '';

                for (const sv of vehiclesToProcess) {
                    const vehicle = (vehicles as any[]).find(v => v.id === sv.vehicleId);
                    if (vehicle) {
                        selectedVehiclesList.push({ name: vehicle.name, quantity: sv.quantity });
                        vehicleNames.push(`${sv.quantity} x ${vehicle.name}`);
                    }
                }

                for (const leg of legs) {
                    const route = (routes as RouteWithPrices[]).find(r => r.id === leg.routeId);
                    let legPrice = 0;

                    for (const sv of vehiclesToProcess) {
                        const vehicle = (vehicles as any[]).find(v => v.id === sv.vehicleId);
                        if (vehicle) {
                            if (leg.date && vehicle.unavailableDates?.includes(leg.date)) {
                                vehiclesUnavailable = true;
                                unavailableMessage = `${vehicle.name} is unavailable on ${leg.date}. Please choose a different date or vehicle.`;
                                break;
                            }
                            if (route) {
                                const priceEntry = (route as any).prices?.find((p: any) => p.vehicleId === sv.vehicleId);
                                if (priceEntry) legPrice += priceEntry.price * sv.quantity;
                            }
                        }
                    }
                    if (vehiclesUnavailable) break;
                    
                    const isHourly = route?.name?.toLowerCase().includes('hourly') || (route as any)?.origin?.toLowerCase().includes('hourly');
                    if (isHourly && leg.hours) {
                        legPrice = legPrice * leg.hours;
                    }

                    leg.price = legPrice;
                    totalBasePrice += legPrice;
                }

                if (vehiclesUnavailable) {
                    return NextResponse.json(
                        { success: false, message: unavailableMessage },
                        { status: 409 }
                    );
                }

                bookingData.legs = legs;

                if (totalBasePrice > 0) {
                    let { price, originalPrice, discountApplied, discountType } = calculateFinalPrice(totalBasePrice, settings.discount);
                    
                    if (legs.length >= 3) {
                        const multiLegDiscount = price * 0.05;
                        price = Math.round(price - multiLegDiscount);
                        discountApplied = (discountApplied || 0) + multiLegDiscount;
                        discountType = discountType ? 'mixed' : 'percentage';
                        console.log(`[Booking ${requestId}] Applied 5% multi-leg discount for 3+ rides.`);
                    }

                    let displayPrice = String(price) + ' SAR';
                    if (bookingData.currency === 'USD') {
                        const exchangeRate = rawSettingsMap['exchange_rate'] ? parseFloat(rawSettingsMap['exchange_rate']) : 3.75;
                        const usdAmount = Math.round(price / exchangeRate);
                        displayPrice = `$${usdAmount}`;
                    } else {
                        displayPrice = `${price} SAR`;
                    }

                    priceDetails = { originalPrice, discountApplied, finalPrice: price, discountType, price: displayPrice };
                    console.log(`[Booking ${requestId}] Price calculated: ${displayPrice}`);
                }

                if (vehicleNames.length > 0) {
                    bookingData.vehicle = vehicleNames.join(', ');
                }
            } catch (priceErr) {
                console.warn(`[Booking ${requestId}] ⚠️ Price calculation failed (non-fatal):`, priceErr);
            }
        } else if (hasCustomRoute) {
            console.log(`[Booking ${requestId}] Custom route detected. Forcing "Pending Quote" state.`);
            priceDetails = { price: 'Pending Quote' };
            bookingData.price = 'Pending Quote';
            bookingData.legs = legs;
        } else {
            bookingData.legs = legs;
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

        // ── 6. Execute Post-Booking Tasks (Direct await to guarantee execution on Vercel) ──
        const bookingId = (savedBooking._id || savedBooking.id || '').toString();
        
        console.log(`[Booking ${requestId}] Executing post-booking tasks (PDF, Email, Pusher) for ID: ${bookingId}...`);
        
        try {
            const processResult = await processBookingAction(bookingId);
            if (processResult.success) {
                console.log(`[Booking ${requestId}] ✅ Post-booking tasks completed successfully for ID: ${bookingId}`);
            } else {
                console.error(`[Booking ${requestId}] ❌ Post-booking tasks failed: ${processResult.error}`);
            }
        } catch (jobErr: any) {
            console.error(`[Booking ${requestId}] ❌ Failed to execute post-booking tasks:`, jobErr.message || jobErr);
        }

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
