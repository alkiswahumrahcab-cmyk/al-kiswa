'use client';

import React from 'react';
import Image from 'next/image';
import { 
    Star, 
    User, 
    Luggage, 
    Snowflake, 
    Armchair, 
    UserCog, 
    GlassWater, 
    Handshake, 
    Info, 
    ArrowRight 
} from 'lucide-react';
import Link from 'next/link';

export interface Vehicle {
    id: string;
    name: string;
    image: string;
    passengers: number | string;
    luggage: number;
    features: string[];
    price: string;
    category?: string;
    rating?: number;
}

interface PremiumFleetCardProps {
    vehicle: Vehicle;
    badgeText?: string;
    reviewCount?: number;
}

export default function PremiumFleetCard({ 
    vehicle, 
    badgeText = "Best Value",
    reviewCount = 112
}: PremiumFleetCardProps) {
    return (
        <article className="group relative flex flex-col w-full max-w-[360px] md:max-w-[380px] lg:max-w-[400px] h-full min-h-[540px] rounded-[24px] overflow-hidden bg-surface border border-gold/20 p-5 lg:p-6 hover:-translate-y-2 transition-all duration-300 ease-out shadow-sm hover:shadow-md z-10 hover:z-20">
            {/* Background Base */}
            <div className="absolute inset-0 bg-bg -z-20" />
            
            {/* Glassmorphism layer */}
            <div className="absolute inset-0 bg-surface/80 backdrop-blur-[8px] -z-10" />

            {/* Glowing Effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-gold/15 rounded-full blur-[80px] opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-300 pointer-events-none -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Top Badge */}
            <div className="absolute top-6 left-6 z-20">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-bg border border-gold text-gold text-[9px] uppercase font-bold tracking-widest shadow-sm">
                    <Star size={12} className="fill-gold" />
                    {badgeText}
                </div>
            </div>

            {/* Vehicle Image Container */}
            <div className="relative w-full h-[180px] mb-4 flex items-center justify-center">
                <div className="relative w-full h-full transform transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                    <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]"
                        priority
                        sizes="(max-width: 768px) 100vw, 400px"
                    />
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-col flex-grow relative z-10 mt-auto">
                {/* Header: Title, Category, Rating */}
                <div className="mb-4">
                    <h3 className="text-[26px] leading-tight font-display text-ink mb-1 tracking-wide">
                        {vehicle.name}
                    </h3>
                    <p className="text-ink-muted text-[14px] mb-2 font-medium">
                        {vehicle.category || "Executive Sedan"}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <div className="flex text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="fill-gold" />
                            ))}
                        </div>
                        <div className="flex items-center gap-2 text-[13px] text-ink-muted">
                            <span className="font-bold text-ink">{vehicle.rating || "4.9"}</span>
                            <span>({reviewCount})</span>
                            <span className="w-1 h-1 rounded-full bg-border-strong" />
                            <span>Verified Reviews</span>
                        </div>
                    </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-3 bg-[var(--color-surface-alt)] py-2 px-3 rounded-[14px] border border-border">
                        <User size={18} strokeWidth={1.5} className="text-gold" />
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider text-ink-muted font-bold mb-0.5">Passengers</span>
                            <span className="text-[13px] text-ink font-bold">{vehicle.passengers} Adults</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 bg-[var(--color-surface-alt)] py-2 px-3 rounded-[14px] border border-border">
                        <Luggage size={18} strokeWidth={1.5} className="text-gold" />
                        <div className="flex flex-col">
                            <span className="text-[9px] uppercase tracking-wider text-ink-muted font-bold mb-0.5">Luggage</span>
                            <span className="text-[13px] text-ink font-bold">{vehicle.luggage} Bags</span>
                        </div>
                    </div>
                </div>

                {/* Premium Features Row */}
                <div className="flex justify-between items-start mb-5 px-1">
                    <div className="flex flex-col items-center gap-1.5 max-w-[55px] text-center">
                        <Snowflake size={20} strokeWidth={1.5} className="text-gold mb-0.5" />
                        <span className="text-[9px] text-ink-muted leading-tight">Air Conditioned</span>
                    </div>
                    <div className="w-[1px] h-8 bg-border" />
                    <div className="flex flex-col items-center gap-1.5 max-w-[55px] text-center">
                        <Armchair size={20} strokeWidth={1.5} className="text-gold mb-0.5" />
                        <span className="text-[9px] text-ink-muted leading-tight">Leather Seats</span>
                    </div>
                    <div className="w-[1px] h-8 bg-border" />
                    <div className="flex flex-col items-center gap-1.5 max-w-[55px] text-center">
                        <UserCog size={20} strokeWidth={1.5} className="text-gold mb-0.5" />
                        <span className="text-[9px] text-ink-muted leading-tight">Professional Chauffeur</span>
                    </div>
                    <div className="w-[1px] h-8 bg-border" />
                    <div className="flex flex-col items-center gap-1.5 max-w-[55px] text-center">
                        <GlassWater size={20} strokeWidth={1.5} className="text-gold mb-0.5" />
                        <span className="text-[9px] text-ink-muted leading-tight">Free Water</span>
                    </div>
                    <div className="w-[1px] h-8 bg-border" />
                    <div className="flex flex-col items-center gap-1.5 max-w-[55px] text-center">
                        <Handshake size={20} strokeWidth={1.5} className="text-gold mb-0.5" />
                        <span className="text-[9px] text-ink-muted leading-tight">Meet & Greet</span>
                    </div>
                </div>

                {/* Price Section */}
                <div className="mb-5 flex flex-col">
                    <span className="text-ink-muted text-[11px] uppercase tracking-wider mb-1 font-bold">Starting from</span>
                    <div className="flex items-end gap-1">
                        <span className="text-gold font-bold text-lg mb-1.5">SAR</span>
                        <span className="text-ink text-[32px] leading-none font-bold tracking-tight">{vehicle.price}</span>
                    </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link 
                        href={`/fleet/${vehicle.id}`}
                        className="flex items-center justify-center h-[48px] rounded-[14px] bg-transparent border border-border-strong text-ink font-bold text-[13px] tracking-wide hover:bg-[var(--color-surface-alt)] hover:border-gold transition-colors"
                    >
                        View Details
                    </Link>
                    <Link 
                        href={`/booking?vehicle=${vehicle.id}`}
                        className="flex items-center justify-center gap-2 h-[48px] rounded-[14px] bg-gradient-to-r from-gold to-yellow-600 text-black font-bold text-[13px] tracking-wide hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-shadow"
                    >
                        Book Now
                        <ArrowRight size={16} className="text-black" />
                    </Link>
                </div>
            </div>
        </article>
    );
}
