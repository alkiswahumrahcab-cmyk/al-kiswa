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
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-white">Select Your Vehicle</h2>
                    <p className="text-gray-400 mt-2 font-light text-lg">Choose the perfect ride for your journey.</p>
                </div>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white flex items-center gap-2 font-medium transition-colors text-lg p-2"
                >
                    <ChevronLeft size={24} />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => {
                    const isSelected = data.selectedVehicle === vehicle.id;
                    const pricing = data.routeId && data.routeId !== 'custom'
                        ? calculatePrice(data.routeId, vehicle.id)
                        : null;

                    // Accessibility & Trust Logic
                    const isFamilyFriendly = Number(vehicle.capacity) >= 7; // GMC, Staria, Hiace
                    const isLuxury = vehicle.name.includes('GMC') || vehicle.name.includes('BMW');

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
                            <div className="bg-black/60 backdrop-blur-md rounded-[22px] p-6 h-full relative z-10 overflow-hidden border border-white/5 group-hover:border-gold-primary/20 transition-colors">

                                {/* Family Badge - High Visibility for Trust */}
                                {isFamilyFriendly && (
                                    <div className="absolute top-0 left-0 bg-emerald-900/80 border-b border-r border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-br-xl uppercase tracking-wider z-20 flex items-center gap-1">
                                        <Users size={12} /> Recommended for Families
                                    </div>
                                )}

                                {/* Selection Indicator */}
                                {isSelected && (
                                    <div className="absolute top-4 right-4 z-20 bg-gold-primary text-black w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-in zoom-in">
                                        <Check size={18} strokeWidth={4} />
                                    </div>
                                )}

                                <div className="flex gap-5 pt-4">
                                    {/* Image Container */}
                                    <div className="w-32 h-28 relative rounded-xl bg-black/40 border border-white/5 shrink-0 flex items-center justify-center overflow-hidden">
                                        {vehicle.image ? (
                                            <img
                                                src={vehicle.image}
                                                alt={vehicle.name}
                                                className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <Users size={40} className="text-gray-600" />
                                        )}
                                        {isLuxury && (
                                            <div className="absolute top-0 right-0 bg-gold-primary text-black text-[10px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-wider">
                                                VIP
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                                        <div>
                                            <h3 className={`font-sans font-bold text-xl leading-tight truncate ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                                {vehicle.name}
                                            </h3>

                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                    <Users size={14} className="text-gold-primary" />
                                                    {vehicle.capacity} PAX
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                    <Briefcase size={14} className="text-gold-primary" />
                                                    {vehicle.luggage} BAGS
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                                            {pricing ? (
                                                <div className="flex-1">
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-4xl font-black text-white tracking-tight">
                                                            {pricing.price}
                                                        </span>
                                                        <span className="text-sm font-bold text-gold-primary">SAR</span>
                                                    </div>
                                                    {pricing.discountApplied > 0 && (
                                                        <span className="block text-xs text-green-400 font-medium">
                                                            -{pricing.discountApplied} SAR Off
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="flex-1">
                                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                        Fixed Price
                                                    </span>
                                                </div>
                                            )}

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleSelect(vehicle.id);
                                                }}
                                                className={`
                                                px-6 py-2 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-lg
                                                ${isSelected
                                                        ? 'bg-black text-[#D4AF37] border border-[#D4AF37]'
                                                        : 'bg-[#D4AF37] text-black hover:bg-[#F3D383] hover:shadow-[#D4AF37]/20'}
                                            `}
                                            >
                                                {isSelected ? 'Selected' : 'Select'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Accessibility & Safety Options */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${data.childSeats ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>
                        <Users size={24} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg">Need a Child Seat?</h4>
                        <p className="text-gray-400 text-xs">Essential for safety. We will provide a specialized seat.</p>
                    </div>
                </div>
                <button
                    onClick={() => updateData({ childSeats: !data.childSeats })}
                    className={`
                        px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm transition-all border
                        ${data.childSeats
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                            : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}
                    `}
                >
                    {data.childSeats ? 'Included ✓' : 'Add Seat (+0 SAR)'}
                </button>
            </div>

            <div className="pt-8">
                <button
                    onClick={onNext}
                    disabled={!data.selectedVehicle}
                    className={`
                        w-full py-6 text-lg font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group
                        ${data.selectedVehicle
                            ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.01]'
                            : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'}
                    `}
                >
                    Review & Checkout
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
