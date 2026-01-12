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
        <section className="py-20 bg-transparent relative overflow-hidden">
            {/* Decor */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-gold-primary/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-primary/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <FadeIn>
                        <h2 className="text-4xl font-bold font-sans text-white mb-4">Our Premium Fleet</h2>
                        <p className="text-gray-400 text-lg font-light">Choose from our wide range of luxury vehicles</p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.map((vehicle, index) => {
                        const discountInfo = calculateDiscountedPrice(vehicle.price);

                        return (
                            <FadeIn key={vehicle.id} delay={index * 0.1}>
                                <GlassCard className="h-full flex flex-col p-0 overflow-hidden group hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-gold-primary/40 border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500">
                                    <div className="relative h-64 w-full bg-gradient-to-br from-neutral-900 to-black overflow-hidden border-b border-white/5">
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                                        {discountInfo && settings?.discount && (
                                            <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 animate-pulse border border-white/10">
                                                {settings.discount.type === 'percentage' ? `-${settings.discount.value}% OFF` : `-${settings.discount.value} SAR OFF`}
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-4 z-20">
                                            <h3 className="text-2xl font-bold font-sans text-white drop-shadow-md tracking-wide">{vehicle.name}</h3>
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-4">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Starting From</span>
                                                <div className="flex items-baseline gap-2">
                                                    {discountInfo ? (
                                                        <>
                                                            <span className="text-sm text-gray-600 line-through decoration-red-500/50">{vehicle.price}</span>
                                                            <span className="text-xl font-bold text-gold-primary">{discountInfo.formatted}</span>
                                                        </>
                                                    ) : (
                                                        <span className="text-xl font-bold text-white">{vehicle.price}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 mb-6">
                                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                <Users size={16} className="text-gold-primary" />
                                                <span className="text-sm font-medium text-gray-300">{vehicle.passengers} pax</span>
                                            </div>
                                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                                                <Briefcase size={16} className="text-gold-primary" />
                                                <span className="text-sm font-medium text-gray-300">{vehicle.luggage} bags</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-8 flex-1">
                                            {vehicle.features.slice(0, 4).map((feature: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3">
                                                    <div className="w-5 h-5 rounded-full bg-gold-primary/10 flex items-center justify-center shrink-0">
                                                        <Check size={12} className="text-gold-primary" />
                                                    </div>
                                                    <span className="text-sm text-gray-400 font-light">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Link href="/booking" className="btn-gold w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all duration-300 group/btn relative overflow-hidden">
                                            <span className="relative z-10">Book Now</span>
                                            <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
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
