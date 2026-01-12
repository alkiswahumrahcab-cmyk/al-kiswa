'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Check, ArrowRight, ChevronLeft, Star } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';

interface VehicleStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function VehicleStep({ data, updateData, onNext, onBack }: VehicleStepProps) {
    const { vehicles, calculatePrice } = usePricing();

    const handleSelect = (vId: string) => {
        updateData({ selectedVehicle: vId });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-sans font-bold text-white">Select Your Vehicle</h2>
                    <p className="text-gray-400 mt-2 font-light">Choose the perfect ride for your journey.</p>
                </div>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white flex items-center gap-2 font-medium transition-colors"
                >
                    <ChevronLeft size={18} />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => {
                    const isSelected = data.selectedVehicle === vehicle.id;
                    const pricing = data.routeId && data.routeId !== 'custom'
                        ? calculatePrice(data.routeId, vehicle.id)
                        : null;

                    return (
                        <div
                            key={vehicle.id}
                            onClick={() => handleSelect(vehicle.id)}
                            className={`
                                relative p-1 rounded-3xl cursor-pointer transition-all duration-300 group
                                ${isSelected
                                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] scale-[1.02]'
                                    : 'bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/10'}
                            `}
                        >
                            <div className="bg-black/60 backdrop-blur-md rounded-[22px] p-5 h-full relative z-10 overflow-hidden border border-white/5 group-hover:border-gold-primary/20 transition-colors">
                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 z-20 bg-gold-primary text-black w-6 h-6 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                        <Check size={14} strokeWidth={4} />
                                    </div>
                                )}

                                <div className="flex gap-5">
                                    {/* Image Container */}
                                    <div className="w-28 h-24 relative rounded-xl bg-black/40 border border-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                                        {vehicle.image ? (
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <Users size={32} className="text-gray-600" />
                                        )}
                                        {vehicle.name.includes('GMC') && (
                                            <div className="absolute top-0 right-0 bg-gold-primary text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                                VIP
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`font-sans font-bold text-lg leading-tight truncate ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                                {vehicle.name}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-2">
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                    <Users size={12} className="text-gold-primary" />
                                                    {vehicle.capacity} PAX
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                                                    <Briefcase size={12} className="text-gold-primary" />
                                                    {vehicle.luggage} BAGS
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex items-end justify-between">
                                            {pricing ? (
                                                <div>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-black text-white tracking-tight">
                                                            {pricing.price}
                                                        </span>
                                                        <span className="text-xs font-bold text-gold-primary">SAR</span>
                                                    </div>
                                                    {pricing.discountApplied > 0 && (
                                                        <span className="block text-[10px] text-green-400 font-medium">
                                                            -{pricing.discountApplied} SAR Off
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-gold-primary bg-gold-primary/10 px-3 py-1 rounded-full uppercase tracking-widest border border-gold-primary/20">
                                                    Get Quote
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pt-6">
                <button
                    onClick={onNext}
                    disabled={!data.selectedVehicle}
                    className={`
                        w-full py-5 font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group
                        ${data.selectedVehicle
                            ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.01]'
                            : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'}
                    `}
                >
                    Review & Checkout
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
