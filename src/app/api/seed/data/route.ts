// @ts-nocheck
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Route, Vehicle, RoutePrice } from '@/models'; // Assuming these models exist as per previous context
import pricingData from '@/data/pricing.json';

export async function GET() {
    try {
        await dbConnect();
        console.log('[Seed] Database connected');

        // 1. Seed Vehicles
        const seededVehicles = [];
        for (const vehicleData of pricingData.vehicles) {
            const capacityNum = parseInt(vehicleData.capacity.replace(/\D/g, '')) || 4; // Extract number or default to 4
            const luggageNum = parseInt(vehicleData.luggage.replace(/\D/g, '')) || 2;   // Extract number or default to 2

            // Upsert vehicle based on ID
            const vehicle = await Vehicle.findOneAndUpdate(
                { name: vehicleData.name }, // Use name as unique identifier if ID is generic
                {
                    ...vehicleData,
                    price: '0', // Basic field if required by schema
                    isActive: true, // Default to active
                    passengers: capacityNum,
                    luggage: luggageNum,
                    category: vehicleData.multiplier > 1.4 ? 'VIP' : 'Standard'
                },
                { upsert: true, new: true }
            );
            seededVehicles.push(vehicle);
        }
        console.log(`[Seed] Seeded ${seededVehicles.length} vehicles`);

        // 2. Seed Routes and Prices
        let seededRoutesCount = 0;
        for (const routeData of pricingData.routes) {
            // Upsert Route
            const route = await Route.findOneAndUpdate(
                { origin: routeData.name.split(' to ')[0], destination: routeData.name.split(' to ')[1] || 'Destination' },
                {
                    origin: routeData.name.split(' to ')[0],
                    destination: routeData.name.split(' to ')[1] || 'Destination',
                    distance: routeData.distance,
                    duration: routeData.time,
                    category: routeData.category || 'Intercity',
                    isActive: true
                },
                { upsert: true, new: true }
            );

            // Upsert Prices
            if (routeData.customRates) {
                // Create a map of JSON ID (e.g. 'camry') to Mongoose _id
                // We know seededVehicles contains the DB docs.
                // We need to match them back to pricingData.vehicles to get the 'id' key ('camry')

                const vehicleIdMap = new Map<string, string>();

                for (const fileVehicle of pricingData.vehicles) {
                    // Find the corresponding DB record by name
                    const dbVehicle = seededVehicles.find(v => v.name === fileVehicle.name);
                    if (dbVehicle) {
                        vehicleIdMap.set(fileVehicle.id, dbVehicle._id.toString());
                    }
                }

                for (const [vehicleKey, price] of Object.entries(routeData.customRates)) {
                    // Get the DB _id for the vehicle (e.g. 'camry' -> ObjectId('...'))
                    const dbVehicleId = vehicleIdMap.get(vehicleKey);

                    if (dbVehicleId) {
                        await RoutePrice.findOneAndUpdate(
                            { route: route._id.toString(), vehicle: dbVehicleId },
                            { price },
                            { upsert: true }
                        );
                    } else {
                        console.warn(`[Seed] No matching vehicle found for key: ${vehicleKey}`);
                    }
                }
            }
            seededRoutesCount++;
        }
        console.log(`[Seed] Seeded ${seededRoutesCount} routes`);

        const { revalidatePath, revalidateTag } = await import('next/cache');
        revalidatePath('/admin/routes');
        revalidatePath('/admin/pricing');
        revalidatePath('/booking');

        try {
            // @ts-expect-error: revalidateTag signature mismatch
            revalidateTag('routes');
            // @ts-expect-error: revalidateTag signature mismatch
            revalidateTag('vehicles');
        } catch (e) {
            console.warn('Revalidate tag failed', e);
        }

        return NextResponse.json({
            success: true,
            message: 'Database seeded successfully',
            stats: {
                vehicles: seededVehicles.length,
                routes: seededRoutesCount
            }
        });

    } catch (error) {
        console.error('Seeding failed:', error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
