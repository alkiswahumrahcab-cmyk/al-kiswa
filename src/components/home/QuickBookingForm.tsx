'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Phone, User, ArrowRight, Car, Clock, CheckCircle, Bus, Mail, MapPin, PlaneLanding, PlaneTakeoff, CreditCard, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import SearchableSelect from '@/components/ui/SearchableSelect';
// import styles from './QuickBookingForm.module.css'; // Removing if unused or replacing with Tailwind
import { usePricing } from '@/context/PricingContext';
import { Route, Vehicle } from '@/lib/pricing';

interface QuickBookingFormProps {
    title?: string;
    subtitle?: string;
    className?: string;
    variant?: 'default' | 'fleet';
    initialRoutes?: Route[];
    initialVehicles?: Omit<Vehicle, 'icon'>[];
}

const SkeletonLoader = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-10 bg-white/5 rounded-xl w-full" />
        <div className="grid grid-cols-2 gap-4">
            <div className="h-12 bg-white/5 rounded-xl" />
            <div className="h-12 bg-white/5 rounded-xl" />
        </div>
        <div className="h-12 bg-white/5 rounded-xl w-full" />
        <div className="h-14 bg-white/10 rounded-xl w-full" />
    </div>
);

const QuickBookingForm = ({
    title,
    subtitle,
    className = '',
    variant = 'default',
    initialRoutes,
    initialVehicles
}: QuickBookingFormProps) => {
    const { routes: contextRoutes, vehicles: contextVehicles, isLoading: contextLoading, calculatePrice } = usePricing();

    // Helper to attach icons if missing
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const attachIcons = (vehiclesData: any[]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return vehiclesData.map((v: any) => ({
            ...v,
            icon: v.icon || ((v.name?.toLowerCase().includes('hiace') || v.name?.toLowerCase().includes('coaster') || v.id?.includes('hiace') || v.id?.includes('coaster')) ? Bus : Car)
        }));
    };

    const routes = initialRoutes || contextRoutes;
    const vehicles = initialVehicles ? attachIcons(initialVehicles) : contextVehicles;
    const isLoading = (initialRoutes && initialVehicles) ? false : contextLoading;

    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', date: null as Date | null, time: null as Date | null,
        routeId: '', pickup: '', dropoff: '', vehicleId: '', vehicleCount: 1, passengers: 1, luggage: 0, notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Auto-detect route
    useEffect(() => {
        if (formData.routeId === 'custom' || !formData.pickup || !formData.dropoff) return;

        const findBestRoute = () => {
            const p = formData.pickup.toLowerCase().replace('madina', 'madinah');
            const d = formData.dropoff.toLowerCase().replace('madina', 'madinah');

            return routes.find(r => {
                const routeName = r.name.toLowerCase();
                const parts = routeName.split(/\u2192|\u2194| to /);
                if (parts.length < 2) return false;
                const routeStart = parts[0].trim();
                const routeEnd = parts[1].trim();
                return (routeStart.includes(p) || p.includes(routeStart)) && (routeEnd.includes(d) || d.includes(routeEnd));
            });
        };

        const matched = findBestRoute();
        if (matched) {
            setFormData(prev => ({ ...prev, routeId: matched.id }));
            if (errors.routeId) setErrors(prev => ({ ...prev, routeId: '' }));
        }
    }, [formData.pickup, formData.dropoff, routes, formData.routeId, errors.routeId]);

    const vehicleOptions = vehicles.map(vehicle => {
        let price = 0;
        let originalPrice = 0;

        if (formData.routeId && formData.routeId !== 'custom') {
            const priceDetails = calculatePrice(formData.routeId, vehicle.id);
            price = priceDetails.price;
            originalPrice = priceDetails.originalPrice;
        }

        return {
            value: vehicle.id,
            label: `${vehicle.name} (${vehicle.capacity} pax)`,
            price,
            originalPrice,
            image: vehicle.image,
            isVip: vehicle.name.includes('GMC')
        };
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            if (name === 'vehicleId' || name === 'vehicleCount') {
                const vId = name === 'vehicleId' ? value : prev.vehicleId;
                const vCount = name === 'vehicleCount' ? Number(value) : prev.vehicleCount;
                const selectedV = vehicles.find(v => v.id === vId);
                if (selectedV) newData.passengers = parseInt(selectedV.capacity) * vCount;
            }
            return newData;
        });
        if (errors[name]) setErrors({ ...errors, [name]: '' });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, date });
        if (errors.date) setErrors({ ...errors, date: '' });
    };

    const handleTimeChange = (time: Date | null) => {
        setFormData({ ...formData, time });
        if (errors.time) setErrors({ ...errors, time: '' });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone required'; // Relaxed check
        if (!formData.date) newErrors.date = 'Date required';
        if (!formData.time) newErrors.time = 'Time required';
        if (!formData.pickup.trim()) newErrors.pickup = 'Pickup required';
        if (!formData.dropoff.trim()) newErrors.dropoff = 'Dropoff required';
        if (!formData.routeId) newErrors.routeId = 'Route required';
        if (!formData.vehicleId) newErrors.vehicleId = 'Vehicle required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setIsSubmitting(true);

        try {
            const selectedVehicle = vehicles.find(v => v.id === formData.vehicleId);
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    date: formData.date?.toISOString().split('T')[0],
                    pickup: formData.pickup,
                    dropoff: formData.dropoff,
                    time: formData.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    vehicle: selectedVehicle ? selectedVehicle.name : 'Any',
                    passengers: selectedVehicle ? parseInt(selectedVehicle.capacity) : 1,
                    vehicleCount: Number(formData.vehicleCount),
                    luggage: Number(formData.luggage),
                    status: 'pending',
                    routeId: formData.routeId,
                    vehicleId: formData.vehicleId
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({
                    name: '', phone: '', email: '', date: null, time: null, routeId: '', vehicleId: '',
                    pickup: '', dropoff: '', vehicleCount: 1, passengers: 1, luggage: 0, notes: ''
                });
                setErrors({});
            } else {
                throw new Error('Booking failed');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to submit booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const allLocations = ["Makkah Hotel", "Madinah Hotel", "Jeddah Airport", "Jeddah Hotel", "Makkah Haram", "Madinah Haram", "Madinah Airport"]; // Simplified list

    return (
        <motion.div
            className={`bg-primary-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 lg:p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] relative overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

            {(title || variant === 'fleet') && (
                <div className="mb-6 border-b border-white/10 pb-4">
                    <h3 className="text-2xl font-sans font-bold text-white mb-1 shadow-sm uppercase tracking-tight flex items-center gap-2">
                        {title || 'Quick Booking'}
                        <div className="h-px flex-1 bg-gradient-to-r from-gold-primary/50 to-transparent ml-4" />
                    </h3>
                    <p className="text-sm text-gray-400 font-medium tracking-wide">
                        {subtitle || 'Premium Luxury Transport'}
                    </p>
                </div>
            )}

            <AnimatePresence mode='wait'>
                {isLoading ? (
                    <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <SkeletonLoader />
                    </motion.div>
                ) : isSubmitted ? (
                    <motion.div
                        key="success"
                        className="flex flex-col items-center justify-center text-center py-10 space-y-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-primary to-gold-dark flex items-center justify-center shadow-lg shadow-gold-primary/20">
                            <CheckCircle size={40} className="text-white" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Booking Received</h3>
                            <p className="text-gray-300 max-w-xs mx-auto text-sm">We will contact you shortly to confirm your VIP journey.</p>
                        </div>
                        <button
                            onClick={() => setIsSubmitted(false)}
                            className="bg-gold-primary text-black py-3 px-8 rounded-xl font-bold uppercase tracking-wider text-sm shadow-xl hover:bg-white hover:scale-105 transition-all"
                        >
                            Book Another Trip
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        className="space-y-5 relative z-10"
                        noValidate
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {/* Route Pills */}
                        <div>
                            <label className="text-[10px] font-bold text-gold-primary/90 uppercase tracking-[0.15em] mb-2.5 block">Popular Routes</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: 'Jeddah ⇄ Makkah', icon: PlaneLanding, pickup: 'Jeddah Airport', dropoff: 'Makkah Hotel' },
                                    { label: 'Makkah ⇄ Madinah', icon: Bus, pickup: 'Makkah Hotel', dropoff: 'Madinah Hotel' },
                                    { label: 'Jeddah ⇄ Madinah', icon: PlaneTakeoff, pickup: 'Jeddah Airport', dropoff: 'Madinah Hotel' },
                                    { label: 'Custom', icon: MapPin, pickup: '', dropoff: '', isCustom: true },
                                ].map((route) => {
                                    const isActive = route.isCustom ? formData.routeId === 'custom' : (formData.pickup.includes(route.pickup) && formData.dropoff.includes(route.dropoff));
                                    return (
                                        <button
                                            key={route.label}
                                            type="button"
                                            onClick={() => {
                                                if (route.isCustom) {
                                                    setFormData({ ...formData, routeId: 'custom', pickup: '', dropoff: '' });
                                                } else {
                                                    const matched = routes.find(r => r.name.toLowerCase().includes(route.pickup.toLowerCase()) && r.name.toLowerCase().includes(route.dropoff.toLowerCase()));
                                                    setFormData({ ...formData, pickup: route.pickup, dropoff: route.dropoff, routeId: matched ? matched.id : '' });
                                                }
                                                setErrors({});
                                            }}
                                            className={`
                                                flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 border
                                                ${isActive
                                                    ? 'bg-gold-primary text-black border-gold-primary shadow-lg shadow-gold-primary/20'
                                                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-gold-primary/30'
                                                }
                                            `}
                                        >
                                            <route.icon size={12} className={isActive ? 'text-black' : 'text-gold-primary'} />
                                            {route.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Main Inputs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Pickup & Dropoff */}
                            <div className="space-y-4">
                                <SearchableSelect
                                    name="pickup"
                                    value={formData.pickup}
                                    onChange={(e: any) => setFormData({ ...formData, pickup: e.target.value })}
                                    options={allLocations.map(l => ({ value: l, label: l }))}
                                    placeholder="Pickup Location"
                                    className="w-full !bg-white/5 !border-white/10 !text-white !placeholder-gray-500 rounded-xl focus:!border-gold-primary focus:!ring-gold-primary/20 hover:!bg-white/10 transition-all font-light"
                                    icon={<MapPin size={16} className="text-gold-primary" />}
                                />
                                {errors.pickup && <span className="text-red-400 text-xs ml-2">{errors.pickup}</span>}

                                <SearchableSelect
                                    name="dropoff"
                                    value={formData.dropoff}
                                    onChange={(e: any) => setFormData({ ...formData, dropoff: e.target.value })}
                                    options={allLocations.map(l => ({ value: l, label: l }))}
                                    placeholder="Dropoff Location"
                                    className="w-full !bg-white/5 !border-white/10 !text-white !placeholder-gray-500 rounded-xl focus:!border-gold-primary focus:!ring-gold-primary/20 hover:!bg-white/10 transition-all font-light"
                                    icon={<MapPin size={16} className="text-gold-primary" />}
                                />
                                {errors.dropoff && <span className="text-red-400 text-xs ml-2">{errors.dropoff}</span>}
                            </div>

                            {/* Date & Time */}
                            <div className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary"><Calendar size={16} /></div>
                                    <input
                                        type="date"
                                        value={formData.date ? formData.date.toISOString().split('T')[0] : ''}
                                        onChange={(e) => handleDateChange(e.target.value ? new Date(e.target.value) : null)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-gold-primary focus:ring-4 focus:ring-gold-primary/10 transition-all text-sm font-light hover:bg-white/10"
                                    />
                                    {errors.date && <span className="text-red-400 text-xs ml-2 absolute -bottom-5">{errors.date}</span>}
                                </div>
                                <div className="relative group">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary"><Clock size={16} /></div>
                                    <input
                                        type="time"
                                        value={formData.time ? formData.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : ''}
                                        onChange={(e) => {
                                            if (!e.target.value) return handleTimeChange(null);
                                            const [h, m] = e.target.value.split(':').map(Number);
                                            const t = new Date(); t.setHours(h); t.setMinutes(m);
                                            handleTimeChange(t);
                                        }}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-gold-primary focus:ring-4 focus:ring-gold-primary/10 transition-all text-sm font-light hover:bg-white/10"
                                    />
                                    {errors.time && <span className="text-red-400 text-xs ml-2 absolute -bottom-5">{errors.time}</span>}
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Selection */}
                        <div className="relative">
                            <SearchableSelect
                                name="vehicleId"
                                value={formData.vehicleId}
                                onChange={handleChange as any}
                                // @ts-ignore
                                options={vehicleOptions}
                                placeholder="Select Vehicle Class"
                                className="w-full !bg-white/5 !border-gold-primary/30 !text-white !py-3.5 focus:!border-gold-primary hover:!bg-white/10 transition-all"
                                icon={<Car size={18} className="text-gold-primary" />}
                            />
                            {errors.vehicleId && <span className="text-red-400 text-xs ml-2">{errors.vehicleId}</span>}

                            {/* Price Display */}
                            {formData.vehicleId && formData.routeId && formData.routeId !== 'custom' && (() => {
                                const selected = vehicleOptions.find(v => v.value === formData.vehicleId);
                                if (selected && selected.price > 0) return (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-end pointer-events-none">
                                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Est. Fare</span>
                                        <span className="text-gold-primary font-bold text-lg leading-none">{selected.price} <span className="text-xs">SAR</span></span>
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Contact Form (Revealed on Interaction) */}
                        <AnimatePresence>
                            {(formData.pickup || formData.routeId) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary"><User size={16} /></div>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-gold-primary focus:ring-4 focus:ring-gold-primary/10 transition-all text-sm font-light hover:bg-white/10"
                                            />
                                            {errors.name && <span className="text-red-400 text-xs ml-2">{errors.name}</span>}
                                        </div>
                                        <div className="relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary"><Phone size={16} /></div>
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone (+966...)"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-gold-primary focus:ring-4 focus:ring-gold-primary/10 transition-all text-sm font-light hover:bg-white/10"
                                            />
                                            {errors.phone && <span className="text-red-400 text-xs ml-2">{errors.phone}</span>}
                                        </div>
                                        <div className="md:col-span-2 relative">
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-primary"><Mail size={16} /></div>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 outline-none focus:border-gold-primary focus:ring-4 focus:ring-gold-primary/10 transition-all text-sm font-light hover:bg-white/10"
                                            />
                                            {errors.email && <span className="text-red-400 text-xs ml-2">{errors.email}</span>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gold-primary text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gold-primary/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Processing...' : 'Reserve Now'}
                            {!isSubmitting && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>

                        {/* Trust Badges */}
                        <div className="flex justify-center gap-6 pt-2 opacity-60">
                            <span className="flex items-center gap-1.5 text-[10px] text-white uppercase tracking-wider font-medium"><ShieldCheck size={12} className="text-gold-primary" /> Secure</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-white uppercase tracking-wider font-medium"><CreditCard size={12} className="text-gold-primary" /> Pay Later</span>
                            <span className="flex items-center gap-1.5 text-[10px] text-white uppercase tracking-wider font-medium"><HeartHandshake size={12} className="text-gold-primary" /> 24/7 Support</span>
                        </div>
                    </motion.form>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default QuickBookingForm;
