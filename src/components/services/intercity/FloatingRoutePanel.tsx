'use client';

import React from 'react';
import { RouteWithPrices } from '@/services/routeService';
import { motion } from 'framer-motion';
import { Clock, Navigation, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface FloatingRoutePanelProps {
    route: RouteWithPrices;
}

export default function FloatingRoutePanel({ route }: FloatingRoutePanelProps) {
    const price = route.prices && route.prices.length > 0 ? route.prices[0].price : null;

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="bg-surface rounded-3xl shadow-lg border border-border p-6 w-full max-w-sm"
        >
            <div className="mb-6 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gold rounded-r-full" />
                <span className="text-gold font-bold uppercase tracking-[0.2em] text-[10px] mb-1 block">Selected Connection</span>
                <h3 className="text-xl font-semibold font-display leading-tight text-ink">
                    {route.origin} <span className="text-muted font-light mx-1">to</span> {route.destination}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-surface-alt p-3 rounded-2xl flex flex-col gap-1 border border-border">
                    <span className="text-[10px] uppercase tracking-wider text-muted flex items-center gap-1 font-bold"><Clock size={10} className="text-gold" /> Duration</span>
                    <span className="font-bold text-ink text-lg">{route.duration || '--'}</span>
                </div>
                <div className="bg-surface-alt p-3 rounded-2xl flex flex-col gap-1 border border-border">
                    <span className="text-[10px] uppercase tracking-wider text-muted flex items-center gap-1 font-bold"><Navigation size={10} className="text-gold" /> Distance</span>
                    <span className="font-bold text-ink text-lg">{route.distance || '--'}</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-body">
                    <div className="p-1.5 rounded-full bg-success-soft">
                        <ShieldCheck size={14} className="text-success" />
                    </div>
                    <span>Hijrah Road Certified</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-body">
                    <div className="p-1.5 rounded-full bg-gold-soft">
                        <Star size={14} className="text-gold-strong" />
                    </div>
                    <span>VIP Fleet Service</span>
                </div>
            </div>

            <div className="pt-6 border-t border-border">
                <Link href={`/booking?from=${encodeURIComponent(route.origin)}&to=${encodeURIComponent(route.destination)}&service=transfer`}>
                    <button className="w-full group relative flex items-center justify-center gap-2 bg-gold hover:bg-gold-strong text-ink font-bold py-4 rounded-btn transition-all shadow-gold hover:shadow-lg transform hover:-translate-y-0.5 border-none">
                        <span className="tracking-wider uppercase text-xs">Book Transfer</span>
                        {price && <span className="bg-ink/10 px-2 py-0.5 rounded text-xs font-black">{price} SAR</span>}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
