import { routeService, RouteWithPrices } from '@/services/routeService';
import { vehicleService } from '@/services/vehicleService';
import { settingsService } from '@/services/settingsService';
import Link from 'next/link';
import { MapPin, Clock, Users, Luggage, ArrowRight, CheckCircle2 } from 'lucide-react';

import { FLEET, getVehicle, formatSeats, formatLuggage } from '@/data/fleet';

function formatSAR(amount: number) {
    return amount.toLocaleString('en-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function formatUSD(amount: number, rate: number) {
    return Math.round(amount / rate).toLocaleString('en-US');
}

const ROUTE_FEATURES: Record<string, string[]> = {
    'Jeddah': ['Meet & Greet at Arrivals', 'Flight Tracking', '60 Min Free Waiting', 'Luggage Assistance'],
    'Madinah': ['Door-to-Door Service', 'Prayer Stop at Miqat', 'Comfort Break', 'Freeway Route'],
    'Ziyarat': ['Historical Sites Tour', 'Private Driver Guide', 'Flexible Photo Stops', 'Hotel Pickup & Drop'],
};

function getFeatures(origin: string, destination: string) {
    const combined = `${origin} ${destination}`;
    for (const [key, feats] of Object.entries(ROUTE_FEATURES)) {
        if (combined.includes(key)) return feats;
    }
    return ['Door-to-Door Service', 'Professional Driver', 'Fixed Price', '24/7 Support'];
}

import PricingClientUX from './PricingClientUX';

interface Props {
    exchangeRate: number;
}

export default async function LivePricingTable({ exchangeRate }: Props) {
    let routes: RouteWithPrices[] = [];
    let vehicles: any[] = [];

    try {
        [routes, vehicles] = await Promise.all([
            routeService.getActiveRoutes(),
            vehicleService.getActiveVehicles(),
        ]);
    } catch (e) {
        console.error('[LivePricingTable] fetch error:', e);
    }

    // Filter routes that have at least one price
    const routesWithPrices = routes.filter(r => r.prices && r.prices.length > 0);

    if (routesWithPrices.length === 0) {
        return (
            <div className="text-center py-16 text-white/50">
                <p>Prices are being configured. Please check back shortly or <a href="/booking" className="text-gold underline">get a custom quote</a>.</p>
            </div>
        );
    }

    return (
        <PricingClientUX 
            routes={routesWithPrices} 
            vehicles={vehicles} 
            exchangeRate={exchangeRate} 
        />
    );
}
