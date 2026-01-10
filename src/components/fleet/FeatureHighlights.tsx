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
        <section className="py-20 relative bg-slate-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <GlassCard key={feature.id} delay={index * 0.1} className="glass-card-emerald p-8 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-900/30 dark:to-slate-800 border border-emerald-100 dark:border-emerald-800/50 flex items-center justify-center mb-6 text-emerald-600 dark:text-gold group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/10 transition-all duration-300 shadow-sm">
                                <feature.icon size={32} />
                            </div>
                            <h3 className="font-bold font-playfair text-xl mb-3 text-slate-900 dark:text-white group-hover:text-gold transition-colors">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
