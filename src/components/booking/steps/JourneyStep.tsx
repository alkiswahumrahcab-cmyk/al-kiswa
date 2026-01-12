'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Clock, PlaneLanding, PlaneTakeoff, Building2, Navigation, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

import MapAutocomplete from '../MapAutocomplete';
import { usePricing } from '@/context/PricingContext';
import { splitRouteName } from '@/lib/utils/route-utils';

interface JourneyStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export default function JourneyStep({ data, updateData, onNext }: JourneyStepProps) {
    const { routes } = usePricing();
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleNext = () => {
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

    // Attempt to match a predefined route for better pricing/UX
    useEffect(() => {
        if (!data.pickup || !data.dropoff) return;

        const matched = routes.find(r => {
            const [p, d] = r.name.toLowerCase().split(/\u2192|\u2194| to /);
            const pMatch = data.pickup.toLowerCase().includes(p?.trim()) || p?.trim().includes(data.pickup.toLowerCase());
            const dMatch = data.dropoff.toLowerCase().includes(d?.trim()) || d?.trim().includes(data.dropoff.toLowerCase());
            return pMatch && dMatch;
        });

        if (matched && matched.id !== data.routeId) {
            updateData({ routeId: matched.id });
        } else if (!matched && data.routeId !== 'custom') {
            updateData({ routeId: 'custom' });
        }
    }, [data.pickup, data.dropoff, routes]);

    return (
        <div className="space-y-10">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-sans font-bold text-white">Journey Details</h2>
                <p className="text-gray-400 mt-2 font-light">Where and when would you like to travel?</p>
            </div>

            {/* Service Type Selector */}
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
                            relative flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group overflow-hidden
                            ${data.serviceType === type.id
                                ? 'border-gold-primary bg-gold-primary/10 text-gold-primary shadow-[0_0_20px_-5px_rgba(212,175,55,0.3)]'
                                : 'border-white/10 bg-white/5 text-gray-400 hover:border-gold-primary/50 hover:bg-white/10 hover:text-white'}
                        `}
                    >
                        {data.serviceType === type.id && (
                            <div className="absolute top-2 right-2 text-gold-primary">
                                <CheckCircle2 size={16} />
                            </div>
                        )}
                        <type.icon size={28} className={`mb-3 transition-colors ${data.serviceType === type.id ? 'text-gold-primary' : 'text-gray-500 group-hover:text-white'}`} />
                        <span className="text-xs font-bold uppercase tracking-widest">{type.label}</span>
                    </button>
                ))}
            </div>

            {/* Locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Pickup Location</label>
                    <div className="bg-black/20 p-1 rounded-2xl border border-white/10 focus-within:border-gold-primary/50 transition-colors">
                        <MapAutocomplete
                            label=""
                            placeholder="Hotel, Airport, or Landmark..."
                            value={data.pickup}
                            onChange={(val) => updateData({ pickup: val })}
                            error={errors.pickup}
                            inputClassName="w-full pl-12 pr-10 py-4 bg-transparent border-none outline-none text-white placeholder-gray-500 focus:ring-0"
                            className=""
                        />
                    </div>
                    {errors.pickup && <span className="text-xs text-red-500 font-medium ml-1">{errors.pickup}</span>}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Dropoff Destination</label>
                    <div className="bg-black/20 p-1 rounded-2xl border border-white/10 focus-within:border-gold-primary/50 transition-colors">
                        <MapAutocomplete
                            label=""
                            placeholder="Where are you heading?"
                            value={data.dropoff}
                            onChange={(val) => updateData({ dropoff: val })}
                            error={errors.dropoff}
                            inputClassName="w-full pl-12 pr-10 py-4 bg-transparent border-none outline-none text-white placeholder-gray-500 focus:ring-0"
                            className=""
                        />
                    </div>
                    {errors.dropoff && <span className="text-xs text-red-500 font-medium ml-1">{errors.dropoff}</span>}
                </div>
            </div>

            {/* Schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/5">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Travel Date</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors z-10">
                            <Calendar size={20} />
                        </div>
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
                                w-full pl-12 pr-4 py-4 bg-black/20 
                                border border-white/10 
                                rounded-2xl outline-none transition-all
                                focus:border-gold-primary/50 focus:bg-black/40 focus:shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]
                                text-white placeholder-gray-600
                                ${errors.date ? 'border-red-500/50' : ''}
                                [color-scheme:dark]
                            `}
                        />
                    </div>
                    {errors.date && <span className="text-xs text-red-500 font-medium ml-1">{errors.date}</span>}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Pickup Time</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors z-10">
                            <Clock size={20} />
                        </div>
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
                                w-full pl-12 pr-4 py-4 bg-black/20 
                                border border-white/10 
                                rounded-2xl outline-none transition-all
                                focus:border-gold-primary/50 focus:bg-black/40 focus:shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]
                                text-white placeholder-gray-600
                                ${errors.time ? 'border-red-500/50' : ''}
                                [color-scheme:dark]
                            `}
                        />
                    </div>
                    {errors.time && <span className="text-xs text-red-500 font-medium ml-1">{errors.time}</span>}
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
