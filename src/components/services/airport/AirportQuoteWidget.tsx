'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, Clock, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';

// Curated Route Data for the Quote Widget
export const STATIC_AIRPORT_ROUTES = [
    // JEDDAH (KAIA)
    { id: 'jed-mak', origin: 'Jeddah Airport (KAIA)', destination: 'Makkah Hotel', distance: '~90 km', duration: '~1 hr', airport: 'JED', price: 200 },
    { id: 'jed-mad', origin: 'Jeddah Airport (KAIA)', destination: 'Madinah Hotel', distance: '~420 km', duration: '~4.5 hrs', airport: 'JED', price: 400 },
    { id: 'jed-jed', origin: 'Jeddah Airport (KAIA)', destination: 'Jeddah Hotel', distance: '~30 km', duration: '~30 min', airport: 'JED', price: 150 },
    { id: 'jed-taif', origin: 'Jeddah Airport (KAIA)', destination: 'Taif', distance: '~170 km', duration: '~2 hrs', airport: 'JED', price: 500 },
    // MADINAH (PMIA)
    { id: 'med-mad', origin: 'Madinah Airport (PMIA)', destination: 'Madinah Hotel (Markazia)', distance: '~20 km', duration: '~25 min', airport: 'MED', price: 150 },
    { id: 'med-mak', origin: 'Madinah Airport (PMIA)', destination: 'Makkah Hotel', distance: '~450 km', duration: '~4.5 hrs', airport: 'MED', price: 400 }
];

export default function AirportQuoteWidget() {
    const [selectedAirport, setSelectedAirport] = useState<'JED' | 'MED'>('JED');
    const filteredRoutes = STATIC_AIRPORT_ROUTES.filter(r => r.airport === selectedAirport);
    const [selectedRouteId, setSelectedRouteId] = useState<string>(filteredRoutes[0].id);

    // Auto-update selected route when switching airports
    React.useEffect(() => {
        if (!filteredRoutes.find(r => r.id === selectedRouteId)) {
            setSelectedRouteId(filteredRoutes[0].id);
        }
    }, [selectedAirport, filteredRoutes, selectedRouteId]);

    const activeRoute = filteredRoutes.find(r => r.id === selectedRouteId);

    return (
        <div className="w-full max-w-md mx-auto bg-surface rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
            {/* Header Toggles */}
            <div className="flex p-2 bg-surface-alt border-b border-border gap-2">
                <button
                    onClick={() => setSelectedAirport('JED')}
                    className={`flex-1 py-3 px-2 rounded-xl font-bold tracking-wider uppercase text-xs transition-all ${selectedAirport === 'JED' ? 'bg-gold text-ink shadow-sm' : 'text-muted hover:text-ink hover:bg-surface'}`}
                >
                    From Jeddah
                </button>
                <button
                    onClick={() => setSelectedAirport('MED')}
                    className={`flex-1 py-3 px-2 rounded-xl font-bold tracking-wider uppercase text-xs transition-all ${selectedAirport === 'MED' ? 'bg-gold text-ink shadow-sm' : 'text-muted hover:text-ink hover:bg-surface'}`}
                >
                    From Madinah
                </button>
            </div>

            {/* Form Area */}
            <div className="p-6 space-y-6">
                
                {/* Inputs */}
                <div className="space-y-4 relative">
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border z-0"></div>
                    
                    {/* Origin */}
                    <div className="relative z-10 flex items-center gap-4 bg-surface-alt p-4 rounded-2xl border border-border">
                        <div className="w-4 h-4 rounded-full bg-ink flex items-center justify-center shrink-0">
                            <div className="w-1.5 h-1.5 rounded-full bg-surface"></div>
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Pickup Location</p>
                            <p className="text-ink font-semibold">{selectedAirport === 'JED' ? 'Jeddah Airport (KAIA)' : 'Madinah Airport (PMIA)'}</p>
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="relative z-10 flex items-center gap-4 bg-surface p-4 rounded-2xl border border-border shadow-sm focus-within:border-gold focus-within:ring-1 focus-within:ring-gold transition-all">
                        <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                             <MapPin size={16} className="text-gold" />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Drop-off Location</p>
                            <select 
                                value={selectedRouteId}
                                onChange={(e) => setSelectedRouteId(e.target.value)}
                                className="w-full bg-transparent text-ink font-semibold outline-none cursor-pointer appearance-none"
                            >
                                {filteredRoutes.map(route => (
                                    <option key={route.id} value={route.id}>{route.destination}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Quote Result */}
                <AnimatePresence mode='wait'>
                    {activeRoute && (
                        <motion.div
                            key={activeRoute.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-surface-sunken p-5 rounded-2xl border border-border"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xl font-display font-bold text-ink">{activeRoute.price} SAR</span>
                                <span className="text-[10px] uppercase tracking-widest text-gold bg-gold-soft px-2 py-1 rounded-md font-bold">Standard Sedan</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mb-5">
                                <div className="flex items-center gap-2 text-sm text-body">
                                    <Clock size={14} className="text-muted" />
                                    <span>{activeRoute.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-body">
                                    <Plane size={14} className="text-muted" />
                                    <span>Flight Tracking</span>
                                </div>
                            </div>

                            <Link href={`/booking?from=${encodeURIComponent(activeRoute.origin)}&to=${encodeURIComponent(activeRoute.destination)}&service=transfer`} className="block">
                                <button className="w-full group relative flex items-center justify-center gap-2 bg-gold hover:bg-gold-strong text-ink font-bold py-4 rounded-btn transition-all shadow-gold hover:shadow-lg transform hover:-translate-y-0.5 border-none">
                                    <span className="tracking-wider uppercase text-xs">Request Ride</span>
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="flex items-center justify-center gap-4 text-[10px] text-muted uppercase tracking-wider font-bold">
                    <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-success" /> VIP Fleet</span>
                    <span className="flex items-center gap-1"><Star size={12} className="text-gold" /> Hijrah Certified</span>
                </div>
            </div>
        </div>
    );
}
