'use client';

import { Shield, Clock, Heart } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FadeIn from '@/components/common/FadeIn';

export default function Features() {
    return (
        <AnimatedSection className="py-20 md:py-28 relative overflow-hidden bg-[#050505]">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold-primary/5 rounded-full blur-3xl mix-blend-screen" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-gold-metallic/5 rounded-full blur-3xl mix-blend-screen" />
                {/* Texture */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-overlay pointer-events-none bg-repeat" />
            </div>

            <div className="container px-4">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-sans text-white leading-tight">
                        Why Choose Al Kiswah for <br />
                        <span className="text-gold-primary">Your Spiritual Hijrah?</span>
                    </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: Shield,
                            title: "Safe & Trusted",
                            arabic: "نقل آمن وموثوق",
                            desc: "Officially licensed chauffeurs & well-maintained vehicles. The most trusted choice for safe Makkah to Madinah travel."
                        },
                        {
                            icon: Clock,
                            title: "Punctual & Reliable",
                            arabic: "دقة في المواعيد",
                            desc: "We track your flight to ensure timely pickups. Reliable Jeddah & Madinah Airport service available 24/7."
                        },
                        {
                            icon: Heart,
                            title: "VIP Hospitality",
                            arabic: "ضيافة وراحة VIP",
                            desc: "Spacious GMC Yukons & luxury vans for families. We serve the guests of Allah with utmost respect and premium comfort."
                        }
                    ].map((feature, index) => (
                        <div key={index} className="text-center group relative h-full bg-white/5 backdrop-blur-md rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold-primary/10 border border-white/5 hover:border-gold-primary/30">
                            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-primary/10 text-gold-primary group-hover:scale-110 group-hover:bg-gold-primary group-hover:text-black transition-all duration-500 shadow-xl shadow-gold-primary/5">
                                <feature.icon size={36} />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-sans text-white group-hover:text-gold-primary transition-colors">{feature.title}</h3>
                            <p className="text-gold-metallic/80 font-bold font-reem-kufi mb-4 text-lg">{feature.arabic}</p>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}
