'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Navigation, Clock } from 'lucide-react';
import FadeIn from '../common/FadeIn';

const features = [
    {
        icon: <ShieldCheck size={32} className="text-[#34d399]" />,
        title: "Nusuk Verified",
        description: "Officially registered on the Ministry of Hajj's Nusuk platform for authorized pilgrim transport."
    },
    {
        icon: <CheckCircle2 size={32} className="text-gold-primary" />,
        title: "Ministry Licensed",
        description: "Fully compliant with Saudi government regulations for safe and legal operations."
    },
    {
        icon: <Navigation size={32} className="text-blue-400" />,
        title: "Live GPS Tracking",
        description: "All vehicles equipped with government-mandated tracking systems for your safety."
    },
    {
        icon: <Clock size={32} className="text-purple-400" />,
        title: "24/7 Operations",
        description: "Continuous service with dedicated operational support for round-the-clock peace of mind."
    }
];

const NusukTrustStrip = () => {
    return (
        <section className="bg-[#0a0a0a] border-y border-white/5 py-16 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Government Verified Transport</h2>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                        All Al Kiswah Umrah Cab vehicles are officially registered on the Nusuk platform — the Ministry of Hajj & Umrah's government-verified system for licensed pilgrim transport in Saudi Arabia.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="bg-[#111] border border-white/5 p-6 rounded-2xl hover:border-white/10 transition-colors h-full flex flex-col items-center text-center">
                                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 shadow-inner">
                                    {feature.icon}
                                </div>
                                <h3 className="text-white font-bold text-lg mb-3">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                                    {feature.description}
                                </p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NusukTrustStrip;
