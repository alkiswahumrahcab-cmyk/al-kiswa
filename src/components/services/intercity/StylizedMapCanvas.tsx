'use client';

import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { RouteWithPrices } from '@/services/routeService';

interface StylizedMapCanvasProps {
    routes: RouteWithPrices[];
    activeRouteId: string | null;
    hoveredRouteId: string | null;
    onSelectRoute: (id: string) => void;
}

// Coordinate definitions (0-100%) - Adjusted for better visual balance
const CITIES_LOOKUP: Record<string, { x: number; y: number; label: string }> = {
    'Madinah': { x: 50, y: 20, label: 'Madinah' },
    'Madinah Hotel': { x: 50, y: 20, label: 'Madinah' },
    'Madinah Airport': { x: 58, y: 15, label: 'Prince Mohammad\nBin Abdulaziz' },

    'Jeddah': { x: 25, y: 60, label: 'Jeddah' },
    'Jeddah City': { x: 25, y: 60, label: 'Jeddah' },
    'Jeddah Airport': { x: 20, y: 53, label: 'KAIA Airport' },

    'Makkah': { x: 70, y: 75, label: 'Makkah' },
    'Makkah Hotel': { x: 70, y: 75, label: 'Makkah' },
};

// Only these specific nodes will be rendered visually on the map to prevent overlap
const VISUAL_NODES = [
    { id: 'madinah', x: 50, y: 20, label: 'Madinah' },
    { id: 'madinah_airport', x: 58, y: 15, label: 'Airport' }, // Shortened label
    { id: 'jeddah', x: 25, y: 60, label: 'Jeddah' },
    { id: 'jeddah_airport', x: 20, y: 53, label: 'KAIA' },
    { id: 'makkah', x: 70, y: 75, label: 'Makkah' },
];

const getCityCoords = (name: string) => {
    const key = Object.keys(CITIES_LOOKUP).find(k => name.includes(k) || k.includes(name));
    return key ? CITIES_LOOKUP[key] : { x: 50, y: 50, label: name };
};

export default function StylizedMapCanvas({ routes, activeRouteId, hoveredRouteId, onSelectRoute }: StylizedMapCanvasProps) {
    const constraintsRef = useRef(null);

    // Generate SVG paths with nicer curves
    const routePaths = useMemo(() => {
        return routes.map(route => {
            const start = getCityCoords(route.origin);
            const end = getCityCoords(route.destination);

            // Calculate a curve point
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2;
            const curveOffset = 15; // Increased curve for more "flight path" look

            const dx = end.x - start.x;
            const dy = end.y - start.y;
            const len = Math.sqrt(dx * dx + dy * dy);
            const ox = -dy / len * curveOffset;
            const oy = dx / len * curveOffset;

            const cx = midX + ox;
            const cy = midY + oy;

            return {
                id: route.id,
                path: `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`,
                start,
                end
            };
        });
    }, [routes]);

    return (
        <div className="absolute inset-0 w-full h-full bg-transparent overflow-hidden cursor-grab active:cursor-grabbing" ref={constraintsRef}>
            {/* Draggable Map Container */}
            <motion.div
                className="w-full h-full"
                drag
                dragConstraints={constraintsRef}
                dragElastic={0.1}
                dragMomentum={true}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        {/* Glow Filter */}
                        <filter id="glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                            <feComposite in="coloredBlur" in2="SourceGraphic" operator="over" />
                        </filter>

                        {/* Gradient for Lines */}
                        <linearGradient id="routeGradient" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="#EFBF5B" stopOpacity="0.1" />
                            <stop offset="50%" stopColor="#EFBF5B" stopOpacity="1" />
                            <stop offset="100%" stopColor="#EFBF5B" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Base Network Layer (Faint Lines) */}
                    {routePaths.map(({ id, path }) => (
                        <path
                            key={`base-${id}`}
                            d={path}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.2"
                            className="text-white/10"
                        />
                    ))}

                    {/* Interactive Routes Layer */}
                    {routePaths.map(({ id, path }) => {
                        const isActive = id === activeRouteId;
                        const isHovered = id === hoveredRouteId;
                        const isRelevant = isActive || isHovered;

                        return (
                            <g key={`active-${id}`} onClick={() => onSelectRoute(id)} className="cursor-pointer group">
                                {/* Hit Area (Invisible wide stroke) */}
                                <path d={path} stroke="transparent" strokeWidth="8" fill="none" />

                                {/* Active Visual Path */}
                                <motion.path
                                    d={path}
                                    fill="none"
                                    stroke={isRelevant ? "#EFBF5B" : "currentColor"}
                                    strokeWidth={isActive ? "0.6" : (isHovered ? "0.4" : "0.2")}
                                    strokeLinecap="round"
                                    className={!isRelevant ? "text-gray-600 transition-colors duration-500" : ""}
                                    animate={{
                                        strokeOpacity: isRelevant ? 1 : 0.3,
                                        filter: isRelevant ? "url(#glow-gold)" : "none"
                                    }}
                                />

                                {/* Moving Particle (Only visible when active/hovered) */}
                                {isRelevant && (
                                    <motion.circle r="1" fill="#fff">
                                        <animateMotion
                                            dur={isActive ? "3s" : "5s"}
                                            repeatCount="indefinite"
                                            path={path}
                                            keyPoints="0;1"
                                            keyTimes="0;1"
                                        />
                                    </motion.circle>
                                )}
                            </g>
                        );
                    })}

                    {/* City Nodes */}
                    {VISUAL_NODES.map((city) => {
                        const activeRouteObj = routes.find(r => r.id === activeRouteId);
                        // Check strictly if this city is the origin or destination of the active route
                        const isActiveNode = activeRouteObj ? (
                            city.label.includes(activeRouteObj.origin) ||
                            city.label.includes(activeRouteObj.destination) ||
                            activeRouteObj.origin.includes(city.label) ||
                            activeRouteObj.destination.includes(city.label)
                        ) : false;

                        return (
                            <g key={city.id} onClick={(e) => { e.stopPropagation(); /* Prevent map drag start if needed */ }}>
                                {/* Label */}
                                <text
                                    x={city.x}
                                    y={city.y + 5}
                                    textAnchor="middle"
                                    className={`text-[2.5px] font-bold uppercase tracking-widest select-none ${isActiveNode ? 'fill-white font-extrabold' : 'fill-gray-500'}`}
                                >
                                    {city.label}
                                </text>

                                {/* Ripple/Pulse Effect for Active Nodes */}
                                {isActiveNode && (
                                    <>
                                        <motion.circle
                                            cx={city.x} cy={city.y} r="6"
                                            fill="none" stroke="#EFBF5B" strokeWidth="0.1"
                                            initial={{ scale: 0, opacity: 0.8 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <motion.circle
                                            cx={city.x} cy={city.y} r="4"
                                            fill="none" stroke="#EFBF5B" strokeWidth="0.1"
                                            initial={{ scale: 0, opacity: 0.8 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                                        />
                                    </>
                                )}

                                {/* Core Node Dot */}
                                <motion.circle
                                    cx={city.x}
                                    cy={city.y}
                                    r={isActiveNode ? 1.2 : 0.8}
                                    className={`${isActiveNode ? 'fill-black stroke-white' : 'fill-gray-600 stroke-black'}`}
                                    strokeWidth="0.2"
                                    whileHover={{ scale: 1.5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                            </g>
                        );
                    })}
                </svg>
            </motion.div>

            {/* Map Controls Prompt */}
            <div className="absolute bottom-6 right-6 hidden lg:block pointer-events-none opacity-50">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-gray-400 border border-white/10">
                    <span className="w-2 h-2 rounded-full border border-current animate-ping" /> Drag to pan map
                </div>
            </div>
        </div>
    );
}
