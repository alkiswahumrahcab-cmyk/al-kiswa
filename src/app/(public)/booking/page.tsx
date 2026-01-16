'use client';

import React, { Suspense } from 'react';
import BookingWizard from '@/components/booking/BookingWizard';

export default function BookingPage() {
    return (
        <main className="min-h-screen bg-primary-black relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            {/* Ambient Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-secondary/5 rounded-full blur-[120px] pointer-events-none" />

            {/* Hidden Message for Accessibility/SEO */}
            <h1 className="sr-only">Book Your Umrah Taxi</h1>

            <div className="container relative z-20 md:pt-12 pb-20 px-4">
                {/* Wrapper to align with /book layout but slightly adjusted if needed */}
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
