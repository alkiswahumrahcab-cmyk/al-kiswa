import { Resend } from 'resend';

// ─────────────────────────────────────────────────────────────────────────────
// We initialize the Resend client.
// It will look for process.env.RESEND_API_KEY automatically, 
// but we provide a fallback for testing if it's missing in local environment.
// ─────────────────────────────────────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_3HLuZUtk_7r2PDPKpBAQAjf3nXMU5ENGy';
const resend = new Resend(RESEND_API_KEY);

// Default sender email. 
// IMPORTANT: Resend requires a verified domain to send emails to arbitrary addresses.
// If you are using the onboarding domain, you can only send to your own email address.
// Please verify your domain in Resend Dashboard (e.g., bookings@kiswahumrahcab.com).
const DEFAULT_SENDER = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

// ─────────────────────────────────────────────────────────────────────────────
// Core email sender — used by all higher-level functions
// ─────────────────────────────────────────────────────────────────────────────

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions): Promise<boolean> => {
    // Validate recipient
    if (!to || !to.includes('@')) {
        console.error(`[Email] ❌ Skipping send — invalid recipient: "${to}"`);
        return false;
    }

    console.log(`[Email] ─── Preparing to send via Resend ───`);
    console.log(`[Email]  To:      ${to.substring(0, 3)}***@${to.split('@')[1]}`);
    console.log(`[Email]  Subject: ${subject}`);
    
    try {
        const { data, error } = await resend.emails.send({
            from: `Al Kiswah Umrah Transport <${DEFAULT_SENDER}>`,
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error(`[Email] ❌ Resend API Error:`, error);
            // If the user tries to send to a customer using the onboarding domain, it will fail
            if (error.message.includes('verified domain')) {
                console.error('[Email] ❌ You need to verify your custom domain in Resend to send to customers!');
            }
            return false;
        }

        console.log(`[Email] ✅ Sent successfully via Resend! ID: ${data?.id}`);
        return true;
    } catch (error: any) {
        console.error(`[Email] ❌ Failed to send email via Resend — Error: ${error.message}`);
        return false;
    }
};

// ─────────────────────────────────────────────────────────────────────────────
// Booking Data Interface
// ─────────────────────────────────────────────────────────────────────────────

interface BookingData {
    name: string;
    email?: string;
    status: string;
    id: string;
    vehicle: string;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
    vehicleCount?: number;
    luggage?: number;
    notes?: string;
    price?: string;
    selectedVehicles?: { name: string; quantity: number }[];
    country?: string;
    flightNumber?: string;
    arrivalDate?: string;
    phone?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Template Helpers
// ─────────────────────────────────────────────────────────────────────────────

const formatVehicles = (booking: BookingData) => {
    if (booking.selectedVehicles && booking.selectedVehicles.length > 0) {
        return `<ul style="margin: 0; padding-left: 20px;">
            ${booking.selectedVehicles.map(v => `<li>${v.quantity} x ${v.name}</li>`).join('')}
           </ul>`;
    }
    return booking.vehicle || 'Standard Vehicle';
};

const formatPriceRow = (booking: BookingData) => {
    if (!booking.price) return '';
    return `<tr>
        <td style="padding: 15px 20px; border-bottom: 1px solid #eee; width: 40%; color: #666;">
            <div style="font-size: 12px; text-transform: uppercase;">Total Price</div>
            <div style="font-family: 'Amiri', serif; font-size: 12px;">السعر الإجمالي</div>
        </td>
        <td style="padding: 15px 20px; border-bottom: 1px solid #eee; font-weight: bold; color: #d4af37; font-size: 18px;">
            ${booking.price}
        </td>
    </tr>`;
};

const prepareBookingVariables = (booking: BookingData, settings?: any) => {
    const waNum = settings?.contact?.whatsapp?.replace(/\D/g, '') || '966545494921';
    return {
        name: booking.name,
        email: booking.email || 'N/A',
        phone: booking.phone || 'N/A',
        booking_id: booking.id,
        date: booking.date,
        time: booking.time,
        pickup: booking.pickup,
        dropoff: booking.dropoff,
        vehicle_details: formatVehicles(booking),
        passengers: booking.passengers,
        luggage: booking.luggage || 0,
        price_row: formatPriceRow(booking),
        status: booking.status,
        submission_time: new Date().toLocaleString(),
        year: new Date().getFullYear(),
        country_row: booking.country
            ? `<tr><td style="padding: 5px 0; color: #666;">Country:</td><td style="font-weight: bold;">${booking.country}</td></tr>`
            : '',
        flight_row: booking.flightNumber
            ? `<tr><td style="padding: 5px 0; color: #666;">Flight:</td><td style="font-weight: bold;">${booking.flightNumber}</td></tr>`
            : '',
        arrival_date_row: booking.arrivalDate
            ? `<tr><td style="padding: 5px 0; color: #666;">Arrival:</td><td style="font-weight: bold;">${booking.arrivalDate}</td></tr>`
            : '',
        notes_row: booking.notes
            ? `<tr><td style="padding: 10px 0; color: #666;" colspan="2"><strong>Notes:</strong><br/>${booking.notes}</td></tr>`
            : '',
        whatsapp_link: `https://wa.me/${waNum}`,
    };
};

export const getBookingConfirmationTemplate = (booking: BookingData, templateString: string, settings?: any) => {
    return replaceTemplateVariables(templateString, prepareBookingVariables(booking, settings));
};

export const getAdminBookingNotificationTemplate = (booking: BookingData, templateString: string, settings?: any) => {
    return replaceTemplateVariables(templateString, prepareBookingVariables(booking, settings));
};

// ─────────────────────────────────────────────────────────────────────────────
// Public Email Functions
// ─────────────────────────────────────────────────────────────────────────────

export const sendBookingConfirmationEmail = async (booking: BookingData): Promise<boolean> => {
    if (!booking.email) {
        console.warn('[Email] sendBookingConfirmationEmail — no customer email address provided, skipping.');
        return false;
    }

    const settings = await getSettings();
    const templateString = settings.emailTemplates?.bookingConfirmation || DEFAULT_BOOKING_CONFIRMATION_TEMPLATE;
    const htmlContent = getBookingConfirmationTemplate(booking, templateString, settings);
    const subject = `Booking Confirmation #${booking.id} | تأكيد الحجز`;

    return await sendEmail({ to: booking.email, subject, html: htmlContent });
};

export const sendAdminNewBookingEmail = async (booking: BookingData): Promise<boolean> => {
    // Read from env var first, then fall back to the hardcoded company inbox
    const adminEmail =
        process.env.ADMIN_EMAIL_NOTIFICATIONS ||
        'alkiswahumrahcab@gmail.com';

    console.log(`[Email] Admin notification → ${adminEmail}`);

    const settings = await getSettings();
    const templateString = settings.emailTemplates?.adminNotification || DEFAULT_ADMIN_NOTIFICATION_TEMPLATE;
    const htmlContent = getAdminBookingNotificationTemplate(booking, templateString, settings);

    return await sendEmail({
        to: adminEmail,
        subject: `🔔 New Booking #${booking.id} Received`,
        html: htmlContent,
    });
};

// Contact feedback email (unchanged logic, just cleaned up)
interface ContactFeedbackData {
    name: string;
    message: string;
}

export const getContactFeedbackTemplate = ({ name, message }: ContactFeedbackData) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #d4af37;">Thank you for contacting us</h1>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p>${message}</p>
        </div>

        <p>Best Regards,<br/>Al Kiswah Transport Team</p>
    </div>
`;
};
