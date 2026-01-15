'use client';

import React from 'react';
import { curatedTestimonials } from '@/data/testimonials';
import { Quote, Star } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';

export default function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden bg-primary-black border-t border-white/5">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold-primary/5 rounded-full blur-[120px] -mr-32 -mt-32 mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-metallic/5 rounded-full blur-[120px] -ml-32 -mb-32 mix-blend-screen" />
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block drop-shadow-sm">
                            Pilgrim Reviews
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-sans text-white mb-6 tracking-tight">
                            Stories from the <span className="bg-gradient-to-r from-gold-primary to-gold-metallic bg-clip-text text-transparent">Holy Journey</span>
                        </h2>
                        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Real experiences from brothers and sisters who trusted Al Kiswah Transport with their sacred journey.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-3 gap-8 text-left mb-16">
                    {curatedTestimonials.map((testimonial, index) => (
                        <FadeIn key={testimonial.id} delay={index * 0.1}>
                            <article className="h-full bg-white/5 backdrop-blur-md p-8 rounded-[2rem] shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(212,175,55,0.15)] transition-all duration-500 relative group flex flex-col border border-white/10 hover:border-gold-primary/40 hover:-translate-y-2">
                                {/* Quote Icon Watermark */}
                                <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-gold-primary/10 transition-colors duration-500 rotate-180" size={100} />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    className={`drop-shadow-sm ${i < testimonial.rating ? "fill-gold-primary text-gold-primary" : "text-gray-700"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-primary/10 border border-gold-primary/20">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-primary">Verified Pilgrim</span>
                                        </div>
                                    </div>

                                    <blockquote className="mb-8 flex-1">
                                        <p className="text-lg md:text-xl font-sans text-gray-200 leading-relaxed italic relative z-10 font-light">
                                            "{testimonial.story}"
                                        </p>
                                    </blockquote>

                                    <div className="flex items-center gap-4 mt-auto pt-6 border-t border-white/10">
                                        {/* Avatar Placeholder / Initial */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-primary to-gold-metallic p-[2px] shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                                                <span className="text-gold-primary font-bold text-lg font-sans">
                                                    {testimonial.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="font-bold text-white text-base font-sans group-hover:text-gold-primary transition-colors">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-xs font-medium text-gray-400 flex items-center gap-2 mt-0.5">
                                                <span className="text-gray-300">{testimonial.origin}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                                                <span>{testimonial.trip}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </FadeIn>
                    ))}
                </div>

                <FadeIn delay={0.4}>
                    <div className="flex justify-center">
                        <a
                            href="https://wa.me/966545494921"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-gold-primary hover:bg-gold-light text-black px-8 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_-10px_rgba(212,175,55,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.6)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <span>Book Your Sacred Journey</span>
                        </a>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
