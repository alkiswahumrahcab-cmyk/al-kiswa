'use client';

import React, { useState } from 'react';
import {
    User, Mail, Phone, MessageSquare, ChevronLeft, ArrowRight,
    ShieldCheck, Loader2, CheckCircle, Wallet, ChevronDown, MapPin, Calendar, Clock, Car
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

        const fullPhone = `${selectedCountry.code}${data.phone.replace(/^\+?\d{1,4}/, '')}`;

        const message = `📋 *New Booking Request*
------------------
👤 *Name:* ${data.name}
📱 *Phone:* ${fullPhone}
📍 *Pickup:* ${data.pickup || 'Not selected'}
🏁 *Dropoff:* ${data.dropoff || 'Not selected'}
📅 *Date:* ${data.date?.toLocaleDateString()}
⏰ *Time:* ${data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
🚗 *Vehicles:* 
${selectedList.map((item: any) => `   - ${item.vehicle?.name} (x${item.count})`).join('\n')}
💰 *Total:* ${grandTotal} SAR
${data.notes ? `📝 *Notes:* ${data.notes}` : ''}
------------------
*Sent via Al Kiswah Website*`;

        const whatsappNumber = settings?.contact?.whatsapp?.replace(/\D/g, '') || '966545494921';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        try {
            fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    phone: fullPhone,
                    date: data.date?.toISOString().split('T')[0],
                    time: data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                    vehicle: vehicleNames,
                    vehicleCount: selectedList.length,
                    totalPrice: grandTotal,
                    status: 'whatsapp_pending'
                })
            }).catch(err => console.error('DB Save failed:', err));

            await new Promise(resolve => setTimeout(resolve, 800));
            window.open(whatsappUrl, '_blank');
            setIsSuccess(true);
        } catch {
            window.open(whatsappUrl, '_blank');
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
                <h2 className="text-3xl font-bold text-white mb-3">Request Received!</h2>
                <p className="text-gray-400 max-w-md mx-auto text-base font-light leading-relaxed mb-8">
                    Our team will contact you via WhatsApp shortly to confirm your booking.
                </p>

                <button
                    onClick={() => {
                        import('@/lib/pdf-generator').then(({ generateBookingInvoice }) => {
                            generateBookingInvoice({
                                id: Date.now().toString().slice(-6),
                                date: data.date || new Date(),
                                time: data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                                pickup: data.pickup,
                                dropoff: data.dropoff,
                                vehicle: vehicleNames,
                                vehicleCount: selectedList.reduce((acc: number, item: any) => acc + item.count, 0),
                                totalPrice: grandTotal,
                                customerName: data.name,
                                customerPhone: data.phone,
                                customerEmail: data.email,
                                status: 'PENDING'
                            });
                        });
                    }}
                    className="flex items-center justify-center gap-2 mx-auto mb-8 text-gold-primary hover:text-white transition-colors border-b border-gold-primary/30 pb-0.5 hover:border-white"
                >
                    <span className="text-sm font-bold uppercase tracking-widest">Download Receipt</span>
                </button>

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

                    {/* Phone with Country Code */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">WhatsApp / Phone</label>
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

            {/* ── Mobile Form Fields ── */}
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

                {/* Phone with Country Code */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">WhatsApp / Phone</label>
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
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-4 md:py-5 bg-gradient-to-r from-gold-primary via-[#F3D383] to-gold-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_30px_-5px_rgba(212,175,55,0.5)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed min-h-[56px] text-sm md:text-base"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={22} />
                    ) : (
                        <>
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            Confirm on WhatsApp
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
