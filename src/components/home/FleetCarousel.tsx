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
            const gap = 32; // Gap-8
            const scrollAmount = direction === 'left' ? -(cardWidth + gap) : (cardWidth + gap);
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (vehicles.length === 0) return null;

    // Check if discount is active
    const now = new Date();
    const isDiscountActive = discount?.enabled &&
        (!discount.startDate || new Date(discount.startDate) <= now) &&
        (!discount.endDate || new Date(discount.endDate) > now);

    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
            </div>

            <div className="container relative z-10 px-4 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-2xl">
                        <FadeIn>
                            <div className="text-left">
                                <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block drop-shadow-sm">
                                    Our Premium Fleet
                                </span>
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-playfair text-slate-900 dark:text-white mb-6 leading-tight">
                                    Comfort in <span className="bg-gradient-royal-gold bg-clip-text text-transparent">Motion</span>
                                </h2>
                                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xl">
                                    Experience VIP comfort specific for Makkah & Madinah travel.
                                    Choose from our luxury GMC Yukons and spacious family vans.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll('left')}
                            className="w-14 h-14 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-emerald-100 dark:border-emerald-900/30 shadow-lg flex items-center justify-center text-emerald-900 dark:text-emerald-100 hover:bg-gold hover:border-gold hover:text-emerald-950 transition-all duration-300 active:scale-95 group"
                            aria-label="Scroll Left"
                        >
                            <ChevronLeft size={24} className="group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-14 h-14 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-emerald-100 dark:border-emerald-900/30 shadow-lg flex items-center justify-center text-emerald-900 dark:text-emerald-100 hover:bg-gold hover:border-gold hover:text-emerald-950 transition-all duration-300 active:scale-95 group"
                            aria-label="Scroll Right"
                        >
                            <ChevronRight size={24} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory hide-scrollbar px-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {vehicles.map((vehicle, index) => (
                        <div key={vehicle.id} className="min-w-[340px] md:min-w-[420px] snap-center">
                            <article className="h-full relative glass-card-emerald rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.15)] transition-all duration-500 flex flex-col group border border-white/20 dark:border-white/5 hover:border-gold/30 hover:-translate-y-2">

                                {/* Image Area */}
                                <div className="relative h-72 overflow-hidden z-10">
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent z-10 opacity-60" />
                                    <Image
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        fill
                                        className="object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"
                                        sizes="(max-width: 768px) 100vw, 420px"
                                        priority={index < 2}
                                        draggable={false}
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-6 left-6 z-20 flex gap-3">
                                        <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                                            {vehicle.category || 'Premium'}
                                        </span>
                                    </div>

                                    {isDiscountActive && (
                                        <div className="absolute top-6 right-6 z-20 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-1.5 animate-pulse border border-red-400/50">
                                            <Tag size={12} className="fill-current" />
                                            <span>
                                                {discount?.type === 'percentage' ? `${discount.value}% OFF` : `${discount?.value} SAR OFF`}
                                            </span>
                                        </div>
                                    )}

                                    {/* Rating Star Placeholder */}
                                    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-1 text-gold">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star key={star} size={14} className="fill-current drop-shadow-md" />
                                        ))}
                                    </div>
                                </div>

                                {/* Content Area */}
                                <div className="p-8 flex flex-col flex-1 relative z-10 bg-white/40 dark:bg-white/5 backdrop-blur-sm">
                                    <div className="mb-6">
                                        <h3 className="text-3xl font-bold font-playfair text-emerald-950 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                                            {vehicle.name}
                                        </h3>

                                        <div className="grid grid-cols-2 gap-4 mt-6">
                                            <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-3 flex items-center gap-3 border border-emerald-100/50 dark:border-emerald-500/10">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100/50 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                                                    <Users size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Capacity</span>
                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.passengers} Pax</span>
                                                </div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-white/5 rounded-2xl p-3 flex items-center gap-3 border border-emerald-100/50 dark:border-emerald-500/10">
                                                <div className="w-10 h-10 rounded-xl bg-emerald-100/50 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                                                    <Briefcase size={18} />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">Luggage</span>
                                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{vehicle.luggage} Bags</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        {vehicle.features.slice(0, 3).map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 text-sm font-medium">
                                                <div className="w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 border border-gold/30">
                                                    <Check size={10} className="text-emerald-800 dark:text-gold" />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-emerald-100/50 dark:border-white/10">
                                        <GlassButton
                                            href="/booking"
                                            className="w-full !bg-gradient-royal-gold !text-emerald-950 font-bold text-lg hover:brightness-110 shadow-lg shadow-gold/20 !border-0 py-4 gap-2"
                                        >
                                            Book This Vehicle <ArrowRight size={20} />
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
