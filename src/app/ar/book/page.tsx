'use client';

import React, { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';
import { motion } from 'framer-motion';

export default function BookPage() {
    return (
        <main className="min-h-screen bg-primary-black relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Minimalist Hero for Booking */}
            <div className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden">
                <div className="container relative z-10 text-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-gold-primary/10 border border-gold-primary/20"
                    >
                        <span className="text-gold-primary text-xs font-bold uppercase tracking-[0.2em]">Secure Reservation</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight"
                    >
                        Book Your <span className="text-gold-primary">Premium</span> Journey
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 text-lg max-w-xl mx-auto font-light"
                    >
                        Experience Makkah & Madinah with our luxury fleet.
                        Simple 3-step booking with instant confirmation.
                    </motion.p>
                </div>
            </div>

            <div className="container relative z-20 pb-20 px-4">
                <Suspense fallback={
                    <div className="max-w-4xl mx-auto h-[600px] w-full animate-pulse bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
                        <div className="text-gold-primary/50 text-sm font-medium tracking-widest uppercase">Loading Booking Engine...</div>
                    </div>
                }>
                    <BookingWizard />
                </Suspense>
            </div>
        </main>
    );
}
