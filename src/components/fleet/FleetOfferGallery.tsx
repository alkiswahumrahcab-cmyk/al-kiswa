'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
        image: '/images/fleet/camry-2025.png',
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
        image: '/images/fleet/gmc-yukon-2025.png',
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
        image: '/images/fleet/toyota-hiace-2025.png',
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
        image: '/images/fleet/hyundai-staria-2025.png',
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
        image: '/images/fleet/hyundai-h1.png',
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
        image: '/images/fleet/toyota-coaster-studio.png',
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
        <section className="py-16 bg-primary-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-900/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10">
                    <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs mb-2 block">
                        Limited Time Offers
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Exclusive <span className="text-gold-primary italic font-serif">Fleet Deals</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayVehicles.map((vehicle, idx) => (
                        <motion.div
                            key={vehicle.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group h-full"
                        >
                            <div className="relative h-full flex flex-col bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-gold-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-gold-primary/5">

                                {/* Discount Badge */}
                                {(vehicle.discountLabel || vehicle.discount) && (
                                    <div className="absolute top-4 left-4 z-20">
                                        <div className="bg-gold-primary text-black font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wide shadow-lg shadow-gold-primary/20 animate-pulse">
                                            {vehicle.discountLabel || vehicle.discount}
                                        </div>
                                    </div>
                                )}

                                {/* Rating */}
                                {vehicle.rating && (
                                    <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 flex items-center gap-1">
                                        <Star size={10} className="fill-gold-primary text-gold-primary" />
                                        <span className="text-xs text-white font-bold">{vehicle.rating}</span>
                                    </div>
                                )}

                                {/* Image Container - Maximum Size */}
                                <div className="relative w-full h-64 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center overflow-visible group-hover:bg-white/5 transition-colors duration-500">
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                    <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={idx < 3}
                                        />
                                    </div>
                                </div>

                                {/* Content - Flex 1 to push footer down */}
                                <div className="flex flex-col flex-1 p-5 bg-[#121212]">

                                    {/* Header */}
                                    <div className="mb-4">
                                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1 block">
                                            {vehicle.category || vehicle.type}
                                        </span>
                                        <h3 className="text-xl font-bold text-white group-hover:text-gold-primary transition-colors leading-tight">
                                            {vehicle.name}
                                        </h3>
                                    </div>

                                    {/* Specs Grid */}
                                    <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-t border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white/5 rounded text-gold-primary">
                                                <Users size={14} />
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">{vehicle.capacity || vehicle.passengers} Pax</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 bg-white/5 rounded text-gold-primary">
                                                <Briefcase size={14} />
                                            </div>
                                            <span className="text-xs text-gray-400 font-medium">{vehicle.luggage} Bags</span>
                                        </div>
                                    </div>

                                    {/* Footer: Price & Button */}
                                    <div className="mt-auto flex items-end justify-between pt-2">
                                        <div>
                                            {(vehicle.offerPrice || vehicle.originalPrice) && (
                                                <span className="block text-[10px] text-gray-600 line-through mb-1">
                                                    {vehicle.originalPrice || vehicle.price}
                                                </span>
                                            )}
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-2xl font-bold text-white leading-none">
                                                    {vehicle.offerPrice || vehicle.price}
                                                </span>
                                                {!String(vehicle.price || '').toLowerCase().includes('trip') && (
                                                    <span className="text-[10px] text-gray-500 uppercase font-medium">/ Trip</span>
                                                )}
                                            </div>
                                        </div>

                                        <GlassButton
                                            href="/booking"
                                            variant="primary"
                                            size="sm"
                                            className="!px-5 !py-2 !text-xs !font-bold rounded-lg group-hover:bg-gold-primary group-hover:text-black hover:scale-105 transition-all"
                                        >
                                            Book Now
                                        </GlassButton>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
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
