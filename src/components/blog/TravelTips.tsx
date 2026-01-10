import React from 'react';
import Image from 'next/image';
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
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Dark Theme Background */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-3 block">Expert Advice</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 font-playfair">Essential Travel Tips</h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed">
                            Maximize your spiritual experience with these key recommendations for a smooth and hassle-free journey.
                        </p>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tips.map((tip, index) => (
                        <FadeIn key={index} delay={index * 0.1} direction="up">
                            <GlassCard className="h-full flex flex-col p-0 overflow-hidden bg-slate-800/50 border-white/10 hover:border-amber-500/30">
                                <div className="relative h-48 bg-slate-800 flex items-center justify-center overflow-hidden group">
                                    {tip.image ? ( // Assuming images might not exist, fallback to icon logic or just icon
                                        // For now, let's assume images might not be real files yet, so we use a fallback or styled div
                                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                            <div className="text-amber-500/20 transform scale-150 group-hover:scale-125 transition-transform duration-500">
                                                <tip.icon size={64} />
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-amber-500">
                                            <tip.icon size={64} />
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold font-playfair shadow-lg z-10">
                                        0{index + 1}
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="mb-4 text-amber-500">
                                        <tip.icon size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold font-playfair text-white mb-4">{tip.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{tip.description}</p>
                                </div>
                            </GlassCard>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}
