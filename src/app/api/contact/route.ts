import { NextResponse } from 'next/server';
import { sendEmail, getContactFeedbackTemplate } from '@/lib/email';
import { ContactSchema } from '@/lib/validations';
import { Contact } from '@/models';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = ContactSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: 'Invalid contact data', errors: validation.error.format() },
                { status: 400 }
            );
        }

        const { name, email, message } = validation.data;

        // 1. Send feedback email to the customer
        const emailSent = await sendEmail({
            to: email,
            subject: 'We received your message - Al Kiswah Transport',
            html: getContactFeedbackTemplate({ name, message }),
        });

        // 2. Send notification to the admin
        if (process.env.EMAIL_USER) {
            await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `New Contact Form Submission from ${name}`,
                html: `
                    <h1>New Message from Website</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background:#f5f5f5; padding:15px; border-radius:5px;">
                        ${message}
                    </div>
                `,
            });
        }

        // 3. Save to Database
        await Contact.create({
            name,
            email,
            message,
            status: 'new'
        });

        return NextResponse.json({ success: true, emailSent });
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
    }
}
