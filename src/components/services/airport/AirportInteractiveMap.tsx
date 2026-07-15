'use client';

import React, { useState } from 'react';
import AirportStylizedCanvas from './AirportStylizedCanvas';
import AirportRouteSidebar from './AirportRouteSidebar';
import MobileRouteDropdown from '../intercity/MobileRouteDropdown';
import FloatingRoutePanel from '../intercity/FloatingRoutePanel';
import { AnimatePresence } from 'framer-motion';

// Curated Route Data for the Marketing Widget (Geographically Accurate)
export const STATIC_AIRPORT_ROUTES = [
    // JEDDAH (KAIA)
    {
        id: 'jed-mak',
        origin: 'Jeddah Airport (KAIA)',
        destination: 'Makkah Hotel',
        distance: '~90 km',
        duration: '~1 hr',
        airport: 'JED',
        prices: [{ vehicleId: 'sedan', price: 200 }] // Reference from pricing.json baseRate
    },
    {
        id: 'jed-mad',
        origin: 'Jeddah Airport (KAIA)',
        destination: 'Madinah Hotel',
        distance: '~420 km',
        duration: '~4.5 hrs',
        airport: 'JED',
        prices: [{ vehicleId: 'sedan', price: 400 }]
    },
    {
        id: 'jed-jed',
        origin: 'Jeddah Airport (KAIA)',
        destination: 'Jeddah Hotel',
        distance: '~30 km',
        duration: '~30 min',
        airport: 'JED',
        prices: [{ vehicleId: 'sedan', price: 150 }]
    },
    {
        id: 'jed-taif',
        origin: 'Jeddah Airport (KAIA)',
        destination: 'Taif',
        distance: '~170 km',
        duration: '~2 hrs',
        airport: 'JED',
        prices: [{ vehicleId: 'sedan', price: 500 }]
    },
    // MADINAH (PMIA)
    {
        id: 'med-mad',
        origin: 'Madinah Airport (PMIA)',
        destination: 'Madinah Hotel (Markazia)',
        distance: '~20 km',
        duration: '~25 min',
        airport: 'MED',
        prices: [{ vehicleId: 'sedan', price: 150 }]
    },
    {
        id: 'med-mak',
        origin: 'Madinah Airport (PMIA)',
        destination: 'Makkah Hotel',
        distance: '~450 km',
        duration: '~4.5 hrs',
        airport: 'MED',
        prices: [{ vehicleId: 'sedan', price: 400 }]
    }
] as any[];

export default function AirportInteractiveMap() {
    const [selectedAirport, setSelectedAirport] = useState<'JED' | 'MED'>('JED');
    const filteredRoutes = STATIC_AIRPORT_ROUTES.filter(r => r.airport === selectedAirport);
    const [activeRouteId, setActiveRouteId] = useState<string | null>(filteredRoutes[0]?.id || null);
    const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

    // Auto-update active route when switching airports
    React.useEffect(() => {
        if (!filteredRoutes.find(r => r.id === activeRouteId)) {
            setActiveRouteId(filteredRoutes[0]?.id || null);
        }
    }, [selectedAirport, filteredRoutes, activeRouteId]);

    const activeRoute = filteredRoutes.find(r => r.id === activeRouteId) || null;

    return (
        <div className="flex flex-col w-full border-t border-border">
            {/* Airport Toggle */}
            <div className="flex p-2 bg-surface-alt border-b border-border gap-2 overflow-x-auto custom-scrollbar">
                <button
                    onClick={() => setSelectedAirport('JED')}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold tracking-wider uppercase text-sm transition-all whitespace-nowrap ${selectedAirport === 'JED' ? 'bg-gold text-ink shadow-sm' : 'text-muted hover:text-ink hover:bg-surface'}`}
                >
                    Jeddah (KAIA)
                </button>
                <button
                    onClick={() => setSelectedAirport('MED')}
                    className={`flex-1 py-3 px-6 rounded-xl font-bold tracking-wider uppercase text-sm transition-all whitespace-nowrap ${selectedAirport === 'MED' ? 'bg-gold text-ink shadow-sm' : 'text-muted hover:text-ink hover:bg-surface'}`}
                >
                    Madinah (PMIA)
                </button>
            </div>

            <section className="relative w-full bg-surface flex flex-col lg:flex-row overflow-hidden lg:h-[75vh] lg:min-h-[600px]">
                {/* Mobile: Route Dropdown (Top) */}
                <div className="lg:hidden shrink-0 z-30 bg-surface border-b border-border">
                    <MobileRouteDropdown
                        routes={filteredRoutes}
                        activeRouteId={activeRouteId}
                        onSelectRoute={setActiveRouteId}
                    />
                </div>

                {/* Desktop: Sidebar (Left) */}
                <div className="hidden lg:block h-full z-20 shrink-0 relative bg-surface border-r border-border">
                    <AirportRouteSidebar
                        routes={filteredRoutes}
                        activeRouteId={activeRouteId}
                        activeAirport={selectedAirport}
                        onSelectRoute={setActiveRouteId}
                        onHoverRoute={setHoveredRouteId}
                    />
                </div>

                {/* Map Canvas Area */}
                <div className="relative flex-1 w-full bg-surface-sunken overflow-hidden flex flex-col lg:block">
                    {/* Map Container */}
                    <div className="h-[400px] lg:h-full w-full relative">
                        <AirportStylizedCanvas
                            routes={filteredRoutes}
                            activeRouteId={activeRouteId}
                            hoveredRouteId={hoveredRouteId}
                            onSelectRoute={setActiveRouteId}
                        />
                    </div>

                    {/* Unified Floating Panel (Handles both Mobile and Desktop) */}
                    <div className="lg:absolute lg:top-6 lg:right-6 lg:z-20 lg:w-80 lg:pointer-events-none p-4 lg:p-0 bg-surface lg:bg-transparent border-t lg:border-t-0 border-border relative z-20">
                        <AnimatePresence mode='wait'>
                            {activeRoute && (
                                <div className="lg:pointer-events-auto">
                                    <FloatingRoutePanel route={activeRoute} />
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
}
