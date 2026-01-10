import React from 'react';
import { BookOpen, Heart, Shield, Handshake } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import { respectSectionData } from '@/lib/blogData';
import GlassCard from '@/components/ui/GlassCard';

export default function RespectSection() {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white -z-10" />
            <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <FadeIn>
                        <div className="bg-amber-50 inline-flex items-center gap-3 px-6 py-3 rounded-full border border-amber-100 mb-8">
                            <BookOpen className="text-amber-600" size={20} />
                            <blockquote className="font-playfair text-secondary italic">
                                &quot;{respectSectionData.verse.text}&quot;
                            </blockquote>
                            <cite className="text-sm font-bold text-amber-600 not-italic">- {respectSectionData.verse.reference}</cite>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-playfair text-secondary mb-6">{respectSectionData.title}</h2>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">{respectSectionData.intro}</p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {respectSectionData.commitments.map((item, index) => {
                        const Icon = item.icon === 'Heart' ? Heart : item.icon === 'Shield' ? Shield : Handshake;
                        return (
                            <FadeIn key={index} delay={index * 0.1}>
                                <GlassCard className="p-8 h-full text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-amber-500/10">
                                    <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-amber-600 ring-1 ring-slate-100 group-hover:bg-amber-50 group-hover:ring-amber-200 transition-colors">
                                        <Icon size={28} />
                                    </div>
                                    <p className="text-slate-700 font-medium leading-relaxed">{item.text}</p>
                                </GlassCard>
                            </FadeIn>
                        );
                    })}
                </div>

                <FadeIn delay={0.4}>
                    <div className="text-center mt-16 max-w-3xl mx-auto">
                        <p className="text-xl font-playfair text-emerald-700 italic border-l-4 border-amber-500 pl-6 bg-emerald-50/50 py-4 rounded-r-lg">
                            {respectSectionData.closing}
                        </p>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
