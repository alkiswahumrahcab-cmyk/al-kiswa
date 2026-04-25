import dbConnect from '@/lib/mongodb';
import { RateLimit } from '@/models';

interface RateLimitOptions {
    interval: number; // Time window in milliseconds
    limit: number;    // Max requests per window
    endpoint: string; // The endpoint being rate limited
}

export async function rateLimit(ip: string, options: RateLimitOptions = { interval: 60 * 1000, limit: 5, endpoint: 'global' }) {
    try {
        await dbConnect();
        
        const now = new Date();
        const resetTime = new Date(now.getTime() + options.interval);
        
        let record = await RateLimit.findOne({ ip, endpoint: options.endpoint });
        
        if (!record) {
            await RateLimit.create({
                ip,
                endpoint: options.endpoint,
                count: 1,
                resetTime
            });
            return { success: true, remaining: options.limit - 1 };
        }
        
        // If the record exists but the reset time has passed, reset the count
        if (now > record.resetTime) {
            record.count = 1;
            record.resetTime = resetTime;
            await record.save();
            return { success: true, remaining: options.limit - 1 };
        }
        
        if (record.count >= options.limit) {
            return { success: false, remaining: 0 };
        }
        
        record.count++;
        await record.save();
        return { success: true, remaining: options.limit - record.count };
    } catch (error) {
        console.error('[RateLimit] Error:', error);
        // Fail open if database is down
        return { success: true, remaining: 1 };
    }
}
