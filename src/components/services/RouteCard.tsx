'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Bus, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface RouteCardProps {
    from: string;
    to: string;
    duration: string;
    distance: string;
    price?: number;
    delay?: number;
    color?: string;
}

import GlassCard from '@/components/ui/GlassCard';

// ... (props interface same)

export default function RouteCard({
    from,
    to,
    duration,
    distance,
    price,
    delay = 0,
    color = "amber"
}: RouteCardProps) {

    // Helper for gradient text
    // We map 'amber' (default) to the new Heavenly 'celestial' theme
    const isGold = color === 'amber';
    const activeColorClass = isGold ? 'text-celestial' : (color === 'blue' ? 'text-celestial' : 'text-emerald-600');
    const activeBgClass = isGold ? 'bg-sky-100/50' : (color === 'blue' ? 'bg-blue-100/50' : 'bg-emerald-100/50');

    return (
        <GlassCard
            delay={delay}
            className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-sky-200/20 border-white/60 bg-white/40"
        >
            <Link href={`/booking?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&service=transfer`} className="block p-8">

                {/* Header: Locations */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                    {/* Origin */}
                    <div className="flex items-center gap-4 flex-1 w-full md:w-auto">
                        <div className={`w-14 h-14 rounded-full ${activeBgClass} flex items-center justify-center shrink-0 shadow-sm border border-white/50 backdrop-blur-sm`}>
                            <MapPin className={activeColorClass} size={24} />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">From</span>
                            <h3 className="text-xl font-bold font-playfair text-charcoal leading-tight">{from}</h3>
                        </div>
                    </div>

                    {/* Animated Connector */}
                    <div className="hidden md:flex flex-col items-center justify-center w-full max-w-[12rem] px-4 relative">
                        <div className="w-full h-[2px] bg-slate-200/50 rounded-full overflow-hidden">
                            <motion.div
                                className={`absolute inset-0 bg-current ${activeColorClass}`}
                                initial={{ x: '-100%' }}
                                whileInView={{ x: '100%' }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{ opacity: 0.5 }}
                            />
                        </div>
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 text-[10px] font-bold text-slate-500 flex items-center gap-1`}>
                            <Bus size={10} className={activeColorClass} />
                            <span>{distance}</span>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="flex items-center gap-4 flex-1 w-full md:w-auto md:justify-end md:text-right">
                        <div className="order-2 md:order-1">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1 block">To</span>
                            <h3 className="text-xl font-bold font-playfair text-charcoal leading-tight">{to}</h3>
                        </div>
                        <div className={`w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center shrink-0 shadow-sm border border-slate-100 order-1 md:order-2 group-hover:bg-gradient-to-br group-hover:from-celestial group-hover:to-sky group-hover:text-white transition-all duration-500`}>
                            <MapPin size={24} className="text-slate-400 group-hover:text-white transition-colors duration-300" />
                        </div>
                    </div>
                </div>

                {/* Footer: Details & CTA */}
                <div className="flex items-center justify-between pt-6 border-t border-slate-100/50">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <Clock size={16} className="text-celestial" />
                            <span>{duration}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {price && (
                            <div className="text-right hidden sm:block">
                                <span className="block text-xs text-slate-500 mb-0.5">Starting from</span>
                                <span className="font-bold text-xl text-celestial">{price} SAR</span>
                            </div>
                        )}
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-celestial group-hover:text-white transition-all duration-300 group-hover:translate-x-1 shadow-sm">
                            <ChevronRight size={20} />
                        </div>
                    </div>
                </div>
            </Link>
        </GlassCard>
    );
}
