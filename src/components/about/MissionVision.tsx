'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section className="py-24 bg-transparent flex flex-col justify-center border-t border-white/5" ref={ref as unknown as React.RefObject<HTMLElement>}>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Mission */}
                    <div
                        className={`bg-neutral-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 transition-all duration-700 transform hover:border-gold-primary/30 backdrop-blur-sm group hover:bg-neutral-900/80 ${isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <div className="w-16 h-16 bg-black border border-white/10 text-gold-primary rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:scale-110 transition-transform duration-300">
                            <Target size={32} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6 font-sans">Our Mission</h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                            To provide safe, reliable, and spiritually enriching transport services for pilgrims, honoring the sanctity of their journey. We strive to ensure every mile traveled is filled with comfort, peace of mind, and the highest standards of hospitality.
                        </p>
                    </div>

                    {/* Vision */}
                    <div
                        className={`bg-gradient-to-br from-black to-neutral-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10 transition-all duration-700 delay-200 transform hover:border-gold-primary/30 group hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] ${isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <div className="w-16 h-16 bg-white/5 text-gold-primary border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                            <Eye size={32} strokeWidth={1.5} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-6 font-sans">Our Vision</h2>
                        <p className="text-lg text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                            To be the most trusted and preferred transport partner for Hajj and Umrah pilgrims worldwide, setting the global benchmark for excellence in logistics, customer care, and spiritual tourism.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
