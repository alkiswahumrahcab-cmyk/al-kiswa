'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, UserCheck, Languages } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

const drivers = [
    {
        name: "Capt. Ahmed Al-Harbi",
        role: "Senior Chauffeur",
        experience: "12 Years",
        languages: ["Arabic", "English"],
        image: "/images/drivers/driver-placeholder-1.jpg", // We will need to ensure a placeholder exists or use a generic one
        badge: "Top Rated"
    },
    {
        name: "Capt. Muhammad Yasin",
        role: "VIP Specialist",
        experience: "8 Years",
        languages: ["Urdu", "Arabic", "English"],
        image: "/images/drivers/driver-placeholder-2.jpg",
        badge: "Hajj Expert"
    },
    {
        name: "Capt. Ibrahim S.",
        role: "Bus Captain",
        experience: "15 Years",
        languages: ["Arabic", "Indonesian"],
        image: "/images/drivers/driver-placeholder-3.jpg",
        badge: "Safety Award"
    }
];

export default function MeetOurDrivers() {
    return (
        <section className="py-20 bg-neutral-900 border-t border-white/5 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <div className="inline-flex items-center gap-2 bg-gold-primary/10 text-gold-primary px-4 py-2 rounded-full mb-6">
                            <ShieldCheck size={18} />
                            <span className="text-sm font-bold uppercase tracking-wider">Professional Team</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
                            Meet Your <span className="text-gold-primary">Trusted Chauffeurs</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            It’s not just about the car; it’s about who drives it. Our chauffeurs are handpicked, Ministry-licensed professionals trained to serve the Guests of Allah with dignity and care.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8">
                    {drivers.map((driver, index) => (
                        <FadeIn key={index} delay={index * 0.1}>
                            <div className="group relative bg-primary-black border border-white/10 rounded-3xl overflow-hidden hover:border-gold-primary/40 transition-all duration-500">
                                {/* Image Area */}
                                <div className="relative h-80 overflow-hidden bg-neutral-800">
                                    {/* Placeholder Logic: In a real app we'd have images. For now using a gradient fallback if image fails, or just the Next Image */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-black/90 z-10" />
                                    {/* 
                                      NOTE: Since we don't have real driver photos yet, I'm using a placeholder text/icon for now 
                                      to prevent broken images. You can replace this containing div with <Image /> later.
                                    */}
                                    <div className="w-full h-full flex items-center justify-center bg-neutral-800 group-hover:scale-105 transition-transform duration-700">
                                        <UserCheck size={64} className="text-neutral-700" />
                                    </div>

                                    <div className="absolute bottom-4 left-4 z-20">
                                        <div className="bg-gold-primary text-black text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">
                                            {driver.badge}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 relative">
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gold-primary transition-colors">{driver.name}</h3>
                                    <p className="text-gold-primary/80 mb-6">{driver.role}</p>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                                            <div className="bg-white/5 p-2 rounded-lg">
                                                <ShieldCheck size={16} className="text-gold-primary" />
                                            </div>
                                            <span>{driver.experience} Experience</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-400 text-sm">
                                            <div className="bg-white/5 p-2 rounded-lg">
                                                <Languages size={16} className="text-gold-primary" />
                                            </div>
                                            <span>Speaks {driver.languages.join(", ")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
