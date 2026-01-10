'use client';

import React from 'react';
import { curatedTestimonials } from '@/data/testimonials';
import { Quote, Star } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-900 border-t border-emerald-100/20">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] -mr-32 -mt-32 mix-blend-multiply dark:mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -ml-32 -mb-32 mix-blend-multiply dark:mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <FadeIn>
                    <div className="text-center mb-20">
                        <span className="text-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block drop-shadow-sm">
                            Pilgrim Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-playfair text-slate-900 dark:text-white mb-6 tracking-tight">
                            Stories from the <span className="bg-gradient-royal-gold bg-clip-text text-transparent">Holy Journey</span>
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                            Real experiences from brothers and sisters who trusted Al Kiswah Transport with their sacred journey.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {curatedTestimonials.map((testimonial, index) => (
                        <FadeIn key={testimonial.id} delay={index * 0.1}>
                            <article className="h-full glass-card-emerald p-8 rounded-[2rem] shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(191,163,90,0.15)] transition-all duration-500 relative group flex flex-col border border-white/40 dark:border-white/5 hover:border-gold/30 hover:-translate-y-2">
                                {/* Quote Icon Watermark */}
                                <Quote className="absolute top-8 right-8 text-emerald-900/5 dark:text-white/5 group-hover:text-gold/10 transition-colors duration-500 rotate-180" size={120} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex gap-1 mb-8">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={18}
                                                className={`drop-shadow-sm ${i < testimonial.rating ? "fill-gold text-gold" : "text-slate-200 dark:text-slate-700"}`}
                                            />
                                        ))}
                                    </div>

                                    <blockquote className="mb-8 flex-1">
                                        <p className="text-xl md:text-2xl font-playfair text-slate-800 dark:text-slate-200 leading-relaxed italic relative z-10">
                                            "{testimonial.story}"
                                        </p>
                                    </blockquote>

                                    <div className="flex items-center gap-4 mt-auto pt-8 border-t border-emerald-100/30 dark:border-white/10">
                                        {/* Avatar Placeholder / Initial */}
                                        <div className="w-14 h-14 rounded-full bg-gradient-royal-gold p-[2px] shadow-lg">
                                            <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                                                <span className="text-emerald-900 dark:text-gold font-bold text-xl font-playfair">
                                                    {testimonial.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white text-lg font-playfair">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-xs font-bold uppercase tracking-wider text-gold flex items-center gap-2 mt-1">
                                                <span>{testimonial.origin}</span>
                                                <span className="w-1 h-1 rounded-full bg-emerald-300"></span>
                                                <span className="text-emerald-600 dark:text-emerald-400">{testimonial.trip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
