import { generateMetadataAlternates } from "@/lib/hreflang";
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
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/components/seo/schema-generator";

const intercityFAQs = [
    { question: "How long is the journey?", answer: "Makkah to Madinah takes approximately 4.5 hours on the smooth Hijrah Highway. We adjust speed for your comfort and safety." },
    { question: "Is the Miqat stop included?", answer: "Yes! If you are traveling from Madinah to Makkah, we will stop at Miqat Dhul Hulayfah (Abyar Ali) for 15-20 minutes for you to assume Ihram, free of charge." },
    { question: "Are there hidden fees?", answer: "No. The price quoted is per vehicle, all-inclusive of fuel, driver, and taxes. No per-person charges." }
];
export const metadata = {
    title: "Intercity VIP Transport Jeddah Makkah Madinah 2026 | Al Kiswah",
    description: "Book private intercity taxi transfers between Jeddah, Makkah, and Madinah. Luxury fleet, professional drivers, fixed prices. Book online in 60 seconds.",
    keywords: [
        "intercity umrah transport",
        "private intercity taxi ksa",
        "makkah madinah jeddah transport",
        "umrah vip transport 2026",
        "taxi from makkah to madinah",
        "KSA intercity transfer"
    ],
    alternates: generateMetadataAlternates("/services/intercity-transfer"),
    openGraph: {
        title: "Intercity VIP Transport Jeddah Makkah Madinah 2026 | Al Kiswah",
        description: "Book private intercity taxi transfers between Jeddah, Makkah, and Madinah. Luxury fleet, professional drivers, fixed prices.",
        images: [{ url: '/images/routes/routes-network-hero.webp', width: 1200, height: 630, alt: 'Saudi Arabia Intercity Transport Network' }]
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
            <JsonLdScript schema={[
                generateServiceSchema(
                    "Intercity Transport Service",
                    "Premium private taxi service for intercity travel between Jeddah, Makkah, and Madinah.",
                    "https://kiswahumrahcab.com/images/routes/routes-network-hero.webp"
                ),
                generateBreadcrumbSchema([
                    { name: "Home", item: "/" },
                    { name: "Services", item: "/services" },
                    { name: "Intercity Transfer", item: "/services/intercity-transfer" }
                ]),
                generateFAQSchema(intercityFAQs)
            ]} />
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="Intercity VIP Transport"
                subtitle="Book private intercity taxi transfers between Jeddah, Makkah, and Madinah. Luxury fleet, professional drivers, fixed prices."
                bgImage="/images/hero/desert-highway-makkah-tower.jpg"
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

            {/* Route Distance & Time Table */}
            <section className="py-16 relative z-10 bg-neutral-950 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-2xl md:text-3xl font-bold font-sans text-center mb-8 text-white">
                                Popular Intercity Routes: Distance & Estimated Time
                            </h3>
                            <div className="overflow-x-auto rounded-xl border border-white/10 shadow-2xl">
                                <table className="w-full text-left text-sm md:text-base border-collapse">
                                    <thead>
                                        <tr className="bg-black/80 text-[#D4AF37] border-b border-white/10 uppercase tracking-wider text-xs font-bold">
                                            <th className="p-4 md:p-6 font-sans">Route</th>
                                            <th className="p-4 md:p-6 font-sans">Distance (km)</th>
                                            <th className="p-4 md:p-6 font-sans">Estimated Time</th>
                                            <th className="p-4 md:p-6 font-sans">Vehicle Types</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-neutral-900/50 divide-y divide-white/5 text-gray-300">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 md:p-6 font-medium text-white">Makkah ↔ Madinah</td>
                                            <td className="p-4 md:p-6">450 km</td>
                                            <td className="p-4 md:p-6">4 hrs 30 mins</td>
                                            <td className="p-4 md:p-6 text-sm text-gray-400">GMC Yukon, Hyundai Staria, Camry, Hiace</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 md:p-6 font-medium text-white">Jeddah Airport ↔ Makkah</td>
                                            <td className="p-4 md:p-6">100 km</td>
                                            <td className="p-4 md:p-6">1 hr 15 mins</td>
                                            <td className="p-4 md:p-6 text-sm text-gray-400">All Vehicles</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 md:p-6 font-medium text-white">Jeddah Airport ↔ Madinah</td>
                                            <td className="p-4 md:p-6">410 km</td>
                                            <td className="p-4 md:p-6">4 hrs 10 mins</td>
                                            <td className="p-4 md:p-6 text-sm text-gray-400">GMC Yukon, Hyundai Staria, Camry, Hiace</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 md:p-6 font-medium text-white">Madinah Airport ↔ Madinah Hotel</td>
                                            <td className="p-4 md:p-6">25 km</td>
                                            <td className="p-4 md:p-6">30 mins</td>
                                            <td className="p-4 md:p-6 text-sm text-gray-400">All Vehicles</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-4">
                                * Times are estimates under normal traffic conditions. Journey may take longer during Hajj and Ramadan peaks.
                            </p>
                        </div>
                    </FadeIn>
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
                            {intercityFAQs.map((faq, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300">
                                    <h3 className="font-bold text-lg mb-3 text-white flex items-start gap-4 font-sans">
                                        <span className="text-[#D4AF37] mt-1 p-1 bg-[#D4AF37]/10 rounded-full flex items-center justify-center"><ChevronDown size={16} /></span>
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed pl-10">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
