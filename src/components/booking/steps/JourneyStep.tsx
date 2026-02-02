'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, PlaneLanding, PlaneTakeoff, Building2, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import MapAutocomplete from '../MapAutocomplete';
import { usePricing } from '@/context/PricingContext';
import { splitRouteName } from '@/lib/utils/route-utils';
import VisualRouteSelector from '../VisualRouteSelector';
import WhatsAppVoiceButton from '../WhatsAppVoiceButton';

interface JourneyStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export default function JourneyStep({ data, updateData, onNext }: JourneyStepProps) {
    const { routes } = usePricing();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [mode, setMode] = useState<'visual' | 'manual'>('visual');

    const handleNext = () => {
        // ... (existing validation logic)
        const newErrors: Record<string, string> = {};
        if (!data.pickup) newErrors.pickup = 'Pickup location is required';
        if (!data.dropoff) newErrors.dropoff = 'Dropoff location is required';
        if (!data.date) newErrors.date = 'Please select a date';
        if (!data.time) newErrors.time = 'Please select a time';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        onNext();
    };

    // ... (existing useEffect)

    // Handler for Visual Route Selection
    const handleVisualSelect = (location: string, type: 'pickup' | 'dropoff') => {
        if (type === 'pickup') {
            updateData({ pickup: location, dropoff: '' }); // Reset dropoff on new pickup
        } else {
            updateData({ dropoff: location });
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-sans font-bold text-white">Journey Details</h2>
                    <p className="text-gray-400 mt-2 font-light">Where and when would you like to travel?</p>
                </div>
                {/* Mode Toggle */}
                <div className="flex bg-white/5 p-1 rounded-xl self-center md:self-auto border border-white/10">
                    <button
                        onClick={() => setMode('visual')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'visual' ? 'bg-gold-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Easy Select
                    </button>
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${mode === 'manual' ? 'bg-gold-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    >
                        Custom Search
                    </button>
                </div>
            </div>

            {/* Elder Friendly Voice Option */}
            <WhatsAppVoiceButton />

            <div className="bg-black/20 rounded-3xl p-6 border border-white/5 shadow-inner">
                {mode === 'visual' ? (
                    <VisualRouteSelector
                        onSelect={handleVisualSelect}
                        currentPickup={data.pickup}
                        currentDropoff={data.dropoff}
                    />
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Service Type Selector (Keep for Manual Mode) */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: 'Intercity', icon: Building2, label: 'Intercity' },
                                { id: 'Airport', icon: PlaneLanding, label: 'Airport' },
                                { id: 'Ziarat', icon: Navigation, label: 'Ziarat' }
                            ].map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => updateData({ serviceType: type.id })}
                                    className={`
                                        relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 group overflow-hidden
                                        ${data.serviceType === type.id
                                            ? 'border-gold-primary bg-gold-primary/10 text-gold-primary'
                                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-gold-primary/50 hover:bg-white/10 hover:text-white'}
                                    `}
                                >
                                    {data.serviceType === type.id && (
                                        <div className="absolute top-2 right-2 text-gold-primary">
                                            <CheckCircle2 size={14} />
                                        </div>
                                    )}
                                    <type.icon size={24} className={`mb-2 transition-colors ${data.serviceType === type.id ? 'text-gold-primary' : 'text-gray-500 group-hover:text-white'}`} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">{type.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* Locations */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gold-primary uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <MapPin size={16} /> Pickup Location
                                </label>
                                <div className="bg-white/5 p-1 rounded-2xl border border-white/10 focus-within:border-gold-primary focus-within:bg-black/40 transition-all duration-300">
                                    <MapAutocomplete
                                        label=""
                                        placeholder="e.g. Jeddah Airport..."
                                        value={data.pickup}
                                        onChange={(val) => updateData({ pickup: val })}
                                        error={errors.pickup}
                                        inputClassName="w-full pl-6 pr-6 py-4 bg-transparent border-none outline-none text-white text-base placeholder-gray-400 focus:ring-0"
                                        className=""
                                    />
                                </div>
                                {errors.pickup && <span className="text-sm text-red-500 font-bold ml-2 bg-red-500/10 px-2 py-1 rounded-lg">{errors.pickup}</span>}
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-gold-primary uppercase tracking-widest ml-1 flex items-center gap-2">
                                    <Navigation size={16} /> Dropoff Destination
                                </label>
                                <div className="bg-white/5 p-1 rounded-2xl border border-white/10 focus-within:border-gold-primary focus-within:bg-black/40 transition-all duration-300">
                                    <MapAutocomplete
                                        label=""
                                        placeholder="e.g. Makkah Hotel..."
                                        value={data.dropoff}
                                        onChange={(val) => updateData({ dropoff: val })}
                                        error={errors.dropoff}
                                        inputClassName="w-full pl-6 pr-6 py-4 bg-transparent border-none outline-none text-white text-base placeholder-gray-400 focus:ring-0"
                                        className=""
                                    />
                                </div>
                                {errors.dropoff && <span className="text-sm text-red-500 font-bold ml-2 bg-red-500/10 px-2 py-1 rounded-lg">{errors.dropoff}</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-gold-primary uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Calendar size={16} /> Travel Date
                    </label>
                    <div className="relative group">
                        <input
                            type="date"
                            value={data.date ? data.date.toISOString().split('T')[0] : ''}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    updateData({ date: null });
                                    return;
                                }
                                const newDate = new Date(e.target.value);
                                updateData({ date: newDate });
                            }}
                            min={new Date().toISOString().split('T')[0]}
                            className={`
                                w-full px-6 py-5 bg-white/5 
                                border border-white/10 
                                rounded-2xl outline-none transition-all duration-300
                                focus:border-gold-primary focus:bg-black/40 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]
                                text-white text-lg placeholder-gray-500
                                ${errors.date ? 'border-red-500/50' : ''}
                                [color-scheme:dark]
                            `}
                        />
                    </div>
                    {errors.date && <span className="text-sm text-red-500 font-bold ml-2 bg-red-500/10 px-2 py-1 rounded-lg">{errors.date}</span>}
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-gold-primary uppercase tracking-widest ml-1 flex items-center gap-2">
                        <Clock size={16} /> Pickup Time
                    </label>
                    <div className="relative group">
                        <input
                            type="time"
                            value={data.time ? data.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}
                            onChange={(e) => {
                                if (!e.target.value) {
                                    updateData({ time: null });
                                    return;
                                }
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const newTime = new Date();
                                newTime.setHours(hours);
                                newTime.setMinutes(minutes);
                                updateData({ time: newTime });
                            }}
                            className={`
                                w-full px-6 py-5 bg-white/5 
                                border border-white/10 
                                rounded-2xl outline-none transition-all duration-300
                                focus:border-gold-primary focus:bg-black/40 focus:shadow-[0_0_20px_rgba(212,175,55,0.2)]
                                text-white text-lg placeholder-gray-500
                                ${errors.time ? 'border-red-500/50' : ''}
                                [color-scheme:dark]
                            `}
                        />
                    </div>
                    {errors.time && <span className="text-sm text-red-500 font-bold ml-2 bg-red-500/10 px-2 py-1 rounded-lg">{errors.time}</span>}
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={handleNext}
                    className="w-full py-5 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-bold uppercase tracking-widest rounded-2xl shadow-xl hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-3 group"
                >
                    Select Vehicle
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
