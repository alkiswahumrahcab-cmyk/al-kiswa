'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Quote } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function PilgrimVoices() {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    const testimonials = [
        { id: 1, author: "Ahmed Al-Sayed", location: "Egypt", text: "Al Kiswah Transport made our Umrah journey so smooth. The driver was punctual and very polite. Highly recommended!" },
        { id: 2, author: "Fatima Khan", location: "Pakistan", text: "Excellent service! The car was clean and comfortable. Will definitely book again for my next trip." },
        { id: 3, author: "Yusuf Rahman", location: "Indonesia", text: "Very professional team. They handled our group transport perfectly. Thank you for the great experience." },
    ];

    return (
        <section className="py-24 bg-transparent border-t border-border" ref={ref as unknown as React.RefObject<HTMLElement>}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <span className="text-gold font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Testimonials</span>
                    <h2 className={`text-3xl md:text-5xl font-semibold text-ink mb-6 font-display transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Pilgrim Voices
                    </h2>
                    <p className={`text-lg text-ink-muted transition-all duration-700 delay-100 font-light ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Hear from those who have journeyed with us.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((item, index) => (
                        <GlassCard
                            key={item.id}
                            className={`p-10 relative h-full flex flex-col bg-surface border-border hover:border-gold-soft group transition-all duration-500`}
                            delay={index * 0.2}
                        >
                            <Quote size={40} className="text-gold/10 absolute top-8 right-8 group-hover:text-gold/20 transition-colors" />

                            <p className="text-ink-muted italic mb-8 relative z-10 flex-grow font-serif leading-relaxed text-lg">
                                &quot;{item.text}&quot;
                            </p>

                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-12 h-12 rounded-full bg-surface-alt border border-border flex items-center justify-center text-xl font-bold text-gold-strong shadow-inner">
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-ink font-sans">{item.author}</div>
                                    <div className="text-sm text-ink-muted uppercase tracking-wider text-xs font-bold">{item.location}</div>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
