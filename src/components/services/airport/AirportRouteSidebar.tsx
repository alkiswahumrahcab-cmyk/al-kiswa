'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { RouteWithPrices } from '@/services/routeService';
import { Plane, ChevronRight, Clock } from 'lucide-react';

interface AirportRouteSidebarProps {
    routes: RouteWithPrices[];
    activeRouteId: string | null;
    onSelectRoute: (id: string) => void;
    onHoverRoute: (id: string | null) => void;
}

export default function AirportRouteSidebar({ routes, activeRouteId, onSelectRoute, onHoverRoute }: AirportRouteSidebarProps) {
    return (
        <div className="flex flex-col h-full w-96 bg-transparent z-20">
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-gold-primary/10 rounded-lg">
                        <Plane className="text-gold-primary" size={20} />
                    </div>
                    <span className="text-xs font-bold text-gold-primary uppercase tracking-widest">Airport Transfer</span>
                </div>
                <h2 className="text-2xl font-bold font-sans text-white">Select Destination</h2>
                <p className="text-gray-400 text-sm mt-1 font-light">Reliable pickups from King Abdulaziz Int'l Airport</p>
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
                                    ? 'bg-gold-primary/10 border-gold-primary/50 shadow-[0_0_15px_-5px_rgba(212,175,55,0.3)]'
                                    : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'}
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-gold-primary animate-pulse' : 'bg-green-500'}`} />
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available</span>
                                    </div>
                                    <h3 className={`font-bold text-lg mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                        {route.destination}
                                    </h3>
                                    <p className="text-xs text-gray-500 flex items-center gap-2">
                                        <Clock size={12} className={isActive ? 'text-gold-primary' : ''} /> {route.duration} • {route.distance}
                                    </p>
                                </div>
                                <div className={`
                                    w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                    ${isActive ? 'bg-gold-primary text-black rotate-90' : 'bg-white/10 text-gray-400 group-hover:bg-white/20 group-hover:text-white'}
                                `}>
                                    <ChevronRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="p-4 bg-white/5 border-t border-white/5">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold-primary rounded-full shadow-[0_0_8px_#EFBF5B]"></span> Flight Tracking Included</span>
                </div>
            </div>
        </div>
    );
}
