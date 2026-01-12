'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePricing } from '@/context/PricingContext';
import FadeIn from '@/components/common/FadeIn';
import { motion, AnimatePresence } from 'framer-motion';
import VehicleSelector from './VehicleSelector';
import RouteSelector from './RouteSelector';

// Note: Ensure VehicleSelector and RouteSelector are also updated to accept transparent/dark props if needed.
// This redesign assumes they can inherit styles or use context, but for now we wrap them in dark containers.

export default function InstantPriceCalculator() {
    const { routes, vehicles, calculatePrice, isLoading } = usePricing();

    const [selectedRoute, setSelectedRoute] = useState('');
    const [selectedVehicle, setSelectedVehicle] = useState('');
    const [priceDetails, setPriceDetails] = useState<{ price: number; originalPrice: number; discountApplied: number; discountType?: 'percentage' | 'fixed' } | null>(null);

    // Set defaults once data is loaded
    useEffect(() => {
        if (!isLoading && routes.length > 0 && vehicles.length > 0) {
            if (!selectedRoute) setSelectedRoute(routes[0].id);
            if (!selectedVehicle) setSelectedVehicle(vehicles[0].id);
        }
    }, [isLoading, routes, vehicles, selectedRoute, selectedVehicle]);

    useEffect(() => {
        if (selectedRoute && selectedVehicle) {
            const details = calculatePrice(selectedRoute, selectedVehicle);
            setPriceDetails(details);
        }
    }, [selectedRoute, selectedVehicle, calculatePrice]);



    const currentRoute = routes.find(r => r.id === selectedRoute);
    const currentVehicle = vehicles.find(v => v.id === selectedVehicle);

    if (isLoading) return <div className="p-8 text-center text-gold-primary animate-pulse">Loading rates...</div>;

    return (
        <section className="py-20 bg-primary-black relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-primary/10 border border-gold-primary/20 mb-6">
                            <Zap size={14} className="text-gold-primary fill-gold-primary" />
                            <span className="text-gold-primary text-xs font-bold tracking-widest uppercase">Instant Quote</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-white mb-4">
                            Transparent <span className="text-gold-primary">Pricing</span>
                        </h2>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg font-light">
                            Select your journey and vehicle to see our exact rates. No hidden fees, just premium service.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
                        {/* Decorative shine */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold-primary/50 to-transparent opacity-50"></div>

                        <div className="flex flex-col lg:flex-row gap-10">
                            {/* Controls Side */}
                            <div className="flex-1 space-y-8">
                                <div>
                                    <label className="block text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">Select Route</label>
                                    <div className="bg-black/20 rounded-xl p-2 border border-white/5">
                                        <RouteSelector
                                            routes={routes}
                                            selectedRouteId={selectedRoute}
                                            onSelect={setSelectedRoute}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gold-primary uppercase tracking-widest mb-4">Select Vehicle</label>
                                    <div className="bg-black/20 rounded-xl p-2 border border-white/5">
                                        <VehicleSelector
                                            vehicles={vehicles}
                                            selectedVehicleId={selectedVehicle}
                                            onSelect={setSelectedVehicle}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Result Side */}
                            <div className="flex-1 lg:max-w-sm">
                                <div className="bg-gradient-to-b from-black to-zinc-900 border border-gold-primary/30 rounded-2xl p-8 relative overflow-hidden h-full flex flex-col justify-between group hover:border-gold-primary/50 transition-colors duration-500">
                                    {/* Gold Glow */}
                                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold-primary/20 rounded-full blur-3xl group-hover:bg-gold-primary/30 transition-all duration-500"></div>

                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <div className="text-gray-400 text-sm font-medium mb-1">Estimated Fare</div>
                                                <div className="text-xs text-gold-primary flex items-center gap-1.5 bg-gold-primary/10 px-2 py-1 rounded w-fit">
                                                    <ShieldCheck size={12} />
                                                    Rate Guaranteed
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-center py-6 border-b border-white/10">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={priceDetails?.price}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="flex flex-col items-center"
                                                >
                                                    {priceDetails && priceDetails.discountApplied > 0 && (
                                                        <span className="text-gray-500 line-through text-lg mb-1">
                                                            SAR {priceDetails.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                    <div className="flex items-baseline justify-center gap-1 text-white">
                                                        <span className="text-2xl font-light text-gold-primary">SAR</span>
                                                        <span className="text-6xl font-bold tracking-tighter">{priceDetails ? priceDetails.price.toLocaleString() : 0}</span>
                                                    </div>
                                                    {priceDetails && priceDetails.discountApplied > 0 && (
                                                        <span className="text-black text-xs font-bold mt-2 bg-gold-primary px-3 py-1 rounded-full animate-bounce">
                                                            {priceDetails.discountType === 'percentage'
                                                                ? `${Math.round((priceDetails.discountApplied / priceDetails.originalPrice) * 100)}% OFF`
                                                                : `${priceDetails.discountApplied} SAR OFF`}
                                                        </span>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                            <div className="text-gray-500 text-xs mt-3 uppercase tracking-wider">All Inclusive / One Way</div>
                                        </div>

                                        {currentVehicle && currentRoute && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="py-6 space-y-3"
                                            >
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Base Rate</span>
                                                    <span className="text-white font-medium">{currentRoute.baseRate} SAR</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Distance</span>
                                                    <span className="text-white font-medium">{currentRoute.distance || '-'}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Duration</span>
                                                    <span className="text-white font-medium">{currentRoute.time || '-'}</span>
                                                </div>
                                                {currentVehicle.multiplier > 1 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-400">Vehicle Tier</span>
                                                        <span className="text-gold-primary font-medium">{currentVehicle.category || 'Premium'}</span>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </div>

                                    <Link
                                        href={`/booking?route=${selectedRoute}&vehicle=${selectedVehicle}`}
                                        className="w-full bg-gold-primary text-black py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white hover:scale-[1.02] transition-all shadow-lg shadow-gold-primary/20 mt-4 group"
                                    >
                                        <span>Reserve Now</span>
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
