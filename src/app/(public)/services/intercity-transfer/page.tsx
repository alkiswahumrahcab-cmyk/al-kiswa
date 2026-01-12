import React from 'react';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FadeIn from '@/components/common/FadeIn';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import InteractiveMapSection from '@/components/services/intercity/InteractiveMapSection';
import AnimatedMapBackground from '@/components/ui/AnimatedMapBackground';
import { routeService } from '@/services/routeService';
import { ShieldCheck, Star, UserCheck, Timer, ChevronDown } from 'lucide-react';
import { RouteWithPrices } from '@/services/routeService';
import GlassCard from '@/components/ui/GlassCard';

export const metadata = {
    title: "Makkah to Madinah Taxi & Intercity Transport | Al Kiswah",
    description: "Comfortable Makkah to Madinah transport. Reliable intercity taxi transfers between Jeddah, Makkah & Madinah. Enjoy a seamless, spiritual travel experience.",
    keywords: ["Makkah to Madinah taxi", "Madinah to Makkah transport", "Haramain transport", "VIP intercity taxi", "Jeddah to Madinah taxi", "KSA intercity transfer"],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/intercity-transfer',
    },
    openGraph: {
        title: "Makkah to Madinah Taxi & Intercity Transport | VIP Fleet",
        description: "Travel comfortably between Jeddah, Makkah, and Madinah. Premium private taxi service with experienced drivers.",
        images: [{ url: '/images/routes/routes-network-hero.png', width: 1200, height: 630, alt: 'Saudi Arabia Intercity Transport Network' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Intercity Transport Service",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport"
    },
    "serviceType": "Ground Transport",
    "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
    },
    "description": "Luxury intercity transfers between Makkah, Madinah, and Jeddah.",
    "offers": {
        "@type": "Offer",
        "price": "450",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

// Fallback data
const MOCK_ROUTES = [
    {
        id: 'mock-1',
        origin: 'Makkah Hotel',
        destination: 'Madinah Hotel',
        distance: '450 km',
        duration: '4 hrs 30 min',
        category: 'Intercity',
        isActive: true,
        prices: [{ vehicleId: 'v1', price: 450 }]
    },
    {
        id: 'mock-2',
        origin: 'Jeddah Airport',
        destination: 'Madinah Hotel',
        distance: '400 km',
        duration: '4 hrs',
        category: 'Intercity',
        isActive: true,
        prices: [{ vehicleId: 'v1', price: 400 }]
    },
    {
        id: 'mock-3',
        origin: 'Madinah Airport',
        destination: 'Makkah Hotel',
        distance: '460 km',
        duration: '4 hrs 45 min',
        category: 'Intercity',
        isActive: true,
        prices: [{ vehicleId: 'v1', price: 460 }]
    },
    {
        id: 'mock-4',
        origin: 'Jeddah City',
        destination: 'Makkah Hotel',
        distance: '85 km',
        duration: '1 hr 15 min',
        category: 'Intercity',
        isActive: true,
        prices: [{ vehicleId: 'v1', price: 200 }]
    }
];

export const revalidate = 3600;

export default async function IntercityTransferPage() {
    let routes: RouteWithPrices[] = [];

    try {
        routes = await routeService.getActiveRoutes();
    } catch (error) {
        console.error("Failed to fetch routes:", error);
    }

    const effectiveRoutes = routes.length > 0 ? routes : (process.env.NODE_ENV === 'development' || routes.length === 0 ? MOCK_ROUTES : []) as unknown as RouteWithPrices[];

    return (
        <main className="bg-primary-black text-white relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="VIP Intercity Transfers"
                subtitle="Travel between the Holy Cities in absolute comfort. Our premium fleet ensures a restful journey on the Hijrah Route."
                bgImage="/images/routes/routes-network-hero.png"
                ctaText="View Route Map"
                ctaLink="#interactive-map"
                backgroundChildren={<AnimatedMapBackground />}
                breadcrumbs={<Breadcrumbs />}
            />

            <section className="py-16 md:py-24 relative overflow-hidden z-10">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                        <FadeIn>
                            <div className="prose prose-invert max-w-none">
                                <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-sm uppercase mb-3 block border-l-4 border-[#D4AF37] pl-4">The Sacred Route</span>
                                <h2 className="text-4xl md:text-5xl font-bold font-sans mb-8 text-white leading-tight">
                                    Journey with Peace <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Between Haramains</span>
                                </h2>
                                <p className="text-lg text-gray-300 leading-relaxed mb-6 font-light">
                                    The journey between Makkah and Madinah is more than just travel; it is a transition between two sacred sanctuaries. We honor this journey by providing a service that prioritizes your rest and reverence.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed mb-10 font-light">
                                    Forget the hassle of shared buses. Our <strong>private intercity taxis</strong> allow you to travel on your own schedule, stop at Miqats (Dhul Hulayfah) for intention, and enjoy the scenic Hijrah route in the privacy of a premium vehicle.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                    {[
                                        { icon: ShieldCheck, title: "Safety First", desc: "Expert drivers on Hijrah Highway." },
                                        { icon: Star, title: "VIP Fleet", desc: "Late-model GMC Yukons & H1 Vans." },
                                        { icon: UserCheck, title: "Door-to-Door", desc: "Hotel pickup & drop-off involved." },
                                        { icon: Timer, title: "On Your Schedule", desc: "Depart exactly when you are ready." }
                                    ].map((item, idx) => (
                                        <GlassCard key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300 group hover:-translate-y-1">
                                            <div className="p-3 rounded-lg bg-black border border-white/5 text-[#D4AF37] shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                                <item.icon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-white mb-1 group-hover:text-[#D4AF37] transition-colors font-sans">{item.title}</h4>
                                                <p className="text-sm text-gray-400 font-light leading-relaxed">{item.desc}</p>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        <div className="relative sticky top-32 lg:pl-10">
                            <div className="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-[100px] opacity-20 transform translate-y-10 pointer-events-none" />
                            <div className="relative z-10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                <BookingFormWrapper title="Book Your Transfer" subtitle="Best Rates & Immediate Confirmation" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section - FULL WIDTH */}
            <section id="interactive-map" className="py-0 relative z-10 border-y border-white/10 shadow-2xl">
                <div className="w-full bg-neutral-900/50 backdrop-blur-sm">
                    {/* Ensure InteractiveMapSection uses transparent background internally */}
                    <InteractiveMapSection routes={effectiveRoutes} />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative z-10 bg-neutral-900/30">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-sans text-white">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Questions</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "How long is the journey?", a: "Makkah to Madinah takes approximately 4.5 hours on the smooth Hijrah Highway. We adjust speed for your comfort and safety." },
                                { q: "Is the Miqat stop included?", a: "Yes! If you are traveling from Madinah to Makkah, we will stop at Miqat Dhul Hulayfah (Abyar Ali) for 15-20 minutes for you to assume Ihram, free of charge." },
                                { q: "Are there hidden fees?", a: "No. The price quoted is per vehicle, all-inclusive of fuel, driver, and taxes. No per-person charges." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
                                    <h3 className="font-bold text-lg mb-3 text-white flex items-start gap-4 font-sans">
                                        <span className="text-[#D4AF37] mt-1 p-1 bg-[#D4AF37]/10 rounded-full flex items-center justify-center"><ChevronDown size={16} /></span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed pl-10">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
