import { NextResponse } from 'next/server';
import { Resend } from 'resend';

/**
 * GET /api/debug/resend-test
 * Tests Resend email API directly and exposes the exact response/error returned.
 */
export async function GET() {
    console.log('\n========== [Resend debug test] STARTED ==========');

    const key = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    const adminEmail = process.env.ADMIN_EMAIL_NOTIFICATIONS || 'alkiswahumrahcab@gmail.com';

    const envInfo = {
        has_api_key: !!key,
        api_key_prefix: key ? `${key.substring(0, 7)}...` : 'NOT SET',
        from_email: fromEmail,
        admin_email: adminEmail,
        node_env: process.env.NODE_ENV || 'not set',
    };

    if (!key) {
        return NextResponse.json({
            success: false,
            message: 'RESEND_API_KEY is not defined in environment variables.',
            environment: envInfo
        }, { status: 500 });
    }

    try {
        console.log(`[Resend Debug] Initializing Resend client...`);
        const resend = new Resend(key);
        
        console.log(`[Resend Debug] Sending test email from "${fromEmail}" to "${adminEmail}"...`);
        const response = await resend.emails.send({
            from: `Al Kiswah Test <${fromEmail}>`,
            to: [adminEmail],
            subject: `🛠️ Al Kiswah Resend Debug Test — ${new Date().toISOString()}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; max-width: 600px; border: 1px solid #ccc; border-radius: 5px;">
                    <h2 style="color: #D4AF37;">Resend API Direct Test</h2>
                    <p>This is a raw direct API debug test for the Al Kiswah Resend integration.</p>
                    <p>If you see this email, Resend is working perfectly with the current environment variables! ✅</p>
                    <hr/>
                    <strong>Configuration Tested:</strong>
                    <ul>
                        <li>From: ${fromEmail}</li>
                        <li>To: ${adminEmail}</li>
                        <li>Time: ${new Date().toLocaleString()}</li>
                    </ul>
                </div>
            `
        });

        console.log(`[Resend Debug] API Response:`, JSON.stringify(response, null, 2));

        if (response.error) {
            return NextResponse.json({
                success: false,
                message: 'Resend API returned an error.',
                error: response.error,
                environment: envInfo
            }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: 'Email sent successfully via Resend!',
            data: response.data,
            environment: envInfo
        });

    } catch (err: any) {
        console.error(`[Resend Debug] Exception thrown:`, err.message);
        return NextResponse.json({
            success: false,
            message: 'An exception occurred while sending the email.',
            error: err.message || err,
            environment: envInfo
        }, { status: 500 });
    }
}
