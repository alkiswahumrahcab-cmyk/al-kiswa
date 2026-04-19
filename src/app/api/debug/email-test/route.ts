import { NextResponse } from 'next/server';

/**
 * GET /api/debug/email-test
 *
 * A quick smoke-test route to verify the email system works end-to-end on Vercel.
 * Call this after deploying: https://your-vercel-domain.vercel.app/api/debug/email-test
 *
 * This endpoint is intentionally unauthenticated for debugging purposes.
 * ⚠️ Remove or protect this route after confirming emails work in production.
 */
export async function GET() {
    const startTime = Date.now();
    console.log('\n========== [Email Test] STARTED ==========');

    // 1. Log environment variable status
    const envStatus = {
        EMAIL_USER: process.env.EMAIL_USER ? `✅ ${process.env.EMAIL_USER.substring(0, 3)}***@${process.env.EMAIL_USER.split('@')[1]}` : '❌ NOT SET',
        EMAIL_PASS: process.env.EMAIL_PASS ? `✅ Set (${process.env.EMAIL_PASS.length} chars)` : '❌ NOT SET',
        SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com (default)',
        SMTP_PORT: process.env.SMTP_PORT || '465 (default)',
        ADMIN_EMAIL_NOTIFICATIONS: process.env.ADMIN_EMAIL_NOTIFICATIONS || '❌ NOT SET (will use fallback)',
        NODE_ENV: process.env.NODE_ENV || 'not set',
        VERCEL: process.env.VERCEL || 'not set (not on Vercel)',
        VERCEL_ENV: process.env.VERCEL_ENV || 'not set (not on Vercel)',
    };

    console.log('[Email Test] Environment Variables:', JSON.stringify(envStatus, null, 2));

    // 2. Attempt to send a test email
    let emailResult: { success: boolean; error?: string; messageId?: string } = { success: false };

    try {
        const { sendEmail } = await import('@/lib/email');

        const adminEmail = process.env.ADMIN_EMAIL_NOTIFICATIONS || process.env.EMAIL_USER || '';
        if (!adminEmail) {
            throw new Error('No destination email found. Set ADMIN_EMAIL_NOTIFICATIONS or EMAIL_USER in Vercel Environment Variables.');
        }

        console.log(`[Email Test] Sending test email to: ${adminEmail}`);

        const result = await sendEmail({
            to: adminEmail,
            subject: `✅ Al Kiswah Email Test — ${new Date().toISOString()}`,
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <div style="background: #000; padding: 20px; border-bottom: 3px solid #D4AF37; text-align: center;">
                        <h1 style="color: #D4AF37; margin: 0;">✅ Email Test Successful</h1>
                    </div>
                    <div style="padding: 20px; background: #fafafa; border: 1px solid #eee;">
                        <p>This is a test email sent from the Al Kiswah Umrah Transport website.</p>
                        <p>If you received this, the email system is working correctly! ✅</p>
                        <hr/>
                        <h3>Email Configuration:</h3>
                        <table style="width: 100%; font-size: 14px;">
                            <tr><td style="color: #666; padding: 4px 0;">SMTP Host:</td><td><strong>${process.env.SMTP_HOST || 'smtp.gmail.com'}</strong></td></tr>
                            <tr><td style="color: #666; padding: 4px 0;">SMTP Port:</td><td><strong>${process.env.SMTP_PORT || '465'}</strong></td></tr>
                            <tr><td style="color: #666; padding: 4px 0;">From User:</td><td><strong>${process.env.EMAIL_USER || 'NOT SET'}</strong></td></tr>
                            <tr><td style="color: #666; padding: 4px 0;">Vercel ENV:</td><td><strong>${process.env.VERCEL_ENV || 'local'}</strong></td></tr>
                            <tr><td style="color: #666; padding: 4px 0;">Sent At:</td><td><strong>${new Date().toLocaleString()}</strong></td></tr>
                        </table>
                    </div>
                    <div style="background: #000; padding: 15px; text-align: center; color: #888; font-size: 12px;">
                        Al Kiswah Umrah Transport — Automated System Test
                    </div>
                </div>
            `,
        });

        emailResult = { success: result };
        if (result) {
            console.log('[Email Test] ✅ Test email sent successfully!');
        } else {
            console.error('[Email Test] ❌ sendEmail returned false — check logs above for the specific error');
        }
    } catch (err: any) {
        console.error('[Email Test] ❌ Exception during email test:', err.message);
        emailResult = { success: false, error: err.message };
    }

    const duration = Date.now() - startTime;
    console.log(`[Email Test] Completed in ${duration}ms`);
    console.log('==========================================\n');

    return NextResponse.json({
        test: 'email',
        timestamp: new Date().toISOString(),
        duration_ms: duration,
        environment: envStatus,
        result: emailResult,
        instructions: emailResult.success
            ? 'Email sent! Check your inbox at the ADMIN_EMAIL_NOTIFICATIONS address.'
            : 'Email failed. Check the Vercel Function Logs for error details. Likely cause: EMAIL_USER / EMAIL_PASS not set in Vercel → Settings → Environment Variables, or invalid Gmail App Password.',
    }, { status: emailResult.success ? 200 : 500 });
}
