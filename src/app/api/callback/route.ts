
import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { z } from 'zod';

const CallbackSchema = z.object({
    phone: z.string().min(5, 'Phone number is too short').max(20, 'Phone number is too long'),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = CallbackSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { success: false, message: 'Invalid phone number' },
                { status: 400 }
            );
        }

        const { phone } = validation.data;

        // Send notification to admin
        if (process.env.EMAIL_USER) {
            await sendEmail({
                to: process.env.EMAIL_USER,
                subject: `📞 New Callback Request: ${phone}`,
                html: `
                    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                        <h2 style="color: #D4AF37;">New Callback Request</h2>
                        <p>A user has requested a callback from the website widget.</p>
                        
                        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0; font-size: 18px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #000; text-decoration: none;">${phone}</a></p>
                            <p style="margin: 5px 0 0; color: #666; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
                        </div>

                        <p>Please call them back immediately.</p>
                    </div>
                `,
            });
        } else {
            console.warn("EMAIL_USER env var not set, skipping email.");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Callback API error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
