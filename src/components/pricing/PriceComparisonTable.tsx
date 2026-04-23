'use client';

import { useState } from 'react';
import { Check, X, TrendingDown, ArrowRight } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import Link from 'next/link';

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
    const [openRoute, setOpenRoute] = useState<number | null>(0);

    return (
        <section className="py-24 relative z-10">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-14">
                        <span className="inline-block bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Real Price Comparison
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            We Supply Kiwi Taxi.{' '}
                            <span className="text-gold-primary">Book From Us Directly.</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Al Kiswah provides the actual transport for platforms like Kiwi Taxi and Booking.com.
                            Those platforms add <strong className="text-red-400">20–30% commission</strong> before showing customers.
                            Book direct — pay the operator price.
                        </p>
                    </div>

                    {/* Column legend */}
                    <div className="max-w-4xl mx-auto mb-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 bg-gold-primary/10 border border-gold-primary/30 rounded-xl px-4 py-3">
                            <Check size={20} className="text-gold-primary shrink-0" />
                            <div>
                                <p className="text-gold-primary font-bold text-sm">Al Kiswah Direct Price (USD)</p>
                                <p className="text-gray-400 text-xs">Book at alkiswahumrahtransport.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                            <X size={20} className="text-red-400 shrink-0" />
                            <div>
                                <p className="text-red-400 font-bold text-sm">Kiwi / Platform Price (USD)</p>
                                <p className="text-gray-400 text-xs">Same car, more expensive</p>
                            </div>
                        </div>
                    </div>

                    {/* Accordion price table */}
                    <div className="max-w-4xl mx-auto space-y-3">
                        {ROUTES.map((route, ri) => {
                            const isOpen = openRoute === ri;
                            const lowestOurs = Math.min(...route.vehicles.map(v => v.ourPrice));
                            const lowestKiwi = Math.min(...route.vehicles.map(v => v.kiwiPrice));
                            const saving = lowestKiwi - lowestOurs;
                            const savingPct = Math.round((saving / lowestKiwi) * 100);

                            return (
                                <div
                                    key={ri}
                                    className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
                                        route.highlight
                                            ? 'border-gold-primary/40 shadow-[0_0_20px_rgba(212,175,55,0.08)]'
                                            : 'border-white/8'
                                    } ${isOpen ? 'bg-neutral-900/80' : 'bg-white/3 hover:bg-white/5'}`}
                                >
                                    {/* Route header — click to expand */}
                                    <button
                                        onClick={() => setOpenRoute(isOpen ? null : ri)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <div className="flex items-center gap-4">
                                            {route.highlight && (
                                                <span className="shrink-0 bg-gold-primary text-black text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                                                    Popular
                                                </span>
                                            )}
                                            <div>
                                                <h3 className="text-white font-bold flex items-center gap-2">
                                                    {route.origin}
                                                    <ArrowRight size={14} className="text-gray-500" />
                                                    {route.destination}
                                                </h3>
                                                <p className="text-gray-500 text-sm">{route.distance}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 shrink-0">
                                            <div className="hidden md:flex items-center gap-4 text-sm">
                                                <span className="text-gold-primary font-black">
                                                    from ${lowestOurs}
                                                </span>
                                                <span className="text-gray-600 line-through text-xs">
                                                    ${lowestKiwi}
                                                </span>
                                                <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                                                    <TrendingDown size={11} />
                                                    Save {savingPct}%
                                                </span>
                                            </div>
                                            <div className={`w-5 h-5 border border-white/20 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                                                <span className="text-gray-400 text-lg leading-none">+</span>
                                            </div>
                                        </div>
                                    </button>

                                    {/* Expandable vehicle table */}
                                    {isOpen && (
                                        <div className="px-5 pb-5">
                                            <div className="rounded-xl overflow-hidden border border-white/8">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b border-white/8 bg-black/30">
                                                            <th className="text-left px-4 py-3 text-gray-400 font-medium">Vehicle Class</th>
                                                            <th className="text-center px-4 py-3 text-gold-primary font-bold">Direct (Us)</th>
                                                            <th className="text-center px-4 py-3 text-red-400 font-medium">Via Platform</th>
                                                            <th className="text-center px-4 py-3 text-emerald-400 font-medium hidden md:table-cell">You Save</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {route.vehicles.map((v, vi) => {
                                                            const save = v.kiwiPrice - v.ourPrice;
                                                            const pct = Math.round((save / v.kiwiPrice) * 100);
                                                            return (
                                                                <tr
                                                                    key={vi}
                                                                    className={`border-b border-white/5 last:border-0 ${vi % 2 === 0 ? 'bg-white/2' : ''}`}
                                                                >
                                                                    <td className="px-4 py-3 text-gray-300">{v.label}</td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <span className="text-gold-primary font-black text-base">${v.ourPrice}</span>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center">
                                                                        <span className="text-red-400 line-through opacity-70">${v.kiwiPrice}</span>
                                                                    </td>
                                                                    <td className="px-4 py-3 text-center hidden md:table-cell">
                                                                        <span className="text-emerald-400 font-semibold">${save} ({pct}%)</span>
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
                                                    className="flex-1 bg-gold-primary text-black font-bold py-3 px-6 rounded-xl text-center hover:bg-white transition-colors text-sm uppercase tracking-wider"
                                                >
                                                    Book This Route Direct
                                                </Link>
                                                <a
                                                    href="https://wa.me/966548707332"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="sm:w-auto bg-emerald-600/20 border border-emerald-600/40 text-emerald-400 font-bold py-3 px-6 rounded-xl text-center hover:bg-emerald-600 hover:text-white transition-colors text-sm"
                                                >
                                                    WhatsApp Quote
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom note */}
                    <p className="text-center text-xs text-gray-600 mt-8 max-w-xl mx-auto">
                        Platform prices shown are approximate estimates based on standard commission rates (20–30%).
                        Al Kiswah direct prices are guaranteed fixed rates inclusive of all taxes and fees.
                    </p>
                </FadeIn>
            </div>
        </section>
    );
}
