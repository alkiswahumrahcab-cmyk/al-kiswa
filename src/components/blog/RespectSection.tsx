import React from 'react';
import { BookOpen, Heart, Shield, Handshake } from 'lucide-react';
import { respectSectionData } from '@/lib/blogData';

export default function RespectSection() {
    return (
        <section className="py-24 bg-bg relative overflow-hidden border-t border-border">
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Left Column: Intro & Quote */}
                    <div className="lg:col-span-5 flex flex-col justify-start">
                        <h2 className="text-3xl md:text-[44px] font-semibold font-display text-ink mb-6 leading-tight">
                            {respectSectionData.title}
                        </h2>
                        <p className="text-lg text-body leading-[1.65] font-body mb-10">
                            {respectSectionData.intro}
                        </p>

                        <div className="bg-surface-alt p-8 rounded-xl border border-border">
                            <BookOpen className="text-gold-strong mb-4" size={24} />
                            <blockquote className="font-display text-[22px] text-ink italic leading-[1.4] mb-4">
                                &quot;{respectSectionData.verse.text}&quot;
                            </blockquote>
                            <cite className="text-xs font-semibold text-gold-strong not-italic uppercase tracking-widest block">
                                {respectSectionData.verse.reference}
                            </cite>
                        </div>
                    </div>

                    {/* Right Column: Commitment Rows */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <div className="flex flex-col">
                            {respectSectionData.commitments.map((item, index) => {
                                const Icon = item.icon === 'Heart' ? Heart : item.icon === 'Shield' ? Shield : Handshake;
                                return (
                                    <div key={index} className="flex items-start gap-6 py-8 border-b border-border first:pt-0">
                                        <div className="shrink-0 w-14 h-14 rounded-full bg-gold-soft flex items-center justify-center text-gold-strong" aria-hidden="true">
                                            <Icon size={24} />
                                        </div>
                                        <p className="text-body font-body leading-relaxed text-[17px] pt-1.5">{item.text}</p>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 pt-8">
                            <p className="text-2xl font-display text-ink italic leading-[1.4]">
                                {respectSectionData.closing}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
