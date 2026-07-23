'use client';

import { Quote } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function TrustSection() {
    return (
        <section className="py-24 bg-surface-alt border-y border-border relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 bg-[url('/pattern.png')] bg-repeat mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-surface border border-gold/30 backdrop-blur-md mb-10 shadow-sm">
                            <Quote size={40} className="text-gold fill-gold/20" />
                        </div>

                        <blockquote className="text-2xl md:text-5xl font-serif leading-relaxed mb-10 text-ink italic">
                            &quot;Trust is the foundation of our service. We are honored to accompany you on your sacred journey, treating every mile as a promise kept.&quot;
                        </blockquote>

                        <cite className="block text-sm font-bold tracking-[0.2em] text-gold-strong uppercase not-italic">
                            — CEO, Al Kiswah Umrah Transport
                        </cite>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
