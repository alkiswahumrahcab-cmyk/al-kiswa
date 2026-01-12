import React from 'react';
import { Users, Briefcase, Car, Truck, Bus } from 'lucide-react';

import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/common/FadeIn';

export default function VehicleCapacityGuide() {
    const vehicles = [
        {
            name: "Small Sedan",
            icon: <Car size={32} className="text-gold-primary" />,
            pax: "2-3 Passengers",
            bags: "2 Medium Bags",
            desc: "Ideal for couples or solo travelers."
        },
        {
            name: "GMC Yukon / SUV",
            icon: <Truck size={32} className="text-gold-primary" />,
            pax: "4-7 Passengers",
            bags: "5-6 Bags",
            desc: "Perfect for families with generous luggage space."
        },
        {
            name: "Hyundai H1 / Staria",
            icon: <Bus size={32} className="text-gold-primary" />,
            pax: "6-8 Passengers",
            bags: "7-8 Bags",
            desc: "Best for larger families or groups."
        }
    ];

    return (
        <section className="py-24 bg-transparent relative z-10 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-3xl font-bold font-sans mb-4 text-white">Vehicle Capacity Guide</h2>
                        <p className="text-gray-400 font-light text-lg">Choose the right vehicle for your group size and luggage.</p>
                    </FadeIn>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {vehicles.map((v, i) => (
                        <GlassCard key={i} delay={i * 0.1} className="p-8 text-center group hover:-translate-y-2 transition-transform duration-500 bg-neutral-900/50 border-white/10 hover:border-gold-primary/30">
                            <div className="w-20 h-20 mx-auto bg-black rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)] mb-6 group-hover:scale-110 transition-transform duration-500 border border-gold-primary/20">
                                {v.icon}
                            </div>
                            <h3 className="font-bold font-sans text-xl mb-4 text-white group-hover:text-gold-primary transition-colors">{v.name}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-center gap-3 text-gray-300 bg-white/5 py-3 rounded-xl border border-white/5">
                                    <Users size={18} className="text-gold-primary" />
                                    <span className="font-medium">{v.pax}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-gray-300 bg-white/5 py-3 rounded-xl border border-white/5">
                                    <Briefcase size={18} className="text-gold-primary" />
                                    <span className="font-medium">{v.bags}</span>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 italic font-light">{v.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
