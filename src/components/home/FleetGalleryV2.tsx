'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Briefcase, ArrowRight, Star } from 'lucide-react';
import PremiumFleetCard from '../fleet/PremiumFleetCard';

const FLEET_IMAGES = [
    {
        src: '/images/fleet/camry-2025.webp',
        alt: 'Toyota Camry 2025 White Studio Shot',
        name: 'Toyota Camry',
        badge: 'Best Value',
        capacity: '4 Pax',
        luggage: '2 Bags',
        url: '/fleet/toyota-camry',
        rating: 4.8
    },
    {
        src: '/images/fleet/gmc-yukon-2025.webp',
        alt: 'GMC Yukon XL 2025 Black Studio Shot',
        name: 'GMC Yukon XL',
        badge: 'VIP Choice',
        capacity: '7 Pax',
        luggage: '5 Bags',
        url: '/fleet/gmc-yukon-at4',
        rating: 5.0
    },
    {
        src: '/images/fleet/toyota-hiace-2025.webp',
        alt: 'Toyota Hiace High Roof Studio Shot',
        name: 'Toyota Hiace',
        badge: 'Large Groups',
        capacity: '10 Pax',
        luggage: '8 Bags',
        url: '/fleet/toyota-hiace',
        rating: 4.9
    },
    {
        src: '/images/fleet/hyundai-staria-2025.webp',
        alt: 'Hyundai Staria 2025 Studio Shot',
        name: 'Hyundai Staria',
        badge: 'Family Favorite',
        capacity: '7 Pax',
        luggage: '4 Bags',
        url: '/fleet/hyundai-staria',
        rating: 4.9
    },
    {
        src: '/images/fleet/hyundai-h1.webp',
        alt: 'Hyundai H1 Starex Studio Shot',
        name: 'Hyundai H1 Starex',
        badge: 'Comfort',
        capacity: '7 Pax',
        luggage: '4 Bags',
        url: '/fleet/hyundai-starex',
        rating: 4.8
    },
    {
        src: '/images/fleet/toyota-coaster-2025.webp',
        alt: 'Toyota Coaster Luxury Bus Studio Shot',
        name: 'Toyota Coaster',
        badge: 'Groups 20+',
        capacity: '22 Pax',
        luggage: '15 Bags',
        url: '/fleet/toyota-coaster',
        rating: 4.8
    },
];

export default function FleetGalleryV2() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const displayImages = FLEET_IMAGES;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -420 : 420;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-bg relative overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-gold"></div>
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs">
                                The Royal Fleet
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display text-ink mb-6 leading-tight">
                            Luxury Vehicles for <br />
                            <span className="text-gold italic font-serif">Every Journey</span>
                        </h2>
                        <p className="text-ink-muted text-lg leading-relaxed max-w-xl font-light">
                            Meticulously maintained GMC Yukons, H1 Vans, and Buses.
                            Designed for the comfort of pilgrims in Makkah & Madinah.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-300 active:scale-95 group"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-300 active:scale-95 group"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Slider */}
            <div className="relative w-full overflow-hidden pb-12">
                {/* Floating Navigation Buttons - Always visible on Desktop to prompt scrolling */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-ink/80 backdrop-blur-md border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-ink hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex group"
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={() => scroll('right')}
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-ink/80 backdrop-blur-md border border-gold/30 text-gold flex items-center justify-center hover:bg-gold hover:text-ink hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hidden md:flex group"
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <motion.div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto px-4 md:px-16 pb-12 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{
                        scrollSnapType: 'x mandatory'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {displayImages.map((img, idx) => {
                        const vehicle = {
                            id: img.url.replace('/fleet/', ''),
                            name: img.name,
                            image: img.src,
                            passengers: parseInt(img.capacity) || 4,
                            luggage: parseInt(img.luggage) || 2,
                            features: ["Air Conditioned", "Leather Seats", "Professional Chauffeur", "Free Water", "Airport Meet & Greet"],
                            price: img.name.includes("Hiace") || img.name.includes("Staria") ? "350" : img.name.includes("Yukon") ? "450" : "220",
                            category: img.badge,
                            rating: img.rating
                        };

                        return (
                            <div 
                                key={`${img.name}-${idx}`} 
                                className="shrink-0 scroll-snap-align-start perspective-1000 block h-full flex"
                            >
                                <PremiumFleetCard vehicle={vehicle} badgeText={img.badge} reviewCount={112} />
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
