'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    MapPin, Calendar, Clock, PlaneLanding, Navigation,
    Building2, ArrowRight, CheckCircle2, ArrowLeftRight,
    ChevronDown, Search, X, Plane, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePricing } from '@/context/PricingContext';
import WhatsAppVoiceButton from '../WhatsAppVoiceButton';

interface JourneyStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

const SERVICE_TYPES = [
    { id: 'Intercity', icon: Building2, label: 'Intercity', desc: 'City to city' },
    { id: 'Airport', icon: PlaneLanding, label: 'Airport', desc: 'Transfers' },
    { id: 'Ziarat', icon: Compass, label: 'Ziarat', desc: 'Holy sites' },
];

export default function JourneyStep({ data, updateData, onNext }: JourneyStepProps) {
    const { routes } = usePricing();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [showRouteDropdown, setShowRouteDropdown] = useState(false);
    const [routeSearch, setRouteSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const filteredRoutes = routes.filter((r) => {
        const matchCat =
            data.serviceType === 'Airport'
                ? r.category?.toLowerCase().includes('airport')
                : data.serviceType === 'Ziarat'
                    ? r.category?.toLowerCase() === 'ziarat'
                    : r.category?.toLowerCase() === 'intercity';
        const searchLower = routeSearch.toLowerCase();
        const matchSearch =
            !routeSearch ||
            r.origin?.toLowerCase().includes(searchLower) ||
            r.destination?.toLowerCase().includes(searchLower);
        return matchCat && matchSearch;
    });

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowRouteDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selectRoute = (route: any) => {
        updateData({ pickup: route.origin, dropoff: route.destination, routeId: route.id });
        setShowRouteDropdown(false);
        setRouteSearch('');
    };

    const swapLocations = () => {
        if (!data.pickup && !data.dropoff) return;
        updateData({ pickup: data.dropoff, dropoff: data.pickup });
    };

    const currentLabel =
        data.pickup && data.dropoff
            ? `${data.pickup} → ${data.dropoff}`
            : data.pickup
                ? `From: ${data.pickup}`
                : 'Select a route…';

    const handleNext = () => {
        const newErrors: Record<string, string> = {};
        if (!data.pickup) newErrors.pickup = 'Pickup location is required';
        if (!data.dropoff) newErrors.dropoff = 'Dropoff destination is required';
        if (!data.date) newErrors.date = 'Please select a travel date';
        if (!data.time) newErrors.time = 'Please select a pickup time';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onNext();
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Plan Your Journey</h2>
                    <p className="text-gray-400 mt-1 text-sm">Choose your route, date, and time.</p>
                </div>
                <div className="shrink-0">
                    <WhatsAppVoiceButton />
                </div>
            </div>

            {/* Service Type Selector */}
            <div className="grid grid-cols-3 gap-2 md:gap-3">
                {SERVICE_TYPES.map((type) => {
                    const isActive = data.serviceType === type.id;
                    return (
                        <motion.button
                            key={type.id}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => {
                                updateData({ serviceType: type.id, pickup: '', dropoff: '', routeId: '' });
                                setRouteSearch('');
                            }}
                            className={`
                                relative flex flex-col items-center justify-center py-3.5 md:py-4 px-2 rounded-2xl border-2 transition-all duration-300 group overflow-hidden
                                ${isActive
                                    ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                                    : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white'}
                            `}
                        >
                            {isActive && (
                                <div className="absolute top-2 right-2">
                                    <CheckCircle2 size={12} className="text-gold-primary" />
                                </div>
                            )}
                            <type.icon size={20} className={`mb-1.5 transition-colors ${isActive ? 'text-gold-primary' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="text-xs font-bold uppercase tracking-widest">{type.label}</span>
                            <span className={`text-[10px] mt-0.5 ${isActive ? 'text-gold-primary/70' : 'text-gray-600'}`}>{type.desc}</span>
                        </motion.button>
                    );
                })}
            </div>

            {/* Route Picker Card */}
            <div className="bg-black/30 rounded-2xl p-4 md:p-5 border border-white/8 space-y-4">

                {/* Route Dropdown */}
                <div className="space-y-2" ref={dropdownRef}>
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-[0.25em] flex items-center gap-2">
                        <Navigation size={12} /> Quick Route Select
                    </label>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setShowRouteDropdown((v) => !v)}
                            className={`
                                w-full flex items-center justify-between px-4 py-3.5 rounded-xl border transition-all duration-300 text-left gap-3 min-h-[52px]
                                ${showRouteDropdown
                                    ? 'border-gold-primary bg-black/50 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                                    : 'border-white/10 bg-white/5 hover:border-white/20'}
                            `}
                        >
                            <span className={`text-sm font-medium truncate ${data.pickup || data.dropoff ? 'text-white' : 'text-gray-500'}`}>
                                {currentLabel}
                            </span>
                            <ChevronDown
                                size={16}
                                className={`text-gray-400 shrink-0 transition-transform duration-300 ${showRouteDropdown ? 'rotate-180 text-gold-primary' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {showRouteDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#0d0d0d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-3 border-b border-white/10">
                                        <div className="relative">
                                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                            <input
                                                autoFocus
                                                type="text"
                                                value={routeSearch}
                                                onChange={(e) => setRouteSearch(e.target.value)}
                                                placeholder="Search routes..."
                                                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:border-gold-primary/50 transition-colors"
                                            />
                                            {routeSearch && (
                                                <button onClick={() => setRouteSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                                    <X size={13} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredRoutes.length === 0 ? (
                                            <div className="py-8 text-center text-gray-500 text-sm flex flex-col items-center gap-2">
                                                <Plane size={22} className="opacity-30" />
                                                <span>No routes found</span>
                                            </div>
                                        ) : (
                                            filteredRoutes.map((route, idx) => {
                                                const isSelected = data.pickup === route.origin && data.dropoff === route.destination;
                                                return (
                                                    <motion.button
                                                        key={route.id}
                                                        initial={{ opacity: 0, x: -6 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.025 }}
                                                        type="button"
                                                        onClick={() => selectRoute(route)}
                                                        className={`
                                                            w-full flex items-center justify-between px-4 py-3.5 text-left transition-all group border-b border-white/5 last:border-0 min-h-[52px]
                                                            ${isSelected
                                                                ? 'bg-gold-primary/15 text-gold-primary'
                                                                : 'hover:bg-white/5 text-gray-300 hover:text-white'}
                                                        `}
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? 'bg-gold-primary' : 'bg-gray-600 group-hover:bg-gold-primary/60'}`} />
                                                            <div className="min-w-0">
                                                                <div className="flex items-center gap-2 text-sm font-medium">
                                                                    <span className="truncate">{route.origin}</span>
                                                                    <ArrowRight size={12} className="text-gray-500 shrink-0" />
                                                                    <span className="truncate">{route.destination}</span>
                                                                </div>
                                                                {(route.distance || route.time) && (
                                                                    <p className="text-[11px] text-gray-500 mt-0.5">
                                                                        {route.distance}{route.distance && route.time ? ' · ' : ''}{route.time}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {isSelected && <CheckCircle2 size={15} className="text-gold-primary shrink-0 ml-2" />}
                                                    </motion.button>
                                                );
                                            })
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Pickup → Swap → Dropoff vertical stack (mobile-first) */}
                <div className="space-y-2">
                    {/* Pickup */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-[0.2em] flex items-center gap-2">
                            <MapPin size={12} /> Pickup Location
                        </label>
                        <div className={`bg-white/5 rounded-xl border transition-all duration-300 focus-within:border-gold-primary focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)] ${errors.pickup ? 'border-red-500/50' : 'border-white/10'}`}>
                            <input
                                type="text"
                                placeholder="e.g. Makkah Grand Mosque"
                                value={data.pickup || ''}
                                onChange={(e) => { updateData({ pickup: e.target.value }); setErrors(p => ({ ...p, pickup: '' })); }}
                                className="w-full px-4 py-3.5 bg-transparent outline-none text-white text-sm placeholder-gray-500 min-h-[52px]"
                            />
                        </div>
                        {errors.pickup && <p className="text-xs text-red-400 font-semibold ml-1">{errors.pickup}</p>}
                    </div>

                    {/* Swap Button — centered between the two fields */}
                    <div className="flex items-center justify-center">
                        <motion.button
                            type="button"
                            onClick={swapLocations}
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                            title="Swap pickup & dropoff"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-gold-primary/40 bg-gold-primary/10 text-gold-primary hover:bg-gold-primary hover:text-black transition-all duration-300"
                        >
                            <ArrowLeftRight size={14} />
                        </motion.button>
                    </div>

                    {/* Dropoff */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-[0.2em] flex items-center gap-2">
                            <Navigation size={12} /> Dropoff Destination
                        </label>
                        <div className={`bg-white/5 rounded-xl border transition-all duration-300 focus-within:border-gold-primary focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)] ${errors.dropoff ? 'border-red-500/50' : 'border-white/10'}`}>
                            <input
                                type="text"
                                placeholder="e.g. Madinah Hotel"
                                value={data.dropoff || ''}
                                onChange={(e) => { updateData({ dropoff: e.target.value }); setErrors(p => ({ ...p, dropoff: '' })); }}
                                className="w-full px-4 py-3.5 bg-transparent outline-none text-white text-sm placeholder-gray-500 min-h-[52px]"
                            />
                        </div>
                        {errors.dropoff && <p className="text-xs text-red-400 font-semibold ml-1">{errors.dropoff}</p>}
                    </div>
                </div>
            </div>

            {/* Date & Time — full width cards, mobile-friendly */}
            <div className="grid grid-cols-2 gap-3">
                {/* Date */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calendar size={12} /> Date
                    </label>
                    <div className={`bg-white/5 rounded-xl border transition-all duration-300 focus-within:border-gold-primary focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)] ${errors.date ? 'border-red-500/50' : 'border-white/10'}`}>
                        <input
                            type="date"
                            value={data.date ? data.date.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (!e.target.value) { updateData({ date: null }); return; }
                                updateData({ date: new Date(e.target.value) });
                                setErrors(p => ({ ...p, date: '' }));
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3.5 bg-transparent outline-none text-white text-sm [color-scheme:dark] min-h-[52px]"
                        />
                    </div>
                    {errors.date && <p className="text-xs text-red-400 font-semibold ml-1">{errors.date}</p>}
                </div>

                {/* Time */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-[0.2em] flex items-center gap-2">
                        <Clock size={12} /> Time
                    </label>
                    <div className={`bg-white/5 rounded-xl border transition-all duration-300 focus-within:border-gold-primary focus-within:shadow-[0_0_15px_rgba(212,175,55,0.1)] ${errors.time ? 'border-red-500/50' : 'border-white/10'}`}>
                        <input
                            type="time"
                            value={data.time ? data.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}
                            onChange={(e) => {
                                if (!e.target.value) { updateData({ time: null }); return; }
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const t = new Date(); t.setHours(hours); t.setMinutes(minutes);
                                updateData({ time: t });
                                setErrors(p => ({ ...p, time: '' }));
                            }}
                            className="w-full px-4 py-3.5 bg-transparent outline-none text-white text-sm [color-scheme:dark] min-h-[52px]"
                        />
                    </div>
                    {errors.time && <p className="text-xs text-red-400 font-semibold ml-1">{errors.time}</p>}
                </div>
            </div>

            {/* CTA */}
            <motion.button
                type="button"
                onClick={handleNext}
                whileHover={{ scale: 1.01, boxShadow: '0 0 40px rgba(212,175,55,0.35)' }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 md:py-5 bg-gradient-to-r from-gold-primary to-amber-600 text-black font-bold uppercase tracking-[0.2em] rounded-2xl shadow-xl flex items-center justify-center gap-3 group text-sm min-h-[56px]"
            >
                Choose Your Vehicle
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
        </div>
    );
}
