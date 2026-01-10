import React from 'react';
import { Users, Briefcase, Car, Truck, Bus } from 'lucide-react';

import GlassCard from '@/components/ui/GlassCard';

export default function VehicleCapacityGuide() {
    const vehicles = [
        {
            name: "Small Sedan",
            icon: <Car size={32} className="text-amber-600" />,
            pax: "2-3 Passengers",
            bags: "2 Medium Bags",
            desc: "Ideal for couples or solo travelers."
        },
        {
            name: "GMC Yukon / SUV",
            icon: <Truck size={32} className="text-amber-600" />,
            pax: "4-7 Passengers",
            bags: "5-6 Bags",
            desc: "Perfect for families with generous luggage space."
        },
        {
            name: "Hyundai H1 / Staria",
            icon: <Bus size={32} className="text-amber-600" />,
            pax: "6-8 Passengers",
            bags: "7-8 Bags",
            desc: "Best for larger families or groups."
        }
    ];

    return (
        <section className="py-16 bg-gradient-to-t from-white to-slate-50 border-t border-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-playfair mb-4 text-secondary">Vehicle Capacity Guide</h2>
                    <p className="text-slate-600">Choose the right vehicle for your group size and luggage.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {vehicles.map((v, i) => (
                        <GlassCard key={i} delay={i * 0.1} className="p-8 text-center group hover:-translate-y-2 transition-transform duration-500">
                            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-50 to-white rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform duration-500 border border-amber-100/50">
                                {v.icon}
                            </div>
                            <h3 className="font-bold font-playfair text-xl mb-4 text-secondary">{v.name}</h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-center gap-3 text-slate-600 bg-slate-50/50 py-2 rounded-lg">
                                    <Users size={18} className="text-amber-500" />
                                    <span className="font-medium">{v.pax}</span>
                                </div>
                                <div className="flex items-center justify-center gap-3 text-slate-600 bg-slate-50/50 py-2 rounded-lg">
                                    <Briefcase size={18} className="text-amber-500" />
                                    <span className="font-medium">{v.bags}</span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-500 italic">{v.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
