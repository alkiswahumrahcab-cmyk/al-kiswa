'use client';

import FadeIn from '@/components/common/FadeIn';
import Link from 'next/link';

export default function FleetHero() {

    return (
        <section className="relative py-24 md:py-32 flex items-center justify-center overflow-hidden">
            {/* Background Image/Gradient */}
            <div className="absolute inset-0 bg-slate-900">
                <div className="absolute inset-0 bg-[url('/bus-bg.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
            </div>

            <div className="container relative z-10 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <FadeIn direction="up">
                        <h1 className="text-4xl md:text-6xl font-bold font-playfair text-white drop-shadow-lg">
                            Our <span className="text-amber-500">Premium Fleet</span>
                        </h1>
                    </FadeIn>
                    <FadeIn delay={0.2} direction="up">
                        <p className="text-lg md:text-xl text-slate-200 leading-relaxed font-light">
                            Experience luxury and comfort with our diverse range of vehicles, tailored for your spiritual journey.
                        </p>
                    </FadeIn>
                    <FadeIn delay={0.4} direction="up">
                        <div className="flex justify-center pt-8">
                            <Link href="/booking" className="btn-gold text-lg px-8 py-3 rounded-full inline-flex items-center gap-2">
                                Book Your Ride
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </section>
    );
}
