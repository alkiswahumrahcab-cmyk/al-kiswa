'use client';

import { Shield, Star, Clock, HeartHandshake } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

export default function FeatureHighlights() {

    const features = [
        { id: 'safety', icon: Shield, title: 'Safety First', desc: 'Our vehicles are regularly inspected and maintained to ensure your safety.' },
        { id: 'comfort', icon: Star, title: 'Premium Comfort', desc: 'Enjoy a relaxing journey with spacious seating and climate control.' },
        { id: 'reliability', icon: Clock, title: 'Always On Time', desc: 'We value your time and guarantee punctual pickups and drop-offs.' },
        { id: 'hospitality', icon: HeartHandshake, title: 'Warm Hospitality', desc: 'Our dedicated team is trained to serve you with respect and courtesy.' },
    ];

    return (
        <section className="py-20 relative bg-transparent">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <GlassCard key={feature.id} delay={index * 0.1} className="bg-black/60 border-white/10 p-8 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 hover:border-gold-primary/30 hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                            <div className="w-16 h-16 rounded-full bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center mb-6 text-gold-primary group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="font-bold font-sans text-xl mb-3 text-white group-hover:text-gold-primary transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed font-light">{feature.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
