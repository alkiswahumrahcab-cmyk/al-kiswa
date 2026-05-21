import { NextResponse } from 'next/server';
import { processBookingAction } from '@/lib/bookingProcessor';

export async function POST(request: Request) {
    try {
        const { bookingId } = await request.json();

        if (!bookingId) {
            return NextResponse.json({ success: false, error: 'Missing bookingId' }, { status: 400 });
        }

        console.log(`[Job API] Triggered booking process job via API route for ID: ${bookingId}`);

        const result = await processBookingAction(bookingId);

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 404 });
        }

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error('[Job API] Unhandled Error:', error.message || error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
