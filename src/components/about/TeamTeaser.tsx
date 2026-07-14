'use client';

import Link from 'next/link';
import { ArrowRight, Shield, CheckCircle, Users } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function TeamTeaser() {
    return (
        <section className="py-24 bg-surface-alt border-t border-border">
            <div className="container mx-auto px-4 text-center">
                <FadeIn>
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our Ambassadors</span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-ink mb-6 font-display">
                        Dedicated Professionals at Your Service
                    </h2>
                    <p className="max-w-2xl mx-auto text-lg text-ink-muted mb-12 leading-relaxed font-light">
                        We take pride in our team of <strong className="text-ink">licensed, multilingual, and respectful professionals</strong> who ensure your journey is safe and comfortable.
                    </p>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
                    <FadeIn delay={0.1}>
                        <div className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-gold-soft hover:bg-surface-hover transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-full bg-surface-alt border border-border flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Shield size={32} />
                            </div>
                            <span className="font-bold text-ink text-lg font-sans">Verified & Vetted</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-gold-soft hover:bg-surface-hover transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-full bg-surface-alt border border-border flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Users size={32} />
                            </div>
                            <span className="font-bold text-ink text-lg font-sans">Multilingual Experts</span>
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <div className="flex flex-col items-center gap-4 p-8 bg-surface rounded-3xl border border-border hover:border-gold-soft hover:bg-surface-hover transition-all duration-300 group">
                            <div className="w-16 h-16 rounded-full bg-surface-alt border border-border flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <CheckCircle size={32} />
                            </div>
                            <span className="font-bold text-ink text-lg font-sans">Route Specialists</span>
                        </div>
                    </FadeIn>
                </div>

                <FadeIn delay={0.4}>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-3 bg-ink text-surface px-10 py-4 rounded-btn font-bold hover:bg-gold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    >
                        <span className="uppercase tracking-widest text-sm">Learn More About Us</span>
                        <ArrowRight size={20} />
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
