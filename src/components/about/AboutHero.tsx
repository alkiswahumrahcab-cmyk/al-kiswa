'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import FadeIn from '@/components/common/FadeIn';

export default function AboutHero() {

    return (
        <section className="relative h-screen min-h-[600px] overflow-hidden flex items-center justify-center">
            {/* Static Background */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=2000&auto=format&fit=crop"
                    alt="Makkah Background"
                    fill
                    priority
                    className="object-cover"
                    quality={90}
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

            {/* Content */}
            <div className="relative z-20 container mx-auto px-4 text-center">
                <FadeIn>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold font-display text-white mb-6 drop-shadow-2xl">
                        Serving Pilgrims with <br className="hidden md:block" />
                        <span className="text-gold">Sincerity & Excellence</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-n-200 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                        Your journey of faith deserves comfort, safety, and care.
                    </p>
                </FadeIn>
            </div>


        </section>
    );
}
