'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin, Calendar, Clock, ChevronDown,
    Search, User, Mail, Phone, Plane, Users, Briefcase, Baby, Loader2, Plus, Trash2, Minus, MessageCircle
} from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import { BADR_DETOUR_SURCHARGE_SAR, DEFAULT_BADR_SURCHARGE_SAR, WADI_JINN_SURCHARGE_SAR, DEFAULT_WADI_JINN_SURCHARGE_SAR } from '@/lib/pricing';
import { ZIYARAH_TOURS, ZIYARAH_PICKUP_NOTE } from '@/lib/ziyarah-config';
import { useCurrency } from '@/context/CurrencyContext';
import { useSettings } from '@/context/SettingsContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MobileStickySummary from './MobileStickySummary';
import MobileDrawer from '@/components/ui/MobileDrawer';
import Receipt from './Receipt';
import BookingSuccessModal from './BookingSuccessModal';
import CurrencyToggle from '../CurrencyToggle';
import NusukBookingAlert from '@/components/trust/NusukBookingAlert';
import { VISA_TYPES, getSortedCountries } from '@/data/countries';
import NationalitySelector from './NationalitySelector';

export default function BookingForm() {
    const { routes, vehicles, isLoading, calculatePrice } = usePricing();
    const { currency, formatPrice } = useCurrency();
    const router = useRouter();

    const [data, setData] = useState({
        serviceType: 'Intercity',
        legs: [{ id: 'initial-leg-1', routeId: '', pickup: '', dropoff: '', date: '', time: '', flightNumber: '', hours: undefined as number | undefined, routeVariant: 'direct' as 'direct' | 'via_badr', includeWadiJinn: false as boolean | undefined }],
        selectedVehicles: [] as { vehicleId: string, quantity: number }[],
        passengers: 1,
        childSeats: false,
        name: '',
        email: '',
        phone: '',
        visaType: '',
        visaOther: '',
        nationality: '',
        notes: '',
        airportTerminal: '',
    });

    const countriesList = getSortedCountries();

    const { settings } = useSettings();

    const isJeddahAirportRoute = data.legs.some(leg => {
        const r = routes.find(rt => rt.id === leg.routeId);
        return r && r.name.toLowerCase().includes('jeddah airport');
    });

    const parkingFee = (isJeddahAirportRoute && data.airportTerminal === 'Hajj Terminal' && settings?.fees?.enableHajjTerminalFee !== false) 
        ? (settings?.fees?.hajjTerminalFeeAmount || 90) 
        : 0;

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [receiptData, setReceiptData] = useState<any>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    // WhatsApp Fallback state
    const [showWhatsAppFallback, setShowWhatsAppFallback] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isLoading) {
            timeout = setTimeout(() => {
                setShowWhatsAppFallback(true);
            }, 8000);
        } else {
            setShowWhatsAppFallback(false);
        }
        return () => clearTimeout(timeout);
    }, [isLoading]);

    // Flow State
    const [activeSection, setActiveSection] = useState<'route' | 'vehicle' | 'details'>('route');
    const vehicleSectionRef = useRef<HTMLDivElement>(null);
    const detailsSectionRef = useRef<HTMLDivElement>(null);

    // Dropdowns for multiple legs
    const [activeDropdownIndex, setActiveDropdownIndex] = useState<number | null>(null);
    const [activeTerminalDropdown, setActiveTerminalDropdown] = useState<number | null>(null);
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
            legs: [...prev.legs, { id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(7), routeId: '', pickup: '', dropoff: '', date: '', time: '', flightNumber: '', hours: undefined, routeVariant: 'direct' as 'direct' | 'via_badr', includeWadiJinn: false as boolean | undefined }]
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
            const target = e.target as Element;
            const isClickInsideDropdown = dropdownRef.current?.contains(target);
            const isClickInsidePortal = target.closest('#mobile-drawer-portal') !== null;
            
            if (!isClickInsideDropdown && !isClickInsidePortal) {
                setActiveDropdownIndex(null);
                setActiveTerminalDropdown(null);
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
            if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout');
            }
            setTimeout(() => {
                detailsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    const getLegPrice = (leg: any, vehicleId: string) => {
        if (!leg.routeId || !vehicleId) return 0;
        const priceCalc = calculatePrice(leg.routeId, vehicleId);
        let base = priceCalc ? priceCalc.price : 0;
        const selectedRoute = routes.find(r => r.id === leg.routeId);
        
        // Add Badr Surcharge if applicable
        const isMadinahToMakkahRoute = selectedRoute?.id === '692db09934f15bc89b45a600' || selectedRoute?.name?.toLowerCase() === 'madinah hotel to makkah hotel' || selectedRoute?.name?.toLowerCase() === 'madinah hotel → makkah hotel' || (selectedRoute?.origin?.toLowerCase() === 'madinah hotel' && selectedRoute?.destination?.toLowerCase() === 'makkah hotel');
        if (leg.routeVariant === 'via_badr' && isMadinahToMakkahRoute) {
            const surcharge = BADR_DETOUR_SURCHARGE_SAR[vehicleId] || DEFAULT_BADR_SURCHARGE_SAR;
            base += surcharge;
        }

        // Add Wadi Jinn Surcharge if applicable
        const isMadinahZiyarat = selectedRoute?.id === '6949b367a41f6410e88ed72e' || selectedRoute?.name?.toLowerCase().includes('madinah ziyarat');
        if (leg.includeWadiJinn && isMadinahZiyarat) {
            const wadiSurcharge = WADI_JINN_SURCHARGE_SAR[vehicleId] || DEFAULT_WADI_JINN_SURCHARGE_SAR;
            base += wadiSurcharge;
        }

        const isHourly = selectedRoute?.name?.toLowerCase().includes('hourly') || selectedRoute?.origin?.toLowerCase().includes('hourly');
        return isHourly && leg.hours ? base * leg.hours : base;
    };

    const getLegPriceUSD = (leg: any, vehicleId: string) => {
        if (!leg.routeId || !vehicleId) return 0;
        const priceCalc = calculatePrice(leg.routeId, vehicleId);
        
        // If there's no explicit USD base price, we return 0.
        // This ensures `formatPrice` safely falls back to dividing the total SAR price (including surcharges) by 3.75.
        if (!priceCalc || typeof priceCalc.priceUSD !== 'number' || priceCalc.priceUSD === 0) {
            return 0;
        }

        let base = priceCalc.priceUSD;
        const selectedRoute = routes.find(r => r.id === leg.routeId);
        
        // Add Badr Surcharge if applicable (converted to USD)
        const isMadinahToMakkahRoute = selectedRoute?.id === '692db09934f15bc89b45a600' || selectedRoute?.name?.toLowerCase() === 'madinah hotel to makkah hotel' || selectedRoute?.name?.toLowerCase() === 'madinah hotel → makkah hotel' || (selectedRoute?.origin?.toLowerCase() === 'madinah hotel' && selectedRoute?.destination?.toLowerCase() === 'makkah hotel');
        if (leg.routeVariant === 'via_badr' && isMadinahToMakkahRoute) {
            const surchargeSAR = BADR_DETOUR_SURCHARGE_SAR[vehicleId] || DEFAULT_BADR_SURCHARGE_SAR;
            base += Math.round(surchargeSAR / 3.75);
        }

        // Add Wadi Jinn Surcharge if applicable (converted to USD)
        const isMadinahZiyarat = selectedRoute?.id === '6949b367a41f6410e88ed72e' || selectedRoute?.name?.toLowerCase().includes('madinah ziyarat');
        if (leg.includeWadiJinn && isMadinahZiyarat) {
            const wadiSurchargeSAR = WADI_JINN_SURCHARGE_SAR[vehicleId] || DEFAULT_WADI_JINN_SURCHARGE_SAR;
            base += Math.round(wadiSurchargeSAR / 3.75);
        }

        const isHourly = selectedRoute?.name?.toLowerCase().includes('hourly') || selectedRoute?.origin?.toLowerCase().includes('hourly');
        return isHourly && leg.hours ? base * leg.hours : base;
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
        
        if (totalSAR > 0 && parkingFee > 0) {
            totalSAR += parkingFee;
            totalUSD += Math.round(parkingFee / 3.75);
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
            if (leg.pickup?.toLowerCase().includes('airport') && !leg.flightNumber?.trim()) { newErrors[`leg_${index}_flight`] = 'Flight number is required for airport pickups'; allLegsValid = false; }
        });

        if (!data.selectedVehicles || data.selectedVehicles.length === 0) {
            newErrors.vehicle = 'Please select at least one vehicle';
        } else {
            let totalCapacity = 0;
            data.selectedVehicles.forEach(v => {
                const vInfo = vehicles.find(vi => vi.id === v.vehicleId);
                if(vInfo) {
                    const capacityMatch = vInfo.capacity.match(/\d+/);
                    const capacityNum = capacityMatch ? parseInt(capacityMatch[0]) : 0;
                    totalCapacity += capacityNum * v.quantity;
                }
            });
            if (data.passengers > totalCapacity) {
                newErrors.vehicle = `You have ${data.passengers} passengers, but selected vehicles only seat ${totalCapacity}. Please add more vehicles.`;
            }
        }
        
        if (isJeddahAirportRoute && !data.airportTerminal) {
            newErrors.airportTerminal = 'Terminal selection is required for Jeddah Airport pickups.';
        }
        if (!data.name) newErrors.name = 'Required';
        if (!data.phone) newErrors.phone = 'Required';
        if (!data.email) newErrors.email = 'Required';

        // Validate new fields if we want them required
        if (!data.visaType) newErrors.visaType = 'Please select a visa type';
        if (data.visaType === 'other' && !data.visaOther) newErrors.visaOther = 'Please specify your visa type';
        if (!data.nationality) newErrors.nationality = 'Please select your nationality';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setGeneralError('Please fix the errors highlighted above before confirming your booking.');
            
            // Wait for React to render the error messages, then scroll to the first one
            setTimeout(() => {
                const firstError = document.querySelector('p.text-red-500, .border-red-500');
                if (firstError) {
                    // Scroll so the error is roughly in the middle of the viewport
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 100);
            
            return;
        }

        setIsSubmitting(true);
        try {
            const priceCalc = getTotalPrice();
            const sarPrice = priceCalc.price;
            const explicitUSD = priceCalc.priceUSD;
            const finalDisplayPrice = formatPrice(sarPrice, explicitUSD);
            
            const selectedVehicleInfo = data.selectedVehicles.length > 0 ? vehicles.find(v => v.id === data.selectedVehicles[0].vehicleId) : null;

            const eventId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

            const payloadLegs = data.legs.map(leg => {
                const selectedRoute = routes.find(r => r.id === leg.routeId);
                const isMadinahToMakkah = selectedRoute?.id === '692db09934f15bc89b45a600' || selectedRoute?.name?.toLowerCase() === 'madinah hotel to makkah hotel' || selectedRoute?.name?.toLowerCase() === 'madinah hotel → makkah hotel' || (selectedRoute?.origin?.toLowerCase() === 'madinah hotel' && selectedRoute?.destination?.toLowerCase() === 'makkah hotel');
                const isMadinahZiyarat = selectedRoute?.id === '6949b367a41f6410e88ed72e' || selectedRoute?.name?.toLowerCase().includes('madinah ziyarat');
                const vehicleId = data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : '';
                return {
                    ...leg,
                    badrSurchargeSAR: (isMadinahToMakkah && leg.routeVariant === 'via_badr') 
                        ? (BADR_DETOUR_SURCHARGE_SAR[vehicleId] || DEFAULT_BADR_SURCHARGE_SAR) 
                        : 0,
                    includeWadiJinn: leg.includeWadiJinn || false,
                    wadiJinnSurchargeSAR: (isMadinahZiyarat && leg.includeWadiJinn) 
                        ? (WADI_JINN_SURCHARGE_SAR[vehicleId] || DEFAULT_WADI_JINN_SURCHARGE_SAR) 
                        : 0
                };
            });

            const bookingPayload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                visaType: data.visaType,
                visaOther: data.visaOther,
                nationality: data.nationality,
                legs: payloadLegs,
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
                airportTerminal: isJeddahAirportRoute ? data.airportTerminal : undefined,
                parkingFee: (isJeddahAirportRoute && parkingFee > 0) ? parkingFee : undefined,
                eventId: eventId,
            };

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookingPayload)
            });

            const result = await response.json();
            if (response.ok && result.success) {
                if (typeof window !== 'undefined' && (window as any).fbq) {
                    (window as any).fbq('track', 'Purchase', {
                        value: Number(sarPrice) || 0,
                        currency: 'SAR',
                        content_name: data.selectedVehicles.map(sv => { const v = vehicles.find(v => v.id === sv.vehicleId); return v ? `${sv.quantity}x ${v.name}` : ''; }).join(', ') || 'Standard Vehicle'
                    }, { eventID: eventId });
                }

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
                    totalAmount: finalDisplayPrice.amount,
                    airportTerminal: isJeddahAirportRoute ? data.airportTerminal : undefined,
                    parkingFee: (isJeddahAirportRoute && parkingFee > 0) ? parkingFee : undefined,
                    flightNumbers: data.legs.filter(l => l.flightNumber).map(l => l.flightNumber).join(', ')
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

    if (showSuccessModal && receiptData) {
        return (
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
                    totalAmount: receiptData.totalAmount
                }}
                onClose={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                }}
                whatsappNumber="966548707332"
            />
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pt-0 pb-16 relative">
            
            {/* Currency Toggle placed at the absolute top right */}
            <div className="absolute top-2 right-4 md:top-[-20px] md:right-4 flex items-center gap-3 bg-[#0B0F19]/90 p-1.5 rounded-full border border-gold/30 backdrop-blur-md z-30 shadow-xl">
                <span className="text-xs font-medium text-[#C9D4E0] pl-4 uppercase tracking-wider">Currency</span>
                <CurrencyToggle />
            </div>

            <div className="mb-10 pt-16 md:pt-0">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Book Your Transfer</h1>
                <p className="text-[#C9D4E0] text-base md:text-lg">Experience premium travel across Saudi Arabia.</p>
            </div>

            <NusukBookingAlert />

            {/* WhatsApp Fallback Banner */}
            <AnimatePresence>
                {showWhatsAppFallback && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-charcoal/40 to-green-900/40 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                <MessageCircle size={24} className="text-gold" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Experiencing connection issues?</h3>
                                <p className="text-gold text-sm">Our live pricing engine is taking longer than expected to load. You can easily book your trip via WhatsApp right now.</p>
                            </div>
                        </div>
                        <a 
                            href={`https://wa.me/966548707332?text=Hello%2C%20I%20would%20like%20to%20book%20a%20taxi%20transfer.%20My%20connection%20is%20slow.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whitespace-nowrap px-6 py-3 bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-[#25D366]/20 flex items-center gap-2"
                        >
                            <MessageCircle size={20} />
                            Book via WhatsApp
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-16">
                
                {/* 1. ROUTE SELECTION */}
                <section className={`transition-opacity duration-500 ${activeSection !== 'route' && data.legs[0].routeId ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold">1</div>
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
                            
                            const getZiyarahTour = (route: any) => {
                                if (!route) return null;
                                const name = route.name?.toLowerCase() || '';
                                if (name.includes('makkah ziyarat')) return ZIYARAH_TOURS.makkah;
                                if (name.includes('madinah ziyarat')) return ZIYARAH_TOURS.madinah;
                                if (name.includes('badr ziyarat')) return ZIYARAH_TOURS.badr;
                                if (name.includes('taif ziyarat')) return ZIYARAH_TOURS.taif;
                                return null;
                            };
                            const ziyarahTour = getZiyarahTour(selectedRoute);

                            const currentLabel = leg.pickup && leg.dropoff
                                ? `${leg.pickup} → ${leg.dropoff}`
                                : 'Search for a route (e.g., Makkah to Madinah)...';

                            return (
                                <div key={`leg-index-${index}`} className="relative mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-gold font-bold">Transfer {index + 1}</h3>
                                        {data.legs.length > 1 && (
                                            <button onClick={() => removeLeg(index)} className="text-gray-500 hover:text-red-500 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Route Dropdown */}
                                        <div className="relative md:col-span-2 group">
                                            <MapPin className="absolute left-0 top-4 text-gold transition-colors z-10" size={20} />
                                            <button
                                                type="button"
                                                onClick={() => setActiveDropdownIndex(activeDropdownIndex === index ? null : index)}
                                                className={`w-full flex items-center justify-between pl-8 pr-4 py-4 bg-transparent border-b-2 text-left outline-none transition-colors ${errors[`leg_${index}_route`] ? 'border-red-500' : 'border-white/20 hover:border-gold focus:border-gold'}`}
                                            >
                                                <span className={`text-base font-medium truncate ${leg.pickup ? 'text-white' : 'text-gray-600'}`}>
                                                    {currentLabel}
                                                </span>
                                                <ChevronDown size={20} className={`text-gray-400 transition-transform ${activeDropdownIndex === index ? 'rotate-180' : ''}`} />
                                            </button>
                                            {errors[`leg_${index}_route`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_route`]}</p>}
                                            
                                            <MobileDrawer 
                                                isOpen={activeDropdownIndex === index} 
                                                onClose={() => setActiveDropdownIndex(null)}
                                                title="Select Route"
                                            >
                                                <div className="p-4 border-b border-white/10 relative sticky top-0 bg-[#0B0F19] z-10">
                                                    <Search size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text" value={searchStr} onChange={(e) => setRouteSearches(prev => ({ ...prev, [index]: e.target.value }))}
                                                        placeholder="Search city or airport..."
                                                        className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-white/10 rounded-none text-base text-white placeholder-gray-500 outline-none focus:border-gold transition-colors"
                                                    />
                                                </div>
                                                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                                                    {filteredRoutes.length > 0 ? filteredRoutes.map((route) => (
                                                        <button
                                                            key={route.id} type="button" onClick={() => selectRoute(index, route)}
                                                            className="w-full px-6 py-4 text-left hover:bg-gold/10 text-gray-300 hover:text-white border-b border-white/5 last:border-0 transition-colors flex flex-col"
                                                        >
                                                            <span className="font-semibold text-lg">{route.origin} <span className="text-gold mx-2">→</span> {route.destination}</span>
                                                            <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{route.category || 'Intercity'}</span>
                                                        </button>
                                                    )) : (
                                                        <div className="p-6 text-center text-gray-500">No routes found matching your search.</div>
                                                    )}
                                                </div>
                                            </MobileDrawer>
                                        </div>

                                        {/* Ziyarah Tour Included Places Panel */}
                                        {ziyarahTour && (
                                            <div className="md:col-span-2 mt-4 bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-lg mb-2">
                                                <div className="p-4 md:p-5 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-[#151515]">
                                                    <div>
                                                        <h4 className="text-white font-bold font-cormorant text-xl md:text-2xl tracking-wide">{ziyarahTour.displayName}</h4>
                                                        <p className="text-gray-400 text-xs mt-1 font-montserrat">Guided ziyarah by private vehicle — your driver waits at each stop.</p>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 bg-gold/10 text-gold border border-gold/30 px-3 py-1.5 rounded-full font-semibold text-sm shrink-0">
                                                        <Clock size={14} />
                                                        <span>{ziyarahTour.durationHours} hours total</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-[#111] p-3 flex items-center gap-3 border-b border-white/5">
                                                    <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                                                        <MapPin size={14} className="text-gold" />
                                                    </div>
                                                    <p className="text-gray-300 text-xs font-medium">{ZIYARAH_PICKUP_NOTE}</p>
                                                </div>

                                                <div className="p-4 md:p-5 bg-[#111]">
                                                    <h5 className="text-gold text-xs uppercase tracking-widest font-bold mb-3 font-montserrat">Included Stops</h5>
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                                        {ziyarahTour.stops.map((stop: any, stopIdx: number) => (
                                                            <div key={stopIdx} className="bg-white/5 border border-white/5 rounded-xl p-3 flex items-start gap-2.5 hover:bg-white/10 hover:border-gold/30 transition-colors">
                                                                <div className="w-5 h-5 rounded-full bg-gold text-black flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                                                                    {stopIdx + 1}
                                                                </div>
                                                                <div>
                                                                    <p className="text-white text-sm font-medium font-montserrat leading-tight">{stop.name}</p>
                                                                    {stop.note && (
                                                                        <p className="text-gray-400 text-[11px] mt-1 leading-snug">{stop.note}</p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <p className="text-gray-500 text-[11px] text-center mt-4 italic">
                                                        Total trip duration: {ziyarahTour.durationHours} hours. Timings are approximate and may vary with traffic and crowd levels.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Badr Detour Selector */}
                                        {(selectedRoute?.id === '692db09934f15bc89b45a600' || selectedRoute?.name?.toLowerCase() === 'madinah hotel to makkah hotel' || selectedRoute?.name?.toLowerCase() === 'madinah hotel → makkah hotel' || (selectedRoute?.origin?.toLowerCase() === 'madinah hotel' && selectedRoute?.destination?.toLowerCase() === 'makkah hotel')) && (
                                            <div className="md:col-span-2 mt-2 bg-[#04162B]/50 border border-gold/30 rounded-xl p-4">
                                                <h4 className="text-white font-bold mb-3 font-cormorant text-xl">Route Variant</h4>
                                                <div className="space-y-4">
                                                    <label className="flex items-start gap-3 cursor-pointer group">
                                                        <div className="relative flex items-center justify-center mt-1">
                                                            <input 
                                                                type="radio" 
                                                                name={`routeVariant_${index}`}
                                                                value="direct"
                                                                checked={leg.routeVariant === 'direct' || !leg.routeVariant}
                                                                onChange={() => updateLeg(index, { routeVariant: 'direct' })}
                                                                className="peer sr-only"
                                                            />
                                                            <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-gold transition-colors"></div>
                                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-gold scale-0 peer-checked:scale-100 transition-transform"></div>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium">Direct Route</p>
                                                            <p className="text-gray-400 text-sm">No extra charge</p>
                                                        </div>
                                                    </label>
                                                    <label className="flex items-start gap-3 cursor-pointer group">
                                                        <div className="relative flex items-center justify-center mt-1">
                                                            <input 
                                                                type="radio" 
                                                                name={`routeVariant_${index}`}
                                                                value="via_badr"
                                                                checked={leg.routeVariant === 'via_badr'}
                                                                onChange={() => updateLeg(index, { routeVariant: 'via_badr' })}
                                                                className="peer sr-only"
                                                            />
                                                            <div className="w-5 h-5 rounded-full border-2 border-gray-400 peer-checked:border-gold transition-colors"></div>
                                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-gold scale-0 peer-checked:scale-100 transition-transform"></div>
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-white font-medium">Via Badr Detour</p>
                                                            <p className="text-gray-400 text-sm mb-1">Includes Jabal al-Malaika / Battle of Badr ziyarat.</p>
                                                            {(() => {
                                                                const activeVehicle = data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : null;
                                                                if (activeVehicle) {
                                                                    const surchargeSAR = BADR_DETOUR_SURCHARGE_SAR[activeVehicle] || DEFAULT_BADR_SURCHARGE_SAR;
                                                                    const disp = formatPrice(surchargeSAR, Math.round(surchargeSAR / 3.75));
                                                                    return <p className="text-gold text-sm font-semibold">+{currency === 'USD' ? '$' : ''}{disp.amount} {currency === 'SAR' ? 'SAR' : ''}</p>;
                                                                }
                                                                return <p className="text-gold text-sm font-semibold">+SAR 150–200 depending on vehicle</p>;
                                                            })()}
                                                        </div>
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        {/* Badr Detour Line Item Breakdown */}
                                        {leg.routeVariant === 'via_badr' && (selectedRoute?.id === '692db09934f15bc89b45a600' || selectedRoute?.name?.toLowerCase() === 'madinah hotel to makkah hotel' || selectedRoute?.name?.toLowerCase() === 'madinah hotel → makkah hotel' || (selectedRoute?.origin?.toLowerCase() === 'madinah hotel' && selectedRoute?.destination?.toLowerCase() === 'makkah hotel')) && (
                                            <div className="md:col-span-2 mt-1 mb-2 px-4 py-3 bg-transparent border border-white/10 rounded-lg flex justify-between items-center text-sm">
                                                <span className="text-gray-300">Badr detour — Jabal al-Malaika ziyarat</span>
                                                <span className="text-gold font-bold">
                                                    {(() => {
                                                        const activeVehicle = data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : null;
                                                        if (activeVehicle) {
                                                            const surchargeSAR = BADR_DETOUR_SURCHARGE_SAR[activeVehicle] || DEFAULT_BADR_SURCHARGE_SAR;
                                                            const disp = formatPrice(surchargeSAR, Math.round(surchargeSAR / 3.75));
                                                            return `+${currency === 'USD' ? '$' : ''}${disp.amount} ${currency === 'SAR' ? 'SAR' : ''}`;
                                                        }
                                                        return '...';
                                                    })()}
                                                </span>
                                            </div>
                                        )}

                                        {/* Wadi Jinn Add-on Selector */}
                                        {(selectedRoute?.id === '6949b367a41f6410e88ed72e' || selectedRoute?.name?.toLowerCase().includes('madinah ziyarat')) && (
                                            <div className="md:col-span-2 mt-2 bg-[#04162B]/50 border border-gold/30 rounded-xl p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="text-white font-bold mb-1 font-cormorant text-xl">Include Wadi Jinn</h4>
                                                        <p className="text-gray-400 text-sm mb-2">Valley of the Jinn — extended ziyarat stop</p>
                                                        {(() => {
                                                            const activeVehicle = data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : null;
                                                            if (activeVehicle) {
                                                                const surchargeSAR = WADI_JINN_SURCHARGE_SAR[activeVehicle] || DEFAULT_WADI_JINN_SURCHARGE_SAR;
                                                                const disp = formatPrice(surchargeSAR, Math.round(surchargeSAR / 3.75));
                                                                return <p className="text-gold text-sm font-semibold">+{currency === 'USD' ? '$' : ''}{disp.amount} {currency === 'SAR' ? 'SAR' : ''}</p>;
                                                            }
                                                            return <p className="text-gold text-sm font-semibold">+SAR 100–250 depending on vehicle</p>;
                                                        })()}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateLeg(index, { includeWadiJinn: !leg.includeWadiJinn })}
                                                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#04162B] ${leg.includeWadiJinn ? 'bg-gold' : 'bg-gray-600'}`}
                                                        role="switch"
                                                        aria-checked={leg.includeWadiJinn}
                                                    >
                                                        <span className="sr-only">Include Wadi Jinn</span>
                                                        <span
                                                            aria-hidden="true"
                                                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${leg.includeWadiJinn ? 'translate-x-5' : 'translate-x-0'}`}
                                                        />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Wadi Jinn Detour Line Item Breakdown */}
                                        {leg.includeWadiJinn && (selectedRoute?.id === '6949b367a41f6410e88ed72e' || selectedRoute?.name?.toLowerCase().includes('madinah ziyarat')) && (
                                            <div className="md:col-span-2 mt-1 mb-2 px-4 py-3 bg-transparent border border-white/10 rounded-lg flex justify-between items-center text-sm">
                                                <span className="text-gray-300">Wadi Jinn — Valley of the Jinn ziyarat</span>
                                                <span className="text-gold font-bold">
                                                    {(() => {
                                                        const activeVehicle = data.selectedVehicles.length > 0 ? data.selectedVehicles[0].vehicleId : null;
                                                        if (activeVehicle) {
                                                            const surchargeSAR = WADI_JINN_SURCHARGE_SAR[activeVehicle] || DEFAULT_WADI_JINN_SURCHARGE_SAR;
                                                            const disp = formatPrice(surchargeSAR, Math.round(surchargeSAR / 3.75));
                                                            return `+${currency === 'USD' ? '$' : ''}${disp.amount} ${currency === 'SAR' ? 'SAR' : ''}`;
                                                        }
                                                        return '...';
                                                    })()}
                                                </span>
                                            </div>
                                        )}

                                        {/* Date */}
                                        <div className="relative">
                                            <Calendar className="absolute left-0 top-4 text-gold transition-colors z-10" size={20} />
                                            <input
                                                type={leg.date ? "date" : "text"}
                                                placeholder={leg.pickup?.toLowerCase().includes('airport') ? 'Landing Date *' : 'Pickup Date *'}
                                                onFocus={(e) => e.target.type = 'date'}
                                                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                                                onClick={(e) => {
                                                    e.currentTarget.type = 'date';
                                                    try {
                                                        if ('showPicker' in HTMLInputElement.prototype) {
                                                            e.currentTarget.showPicker();
                                                        }
                                                    } catch (err) {}
                                                }}
                                                value={leg.date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => updateLeg(index, { date: e.target.value })}
                                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none cursor-pointer transition-colors placeholder-gray-600
                                                    ${errors[`leg_${index}_date`] ? 'border-red-500' : 'border-white/20 hover:border-gold focus:border-gold'}
                                                    [color-scheme:dark]`}
                                            />
                                            {errors[`leg_${index}_date`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_date`]}</p>}
                                        </div>

                                        {/* Time */}
                                        <div className="relative">
                                            <Clock className="absolute left-0 top-4 text-gold transition-colors z-10" size={20} />
                                            <input
                                                type={leg.time ? "time" : "text"}
                                                placeholder={leg.pickup?.toLowerCase().includes('airport') ? 'Landing Time (Local) *' : 'Pickup Time *'}
                                                onFocus={(e) => e.target.type = 'time'}
                                                onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                                                onClick={(e) => {
                                                    e.currentTarget.type = 'time';
                                                    try {
                                                        if ('showPicker' in HTMLInputElement.prototype) {
                                                            e.currentTarget.showPicker();
                                                        }
                                                    } catch (err) {}
                                                }}
                                                value={leg.time}
                                                onChange={(e) => updateLeg(index, { time: e.target.value })}
                                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none cursor-pointer transition-colors placeholder-gray-600
                                                    ${errors[`leg_${index}_time`] ? 'border-red-500' : 'border-white/20 hover:border-gold focus:border-gold'}
                                                    [color-scheme:dark]`}
                                            />
                                            {errors[`leg_${index}_time`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_time`]}</p>}
                                        </div>

                                        {/* Flight Number */}
                                        {leg.pickup?.toLowerCase().includes('airport') && (
                                            <div className="relative md:col-span-2 group mt-2">
                                                <Plane className="absolute left-0 top-4 text-gold transition-colors z-10" size={20} />
                                                <input
                                                    type="text"
                                                    placeholder="Flight Number (Required)"
                                                    value={leg.flightNumber}
                                                    onChange={(e) => updateLeg(index, { flightNumber: e.target.value })}
                                                    className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                                        ${errors[`leg_${index}_flightNumber`] ? 'border-red-500' : 'border-white/20 hover:border-gold focus:border-gold'}`}
                                                />
                                                {errors[`leg_${index}_flight`] && <p className="text-red-500 text-xs mt-1 absolute">{errors[`leg_${index}_flight`]}</p>}
                                            </div>
                                        )}

                                        {/* Terminal Selection (moved inside leg card) */}
                                        {leg.pickup?.toLowerCase().includes('jeddah airport') && (
                                            <div className="relative md:col-span-2">
                                                <div className="relative mt-2">
                                                    <Plane className="absolute left-0 top-4 text-gold" size={20} />
                                                    <button
                                                        type="button"
                                                        onClick={() => setActiveTerminalDropdown(activeTerminalDropdown === index ? null : index)}
                                                        className={`w-full flex items-center justify-between pl-8 pr-4 py-4 border-b-2 bg-transparent transition-colors text-left outline-none ${errors.airportTerminal ? 'border-red-500' : 'border-white/20 hover:border-gold focus:border-gold'}`}
                                                    >
                                                        <span className={`text-base truncate ${data.airportTerminal ? 'text-white' : 'text-gray-400'}`}>
                                                            {data.airportTerminal || 'Select Arrival Terminal'}
                                                        </span>
                                                        <ChevronDown size={20} className={`text-gray-400 transition-transform ${activeTerminalDropdown === index ? 'rotate-180' : ''}`} />
                                                    </button>
                                                    
                                                    <MobileDrawer 
                                                        isOpen={activeTerminalDropdown === index} 
                                                        onClose={() => setActiveTerminalDropdown(null)}
                                                        title="Select Arrival Terminal"
                                                    >
                                                        <div className="flex flex-col">
                                                            {['Terminal 1', 'Hajj Terminal', 'North Terminal'].map(terminal => (
                                                                <button
                                                                    key={terminal}
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setData({ ...data, airportTerminal: terminal });
                                                                        if (errors.airportTerminal) setErrors(err => ({ ...err, airportTerminal: '' }));
                                                                        setActiveTerminalDropdown(null);
                                                                    }}
                                                                    className="w-full px-6 py-4 text-left hover:bg-gold/10 text-gray-300 hover:text-white border-b border-white/5 last:border-0 transition-colors flex items-center justify-between"
                                                                >
                                                                    <span className="font-medium text-lg">{terminal}</span>
                                                                    {data.airportTerminal === terminal && <div className="w-2 h-2 rounded-full bg-gold" />}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </MobileDrawer>
                                                </div>
                                                {errors.airportTerminal && <p className="text-red-500 text-sm mt-1">{errors.airportTerminal}</p>}
                                                
                                                {data.airportTerminal === 'Hajj Terminal' && parkingFee > 0 && (
                                                    <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl mt-4">
                                                        <p className="text-amber-500 text-sm font-medium flex items-center gap-2">
                                                            <span className="text-xl">⚠️</span> Note: Hajj Terminal requires a mandatory {parkingFee} SAR parking fee (added to total).
                                                        </p>
                                                    </div>
                                                )}
                                                
                                                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl mt-4">
                                                    <p className="text-blue-400 text-sm font-medium">
                                                        ℹ️ Note: 90 minutes waiting time is free after your flight lands. Additional waiting will be charged at 30 SAR per hour (payable directly to the driver).
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hours (if Hourly route) */}
                                        {isHourly && (
                                            <div className="relative md:col-span-2">
                                                <Clock className="absolute left-0 top-4 text-gold" size={20} />
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="24"
                                                    placeholder="Number of Hours"
                                                    value={leg.hours || ''}
                                                    onChange={(e) => updateLeg(index, { hours: parseInt(e.target.value) || undefined })}
                                                    className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 border-white/20 focus:border-gold text-white outline-none transition-colors placeholder-gray-600"
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
                            className="w-full py-4 border-2 border-dashed border-white/20 hover:border-gold rounded-xl text-gold font-medium flex justify-center items-center gap-2 transition-colors"
                        >
                            <Plus size={20} /> Add Another Transfer
                        </button>

                    </div>
                </section>

                {/* 2. VEHICLE SELECTION */}
                <section ref={vehicleSectionRef} className={`transition-all duration-500 ${!data.legs.every(l => l.routeId) ? 'opacity-30 pointer-events-none' : activeSection !== 'vehicle' && (data.selectedVehicles && data.selectedVehicles.length > 0) ? 'opacity-60 hover:opacity-100' : 'opacity-100'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${data.legs.every(l => l.routeId) ? 'bg-gold text-black' : 'bg-white/10 text-gray-500'}`}>2</div>
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
                                        ${isSelected ? 'bg-gold/5 border-gold shadow-[0_0_30px_hsl(var(--gold-glow) / 0.2)] scale-[1.02]' : 'bg-[#111] border-white/5 hover:border-gold/50 hover:bg-[#151515]'}
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
                                        <h3 className={`text-lg font-bold ${isSelected ? 'text-gold' : 'text-white'}`}>{vehicle.name}</h3>
                                        {dispPrice && (
                                            <div className="text-right">
                                                {Number(dispPrice.amount) > 0 ? (
                                                    <>
                                                        <span className="text-sm text-gray-400">Total</span>
                                                        <p className={`text-lg font-bold text-white ${isLoading ? 'animate-pulse text-gold/70' : ''}`}>
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
                                                <div className="flex justify-between items-center text-xs text-gold mt-1 pt-1 border-t border-gold/20">
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
                                                    className="w-8 h-8 rounded bg-gold/20 hover:bg-gold/40 text-gold flex items-center justify-center transition-colors"
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${(data.selectedVehicles && data.selectedVehicles.length > 0) ? 'bg-gold text-black' : 'bg-white/10 text-gray-500'}`}>3</div>
                        <h2 className={`text-xl md:text-2xl font-bold ${(data.selectedVehicles && data.selectedVehicles.length > 0) ? 'text-white' : 'text-gray-500'}`}>Guest Details</h2>
                    </div>

                    <div className="pl-0 md:pl-11 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Passengers */}
                        <div className="relative md:col-span-2 lg:col-span-1">
                            <Users className="absolute left-0 top-4 text-gold" size={20} />
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
                            <Baby className="absolute left-0 top-4 text-gold" size={20} />
                            <div className="flex items-center justify-between w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-white/20">
                                <span className="text-gray-400">Child Seat Required?</span>
                                <button
                                    type="button"
                                    onClick={() => updateData({ childSeats: !data.childSeats })}
                                    className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${data.childSeats ? 'bg-gold' : 'bg-white/10'}`}
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
                            <User className="absolute left-0 top-4 text-gold" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name *"
                                value={data.name}
                                onChange={(e) => updateData({ name: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.name ? 'border-red-500' : 'border-white/20 focus:border-gold'}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1 absolute">{errors.name}</p>}
                        </div>

                        <div className="relative">
                            <Phone className="absolute left-0 top-4 text-gold" size={20} />
                            <input
                                type="tel"
                                placeholder="WhatsApp Number *"
                                value={data.phone}
                                onChange={(e) => updateData({ phone: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.phone ? 'border-red-500' : 'border-white/20 focus:border-gold'}`}
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1 absolute">{errors.phone}</p>}
                        </div>

                        <div className="relative md:col-span-2">
                            <Mail className="absolute left-0 top-4 text-gold" size={20} />
                            <input
                                type="email"
                                placeholder="Email Address *"
                                value={data.email}
                                onChange={(e) => updateData({ email: e.target.value })}
                                className={`w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors placeholder-gray-600
                                    ${errors.email ? 'border-red-500' : 'border-white/20 focus:border-gold'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 absolute">{errors.email}</p>}
                            <p className="text-gray-400 text-xs mt-2 pl-8">We will send a confirmation mail to this email address.</p>
                        </div>

                        {/* Visa Type */}
                        <div className="md:col-span-2 mt-4 relative">
                            <Briefcase className="absolute left-0 top-4 text-gold" size={20} />
                            <div className="w-full pl-8 pr-4 py-4 bg-transparent border-b-2 text-white outline-none transition-colors border-white/20">
                                <span className="text-gray-400 block mb-3">Visa Type *</span>
                                <div className="flex flex-wrap gap-4">
                                    {VISA_TYPES.map(vt => (
                                        <label key={vt.value} className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="visaType" 
                                                value={vt.value}
                                                checked={data.visaType === vt.value}
                                                onChange={(e) => {
                                                    updateData({ visaType: e.target.value });
                                                    if (e.target.value !== 'other') updateData({ visaOther: '' });
                                                }}
                                                className="accent-gold w-4 h-4"
                                            />
                                            <span className="text-white text-sm">{vt.label}</span>
                                        </label>
                                    ))}
                                </div>
                                {data.visaType === 'other' && (
                                    <input
                                        type="text"
                                        placeholder="Please specify *"
                                        value={data.visaOther}
                                        onChange={(e) => updateData({ visaOther: e.target.value })}
                                        className={`w-full mt-3 pl-4 pr-4 py-2 bg-white/5 border rounded-lg text-white outline-none transition-colors placeholder-gray-500 ${errors.visaOther ? 'border-red-500' : 'border-white/20 focus:border-gold'}`}
                                    />
                                )}
                            </div>
                            <p className="text-gray-400 text-xs mt-2 pl-8">Helps our team prepare the right route and documents for your trip.</p>
                            {errors.visaType && <p className="text-red-500 text-xs mt-1 absolute pl-8">{errors.visaType}</p>}
                        </div>

                        {/* Nationality */}
                        <NationalitySelector 
                            value={data.nationality} 
                            onChange={(val) => updateData({ nationality: val })} 
                            error={errors.nationality} 
                        />
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
                            className="w-full md:w-auto px-12 py-4 bg-gold hover:bg-white text-black font-bold text-lg rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_hsl(var(--gold-glow) / 0.2)] flex items-center justify-center gap-3"
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

        </div>
    );
}
