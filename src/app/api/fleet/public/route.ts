
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Vehicle } from '@/models';
import { getSettings } from '@/lib/settings-storage';

export const dynamic = 'force-dynamic'; // Ensure fresh data

export async function GET() {
    try {
        await dbConnect();

        // Parallel fetch for valid vehicles and settings
        const [vehicles, settings] = await Promise.all([
            Vehicle.find({ isActive: true }).sort({ category: 1, name: 1 }).lean(),
            getSettings()
        ]);

        // Transform vehicles to the format expected by the frontend
        const carouselVehicles = vehicles
            .filter((v: any) => v.isActive)
            .slice(0, 6)
            .map((v: any) => ({
                id: v._id.toString(), // Ensure ID is string
                name: v.name,
                image: v.image,
                passengers: v.name.toLowerCase().includes('hiace') ? "10/11" : v.passengers,
                luggage: v.luggage,
                features: v.features,
                price: v.price,
                category: v.category
            }));

        return NextResponse.json({
            vehicles: carouselVehicles,
            discount: settings.discount
        });
    } catch (error) {
        console.error('Error fetching public fleet data:', error);
        return NextResponse.json({ error: 'Failed to fetch fleet data' }, { status: 500 });
    }
}
