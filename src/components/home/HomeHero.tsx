'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, UserCheck, Plane, MessageCircle } from 'lucide-react';

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
        <section className="w-full mb-16 md:mb-24">
            <div className="relative w-full min-h-[500px] sm:min-h-[760px] md:min-h-[850px] lg:h-[920px] xl:h-screen flex flex-col justify-end lg:justify-center pt-24 sm:pt-32 pb-8 sm:pb-24 lg:pt-40 lg:pb-32">
            {/* Full-bleed background image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-[center_top] md:object-center"
                />
            </div>
            
            {/* Two-layer scrim for text readability (AA contrast) */}
            {/* 1. Right-to-left dark-to-transparent */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10" />
            {/* 2. Bottom-up darkening */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

            <div className="container relative z-20 px-4 w-full">
                {/* Content area: right side of screen, left aligned text */}
                <div className="w-full lg:w-[50%] max-w-[640px] md:ml-auto flex flex-col gap-5 lg:max-w-none text-left">
                    {/* Eyebrow */}
                    <div className="text-gold uppercase tracking-[0.14em] font-semibold text-[13px]">
                        Private Umrah & Hajj Transport
                    </div>

                    {/* H1 Title */}
                    <div className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[58px] leading-[1.1] text-white tracking-[-0.01em]">
                        {title}
                    </div>

                    {/* Subhead */}
                    {subtitle && (
                        <div className="text-white/90 font-light text-lg md:text-[19px] leading-[1.65] max-w-[44ch]">
                            {subtitle}
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-row gap-3 mt-2 w-full">
                        {/* Mobile CTA: Routes to booking page */}
                        <a 
                            href="/booking"
                            className="flex-1 lg:hidden inline-flex items-center justify-center h-[48px] px-2 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn shadow-sm transition-all text-[14px]"
                        >
                            Book Now
                        </a>
                        {/* Desktop CTA: Scrolls to widget */}
                        <button 
                            type="button"
                            onClick={() => {
                                document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className="hidden lg:inline-flex items-center justify-center h-[48px] px-8 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn shadow-sm transition-all min-w-[200px]"
                        >
                            Book Your Journey
                        </button>
                        <a 
                            href="/fleet" 
                            className="flex-1 sm:flex-none inline-flex items-center justify-center h-[48px] px-2 sm:px-8 bg-transparent hover:bg-gold-soft border-[1.5px] border-border-strong hover:border-transparent text-white hover:text-ink font-semibold rounded-btn transition-all text-[14px] sm:text-base sm:min-w-[200px]"
                        >
                            Explore Fleet
                        </a>
                    </div>

                    {/* Trust Indicators */}
                    <div className="hidden md:flex flex-col gap-3 mt-6 text-[14px] text-white/90 font-body">
                        <div className="flex items-center gap-1.5 text-gold font-semibold mb-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} fill="currentColor" />
                            ))}
                            <span className="text-white font-semibold ml-1">4.9 / 5</span>
                            <span className="text-white/60 font-normal ml-1">from 10,000+ pilgrims</span>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheck size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                <span>Licensed Saudi Transport</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <UserCheck size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                <span>Professional Chauffeurs</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Plane size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                <span>Flight Tracking</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <MessageCircle size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                <span>24/7 VIP Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Booking Widget Slot (Overlapping bottom fold in normal flow) */}
            {children && (
                <div id="booking-widget" className="relative z-30 px-4 -mt-32 md:-mt-40 hidden lg:block">
                    <div className="container mx-auto">
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default HomeHero;
