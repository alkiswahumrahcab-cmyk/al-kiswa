'use client';

import { useState } from 'react';
import { Check, X, TrendingDown, ArrowRight, ChevronDown } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Al Kiswah's actual rates (what you supply to Kiwi as operator)
// Kiwi then charges customers ~20-30% MORE than these prices
const ROUTES = [
    {
        origin: 'Jeddah Airport',
        destination: 'Makkah',
        distance: '100 km',
        vehicles: [
            { label: 'Sedan (3 pax)', ourPrice: 50, kiwiPrice: 65 },
            { label: 'Family Van (7 pax)', ourPrice: 60, kiwiPrice: 78 },
            { label: 'Minibus 10 pax', ourPrice: 75, kiwiPrice: 97 },
            { label: 'Minibus 13 pax', ourPrice: 160, kiwiPrice: 208 },
        ],
        highlight: true,
    },
    {
        origin: 'Jeddah',
        destination: 'Makkah',
        distance: '85 km',
        vehicles: [
            { label: 'Sedan (3 pax)', ourPrice: 50, kiwiPrice: 65 },
            { label: 'Economy (4 pax)', ourPrice: 50, kiwiPrice: 65 },
            { label: 'Comfort (4 pax)', ourPrice: 60, kiwiPrice: 78 },
            { label: 'Minivan (4 pax)', ourPrice: 60, kiwiPrice: 78 },
            { label: 'Minibus 7 pax', ourPrice: 78, kiwiPrice: 101 },
            { label: 'Minibus 13 pax', ourPrice: 160, kiwiPrice: 208 },
        ],
        highlight: false,
    },
    {
        origin: 'Jeddah',
        destination: 'Madinah',
        distance: '413 km',
        vehicles: [
            { label: 'Sedan (3 pax)', ourPrice: 115, kiwiPrice: 150 },
            { label: 'Economy (4 pax)', ourPrice: 120, kiwiPrice: 156 },
            { label: 'Comfort (4 pax)', ourPrice: 150, kiwiPrice: 195 },
            { label: 'Minivan (4 pax)', ourPrice: 140, kiwiPrice: 182 },
            { label: 'Minibus 7 pax', ourPrice: 140, kiwiPrice: 182 },
            { label: 'Minibus 10 pax', ourPrice: 155, kiwiPrice: 201 },
            { label: 'Minibus 13 pax', ourPrice: 210, kiwiPrice: 273 },
            { label: 'Minibus 16 pax', ourPrice: 250, kiwiPrice: 325 },
            { label: 'Minibus 19 pax', ourPrice: 270, kiwiPrice: 351 },
        ],
        highlight: false,
    },
    {
        origin: 'Jeddah',
        destination: 'Riyadh',
        distance: '960 km',
        vehicles: [
            { label: 'Sedan (3 pax)', ourPrice: 380, kiwiPrice: 494 },
            { label: 'Economy (4 pax)', ourPrice: 380, kiwiPrice: 494 },
            { label: 'Comfort (4 pax)', ourPrice: 420, kiwiPrice: 546 },
            { label: 'Minivan (4 pax)', ourPrice: 420, kiwiPrice: 546 },
            { label: 'Minibus 7 pax', ourPrice: 480, kiwiPrice: 624 },
        ],
        highlight: false,
    },
    {
        origin: 'Jeddah',
        destination: 'Taif',
        distance: '186 km',
        vehicles: [
            { label: 'Sedan (3 pax)', ourPrice: 110, kiwiPrice: 143 },
            { label: 'Economy (4 pax)', ourPrice: 110, kiwiPrice: 143 },
            { label: 'Comfort (4 pax)', ourPrice: 125, kiwiPrice: 163 },
            { label: 'Minibus 7 pax', ourPrice: 135, kiwiPrice: 176 },
        ],
        highlight: false,
    },
];

export default function PriceComparisonTable() {
    const [expandedRoute, setExpandedRoute] = useState<number | null>(0);

    return (
        <section className="py-24 relative z-10 bg-bg">
            <div className="container mx-auto px-4 max-w-5xl">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="inline-block bg-gold-soft border border-gold-line text-gold-strong text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Complete Transparency
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-ink mb-6">
                            Detailed <span className="text-gold">Price Comparison</span>
                        </h2>
                        <p className="text-body max-w-2xl mx-auto">
                            See exactly how our direct pricing compares to standard online platforms and agency rates.
                            Rates are estimates in SAR based on peak season averages.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {ROUTES.map((route, i) => {
                            const isExpanded = expandedRoute === i;
                            const lowestOurs = Math.min(...route.vehicles.map(v => v.ourPrice));
                            return (
                                <div key={i} className={`mb-4 bg-surface border rounded-xl overflow-hidden shadow-sm transition-colors ${route.highlight ? 'border-gold/40' : 'border-border'}`}>
                                    <button
                                        onClick={() => setExpandedRoute(isExpanded ? null : i)}
                                        className="w-full flex items-center justify-between p-6 hover:bg-surface-alt transition-colors"
                                    >
                                        <div className="text-left flex-1">
                                            <h3 className="text-xl font-bold text-ink flex items-center gap-2 flex-wrap">
                                                {route.origin} <ArrowRight size={16} className="text-muted" /> {route.destination}
                                                {route.highlight && <span className="text-[10px] bg-gold-soft text-gold-strong px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ml-2">Popular</span>}
                                            </h3>
                                            <p className="text-body text-sm mt-1">{route.distance}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="hidden md:block text-right mr-4">
                                                <p className="text-xs text-muted uppercase tracking-wider mb-1">Our Price From</p>
                                                <p className="text-xl font-black text-gold-strong">${lowestOurs}</p>
                                            </div>
                                            <ChevronDown 
                                                size={24} 
                                                className={`text-gold transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                            />
                                        </div>
                                    </button>
                                    
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-border bg-surface-alt"
                                            >
                                                <div className="px-6 pb-6 pt-4">
                                                    <div className="rounded-xl overflow-hidden border border-border">
                                                        <table className="w-full text-sm">
                                                            <thead>
                                                                <tr className="border-b border-border bg-surface">
                                                                    <th className="text-left px-4 py-3 text-body font-medium">Vehicle Class</th>
                                                                    <th className="text-center px-4 py-3 text-gold-strong font-bold">Direct (Us)</th>
                                                                    <th className="text-center px-4 py-3 text-error font-medium">Via Platform</th>
                                                                    <th className="text-center px-4 py-3 text-gold-strong font-medium hidden md:table-cell">You Save</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {route.vehicles.map((v, vi) => {
                                                                    const save = v.kiwiPrice - v.ourPrice;
                                                                    const pct = Math.round((save / v.kiwiPrice) * 100);
                                                                    return (
                                                                        <tr
                                                                            key={vi}
                                                                            className={`border-b border-border last:border-0 ${vi % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'}`}
                                                                        >
                                                                            <td className="px-4 py-3 text-ink">{v.label}</td>
                                                                            <td className="px-4 py-3 text-center">
                                                                                <span className="text-gold-strong font-black text-base">${v.ourPrice}</span>
                                                                            </td>
                                                                            <td className="px-4 py-3 text-center">
                                                                                <span className="text-error line-through opacity-70">${v.kiwiPrice}</span>
                                                                            </td>
                                                                            <td className="px-4 py-3 text-center hidden md:table-cell">
                                                                                <span className="text-gold-strong font-semibold">${save} ({pct}%)</span>
                                                                            </td>
                                                                        </tr>
                                                                    );
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </div>

                                                    <div className="mt-4 flex flex-col sm:flex-row gap-3">
                                                        <Link
                                                            href={`/booking?from=${encodeURIComponent(route.origin)}&to=${encodeURIComponent(route.destination)}`}
                                                            className="flex-1 bg-gold text-ink font-semibold rounded-btn py-3 px-6 text-center hover:bg-gold-soft transition-colors text-sm uppercase tracking-wider"
                                                        >
                                                            Book This Route Direct
                                                        </Link>
                                                        <a
                                                            href="https://wa.me/966548707332"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="sm:w-auto bg-transparent border-[1.5px] border-border-strong text-ink font-semibold rounded-btn py-3 px-6 text-center hover:bg-gold-soft transition-colors text-sm uppercase tracking-wider"
                                                        >
                                                            WhatsApp Quote
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom note */}
                    <p className="text-center text-xs text-muted mt-8 max-w-xl mx-auto">
                        Platform prices shown are approximate estimates based on standard commission rates (20–30%).
                        Al Kiswah direct prices are guaranteed fixed rates inclusive of all taxes and fees.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
