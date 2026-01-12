'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from '@/components/common/FadeIn';
import { galleryItems } from '@/data/gallery';

export default function CustomerGallery() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipe = (newDirection: number) => {
        setDirection(newDirection);
        let newIndex = currentIndex + newDirection;
        if (newIndex < 0) newIndex = galleryItems.length - 1;
        if (newIndex >= galleryItems.length) newIndex = 0;
        setCurrentIndex(newIndex);
    };

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            swipe(1);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    if (!galleryItems.length) return null;

    const currentItem = galleryItems[currentIndex];

    return (
        <section id="visitor-gallery" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-px w-12 bg-gold-primary"></div>
                            <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs">
                                Memories
                            </span>
                            <div className="h-px w-12 bg-gold-primary"></div>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-sans">
                            Our Happy <span className="text-gold-primary italic font-serif">Pilgrims</span>
                        </h2>
                        <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto">
                            Moments of spirituality and joy, captured forever.
                        </p>
                    </div>
                </FadeIn>

                {/* Slideshow Container */}
                <div className="relative max-w-5xl mx-auto aspect-video rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl">
                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={currentItem.image}
                                alt={currentItem.caption}
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-center">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="inline-block p-3 rounded-full bg-gold-primary/20 backdrop-blur-md text-gold-primary mb-4 border border-gold-primary/30">
                                        <Quote size={24} className="fill-current rotate-180" />
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-white font-serif italic mb-3 drop-shadow-lg">
                                        "{currentItem.caption}"
                                    </h3>
                                    <div className="flex items-center justify-center gap-2 text-gold-primary font-bold uppercase tracking-widest text-sm">
                                        <MapPin size={16} /> {currentItem.location}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Controls - Arrows */}
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all z-20 group"
                        onClick={() => swipe(-1)}
                        aria-label="Previous"
                    >
                        <ChevronLeft size={28} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-gold-primary hover:text-black hover:border-gold-primary transition-all z-20 group"
                        onClick={() => swipe(1)}
                        aria-label="Next"
                    >
                        <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Controls - Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {galleryItems.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > currentIndex ? 1 : -1);
                                    setCurrentIndex(idx);
                                }}
                                className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'w-10 bg-gold-primary'
                                        : 'w-2.5 bg-white/30 hover:bg-white'
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
