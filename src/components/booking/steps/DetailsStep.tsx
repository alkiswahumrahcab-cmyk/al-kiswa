'use client';

import React, { useState } from 'react';
import {
    User, Mail, Phone, MessageSquare, ChevronLeft, ArrowRight,
    ShieldCheck, Loader2, CheckCircle, Wallet, ChevronDown, MapPin, Calendar, Clock, Car, Printer, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePricing } from '@/context/PricingContext';
import { useSettings } from '@/context/SettingsContext';
import Link from 'next/link';

interface DetailsStepProps {
    data: any;
    updateData: (data: any) => void;
    onBack: () => void;
}

// Common country codes for Umrah travellers
const COUNTRY_CODES = [
    { flag: '🇸🇦', code: '+966', label: 'Saudi Arabia' },
    { flag: '🇵🇰', code: '+92', label: 'Pakistan' },
    { flag: '🇮🇳', code: '+91', label: 'India' },
    { flag: '🇧🇩', code: '+880', label: 'Bangladesh' },
    { flag: '🇬🇧', code: '+44', label: 'UK' },
    { flag: '🇺🇸', code: '+1', label: 'USA' },
    { flag: '🇹🇷', code: '+90', label: 'Turkey' },
    { flag: '🇮🇩', code: '+62', label: 'Indonesia' },
    { flag: '🇲🇾', code: '+60', label: 'Malaysia' },
    { flag: '🇪🇬', code: '+20', label: 'Egypt' },
];

export default function DetailsStep({ data, updateData, onBack }: DetailsStepProps) {
    const { vehicles, calculatePrice } = usePricing();
    const { settings } = useSettings();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState<any>(null);
    const [showSummary, setShowSummary] = useState(false);
    const [showCountryPicker, setShowCountryPicker] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);

    // Pricing calculations
    const selectedList = (data.selectedVehicles || []).map((item: any) => {
        const v = vehicles.find(v => v.id === item.id);
        const pricing = v && data.routeId && data.routeId !== 'custom'
            ? calculatePrice(data.routeId, v.id)
            : null;
        return {
            ...item,
            vehicle: v,
            pricePerUnit: pricing ? pricing.price : 0,
            total: pricing ? pricing.price * item.count : 0
        };
    });

    const grandTotal = selectedList.reduce((acc: number, curr: any) => acc + curr.total, 0);
    const vehicleNames = selectedList.map((item: any) => `${item.vehicle?.name || 'Unknown'} (x${item.count})`).join(', ');

    const clearError = (field: string) => setErrors(p => ({ ...p, [field]: '' }));

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!data.name.trim()) newErrors.name = 'Full name is required';
        if (!data.email.trim() || !data.email.includes('@')) newErrors.email = 'Valid email is required';
        if (!data.phone.trim()) newErrors.phone = 'WhatsApp number is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;
        setIsSubmitting(true);
        setErrors({}); // Clear any previous submission errors

        const fullPhone = `${selectedCountry.code}${data.phone.replace(/^\+?\d{1,4}/, '')}`;
        
        // Robust time formatting (HH:MM) to satisfy strict backend regex
        const timeStr = data.time ? 
            `${String(data.time.getHours()).padStart(2, '0')}:${String(data.time.getMinutes()).padStart(2, '0')}` : 
            '12:00';

        const payload = {
            name: data.name,
            email: data.email,
            phone: fullPhone,
            pickup: data.pickup,
            dropoff: data.dropoff,
            date: data.date?.toISOString().split('T')[0],
            time: timeStr,
            vehicle: vehicleNames,
            passengers: Number(data.passengers || 1), // Explicitly cast to Number
            luggage: Number(data.luggage || 0), // Explicitly cast to Number
            notes: data.notes || '',
            routeId: data.routeId || '',
            selectedVehicles: (data.selectedVehicles || []).map((item: any) => ({
                vehicleId: item.id,
                quantity: Number(item.count), // Explicitly cast to Number
            })),
            vehicleCount: Number(selectedList.reduce((acc: number, i: any) => acc + i.count, 0)),
            status: 'pending',
        };

        console.log('[Booking] Submitting payload:', payload);

        try {
            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                console.log('[Booking] Success:', result);
                setConfirmedBooking(result.booking);
                setIsSuccess(true);
            } else {
                console.error('[Booking] Server returned error:', result);
                setErrors({ 
                    submit: result.message || 'Something went wrong. Please try again or contact us via WhatsApp.' 
                });
            }
        } catch (err) {
            console.error('[Booking] Fetch failed:', err);
            setErrors({ submit: 'Connection error. Please check your internet and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-12">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 bg-gold-primary/10 text-gold-primary rounded-full flex items-center justify-center mx-auto mb-6 border border-gold-primary/20"
                >
                    <CheckCircle size={44} strokeWidth={1.5} />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-3">Booking Confirmed!</h2>
                <p className="text-gray-400 max-w-md mx-auto text-base font-light leading-relaxed mb-8">
                    A confirmation email has been sent to <span className="text-gold-primary font-medium">{data.email}</span>. Please check your inbox for trip details.
                </p>

                <div className="flex flex-col gap-4 max-w-sm mx-auto mb-10">
                    <button
                        onClick={() => {
                            import('@/lib/pdf-generator').then(({ generateBookingInvoice }) => {
                                generateBookingInvoice({
                                    id: confirmedBooking?.id || Date.now().toString().slice(-6),
                                    date: data.date || new Date(),
                                    time: data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                    pickup: data.pickup,
                                    dropoff: data.dropoff,
                                    vehicle: vehicleNames,
                                    vehicleCount: Number(selectedList.reduce((acc: number, item: any) => acc + item.count, 0)),
                                    totalPrice: grandTotal,
                                    customerName: data.name,
                                    customerPhone: data.phone,
                                    customerEmail: data.email,
                                    status: 'CONFIRMED'
                                });
                            });
                        }}
                        className="w-full flex items-center justify-center gap-3 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-black font-bold uppercase tracking-widest rounded-2xl transition-all group"
                    >
                        <Printer size={20} className="group-hover:scale-110 transition-transform" />
                        Download & Print Invoice
                    </button>
                    
                    <a 
                        href={settings?.contact?.social?.googleReview || "https://search.google.com/local/writereview?placeid=ChIJXfUsKyePLR0RMvuRN4CEPWY"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-3 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl transition-all"
                    >
                        <ExternalLink size={20} className="text-[#D4AF37]" />
                        <span>Share Review on Google</span>
                    </a>
                    
                    <p className="text-[11px] text-gray-500 font-medium">Your receipt is ready to download. May your journey be blessed.</p>
                </div>

                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-lg shadow-gold-primary/20 text-center"
                    >
                        Back to Home
                    </Link>
                    <button onClick={() => window.location.reload()} className="text-gold-primary font-bold uppercase tracking-widest hover:text-white transition-colors text-sm py-2">
                        Book Another Trip
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-4">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Final Details</h2>
                    <p className="text-gray-400 mt-1 text-sm">Secure your reservation in seconds.</p>
                </div>
                <button
                    onClick={onBack}
                    className="flex items-center gap-1.5 text-gray-400 hover:text-white font-medium transition-colors text-sm p-2 min-h-[44px]"
                >
                    <ChevronLeft size={18} /> Back
                </button>
            </div>

            {/* ── Uber-style Summary Drawer (mobile first) ── */}
            <div className="md:hidden">
                <button
                    onClick={() => setShowSummary(v => !v)}
                    className="w-full flex items-center justify-between bg-gold-primary/10 border border-gold-primary/30 rounded-2xl px-4 py-3.5 transition-all"
                >
                    <div className="flex items-center gap-3">
                        <Car size={18} className="text-gold-primary" />
                        <div className="text-left">
                            <p className="text-xs font-bold text-gold-primary uppercase tracking-widest">Trip Summary</p>
                            <p className="text-white font-bold text-sm">
                                {selectedList.length > 0
                                    ? selectedList.map((i: any) => `${i.vehicle?.name} ×${i.count}`).join(', ')
                                    : 'No vehicle selected'}
                                {grandTotal > 0 && <span className="ml-2 text-gold-primary">· {grandTotal} SAR</span>}
                            </p>
                        </div>
                    </div>
                    <motion.div animate={{ rotate: showSummary ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown size={18} className="text-gold-primary" />
                    </motion.div>
                </button>

                <AnimatePresence>
                    {showSummary && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            className="overflow-hidden"
                        >
                            <div className="mt-2 bg-white rounded-2xl overflow-hidden shadow-xl">
                                {/* Summary header */}
                                <div className="bg-gold-primary p-4 text-black">
                                    <h3 className="text-xs font-black uppercase tracking-widest">Trip Itinerary</h3>
                                    <div className="mt-2 space-y-1">
                                        {selectedList.map((item: any) => (
                                            <div key={item.id} className="flex justify-between text-sm font-bold border-b border-black/10 pb-1 last:border-0 last:pb-0">
                                                <span>{item.vehicle?.name} <span className="font-normal opacity-70">×{item.count}</span></span>
                                                <span>SAR {item.total}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 space-y-4 text-gray-900">
                                    {/* Route */}
                                    <div className="flex gap-3">
                                        <div className="flex flex-col items-center pt-1">
                                            <div className="w-2.5 h-2.5 rounded-full bg-black" />
                                            <div className="w-px h-10 bg-gray-300 border-l border-dashed border-gray-400 my-1" />
                                            <div className="w-2.5 h-2.5 rounded-full border-2 border-black bg-white" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                                                <p className="font-bold text-sm">{data.pickup || '—'}</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                                <p className="font-bold text-sm">{data.dropoff || '—'}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                                            <p className="font-bold">{data.date?.toLocaleDateString() || '—'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Time</p>
                                            <p className="font-bold">{data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '—'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-1 border-t border-gray-100">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Estimate</p>
                                        <p className="text-2xl font-black">
                                            {grandTotal > 0 ? grandTotal : '—'} <span className="text-xs font-bold text-amber-600">SAR</span>
                                        </p>
                                    </div>

                                    {/* Payment */}
                                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl p-3">
                                        <Wallet size={16} className="text-amber-600 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Payment</p>
                                            <p className="text-xs font-bold text-black">Pay Cash to Driver (After Trip)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop: Side-by-side layout */}
            <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Form fields — LEFT */}
                <div className="space-y-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                                value={data.name}
                                onChange={(e) => { updateData({ name: e.target.value }); clearError('name'); }}
                                className={`w-full pl-11 pr-4 py-4 bg-white/5 border rounded-2xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] text-white placeholder-gray-500 font-medium ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                            />
                        </div>
                        {errors.name && <p className="text-xs text-red-400 font-semibold ml-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={data.email}
                                onChange={(e) => { updateData({ email: e.target.value }); clearError('email'); }}
                                className={`w-full pl-11 pr-4 py-4 bg-white/5 border rounded-2xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)] text-white placeholder-gray-500 font-medium ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                            />
                        </div>
                        {errors.email && <p className="text-xs text-red-400 font-semibold ml-1">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Phone Number</label>
                        <div className={`flex items-center bg-white/5 border rounded-2xl overflow-hidden transition-all focus-within:border-gold-primary focus-within:bg-white/10 focus-within:shadow-[0_0_20px_rgba(212,175,55,0.1)] ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setShowCountryPicker(v => !v)}
                                    className="flex items-center gap-1.5 px-3 py-4 border-r border-white/10 text-sm font-bold text-white whitespace-nowrap hover:bg-white/5 transition-colors min-h-[52px]"
                                >
                                    <span>{selectedCountry.flag}</span>
                                    <span className="text-gray-300 text-xs">{selectedCountry.code}</span>
                                    <ChevronDown size={12} className="text-gray-500" />
                                </button>
                                <AnimatePresence>
                                    {showCountryPicker && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            className="absolute top-full left-0 mt-1 z-50 bg-[#0d0d0d] border border-white/15 rounded-xl shadow-2xl min-w-[200px] max-h-64 overflow-y-auto"
                                        >
                                            {COUNTRY_CODES.map((c) => (
                                                <button
                                                    key={c.code}
                                                    onClick={() => { setSelectedCountry(c); setShowCountryPicker(false); }}
                                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0"
                                                >
                                                    <span className="text-lg">{c.flag}</span>
                                                    <span className="text-sm text-white font-medium">{c.label}</span>
                                                    <span className="text-xs text-gray-500 ml-auto">{c.code}</span>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <input
                                type="tel"
                                placeholder="5xx xxx xxxx"
                                value={data.phone}
                                onChange={(e) => { updateData({ phone: e.target.value }); clearError('phone'); }}
                                className="flex-1 px-3 py-4 bg-transparent outline-none text-white placeholder-gray-500 font-medium"
                            />
                        </div>
                        {errors.phone && <p className="text-xs text-red-400 font-semibold ml-1">{errors.phone}</p>}
                    </div>

                    {/* Notes */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Additional Notes (Optional)</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-4 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <MessageSquare size={18} />
                            </div>
                            <textarea
                                placeholder="Flight number, special requests..."
                                value={data.notes}
                                onChange={(e) => updateData({ notes: e.target.value })}
                                className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 text-white placeholder-gray-500 font-medium min-h-[100px] resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Summary Card — RIGHT (desktop only) */}
                <div className="space-y-5">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                        <div className="bg-gold-primary p-5 text-black relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-multiply" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] relative z-10">Trip Itinerary</h3>
                            <div className="mt-2 space-y-1.5 relative z-10">
                                {selectedList.map((item: any) => (
                                    <div key={item.id} className="flex justify-between text-sm font-bold border-b border-black/10 pb-1 last:border-0 last:pb-0">
                                        <span>{item.vehicle?.name} <span className="font-normal opacity-70">×{item.count}</span></span>
                                        <span>SAR {item.total}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 space-y-6 text-gray-900">
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-black" />
                                    <div className="w-0.5 h-12 bg-gray-200 border-l border-dashed border-gray-400 my-1" />
                                    <div className="w-3 h-3 rounded-full border-2 border-black bg-white" />
                                </div>
                                <div className="flex-1 space-y-5">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                                        <p className="font-bold text-sm">{data.pickup || '—'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                        <p className="font-bold text-sm">{data.dropoff || '—'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-px bg-gray-100" />
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                                    <p className="font-bold text-sm">{data.date?.toLocaleDateString() || '—'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Time</p>
                                    <p className="font-bold text-sm">{data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '—'}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Estimate</p>
                                <p className="text-3xl font-black">{grandTotal > 0 ? grandTotal : '—'} <span className="text-xs font-bold text-amber-600">SAR</span></p>
                            </div>
                        </div>
                        <div className="bg-gray-50 border-t border-gray-100 p-4 relative">
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary-black rounded-full" />
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-black rounded-full" />
                            <div className="flex items-center gap-3 text-gray-700 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                                <Wallet size={18} className="text-gold-primary" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Payment Method</p>
                                    <p className="text-sm font-bold text-black">Pay Cash to Driver (After Trip)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-gold-primary/20 to-gold-primary/5 rounded-2xl border border-gold-primary/30 flex items-start gap-3">
                        <ShieldCheck className="text-gold-primary shrink-0 mt-0.5" size={20} />
                        <div>
                            <h4 className="text-white font-bold text-sm mb-1">Book Now, Pay Later</h4>
                            <p className="text-xs text-gray-300 font-medium leading-relaxed">
                                No credit card needed. Confirmed instantly, pay the driver on arrival.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:hidden space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Full Name</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                            <User size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Enter Your Full Name"
                            value={data.name}
                            onChange={(e) => { updateData({ name: e.target.value }); clearError('name'); }}
                            className={`w-full pl-10 pr-4 py-3.5 bg-white/5 border rounded-xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 text-white placeholder-gray-500 text-sm min-h-[52px] ${errors.name ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                    </div>
                    {errors.name && <p className="text-xs text-red-400 font-semibold ml-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                            <Mail size={16} />
                        </div>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            value={data.email}
                            onChange={(e) => { updateData({ email: e.target.value }); clearError('email'); }}
                            className={`w-full pl-10 pr-4 py-3.5 bg-white/5 border rounded-xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 text-white placeholder-gray-500 text-sm min-h-[52px] ${errors.email ? 'border-red-500/50' : 'border-white/10'}`}
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-400 font-semibold ml-1">{errors.email}</p>}
                </div>

                {/* Phone Number - Mobile */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Phone Number</label>
                    <div className={`flex items-center bg-white/5 border rounded-xl overflow-visible transition-all focus-within:border-gold-primary relative ${errors.phone ? 'border-red-500/50' : 'border-white/10'}`}>
                        <div className="relative z-10">
                            <button
                                type="button"
                                onClick={() => setShowCountryPicker(v => !v)}
                                className="flex items-center gap-1 px-3 py-3.5 border-r border-white/10 text-sm font-bold text-white whitespace-nowrap hover:bg-white/5 transition-colors min-h-[52px]"
                            >
                                <span>{selectedCountry.flag}</span>
                                <span className="text-gray-300 text-xs">{selectedCountry.code}</span>
                                <ChevronDown size={11} className="text-gray-500" />
                            </button>
                            <AnimatePresence>
                                {showCountryPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        className="absolute top-full left-0 mt-1 z-50 bg-[#0d0d0d] border border-white/15 rounded-xl shadow-2xl min-w-[200px] max-h-52 overflow-y-auto"
                                    >
                                        {COUNTRY_CODES.map((c) => (
                                            <button
                                                key={c.code}
                                                onClick={() => { setSelectedCountry(c); setShowCountryPicker(false); }}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 text-left transition-colors border-b border-white/5 last:border-0 min-h-[48px]"
                                            >
                                                <span className="text-base">{c.flag}</span>
                                                <span className="text-sm text-white font-medium">{c.label}</span>
                                                <span className="text-xs text-gray-500 ml-auto font-mono">{c.code}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <input
                            type="tel"
                            inputMode="tel"
                            placeholder="5xx xxx xxxx"
                            value={data.phone}
                            onChange={(e) => { updateData({ phone: e.target.value }); clearError('phone'); }}
                            className="flex-1 px-3 py-3.5 bg-transparent outline-none text-white placeholder-gray-500 text-sm"
                        />
                    </div>
                    {errors.phone && <p className="text-xs text-red-400 font-semibold ml-1">{errors.phone}</p>}
                </div>

                {/* Notes (compact on mobile) */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Notes (Optional)</label>
                    <textarea
                        placeholder="Flight number, special requests..."
                        value={data.notes}
                        onChange={(e) => updateData({ notes: e.target.value })}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl outline-none transition-all focus:border-gold-primary focus:bg-white/10 text-white placeholder-gray-500 text-sm min-h-[80px] resize-none"
                    />
                </div>

                {/* Pay Later trust badge — mobile */}
                <div className="p-4 bg-gradient-to-br from-gold-primary/15 to-gold-primary/5 rounded-2xl border border-gold-primary/30 flex items-start gap-3">
                    <ShieldCheck className="text-gold-primary shrink-0 mt-0.5" size={18} />
                    <div>
                        <h4 className="text-white font-bold text-sm">Book Now, Pay Later</h4>
                        <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">No credit card needed. Pay driver cash on arrival.</p>
                    </div>
                </div>
            </div>

            {/* ── CTA ── */}
            <div className="pt-2">
                {errors.submit && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-400 text-sm font-bold flex items-center gap-3"
                    >
                        <ShieldCheck className="shrink-0 rotate-180" size={20} />
                        <p>{errors.submit}</p>
                    </motion.div>
                )}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 md:py-5 bg-gradient-to-r from-gold-primary via-[#F3D383] to-gold-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_-5px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] text-sm md:text-base"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={22} />
                    ) : (
                        <>
                            <Mail size={20} className="group-hover:scale-110 transition-transform" />
                            Confirm Booking
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
