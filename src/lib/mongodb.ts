import mongoose from 'mongoose';

// Use MONGODB_URI (preferred) or DATABASE_URL as fallback
const MONGODB_URI = process.env.MONGODB_URI || process.env.DATABASE_URL;

if (!MONGODB_URI) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('[MongoDB] MONGODB_URI is not defined in environment variables');
    }
}

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose: MongooseCache | undefined;
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!MONGODB_URI) {
        console.warn('[MongoDB] No URI defined. Skipping database connection.');
        return null;
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
            // Longer timeout for Vercel serverless cold starts
            serverSelectionTimeoutMS: 15000,
            connectTimeoutMS: 15000,
            socketTimeoutMS: 45000,
        };

        cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
            console.log('[MongoDB] Connected successfully');
            return m;
        }).catch(err => {
            console.error('[MongoDB] Connection error:', err.message);
            throw err;
        });
    }

    try {
        cached!.conn = await cached!.promise;
    } catch (e) {
        cached!.promise = null; // Allow retry on next request
        cached!.conn = null;
        throw e;
    }

    return cached!.conn;
}

export default dbConnect;
