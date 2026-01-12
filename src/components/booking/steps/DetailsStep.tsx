'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, ChevronLeft, ArrowRight, ShieldCheck, MapPin, Calendar, Car, Loader2, CheckCircle, Wallet } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import Link from 'next/link';

interface DetailsStepProps {
    data: any;
    updateData: (data: any) => void;
    onBack: () => void;
}

export default function DetailsStep({ data, updateData, onBack }: DetailsStepProps) {
    const { vehicles, calculatePrice } = usePricing();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Calculate Pricing for Summary
    const vehicle = vehicles.find(v => v.id === data.selectedVehicle);
    const pricing = data.routeId && data.routeId !== 'custom' && data.selectedVehicle
        ? calculatePrice(data.routeId, data.selectedVehicle)
        : null;

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
        try {
            const payload = {
                ...data,
                date: data.date?.toISOString().split('T')[0],
                time: data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                vehicle: vehicle?.name || 'Any',
                totalPrice: pricing ? pricing.price * data.vehicleCount : 0
            };

            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setIsSuccess(true);
            } else {
                alert('Submission failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="text-center py-16">
                <div className="w-24 h-24 bg-gold-primary/10 text-gold-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce border border-gold-primary/20">
                    <CheckCircle size={56} strokeWidth={1.5} />
                </div>
                <h2 className="text-4xl font-sans font-bold text-white mb-4">Request Received!</h2>
                <p className="text-gray-400 max-w-md mx-auto text-lg font-light leading-relaxed">
                    We've received your booking details. Our concierge team will contact you via WhatsApp shortly to confirm availability.
                </p>
                <div className="mt-12 flex flex-col gap-4 max-w-xs mx-auto">
                    <Link href="/" className="px-8 py-4 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-bold uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-lg shadow-gold-primary/20">
                        Back to Home
                    </Link>
                    <button onClick={() => window.location.reload()} className="text-gold-primary font-bold uppercase tracking-widest hover:text-white transition-colors text-sm">
                        Book Another Trip
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-sans font-bold text-white">Final Details</h2>
                    <p className="text-gray-400 mt-2 font-light">Secure your reservation in seconds.</p>
                </div>
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-white flex items-center gap-2 font-medium transition-colors"
                >
                    <ChevronLeft size={18} />
                    Back
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Column: Form */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <User size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Your Full Name"
                                value={data.name}
                                onChange={(e) => updateData({ name: e.target.value })}
                                className={`
                                    w-full pl-12 pr-4 py-4 bg-black/20 
                                    border border-white/10 
                                    rounded-2xl outline-none transition-all
                                    focus:border-gold-primary/50 focus:bg-black/40 focus:shadow-[0_0_15px_-3px_rgba(212,175,55,0.15)]
                                    text-white placeholder-gray-600
                                    ${errors.name ? 'border-red-500/50' : ''}
                                `}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <Mail size={20} />
                            </div>
                            <input
                                type="email"
                                placeholder="email@example.com"
                                value={data.email}
                                onChange={(e) => updateData({ email: e.target.value })}
                                className={`
                                    w-full pl-12 pr-4 py-4 bg-black/20 
                                    border border-white/10 
                                    rounded-2xl outline-none transition-all
                                    focus:border-gold-primary/50 focus:bg-black/40
                                    text-white placeholder-gray-600
                                    ${errors.email ? 'border-red-500/50' : ''}
                                `}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">WhatsApp / Phone</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <Phone size={20} />
                            </div>
                            <input
                                type="tel"
                                placeholder="+966 5..."
                                value={data.phone}
                                onChange={(e) => updateData({ phone: e.target.value })}
                                className={`
                                    w-full pl-12 pr-4 py-4 bg-black/20 
                                    border border-white/10 
                                    rounded-2xl outline-none transition-all
                                    focus:border-gold-primary/50 focus:bg-black/40
                                    text-white placeholder-gray-600
                                    ${errors.phone ? 'border-red-500/50' : ''}
                                `}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gold-primary uppercase tracking-widest ml-1">Additional Notes (Optional)</label>
                        <div className="relative group">
                            <div className="absolute left-4 top-5 text-gray-500 group-focus-within:text-gold-primary transition-colors">
                                <MessageSquare size={20} />
                            </div>
                            <textarea
                                placeholder="I need 2 child seats, flight SV123 arriving T1..."
                                value={data.notes}
                                onChange={(e) => updateData({ notes: e.target.value })}
                                className="w-full pl-12 pr-4 py-4 bg-black/20 border border-white/10 rounded-2xl outline-none transition-all focus:border-gold-primary/50 focus:bg-black/40 text-white placeholder-gray-600 min-h-[120px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column: Summary Card (Ticket Style) */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl overflow-hidden relative shadow-2xl">
                        {/* Ticket Perforations or Header */}
                        <div className="bg-gold-primary p-6 text-black relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-multiply" />
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] relative z-10">Trip Itinerary</h3>
                            <div className="mt-2 text-2xl font-black relative z-10">{vehicle?.name || 'Standard Vehicle'}</div>
                        </div>

                        <div className="p-8 space-y-8 bg-white text-gray-900">
                            {/* Route Line */}
                            <div className="flex gap-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-3 h-3 rounded-full bg-black" />
                                    <div className="w-0.5 h-12 bg-gray-200 border-l border-dashed border-gray-400 my-1" />
                                    <div className="w-3 h-3 rounded-full border-2 border-black bg-white" />
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pickup</p>
                                        <p className="font-bold text-sm">{data.pickup || 'To be selected'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dropoff</p>
                                        <p className="font-bold text-sm">{data.dropoff || 'To be selected'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-gray-100" />

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Date</p>
                                    <p className="font-bold text-sm">{data.date?.toLocaleDateString() || 'Pending'}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Time</p>
                                    <p className="font-bold text-sm">{data.time?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || 'Pending'}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Estimate</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-3xl font-black text-black">
                                        {pricing ? pricing.price * data.vehicleCount : '---'} <span className="text-xs font-bold text-gold-primary">SAR</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ticket Footer (Cutout effect) */}
                        <div className="bg-gray-50 border-t border-gray-100 p-4 relative">
                            <div className="absolute -top-3 -left-3 w-6 h-6 bg-primary-black rounded-full" />
                            <div className="absolute -top-3 -right-3 w-6 h-6 bg-primary-black rounded-full" />

                            <div className="flex items-center gap-3 text-gray-500">
                                <Wallet size={16} />
                                <p className="text-[10px] font-bold uppercase tracking-wider">Pay Cash or Card to Driver</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-gold-primary/10 rounded-2xl border border-gold-primary/20 flex items-start gap-3">
                        <ShieldCheck className="text-gold-primary shrink-0 mt-0.5" size={18} />
                        <p className="text-xs text-gray-400 font-medium leading-relaxed">
                            <span className="text-white font-bold">Secure Booking:</span> No immediate payment required. Proceed with confidence.
                        </p>
                    </div>
                </div>
            </div>

            <div className="pt-2">
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-bold uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : (
                        <>
                            Confirm Reservation
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
