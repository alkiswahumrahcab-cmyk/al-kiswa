'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, Clock, ChevronDown,
    Search, User, Mail, Phone, Plane, Users, Briefcase
} from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MobileStickySummary from './MobileStickySummary';
import Receipt from './Receipt';
import CurrencyToggle from '../CurrencyToggle';

export default function BookingForm() {
    const { routes, vehicles, isLoading, calculatePrice } = usePricing();
    const { currency, formatPrice } = useCurrency();
    const router = useRouter();

    const [data, setData] = useState({
        serviceType: 'Intercity',
        routeId: '',
        pickup: '',
        dropoff: '',
        date: '',
        time: '',
        selectedVehicleId: '',
        passengers: 1,
        name: '',
        email: '',
        phone: '',
        flightNumber: '',
        notes: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [receiptData, setReceiptData] = useState<any>(null);

    // Flow State
    const [activeSection, setActiveSection] = useState<'route' | 'vehicle' | 'details'>('route');
    const vehicleSectionRef = useRef<HTMLDivElement>(null);
    const detailsSectionRef = useRef<HTMLDivElement>(null);

    // Route Dropdown state
    const [showRouteDropdown, setShowRouteDropdown] = useState(false);
    const [routeSearch, setRouteSearch] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const updateData = (updates: Partial<typeof data>) => {
        setData(prev => ({ ...prev, ...updates }));
        // Clear errors for updated fields
        if (Object.keys(updates).length > 0) {
            setErrors(prev => {
                const newErrors = { ...prev };
                Object.keys(updates).forEach(key => delete newErrors[key]);
                return newErrors;
            });
        }
    };

    // Close dropdown on click outside
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setShowRouteDropdown(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const filteredRoutes = routes.filter((r) => {
        const searchLower = routeSearch.toLowerCase();
        return !routeSearch || (r.origin?.toLowerCase() || '').includes(searchLower) || (r.destination?.toLowerCase() || '').includes(searchLower);
    });

    const selectRoute = (route: any) => {
        updateData({ pickup: route.origin, dropoff: route.destination, routeId: route.id });
        setShowRouteDropdown(false);
        setRouteSearch('');
        // Auto-scroll to vehicle section
        setActiveSection('vehicle');
        setTimeout(() => {
            vehicleSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const selectVehicle = (vehicleId: string) => {
        updateData({ selectedVehicleId: vehicleId });
        setActiveSection('details');
        setTimeout(() => {
            detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const currentLabel = data.pickup && data.dropoff
        ? `${data.pickup} → ${data.dropoff}`
        : 'Search for a route (e.g., Makkah to Madinah)...';

    const handleSubmit = async () => {
        const newErrors: Record<string, string> = {};
        if (!data.routeId) newErrors.route = 'Please select a route';
        if (!data.selectedVehicleId) newErrors.vehicle = 'Please select a vehicle';
        if (!data.date) newErrors.date = 'Required';
        if (!data.time) newErrors.time = 'Required';
        if (!data.name) newErrors.name = 'Required';
        if (!data.phone) newErrors.phone = 'Required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);
        try {
            const priceCalc = calculatePrice(data.routeId, data.selectedVehicleId);
            const sarPrice = priceCalc.price;
            const explicitUSD = priceCalc.priceUSD;
            const finalDisplayPrice = formatPrice(sarPrice, explicitUSD);
            
            const selectedVehicleInfo = vehicles.find(v => v.id === data.selectedVehicleId);
            const selectedRouteInfo = routes.find(r => r.id === data.routeId);

            const bookingPayload = {
                serviceType: data.serviceType,
                pickup: data.pickup,
                dropoff: data.dropoff,
                date: new Date(`${data.date}T${data.time}`).toISOString(),
                time: data.time,
                selectedVehicles: [{ vehicleId: data.selectedVehicleId, quantity: 1 }],
                vehicleCount: 1,
                passengers: data.passengers,
                luggage: 0, // Simplified for this view
                personalDetails: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    whatsapp: data.phone,
                    flightNumber: data.flightNumber,
                    childSeats: false
                },
                notes: data.notes,
                price: sarPrice,
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
                // Show receipt instead of redirecting
                setReceiptData({
                    id: result.bookingId || result.id || 'BKG-' + Math.floor(Math.random() * 10000),
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    pickupLocation: data.pickup,
                    dropoffLocation: data.dropoff,
                    date: data.date,
                    time: data.time,
                    routeName: `${data.pickup} to ${data.dropoff}`,
                    vehicleName: selectedVehicleInfo?.name || 'Standard Vehicle',
                    passengers: data.passengers,
                    currency: currency,
                    totalAmount: finalDisplayPrice.amount
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                alert(`Failed to submit booking: ${result.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(error);
            alert('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Selected vehicle object for summary
    const selectedVehicle = vehicles.find(v => v.id === data.selectedVehicleId);
    let summaryPriceCalc = null;
    let summaryDisplayPrice = { amount: 0, formatted: '0' };
    
    if (selectedVehicle && data.routeId) {
        summaryPriceCalc = calculatePrice(data.routeId, data.selectedVehicleId);
        summaryDisplayPrice = formatPrice(summaryPriceCalc.price, summaryPriceCalc.priceUSD);
    }

    if (isLoading) {
        return <div className="p-10 text-center text-white">Loading booking engine...</div>;
    }

    if (receiptData) {
        return (
            <div className="w-full px-4 py-10 md:py-16">
                <Receipt bookingData={receiptData} onClose={() => router.push('/')} />
            </div>
        );
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

            <div className="space-y-16">
                
                {/* 1. ROUTE SELECTION */}
                <section className={`transition-opacity duration-500 ${activeSection !== 'route' && data.routeId ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gold-primary text-black flex items-center justify-center font-bold">1</div>
                        <h2 className="text-xl md:text-2xl font-bold text-white">Where are you going?</h2>
                    </div>
                    
                    <div className="relative pl-4 md:pl-11" ref={dropdownRef}>
                        <div className="relative">
                            <MapPin className="absolute left-0 top-4 text-gold-primary" size={24} />
                            <button
                                type="button"
                                onClick={() => setShowRouteDropdown((v) => !v)}
                                className={`w-full flex items-center justify-between pl-10 pr-4 py-4 border-b-2 bg-transparent transition-colors text-left outline-none ${errors.route ? 'border-red-500' : 'border-white/20 hover:border-gold-primary focus:border-gold-primary'}`}
                            >
                                <span className={`text-lg font-medium truncate ${data.pickup ? 'text-white' : 'text-gray-400'}`}>
                                    {currentLabel}
                                </span>
                                <ChevronDown size={20} className={`text-gray-400 transition-transform ${showRouteDropdown ? 'rotate-180' : ''}`} />
                            </button>
                            {errors.route && <p className="text-red-500 text-xs mt-1 absolute">{errors.route}</p>}
                        </div>

                        <AnimatePresence>
                            {showRouteDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                                    className="absolute top-full left-4 md:left-11 right-0 mt-2 z-50 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden"
                                >
                                    <div className="p-4 border-b border-white/10 relative">
                                        <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                                        <input
                                            autoFocus type="text" value={routeSearch} onChange={(e) => setRouteSearch(e.target.value)}
                                            placeholder="Search city or airport..."
                                            className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-white/10 rounded-none text-base text-white placeholder-gray-500 outline-none focus:border-gold-primary transition-colors"
                                        />
                                    </div>
                                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                        {filteredRoutes.length > 0 ? filteredRoutes.map((route) => (
                                            <button
                                                key={route.id} type="button" onClick={() => selectRoute(route)}
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
                </section>

                {/* 2. VEHICLE SELECTION */}
                <section ref={vehicleSectionRef} className={`transition-all duration-500 ${!data.routeId ? 'opacity-30 pointer-events-none' : activeSection !== 'vehicle' && data.selectedVehicleId ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${data.routeId ? 'bg-gold-primary text-black' : 'bg-white/10 text-gray-500'}`}>2</div>
                        <h2 className={`text-xl md:text-2xl font-bold ${data.routeId ? 'text-white' : 'text-gray-500'}`}>Select your vehicle</h2>
                    </div>

                    <div className="pl-0 md:pl-11 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                        {vehicles.map((vehicle) => {
                            const isSelected = data.selectedVehicleId === vehicle.id;
                            const priceCalc = data.routeId ? calculatePrice(data.routeId, vehicle.id) : null;
                            const dispPrice = priceCalc ? formatPrice(priceCalc.price, priceCalc.priceUSD) : null;

                            return (
                                <div
                                    key={vehicle.id}
                                    onClick={() => selectVehicle(vehicle.id)}
                                    className={`relative cursor-pointer rounded-2xl p-5 md:p-6 transition-all duration-300 border-2 overflow-hidden group
                                        ${isSelected ? 'bg-gold-primary/5 border-gold-primary shadow-[0_0_30px_rgba(239,191,91,0.2)] scale-[1.02]' : 'bg-[#111] border-white/5 hover:border-gold-primary/50 hover:bg-[#151515]'}
                                    `}
                                >
                                    {/* Enormous Mobile Image */}
                                    <div className="relative w-full h-56 sm:h-48 md:h-40 mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-white/5 to-transparent group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                                        <Image
                                            src={`/images/fleet/${vehicle.name.toLowerCase().includes('gmc') ? 'gmc-yukon-2025.png' : vehicle.name.toLowerCase().includes('hiace') ? 'toyota-hiace-2025.png' : vehicle.name.toLowerCase().includes('camry') ? 'camry-2025.png' : vehicle.name.toLowerCase().includes('staria') ? 'hyundai-staria-2025.png' : vehicle.name.toLowerCase().includes('starex') || vehicle.name.toLowerCase().includes('h1') ? 'hyundai-h1.png' : vehicle.name.toLowerCase().includes('coaster') ? 'toyota-coaster-2025.png' : 'camry-2025.png'}`}
                                            alt={vehicle.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className={`text-lg font-bold ${isSelected ? 'text-gold-primary' : 'text-white'}`}>{vehicle.name}</h3>
                                        {dispPrice && (
                                            <div className="text-right">
                                                <span className="text-sm text-gray-400">Total</span>
                                                <p className="text-lg font-bold text-white">
                                                    {currency === 'USD' ? '$' : ''}{dispPrice.amount}
                                                    {currency === 'SAR' ? ' SAR' : ''}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1"><Users size={14} /> {vehicle.capacity}</span>
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {vehicle.luggage}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {errors.vehicle && <p className="text-red-500 text-sm mt-2 pl-4 md:pl-11">{errors.vehicle}</p>}
                </section>

                {/* 3. TRIP DETAILS */}
                <section ref={detailsSectionRef} className={`transition-all duration-500 ${!data.selectedVehicleId ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${data.selectedVehicleId ? 'bg-gold-primary text-black' : 'bg-white/10 text-gray-500'}`}>3</div>
                        <h2 className={`text-xl md:text-2xl font-bold ${data.selectedVehicleId ? 'text-white' : 'text-gray-500'}`}>Trip Details</h2>
                    </div>

                    <div className="pl-0 md:pl-11 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Date & Time */}
                        <div className="relative">
                            <Calendar className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <input
                                type="date"
                                value={data.date}
                                min={new Date().toISOString().split('T')[0]}
                                onChange={(e) => updateData({ date: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors 
                                    ${errors.date ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}
                                    [color-scheme:dark]`}
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1 absolute">{errors.date}</p>}
                        </div>
                        
                        <div className="relative">
                            <Clock className="absolute left-0 top-4 text-gold-primary" size={20} />
                            <input
                                type="time"
                                value={data.time}
                                onChange={(e) => updateData({ time: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors 
                                    ${errors.time ? 'border-red-500' : 'border-white/20 focus:border-gold-primary'}
                                    [color-scheme:dark]`}
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-1 absolute">{errors.time}</p>}
                        </div>

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

                        {/* Flight Number */}
                        {data.pickup?.toLowerCase().includes('airport') && (
                            <div className="relative md:col-span-2 lg:col-span-1">
                                <Plane className="absolute left-0 top-4 text-gold-primary" size={20} />
                                <input
                                    type="text"
                                    placeholder="Flight Number (Optional)"
                                    value={data.flightNumber}
                                    onChange={(e) => updateData({ flightNumber: e.target.value })}
                                    className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-gold-primary text-white outline-none transition-colors placeholder-gray-600"
                                />
                            </div>
                        )}

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
                                placeholder="Email Address (Optional)"
                                value={data.email}
                                onChange={(e) => updateData({ email: e.target.value })}
                                className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-gold-primary text-white outline-none transition-colors placeholder-gray-600"
                            />
                        </div>
                    </div>

                    {/* Desktop Submit Button */}
                    <div className="pl-0 md:pl-11 mt-12 hidden md:block">
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-12 py-4 bg-gold-primary hover:bg-white text-black font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(239,191,91,0.2)]"
                        >
                            {isSubmitting ? 'Processing...' : `Confirm Booking - ${currency === 'USD' ? '$' : ''}${summaryDisplayPrice.amount}${currency === 'SAR' ? ' SAR' : ''}`}
                        </button>
                    </div>
                </section>
            </div>

            {/* Mobile Sticky Summary */}
            <MobileStickySummary 
                isVisible={!!data.selectedVehicleId && activeSection === 'details'}
                vehicleName={selectedVehicle?.name || null}
                totalAmount={summaryDisplayPrice.amount}
                currency={currency}
                onConfirm={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
