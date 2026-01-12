'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import pricingData from '@/data/pricing.json';
import { trackConversion } from '@/lib/analytics';
import GlassCard from '@/components/ui/GlassCard';

interface RouteProduct {
    id: string;
    title: string;
    price: string;
    image: string;
}

interface FleetPricingGridProps {
    vehicleId: string;
    vehicleImage: string;
    vehicleType: string; // 'camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster'
    title?: string;
    subtitle?: string;
}

const PricingCard = ({ route, dbVehicleId }: { route: RouteProduct; dbVehicleId: string }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => setQuantity(prev => prev + 1);
    const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    return (
        <GlassCard className="group h-full flex flex-col justify-between p-4 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:-translate-y-1 relative overflow-hidden">
            {/* Decorator */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent rounded-bl-full -mr-6 -mt-6 transition-transform group-hover:scale-150 duration-500 ease-out pointer-events-none" />

            <div>
                <div className="relative w-full aspect-[16/9] mb-4 bg-black/20 rounded-xl overflow-hidden border border-white/5">
                    <Image
                        src={route.image}
                        alt={route.title}
                        fill
                        className="object-contain drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 33vw, 25vw"
                    />
                </div>

                <div className="text-center space-y-2 mb-4">
                    <h3 className="font-bold text-xs sm:text-sm leading-tight h-[2.5rem] flex items-center justify-center text-white group-hover:text-[#D4AF37] transition-colors line-clamp-2 font-sans">
                        {route.title}
                    </h3>

                    <div className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] font-sans tracking-tight">
                        {route.price}
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/10">
                {/* Quantity Simulator */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        onClick={handleDecrement}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-gray-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                        <Minus size={12} />
                    </button>
                    <span className="font-bold text-sm text-white w-6 text-center">{quantity}</span>
                    <button
                        onClick={handleIncrement}
                        className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] text-gray-400 flex items-center justify-center transition-colors border border-white/5"
                    >
                        <Plus size={12} />
                    </button>
                </div>

                <Link
                    href={`/booking?vehicle=${dbVehicleId}`}
                    onClick={() => trackConversion('other', `pricing_grid_${route.id}_${dbVehicleId}`)}
                    className="block w-full bg-gradient-to-r from-[#D4AF37] to-[#B4932F] text-black font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-[#D4AF37]/30 text-center uppercase tracking-wider hover:scale-[1.02]"
                >
                    Book Now
                </Link>
            </div>
        </GlassCard>
    );
};

export default function FleetPricingGrid({
    vehicleId,
    vehicleImage,
    vehicleType,
    title,
    subtitle
}: FleetPricingGridProps) {
    // Generate routes based on pricing.json
    const routes: RouteProduct[] = pricingData.routes
        .filter(r => r.customRates && (r.customRates as any)[vehicleType])
        .map(r => ({
            id: r.id,
            title: r.name,
            price: `${(r.customRates as any)[vehicleType]}.00 SR`,
            image: vehicleImage
        }))
        // Filter out some less common routes for the grid to keep it clean (like train stations)
        .filter(r => !r.title.toLowerCase().includes('train'))
        .filter(r => !r.title.toLowerCase().includes('train')); // Show all routes except train

    return (
        <section className="py-24 bg-transparent relative z-10">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Fixed Rates</span>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans text-white">
                            {title || `Affordable ${vehicleType.toUpperCase()} Services`}
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
                            {subtitle || `Best value and comfort for your journey. Enjoy a premium ride with our ${vehicleType.toUpperCase()} fleet.`}
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {routes.map((route, index) => (
                        <FadeIn key={route.id} delay={index * 0.05} scale>
                            <PricingCard route={route} dbVehicleId={vehicleId} />
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
