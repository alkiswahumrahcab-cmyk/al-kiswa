'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Info, Check, ArrowRight, ChevronLeft, Star } from 'lucide-react';
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
                    <h2 className="text-3xl font-bold text-celestial">Select Fleet</h2>
                    <p className="text-charcoal mt-2">Choose the perfect ride for your journey.</p>
                </div>
                <button onClick={onBack} className="text-charcoal/60 hover:text-celestial flex items-center gap-1 font-bold text-sm">
                    <ChevronLeft size={18} />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                relative p-1 rounded-[24px] cursor-pointer transition-all duration-300 group
                                ${isSelected
                                    ? 'bg-gradient-to-br from-celestial to-sky shadow-xl shadow-sky-200/50 scale-[1.02]'
                                    : 'bg-white hover:scale-[1.01] hover:bg-sky-50 border border-sky-100'}
                            `}
                        >
                            <div className="bg-white rounded-[22px] p-5 h-full relative z-10">
                                <div className="flex gap-5">
                                    <div className="w-24 h-24 relative overflow-hidden rounded-2xl bg-sky-50 border border-sky-100 shrink-0">
                                        {vehicle.image ? (
                                            <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-sky-200">
                                                <Users size={32} />
                                            </div>
                                        )}
                                        {vehicle.name.includes('GMC') && (
                                            <div className="absolute top-1 right-1 bg-gold text-charcoal text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter shadow-sm">
                                                VIP
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-black text-celestial text-lg leading-tight truncate">
                                                {vehicle.name}
                                            </h3>
                                            {isSelected && <div className="w-6 h-6 rounded-full bg-celestial text-white flex items-center justify-center shadow-md"><Check size={14} /></div>}
                                        </div>

                                        <div className="flex items-center gap-3 mt-2">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-charcoal/70 bg-sky-50 px-2 py-0.5 rounded">
                                                <Users size={12} className="text-celestial" />
                                                {vehicle.capacity} PAX
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-charcoal/70 bg-sky-50 px-2 py-0.5 rounded">
                                                <Briefcase size={12} className="text-celestial" />
                                                {vehicle.luggage} BAGS
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-end justify-between">
                                            {pricing ? (
                                                <div>
                                                    <span className="text-2xl font-black text-celestial">
                                                        {pricing.price} <span className="text-sm font-bold text-charcoal/50">SAR</span>
                                                    </span>
                                                    {pricing.discountApplied > 0 && (
                                                        <span className="block text-[10px] text-green-500 font-bold">-{pricing.discountApplied} SAR Promo applied</span>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold text-gold bg-gold/10 px-3 py-1 rounded-full uppercase tracking-widest">
                                                    Quote Basis
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
                        w-full py-5 font-bold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 group
                        ${data.selectedVehicle
                            ? 'bg-celestial text-white hover:bg-sky-400 shadow-celestial/20'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                    `}
                >
                    Continue to Details
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
