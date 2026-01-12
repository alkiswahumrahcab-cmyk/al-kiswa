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
        <section className="py-24 bg-primary-black relative" id="booking-calculator">
            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold-primary text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
                            Premium Chauffeur Services
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-white mb-6">
                            Plan Your <span className="text-gold-primary">Royal Journey</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Get an instant quote for your spiritual journey. Transparent pricing, premium vehicles.
                        </p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-8">

                            {/* Left Panel: Configuration */}
                            <div className="lg:col-span-8 space-y-12">
                                {/* Route Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-gold-primary text-gold-primary flex items-center justify-center font-bold text-sm">
                                            1
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Choose Route</h3>
                                    </div>
                                    <RouteSelector
                                        routes={routes}
                                        selectedRouteId={selectedRoute}
                                        onSelect={setSelectedRoute}
                                    />
                                </div>

                                {/* Vehicle Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full border border-gold-primary text-gold-primary flex items-center justify-center font-bold text-sm">
                                            2
                                        </div>
                                        <h3 className="text-xl font-bold text-white">Select Vehicle</h3>
                                    </div>
                                    <VehicleSelector
                                        vehicles={vehicles}
                                        selectedVehicleId={selectedVehicle}
                                        onSelect={setSelectedVehicle}
                                    />
                                </div>
                            </div>

                            {/* Right Panel: Pricing & Action */}
                            <div className="lg:col-span-4">
                                <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 sticky top-24">
                                    <div className="mb-8">
                                        <span className="text-gray-400 text-sm font-medium uppercase tracking-wider block mb-2">Total Estimate</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl text-gold-primary font-light">SAR</span>
                                            <span className="text-6xl font-bold text-white tracking-tight">
                                                {priceDetails ? priceDetails.price.toLocaleString() : 0}
                                            </span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 text-sm text-gray-400">
                                            <div className="flex justify-between">
                                                <span>Distance</span>
                                                <span className="text-white">{currentRoute?.distance || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Duration</span>
                                                <span className="text-white">{currentRoute?.time || '-'}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Vehicle</span>
                                                <span className="text-gold-primary">{currentVehicle?.name || '-'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/booking?route=${selectedRoute}&vehicle=${selectedVehicle}`}
                                        className="w-full block bg-gold-primary hover:bg-gold-light text-primary-black py-4 rounded-xl font-bold text-lg text-center transition-colors duration-200"
                                    >
                                        Book Now
                                    </Link>
                                    <p className="text-center text-gray-600 text-xs mt-3">
                                        No hidden fees. Inclusive of taxes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
