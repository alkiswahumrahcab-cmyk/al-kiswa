import { NextResponse } from 'next/server';

/**
 * GET /api/debug/booking-pipeline
 * Tests DB connection and email config — for admin diagnostics only.
 * Remove or protect this route in production after confirming everything works.
 */
export async function GET() {
    const results: Record<string, { status: 'ok' | 'error' | 'warning'; message: string }> = {};

    // ── 1. DATABASE ──────────────────────────────────────────────────────
    try {
        const dbConnect = (await import('@/lib/mongodb')).default;
        const conn = await dbConnect();
        if (conn) {
            results.database = { status: 'ok', message: `Connected to MongoDB. State: ${conn.connection?.readyState}` };
        } else {
            results.database = { status: 'error', message: 'MONGODB_URI is not set or connection returned null' };
        }
    } catch (e: any) {
        results.database = { status: 'error', message: `DB connection failed: ${e.message}` };
    }

    // ── 2. ENV VARS ──────────────────────────────────────────────────────
    const requiredEnvVars = ['MONGODB_URI', 'EMAIL_USER', 'EMAIL_PASS', 'SMTP_HOST', 'SMTP_PORT'];
    const missingVars = requiredEnvVars.filter(v => !process.env[v]);
    if (missingVars.length === 0) {
        results.env_vars = { status: 'ok', message: `All required env vars are set: ${requiredEnvVars.join(', ')}` };
    } else {
        results.env_vars = {
            status: 'error',
            message: `❌ MISSING env vars: ${missingVars.join(', ')} — Set these in Vercel Dashboard → Settings → Environment Variables`
        };
    }

    // ── 3. EMAIL TRANSPORTER ─────────────────────────────────────────────
    try {
        const nodemailer = (await import('nodemailer')).default;
        const testTransporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await testTransporter.verify();
        results.email_smtp = { status: 'ok', message: `SMTP connected successfully using ${process.env.EMAIL_USER}` };
    } catch (e: any) {
        results.email_smtp = {
            status: 'error',
            message: `SMTP verification failed: ${e.message}. Check EMAIL_USER and EMAIL_PASS in Vercel env vars.`
        };
    }

    // ── 4. BOOKING COUNT (proves DB read works) ──────────────────────────
    try {
        const { getBookings } = await import('@/lib/db');
        const bookings = await getBookings(5);
        results.booking_read = { status: 'ok', message: `Can read DB. Found ${bookings.length} recent bookings.` };
    } catch (e: any) {
        results.booking_read = { status: 'error', message: `Failed to read bookings: ${e.message}` };
    }

    const hasErrors = Object.values(results).some(r => r.status === 'error');
    return NextResponse.json({
        overall: hasErrors ? '❌ ISSUES FOUND — see details below' : '✅ All systems operational',
        results,
        timestamp: new Date().toISOString(),
    }, { status: hasErrors ? 500 : 200 });
}
