'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Hotel, Navigation, ChevronRight, Check } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function HotelsAndDistricts() {
    const [activeCity, setActiveCity] = useState<'makkah' | 'madinah'>('makkah');

    const data = {
        makkah: {
            title: "Makkah Al Mukarramah",
            subtitle: "Holy City of Makkah",
            description: "Direct transfers to all major hotels and districts near Al-Haram.",
            hotels: [
                "Fairmont Makkah Clock Royal Tower",
                "Pullman ZamZam Makkah",
                "Swissôtel Al Maqam Makkah",
                "Raffles Makkah Palace",
                "Conrad Makkah",
                "Hilton Makkah Convention Hotel",
                "Jabal Omar Hyatt Regency Makkah",
                "Makkah Hilton Towers",
                "Le Méridien Makkah",
                "Mövenpick Makkah Hajar Tower"
            ],
            districts: [
                "Aziziyah", "Jabal Omar", "Ajyad",
                "Misfalah", "Al Maabdah", "Al Shisha",
                "Al Naseem", "Jarwal", "Kuday",
                "Ray Zaker"
            ]
        },
        madinah: {
            title: "Madinah Al Munawwarah",
            subtitle: "City of the Prophet",
            description: "Comfortable rides to all hotels and zones around Masjid Al-Nabawi.",
            hotels: [
                "Pullman ZamZam Madinah",
                "Anwar Al Madinah Mövenpick",
                "Madinah Hilton",
                "Dar Al Iman InterContinental",
                "Shaza Al Madinah",
                "Oberoi Madinah",
                "Crowne Plaza Madinah",
                "Dallah Taibah Hotel",
                "Emaar Royal Hotel Al Madina",
                "Le Méridien Medina"
            ],
            districts: [
                "Markaziyah (Central Area)",
                "Qiblatain", "Al Awali", "Al Harra",
                "Sayed Al Shuhada", "Al Iskan",
                "Al Aziziyah Madinah", "Al Khalidiyyah",
                "King Fahd District", "Al Hizam"
            ]
        }
    };

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-surface-warm border-y border-hairline relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                            Premium Coverage
                        </span>
                        <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal mb-4 leading-[1.15]">
                            Across The Holy Cities
                        </h2>
                        <p className="text-charcoal-soft max-w-2xl mx-auto text-lg leading-[1.65]">
                            Select your destination city to explore our extensive service coverage.
                        </p>
                    </div>

                    {/* Segmented City Toggles */}
                    <div className="flex justify-center mb-12">
                        <div 
                            role="tablist"
                            aria-label="City Selection"
                            className="bg-surface p-1.5 rounded-full inline-flex border border-hairline shadow-sm"
                        >
                            <button
                                role="tab"
                                aria-selected={activeCity === 'makkah'}
                                onClick={() => setActiveCity('makkah')}
                                className={`px-6 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${activeCity === 'makkah'
                                    ? 'bg-gold-tint text-charcoal shadow-sm'
                                    : 'text-muted hover:text-charcoal'
                                    }`}
                            >
                                Makkah Al Mukarramah
                            </button>
                            <button
                                role="tab"
                                aria-selected={activeCity === 'madinah'}
                                onClick={() => setActiveCity('madinah')}
                                className={`px-6 py-3 rounded-full text-[15px] font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${activeCity === 'madinah'
                                    ? 'bg-gold-tint text-charcoal shadow-sm'
                                    : 'text-muted hover:text-charcoal'
                                    }`}
                            >
                                Madinah Al Munawwarah
                            </button>
                        </div>
                    </div>

                    {/* Content Display */}
                    <div className="grid grid-cols-1">
                        {Object.entries(data).map(([key, cityData]) => (
                            <div
                                key={key}
                                className={`transition-all duration-500 col-start-1 row-start-1 ${activeCity === key
                                    ? 'opacity-100 translate-y-0 z-10'
                                    : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                                    }`}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-surface border border-hairline rounded-[24px] shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] p-6 md:p-10 lg:p-12 overflow-hidden relative">
                                    
                                    {/* Left Panel: City Info & Hotels */}
                                    <div className="lg:col-span-7 space-y-10">
                                        <div>
                                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                                                {cityData.subtitle}
                                            </span>
                                            <h3 className="text-[clamp(28px,3vw,36px)] font-bold text-charcoal font-display mb-4 leading-[1.15]">
                                                {cityData.title}
                                            </h3>
                                            <p className="text-charcoal-soft text-lg leading-[1.65]">
                                                {cityData.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-3 text-[20px] md:text-[22px] font-semibold text-charcoal mb-6 font-display">
                                                <Hotel className="text-gold-deep" size={24} strokeWidth={1.5} />
                                                Premier Hotel Transfers
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                                                {cityData.hotels.map((hotel, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href="/booking"
                                                        className="group flex items-center gap-3 py-3 border-b border-hairline last:border-0 md:[&:nth-last-child(-n+2)]:border-0 text-[15px] text-charcoal-soft hover:text-gold-deep hover:bg-gold-tint/30 transition-all rounded-md px-2 -mx-2"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold/50 group-hover:bg-gold-deep shrink-0 transition-colors" />
                                                        <span className="truncate">
                                                            {hotel}
                                                        </span>
                                                        <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 shrink-0 transition-opacity" />
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Panel: Districts & Zones */}
                                    <div className="lg:col-span-5 relative flex flex-col h-full">
                                        <div className="bg-ivory rounded-2xl p-6 md:p-8 flex-1 border border-hairline flex flex-col">
                                            <h4 className="flex items-center gap-3 text-[20px] md:text-[22px] font-semibold text-charcoal mb-6 font-display">
                                                <Navigation className="text-gold-deep" size={24} strokeWidth={1.5} />
                                                Districts Covered
                                            </h4>
                                            
                                            <div className="flex flex-wrap gap-2 mb-10">
                                                {cityData.districts.map((district, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center bg-gold-tint text-charcoal px-4 py-1.5 rounded-full text-[14px] font-medium border border-hairline"
                                                    >
                                                        {district}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Footer CTA */}
                                            <div className="mt-auto p-6 bg-surface border border-hairline rounded-xl text-center shadow-sm">
                                                <p className="text-charcoal font-semibold mb-4">
                                                    Need a ride to a specific location?
                                                </p>
                                                <Link
                                                    href="/booking"
                                                    className="inline-flex w-full items-center justify-center gap-2 bg-gold hover:bg-gold-deep text-charcoal font-semibold px-6 py-3.5 rounded-btn transition-colors duration-200"
                                                >
                                                    Book Now
                                                    <ChevronRight size={18} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
