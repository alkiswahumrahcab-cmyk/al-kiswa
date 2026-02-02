'use client';

import { useState, useEffect } from 'react';
import { usePricing } from '@/context/PricingContext';
import FadeIn from '@/components/common/FadeIn';
import Link from 'next/link';
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
                    <div className="max-w-5xl mx-auto">
                        <div className="grid lg:grid-cols-12 gap-8 items-start">

                            {/* Left Panel: Configuration */}
                            <div className="lg:col-span-7 space-y-10">
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
                            <div className="lg:col-span-5">
                                <div className="bg-white/5 backdrop-blur-md border border-white/5 rounded-2xl p-6 sticky top-24 shadow-2xl">
                                    <div className="mb-6 text-center">
                                        <span className="text-gray-500 text-xs font-medium uppercase tracking-widest block mb-1">Total Estimate</span>
                                        <div className="flex items-center justify-center gap-1.5 text-white">
                                            <span className="text-lg text-gold-primary font-medium">SAR</span>
                                            <span className="text-5xl font-bold tracking-tight">
                                                {priceDetails ? priceDetails.price.toLocaleString() : 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Distance</span>
                                            <span className="text-gray-300 font-medium">{currentRoute?.distance || '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Duration</span>
                                            <span className="text-gray-300 font-medium">{currentRoute?.time || '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                                            <span className="text-gray-500">Vehicle</span>
                                            <span className="text-gold-primary font-medium">{currentVehicle?.name || '-'}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/booking?route=${selectedRoute}&vehicle=${selectedVehicle}`}
                                        className="w-full flex items-center justify-center bg-gold-primary/90 hover:bg-gold-primary text-black py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-lg shadow-gold-primary/10 hover:shadow-gold-primary/20"
                                    >
                                        Book Now
                                    </Link>
                                    <p className="text-center text-gray-600 text-[10px] mt-3">
                                        All taxes included. No hidden fees.
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
