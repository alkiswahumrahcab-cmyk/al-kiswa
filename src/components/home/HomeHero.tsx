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
        <section className="relative w-full min-h-[460px] lg:min-h-[620px] flex items-center justify-start pt-36 pb-32 lg:pt-48 lg:pb-40 mb-24">
            {/* Full-bleed background image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </div>
            
            {/* Two-layer scrim for text readability (AA contrast) */}
            {/* 1. Left-to-right dark-to-transparent */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
            {/* 2. Bottom-up darkening */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            <div className="container relative z-20 px-4 w-full h-full flex flex-col justify-center">
                {/* Content max-width 640px left-aligned */}
                <div className="max-w-[640px] flex flex-col gap-5">
                    {/* Eyebrow */}
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-gold uppercase tracking-[0.14em] font-semibold text-[13px]"
                    >
                        Private Umrah & Hajj Transport
                    </motion.div>

                    {/* H1 Title */}
                    <div className="font-display font-semibold text-[40px] md:text-[58px] leading-[1.1] text-white tracking-[-0.01em]">
                        {title}
                    </div>

                    {/* Subhead */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white/90 font-light text-lg md:text-[19px] leading-[1.65] max-w-[44ch]"
                    >
                        {subtitle}
                    </motion.div>

                    {/* Trust Row */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-3 text-sm text-white/90 mt-2"
                    >
                        <div className="flex items-center gap-1 text-gold">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" className="text-gold" />
                            ))}
                            <span className="text-white font-semibold ml-1">4.9</span>
                        </div>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>10,000+ pilgrims served</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Nusuk-approved</span>
                    </motion.div>
                </div>
            </div>

            {/* Booking Widget Slot (Overlapping bottom fold) */}
            {children && (
                <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-30 px-4">
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
