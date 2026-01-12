'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RouteWithPrices } from '@/services/routeService';
import { Search, MapPin, ChevronRight, Clock, Navigation } from 'lucide-react';

interface RouteSidebarProps {
    routes: RouteWithPrices[];
    activeRouteId: string | null;
    onSelectRoute: (id: string) => void;
    onHoverRoute: (id: string | null) => void;
}

export default function RouteSidebar({ routes, activeRouteId, onSelectRoute, onHoverRoute }: RouteSidebarProps) {
    return (
        <motion.div
            className="hidden lg:flex flex-col h-full w-96 bg-transparent relative z-20"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5">
                <div className="mb-4">
                    <span className="text-gold-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                        Network Explorer
                    </span>
                    <h2 className="text-2xl font-bold font-sans text-white">
                        Intercity Routes
                    </h2>
                    <p className="text-gray-400 text-sm mt-1 font-light">
                        Select a route to view details and pricing.
                    </p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search cities..."
                        className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-white/5 rounded-xl focus:outline-none focus:border-gold-primary/30 text-white placeholder:text-gray-600 text-sm transition-all"
                    />
                </div>
            </div>

            {/* Route List */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
                {routes.map((route, i) => {
                    const isActive = activeRouteId === route.id;
                    return (
                        <motion.div
                            key={route.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => onSelectRoute(route.id)}
                            onMouseEnter={() => onHoverRoute(route.id)}
                            onMouseLeave={() => onHoverRoute(null)}
                            className={`
                                group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
                                ${isActive
                                    ? 'bg-gold-primary/10 border-gold-primary/40 shadow-[0_0_15px_-5px_rgba(212,175,55,0.2)]'
                                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                                }
                            `}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`p-1.5 rounded-full ${isActive ? 'bg-gold-primary/20 text-gold-primary' : 'bg-white/10 text-gray-400'}`}>
                                            <MapPin size={14} />
                                        </div>
                                        <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-gold-primary' : 'text-gray-500'}`}>
                                            Route {i + 1}
                                        </span>
                                    </div>

                                    <h3 className={`text-lg font-semibold font-sans mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                        {route.origin.split(' ')[0]}
                                        <span className="mx-2 text-gray-600">→</span>
                                        {route.destination.split(' ')[0]}
                                    </h3>

                                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                                        <span className="flex items-center gap-1">
                                            <Clock size={12} /> {route.duration}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Navigation size={12} /> {route.distance}
                                        </span>
                                    </div>
                                </div>

                                <div className={`mt-2 ${isActive ? 'text-gold-primary' : 'text-gray-700 group-hover:text-white'} transition-colors`}>
                                    <ChevronRight size={18} />
                                </div>
                            </div>

                            {/* Active Indicator Line */}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 top-4 bottom-4 w-1 bg-gold-primary rounded-r-full"
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer / CTA */}
            <div className="p-4 bg-white/5 border-t border-white/5 text-center text-xs text-gray-500 font-light">
                <p>Select a route to view interactive details</p>
            </div>
        </motion.div>
    );
}
