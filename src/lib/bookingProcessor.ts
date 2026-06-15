import { getBooking } from '@/lib/db';
import { generateBookingPDF } from '@/lib/pdfGenerator';
import { sendBookingConfirmationEmail, sendAdminNewBookingEmail } from '@/lib/email';
import { pusherServer } from '@/lib/pusher';

export interface ProcessBookingResult {
    success: boolean;
    error?: string;
}

/**
 * Consolidates the post-booking operations (PDF generation, customer email,
 * admin email, and Pusher updates) into a unified, heavily-logged workflow.
 * 
 * Designed to execute cleanly in both standard route handlers and background
 * tasks (e.g. Next.js waitUntil) on Vercel and other serverless hosting.
 */
export async function processBookingAction(bookingId: string): Promise<ProcessBookingResult> {
    console.log(`\n=== [Booking Processor] ⚙️ Processing post-booking tasks for ID: ${bookingId} ===`);
    
    try {
        // 1. Fetch booking cleanly from database using direct ID query
        const booking = await getBooking(bookingId);
        if (!booking) {
            console.error(`[Booking Processor] ❌ Booking with ID "${bookingId}" not found in database.`);
            return { success: false, error: 'Booking not found' };
        }
        console.log(`[Booking Processor] 📖 Loaded booking details for client: "${booking.name}".`);

        // 2. Generate PDF Buffer with optimized fonts
        console.log(`[Booking Processor] 📄 Generating booking receipt PDF...`);
        let pdfBuffer: Buffer | undefined;
        try {
            pdfBuffer = await generateBookingPDF(booking);
            console.log(`[Booking Processor] ✅ PDF generated successfully (${pdfBuffer.length} bytes).`);
        } catch (pdfErr: any) {
            console.error(`[Booking Processor] ❌ PDF generation failed:`, pdfErr.message || pdfErr);
        }

        // 3. Prepare Email Data Object
        const shortId = `AK-${bookingId.slice(-8).toUpperCase()}`;
        
        const legs = booking.legs && booking.legs.length > 0 ? booking.legs : [{
            pickup: booking.pickup,
            dropoff: booking.dropoff,
            date: booking.date,
            time: booking.time,
        }];

        let legsHtml = '';
        let legsHtmlAdmin = '';
        const vehicleName = (booking as any).vehicleName || booking.vehicle || 'Standard Vehicle';

        legs.forEach((leg: any, index: number) => {
            const hoursText = leg.hours ? ` (${leg.hours} Hours)` : '';
            legsHtml += `
                <tr>
                    <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #666;">${index + 1}</td>
                    <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 500; color: #1a1a1a;">${leg.pickup || 'Unknown'} <span style="color: #D4AF37; margin: 0 5px;">&rarr;</span> ${leg.dropoff || 'Unknown'}${hoursText}</td>
                    <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #444;">${leg.date || ''} <br><span style="color: #D4AF37; font-size: 12px;">${leg.time || ''}</span></td>
                    <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #444;">${vehicleName}</td>
                </tr>
            `;
            
            legsHtmlAdmin += `
                <tr>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${index + 1}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 500;">${leg.pickup || 'Unknown'} &rarr; ${leg.dropoff || 'Unknown'}${hoursText}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${leg.date || ''}<br><span style="font-size: 11px; color: #888;">${leg.time || ''}</span></td>
                    <td style="padding: 10px; border-bottom: 1px solid #eee; color: #555;">${vehicleName}</td>
                </tr>
            `;
        });

        const emailData = {
            name: booking.name,
            email: booking.email,
            status: booking.status || 'pending',
            id: shortId,
            vehicle: vehicleName,
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
            legs_html: legsHtml,
            legs_html_admin: legsHtmlAdmin,
            pdfBuffer
        };

        // 4. Fire email services and Pusher concurrently, awaiting all results
        console.log(`[Booking Processor] 📧 Dispatching notification processes...`);
        
        const results = await Promise.allSettled([
            // Customer Email
            (async () => {
                if (!emailData.email) {
                    console.warn(`[Booking Processor] ⚠️ Skipping customer email: no email address provided.`);
                    return;
                }
                console.log(`[Booking Processor] ✉️ Sending confirmation email to customer: ${emailData.email}`);
                const sent = await sendBookingConfirmationEmail(emailData);
                if (sent) {
                    console.log(`[Booking Processor] ✉️ ✅ Customer confirmation email sent successfully.`);
                } else {
                    console.error(`[Booking Processor] ✉️ ❌ Customer confirmation email delivery failed.`);
                }
            })(),

            // Admin Email
            (async () => {
                console.log(`[Booking Processor] 🔔 Sending notification email to admin inbox...`);
                const sent = await sendAdminNewBookingEmail(emailData);
                if (sent) {
                    console.log(`[Booking Processor] 🔔 ✅ Admin notification email sent successfully.`);
                } else {
                    console.error(`[Booking Processor] 🔔 ❌ Admin notification email delivery failed.`);
                }
            })(),

            // Pusher Update
            (async () => {
                console.log(`[Booking Processor] 📡 Triggering Pusher event 'new-booking' on 'admin-channel'...`);
                try {
                    await pusherServer.trigger('admin-channel', 'new-booking', {
                        message: `New booking #${shortId}`,
                        bookingId,
                        data: emailData,
                    });
                    console.log(`[Booking Processor] 📡 ✅ Pusher realtime notification sent.`);
                } catch (pusherErr: any) {
                    console.error(`[Booking Processor] 📡 ⚠️ Pusher trigger failed (non-fatal):`, pusherErr.message || pusherErr);
                }
            })()
        ]);

        console.log(`[Booking Processor] 🎉 Post-booking tasks completed for ${bookingId}.`);
        console.log(`========================================================================\n`);
        return { success: true };

    } catch (err: any) {
        console.error(`[Booking Processor] ❌ Unhandled exception during processing:`, err.message || err);
        return { success: false, error: err.message || 'Unknown processing error' };
    }
}
