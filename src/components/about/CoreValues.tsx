'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Shield, Clock, HeartHandshake, Moon } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

export default function CoreValues() {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });

    const values = [
        {
            id: 'safety',
            icon: Shield,
            title: 'Safety First',
            desc: 'We prioritize the safety of our passengers above all else, ensuring well-maintained vehicles and rigorously trained drivers for your peace of mind.'
        },
        {
            id: 'reliability',
            icon: Clock,
            title: 'Reliability',
            desc: 'Punctuality is our promise. We understand the value of your time during Umrah and ensure you reach every destination comfortably and on schedule.'
        },
        {
            id: 'hospitality',
            icon: HeartHandshake,
            title: 'Hospitality',
            desc: 'We treat every pilgrim as an honored guest of Allah, serving with genuine kindness, deep respect, and infinite patience throughout your journey.'
        },
        {
            id: 'spiritual',
            icon: Moon,
            title: 'Spiritual Focus',
            desc: 'We respect the sacred nature of your travel. Our service is designed to maintain a peaceful environment so you can focus on your worship.'
        },
    ];

    return (
        <section className="py-24 bg-transparent border-t border-white/5" ref={ref as unknown as React.RefObject<HTMLElement>}>
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className={`text-3xl md:text-5xl font-bold text-white mb-6 font-sans transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        Our Core Values
                    </h2>
                    <p className={`text-lg text-gray-400 transition-all duration-700 delay-100 font-light ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        The guiding principles that define our service to the Guests of Allah.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => (
                        <GlassCard
                            key={value.id}
                            className={`p-8 h-full flex flex-col items-center text-center transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] border-t-4 border-t-gold-primary bg-neutral-900/50 border-white/10 hover:border-gold-primary/50 group`}
                            delay={index * 0.1}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 text-gold-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner group-hover:border-gold-primary/30">
                                <value.icon size={32} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 font-sans group-hover:text-gold-primary transition-colors">{value.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm font-light">{value.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
