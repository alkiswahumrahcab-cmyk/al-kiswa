import React from 'react';
import { Calendar, Shield, Map } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import GlassCard from '@/components/ui/GlassCard';

const tips = [
    {
        title: "Book in Advance",
        description: "Especially during peak seasons like Ramadan and Hajj, booking your transport weeks ahead ensures availability and better rates.",
        icon: Calendar,
        image: "/images/blog/tip-booking.png"
    },
    {
        title: "Verify Licensing",
        description: "Always choose a licensed transport provider to ensure safety, insurance coverage, and professional service standards.",
        icon: Shield,
        image: "/images/blog/tip-safety.png"
    },
    {
        title: "Plan Ziyarat Routes",
        description: "Discuss your Ziyarat locations with your driver beforehand to optimize your route and save time for worship.",
        icon: Map,
        image: "/images/blog/tip-route.png"
    }
];

export default function TravelTips() {
    return (
        <section className="py-24 bg-transparent relative overflow-hidden border-t border-white/5">
            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Expert Advice</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-sans">Essential Travel Tips</h2>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            Maximize your spiritual experience with these key recommendations for a smooth and hassle-free journey.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <FadeIn key={index} delay={index * 0.1} direction="up">
                            <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-neutral-900 border-white/10 hover:border-gold-primary/30 group transition-all duration-500 hover:shadow-2xl">
                                <div className="relative h-64 bg-black flex items-center justify-center overflow-hidden">
                                    {/* Fallback pattern / gradient if image not present or just as style */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black flex items-center justify-center opacity-80">
                                        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20 mix-blend-overlay" />
                                    </div>

                                    <div className="relative z-10 transform scale-150 group-hover:scale-125 transition-transform duration-700 text-gold-primary/20">
                                        <tip.icon size={80} />
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent flex items-end justify-between">
                                        <div className="w-12 h-12 rounded-full bg-gold-primary text-black flex items-center justify-center font-bold font-sans text-xl shadow-lg shadow-gold-primary/20 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                                            0{index + 1}
                                        </div>
                                        <div className="text-gold-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                            <tip.icon size={32} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 pt-10 flex-grow">
                                    <h3 className="text-2xl font-bold font-sans text-white mb-4 group-hover:text-gold-primary transition-colors">{tip.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">{tip.description}</p>
                                </div>
                            </GlassCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
