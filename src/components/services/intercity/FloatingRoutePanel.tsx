'use client';

import React from 'react';
import { RouteWithPrices } from '@/services/routeService';
import { motion } from 'framer-motion';
import { Clock, Navigation, ArrowRight, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import GlassButton from '@/components/ui/GlassButton';

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
            className="bg-neutral-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-6 w-full max-w-sm"
        >
            <div className="mb-6 relative">
                <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gold-primary rounded-r-full" />
                <span className="text-gold-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-1 block">Selected Connection</span>
                <h3 className="text-xl font-bold font-sans leading-tight text-white">
                    {route.origin} <span className="text-gray-500 font-light mx-1">to</span> {route.destination}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-white/5 p-3 rounded-2xl flex flex-col gap-1 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1 font-bold"><Clock size={10} className="text-gold-primary" /> Duration</span>
                    <span className="font-bold text-white text-lg">{route.duration || '--'}</span>
                </div>
                <div className="bg-white/5 p-3 rounded-2xl flex flex-col gap-1 border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 flex items-center gap-1 font-bold"><Navigation size={10} className="text-gold-primary" /> Distance</span>
                    <span className="font-bold text-white text-lg">{route.distance || '--'}</span>
                </div>
            </div>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="p-1.5 rounded-full bg-green-500/10">
                        <ShieldCheck size={14} className="text-green-500" />
                    </div>
                    <span>Hijrah Road Certified</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                    <div className="p-1.5 rounded-full bg-gold-primary/10">
                        <Star size={14} className="text-gold-primary" />
                    </div>
                    <span>VIP Fleet Service</span>
                </div>
            </div>

            <div className="pt-6 border-t border-white/10">
                <Link href={`/booking?from=${encodeURIComponent(route.origin)}&to=${encodeURIComponent(route.destination)}&service=transfer`}>
                    <button className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-r from-gold-primary to-gold-dark hover:to-gold-primary text-black font-bold py-4 rounded-xl transition-all shadow-[0_4px_20px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_6px_25px_-5px_rgba(212,175,55,0.5)] transform hover:-translate-y-0.5">
                        <span className="tracking-wider uppercase text-xs">Book Transfer</span>
                        {price && <span className="bg-black/10 px-2 py-0.5 rounded text-xs font-black">{price} SAR</span>}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </Link>
            </div>
        </motion.div>
    );
}
