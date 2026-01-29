'use client';
// Force refresh

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Hotel, Navigation, ChevronRight } from 'lucide-react';
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
        <section className="py-20 bg-primary-black border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] pointer-events-none" />
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] transition-all duration-1000 ${activeCity === 'makkah' ? 'translate-x-1/2 -translate-y-1/2' : 'translate-x-full opacity-50'}`} />
            <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-secondary/5 rounded-full blur-[120px] transition-all duration-1000 ${activeCity === 'madinah' ? '-translate-x-1/2 translate-y-1/2' : '-translate-x-full opacity-50'}`} />

            <div className="container px-4 md:px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-white mb-4">
                            Premium Coverage Across Holy Cities
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            Select your destination city to explore our extensive service coverage.
                        </p>
                    </div>

                    {/* City Toggles */}
                    <div className="flex justify-center mb-12">
                        <div className="bg-white/5 p-1 rounded-full inline-flex border border-white/10">
                            <button
                                onClick={() => setActiveCity('makkah')}
                                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeCity === 'makkah'
                                    ? 'bg-gold-primary text-black shadow-[0_0_20px_rgba(239,191,91,0.3)]'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Makkah Al Mukarramah
                            </button>
                            <button
                                onClick={() => setActiveCity('madinah')}
                                className={`px-8 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeCity === 'madinah'
                                    ? 'bg-gold-primary text-black shadow-[0_0_20px_rgba(239,191,91,0.3)]'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Madinah Al Munawwarah
                            </button>
                        </div>
                    </div>

                    {/* Content Display */}
                    <div className="relative min-h-[500px]">
                        {Object.entries(data).map(([key, cityData]) => (
                            <div
                                key={key}
                                className={`transition-all duration-500 absolute inset-0 ${activeCity === key
                                    ? 'opacity-100 translate-y-0 z-10'
                                    : 'opacity-0 translate-y-8 z-0 pointer-events-none'
                                    }`}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/10 rounded-2xl bg-white/[0.02] p-8 md:p-12 overflow-hidden relative">
                                    {/* Content Background */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-gold-primary/10 to-transparent rounded-bl-full opacity-50 pointer-events-none" />

                                    {/* Left Panel: City Info & Hotels */}
                                    <div className="lg:col-span-7 space-y-8">
                                        <div>
                                            <div className="flex items-center gap-3 text-gold-primary mb-2">
                                                <MapPin size={20} />
                                                <span className="uppercase tracking-widest text-xs font-bold">{cityData.subtitle}</span>
                                            </div>
                                            <h3 className="text-3xl md:text-4xl font-bold text-white font-playfair mb-4">
                                                {cityData.title}
                                            </h3>
                                            <p className="text-gray-400 text-lg leading-relaxed">
                                                {cityData.description}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                                                <Hotel className="text-gold-primary" size={22} />
                                                Premier Hotel Transfers
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                                                {cityData.hotels.map((hotel, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href="/booking"
                                                        className="group flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-gold-primary transition-colors" />
                                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                                            {hotel}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Panel: Districts & Zones */}
                                    <div className="lg:col-span-5 relative">
                                        <div className="bg-white/5 rounded-xl p-8 h-full border border-white/5">
                                            <h4 className="flex items-center gap-2 text-xl font-bold text-white mb-6">
                                                <Navigation className="text-gold-primary" size={22} />
                                                Districts Covered
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {cityData.districts.map((district, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center gap-1.5 bg-black/40 hover:bg-gold-primary text-gray-300 hover:text-black hover:font-bold px-4 py-2 rounded-lg text-sm transition-all duration-300 cursor-default border border-white/10 hover:border-gold-primary hover:shadow-[0_0_15px_rgba(239,191,91,0.4)]"
                                                    >
                                                        {district}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mt-12 p-6 bg-gradient-to-br from-gold-primary/20 to-transparent rounded-xl border border-gold-primary/20 text-center">
                                                <p className="text-white font-bold mb-4">
                                                    Need a ride to a specific location?
                                                </p>
                                                <Link
                                                    href="/booking"
                                                    className="inline-flex items-center gap-2 bg-gold-primary text-black font-bold px-6 py-3 rounded-full hover:bg-white transition-colors"
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
