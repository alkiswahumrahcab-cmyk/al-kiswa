'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { Target, Eye } from 'lucide-react';

export default function MissionVision() {
    const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.2 });

    return (
        <section className="py-24 bg-transparent flex flex-col justify-center relative z-10" ref={ref as unknown as React.RefObject<HTMLElement>}>
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

                    {/* Mission */}
                    <div
                        className={`glass-card-emerald p-8 md:p-12 rounded-3xl transition-all duration-700 transform hover:-translate-y-2 group ${isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-gold-primary/20 to-black border border-gold-primary/30 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(212,175,55,0.1)] group-hover:scale-110 transition-transform duration-500">
                            <Target size={40} strokeWidth={1.5} className="text-gold-primary drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6 font-sans tracking-tight">Our Mission</h2>
                        <p className="text-lg text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                            To provide <span className="text-gold-primary font-medium">safe, reliable, and spiritually enriching</span> transport services for pilgrims, honoring the sanctity of their journey. We strive to ensure every mile traveled is filled with comfort, peace of mind, and the highest standards of hospitality.
                        </p>
                    </div>

                    {/* Vision */}
                    <div
                        className={`glass-card-emerald p-8 md:p-12 rounded-3xl transition-all duration-700 delay-200 transform hover:-translate-y-2 group ${isIntersecting ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                    >
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/30 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                            <Eye size={40} strokeWidth={1.5} className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]" />
                        </div>
                        <h2 className="text-4xl font-bold text-white mb-6 font-sans tracking-tight">Our Vision</h2>
                        <p className="text-lg text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors">
                            To be the most <span className="text-emerald-400 font-medium">trusted and preferred</span> transport partner for Hajj and Umrah pilgrims worldwide, setting the global benchmark for excellence in logistics, customer care, and spiritual tourism.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
