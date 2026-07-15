import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaBand() {
    return (
        <section className="relative py-16 md:py-24 bg-charcoal text-white border-t border-charcoal/80 overflow-hidden">
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] pointer-events-none mix-blend-overlay" />
            
            {/* Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container relative z-10 text-center px-4">
                <h2 className="text-4xl md:text-5xl font-semibold font-display text-white mb-6 tracking-tight">
                    Start Your <span className="text-gold-strong">Spiritual Journey</span> with Peace of Mind
                </h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                    Don&apos;t worry about logistics. Book your private transfer now and let us serve you with the care you deserve.
                </p>
                <Link
                    href="/booking"
                    className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-charcoal px-8 py-4 rounded-btn font-semibold uppercase tracking-widest transition-all duration-200 shadow-md shadow-gold/20"
                >
                    Book Your Umrah Transport <ArrowRight size={20} />
                </Link>
            </div>
        </section>
    );
}
