'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, Check, ArrowRight, ChevronLeft, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import { useCurrency } from '@/context/CurrencyContext';

interface VehicleStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function VehicleStep({ data, updateData, onNext, onBack }: VehicleStepProps) {
    const { vehicles, calculatePrice } = usePricing();
    const { currency, formatPrice } = useCurrency();
    const [expandedId, setExpandedId] = useState<string | null>(null);

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

    // Calculate total price for summary bar
    const totalPrice = (data.selectedVehicles || []).reduce((acc: number, item: any) => {
        const pricing = data.routeId && data.routeId !== 'custom'
            ? calculatePrice(data.routeId, item.id)
            : null;
        return acc + (pricing ? pricing.price * item.count : 0);
    }, 0);

    return (
        <div className="space-y-5 pb-16 md:pb-0">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Select Your Fleet</h2>
                    <p className="text-gray-400 mt-1 text-sm">Tap a vehicle to select. Add multiple if needed.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white font-medium transition-colors text-sm p-2 min-h-[44px]"
                >
                    <ChevronLeft size={18} /> Back
                </button>
            </div>

            {/* ── Vehicle List ── */}
            <div className="space-y-3 md:hidden">
                {vehicles.map((vehicle) => {
                    const count = getCount(vehicle.id);
                    const isSelected = count > 0;
                    const pricing = data.routeId && data.routeId !== 'custom'
                        ? calculatePrice(data.routeId, vehicle.id)
                        : null;
                    const isFamilyFriendly = Number(vehicle.capacity) >= 7;
                    const isLuxury = vehicle.name.includes('GMC') || vehicle.name.includes('BMW');
                    const isExpanded = expandedId === vehicle.id;

                    return (
                        <motion.div
                            key={vehicle.id}
                            layout
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden
                                ${isSelected
                                    ? 'border-gold-primary bg-gold-primary/8 shadow-[0_0_20px_rgba(212,175,55,0.12)]'
                                    : 'border-white/10 bg-white/5'}
                            `}
                        >
                            {/* Main Row */}
                            <div className="flex items-center gap-3 p-3">
                                {/* Thumbnail */}
                                <div
                                    className="w-28 h-20 relative bg-black/40 rounded-xl flex items-center justify-center shrink-0 overflow-hidden cursor-pointer"
                                    onClick={() => setExpandedId(isExpanded ? null : vehicle.id)}
                                >
                                    {vehicle.image ? (
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            width={112}
                                            height={80}
                                            className="w-full h-full object-contain p-1"
                                            loading="lazy"
                                            sizes="112px"
                                        />
                                    ) : (
                                        <Users size={28} className="text-gray-500" />
                                    )}
                                    {/* Badges */}
                                    {isFamilyFriendly && (
                                        <div className="absolute top-0 left-0 bg-emerald-900/90 text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded-br-lg uppercase tracking-wide">
                                            Family
                                        </div>
                                    )}
                                    {isLuxury && (
                                        <div className="absolute top-0 right-0 bg-gold-primary text-black text-[8px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-wide">
                                            VIP
                                        </div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <h3 className={`font-bold text-sm leading-tight ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                            {vehicle.name}
                                        </h3>
                                        {pricing && (
                                            <div className="text-right shrink-0">
                                                <span className="text-base font-black text-white">{formatPrice(pricing.price).amount}</span>
                                                <span className="text-[10px] text-gold-primary font-bold ml-0.5">{currency}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                                        <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-gray-300 font-bold">
                                            <Users size={10} className="text-gold-primary" /> {vehicle.capacity} pax
                                        </span>
                                        <span className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[10px] text-gray-300 font-bold">
                                            <Briefcase size={10} className="text-gold-primary" /> {vehicle.luggage} bags
                                        </span>
                                    </div>

                                    {/* Controls */}
                                    <div className="mt-2.5 flex items-center gap-2">
                                        {count === 0 ? (
                                            <button
                                                onClick={() => handleIncrement(vehicle.id)}
                                                className="flex-1 bg-gradient-to-r from-gold-primary to-amber-600 text-black text-xs font-bold py-2.5 rounded-xl hover:opacity-90 transition-all min-h-[40px]"
                                            >
                                                Select
                                            </button>
                                        ) : (
                                            <>
                                                <div className="flex items-center bg-black/60 rounded-xl border border-white/15 shadow-lg">
                                                    <button
                                                        onClick={() => handleDecrement(vehicle.id)}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-red-400 transition-colors font-bold text-base"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-7 text-center text-sm font-black text-gold-primary font-mono">{count}</span>
                                                    <button
                                                        onClick={() => handleIncrement(vehicle.id)}
                                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-gold-primary transition-colors font-bold text-base"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                {count > 0 && (
                                                    <span className="text-[11px] text-gold-primary font-bold">
                                                        {pricing ? formatPrice(pricing.price * count).formatted : 'Added'}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Desktop Grid View ── */}
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
                                <div className="w-full h-56 relative bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center p-2 shrink-0">
                                    {vehicle.image ? (
                                        <motion.img
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            className="w-full h-full object-contain drop-shadow-2xl z-10"
                                            whileHover={{ scale: 1.12, y: -5 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                    ) : (
                                        <Users size={64} className="text-gray-700" />
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col justify-between bg-black/40">
                                    <div className="space-y-3">
                                        <h3 className={`font-bold text-xl leading-tight ${isSelected ? 'text-gold-primary' : 'text-white'}`}>
                                            {vehicle.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                <Users size={12} className="text-gold-primary" />
                                                <span>{vehicle.capacity} Passengers</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/5">
                                                <Briefcase size={12} className="text-gold-primary" />
                                                <span>{vehicle.luggage} Bags</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-end justify-between gap-4">
                                        <div>
                                            {pricing ? (
                                                <div>
                                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block mb-0.5">Total Price</span>
                                                    <div className="flex items-baseline gap-1">
                                                        <span className="text-2xl font-black text-white">{formatPrice(pricing.price).amount}</span>
                                                        <span className="text-[10px] font-bold text-gold-primary">{currency}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Rate on Request</span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 bg-zinc-900 rounded-lg p-1 border border-white/10">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleDecrement(vehicle.id); }}
                                                className={`w-9 h-9 rounded-md flex items-center justify-center transition-all text-base font-bold ${count > 0 ? 'bg-white/10 text-white hover:bg-white/20' : 'text-zinc-600 cursor-not-allowed'}`}
                                                disabled={count === 0}
                                            >−</button>
                                            <span className="w-8 text-center font-black text-base text-white font-mono">{count}</span>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleIncrement(vehicle.id); }}
                                                className="w-9 h-9 rounded-md bg-gold-primary text-black flex items-center justify-center hover:bg-[#F3D383] transition-all font-black text-base"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Child Seat Toggle */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-full ${data.childSeats ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-gray-400'}`}>
                        <Users size={18} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">Need a Child Seat?</h4>
                        <p className="text-gray-500 text-xs">We'll provide a safety seat for your little ones.</p>
                    </div>
                </div>
                <button
                    onClick={() => updateData({ childSeats: !data.childSeats })}
                    className={`min-w-[80px] px-4 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs transition-all border min-h-[44px]
                        ${data.childSeats
                            ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20'
                            : 'bg-transparent text-gray-400 border-white/20 hover:border-white/50'}
                    `}
                >
                    {data.childSeats ? 'Added ✓' : 'Add'}
                </button>
            </div>

            {/* CTA */}
            <div className="pt-2">
                <button
                    onClick={onNext}
                    disabled={totalSelected === 0}
                    className={`
                        w-full py-4 md:py-5 text-base font-bold uppercase tracking-widest rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 group min-h-[56px]
                        ${totalSelected > 0
                            ? 'bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-[1.01]'
                            : 'bg-white/5 text-gray-500 border border-white/5 cursor-not-allowed'}
                    `}
                >
                    {totalSelected > 0
                        ? `Continue — ${totalSelected} vehicle${totalSelected > 1 ? 's' : ''}${totalPrice > 0 ? ` · ${formatPrice(totalPrice).formatted}` : ''}`
                        : 'Select a Vehicle to Continue'}
                    {totalSelected > 0 && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </div>
        </div>
    );
}
