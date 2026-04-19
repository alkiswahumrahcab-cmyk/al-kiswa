import nodemailer from 'nodemailer';

// Explicit SMTP config — more reliable than 'service: gmail' shorthand
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: (Number(process.env.SMTP_PORT) || 465) === 465, // true for 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Allow self-signed certs in dev
    },
});

// Verify connection on startup (non-fatal)
transporter.verify((error) => {
    if (error) {
        console.error('[Email] ❌ SMTP transporter verification failed:', error.message);
        console.error('[Email] Check EMAIL_USER and EMAIL_PASS environment variables are set correctly in Vercel.');
    } else {
        console.log('[Email] ✅ SMTP transporter connected and ready');
    }
});

interface EmailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendEmail = async ({ to, subject, html }: EmailOptions) => {
    if (!to || !to.includes('@')) {
        console.error(`[Email] ❌ Skipping send — invalid recipient address: "${to}"`);
        return false;
    }

    console.log(`[Email] Sending to: ${to.substring(0, 3)}***@${to.split('@')[1]} | Subject: "${subject}"`);
    console.log(`[Email] Config — USER: ${process.env.EMAIL_USER ? '✅ Set' : '❌ MISSING'}, PASS: ${process.env.EMAIL_PASS ? '✅ Set' : '❌ MISSING'}`);

    try {
        const mailOptions = {
            from: `"Al Kiswah Umrah Transport" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('[Email] ✅ Sent successfully. MessageId:', info.messageId);
        return true;
    } catch (error: any) {
        console.error('[Email] ❌ Failed to send:', error.message);
        if (error.code === 'EAUTH') {
            console.error('[Email] ❌ AUTHENTICATION FAILED — Check EMAIL_USER / EMAIL_PASS in Vercel environment variables');
        }
        if (error.response) {
            console.error('[Email] SMTP Response:', error.response);
        }
        return false;
    }
};


interface BookingData {
    name: string;
    email?: string; // Added email field
    status: string;
    id: string;
    vehicle: string; // Keep for fallback/summary
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    passengers: number;
    vehicleCount?: number;
    luggage?: number;
    notes?: string;
    price?: string;
    selectedVehicles?: { name: string; quantity: number }[]; // New field
    country?: string;
    flightNumber?: string;
    arrivalDate?: string;
    phone?: string; // Added phone field
}

import { replaceTemplateVariables } from './email-templates';
import { getSettings } from './settings-storage';

// ... imports

// Helper to format vehicle list for the template substitution
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

// Generic function to prepare variables
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
        country_row: booking.country ? `<tr><td style="padding: 5px 0; color: #666;">Country:</td><td style="font-weight: bold;">${booking.country}</td></tr>` : '',
        flight_row: booking.flightNumber ? `<tr><td style="padding: 5px 0; color: #666;">Flight:</td><td style="font-weight: bold;">${booking.flightNumber}</td></tr>` : '',
        arrival_date_row: booking.arrivalDate ? `<tr><td style="padding: 5px 0; color: #666;">Arrival:</td><td style="font-weight: bold;">${booking.arrivalDate}</td></tr>` : '',
        notes_row: booking.notes ? `<tr><td style="padding: 10px 0; color: #666;" colspan="2"><strong>Notes:</strong><br/>${booking.notes}</td></tr>` : '',
        whatsapp_link: `https://wa.me/${waNum}`
    };
};

export const getBookingConfirmationTemplate = (booking: BookingData, templateString: string, settings?: any) => {
    return replaceTemplateVariables(templateString, prepareBookingVariables(booking, settings));
};

export const getAdminBookingNotificationTemplate = (booking: BookingData, templateString: string, settings?: any) => {
    return replaceTemplateVariables(templateString, prepareBookingVariables(booking, settings));
};

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

export const sendBookingConfirmationEmail = async (booking: BookingData) => {
    // 1. Fetch Request Settings
    const settings = await getSettings();
    const templateString = settings.emailTemplates?.bookingConfirmation || DEFAULT_BOOKING_CONFIRMATION_TEMPLATE;

    // 2. Prepare HTML using the dynamic template
    const htmlContent = getBookingConfirmationTemplate(booking, templateString, settings);

    // 3. Bilingual Subject
    const subject = `Booking Confirmation #${booking.id} | تأكيد الحجز`;

    // 4. Send
    return await sendEmail({
        to: booking.email || '', // Ensure email exists
        subject,
        html: htmlContent
    });
};

export const sendAdminNewBookingEmail = async (booking: BookingData) => {
    // Primary company email as requested by user
    const adminEmail = 'alkiswahymrahcab@gmail.com'; 
    if (!adminEmail) return false;

    // 1. Fetch Request Settings
    const settings = await getSettings();
    const templateString = settings.emailTemplates?.adminNotification || DEFAULT_ADMIN_NOTIFICATION_TEMPLATE;

    const htmlContent = getAdminBookingNotificationTemplate(booking, templateString, settings);

    return await sendEmail({
        to: adminEmail,
        subject: `🔔 New Booking #${booking.id} Received`,
        html: htmlContent
    });
};

import { DEFAULT_BOOKING_CONFIRMATION_TEMPLATE, DEFAULT_ADMIN_NOTIFICATION_TEMPLATE } from './email-templates';
