'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RouteWithPrices } from '@/services/routeService';
import { Plane, ChevronRight, Clock } from 'lucide-react';

interface AirportRouteSidebarProps {
    routes: RouteWithPrices[];
    activeRouteId: string | null;
    activeAirport: 'JED' | 'MED';
    onSelectRoute: (id: string) => void;
    onHoverRoute: (id: string | null) => void;
}

export default function AirportRouteSidebar({ routes, activeRouteId, activeAirport, onSelectRoute, onHoverRoute }: AirportRouteSidebarProps) {
    return (
        <div className="flex flex-col h-full w-96 bg-surface z-20">
            {/* Header */}
            <div className="p-6 border-b border-border bg-surface-alt">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gold/10 rounded-lg">
                        <Plane className="text-gold" size={20} />
                    </div>
                    <span className="text-xs font-bold text-gold uppercase tracking-widest">Airport Transfer</span>
                </div>
                <h2 className="text-2xl font-semibold font-display text-ink">Select Destination</h2>
                <p className="text-muted text-sm mt-1 font-light">
                    Reliable pickups from {activeAirport === 'JED' ? "King Abdulaziz Int'l Airport" : "Prince Mohammad Bin Abdulaziz Int'l Airport"}
                </p>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {routes.map((route) => {
                    const isActive = activeRouteId === route.id;
                    return (
                        <motion.div
                            key={route.id}
                            onClick={() => onSelectRoute(route.id)}
                            onMouseEnter={() => onHoverRoute(route.id)}
                            onMouseLeave={() => onHoverRoute(null)}
                            className={`
                                group relative p-4 rounded-xl cursor-pointer transition-all duration-300 border
                                ${isActive
                                    ? 'bg-gold-soft border-gold shadow-[0_0_15px_-5px_hsl(var(--gold-glow) / 0.3)]'
                                    : 'bg-surface border-border hover:bg-surface-alt hover:border-border-strong'}
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold-strong animate-pulse' : 'bg-success'}`} />
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Available</span>
                                    </div>
                                    <h3 className={`font-bold text-lg mb-1 transition-colors ${isActive ? 'text-ink' : 'text-body group-hover:text-ink'}`}>
                                        {route.destination}
                                    </h3>
                                    <p className={`text-xs flex items-center gap-2 ${isActive ? 'text-ink/80' : 'text-muted'}`}>
                                        <Clock size={12} className={isActive ? 'text-gold-strong' : ''} /> {route.duration} • {route.distance}
                                    </p>
                                </div>
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isActive ? 'bg-gold text-ink rotate-90' : 'bg-surface-alt text-muted group-hover:bg-surface-sunken group-hover:text-ink'}
                                `}>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface-alt border-t border-border">
                <div className="flex items-center gap-3 text-xs text-muted font-medium">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_#EFBF5B]"></span> Flight Tracking Included</span>
                </div>
            </div>
        </div>
    );
}
