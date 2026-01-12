import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, Clock } from 'lucide-react';
import RouteVisual from '@/components/services/RouteVisual';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = {
    title: "Taxi Makkah to Madinah Price 2025 | VIP Private Car Cost",
    description: "Book private taxi from Makkah to Madinah. 4-hour luxury transfer in GMC Yukon or Hyundai Staria. Door-to-door service with Miqat option (احرام).",
    keywords: [
        "Taxi Makkah to Madinah",
        "Makkah to Madinah Taxi Price",
        "Private Car Makkah to Madinah",
        "Distance Makkah to Madinah Taxi Time",
        "VIP Transport Makkah Madinah",
        "تاكسي مكة المدينة",
        "سعر التوصيل من مكة للمدينة",
        "حجز جمس من مكة الى المدينة",
        "نقل معتمرين بين المدن",
        "مشوار مكة المدينة"
    ],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/makkah-madinah-taxi',
    },
    openGraph: {
        title: "Taxi Makkah to Madinah Price 2025 | VIP Private Transport",
        description: "Book the most comfortable Makkah to Madinah taxi service. Private GMC Yukon, Hyundai Staria, and VIP buses.",
        images: [{ url: '/images/routes/makkah-madinah-route-hero.png', width: 1200, height: 630, alt: 'Makkah to Madinah Highway Scenic View' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Makkah to Madinah Taxi Service",
    "alternateName": "تاكسي مكة المدينة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport",
        "image": "https://alkiswahumrahtransport.com/logo.png"
    },
    "serviceType": "Intercity Transfer",
    "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
    },
    "description": "Premium private transport between Makkah and Madinah in GMC Yukon or Staria.",
    "offers": {
        "@type": "Offer",
        "price": "400",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://alkiswahumrahtransport.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://alkiswahumrahtransport.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Makkah to Madinah Taxi",
                "item": "https://alkiswahumrahtransport.com/services/makkah-madinah-taxi"
            }
        ]
    }
};

const makkahMadinahFAQs = [
    {
        question: "How long is the journey from Makkah to Madinah?",
        answer: <span>The distance is approximately 450 km. By private taxi (<Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] hover:text-white hover:underline">GMC</Link>/<Link href="/fleet/hyundai-staria" className="text-[#D4AF37] hover:text-white hover:underline">Staria</Link>), the journey typically takes 4.5 to 5 hours. We can stop at the Miqat (Bir Ali) for 15-30 minutes if you wish to assume Ihram before entering Makkah.</span>
    },
    {
        question: "What is the price of a taxi from Makkah to Madinah?",
        answer: "Our prices are fixed and transparent. A private sedan starts from SAR 400, while a luxury GMC Yukon or Hyundai Staria starts from SAR 600-700. Prices may vary slightly during peak seasons like Ramadan or Hajj."
    },
    {
        question: "Do you offer transport from Jeddah Airport to Makkah?",
        answer: <span>Yes, we specialize in <Link href="/services/jeddah-airport-transfer" className="text-[#D4AF37] hover:text-white hover:underline">Jeddah Airport transfers</Link>. Our driver will meet you at the arrival hall and take you directly to your hotel or the Haram.</span>
    },
    {
        question: "Is it better than the Haramain Train?",
        answer: "While the train is fast, a private taxi offers door-to-door convenience. You don't need to arrange transport to the train station, handle luggage transfers, or strictly adhere to a schedule. We pick you up from your hotel lobby and drop you at your next hotel."
    },
    {
        question: "Can we stop for Ziyarat on the way?",
        answer: "Yes! Unlike buses or trains, a private taxi allows for flexibility. We can stop at historical sites like Badr or key Ziyarat spots within Madinah upon arrival (additional charges may apply depending on time)."
    }
];

export default async function MakkahMadinahTaxiPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const content = {
        title: "VIP Makkah to Madinah Taxi Services",
        subtitle: "Experience a spiritual journey with absolute comfort (راحة تامة). 4-5 hours travel time in luxury GMC Yukon or Hyundai Staria.",
        heroImage: "/images/routes/makkah-madinah-route-hero.png"
    };

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title={content.title}
                subtitle={content.subtitle}
                bgImage={content.heroImage}
                ctaText="Book Now via WhatsApp"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Trust/Benefits Section */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8 font-sans text-white">
                                    Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Makkah-Madinah</span> Transfer?
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
                                    The journey between the two Holy Cities (approx. 450km) requires a vehicle that guarantees comfort and safety.
                                    Skip the crowded buses and strict train schedules. Our private taxi service offers premium rides in our <Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] font-bold hover:underline">GMC Yukon</Link> or <Link href="/fleet/hyundai-staria" className="text-[#D4AF37] font-bold hover:underline">Hyundai Staria</Link>:
                                </p>

                                <GlassCard className="mb-8 p-8 bg-neutral-900/50 rounded-2xl border border-white/5 border-l-4 border-l-[#D4AF37]">
                                    <p className="text-white italic font-medium text-center font-serif text-lg">
                                        &quot;Welcome to the City of the Prophet ﷺ — May your journey be blessed.&quot;
                                    </p>
                                </GlassCard>

                                <ul className="space-y-6">
                                    {[
                                        "Door-to-Door Service (Hotel to Hotel)",
                                        "No Luggage Limits (Within vehicle capacity)",
                                        "Stop at Miqat (Bir Ali) for Ihram",
                                        "Flexible Departure Times (24/7)",
                                        "New Model Vehicles (2024-2025)"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-4 group">
                                            <div className="bg-[#D4AF37]/10 rounded-full p-1.5 border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] transition-colors">
                                                <CheckCircle2 className="text-[#D4AF37] group-hover:text-black flex-shrink-0 transition-colors" size={18} />
                                            </div>
                                            <span className="text-gray-300 font-light text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <GlassCard className="p-10 rounded-[2.5rem] bg-neutral-900/40 border border-[#D4AF37]/20 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-[#D4AF37]/40 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-[50px] pointer-events-none" />

                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white font-sans">
                                    <Clock className="text-[#D4AF37]" size={24} /> Average Travel Time
                                </h3>
                                <p className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] font-sans">4 Hours 30 Minutes</p>

                                <h3 className="text-xl font-bold mb-4 flex items-center gap-3 text-white font-sans">
                                    <MapPin className="text-[#D4AF37]" size={24} /> Route Highlights
                                </h3>
                                <div className="space-y-4 text-base text-gray-400 font-light">
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Pickup from your Makkah Hotel</p>
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Optional <Link href="/services/ziyarat-tours" className="text-[#D4AF37] hover:underline underline-offset-4 decoration-dotted">Ziyarat stops</Link> (on request)</p>
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> Drop-off at Madinah Hotel / Masjid Nabawi</p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Starting From</span>
                                        <span className="text-2xl font-bold text-white">SAR 400</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </FadeIn>

                    {/* Route Visualization - NEW */}
                    <div className="mt-24 relative z-10">
                        <FadeIn delay={0.2}>
                            <h2 className="text-3xl font-bold text-center mb-12 font-sans text-white">Your Journey Map</h2>
                            <RouteVisual />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Fleet Section Reuse */}
            <div className="relative z-10">
                <FleetCarouselWrapper />
            </div>

            <div className="relative z-10">
                <Features />
            </div>

            {/* FAQ Section - NEW */}
            <div className="relative z-10">
                <FAQSection items={makkahMadinahFAQs} title="Frequently Asked Questions" />
            </div>

            <section className="py-24 bg-transparent border-t border-white/5 relative z-10 bg-gradient-to-b from-transparent to-black/80">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white">Compare: Taxi vs. Haramain Train</h2>
                        <p className="text-gray-400 mb-10 leading-relaxed font-light text-lg">
                            While the train is fast, a private taxi offers unmatched convenience for families.
                            No need to travel to the station, handle luggage multiple times, or worry about ticket availability.
                            Our service picks you up directly from your lobby.
                        </p>
                        <Link href="/booking" className="inline-flex items-center bg-gradient-to-r from-[#D4AF37] to-[#B4932F] px-12 py-5 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] uppercase tracking-[0.2em] text-sm text-black hover:scale-105 hover:bg-white hover:text-black border border-transparent hover:border-black/10">
                            Check Prices & Book Now <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
