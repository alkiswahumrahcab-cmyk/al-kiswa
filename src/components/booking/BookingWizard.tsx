'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Headphones, CreditCard, Check } from 'lucide-react';
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
        selectedVehicles: [] as { id: string; count: number }[], // Replaced single string
        // vehicleCount: 1, // Deprecated, now inside selectedVehicles
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

    return (
        <div className="w-full max-w-4xl mx-auto px-0 md:px-4 py-8">
            {/* Minimalist Progress Header */}
            <div className="flex justify-between items-center mb-12 relative">
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-white/10 -z-10 hidden md:block" />

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
                        <div className="hidden md:block text-center">
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

            {/* Main Content Card */}
            <div className="bg-primary-black/60 backdrop-blur-xl rounded-[2rem] shadow-2xl border border-white/10 overflow-hidden relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-secondary/5 blur-[100px] pointer-events-none" />

                <div className="p-6 md:p-12 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                            {currentStep === 1 && <JourneyStep data={bookingData} updateData={updateData} onNext={handleNext} />}
                            {currentStep === 2 && <VehicleStep data={bookingData} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
                            {currentStep === 3 && <DetailsStep data={bookingData} updateData={updateData} onBack={handleBack} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Trust Footer */}
                <div className="bg-black/40 border-t border-white/5 py-5 px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-2.5 text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                        <ShieldCheck size={14} className="text-gold-primary" />
                        Safe & Secure
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                        <Headphones size={14} className="text-gold-primary" />
                        24/7 Support
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                        <CreditCard size={14} className="text-gold-primary" />
                        Pay on Arrival
                    </div>
                </div>
            </div>

            {/* Google Maps Script */}
            <script
                async
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || ''}&libraries=places`}
            />
        </div>
    );
}
