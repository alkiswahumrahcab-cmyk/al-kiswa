import React from 'react';
import { BookOpen, Heart, Shield, Handshake } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import { respectSectionData } from '@/lib/blogData';
import GlassCard from '@/components/ui/GlassCard';

export default function RespectSection() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
            {/* Background handled by parent, but added localized glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <FadeIn>
                        <div className="bg-black/40 backdrop-blur-md inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gold-primary/30 mb-8 shadow-lg">
                            <BookOpen className="text-gold-primary" size={20} />
                            <blockquote className="font-serif text-white italic tracking-wide">
                                &quot;{respectSectionData.verse.text}&quot;
                            </blockquote>
                            <cite className="text-xs font-bold text-gold-primary not-italic uppercase tracking-widest border-l border-white/20 pl-3 ml-2">
                                {respectSectionData.verse.reference}
                            </cite>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6 leading-tight">{respectSectionData.title}</h2>
                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">{respectSectionData.intro}</p>
                    </FadeIn>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {respectSectionData.commitments.map((item, index) => {
                        const Icon = item.icon === 'Heart' ? Heart : item.icon === 'Shield' ? Shield : Handshake;
                        return (
                            <FadeIn key={index} delay={index * 0.1}>
                                <GlassCard className="p-10 h-full text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300 border-white/10 bg-neutral-900/50 hover:bg-neutral-900/80 hover:border-gold-primary/30 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.1)] group">
                                    <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center mb-8 text-gold-primary border border-white/10 group-hover:border-gold-primary/50 group-hover:scale-110 transition-all duration-300 shadow-inner">
                                        <Icon size={32} />
                                    </div>
                                    <p className="text-gray-300 font-light leading-relaxed text-lg">{item.text}</p>
                                </GlassCard>
                            </FadeIn>
                        );
                    })}
                </div>

                <FadeIn delay={0.4}>
                    <div className="text-center mt-20 max-w-3xl mx-auto">
                        <div className="bg-gradient-to-r from-transparent via-gold-primary/10 to-transparent p-1 rounded-2xl">
                            <p className="text-xl md:text-2xl font-serif text-white italic py-8 px-4 border-y border-gold-primary/20 relative">
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-black border border-gold-primary/30 rounded-full flex items-center justify-center">
                                    <span className="w-2 h-2 bg-gold-primary rounded-full"></span>
                                </span>
                                {respectSectionData.closing}
                            </p>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
