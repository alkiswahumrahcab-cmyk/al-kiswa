import React from 'react';
import FadeIn from '@/components/common/FadeIn';

export default function BlogHero() {
    return (
        <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('/kaaba-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900 opacity-80" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <FadeIn direction="down">
                        <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white drop-shadow-xl leading-tight">
                            Pilgrim <span className="text-amber-500">Resources & Insights</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light max-w-2xl mx-auto">
                            Expert guides, travel tips, and answers to your questions for a blessed and hassle-free Umrah journey.
                        </p>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
