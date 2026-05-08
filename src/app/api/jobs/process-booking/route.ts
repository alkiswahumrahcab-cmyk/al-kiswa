import { NextResponse } from 'next/server';
import { getBookings } from '@/lib/db';
import { generateBookingPDF } from '@/lib/pdfGenerator';
import { sendBookingConfirmationEmail, sendAdminNewBookingEmail } from '@/lib/email';
import { pusherServer } from '@/lib/pusher';

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ success: false, error: 'Missing bookingId' }, { status: 400 });
        }

        console.log(`[Job Process] Background job started for booking ${bookingId}`);

        // 1. Fetch the booking from the database
        const bookings = await getBookings();
        const booking = bookings.find((b: any) => (b._id || b.id || '').toString() === bookingId);

        if (!booking) {
            console.error(`[Job Process] Booking ${bookingId} not found`);
            return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 });
        }

        // 2. Generate PDF Buffer
        console.log(`[Job Process] Generating PDF...`);
        let pdfBuffer: Buffer | undefined;
        try {
            pdfBuffer = await generateBookingPDF(booking);
            console.log(`[Job Process] PDF Generated successfully. Size: ${pdfBuffer.length} bytes`);
        } catch (pdfErr) {
            console.error(`[Job Process] PDF generation failed:`, pdfErr);
        }

        // 3. Prepare Email Data
        const shortId = bookingId.slice(-8).toUpperCase();
        const emailData = {
            name: booking.name,
            email: booking.email,
            status: booking.status || 'pending',
            id: shortId,
            vehicle: booking.vehicle || 'Custom Booking',
            pickup: booking.pickup,
            dropoff: booking.dropoff,
            date: booking.date,
            time: booking.time,
            passengers: booking.passengers || 1,
            vehicleCount: booking.vehicleCount || 1,
            luggage: booking.luggage || 0,
            notes: booking.notes,
            price: booking.price || (booking.finalPrice ? `${booking.finalPrice} SAR` : undefined),
            selectedVehicles: booking.selectedVehicles || [],
            country: booking.country,
            flightNumber: booking.flightNumber,
            arrivalDate: booking.arrivalDate,
            phone: booking.phone,
            pdfBuffer // We pass this buffer to the email service
        };

        // 4. Send Emails
        console.log(`[Job Process] Dispatching emails for ${shortId}...`);
        await Promise.allSettled([
            (async () => {
                if (!emailData.email) return;
                try {
                    await sendBookingConfirmationEmail(emailData);
                    console.log(`[Job Process] Customer email sent`);
                } catch (e) {
                    console.error(`[Job Process] Customer email failed:`, e);
                }
            })(),
            (async () => {
                try {
                    await sendAdminNewBookingEmail(emailData);
                    console.log(`[Job Process] Admin email sent`);
                } catch (e) {
                    console.error(`[Job Process] Admin email failed:`, e);
                }
            })(),
            (async () => {
                try {
                    await pusherServer.trigger('admin-channel', 'new-booking', {
                        message: `New booking #${shortId}`,
                        bookingId,
                        data: emailData,
                    });
                    console.log(`[Job Process] Pusher notification sent`);
                } catch (e) {
                    // Non-critical
                }
            })()
        ]);

        console.log(`[Job Process] Background job for ${bookingId} completed successfully.`);
        return NextResponse.json({ success: true });

    } catch (error) {
        console.error('[Job Process] Unhandled Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
