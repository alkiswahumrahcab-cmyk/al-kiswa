'use client';

import { Shield, Clock, Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FadeIn from '@/components/common/FadeIn';

export default function Features() {
    return (
        <AnimatedSection className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-mint/20">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-gold/10 rounded-full blur-3xl mix-blend-multiply" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl mix-blend-multiply" />
                {/* Texture */}
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] mix-blend-multiply pointer-events-none" />
            </div>

            <div className="container px-4">
                <FadeIn>
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 font-playfair text-emerald-950 leading-tight">
                        Why Choose Al Kiswah for <br />
                        <span className="text-gradient-gold">Your Spiritual Hijrah?</span>
                    </h2>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center group relative h-full glass-card-emerald rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 border-t-4 border-t-transparent hover:border-t-gold">
                        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-950/5 to-gold/20 text-emerald-800 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-xl shadow-gold/10">
                            <Shield size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-playfair text-slate-800">Safe & Trusted</h3>
                        <p className="text-emerald-600 font-bold font-reem-kufi mb-4 text-lg">نقل آمن وموثوق</p>
                        <p className="text-slate-600 leading-relaxed">
                            Officially licensed chauffeurs & well-maintained vehicles. The most trusted choice for safe Makkah to Madinah travel.
                        </p>
                    </div>

                    <div className="text-center group relative h-full glass-card-emerald rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 border-t-4 border-t-transparent hover:border-t-gold">
                        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-950/5 to-gold/20 text-emerald-800 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-xl shadow-gold/10">
                            <Clock size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-playfair text-slate-800">Punctual & Reliable</h3>
                        <p className="text-emerald-600 font-bold font-reem-kufi mb-4 text-lg">دقة في المواعيد</p>
                        <p className="text-slate-600 leading-relaxed">
                            We track your flight to ensure timely pickups. Reliable Jeddah & Madinah Airport service available 24/7.
                        </p>
                    </div>

                    <div className="text-center group relative h-full glass-card-emerald rounded-3xl p-8 hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10 hover:border-gold/30 border-t-4 border-t-transparent hover:border-t-gold">
                        <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-950/5 to-gold/20 text-emerald-800 group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-500 shadow-xl shadow-gold/10">
                            <Heart size={36} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 font-playfair text-slate-800">VIP Hospitality</h3>
                        <p className="text-emerald-600 font-bold font-reem-kufi mb-4 text-lg">ضيافة وراحة VIP</p>
                        <p className="text-slate-600 leading-relaxed">
                            Spacious GMC Yukons & luxury vans for families. We serve the guests of Allah with utmost respect and premium comfort.
                        </p>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
}
