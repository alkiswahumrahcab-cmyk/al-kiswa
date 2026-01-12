'use client';

import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Users, MapPin, Star, Calendar } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (isIntersecting && !hasAnimated) {
            setTimeout(() => setHasAnimated(true), 0);
            let startTime: number | null = null;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                setCount(Math.floor(progress * end));
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [isIntersecting, end, duration, hasAnimated]);

    return <span ref={ref as unknown as React.RefObject<HTMLElement>}>{count.toLocaleString()}+</span>;
};

export default function ImpactStats() {

    const stats = [
        { id: 'pilgrims', icon: Users, value: 50000, label: 'Happy Pilgrims' },
        { id: 'trips', icon: MapPin, value: 10000, label: 'Trips Completed' },
        { id: 'reviews', icon: Star, value: 5, label: '5-Star Reviews' }, // Special handling for 5.0
        { id: 'years', icon: Calendar, value: 10, label: 'Years of Service' },
    ];

    return (
        <section className="py-20 md:py-28 relative overflow-hidden bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    {stats.map((stat, index) => (
                        <GlassCard
                            key={stat.id}
                            delay={index * 0.1}
                            className="flex flex-col items-center justify-center text-center p-8 group hover:border-gold-primary/50 transition-all duration-500 bg-black/60 border-white/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]"
                        >
                            <div className="mb-6 text-gold-primary p-4 bg-gold-primary/10 rounded-full group-hover:scale-110 transition-transform duration-300 border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black">
                                <stat.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div className="text-3xl md:text-5xl font-bold text-white mb-2 font-sans tracking-tight">
                                {stat.id === 'reviews' ? '5.0' : <Counter end={stat.value} />}
                            </div>
                            <div className="text-xs md:text-sm text-gray-400 font-medium uppercase tracking-[0.1em] group-hover:text-white transition-colors">
                                {stat.label}
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
