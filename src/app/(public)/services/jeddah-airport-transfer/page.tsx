import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, UserCheck, CheckCircle2 } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import VehicleCapacityGuide from '@/components/services/VehicleCapacityGuide';
import RouteVisual from '@/components/services/RouteVisual';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "Jeddah Airport to Makkah Taxi 2026 | Al Kiswah",
    description: "Private taxi from Jeddah KAIA to Makkah hotels. Meet & greet, real-time flight tracking, no hidden fees. Book online in 60 seconds. Available 24/7.",
    keywords: [
        "jeddah airport to makkah taxi",
        "kaia to makkah private transfer",
        "jeddah airport makkah price 2026",
        "meet and greet jeddah airport",
        "King Abdulaziz International Airport (KAIA)",
        "taxi from Jeddah to Mecca"
    ],
    alternates: generateMetadataAlternates("/services/jeddah-airport-transfer"),
    openGraph: {
        title: "Jeddah Airport to Makkah Taxi 2026 | Al Kiswah",
        description: "Private taxi from Jeddah KAIA to Makkah hotels. Meet & greet, real-time flight tracking, no hidden fees. Book online in 60 seconds.",
        images: [{ url: '/images/routes/jeddah-airport-hero-professional.webp', width: 1200, height: 630, alt: 'Jeddah Airport to Makkah Taxi' }]
    }
};

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How long does a Jeddah Airport to Makkah taxi take?",
            "acceptedAnswer": { "@type": "Answer", "text": "The private transfer from King Abdulaziz International Airport (KAIA) to Makkah hotels typically takes 60–90 minutes, depending on traffic and terminal location." }
        },
        {
            "@type": "Question",
            "name": "Where will the driver meet me at Jeddah Airport?",
            "acceptedAnswer": { "@type": "Answer", "text": "Our driver will be waiting at the arrival hall of either the North Terminal or Terminal 1 (Hajj Terminal) after you clear customs. They will be holding a sign with your name for a seamless meet and greet experience." }
        },
        {
            "@type": "Question",
            "name": "What if my flight is delayed?",
            "acceptedAnswer": { "@type": "Answer", "text": "We provide real-time flight tracking. If your flight is delayed, we automatically adjust your pickup time at no extra cost. Your taxi from Jeddah to Makkah will be ready when you are." }
        },
        {
            "@type": "Question",
            "name": "What is the price for Jeddah Airport to Makkah taxi?",
            "acceptedAnswer": { "@type": "Answer", "text": "A private sedan (Toyota Camry) starts from SAR 180 for Jeddah Airport to Makkah. A family van (Hyundai Staria) starts from SAR 280, and a luxury GMC Yukon XL starts from SAR 350. All prices are per vehicle, not per person." }
        }
    ]
};

const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jeddah Airport to Makkah Private Taxi Transfer",
    "alternateName": "KAIA to Makkah Hotel Taxi",
    "serviceType": "Airport Transfer",
    "description": "Private Umrah taxi from King Abdulaziz International Airport (KAIA) Jeddah to your hotel in Makkah. Fixed price, meet and greet, flight tracking included. 60–90 minute journey.",
    "url": "https://kiswahumrahcab.com/services/jeddah-airport-transfer",
    "provider": {
        "@type": "TransportationCompany",
        "@id": "https://kiswahumrahcab.com/#organization",
        "name": "Al Kiswah Umrah Transport"
    },
    "areaServed": [
        { "@type": "City", "name": "Jeddah" },
        { "@type": "City", "name": "Makkah" }
    ],
    "availableChannel": {
        "@type": "ServiceChannel",
        "serviceUrl": "https://kiswahumrahcab.com/booking",
        "availableLanguage": ["English", "Arabic", "Urdu"]
    },
    "offers": {
        "@type": "Offer",
        "priceCurrency": "SAR",
        "price": "180",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "priceCurrency": "SAR",
            "description": "Fixed price — no hidden fees or surcharges"
        },
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-01-01",
        "seller": {
            "@type": "TransportationCompany",
            "name": "Al Kiswah Umrah Transport"
        }
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "245"
    },
    "termsOfService": "https://kiswahumrahcab.com/terms",
    "logo": "https://kiswahumrahcab.com/logo.webp"
};

const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://kiswahumrahcab.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Services",
            "item": "https://kiswahumrahcab.com/services"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Jeddah Airport to Makkah Taxi",
            "item": "https://kiswahumrahcab.com/services/jeddah-airport-transfer"
        }
    ]
};

const jeddahAirportFAQs = [
    {
        question: "How long does a Jeddah Airport to Makkah taxi take?",
        answer: "The private transfer from King Abdulaziz International Airport (KAIA) to Makkah hotels typically takes 60–90 minutes, depending on traffic and terminal location."
    },
    {
        question: "Where will the driver meet me at Jeddah Airport?",
        answer: "Our driver will be waiting for you at the arrival hall of either the North Terminal or Terminal 1 (Hajj Terminal/New Airport) after you clear customs. They will be holding a sign with your name for a seamless meet and greet experience."
    },
    {
        question: "What if my flight is delayed?",
        answer: "We provide real-time flight tracking. If your flight is delayed, we automatically adjust your pickup time at no extra cost. Your taxi from Jeddah to Mecca will be ready when you are."
    },
    {
        question: "Can I book a GMC Yukon for Jeddah to Makkah?",
        answer: "Yes, we have a premium fleet including GMC Yukon & Hyundai Staria, ideal for families and large luggage capacity."
    }
];

export default async function JeddahAirportTransferPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const content = {
        title: "Jeddah Airport to Makkah Taxi",
        subtitle: "Private taxi from Jeddah KAIA to Makkah hotels. Meet & greet, real-time flight tracking, and fixed price guaranteed. Available 24/7 for all terminals.",
        heroImage: "/images/routes/jeddah-airport-hero-professional.webp"
    };

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceJsonLd, breadcrumbJsonLd, faqJsonLd]) }}
            />
            <Hero
                title={content.title}
                subtitle={content.subtitle}
                bgImage={content.heroImage}
                ctaText="Book Arrival Transfer"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Arrival Guide Section */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans text-white">
                                Arrival Procedure: What to Expect
                            </h2>
                            <p className="text-gray-300 text-lg font-light leading-relaxed">
                                We know arriving in a new country can be stressful. Here is how we make it easy:
                            </p>
                            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
                                <p className="text-white font-medium italic font-sans text-lg">
                                    "We wait for you, even if your flight is delayed – because your comfort matters."
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <UserCheck size={40} className="text-gold-primary" />,
                                    title: "1. Meet & Greet",
                                    desc: "Our driver will be waiting at the arrival hall holding a sign with your name. No need to search for a taxi."
                                },
                                {
                                    icon: <ShieldCheck size={40} className="text-gold-primary" />,
                                    title: "2. Luggage Assistance",
                                    desc: <span>Our vehicles (<Link href="/fleet/gmc-yukon-at4" className="text-gold-primary hover:underline">GMC</Link>/<Link href="/fleet/hyundai-starex" className="text-gold-primary hover:underline">H1</Link>) are chosen for their large luggage capacity. The driver will handle your bags.</span>
                                },
                                {
                                    icon: <Plane size={40} className="text-gold-primary" />,
                                    title: "3. Direct to Hotel",
                                    desc: <span>Relax in a cooled vehicle while we take you directly to your <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:underline">hotel door in Makkah</Link> (approx 60-75 mins).</span>
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold-primary/30 transition-all text-center group hover:bg-black/60">
                                    <div className="flex justify-center mb-6 p-4 bg-gold-primary/10 rounded-full w-fit mx-auto border border-gold-primary/20 group-hover:bg-gold-primary/20 transition-colors">{item.icon}</div>
                                    <h3 className="text-xl font-bold mb-3 text-white font-sans">{item.title}</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Route Visual Section */}
            <section className="py-12 bg-neutral-900/30 border-y border-white/5 relative z-10 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <h2 className="text-2xl font-bold text-center mb-8 font-sans text-white">Your Journey to Makkah</h2>
                        <RouteVisual
                            from="Jeddah Airport (JED)"
                            fromLabel="Arrival Hall (Meet & Greet)"
                            to="Makkah Hotel"
                            toLabel="Hotel Reception Drop-off"
                            duration="60-75 Mins"
                            distance="95 km"
                            showMiqat={false}
                        />
                    </FadeIn>
                </div>
            </section>

            {/* Terminal Info */}
            <section className="py-16 bg-transparent relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.3}>
                        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 shadow-2xl">
                            <h3 className="text-2xl font-bold mb-4 text-white font-sans">Which Terminal?</h3>
                            <p className="text-gray-300 mb-6 font-light leading-relaxed">
                                Most international flights land at <strong className="font-bold text-gold-primary">Terminal 1 (New Airport)</strong>.
                                Some regional carriers use the North Terminal.
                                Don't worry, we track your flight number and adjust the pickup location automatically.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Route Pricing Table — Fix P2-Bug4 */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.3}>
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl font-bold text-white font-sans mb-3">
                                    Route <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Pricing</span>
                                </h2>
                                <p className="text-gray-400 font-light">Fixed prices per vehicle — no hidden fees, no surge pricing</p>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
                                            <th className="text-left p-5 text-[#D4AF37] font-bold uppercase tracking-wider">Vehicle</th>
                                            <th className="text-center p-5 text-[#D4AF37] font-bold uppercase tracking-wider">Seats</th>
                                            <th className="text-center p-5 text-[#D4AF37] font-bold uppercase tracking-wider">Jeddah → Makkah</th>
                                            <th className="text-center p-5 text-[#D4AF37] font-bold uppercase tracking-wider">Jeddah → Madinah</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {[
                                            { vehicle: 'Toyota Camry', link: '/fleet/toyota-camry', seats: '1–4', makkah: 'SAR 180', madinah: 'SAR 380', highlight: false },
                                            { vehicle: 'Hyundai Staria', link: '/fleet/hyundai-staria', seats: '1–9', makkah: 'SAR 280', madinah: 'SAR 480', highlight: false },
                                            { vehicle: 'GMC Yukon XL', link: '/fleet/gmc-yukon-at4', seats: '1–7', makkah: 'SAR 350', madinah: 'SAR 580', highlight: true },
                                        ].map((row, i) => (
                                            <tr key={i} className={`group transition-colors ${row.highlight ? 'bg-[#D4AF37]/5 hover:bg-[#D4AF37]/10' : 'bg-black/40 hover:bg-white/5'}`}>
                                                <td className="p-5">
                                                    <Link href={row.link} className="font-bold text-white group-hover:text-[#D4AF37] transition-colors flex items-center gap-2">
                                                        {row.vehicle}
                                                        {row.highlight && <span className="text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded-full font-bold">Popular</span>}
                                                    </Link>
                                                </td>
                                                <td className="p-5 text-center text-gray-400">{row.seats}</td>
                                                <td className="p-5 text-center font-bold text-white">{row.makkah}</td>
                                                <td className="p-5 text-center font-bold text-white">{row.madinah}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0" />
                                    <span>All prices are per vehicle, not per person. Pay on arrival.</span>
                                </div>
                                <Link href="/pricing" className="text-sm text-[#D4AF37] hover:text-white font-bold underline underline-offset-4 transition-colors">
                                    → See full pricing for all routes
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10">
                <VehicleCapacityGuide />
            </div>

            <div className="relative z-10">
                <Features />
            </div>

            <div className="relative z-10">
                <FleetCarouselWrapper />
            </div>

            <div className="relative z-10">
                <FAQSection items={jeddahAirportFAQs} title="Jeddah Airport Transfer FAQs" />
            </div>

            {/* CTA */}
            <section className="py-24 bg-transparent border-t border-white/10 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <Link href="/booking" className="inline-flex items-center btn-gold px-12 py-5 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] text-black hover:scale-105">
                            Check Taxi Fares <ArrowRight size={20} className="ml-2" />
                        </Link>
                        <p className="mt-8 text-sm text-gray-400 font-light">
                            Going to Madinah next? Check our <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:text-white font-bold underline underline-offset-4 decoration-gold-primary/50">Makkah to Madinah Taxi</Link> rates.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main >
    );
}
