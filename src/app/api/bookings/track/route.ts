
import { NextResponse } from 'next/server';
import { Booking } from '@/models';
import dbConnect from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function POST(request: Request) {
    try {
        const { reference, email } = await request.json();

        if (!reference || !email) {
            return NextResponse.json(
                { success: false, message: 'Booking reference and email are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        const emailQuery = { $regex: new RegExp(`^${email.trim()}$`, 'i') };
        const ref = reference.trim().toUpperCase();

        let booking = null;

        // 1. Try new professional ref format: AKT-YYMMDD-XXXX
        booking = await Booking.findOne({ bookingRef: ref, email: emailQuery });

        // 2. Fall back to MongoDB ObjectId for legacy bookings
        if (!booking && mongoose.isValidObjectId(ref)) {
            booking = await Booking.findOne({ _id: ref, email: emailQuery });
        }

        if (!booking) {
            return NextResponse.json(
                { success: false, message: 'Booking not found. Please check your reference and email.' },
                { status: 404 }
            );
        }

        // Return only safe, relevant information
        return NextResponse.json({
            success: true,
            booking: {
                id: booking._id,
                bookingRef: booking.bookingRef || null,
                status: booking.status,
                createdAt: booking.createdAt,
                date: booking.date,
                time: booking.time,
                pickup: booking.pickup,
                dropoff: booking.dropoff,
                vehicle: booking.vehicle,
                passengers: booking.passengers,
                valet: booking.valet ? {
                    name: booking.valet.name,
                    phone: booking.valet.phone,
                    plateNumber: booking.valet.plateNumber
                } : null
            }
        });

    } catch (error) {
        console.error('Track booking error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
