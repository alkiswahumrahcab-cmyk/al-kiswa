'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Briefcase, Check, ArrowRight, Star } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import { FLEET, formatSeats, formatLuggage, Vehicle } from '@/data/fleet';

interface FleetOfferGalleryProps {
    vehicles?: Vehicle[];
}

import { PROMO_PRICES } from '@/data/pricing';

const RATINGS: Record<string, number> = {
    'toyota-camry': 4.8,
    'gmc-yukon-xl': 5.0,
    'toyota-hiace': 4.9,
    'hyundai-staria': 4.9,
    'hyundai-starex': 4.8,
    'toyota-coaster': 4.8,
    'mitsubishi-xpander': 4.7
};

export default function FleetOfferGallery({ vehicles = [] }: FleetOfferGalleryProps) {
    const displayVehicles = vehicles.length > 0 ? vehicles : FLEET.filter(v => v.bookable);

    if (displayVehicles.length === 0) return null;

    return (
        <section className="py-24 bg-surface-alt relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold-strong font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Limited Time Offers
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold font-display text-ink mb-4">
                        Exclusive <span className="text-gold italic font-serif">Fleet Deals</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayVehicles.map((vehicle, idx) => {
                        const promo = PROMO_PRICES[vehicle.id];
                        const isExpired = promo ? new Date(promo.expiresAt).getTime() < Date.now() : true;
                        
                        const displayOriginalPrice = promo ? `${promo.wasPrice} SAR` : null;
                        const displayOfferPrice = promo ? (isExpired ? `${promo.wasPrice} SAR` : `${promo.nowPrice} SAR`) : null;
                        const displayDiscount = (!isExpired && promo) ? promo.label : null;
                        const rating = RATINGS[vehicle.id] || 4.8;
                        
                        return (
                        <div
                            key={vehicle.id || idx}
                            className="group h-full"
                        >
                            <div className="relative h-full flex flex-col bg-surface border border-border shadow-sm rounded-xl overflow-hidden hover:shadow-md hover:border-border-strong transition-all duration-300">

                                {/* Discount Badge */}
                                {displayDiscount && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-gold-soft text-gold-strong font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
                                            {displayDiscount}
                                        </div>
                                    </div>
                                )}

                                {/* Rating */}
                                {rating && (
                                    <div className="absolute top-4 right-4 z-20 bg-surface-alt px-2 py-1 rounded-full border border-border flex items-center gap-1 shadow-xs">
                                        <Star size={10} className="fill-gold text-gold" />
                                        <span className="text-xs text-ink font-bold">{rating}</span>
                                    </div>
                                )}

                                {/* Image Container - Maximum Size */}
                                <div className="relative w-full h-64 bg-surface-sunken flex items-center justify-center overflow-visible group-hover:bg-surface-alt transition-colors duration-500">
                                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                                        <Image
                                            src={vehicle.image.card}
                                            alt={vehicle.image.alt || vehicle.name}
                                            fill
                                            className="object-contain drop-shadow-xl"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={idx < 3}
                                        />
                                    </div>
                                </div>

                                {/* Content - Flex 1 to push footer down */}
                                <div className="flex flex-col flex-1 p-6 bg-surface">

                                    {/* Header */}
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2 block">
                                            {vehicle.categoryLabel}
                                        </span>
                                        <h3 className="text-2xl font-bold font-display text-ink group-hover:text-gold-strong transition-colors leading-tight">
                                            {vehicle.name}
                                        </h3>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-t border-b border-border">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gold-soft rounded-md text-gold-strong">
                                                <Users size={14} />
                                            </div>
                                            <span className="text-xs text-muted font-medium">{formatSeats(vehicle)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gold-soft rounded-md text-gold-strong">
                                                <Briefcase size={14} />
                                            </div>
                                            <span className="text-xs text-muted font-medium">{formatLuggage(vehicle)}</span>
                                        </div>
                                    </div>

                                    {/* Footer: Price & Button */}
                                    <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                        <div>
                                            {displayOriginalPrice && !isExpired && (
                                                <span className="block text-[10px] text-muted line-through mb-1">
                                                    {displayOriginalPrice}
                                                </span>
                                            )}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold font-display text-ink leading-none">
                                                    {displayOfferPrice || 'Contact Us'}
                                                </span>
                                                <span className="text-[10px] text-muted uppercase font-medium">
                                                    / {isExpired ? 'Trip' : 'Limited Offer'}
                                                </span>
                                            </div>
                                        </div>

                                        <a
                                            href="/booking"
                                            className="btn-primary !py-2.5 !px-6 text-sm whitespace-nowrap"
                                        >
                                            Book Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </section>
    );
}
