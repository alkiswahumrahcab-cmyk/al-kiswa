'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star, Moon } from 'lucide-react';
import { hadithCollection } from '@/lib/blogData';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

export default function HadithCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % hadithCollection.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + hadithCollection.length) % hadithCollection.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            handleNext();
        }, 8000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const currentHadith = hadithCollection[currentIndex];

    return (
        <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
            {/* Background Pattern usually handled by parent page, but we can add localized decor */}
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <div className="flex justify-center mb-6">
                            <div className="w-14 h-14 rounded-full bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                <Moon size={28} className="text-gold-primary" />
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-4">Sayings of Prophet Muhammad <span className="text-gold-primary">(ﷺ)</span></h2>
                        <p className="text-gray-400 font-light text-lg">Timeless wisdom to guide our character and daily lives.</p>
                    </div>
                </FadeIn>

                <div
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="relative">
                        <GlassCard className="p-10 md:p-16 min-h-[350px] flex items-center justify-center text-center relative bg-neutral-900/60 border-gold-primary/30 shadow-2xl backdrop-blur-xl group">
                            <Quote size={64} className="absolute top-8 left-8 text-gold-primary/10 group-hover:text-gold-primary/20 transition-colors" />
                            <Quote size={64} className="absolute bottom-8 right-8 text-gold-primary/10 rotate-180 group-hover:text-gold-primary/20 transition-colors" />

                            <div className="relative z-10 space-y-8">
                                <p className="text-2xl md:text-3xl font-serif leading-relaxed text-white italic drop-shadow-md">
                                    &quot;{currentHadith.text}&quot;
                                </p>
                                <div className="border-t border-gold-primary/30 w-24 mx-auto" />
                                <div className="space-y-2">
                                    <p className="font-bold text-gold-primary text-lg tracking-wide uppercase">{currentHadith.source}</p>
                                    {currentHadith.narrator && (
                                        <p className="text-sm text-gray-400 font-medium font-sans">Narrated by: {currentHadith.narrator}</p>
                                    )}
                                </div>
                            </div>
                        </GlassCard>

                        {/* Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-16 z-20">
                            <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-black/50 border border-white/10 hover:border-gold-primary hover:bg-gold-primary hover:text-black hover:scale-110 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md shadow-lg" aria-label="Previous Hadith">
                                <ChevronLeft size={24} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-16 z-20">
                            <button onClick={handleNext} className="w-12 h-12 rounded-full bg-black/50 border border-white/10 hover:border-gold-primary hover:bg-gold-primary hover:text-black hover:scale-110 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md shadow-lg" aria-label="Next Hadith">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-10">
                        {hadithCollection.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-full transition-all duration-500 ${index === currentIndex ? 'bg-gold-primary w-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-white/20 w-3 hover:bg-white/40'}`}
                                onClick={() => handleDotClick(index)}
                                aria-label={`Go to Hadith ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
