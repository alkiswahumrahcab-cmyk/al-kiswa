'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Briefcase, Check, ArrowRight, Tag, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';
import FadeIn from '@/components/common/FadeIn';

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

interface FleetCarouselProps {
    vehicles: Vehicle[];
    discount?: {
        enabled: boolean;
        type: 'percentage' | 'fixed';
        value: number;
        startDate?: string;
        endDate?: string;
    };
}

export default function FleetCarousel({ vehicles, discount }: FleetCarouselProps) {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const cardWidth = container.firstElementChild?.clientWidth || 350;
            const gap = 32;
            const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (vehicles.length === 0) return null;

    const now = new Date();
    const isDiscountActive = discount?.enabled &&
        (!discount.startDate || new Date(discount.startDate) <= now) &&
        (!discount.endDate || new Date(discount.endDate) > now);

    return (
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-overlay" />
            </div>

            <div className="container relative z-10 px-4 md:px-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-3xl">
                        <FadeIn>
                            <div className="text-left">
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
                        </FadeIn>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:border-gold-primary hover:text-gold-primary transition-all duration-300 active:scale-95 group"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-white hover:border-gold-primary hover:text-gold-primary transition-all duration-300 active:scale-95 group"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {vehicles.map((vehicle, index) => (
                        <div key={vehicle.id} className="min-w-[340px] md:min-w-[400px] snap-center">
                            <article className="h-full relative bg-zinc-900 border border-white/5 rounded-[2rem] overflow-hidden group hover:border-gold-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/5 flex flex-col">

                                {/* Image Area */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent z-10 opacity-80" />
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[0.2] group-hover:grayscale-0"
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        draggable={false}
                                    />

                                    {/* Category Badge */}
                                    <div className="absolute top-6 left-6 z-20">
                                        <span className="bg-black/80 backdrop-blur-md border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                                            {vehicle.category || 'Premium'}
                                        </span>
                                    </div>

                                    {/* Discount Badge */}
                                    {isDiscountActive && (
                                        <div className="absolute top-6 right-6 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                            <Tag size={10} className="fill-current" />
                                            <span>
                                                {discount?.type === 'percentage' ? `${discount.value}% OFF` : `${discount?.value} SAR OFF`}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold-primary transition-colors font-sans">
                                            {vehicle.name}
                                        </h3>
                                        <div className="flex items-center gap-2 mb-6">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} size={12} className="fill-gold-primary text-gold-primary" />
                                            ))}
                                            <span className="text-xs text-gray-500 font-medium ml-2">(5.0)</span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center text-center group-hover:bg-white/10 transition-colors">
                                                <Users size={18} className="text-gray-400 mb-2 group-hover:text-gold-primary transition-colors" />
                                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Capacity</span>
                                                <span className="text-sm font-bold text-white">{vehicle.passengers}</span>
                                            </div>
                                            <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col items-center justify-center text-center group-hover:bg-white/10 transition-colors">
                                                <Briefcase size={18} className="text-gray-400 mb-2 group-hover:text-gold-primary transition-colors" />
                                                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Luggage</span>
                                                <span className="text-sm font-bold text-white">{vehicle.luggage} Bags</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {vehicle.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gold-primary/50" />
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto">
                                        <GlassButton
                                            href="/booking"
                                            className="w-full !bg-white/5 !text-white font-bold text-sm tracking-wider uppercase hover:!bg-gold-primary hover:!text-black !border-white/10 group-hover:!border-gold-primary/50 transition-all py-4"
                                        >
                                            Book Vehicle
                                        </GlassButton>
                                    </div>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
