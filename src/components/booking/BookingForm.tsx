'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, Clock, ChevronDown,
    Search, User, Mail, Phone, Plane, Users, Briefcase, Baby, Loader2, Plus, Trash2, Minus
} from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MobileStickySummary from './MobileStickySummary';
import Receipt from './Receipt';
import BookingSuccessModal from './BookingSuccessModal';
import CurrencyToggle from '../CurrencyToggle';
import NusukBookingAlert from '@/components/trust/NusukBookingAlert';

export default function BookingForm() {
    const { routes, vehicles, isLoading, calculatePrice } = usePricing();
    const { currency, formatPrice } = useCurrency();
    const router = useRouter();

    const [data, setData] = useState({
        serviceType: 'Intercity',
        legs: [{ id: Date.now().toString(), routeId: '', pickup: '', dropoff: '', date: '', time: '', flightNumber: '', hours: undefined as number | undefined }],
        selectedVehicles: [] as { vehicleId: string, quantity: number }[],
        passengers: 1,
        childSeats: false,
        name: '',
        email: '',
        phone: '',
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [receiptData, setReceiptData] = useState<any>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Flow State
    const [activeSection, setActiveSection] = useState<'route' | 'vehicle' | 'details'>('route');
    const vehicleSectionRef = useRef<HTMLDivElement>(null);
    const detailsSectionRef = useRef<HTMLDivElement>(null);

    // Dropdowns for multiple legs
    const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
    const [routeSearches, setRouteSearches] = useState<Record<number, string>>({});
    const dropdownRef = useRef<HTMLDivElement>(null);

    const updateData = (updates: Partial<typeof data>) => {
        setData(prev => ({ ...prev, ...updates }));
        if (Object.keys(updates).length > 0) {
            setErrors(prev => {
                const newErrors = { ...prev };
                Object.keys(updates).forEach(key => delete newErrors[key]);
                return newErrors;
            });
        }
    };

    const addLeg = () => {
        setData(prev => ({
            ...prev,
            legs: [...prev.legs, { id: Date.now().toString(), routeId: '', pickup: '', dropoff: '', date: '', time: '', flightNumber: '', hours: undefined }]
        }));
    };

    const removeLeg = (index: number) => {
        if (data.legs.length <= 1) return;
        setData(prev => {
            const newLegs = [...prev.legs];
            newLegs.splice(index, 1);
            return { ...prev, legs: newLegs };
        });
    };

    const updateLeg = (index: number, updates: any) => {
        setData(prev => {
            const newLegs = [...prev.legs];
            newLegs[index] = { ...newLegs[index], ...updates };
            return { ...prev, legs: newLegs };
        });
        
        setErrors(prev => {
            const newErrors = { ...prev };
            Object.keys(updates).forEach(key => delete newErrors[`leg_${index}_${key}`]);
            return newErrors;
        });
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setActiveDropdownIndex(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const selectRoute = (index: number, route: any) => {
        updateLeg(index, { pickup: route.origin, dropoff: route.destination, routeId: route.id });
        setActiveDropdownIndex(null);
        setRouteSearches(prev => ({ ...prev, [index]: '' }));
    };

    const updateVehicleQuantity = (vehicleId: string, quantity: number) => {
        const current = data.selectedVehicles || [];
        const existing = current.find(v => v.vehicleId === vehicleId);
        let newVehicles;
        if (existing) {
            if (quantity <= 0) {
                newVehicles = current.filter(v => v.vehicleId !== vehicleId);
            } else {
                newVehicles = current.map(v => v.vehicleId === vehicleId ? { ...v, quantity } : v);
            }
        } else if (quantity > 0) {
            newVehicles = [...current, { vehicleId, quantity }];
        } else {
            newVehicles = current;
        }
        updateData({ selectedVehicles: newVehicles });
        
        if (newVehicles.length > 0 && activeSection !== 'details') {
            setActiveSection('details');
            setTimeout(() => {
                detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const getLegPrice = (leg: any, vehicleId: string) => {
        if (!leg.routeId || !vehicleId) return 0;
        const priceCalc = calculatePrice(leg.routeId, vehicleId);
        const base = priceCalc ? priceCalc.price : 0;
        const selectedRoute = routes.find(r => r.id === leg.routeId);
        const isHourly = selectedRoute?.name?.toLowerCase().includes('hourly') || selectedRoute?.origin?.toLowerCase().includes('hourly');
        return isHourly && leg.hours ? base * leg.hours : base;
    };

    const getLegPriceUSD = (leg: any, vehicleId: string) => {
        if (!leg.routeId || !vehicleId) return 0;
        const priceCalc = calculatePrice(leg.routeId, vehicleId);
        const base = priceCalc ? priceCalc.priceUSD : 0;
        const selectedRoute = routes.find(r => r.id === leg.routeId);
        const isHourly = selectedRoute?.name?.toLowerCase().includes('hourly') || selectedRoute?.origin?.toLowerCase().includes('hourly');
        return isHourly && leg.hours ? (base || 0) * leg.hours : (base || 0);
    };

    const getTotalPrice = () => {
        let totalSAR = 0;
        let totalUSD = 0;
        if (!data.selectedVehicles) return { price: 0, priceUSD: 0 };
        
        data.selectedVehicles.forEach(sv => {
            data.legs.forEach(leg => {
                totalSAR += getLegPrice(leg, sv.vehicleId) * sv.quantity;
                totalUSD += (getLegPriceUSD(leg, sv.vehicleId) || 0) * sv.quantity;
            });
        });
        
        if (data.legs.length >= 3 && totalSAR > 0) {
            totalSAR = Math.round(totalSAR * 0.95);
            totalUSD = Math.round(totalUSD * 0.95);
        }
        
        return { price: totalSAR, priceUSD: totalUSD };
    };

    const handleSubmit = async () => {
        setGeneralError(null);
        const newErrors: Record<string, string> = {};
        
        let allLegsValid = true;
        data.legs.forEach((leg, index) => {
            if (!leg.routeId) { newErrors[`leg_${index}_route`] = 'Please select a route'; allLegsValid = false; }
            if (!leg.date) { newErrors[`leg_${index}_date`] = 'Required'; allLegsValid = false; }
            if (!leg.time) { newErrors[`leg_${index}_time`] = 'Required'; allLegsValid = false; }
        });

        if (!data.selectedVehicles || data.selectedVehicles.length === 0) newErrors.vehicle = 'Please select at least one vehicle';
        if (!data.name) newErrors.name = 'Required';
        if (!data.phone) newErrors.phone = 'Required';
        if (!data.email) newErrors.email = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setGeneralError('Please fix the errors highlighted above before confirming your booking.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);
        try {
            const priceCalc = getTotalPrice();
            const sarPrice = priceCalc.price;
            const explicitUSD = priceCalc.priceUSD;
            const finalDisplayPrice = formatPrice(sarPrice, explicitUSD);
            
            const selectedVehicleInfo = data.selectedVehicles.length > 0 ? vehicles.find(v => v.id === data.selectedVehicles[0].vehicleId) : null;

            const bookingPayload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                legs: data.legs,
                pickup: data.legs[0].pickup,
                dropoff: data.legs[data.legs.length - 1].dropoff,
                date: data.legs[0].date,
                time: data.legs[0].time,
                routeId: data.legs[0].routeId,
                vehicleId: data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : '',
                selectedVehicles: data.selectedVehicles,
                vehicleCount: data.selectedVehicles.reduce((sum, v) => sum + v.quantity, 0),
                passengers: data.passengers,
                luggage: 0,
                notes: data.notes || (data.childSeats ? 'Child seats requested' : undefined),
                price: sarPrice != null ? String(sarPrice) : undefined,
                currency: currency,
                priceInSelectedCurrency: finalDisplayPrice.amount,
                priceInSAR: sarPrice,
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                const humanReadableId = result.bookingId || result.bookingRef || 'BKG-' + Math.floor(Math.random() * 10000);
                const receipt = {
                    id: humanReadableId,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    pickupLocation: data.legs[0].pickup,
                    dropoffLocation: data.legs[data.legs.length - 1].dropoff,
                    date: data.legs[0].date,
                    time: data.legs[0].time,
                    routeName: data.legs.length > 1 ? `Multi-Route Itinerary (${data.legs.length} Transfers)` : `${data.legs[0].pickup} to ${data.legs[0].dropoff}`,
                    vehicleName: data.selectedVehicles.map(sv => { const v = vehicles.find(v => v.id === sv.vehicleId); return v ? `${sv.quantity}x ${v.name}` : ''; }).join(', ') || 'Standard Vehicle',
                    passengers: data.passengers,
                    currency: currency,
                    totalAmount: finalDisplayPrice.amount
                };
                setReceiptData(receipt);
                setShowSuccessModal(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                if (result.errors) {
                    const backendErrors: Record<string, string> = {};
                    Object.keys(result.errors).forEach(key => {
                        if (key !== '_errors' && result.errors[key]?._errors?.length > 0) {
                            backendErrors[key] = result.errors[key]._errors[0];
                        }
                    });
                    setErrors(backendErrors);
                    setGeneralError('Please fix the errors highlighted below.');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    setGeneralError(`Failed to submit booking: ${result.message || 'Unknown error'}`);
                }
            }
        } catch (error) {
            console.error(error);
            setGeneralError('An unexpected network error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedVehicleCount = data.selectedVehicles?.reduce((sum, v) => sum + v.quantity, 0) || 0;
    const vehicleSummary = data.selectedVehicles?.map(sv => { const v = vehicles.find(v => v.id === sv.vehicleId); return v ? `${sv.quantity}x ${v.name}` : ''; }).join(', ');
    
    let summaryDisplayPrice = { amount: 0, formatted: '0' };
    
    if (selectedVehicleCount > 0 && data.legs.every(leg => leg.routeId)) {
        const summaryPriceCalc = getTotalPrice();
        summaryDisplayPrice = formatPrice(summaryPriceCalc.price, summaryPriceCalc.priceUSD);
    }

    if (isLoading) {
        return <div className="p-10 text-center text-white">Loading booking engine...</div>;
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-28 md:pt-32 pb-32 relative">
            
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Book Your Transfer</h1>
                    <p className="text-gray-400 text-base md:text-lg">Experience premium travel across Saudi Arabia.</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-full border border-white/10 self-start md:self-auto backdrop-blur-sm">
                    <span className="text-xs font-medium text-gray-400 pl-4 uppercase tracking-wider">Currency</span>
                    <CurrencyToggle />
                </div>
            </div>

            <NusukBookingAlert />

            <div className="space-y-16">
                
                {/* 1. ROUTE SELECTION */}
                <section className={`transition-opacity duration-500 ${activeSection !== 'route' && data.legs[0].routeId ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gold-primary text-black flex items-center justify-center font-bold">1</div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">Build Your Itinerary</h2>
                    </div>
                    
                    <div className="pl-0 md:pl-11 space-y-8" ref={dropdownRef}>
                        {data.legs.map((leg, index) => {
                            const searchStr = routeSearches[index] || '';
                            const filteredRoutes = routes.filter((r) => {
                                const searchLower = searchStr.toLowerCase();
                                return !searchStr || (r.origin?.toLowerCase() || '').includes(searchLower) || (r.destination?.toLowerCase() || '').includes(searchLower);
                            });
                            
                            const selectedRoute = routes.find(r => r.id === leg.routeId);
                            const isHourly = selectedRoute?.name?.toLowerCase().includes('hourly') || selectedRoute?.origin?.toLowerCase().includes('hourly');

                            const currentLabel = leg.pickup && leg.dropoff
                                ? `${leg.pickup} → ${leg.dropoff}`
                                : 'Search for a route (e.g., Makkah to Madinah)...';

                            return (
                                <div key={leg.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 relative">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-gold-primary font-bold">Transfer {index + 1}</h3>
                                        {data.legs.length > 1 && (
                                            <button onClick={() => removeLeg(index)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Route Dropdown */}
                                        <div className="relative md:col-span-2">
                                            <MapPin className="absolute left-0 top-4 text-gold-primary" size={24} />
                                            <button
                                                type="button"
                                                onClick={() => setActiveDropdownIndex(activeDropdownIndex === index ? null : index)}
                                                className={`w-full flex items-center justify-between pl-10 pr-4 py-4 border-b-2 bg-transparent transition-colors text-left outline-none ${errors[`leg_${index}_route`] ? 'border-red-500' : 'border-white/20 hover:border-gold-primary focus:border-gold-primary'}`}
                                            >
                                                <span className={`text-lg font-medium truncate ${leg.pickup ? 'text-white' : 'text-gray-400'}`}>
                                                    {currentLabel}
                                                </span>
                                                <ChevronDown size={20} className={`text-gray-400 transition-transform ${activeDropdownIndex === index ? 'rotate-180' : ''}`} />
                                            </button>
                                            {errors[`leg_${index}_route`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_route`]}</p>}
                                            
                                            <AnimatePresence>
                                                {activeDropdownIndex === index && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                                        className="absolute top-full left-0 right-0 mt-2 z-50 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                                    >
                                                        <div className="hidden md:block p-4 border-b border-white/10 relative">
                                                            <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                                                            <input
                                                                type="text" value={searchStr} onChange={(e) => setRouteSearches(prev => ({ ...prev, [index]: e.target.value }))}
                                                                placeholder="Search city or airport..."
                                                                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-white/10 rounded-none text-base text-white placeholder-gray-500 outline-none focus:border-gold-primary transition-colors"
                                                            />
                                                        </div>
                                                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                                            {filteredRoutes.length > 0 ? filteredRoutes.map((route) => (
                                                                <button
                                                                    key={route.id} type="button" onClick={() => selectRoute(index, route)}
                                                                    className="w-full px-6 py-4 text-left hover:bg-gold-primary/10 text-gray-300 hover:text-white border-b border-white/5 last:border-0 transition-colors flex flex-col"
                                                                >
                                                                    <span className="font-semibold text-lg">{route.origin} <span className="text-gold-primary mx-2">→</span> {route.destination}</span>
                                                                    <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{route.category || 'Intercity'}</span>
                                                                </button>
                                                            )) : (
                                                                <div className="p-6 text-center text-gray-500">No routes found matching your search.</div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Date */}
                                        <div className="relative">
                                            <Calendar className="absolute left-0 top-4 text-gold-primary" size={20} />
                                            <input
                                                type="date"
                                                value={leg.date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => updateLeg(index, { date: e.target.value })}
                                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors 
                                                    ${errors[`leg_${index}_date`] ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}
                                                    [color-scheme:dark]`}
                                            />
                                            {errors[`leg_${index}_date`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_date`]}</p>}
                                        </div>

                                        {/* Time */}
                                        <div className="relative">
                                            <Clock className="absolute left-0 top-4 text-gold-primary" size={20} />
                                            <input
                                                type="time"
                                                value={leg.time}
                                                onChange={(e) => updateLeg(index, { time: e.target.value })}
                                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors 
                                                    ${errors[`leg_${index}_time`] ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}
                                                    [color-scheme:dark]`}
                                            />
                                            {errors[`leg_${index}_time`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_time`]}</p>}
                                        </div>

                                        {/* Flight Number */}
                                        {leg.pickup?.toLowerCase().includes('airport') && (
                                            <div className="relative md:col-span-2">
                                                <Plane className="absolute left-0 top-4 text-gold-primary" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Flight Number (Optional)"
                                                    value={leg.flightNumber}
                                                    onChange={(e) => updateLeg(index, { flightNumber: e.target.value })}
                                                    className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-gold-primary text-white outline-none transition-colors placeholder-gray-600"
                                                />
                                            </div>
                                        )}

                                        {/* Hours (if Hourly route) */}
                                        {isHourly && (
                                            <div className="relative md:col-span-2">
                                                <Clock className="absolute left-0 top-4 text-gold-primary" size={20} />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="24"
                                                    placeholder="Number of Hours"
                                                    value={leg.hours || ''}
                                                    onChange={(e) => updateLeg(index, { hours: parseInt(e.target.value) || undefined })}
                                                    className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-gold-primary text-white outline-none transition-colors placeholder-gray-600"
                                                />
                                                <p className="text-gray-400 text-xs mt-1 absolute pl-8">Enter number of hours (e.g., 3)</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        <button 
                            onClick={() => { addLeg(); setActiveSection('route'); }}
                            className="w-full py-4 border-2 border-dashed border-white/20 hover:border-gold-primary rounded-xl text-gold-primary font-medium flex justify-center items-center gap-2 transition-colors"
                        >
                            <Plus size={20} /> Add Another Transfer
                        </button>
                    </div>
                </section>

                {/* 2. VEHICLE SELECTION */}
                <section ref={vehicleSectionRef} className={`transition-all duration-500 ${!data.legs.every(l => l.routeId) ? 'opacity-30 pointer-events-none' : activeSection !== 'vehicle' && (data.selectedVehicles && data.selectedVehicles.length > 0) ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${data.legs.every(l => l.routeId) ? 'bg-gold-primary text-black' : 'bg-white/10 text-gray-500'}`}>2</div>
                        <h2 className={`text-xl md:text-2xl font-bold ${data.legs.every(l => l.routeId) ? 'text-white' : 'text-gray-500'}`}>Select your vehicle</h2>
                    </div>

                    <div className="pl-0 md:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {vehicles.map((vehicle) => {
                            const selectedCount = data.selectedVehicles?.find(v => v.vehicleId === vehicle.id)?.quantity || 0;
                            const isSelected = selectedCount > 0;
                            
                            let priceCalc = null;
                            if (data.legs.every(l => l.routeId)) {
                                let totalSAR = 0; let totalUSD = 0;
                                data.legs.forEach(leg => {
                                    totalSAR += getLegPrice(leg, vehicle.id);
                                    totalUSD += getLegPriceUSD(leg, vehicle.id) || 0;
                                });
                                priceCalc = { price: totalSAR, priceUSD: totalUSD };
                            }
                            const dispPrice = priceCalc ? formatPrice(priceCalc.price, priceCalc.priceUSD) : null;

                            return (
                                <div
                                    key={vehicle.id}
                                    onClick={() => updateVehicleQuantity(vehicle.id, selectedCount === 0 ? 1 : selectedCount)}
                                    className={`relative cursor-pointer rounded-2xl p-5 md:p-6 transition-all duration-300 border-2 overflow-hidden group
                                        ${isSelected ? 'bg-gold-primary/5 border-gold-primary shadow-[0_0_30px_rgba(239,191,91,0.2)] scale-[1.02]' : 'bg-[#111] border-white/5 hover:border-gold-primary/50 hover:bg-[#151515]'}
                                    `}
                                >
                                    <div className="relative w-full h-56 sm:h-48 md:h-40 mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                        <Image
                                            src={`/images/fleet/${vehicle.name.toLowerCase().includes('gmc') ? 'gmc-yukon-2025.webp' : vehicle.name.toLowerCase().includes('hiace') ? 'toyota-hiace-2025.png' : vehicle.name.toLowerCase().includes('camry') ? 'camry-2025.png' : vehicle.name.toLowerCase().includes('staria') ? 'hyundai-staria-2025.png' : vehicle.name.toLowerCase().includes('starex') || vehicle.name.toLowerCase().includes('h1') ? 'hyundai-h1.png' : vehicle.name.toLowerCase().includes('coaster') ? 'toyota-coaster-2025.png' : 'camry-2025.png'}`}
                                            alt={vehicle.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`text-lg font-bold ${isSelected ? 'text-gold-primary' : 'text-white'}`}>{vehicle.name}</h3>
                                        {dispPrice && (
                                            <div className="text-right">
                                                {Number(dispPrice.amount) > 0 ? (
                                                    <>
                                                        <span className="text-sm text-gray-400">Total</span>
                                                        <p className="text-lg font-bold text-white">
                                                            {currency === 'USD' ? '$' : ''}{dispPrice.amount}
                                                            {currency === 'SAR' ? ' SAR' : ''}
                                                        </p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span className="text-sm text-gray-400">Status</span>
                                                        <p className="text-sm font-bold text-red-400 uppercase tracking-wider mt-1">Not Available</p>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><Users size={14} /> {vehicle.capacity}</span>
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {vehicle.luggage}</span>
                                    </div>
                                    
                                    {dispPrice && Number(dispPrice.amount) > 0 && data.legs.length > 1 && (
                                        <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Price Breakdown</p>
                                            {data.legs.map((leg, idx) => {
                                                const legSAR = getLegPrice(leg, vehicle.id);
                                                const legUSD = getLegPriceUSD(leg, vehicle.id) || 0;
                                                const legDisp = formatPrice(legSAR, legUSD);
                                                
                                                let routeName = `Route ${idx + 1}`;
                                                if (leg.pickup && leg.dropoff) {
                                                    const p = leg.pickup.split(',')[0].substring(0, 15);
                                                    const d = leg.dropoff.split(',')[0].substring(0, 15);
                                                    routeName = `${p} → ${d}`;
                                                }

                                                return (
                                                    <div key={idx} className="flex justify-between items-center text-xs">
                                                        <span className="text-gray-400 truncate pr-2 max-w-[75%]" title={leg.pickup && leg.dropoff ? `${leg.pickup} → ${leg.dropoff}` : routeName}>{routeName}</span>
                                                        <span className="text-gray-300 font-medium whitespace-nowrap">
                                                            {currency === 'USD' ? '$' : ''}{legDisp.amount} {currency === 'SAR' ? 'SAR' : ''}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                            {data.legs.length >= 3 && (
                                                <div className="flex justify-between items-center text-xs text-gold-primary mt-1 pt-1 border-t border-gold-primary/20">
                                                    <span>Multi-Route Discount</span>
                                                    <span>-5%</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {dispPrice && Number(dispPrice.amount) > 0 && (
                                        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                                            <span className="text-sm font-medium text-gray-300">Quantity</span>
                                            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-1 border border-white/10">
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); updateVehicleQuantity(vehicle.id, selectedCount - 1); }}
                                                    className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${selectedCount > 0 ? 'bg-white/10 hover:bg-white/20 text-white' : 'text-gray-600 cursor-not-allowed'}`}
                                                    disabled={selectedCount === 0}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-4 text-center font-bold text-white">{selectedCount}</span>
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); updateVehicleQuantity(vehicle.id, selectedCount + 1); }}
                                                    className="w-8 h-8 rounded bg-gold-primary/20 hover:bg-gold-primary/40 text-gold-primary flex items-center justify-center transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {errors.vehicle && <p className="text-red-500 text-sm mt-2 pl-4 md:pl-11">{errors.vehicle}</p>}
                </section>

                {/* 3. TRIP DETAILS */}
                <section ref={detailsSectionRef} className={`transition-all duration-500 ${(!data.selectedVehicles || data.selectedVehicles.length === 0) ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${(data.selectedVehicles && data.selectedVehicles.length > 0) ? 'bg-gold-primary text-black' : 'bg-white/10 text-gray-500'}`}>3</div>
                        <h2 className={`text-xl md:text-2xl font-bold ${(data.selectedVehicles && data.selectedVehicles.length > 0) ? 'text-white' : 'text-gray-500'}`}>Guest Details</h2>
                    </div>

                    <div className="pl-0 md:pl-11 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Passengers */}
                        <div className="relative md:col-span-2 lg:col-span-1">
                            <Users className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <div className="flex items-center justify-between w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-white/20">
                                <span className="text-gray-400">Number of Passengers</span>
                                <div className="flex items-center gap-4">
                                    <button 
                                        type="button" 
                                        onClick={() => updateData({ passengers: Math.max(1, data.passengers - 1) })}
                                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="text-white font-bold w-4 text-center">{data.passengers}</span>
                                    <button 
                                        type="button" 
                                        onClick={() => updateData({ passengers: Math.min(50, data.passengers + 1) })}
                                        className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Child Seat Toggle */}
                        <div className="relative md:col-span-2 lg:col-span-1">
                            <Baby className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <div className="flex items-center justify-between w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-white/20">
                                <span className="text-gray-400">Child Seat Required?</span>
                                <button
                                    type="button"
                                    onClick={() => updateData({ childSeats: !data.childSeats })}
                                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${data.childSeats ? 'bg-gold-primary' : 'bg-white/10'}`}
                                >
                                    <span className="sr-only">Toggle Child Seat</span>
                                    <motion.div
                                        className="absolute top-1 bottom-1 w-6 bg-white rounded-full shadow-md"
                                        initial={false}
                                        animate={{
                                            left: data.childSeats ? 'calc(100% - 28px)' : '4px',
                                        }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="md:col-span-2 mt-8 mb-4">
                            <h3 className="text-lg font-bold text-white mb-2">Contact Information</h3>
                        </div>

                        <div className="relative">
                            <User className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={data.name}
                                onChange={(e) => updateData({ name: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 absolute">{errors.name}</p>}
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <input
                                type="tel"
                                placeholder="WhatsApp Number *"
                                value={data.phone}
                                onChange={(e) => updateData({ phone: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}`}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1 absolute">{errors.phone}</p>}
                        </div>

                        <div className="relative md:col-span-2">
                            <Mail className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address *"
                                value={data.email}
                                onChange={(e) => updateData({ email: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 absolute">{errors.email}</p>}
                            <p className="text-gray-400 text-xs mt-2 pl-8">We will send a confirmation mail to this email address.</p>
                        </div>
                    </div>

                    <AnimatePresence>
                        {generalError && (
                            <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className="pl-0 md:pl-11 mt-8"
                            >
                                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 flex items-start gap-3">
                                    <svg className="w-6 h-6 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h4 className="text-red-500 font-medium">Booking Could Not Be Completed</h4>
                                        <p className="text-red-400/90 text-sm mt-1">{generalError}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Desktop Submit Button */}
                    <div className="pl-0 md:pl-11 mt-12 hidden md:block">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-12 py-4 bg-gold-primary hover:bg-white text-black font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(239,191,91,0.2)] flex items-center justify-center gap-3"
                        >
                            {isSubmitting ? (
                                <><Loader2 size={20} className="animate-spin" /> Processing...</>
                            ) : (
                                `Confirm Booking - ${currency === 'USD' ? '$' : ''}${summaryDisplayPrice.amount}${currency === 'SAR' ? ' SAR' : ''}`
                            )}
                        </button>
                    </div>
                </section>
            </div>

            {/* Mobile Sticky Summary */}
            <MobileStickySummary 
                isVisible={selectedVehicleCount > 0 && activeSection === 'details'}
                vehicleName={vehicleSummary || null}
                totalAmount={summaryDisplayPrice.amount}
                currency={currency}
                onConfirm={handleSubmit}
                isSubmitting={isSubmitting}
            />

            {/* Booking Success Modal */}
            {receiptData && (
                <BookingSuccessModal
                    isOpen={showSuccessModal}
                    bookingData={{
                        bookingId: receiptData.id,
                        name: receiptData.name,
                        email: receiptData.email,
                        phone: receiptData.phone,
                        pickup: receiptData.pickupLocation,
                        dropoff: receiptData.dropoffLocation,
                        date: receiptData.date,
                        time: receiptData.time,
                        vehicleName: receiptData.vehicleName,
                        passengers: receiptData.passengers,
                        currency: receiptData.currency,
                        totalAmount: receiptData.totalAmount,
                    }}
                    whatsappNumber="966548707332"
                    onClose={() => router.push('/')}
                />
            )}
        </div>
    );
}
