import { NextResponse } from 'next/server';

export async function GET() {
    const results: Record<string, any> = {
        node_env: process.env.NODE_ENV,
        has_database_url: !!process.env.DATABASE_URL,
        has_mongodb_uri: !!process.env.MONGODB_URI,
        has_jwt_secret: !!process.env.JWT_SECRET_KEY,
        has_nextauth_secret: !!process.env.NEXTAUTH_SECRET,
        has_email_user: !!process.env.EMAIL_USER,
        has_email_pass: !!process.env.EMAIL_PASS,
        nextauth_url: process.env.NEXTAUTH_URL,
        app_url: process.env.NEXT_PUBLIC_APP_URL,
    };

    // Test MongoDB connection
    try {
        const dbConnect = (await import('@/lib/mongodb')).default;
        await dbConnect();
        results.mongodb = 'connected ✅';
    } catch (e: any) {
        results.mongodb = 'ERROR ❌: ' + e.message;
    }

    // Test JWT signing
    try {
        const { signToken, verifyToken } = await import('@/lib/auth-utils');
        const token = await signToken({ userId: 'test', email: 'test', role: 'admin' });
        const verified = await verifyToken(token);
        results.jwt = verified ? 'working ✅' : 'verify failed ❌';
    } catch (e: any) {
        results.jwt = 'ERROR ❌: ' + e.message;
    }

    return NextResponse.json(results, { status: 200 });
}
