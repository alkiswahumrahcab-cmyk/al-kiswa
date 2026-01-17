'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Users, Briefcase, ArrowRight, Star } from 'lucide-react';

const FLEET_IMAGES = [
    {
        src: '/images/fleet/camry-studio.png',
        alt: 'Toyota Camry 2025 White Studio Shot',
        name: 'Toyota Camry',
        badge: 'Best Value',
        capacity: '4 Pax',
        luggage: '2 Bags',
        url: '/fleet/toyota-camry',
        rating: 4.8
    },
    {
        src: '/images/fleet/gmc-yukon-studio.png',
        alt: 'GMC Yukon XL 2025 Black Studio Shot',
        name: 'GMC Yukon XL',
        badge: 'VIP Choice',
        capacity: '7 Pax',
        luggage: '5 Bags',
        url: '/fleet/gmc-yukon-at4',
        rating: 5.0
    },
    {
        src: '/images/fleet/toyota-hiace-studio.png',
        alt: 'Toyota Hiace High Roof Studio Shot',
        name: 'Toyota Hiace',
        badge: 'Large Groups',
        capacity: '10 Pax',
        luggage: '8 Bags',
        url: '/fleet/toyota-hiace',
        rating: 4.9
    },
    {
        src: '/images/fleet/hyundai-staria-studio.png',
        alt: 'Hyundai Staria 2025 Studio Shot',
        name: 'Hyundai Staria',
        badge: 'Family Favorite',
        capacity: '7 Pax',
        luggage: '4 Bags',
        url: '/fleet/hyundai-staria',
        rating: 4.9
    },
    {
        src: '/images/fleet/hyundai-starex-studio.png',
        alt: 'Hyundai H1 Starex Studio Shot',
        name: 'Hyundai H1 Starex',
        badge: 'Comfort',
        capacity: '7 Pax',
        luggage: '4 Bags',
        url: '/fleet/hyundai-starex',
        rating: 4.8
    },
    {
        src: '/images/fleet/toyota-coaster-studio.png',
        alt: 'Toyota Coaster Luxury Bus Studio Shot',
        name: 'Toyota Coaster',
        badge: 'Groups 20+',
        capacity: '22 Pax',
        luggage: '15 Bags',
        url: '/fleet/toyota-coaster',
        rating: 4.8
    },
];

export default function FleetGallery() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const displayImages = [...FLEET_IMAGES, ...FLEET_IMAGES];

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -420 : 420;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="container mx-auto px-4 mb-16 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-gold-primary"></div>
                            <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs">
                                The Royal Fleet
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sans text-white mb-6 leading-tight">
                            Luxury Vehicles for <br />
                            <span className="text-gold-primary italic font-serif">Every Journey</span>
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-xl font-light">
                            Meticulously maintained GMC Yukons, H1 Vans, and Buses.
                            Designed for the comfort of pilgrims in Makkah & Madinah.
                        </p>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:border-gold-primary hover:text-gold-primary transition-all duration-300 active:scale-95 group"
                            aria-label="Previous"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:border-gold-primary hover:text-gold-primary transition-all duration-300 active:scale-95 group"
                            aria-label="Next"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Gallery Slider */}
            <div className="relative w-full overflow-hidden pb-12">
                <motion.div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto px-4 md:px-8 pb-12 cursor-grab active:cursor-grabbing select-none hide-scrollbar"
                    style={{
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {displayImages.map((img, idx) => (
                        <Link
                            key={`${img.name}-${idx}`}
                            href={img.url}
                            className="group relative w-[340px] h-[480px] md:w-[400px] md:h-[520px] shrink-0 scroll-snap-align-start perspective-1000 block"
                            draggable={false}
                        >
                            <article className="w-full h-full relative bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-gold-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/5 flex flex-col">
                                {/* Image Area */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80" />
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                                        sizes="(max-width: 768px) 320px, 400px"
                                        draggable={false}
                                    />

                                    {/* Badge */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            {img.badge}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-1 relative z-10">
                                    <div className="mb-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2 font-sans group-hover:text-gold-primary transition-colors">{img.name}</h3>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star key={star} size={12} className="fill-gold-primary text-gold-primary" />
                                                    ))}
                                                    <span className="text-xs text-gray-500 font-medium ml-2">({img.rating})</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Specs - Minimalist Row */}
                                        <div className="flex items-center gap-6 py-4 border-t border-white/10 border-b">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                                                    <Users size={14} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest leading-none mb-1">Capacity</span>
                                                    <span className="text-sm font-bold text-white leading-none">{img.capacity}</span>
                                                </div>
                                            </div>
                                            <div className="w-px h-8 bg-white/10" />
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary">
                                                    <Briefcase size={14} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest leading-none mb-1">Luggage</span>
                                                    <span className="text-sm font-bold text-white leading-none">{img.luggage}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-2 flex items-center justify-between group/btn">
                                        <span className="font-bold text-xs uppercase tracking-[0.15em] text-gold-primary group-hover:text-white transition-colors">
                                            View Details
                                        </span>
                                        <div className="w-10 h-10 rounded-full border border-gold-primary/30 flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-black transition-all duration-300 transform group-hover:scale-110">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </motion.div>
                <style jsx>{`
                    .hide-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
            </div>
        </section>
    );
}
