'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Briefcase, Check, ArrowRight, Star } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

interface Vehicle {
    id?: string;
    name: string;
    image: string;
    passengers?: number;
    capacity?: string;
    luggage: number | string;
    price?: string;
    offerPrice?: string;
    originalPrice?: string;
    discountLabel?: string;
    discount?: string;
    features: string[];
    category?: string;
    type?: string;
    rating?: number;
    badge?: string;
}

interface FleetOfferGalleryProps {
    vehicles?: Vehicle[];
}

const FLEET_OFFERS: Vehicle[] = [
    {
        id: 'camry',
        name: 'Toyota Camry 2025',
        type: 'Sedan',
        image: '/images/fleet/camry-2025.webp',
        capacity: '4 Pax',
        luggage: '2 Bags',
        originalPrice: '250 SAR',
        offerPrice: '200 SAR',
        discount: '20% OFF',
        features: ['Free WiFi', 'USB Charging', 'City Transfer'],
        rating: 4.8,
        badge: 'Best Value',
        category: 'Sedan'
    },
    {
        id: 'yukon',
        name: 'GMC Yukon XL 2025',
        type: 'VIP SUV',
        image: '/images/fleet/gmc-yukon-2025.webp',
        capacity: '7 Pax',
        luggage: '5 Bags',
        originalPrice: '600 SAR',
        offerPrice: '450 SAR',
        discount: 'Save 150 SAR',
        features: ['Leather Seats', 'Privacy Tint', 'VIP Service'],
        rating: 5.0,
        badge: 'Top Choice',
        category: 'VIP SUV'
    },
    {
        id: 'hiace',
        name: 'Toyota Hiace',
        type: 'Mini Van',
        image: '/images/fleet/toyota-hiace-2025.webp',
        capacity: '10 Pax',
        luggage: '8 Bags',
        originalPrice: '400 SAR',
        offerPrice: '350 SAR',
        discount: 'Family Deal',
        features: ['High Roof', 'Spacious AC', 'Group Travel'],
        rating: 4.9,
        badge: 'Most Popular',
        category: 'Mini Van'
    },
    {
        id: 'staria',
        name: 'Hyundai Staria',
        type: 'Luxury Van',
        image: '/images/fleet/hyundai-staria-2025.webp',
        capacity: '7 Pax',
        luggage: '4 Bags',
        originalPrice: '550 SAR',
        offerPrice: '400 SAR',
        discount: 'Limited Time',
        features: ['Panoramic View', 'Reclining Seats', 'Premium Interior'],
        rating: 4.9,
        badge: 'New Arrival',
        category: 'Luxury Van'
    },
    {
        id: 'starex',
        name: 'Hyundai H1',
        type: 'Comfort Van',
        image: '/images/fleet/hyundai-h1.webp',
        capacity: '7 Pax',
        luggage: '4 Bags',
        originalPrice: '350 SAR',
        offerPrice: '300 SAR',
        discount: 'Economy',
        features: ['Comfort Ride', 'Clean Interior', 'Budget Friendly'],
        rating: 4.8,
        badge: 'Budget Pick',
        category: 'Comfort Van'
    },
    {
        id: 'coaster',
        name: 'Toyota Coaster',
        type: 'Luxury Bus',
        image: '/images/fleet/toyota-coaster-2025.webp',
        capacity: '22 Pax',
        luggage: '15 Bags',
        originalPrice: '800 SAR',
        offerPrice: '650 SAR',
        discount: 'Group Special',
        features: ['Microphone', 'Curtains', 'Large Group'],
        rating: 4.8,
        badge: 'Groups 20+',
        category: 'Luxury Bus'
    }
];

export default function FleetOfferGallery({ vehicles = [] }: FleetOfferGalleryProps) {
    const displayVehicles = vehicles.length > 0 ? vehicles : FLEET_OFFERS;

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
                    {displayVehicles.map((vehicle, idx) => (
                        <div
                            key={vehicle.id || idx}
                            className="group h-full"
                        >
                            <div className="relative h-full flex flex-col bg-surface border border-border shadow-sm rounded-xl overflow-hidden hover:shadow-md hover:border-border-strong transition-all duration-300">

                                {/* Discount Badge */}
                                {(vehicle.discountLabel || vehicle.discount) && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-gold-soft text-gold-strong font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wide">
                                            {vehicle.discountLabel || vehicle.discount}
                                        </div>
                                    </div>
                                )}

                                {/* Rating */}
                                {vehicle.rating && (
                                    <div className="absolute top-4 right-4 z-20 bg-surface-alt px-2 py-1 rounded-full border border-border flex items-center gap-1 shadow-xs">
                                        <Star size={10} className="fill-gold text-gold" />
                                        <span className="text-xs text-ink font-bold">{vehicle.rating}</span>
                                    </div>
                                )}

                                {/* Image Container - Maximum Size */}
                                <div className="relative w-full h-64 bg-surface-sunken flex items-center justify-center overflow-visible group-hover:bg-surface-alt transition-colors duration-500">
                                    <div className="relative w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
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
                                            {vehicle.category || vehicle.type}
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
                                            <span className="text-xs text-muted font-medium">{vehicle.capacity || vehicle.passengers} Pax</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-gold-soft rounded-md text-gold-strong">
                                                <Briefcase size={14} />
                                            </div>
                                            <span className="text-xs text-muted font-medium">{vehicle.luggage} Bags</span>
                                        </div>
                                    </div>

                                    {/* Footer: Price & Button */}
                                    <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                        <div>
                                            {(vehicle.offerPrice || vehicle.originalPrice) && (
                                                <span className="block text-[10px] text-muted line-through mb-1">
                                                    {vehicle.originalPrice || vehicle.price}
                                                </span>
                                            )}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold font-display text-ink leading-none">
                                                    {vehicle.offerPrice || vehicle.price}
                                                </span>
                                                {!String(vehicle.price || '').toLowerCase().includes('trip') && (
                                                    <span className="text-[10px] text-muted uppercase font-medium">/ Trip</span>
                                                )}
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
                    ))}
                </div>
            </div>
        </section>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
