'use client';

import { Users, Briefcase, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';
import { useSettings } from '@/context/SettingsContext';
import GlassCard from '@/components/ui/GlassCard';

export interface Vehicle {
    id: string;
    name: string;
    price: string;
    passengers: number;
    luggage: number;
    features: string[];
    image: string;
}

interface FleetShowcaseProps {
    vehicles: Vehicle[];
}

export default function FleetShowcase({ vehicles }: FleetShowcaseProps) {
    const { settings } = useSettings();

    const calculateDiscountedPrice = (priceString: string) => {
        if (!settings?.discount?.enabled) return null;

        const now = new Date();
        const nowCheck = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (settings.discount.startDate) {
            const startDate = new Date(settings.discount.startDate);
            const startCheck = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
            if (startCheck > nowCheck) return null;
        }

        if (settings.discount.endDate) {
            const endDate = new Date(settings.discount.endDate);
            const endCheck = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
            if (nowCheck > endCheck) return null;
        }

        const match = priceString.match(/(\d+)/);
        if (!match) return null;

        const originalPrice = parseInt(match[0]);
        let finalPrice = originalPrice;

        if (settings.discount.type === 'percentage') {
            finalPrice = Math.round(originalPrice * (1 - settings.discount.value / 100));
        } else {
            finalPrice = Math.max(0, originalPrice - settings.discount.value);
        }

        return {
            original: originalPrice,
            final: finalPrice,
            formatted: priceString.replace(match[0], finalPrice.toString())
        };
    };

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-bold font-playfair text-secondary mb-4">Our Premium Fleet</h2>
                        <p className="text-slate-600 text-lg">Choose from our wide range of luxury vehicles</p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.map((vehicle, index) => {
                        const discountInfo = calculateDiscountedPrice(vehicle.price);

                        return (
                            <FadeIn key={vehicle.id} delay={index * 0.1}>
                                <GlassCard className="h-full flex flex-col p-0 overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/10 border-white/60 bg-white/60 transition-all duration-500">
                                    <div className="relative h-64 w-full bg-gradient-to-br from-slate-100 to-white overflow-hidden">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                        {discountInfo && settings?.discount && (
                                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-pulse">
                                                {settings.discount.type === 'percentage' ? `-${settings.discount.value}% OFF` : `-${settings.discount.value} SAR OFF`}
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-4 z-20">
                                            <h3 className="text-2xl font-bold font-playfair text-white drop-shadow-md">{vehicle.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-end mb-6 border-b border-slate-100 pb-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Starting From</span>
                                                <div className="flex items-baseline gap-2">
                                                    {discountInfo ? (
                                                        <>
                                                            <span className="text-sm text-slate-400 line-through decoration-red-500/50">{vehicle.price}</span>
                                                            <span className="text-xl font-bold text-amber-600">{discountInfo.formatted}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xl font-bold text-secondary">{vehicle.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mb-6">
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50">
                                                <Users size={16} className="text-amber-500" />
                                                <span className="text-sm font-medium text-slate-600">{vehicle.passengers} pax</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50">
                                                <Briefcase size={16} className="text-amber-500" />
                                                <span className="text-sm font-medium text-slate-600">{vehicle.luggage} bags</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-8 flex-1">
                                            {vehicle.features.slice(0, 4).map((feature: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                                        <Check size={12} className="text-emerald-600" />
                                                    </div>
                                                    <span className="text-sm text-slate-600">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/booking" className="btn-gold w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
                                            Book Now <ArrowRight size={18} />
                                        </Link>
                                    </div>

                                </GlassCard>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section >
    );
}
