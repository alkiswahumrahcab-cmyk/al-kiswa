import { routeService, RouteWithPrices } from '@/services/routeService';
import { vehicleService } from '@/services/vehicleService';
import { settingsService } from '@/services/settingsService';
import Link from 'next/link';
import { MapPin, Clock, Users, Luggage, ArrowRight, CheckCircle2 } from 'lucide-react';

// Vehicle display config (sort order + display name)
const VEHICLE_DISPLAY: Record<string, { label: string; pax: string; bags: string; badge?: string }> = {
    camry:  { label: 'Sedan', pax: '3 Pax', bags: '2 Bags' },
    staria: { label: 'Family Van', pax: '7 Pax', bags: '5 Bags' },
    starex: { label: 'Family Van', pax: '7 Pax', bags: '5 Bags' },
    gmc:    { label: 'VIP SUV', pax: '7 Pax', bags: '5 Bags', badge: 'VIP' },
    yukon:  { label: 'VIP SUV', pax: '7 Pax', bags: '5 Bags', badge: 'VIP' },
    hiace:  { label: 'Group Bus', pax: '10 Pax', bags: '10 Bags' },
};

function getVehicleDisplay(vehicleName: string) {
    const n = vehicleName.toLowerCase();
    for (const [key, val] of Object.entries(VEHICLE_DISPLAY)) {
        if (n.includes(key)) return val;
    }
    return { label: vehicleName, pax: '—', bags: '—' };
}

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
            <div className="text-center py-16 text-gray-500">
                <p>Prices are being configured. Please check back shortly or <a href="/booking" className="text-gold-primary underline">get a custom quote</a>.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-6xl mx-auto">
            {routesWithPrices.map((route, ri) => {
                const features = getFeatures(route.origin, route.destination);

                // Build price rows — match price entries to vehicle names
                const priceRows = (route.prices || [])
                    .map(p => {
                        // Try exact id match first, then string conversion fallback
                        const vehicle = vehicles.find(v =>
                            v.id === p.vehicleId ||
                            v._id?.toString() === p.vehicleId ||
                            String(v.id) === String(p.vehicleId)
                        );
                        if (!vehicle || p.price <= 0) return null;
                        const display = getVehicleDisplay(vehicle.name);
                        return { ...display, priceSAR: p.price, vehicleName: vehicle.name };
                    })
                    .filter(Boolean)
                    .sort((a, b) => a!.priceSAR - b!.priceSAR);


                const lowestPrice = priceRows[0]?.priceSAR ?? 0;
                const isPopular = ri === 0;

                return (
                    <div
                        key={route.id}
                        className={`relative rounded-3xl border overflow-hidden transition-all duration-300 group hover:shadow-2xl hover:shadow-gold-primary/10 ${
                            isPopular
                                ? 'border-gold-primary/50 bg-gradient-to-br from-neutral-900 to-black shadow-[0_0_40px_rgba(212,175,55,0.08)]'
                                : 'border-white/8 bg-neutral-900/60'
                        }`}
                    >
                        {isPopular && (
                            <div className="absolute top-0 right-0 bg-gold-primary text-black font-bold text-xs uppercase tracking-widest px-5 py-1.5 rounded-bl-2xl">
                                Most Popular
                            </div>
                        )}

                        <div className="p-6 md:p-8">
                            {/* Route Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/8">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                                        <MapPin size={20} className="text-gold-primary shrink-0" />
                                        {route.origin} <ArrowRight size={16} className="text-gray-500" /> {route.destination}
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                        {route.distance && (
                                            <span className="flex items-center gap-1.5">
                                                <MapPin size={14} className="text-gold-primary/60" />
                                                {route.distance} km
                                            </span>
                                        )}
                                        {route.duration && (
                                            <span className="flex items-center gap-1.5">
                                                <Clock size={14} className="text-gold-primary/60" />
                                                {route.duration}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {lowestPrice > 0 && (
                                    <div className="shrink-0 text-right">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting from</p>
                                        <div className="flex items-baseline gap-1 justify-end">
                                            <span className="text-4xl font-black text-gold-primary">{formatSAR(lowestPrice)}</span>
                                            <span className="text-lg font-bold text-gray-400">SAR</span>
                                        </div>
                                        <p className="text-sm text-gray-500">≈ ${formatUSD(lowestPrice, exchangeRate)} USD</p>
                                    </div>
                                )}
                            </div>

                            {/* Vehicle Price Grid + Features */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Left: Vehicle Prices */}
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Price by Vehicle Class</p>
                                    <div className="space-y-2">
                                        {priceRows.map((row, i) => row && (
                                            <div
                                                key={i}
                                                className={`flex items-center justify-between p-3 rounded-xl border ${
                                                    i === 0
                                                        ? 'border-gold-primary/30 bg-gold-primary/5'
                                                        : 'border-white/5 bg-white/3'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <span className="text-white font-semibold text-sm flex items-center gap-2">
                                                            {row.label}
                                                            {row.badge && (
                                                                <span className="bg-gold-primary text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                                                                    {row.badge}
                                                                </span>
                                                            )}
                                                        </span>
                                                        <span className="text-gray-500 text-xs">
                                                            {row.pax} · {row.bags}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-white font-black text-lg">{formatSAR(row.priceSAR)}</span>
                                                    <span className="text-gold-primary font-bold text-sm ml-1">SAR</span>
                                                    <p className="text-gray-500 text-xs">${formatUSD(row.priceSAR, exchangeRate)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right: Features + CTA */}
                                <div className="flex flex-col justify-between gap-4">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Included in Price</p>
                                        <ul className="space-y-2">
                                            {features.map((f, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                                    <CheckCircle2 size={15} className="text-gold-primary shrink-0" />
                                                    {f}
                                                </li>
                                            ))}
                                            <li className="flex items-center gap-2 text-sm text-gray-300">
                                                <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                                <span className="text-emerald-400 font-semibold">All taxes &amp; tolls included</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <Link
                                        href={`/booking?route=${route.id}`}
                                        className={`block w-full py-4 text-center font-bold uppercase tracking-wider rounded-xl transition-all text-sm ${
                                            isPopular
                                                ? 'bg-gold-primary text-black hover:bg-white'
                                                : 'bg-white/8 text-white border border-white/10 hover:bg-gold-primary hover:text-black hover:border-gold-primary'
                                        }`}
                                    >
                                        Book This Route
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* "See more routes" link if > 3 routes */}
            <p className="text-center text-sm text-gray-500 mt-4">
                Need a custom route?{' '}
                <Link href="/booking" className="text-gold-primary hover:text-white transition-colors underline">
                    Get an instant quote for your specific dates →
                </Link>
            </p>
        </div>
    );
}
