'use client';

import React from 'react';
import { RouteWithPrices } from '@/services/routeService';
import { ChevronDown, MapPin } from 'lucide-react';

interface MobileRouteDropdownProps {
    routes: RouteWithPrices[];
    activeRouteId: string | null;
    onSelectRoute: (id: string) => void;
}

export default function MobileRouteDropdown({ routes, activeRouteId, onSelectRoute }: MobileRouteDropdownProps) {
    return (
        <div className="relative w-full px-4 py-3 bg-neutral-900 border-b border-white/5 lg:hidden z-30 shadow-md">
            <label className="text-xs font-bold text-gold-primary uppercase tracking-widest mb-1.5 block">Select Route</label>
            <div className="relative">
                <select
                    className="w-full appearance-none bg-black/50 border border-white/10 text-white py-3 pl-10 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-primary/50 font-sans font-bold text-lg"
                    value={activeRouteId || ''}
                    onChange={(e) => onSelectRoute(e.target.value)}
                >
                    {routes.map((route) => (
                        <option key={route.id} value={route.id} className="bg-neutral-900 text-white">
                            {route.origin} to {route.destination}
                        </option>
                    ))}
                </select>
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold-primary">
                    <MapPin size={18} />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <ChevronDown size={18} />
                </div>
            </div>
        </div>
    );
}
