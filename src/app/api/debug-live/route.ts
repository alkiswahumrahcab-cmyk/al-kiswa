import { NextResponse } from 'next/server';

export async function GET() {
    const results: Record<string, any> = {
        node_env: process.env.NODE_ENV,
        has_database_url: !!process.env.DATABASE_URL,
        has_mongodb_uri: !!process.env.MONGODB_URI,
        database_url_preview: process.env.DATABASE_URL?.substring(0, 50) + '...',
        mongodb_uri_preview: process.env.MONGODB_URI?.substring(0, 50) + '...',
        has_jwt: !!process.env.JWT_SECRET_KEY,
        nextauth_url: process.env.NEXTAUTH_URL,
    };

    // Test MongoDB connection
    try {
        const dbConnect = (await import('@/lib/mongodb')).default;
        await dbConnect();
        results.mongodb = 'connected';
    } catch (e: any) {
        results.mongodb = 'ERROR: ' + e.message;
    }

    return NextResponse.json(results);
}
