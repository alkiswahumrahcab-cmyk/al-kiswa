'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
        <section className="py-24 bg-bg relative overflow-hidden">
            {/* Elegant Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
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
                                    <div className="h-px w-12 bg-gold"></div>
                                    <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs">
                                        The Royal Fleet
                                    </span>
                                </div>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display text-ink mb-6 leading-tight">
                                    Luxury Vehicles for <br />
                                    <span className="text-gold italic font-serif">Every Journey</span>
                                </h2>
                                <p className="text-body text-lg leading-relaxed max-w-xl font-light">
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
                            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-300 active:scale-95 group"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-surface border border-border flex items-center justify-center text-ink hover:border-gold hover:text-gold transition-all duration-300 active:scale-95 group"
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
                            <article className="h-full relative bg-surface border border-border rounded-[2rem] overflow-hidden group hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/5 flex flex-col">

                                {/* Top Row: Badge & Rating */}
                                <div className="p-6 pb-2 flex justify-between items-start">
                                    <div>
                                        <span className="inline-block bg-gold-soft text-ink text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 border border-gold/20 shadow-sm">
                                            {vehicle.category || 'Premium'}
                                        </span>
                                        <h3 className="text-[20px] lg:text-[22px] font-semibold text-ink font-display">{vehicle.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-gold-strong">
                                        <span className="text-sm font-bold text-ink mr-1">5.0</span>
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>

                                {/* Image Area */}
                                <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-bg/50 flex items-center justify-center p-4">
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-contain p-4 transform group-hover:scale-105 transition-transform duration-700 ease-out z-10"
                                        sizes="(max-width: 768px) 100vw, 400px"
                                        draggable={false}
                                    />
                                    {/* Discount Badge */}
                                    {isDiscountActive && (
                                        <div className="absolute top-2 right-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1">
                                            <Tag size={10} className="fill-current" />
                                            <span>
                                                {discount?.type === 'percentage' ? `${discount.value}% OFF` : `${discount?.value} SAR OFF`}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Content Area */}
                                <div className="p-6 pt-2 flex flex-col flex-1">
                                    <div className="flex justify-between items-center mb-6 px-1">
                                        <div className="flex items-center gap-2 text-body text-[13px] sm:text-sm">
                                            <Users size={16} className="text-gold-strong" />
                                            <span>{vehicle.passengers} Passengers</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-body text-[13px] sm:text-sm">
                                            <Briefcase size={16} className="text-gold-strong" />
                                            <span>{vehicle.luggage} Bags</span>
                                        </div>
                                    </div>

                                    <div className="mt-auto">
                                        <Link
                                            href="/booking"
                                            className="w-full flex items-center justify-center bg-surface hover:bg-gold-soft border border-border group-hover:border-gold-strong text-ink font-semibold rounded-xl transition-all duration-300 py-3.5 shadow-sm hover:shadow-md"
                                        >
                                            Book Vehicle
                                        </Link>
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
