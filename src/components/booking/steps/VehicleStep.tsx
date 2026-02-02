'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Check, ArrowRight, ChevronLeft, Star, ShieldCheck } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';

interface VehicleStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function VehicleStep({ data, updateData, onNext, onBack }: VehicleStepProps) {
    const { vehicles, calculatePrice } = usePricing();

    const handleIncrement = (vId: string) => {
        const currentRef = data.selectedVehicles || [];
        const existing = currentRef.find((item: any) => item.id === vId);

        let newSelection;
        if (existing) {
            newSelection = currentRef.map((item: any) =>
                item.id === vId ? { ...item, count: item.count + 1 } : item
            );
        } else {
            newSelection = [...currentRef, { id: vId, count: 1 }];
        }
        updateData({ selectedVehicles: newSelection });
    };

    const handleDecrement = (vId: string) => {
        const currentRef = data.selectedVehicles || [];
        const existing = currentRef.find((item: any) => item.id === vId);

        if (!existing) return;

        let newSelection;
        if (existing.count > 1) {
            newSelection = currentRef.map((item: any) =>
                item.id === vId ? { ...item, count: item.count - 1 } : item
            );
        } else {
            newSelection = currentRef.filter((item: any) => item.id !== vId);
        }
        updateData({ selectedVehicles: newSelection });
    };

    const getCount = (vId: string) => {
        return (data.selectedVehicles || []).find((item: any) => item.id === vId)?.count || 0;
    };

    const totalSelected = (data.selectedVehicles || []).reduce((acc: number, curr: any) => acc + curr.count, 0);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-sans font-bold text-white">Select Your Fleet</h2>
                    <p className="text-gray-400 mt-2 font-light text-lg">Choose one or multiple vehicles.</p>
                </div>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white flex items-center gap-2 font-medium transition-colors text-lg p-2"
                >
                    <ChevronLeft size={24} />
                    Back
                </button>
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
                {vehicles.map((vehicle) => {
                    const count = getCount(vehicle.id);
                    const isSelected = count > 0;
                    const pricing = data.routeId && data.routeId !== 'custom'
                        ? calculatePrice(data.routeId, vehicle.id)
                        : null;
                    const isFamilyFriendly = Number(vehicle.capacity) >= 7;
                    const isLuxury = vehicle.name.includes('GMC') || vehicle.name.includes('BMW');

                    return (
                        <div
                            key={vehicle.id}
                            onClick={() => count === 0 && handleIncrement(vehicle.id)}
                            className={`
                                relative p-1 rounded-3xl transition-all duration-300 group cursor-pointer
                                ${isSelected
                                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] shadow-[0_0_30px_-5px_rgba(212,175,55,0.4)] scale-[1.02]'
                                    : 'bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 hover:bg-white/10'}
                            `}
                        >
                            <div className="bg-black/60 backdrop-blur-md rounded-[22px] h-full relative z-10 overflow-hidden border border-white/5 group-hover:border-gold-primary/20 transition-colors flex flex-col">
                                {isFamilyFriendly && (
                                    <div className="absolute top-0 left-0 bg-emerald-900/90 border-b border-r border-emerald-500/30 text-emerald-400 text-[10px] font-bold px-4 py-1.5 rounded-br-2xl uppercase tracking-wider z-20 flex items-center gap-1.5 shadow-lg">
                                        <Users size={12} /> Family Choice
                                    </div>
                                )}
                                {isLuxury && (
                                    <div className="absolute top-0 right-0 bg-gradient-to-bl from-gold-primary to-gold-dark text-black text-xs font-black px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider z-20 shadow-lg shadow-gold-primary/20">
                                        VIP Class
                                    </div>
                                )}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur border border-gold-primary/30 text-gold-primary text-[9px] font-bold px-3 py-1 rounded-b-xl uppercase tracking-widest z-20 flex items-center gap-1 shadow-lg">
                                    <ShieldCheck size={10} /> Verified Driver
                                </div>
                                <div className="w-full h-72 relative bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-2 shrink-0 group-hover:bg-white/5 transition-colors duration-500">
                                    {vehicle.image ? (
                                        <motion.img
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            className="w-full h-full object-contain drop-shadow-2xl z-10"
                                            whileHover={{ scale: 1.15, y: -5 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    ) : (
                                        <Users size={80} className="text-gray-700" />
                                    )}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-gold-primary/5 blur-3xl rounded-full" />
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between relative bg-black/40">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className={`font-sans font-bold text-2xl leading-tight ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                                {vehicle.name}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                <Users size={12} className="text-gold-primary" />
                                                <span className="tracking-wide text-nowrap">{vehicle.capacity} {Number(vehicle.capacity) > 1 ? 'Passengers' : 'Passenger'}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                <Briefcase size={12} className="text-gold-primary" />
                                                <span className="tracking-wide text-nowrap">{vehicle.luggage} Bags</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between gap-4">
                                        <div className="flex-1">
                                            {pricing ? (
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-0.5">Total Price</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                                                            {pricing.price}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gold-primary self-end mb-1">SAR</span>
                                                    </div>
                                                    {count > 1 && (
                                                        <div className="text-[10px] text-gold-primary/80 font-mono mt-0.5">
                                                            Single: {pricing.price} SAR
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                                    Rate on Request
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-white/10 shadow-lg">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDecrement(vehicle.id); }}
                                                className={`w-8 h-8 rounded-md flex items-center justify-center transition-all ${count > 0 ? 'bg-white/10 text-white hover:bg-white/20' : 'text-zinc-600 cursor-not-allowed'}`}
                                                disabled={count === 0}
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center font-bold text-base text-white font-mono">
                                                {count}
                                            </span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleIncrement(vehicle.id); }}
                                                className="w-8 h-8 rounded-md bg-gold-primary text-black flex items-center justify-center hover:bg-[#F3D383] transition-all hover:scale-105 shadow-[0_0_10px_rgba(212,175,55,0.2)] font-black text-base"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mobile List View (Dropdown Style) */}
            <div className="block md:hidden space-y-4">
                {vehicles.map((vehicle) => {
                    const count = getCount(vehicle.id);
                    const isSelected = count > 0;
                    const pricing = data.routeId && data.routeId !== 'custom'
                        ? calculatePrice(data.routeId, vehicle.id)
                        : null;

                    return (
                        <div
                            key={vehicle.id}
                            className={`
                                rounded-xl border transition-all duration-300 overflow-hidden
                                ${isSelected
                                    ? 'bg-gold-primary/10 border-gold-primary shadow-[0_0_15px_rgba(212,175,55,0.15)]'
                                    : 'bg-white/5 border-white/10'}
                            `}
                        >
                            <div className="p-3 flex items-center gap-4">
                                {/* Small Thumbnail */}
                                <div className="w-20 h-14 relative bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                                    {vehicle.image ? (
                                        <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain" />
                                    ) : (
                                        <Users size={20} className="text-gray-500" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                            {vehicle.name}
                                        </h3>
                                        {pricing && (
                                            <span className="font-mono text-white text-sm font-bold">
                                                {pricing.price} SAR
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-gray-400">
                                        <span className="flex items-center gap-1"><Users size={10} /> {vehicle.capacity}</span>
                                        <span className="flex items-center gap-1"><Briefcase size={10} /> {vehicle.luggage}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div className="flex flex-col items-center gap-1">
                                    {count === 0 ? (
                                        <button
                                            onClick={() => handleIncrement(vehicle.id)}
                                            className="bg-gold-primary text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-[#F3D383]"
                                        >
                                            Select
                                        </button>
                                    ) : (
                                        <div className="flex items-center bg-black/50 rounded-lg border border-white/10">
                                            <button onClick={() => handleDecrement(vehicle.id)} className="w-7 h-7 flex items-center justify-center text-white hover:text-red-400">-</button>
                                            <span className="w-4 text-center text-xs font-mono font-bold text-gold-primary">{count}</span>
                                            <button onClick={() => handleIncrement(vehicle.id)} className="w-7 h-7 flex items-center justify-center text-white hover:text-gold-primary">+</button>
                                        </div>
                                    )}
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
                    disabled={totalSelected === 0}
                    className={`
                        w-full py-6 text-lg font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group
                        ${totalSelected > 0
                            ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.01]'
                            : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'}
                    `}
                >
                    Review & Checkout ({totalSelected} items)
                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
