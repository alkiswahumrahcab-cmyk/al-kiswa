'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
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
        }, 6000); // Rotate every 6 seconds

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
    };

    const currentHadith = hadithCollection[currentIndex];

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/islamic-pattern.png')] bg-repeat" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-emerald-700">
                                <Star size={24} fill="currentColor" className="text-gold" />
                            </div>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-emerald-950 mb-3">Sayings of Prophet Muhammad (S.A.W.W)</h2>
                        <p className="text-slate-600">Timeless wisdom to guide our character and daily lives.</p>
                    </div>
                </FadeIn>

                <div
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="relative">
                        <GlassCard className="p-8 md:p-12 min-h-[300px] flex items-center justify-center text-center relative border-gold/20 bg-white/80">
                            <Quote size={48} className="absolute top-8 left-8 text-gold/20" />

                            <div className="relative z-10 space-y-6">
                                <p className="text-xl md:text-2xl font-playfair leading-relaxed text-emerald-950 italic">
                                    &quot;{currentHadith.text}&quot;
                                </p>
                                <div className="border-t border-gold/30 w-16 mx-auto" />
                                <div className="space-y-1">
                                    <p className="font-bold text-emerald-700">{currentHadith.source}</p>
                                    {currentHadith.narrator && (
                                        <p className="text-sm text-slate-500 font-medium">{currentHadith.narrator}</p>
                                    )}
                                </div>
                            </div>
                        </GlassCard>

                        {/* Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-12">
                            <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-amber-600 hover:scale-110 transition-all" aria-label="Previous Hadith">
                                <ChevronLeft size={24} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-12">
                            <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-400 hover:text-amber-600 hover:scale-110 transition-all" aria-label="Next Hadith">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {hadithCollection.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold w-8' : 'bg-slate-300 hover:bg-gold/30'}`}
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
