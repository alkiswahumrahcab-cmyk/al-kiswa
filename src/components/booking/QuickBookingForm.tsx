'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { usePricing } from '@/context/PricingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, Users, Briefcase, MapPin, Calendar, CreditCard, ChevronRight, CheckCircle2, MessageCircle, AlertCircle, Plane, User, Phone, Mail, Building, FileText, Loader2, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function QuickBookingForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { routes, vehicles, calculatePrice, isLoading } = usePricing();
    const { currency, formatPrice } = useCurrency();

    // Stage State
    const [stage, setStage] = useState<'quote' | 'details' | 'submitting' | 'success'>('quote');
    const [bookingRef, setBookingRef] = useState<string>('');

    // Booking Params
    const [pickup, setPickup] = useState(searchParams?.get('from') || searchParams?.get('pickup') || 'Jeddah Airport');
    const [dropoff, setDropoff] = useState(searchParams?.get('to') || searchParams?.get('dropoff') || 'Makkah Hotel');
    const [date, setDate] = useState(searchParams?.get('date') || '');
    const [passengers, setPassengers] = useState(parseInt(searchParams?.get('passengers') || '2', 10));
    const luggageParam = searchParams?.get('luggage');

    // Form Data
    const [formData, setFormData] = useState({
        name: '',
        whatsapp: '',
        email: '',
        flightNumber: '',
        hotelName: '',
        bags: luggageParam ? luggageParam : '2',
        notes: ''
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [submitError, setSubmitError] = useState<string>('');

    // Derived State
    const route = routes.find(r => 
        r.name.toLowerCase().includes(pickup.toLowerCase().replace(' (jed)', '').replace(' (med)', '')) && 
        r.name.toLowerCase().includes(dropoff.toLowerCase().replace(' (jed)', '').replace(' (med)', ''))
    );

    let vehicleId = 'staria';
    if (passengers > 7 && passengers <= 11) vehicleId = 'hiace';
    else if (passengers > 11) vehicleId = 'coaster';

    const vehicle = vehicles.find(v => v.id === vehicleId);

    const priceCalc = route && vehicle ? calculatePrice(route.id, vehicle.id) : null;
    const finalPrice = priceCalc ? formatPrice(priceCalc.price, priceCalc.priceUSD) : null;

    const isAirportPickup = pickup.toLowerCase().includes('airport');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (formErrors[e.target.name]) {
            setFormErrors({ ...formErrors, [e.target.name]: '' });
        }
    };

    const handleProceedToDetails = () => {
        if (!route || !vehicle) return; // Cannot proceed without quote
        setStage('details');
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.name.trim()) errors.name = 'Name is required';
        if (!formData.whatsapp.trim()) errors.whatsapp = 'WhatsApp number is required';
        if (isAirportPickup && !formData.flightNumber.trim()) errors.flightNumber = 'Flight number is required for airport pickups';
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !route || !vehicle || !finalPrice) return;

        setStage('submitting');
        setSubmitError('');

        try {
            const payload = {
                serviceType: 'Intercity',
                name: formData.name,
                email: formData.email,
                phone: formData.whatsapp,
                pickup,
                dropoff,
                date,
                passengers,
                flightNumber: formData.flightNumber,
                notes: `Hotel: ${formData.hotelName} | Bags: ${formData.bags} | Notes: ${formData.notes}`,
                legs: [{
                    routeId: route.id,
                    pickup,
                    dropoff,
                    date,
                }],
                selectedVehicles: [{
                    vehicleId: vehicle.id,
                    quantity: 1
                }],
                price: priceCalc?.price,
                priceInSAR: priceCalc?.price,
                priceInSelectedCurrency: finalPrice.amount,
                currency
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Failed to submit booking');

            setBookingRef(result.bookingId || `AK-${Math.floor(1000 + Math.random() * 9000)}`);
            setStage('success');

            // Fire tracking pixel
            if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'Purchase', { currency: currency, value: finalPrice.amount });
            }

        } catch (error: any) {
            console.error('Booking submission error:', error);
            setSubmitError(error.message || 'Something went wrong. Please try again.');
            setStage('details');
        }
    };

    const handleWhatsAppConfirm = () => {
        const text = `Hello Al Kiswah Transport, I have completed my booking.\n\n*Reference:* ${bookingRef}\n*Route:* ${pickup} to ${dropoff}\n*Date:* ${date}\n*Vehicle:* ${vehicle?.name}\n*Price:* ${currency === 'USD' ? '$' : ''}${finalPrice?.amount} ${currency === 'SAR' ? 'SAR' : ''}\n\nPlease confirm.`;
        const waUrl = `https://wa.me/966500000000?text=${encodeURIComponent(text)}`;
        window.open(waUrl, '_blank');
    };

    if (isLoading) {
        return <div className="flex items-center justify-center p-20"><Loader2 className="w-8 h-8 text-gold animate-spin" /></div>;
    }

    if (passengers > 19) {
        return (
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm text-center">
                <Users className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="font-display text-2xl font-semibold text-ink mb-2">Group Booking Required</h2>
                <p className="text-body mb-6">For groups larger than 19 passengers, we provide custom fleet arrangements with multiple vehicles or large buses.</p>
                <button onClick={() => window.open('https://wa.me/966500000000', '_blank')} className="btn btn-primary w-full max-w-sm mx-auto h-12 rounded-btn">
                    Contact via WhatsApp for Group Quote
                </button>
            </div>
        );
    }

    if (!route) {
        return (
            <div className="bg-surface rounded-2xl p-8 border border-border shadow-sm text-center">
                <MapPin className="w-12 h-12 text-gold mx-auto mb-4" />
                <h2 className="font-display text-2xl font-semibold text-ink mb-2">Route Not Found</h2>
                <p className="text-body mb-6">We could not automatically quote the route from {pickup} to {dropoff}. Please request a custom quote.</p>
                <button onClick={() => window.open(`https://wa.me/966500000000?text=${encodeURIComponent(`I need a quote from ${pickup} to ${dropoff} for ${passengers} pax on ${date}.`)}`, '_blank')} className="btn btn-primary bg-gold text-ink font-semibold w-full max-w-sm mx-auto h-12 rounded-btn">
                    Request Custom Quote via WhatsApp
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
                {stage === 'quote' && (
                    <motion.div key="quote" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-surface rounded-2xl border border-border shadow-md overflow-hidden">
                        <div className="p-6 md:p-8">
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">Your Instant Quote</h2>
                            
                            <div className="flex flex-col md:flex-row gap-6 items-start">
                                {/* Route Details */}
                                <div className="flex-1 space-y-4 w-full">
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center shrink-0 border border-border-strong"><MapPin size={16} className="text-gold" /></div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">Route</p>
                                            <p className="text-ink font-medium">{route.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center shrink-0 border border-border-strong"><Calendar size={16} className="text-gold" /></div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">Date</p>
                                            <p className="text-ink font-medium">{date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Not selected'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center shrink-0 border border-border-strong"><Users size={16} className="text-gold" /></div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-0.5">Passengers</p>
                                            <p className="text-ink font-medium">{passengers} Pilgrims</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vehicle & Price Card */}
                                <div className="w-full md:w-80 bg-surface-alt rounded-xl p-5 border border-border flex flex-col items-center text-center">
                                    {vehicle?.image && (
                                        <div className="relative w-full h-32 mb-3">
                                            <Image src={vehicle.image} alt={vehicle.name} fill className="object-contain" />
                                        </div>
                                    )}
                                    <div className="flex flex-col items-center">
                                        {vehicle?.tier && (
                                            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1" style={{ backgroundColor: '#E2A336', color: '#1A1A1A' }}>
                                                {vehicle.tier}
                                            </span>
                                        )}
                                        <h3 className="font-display font-bold text-ink text-2xl leading-tight">
                                            {vehicle?.category || vehicle?.name}
                                        </h3>
                                        {vehicle?.modelName && (
                                            <p className="font-body text-[11px] text-muted mt-0.5 opacity-80 leading-none">
                                                {vehicle.modelName}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-3 text-sm text-muted mt-1 mb-4">
                                        <span className="flex items-center gap-1"><Users size={14} /> {vehicle?.capacity}</span>
                                        <span className="flex items-center gap-1"><Briefcase size={14} /> {vehicle?.luggage}</span>
                                    </div>
                                    <div className="text-3xl font-display font-semibold text-gold-strong mb-1">
                                        {currency === 'USD' ? '$' : ''}{finalPrice?.amount} <span className="text-sm font-body text-muted uppercase font-normal">{currency === 'SAR' ? 'SAR' : ''}</span>
                                    </div>
                                    <p className="text-xs text-success flex items-center gap-1 mb-6 font-medium"><CheckCircle2 size={12} /> Fixed price, no hidden fees</p>
                                    
                                    <button onClick={handleProceedToDetails} className="w-full h-12 bg-gold hover:bg-gold-strong text-ink font-semibold rounded-btn shadow-sm transition-all flex items-center justify-center gap-2">
                                        Continue <ChevronRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage === 'details' && (
                    <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-surface rounded-2xl border border-border shadow-md overflow-hidden">
                        <div className="p-6 md:p-8">
                            <button onClick={() => setStage('quote')} className="text-sm text-muted hover:text-ink font-medium mb-6 flex items-center gap-1">
                                <ChevronRight size={16} className="rotate-180" /> Back to Quote
                            </button>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-6">Passenger Details</h2>
                            
                            {submitError && (
                                <div className="mb-6 p-4 bg-error-soft border border-error text-error rounded-xl flex items-start gap-3">
                                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                                    <p className="text-sm">{submitError}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-5">
                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-ink mb-2">Lead Passenger Name *</label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} className={`w-full h-12 pl-10 pr-4 rounded-md border ${formErrors.name ? 'border-error ring-1 ring-error' : 'border-border-strong'} bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink`} placeholder="Full Name" />
                                        </div>
                                        {formErrors.name && <p className="text-xs text-error mt-1">{formErrors.name}</p>}
                                    </div>

                                    {/* WhatsApp */}
                                    <div>
                                        <label className="block text-sm font-semibold text-ink mb-2">WhatsApp Number *</label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                            <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className={`w-full h-12 pl-10 pr-4 rounded-md border ${formErrors.whatsapp ? 'border-error ring-1 ring-error' : 'border-border-strong'} bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink`} placeholder="+966 5X XXX XXXX" />
                                        </div>
                                        {formErrors.whatsapp && <p className="text-xs text-error mt-1">{formErrors.whatsapp}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-ink mb-2">Email Address (Optional)</label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink" placeholder="your@email.com" />
                                        </div>
                                    </div>

                                    {/* Flight Number */}
                                    {isAirportPickup && (
                                        <div>
                                            <label className="block text-sm font-semibold text-ink mb-2">Flight Number *</label>
                                            <div className="relative">
                                                <Plane size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                                <input type="text" name="flightNumber" value={formData.flightNumber} onChange={handleInputChange} className={`w-full h-12 pl-10 pr-4 rounded-md border ${formErrors.flightNumber ? 'border-error ring-1 ring-error' : 'border-border-strong'} bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink`} placeholder="e.g. SV123" />
                                            </div>
                                            {formErrors.flightNumber && <p className="text-xs text-error mt-1">{formErrors.flightNumber}</p>}
                                            <p className="text-xs text-muted mt-1">So your driver can track early/delayed arrivals.</p>
                                        </div>
                                    )}

                                    {/* Hotel Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-ink mb-2">Hotel Name / Address</label>
                                        <div className="relative">
                                            <Building size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                            <input type="text" name="hotelName" value={formData.hotelName} onChange={handleInputChange} className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink" placeholder="Makkah Clock Royal Tower" />
                                        </div>
                                    </div>

                                    {/* Bags */}
                                    <div>
                                        <label className="block text-sm font-semibold text-ink mb-2">Number of Bags</label>
                                        <div className="relative">
                                            <Briefcase size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                                            <select name="bags" value={formData.bags} onChange={handleInputChange} className="w-full h-12 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink appearance-none">
                                                {[0,1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                                                <option value="11+">11+</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Notes */}
                                <div>
                                    <label className="block text-sm font-semibold text-ink mb-2">Special Requests (Optional)</label>
                                    <div className="relative">
                                        <FileText size={18} className="absolute left-3 top-3 text-muted" />
                                        <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows={3} className="w-full py-3 pl-10 pr-4 rounded-md border border-border-strong bg-surface focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold font-body text-ink resize-none" placeholder="Wheelchair space needed, baby seat required, etc." />
                                    </div>
                                </div>

                                <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex items-center gap-2 text-sm text-ink font-medium">
                                        <CreditCard size={18} className="text-gold" />
                                        Pay {currency === 'USD' ? '$' : ''}{finalPrice?.amount} {currency === 'SAR' ? 'SAR' : ''} cash on arrival
                                    </div>
                                    <button type="submit" className="w-full md:w-auto h-12 px-8 bg-gold hover:bg-gold-strong text-ink font-semibold rounded-btn shadow-sm transition-all flex items-center justify-center gap-2">
                                        Confirm Booking
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}

                {stage === 'submitting' && (
                    <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-surface rounded-2xl border border-border shadow-md overflow-hidden p-12 flex flex-col items-center justify-center text-center h-80">
                        <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
                        <h2 className="font-display text-2xl font-semibold text-ink mb-2">Securing your vehicle...</h2>
                        <p className="text-body text-sm">Please wait while we confirm your route.</p>
                    </motion.div>
                )}

                {stage === 'success' && (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-surface rounded-2xl border border-border shadow-md overflow-hidden">
                        <div className="bg-success-soft p-8 text-center border-b border-border">
                            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-success" />
                            </div>
                            <h2 className="font-display text-3xl font-semibold text-ink mb-2">Booking Received!</h2>
                            <p className="text-ink font-medium">Reference: <span className="text-gold-strong">{bookingRef}</span></p>
                        </div>
                        <div className="p-8 text-center">
                            <p className="text-body mb-6 max-w-md mx-auto">
                                To finalize your booking and connect instantly with our dispatch team, please confirm via WhatsApp.
                            </p>
                            <button onClick={handleWhatsAppConfirm} className="h-14 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-btn shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 w-full max-w-sm mx-auto text-lg mb-4">
                                <MessageCircle size={24} /> Confirm via WhatsApp
                            </button>
                            <p className="text-sm text-muted">You will pay {currency === 'USD' ? '$' : ''}{finalPrice?.amount} {currency === 'SAR' ? 'SAR' : ''} to the driver on arrival.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
