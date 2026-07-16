'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Moon } from 'lucide-react';
import { hadithCollection } from '@/lib/blogData';

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
        <section className="py-24 bg-surface-alt relative overflow-hidden border-t border-border">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex justify-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-gold-soft flex items-center justify-center">
                            <Moon size={28} className="text-gold-strong" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-[44px] font-semibold font-display text-ink mb-4 leading-tight">Sayings of Prophet Muhammad <span className="text-gold-strong">(ﷺ)</span></h2>
                    <p className="text-body font-body text-lg md:text-[19px]">Timeless wisdom to guide our character and daily lives.</p>
                </div>

                <div
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                >
                    <div className="relative">
                        <div className="p-10 md:p-16 min-h-[350px] flex items-center justify-center text-center relative bg-surface border border-border shadow-md rounded-xl group transition-all duration-300 hover:shadow-lg">
                            <Quote size={64} className="absolute top-8 left-8 text-gold-soft opacity-50 transition-colors" />
                            <Quote size={64} className="absolute bottom-8 right-8 text-gold-soft opacity-50 rotate-180 transition-colors" />

                            <div className="relative z-10 space-y-8">
                                <p className="text-2xl md:text-3xl font-display leading-[1.4] text-ink italic">
                                    &quot;{currentHadith.text}&quot;
                                </p>
                                <div className="border-t border-border w-24 mx-auto" />
                                <div className="space-y-2">
                                    <p className="font-semibold text-gold-strong text-sm tracking-widest uppercase">{currentHadith.source}</p>
                                    {currentHadith.narrator && (
                                        <p className="text-sm text-muted font-medium font-body">Narrated by: {currentHadith.narrator}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-6 z-20">
                            <button onClick={handlePrev} className="w-12 h-12 rounded-full bg-surface border border-border hover:bg-gold hover:border-gold hover:text-ink text-ink flex items-center justify-center transition-colors duration-200 shadow-sm" aria-label="Previous Hadith">
                                <ChevronLeft size={24} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-6 z-20">
                            <button onClick={handleNext} className="w-12 h-12 rounded-full bg-surface border border-border hover:bg-gold hover:border-gold hover:text-ink text-ink flex items-center justify-center transition-colors duration-200 shadow-sm" aria-label="Next Hadith">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center gap-3 mt-10">
                        {hadithCollection.map((_, index) => (
                            <button
                                key={index}
                                className={`h-2 rounded-pill transition-all duration-300 ${index === currentIndex ? 'bg-gold w-10' : 'bg-border-strong w-3 hover:bg-gold-soft'}`}
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
