'use client';

import React from 'react';
import { ShieldCheck, Clock, Award, HeartHandshake } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

const amenities = [
    {
        title: "Officially Licensed",
        description: "Fully licensed by the Ministry of Transport for Umrah & Hajj services.",
        icon: <ShieldCheck className="w-8 h-8 text-gold" />
    },
    {
        title: "24/7 Customer Support",
        description: "Round-the-clock assistance for all your travel needs and inquiries.",
        icon: <Clock className="w-8 h-8 text-gold" />
    },
    {
        title: "Experienced Drivers",
        description: "Professional drivers with deep knowledge of Makkah & Madinah routes.",
        icon: <Award className="w-8 h-8 text-gold" />
    },
    {
        title: "Punctuality Guaranteed",
        description: "On-time pickups and drop-offs to ensure your peace of mind.",
        icon: <HeartHandshake className="w-8 h-8 text-gold" />
    }
];

export default function TrustAmenities() {
    return (
        <section className="py-24 bg-deep-black relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-semibold font-display text-white mb-6">
                            Why Choose <span className="text-gold">Al Kiswah Transport?</span>
                        </h2>
                        <p className="text-n-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            We are committed to providing a safe, reliable, and spiritually uplifting journey for all guests of Allah.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {amenities.map((item, index) => (
                        <GlassCard
                            key={index}
                            delay={index * 0.1}
                            className="bg-white/5 p-8 h-full flex flex-col items-center text-center hover:bg-white/10 border-white/10 hover:border-gold/30 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className="absolute -right-10 -top-10 w-24 h-24 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-all" />

                            <div className="mb-6 p-4 bg-black/40 rounded-btn shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/5 group-hover:scale-110 group-hover:border-gold/50 transition-all duration-300 relative z-10">
                                {React.cloneElement(item.icon, { className: "w-8 h-8 text-gold" })}
                            </div>
                            <h3 className="text-xl font-semibold font-display text-white mb-3 group-hover:text-gold transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-n-400 leading-relaxed text-sm font-light">
                                {item.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
