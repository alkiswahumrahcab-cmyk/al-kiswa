import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Review } from '@/models';
import { curatedTestimonials } from '@/data/testimonials';

export async function GET(request: Request) {
    try {
        // Simple protection: only run if explicitly asked with a secret, or allow it for initial setup
        const url = new URL(request.url);
        const secret = url.searchParams.get('secret');

        // Optional: protect this endpoint with a secret key
        if (process.env.SEED_SECRET && secret !== process.env.SEED_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        // Check if there are already reviews to prevent double seeding
        const existingCount = await Review.countDocuments();
        if (existingCount > 0) {
            return NextResponse.json({ 
                message: 'Database already has reviews. Seeding skipped.',
                count: existingCount
            });
        }

        // Map curated testimonials to Review schema
        const reviewsToInsert = curatedTestimonials.map(t => ({
            author: t.name,
            rating: t.rating,
            comment: t.story,
            date: t.date ? new Date(t.date) : new Date(),
            isActive: true,
            status: 'approved'
        }));

        const result = await Review.insertMany(reviewsToInsert);

        return NextResponse.json({
            message: 'Successfully seeded reviews',
            insertedCount: result.length
        });
    } catch (error) {
        console.error('Error seeding reviews:', error);
        return NextResponse.json({ error: 'Failed to seed reviews' }, { status: 500 });
    }
}
