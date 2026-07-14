'use client';

import React from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeHeroProps {
    title: React.ReactNode | string;
    subtitle: string | React.ReactNode;
    imageSrc: string;
    imageAlt?: string;
    children?: React.ReactNode; // The booking widget
}

const HomeHero: React.FC<HomeHeroProps> = ({
    title,
    subtitle,
    imageSrc,
    imageAlt = "Al Kiswah Premium Umrah Transport",
    children
}) => {
    return (
        <section className="relative w-full bg-bg min-h-[640px] lg:min-h-[720px] pt-28 pb-40 lg:pt-36 lg:pb-32 flex items-center">
            {/* Very subtle warm wash background */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--color-gold-soft)_0%,_transparent_70%)] opacity-[0.08] pointer-events-none" />

            <div className="container relative z-10 px-4 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* Left Column (Message) */}
                    <div className="lg:col-span-7 flex flex-col gap-6 lg:pr-8">
                        {/* Eyebrow */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-gold-strong text-[13px] font-semibold uppercase tracking-[0.14em]"
                        >
                            Private Umrah & Hajj Transport
                        </motion.div>

                        {/* H1 Title */}
                        <motion.h1 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="font-display font-semibold text-[40px] md:text-5xl lg:text-[68px] leading-[1.04] text-ink tracking-[-0.01em]"
                        >
                            {title}
                        </motion.h1>

                        {/* Subhead */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-body text-lg md:text-[19px] leading-[1.65] max-w-[48ch]"
                        >
                            {subtitle}
                        </motion.div>

                        {/* Trust Microcopy */}
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-wrap items-center gap-3 text-sm text-muted mt-2"
                        >
                            <div className="flex items-center gap-1 text-gold">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" className="text-gold" />
                                ))}
                                <span className="text-ink font-semibold ml-1">5.0</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-border-strong" />
                            <span>10,000+ pilgrims served</span>
                            <span className="w-1 h-1 rounded-full bg-border-strong" />
                            <span>Nusuk-approved drivers</span>
                        </motion.div>
                    </div>

                    {/* Right Column (Imagery) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                        {/* Floating trust card */}
                        <div className="absolute -bottom-6 -left-6 bg-surface p-4 rounded-xl shadow-sm border border-border flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-success-soft flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-success"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                            </div>
                            <div>
                                <div className="text-[10px] text-muted font-bold uppercase tracking-[0.08em]">Verified</div>
                                <div className="text-[13px] text-ink font-semibold">Ministry Licensed</div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Booking Widget Slot (Overlapping bottom) */}
            {children && (
                <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-20 px-4">
                    <div className="container mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            {children}
                        </motion.div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HomeHero;
