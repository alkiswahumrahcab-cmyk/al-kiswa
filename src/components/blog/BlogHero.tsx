import React from 'react';
import FadeIn from '@/components/common/FadeIn';

export default function BlogHero() {
    return (
        <section className="relative py-32 md:py-40 flex items-center justify-center overflow-hidden bg-primary-black">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 z-0">
                {/* Texture Pattern */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10 mix-blend-overlay" />

                {/* Gradient Overlays */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold-primary/5 rounded-full blur-[120px] pointer-events-none" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-8">
                    <FadeIn direction="down">
                        <span className="text-gold-primary font-bold uppercase tracking-[0.25em] text-sm md:text-base mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            Knowledge Center | المدونة
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold font-sans text-white drop-shadow-2xl leading-[1.1] tracking-tight">
                            Pilgrim <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary to-gold-light italic font-serif">Insights</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-lg md:text-2xl text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
                            Expert guides, travel tips, and spiritual resources for a <span className="text-gold-primary font-medium">blessed Umrah journey</span>.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
