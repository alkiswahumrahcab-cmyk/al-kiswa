'use client';

import React from 'react';
import { ShieldCheck, Clock, Award, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

const amenities = [
    {
        title: "Officially Licensed",
        description: "Fully licensed by the Ministry of Transport for Umrah & Hajj services.",
        icon: <ShieldCheck className="w-8 h-8 text-celestial" />
    },
    {
        title: "24/7 Customer Support",
        description: "Round-the-clock assistance for all your travel needs and inquiries.",
        icon: <Clock className="w-8 h-8 text-celestial" />
    },
    {
        title: "Experienced Drivers",
        description: "Professional drivers with deep knowledge of Makkah & Madinah routes.",
        icon: <Award className="w-8 h-8 text-celestial" />
    },
    {
        title: "Punctuality Guaranteed",
        description: "On-time pickups and drop-offs to ensure your peace of mind.",
        icon: <HeartHandshake className="w-8 h-8 text-celestial" />
    }
];



// ... (amenities array remains same but update icon color to text-amber-600 in the JSX below)

export default function TrustAmenities() {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-sky-50 relative">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[url('/noise.png')] opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-bold font-playfair text-celestial mb-4">
                            Why Choose <span className="text-gold">Al Kiswah Transport?</span>
                        </h2>
                        <p className="text-charcoal max-w-2xl mx-auto text-lg">
                            We are committed to providing a safe, reliable, and spiritually uplifting journey for all guests of Allah.
                        </p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {amenities.map((item, index) => (
                        <GlassCard
                            key={index}
                            delay={index * 0.1}
                            className="bg-white/60 p-8 h-full flex flex-col items-center text-center hover:shadow-xl hover:shadow-sky-100/40 border-white/60 transition-all duration-500 group"
                        >
                            <div className="mb-6 p-4 bg-gradient-to-br from-sky-50 to-white rounded-full shadow-sm border border-sky-100 group-hover:scale-110 transition-transform duration-300">
                                {React.cloneElement(item.icon, { className: "w-8 h-8 text-celestial" })}
                            </div>
                            <h3 className="text-xl font-bold font-playfair text-celestial mb-3">
                                {item.title}
                            </h3>
                            <p className="text-charcoal leading-relaxed">
                                {item.description}
                            </p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
