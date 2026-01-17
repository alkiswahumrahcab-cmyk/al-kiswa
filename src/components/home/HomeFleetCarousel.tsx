'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Briefcase, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import GlassButton from '@/components/ui/GlassButton';

// Define static offers for Home Page Carousel
const HOME_FLEET_OFFERS = [
    {
        id: 'camry',
        name: 'Toyota Camry 2025',
        type: 'Sedan',
        image: '/images/fleet/camry-2025.png',
        capacity: '4 Pax',
        luggage: '2 Bags',
        price: '250 SAR',
        offerPrice: '200 SAR',
        discountLabel: '20% OFF',
        features: ['Free WiFi', 'USB Charging', 'City Transfer'],
        category: 'Sedan',
        rating: 4.8,
        slug: 'toyota-camry'
    },
    {
        id: 'yukon',
        name: 'GMC Yukon XL 2025',
        type: 'VIP SUV',
        image: '/images/fleet/gmc-yukon-2025.png',
        capacity: '7 Pax',
        luggage: '5 Bags',
        price: '600 SAR',
        offerPrice: '450 SAR',
        discountLabel: 'Save 150 SAR',
        features: ['Leather Seats', 'Privacy Tint', 'VIP Service'],
        category: 'VIP SUV',
        rating: 5.0,
        slug: 'gmc-yukon-at4'
    },
    {
        id: 'hiace',
        name: 'Toyota Hiace',
        type: 'Mini Van',
        image: '/images/fleet/toyota-hiace-2025.png',
        capacity: '10 Pax',
        luggage: '8 Bags',
        price: '400 SAR',
        offerPrice: '350 SAR',
        discountLabel: 'Family Deal',
        features: ['High Roof', 'Spacious AC', 'Group Travel'],
        category: 'Mini Van',
        rating: 4.9,
        slug: 'toyota-hiace'
    },
    {
        id: 'staria',
        name: 'Hyundai Staria',
        type: 'Luxury Van',
        image: '/images/fleet/hyundai-staria-2025.png',
        capacity: '7 Pax',
        luggage: '4 Bags',
        price: '550 SAR',
        offerPrice: '400 SAR',
        discountLabel: 'Limited Time',
        features: ['Panoramic View', 'Reclining Seats', 'Premium Interior'],
        slug: 'hyundai-staria'
    },
    {
        id: 'coaster',
        name: 'Toyota Coaster 2025',
        type: 'Luxury Bus',
        image: '/images/fleet/toyota-coaster-2025.png',
        capacity: '22 Pax',
        luggage: '15 Bags',
        price: '800 SAR',
        offerPrice: '700 SAR',
        discountLabel: 'Group Special',
        features: ['Large Groups', 'Mic System', 'Comfortable AC'],
        category: 'Luxury Bus',
        rating: 4.8,
        slug: 'toyota-coaster' // Note: Page needs to be created or will 404
    }
];

export default function HomeFleetCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const displayVehicles = HOME_FLEET_OFFERS;

    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % displayVehicles.length);
    }, [displayVehicles.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + displayVehicles.length) % displayVehicles.length);
    }, [displayVehicles.length]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    // Auto Rotation
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 5000); // 5 seconds interval

        return () => clearInterval(timer);
    }, [nextSlide, currentIndex, isPaused]);

    // Touch Handling
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true); // Pause on touch
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        setIsPaused(false); // Resume after touch
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) nextSlide();
        if (isRightSwipe) prevSlide();
    };

    const currentVehicle = displayVehicles[currentIndex];



    return (
        <section className="py-24 bg-primary-black relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-[150px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
                        Our Premium Fleet
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Travel in <span className="text-gold-primary italic font-serif">Luxury & Comfort</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
                        Choose from our exclusive selection of latest 2025 models, designed for your spiritual journey.
                    </p>
                </div>

                <div
                    className="max-w-6xl mx-auto relative group/carousel"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold-primary hover:text-black transition-all backdrop-blur-md group shadow-xl hidden md:block"
                        aria-label="Previous Vehicle"
                    >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 z-30 p-3 rounded-full bg-white/5 border border-white/10 text-white hover:bg-gold-primary hover:text-black transition-all backdrop-blur-md group shadow-xl hidden md:block"
                        aria-label="Next Vehicle"
                    >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                    </button>

                    {/* Carousel Content */}
                    <div
                        className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full relative flex flex-col items-center justify-center"
                            >
                                {/* Central Huge Image */}
                                <div className="relative w-full max-w-5xl h-[300px] md:h-[500px] z-10 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-primary/20 via-transparent to-transparent blur-3xl opacity-60" />

                                    {/* Discount Badge - Floating */}
                                    {currentVehicle.discountLabel && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="absolute top-0 right-4 md:right-10 z-30"
                                        >
                                            <div className="bg-gold-primary text-black font-bold px-4 py-2 rounded-full text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] uppercase tracking-wider">
                                                {currentVehicle.discountLabel}
                                            </div>
                                        </motion.div>
                                    )}

                                    <Image
                                        src={currentVehicle.image}
                                        alt={currentVehicle.name}
                                        width={1000}
                                        height={600}
                                        className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                                        priority
                                    />
                                </div>

                                {/* Minimal Overlay Info */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="relative z-30 mt-[-40px] md:mt-[-80px] bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 max-w-2xl mx-auto shadow-2xl"
                                >
                                    <div className="text-center md:text-left">
                                        <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                            <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded">{currentVehicle.category}</span>
                                            <div className="flex items-center gap-1">
                                                <Star size={10} className="fill-gold-primary text-gold-primary" />
                                                <span className="text-xs text-white">5.0</span>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-1">
                                            {currentVehicle.name}
                                        </h3>
                                        <div className="flex items-baseline justify-center md:justify-start gap-2">
                                            <span className="text-2xl font-bold text-gold-primary">{currentVehicle.offerPrice || currentVehicle.price}</span>
                                            <span className="text-xs text-gray-400">/ Trip</span>
                                        </div>
                                    </div>

                                    <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

                                    <div className="flex gap-3">
                                        <Link href={`/fleet/${currentVehicle.slug}`} passHref>
                                            <button className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-bold border border-white/10 transition-colors uppercase tracking-wide">
                                                Details
                                            </button>
                                        </Link>
                                        <Link href="/booking" passHref>
                                            <button className="px-6 py-3 rounded-xl bg-gold-primary hover:bg-gold-light text-black text-xs font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:scale-105 uppercase tracking-wide">
                                                Book Now
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-3 mt-10">
                        {displayVehicles.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-gold-primary box-shadow-glow' : 'w-2 bg-white/20 hover:bg-white/40'
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
