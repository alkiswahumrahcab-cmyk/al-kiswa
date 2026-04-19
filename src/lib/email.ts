import nodemailer from 'nodemailer';
import { replaceTemplateVariables, DEFAULT_BOOKING_CONFIRMATION_TEMPLATE, DEFAULT_ADMIN_NOTIFICATION_TEMPLATE } from './email-templates';
import { getSettings } from './settings-storage';

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT: We create the transporter INSIDE the sendEmail function, NOT at
// module load time. On Vercel, the module is evaluated during a cold start
// before environment variables are injected, which can cause the credentials
// to be undefined when the transporter is first created.
// ─────────────────────────────────────────────────────────────────────────────

function createTransporter() {
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 465;
    const secure = port === 465; // true for SSL (465), false for TLS (587)
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;

    console.log('[Email] Creating transporter with config:', {
        host,
        port,
        secure,
        user: user ? `${user.substring(0, 3)}***@${user.split('@')[1]}` : '❌ MISSING',
        pass: pass ? '✅ Set (hidden)' : '❌ MISSING',
    });

    if (!user || !pass) {
        throw new Error(
            `[Email] ❌ SMTP credentials not configured. EMAIL_USER="${user || 'MISSING'}", EMAIL_PASS="${pass ? 'SET' : 'MISSING'}". ` +
            'Please add EMAIL_USER and EMAIL_PASS to Vercel Environment Variables and redeploy.'
        );
    }

    return nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        // tls.rejectUnauthorized=false is only for local / self-signed cert dev environments.
        // Keep it false here to maximise compatibility without sacrificing G-mail auth integrity.
        tls: { rejectUnauthorized: false },
    });
}

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

    console.log(`[Email] ─── Preparing to send ───`);
    console.log(`[Email]  To:      ${to.substring(0, 3)}***@${to.split('@')[1]}`);
    console.log(`[Email]  Subject: ${subject}`);
    console.log(`[Email]  Env check — EMAIL_USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ MISSING'}, EMAIL_PASS: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ MISSING'}`);

    try {
        const transporter = createTransporter();

        const mailOptions = {
            from: `"Al Kiswah Umrah Transport" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`[Email] ✅ Sent successfully! MessageId: ${info.messageId}, Response: ${info.response}`);
        return true;
    } catch (error: any) {
        console.error(`[Email] ❌ Failed to send email to ${to.substring(0, 3)}*** — Error: ${error.message}`);
        if (error.code === 'EAUTH') {
            console.error('[Email] ❌ AUTHENTICATION FAILED — The Gmail App Password is incorrect or 2FA is not enabled on the Google account.');
            console.error('[Email] ❌ Fix: Go to myaccount.google.com → Security → 2-Step Verification → App passwords → Generate one for "Mail".');
            console.error('[Email] ❌ Then update EMAIL_PASS in Vercel Dashboard → Settings → Environment Variables → Redeploy.');
        }
        if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
            console.error('[Email] ❌ NETWORK ERROR — Could not reach SMTP host. Check SMTP_HOST and SMTP_PORT.');
        }
        if (error.response) {
            console.error('[Email] SMTP Error Response:', error.response);
        }
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
