'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Headphones, CreditCard, Check, ChevronRight } from 'lucide-react';
import { usePricing } from '@/context/PricingContext';
import JourneyStep from './steps/JourneyStep';
import VehicleStep from './steps/VehicleStep';
import DetailsStep from './steps/DetailsStep';

const STEPS = [
    { id: 1, title: 'Journey', description: 'Route & Date' },
    { id: 2, title: 'Vehicle', description: 'Choose Fleet' },
    { id: 3, title: 'Details', description: 'Confirm & Book' }
];

export default function BookingWizard() {
    const { routes, vehicles, isLoading, calculatePrice } = usePricing();
    const [currentStep, setCurrentStep] = useState(1);
    const [bookingData, setBookingData] = useState({
        serviceType: 'Intercity',
        routeId: '',
        pickup: '',
        dropoff: '',
        date: null as Date | null,
        time: null as Date | null,
        selectedVehicles: [] as { id: string; count: number }[],
        passengers: 1,
        luggage: 0,
        name: '',
        email: '',
        phone: '',
        childSeats: false,
        notes: ''
    });

    const updateData = (data: Partial<typeof bookingData>) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const handleNext = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    useEffect(() => {
        if (bookingData.pickup && bookingData.dropoff && routes.length > 0) {
            const foundRoute = routes.find(r =>
                ((r.origin || '').toLowerCase() === bookingData.pickup.toLowerCase() || bookingData.pickup.toLowerCase().includes((r.origin || '').toLowerCase())) &&
                ((r.destination || '').toLowerCase() === bookingData.dropoff.toLowerCase() || bookingData.dropoff.toLowerCase().includes((r.destination || '').toLowerCase()))
            );
            if (foundRoute) {
                updateData({ routeId: foundRoute.id });
            } else {
                updateData({ routeId: 'custom' });
            }
        }
    }, [bookingData.pickup, bookingData.dropoff, routes]);

    const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto px-0 md:px-4 py-4 md:py-8">

            {/* ── Mobile Progress Header ── */}
            <div className="md:hidden mb-5 px-1">
                {/* Step label */}
                <div className="flex justify-between items-center mb-3">
                    <div>
                        <p className="text-[10px] font-bold text-gold-primary uppercase tracking-[0.25em]">
                            Step {currentStep} of {STEPS.length}
                        </p>
                        <p className="text-base font-bold text-white leading-tight">
                            {STEPS[currentStep - 1].title}
                            <span className="text-gray-500 font-normal text-sm ml-2">— {STEPS[currentStep - 1].description}</span>
                        </p>
                    </div>
                    {/* Circle steps mini */}
                    <div className="flex items-center gap-1.5">
                        {STEPS.map((step) => (
                            <div
                                key={step.id}
                                className={`transition-all duration-500 rounded-full flex items-center justify-center font-bold text-[10px]
                                    ${currentStep > step.id
                                        ? 'w-6 h-6 bg-gold-primary text-black'
                                        : currentStep === step.id
                                            ? 'w-7 h-7 bg-gold-primary text-black ring-2 ring-gold-primary/30 ring-offset-1 ring-offset-black'
                                            : 'w-6 h-6 bg-white/10 text-gray-500'
                                    }`}
                            >
                                {currentStep > step.id ? <Check size={10} strokeWidth={3} /> : step.id}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Segmented progress bar */}
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-gold-primary to-amber-400 rounded-full"
                        animate={{ width: `${progressPercent === 0 ? 8 : progressPercent}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                </div>
            </div>

            {/* ── Desktop Progress Header ── */}
            <div className="hidden md:flex justify-between items-center mb-12 relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-white/10 -z-10" />
                {STEPS.map((step) => (
                    <div key={step.id} className="flex flex-col items-center gap-4 group flex-1 relative z-10">
                        <div className={`
                            w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 border-2
                            ${currentStep >= step.id
                                ? 'bg-gold-primary border-gold-primary text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                                : 'bg-primary-black border-white/10 text-gray-500'}
                        `}>
                            {currentStep > step.id ? <Check size={24} strokeWidth={3} /> : step.id}
                        </div>
                        <div className="text-center">
                            <span className={`text-xs uppercase font-bold tracking-[0.2em] mb-1.5 block ${currentStep >= step.id ? 'text-gold-primary' : 'text-gray-600'}`}>
                                Step 0{step.id}
                            </span>
                            <h3 className={`text-sm md:text-base font-bold uppercase tracking-wider ${currentStep >= step.id ? 'text-white' : 'text-gray-600'}`}>
                                {step.title}
                            </h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Main Content Card ── */}
            <div className="bg-primary-black/60 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-secondary/5 blur-[100px] pointer-events-none" />

                <div className="p-4 md:p-10 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            {currentStep === 1 && <JourneyStep data={bookingData} updateData={updateData} onNext={handleNext} />}
                            {currentStep === 2 && <VehicleStep data={bookingData} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
                            {currentStep === 3 && <DetailsStep data={bookingData} updateData={updateData} onBack={handleBack} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Trust Footer */}
                <div className="bg-black/40 border-t border-white/5 py-4 px-4 md:px-10 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <ShieldCheck size={13} className="text-gold-primary" />
                        Safe & Secure
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <Headphones size={13} className="text-gold-primary" />
                        24/7 Support
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                        <CreditCard size={13} className="text-gold-primary" />
                        Pay on Arrival
                    </div>
                </div>
            </div>

            <script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&libraries=places`}
            />
        </div>
    );
}
