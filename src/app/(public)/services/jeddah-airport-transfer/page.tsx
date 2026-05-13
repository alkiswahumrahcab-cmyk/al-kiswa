import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, UserCheck, CheckCircle2, Clock, Baby, Languages, Car, MapPin } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import VehicleCapacityGuide from '@/components/services/VehicleCapacityGuide';
import RouteVisual from '@/components/services/RouteVisual';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "Jeddah Airport to Makkah Taxi 2026 | Al Kiswah",
    description: "Private taxi from Jeddah KAIA to Makkah hotels. Meet & greet, real-time flight tracking, no hidden fees. Book online in 60 seconds. Available 24/7.",
    keywords: [
        "Jeddah Airport to Makkah taxi",
        "Jeddah Airport to Madinah transfer",
        "Umrah taxi service Jeddah",
        "Private airport transfer Saudi Arabia",
        "JED to Makkah cab",
        "Best Umrah transport service",
        "King Abdulaziz International Airport (KAIA)",
        "meet and greet jeddah airport"
    ],
    alternates: generateMetadataAlternates("/services/jeddah-airport-transfer"),
    openGraph: {
        title: "Private Jeddah Airport Transfer for Umrah Pilgrims | Al Kiswah",
        description: "Licensed, Nusuk-Registered Umrah Taxi Service with Fixed Prices and Professional Drivers.",
        images: [{ url: '/images/routes/jeddah-airport-hero-professional.webp', width: 1200, height: 630, alt: 'Jeddah Airport to Makkah Taxi' }]
    }
};

const jeddahAirportFAQs = [
    {
        question: "How long is the journey from Jeddah Airport to Makkah?",
        answer: "The journey from King Abdulaziz International Airport (JED) to Makkah hotels typically takes 60 to 90 minutes. However, during peak seasons like Ramadan or Hajj, it might take slightly longer depending on traffic."
    },
    {
        question: "Do you provide child seats?",
        answer: "Yes, we provide child seats upon request to ensure the safety and comfort of your little ones during the private airport transfer in Saudi Arabia. Please mention it during your booking."
    },
    {
        question: "Are your vehicles licensed?",
        answer: "Absolutely. All our vehicles are fully licensed and registered with the Ministry of Hajj & Umrah (Nusuk-Registered). We ensure all our vehicles pass rigorous safety inspections."
    },
    {
        question: "Can I book for a group?",
        answer: "Yes! We have a diverse fleet to accommodate any group size. From a 4-seater Sedan to a 7-seater GMC Yukon, or a 14-seater Toyota Hiace for larger groups."
    },
    {
        question: "Do you offer return trips?",
        answer: "Yes, we offer return trips from Makkah back to Jeddah Airport. You can book a round-trip transfer with us for a hassle-free departure."
    }
];

export default async function JeddahAirportTransferPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Service",
                "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#service",
                "name": "Jeddah Airport to Makkah Taxi",
                "alternateName": "Private airport transfer Saudi Arabia",
                "serviceType": "Airport Transfer",
                "description": "Private Umrah taxi from King Abdulaziz International Airport (KAIA) Jeddah to your hotel in Makkah. Fixed price, meet and greet, flight tracking included. 60–90 minute journey.",
                "url": "https://kiswahumrahcab.com/services/jeddah-airport-transfer",
                "provider": {
                    "@type": "LocalBusiness",
                    "@id": "https://kiswahumrahcab.com/#organization",
                    "name": "Al Kiswah Umrah Transport",
                    "telephone": phoneNumber
                },
                "areaServed": [
                    { "@type": "City", "name": "Jeddah" },
                    { "@type": "City", "name": "Makkah" },
                    { "@type": "City", "name": "Madinah" }
                ],
                "availableChannel": {
                    "@type": "ServiceChannel",
                    "serviceUrl": "https://kiswahumrahcab.com/booking",
                    "availableLanguage": ["English", "Arabic", "Urdu"]
                },
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "SAR",
                    "lowPrice": "180",
                    "highPrice": "400",
                    "offerCount": "4"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "245",
                    "bestRating": "5",
                    "worstRating": "1"
                }
            },
            {
                "@type": "Product",
                "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#product",
                "name": "Toyota Camry - Jeddah KAIA to Makkah Transfer",
                "image": "https://kiswahumrahcab.com/images/routes/jeddah-airport-hero-professional.webp",
                "description": "Book a private sedan (Toyota Camry) from Jeddah Airport to Makkah. Ideal for up to 4 passengers.",
                "brand": {
                    "@type": "Brand",
                    "name": "Toyota"
                },
                "offers": {
                    "@type": "Offer",
                    "url": "https://kiswahumrahcab.com/services/jeddah-airport-transfer",
                    "priceCurrency": "SAR",
                    "price": "180",
                    "availability": "https://schema.org/InStock",
                    "seller": {
                        "@type": "Organization",
                        "name": "Al Kiswah Umrah Transport"
                    }
                }
            },
            {
                "@type": "FAQPage",
                "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#faq",
                "mainEntity": jeddahAirportFAQs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            },
            {
                "@type": "BreadcrumbList",
                "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#breadcrumb",
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
            }
        ]
    };

    const content = {
        title: "Private Jeddah Airport Transfer for Umrah Pilgrims — 24/7 Service",
        subtitle: "Licensed, Nusuk‑Registered Umrah Taxi Service with Fixed Prices and Professional Drivers.",
        heroImage: "/images/routes/jeddah-airport-hero-professional.webp"
    };

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            {/* Hero Section */}
            <Hero
                title={content.title}
                subtitle={content.subtitle}
                bgImage={content.heroImage}
                ctaText="Book Now"
                ctaLink="/booking"
                secondaryCtaText="WhatsApp 24/7"
                secondaryCtaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Features Section */}
            <section className="py-16 bg-black/40 relative z-10 border-b border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto">
                            {[
                                { icon: <UserCheck size={32} />, title: "Meet & Greet", desc: "At the arrival hall" },
                                { icon: <Clock size={32} />, title: "Free Waiting Time", desc: "No charge for delays" },
                                { icon: <Baby size={32} />, title: "Child Seats", desc: "Available on request" },
                                { icon: <Languages size={32} />, title: "Multilingual", desc: "English, Arabic, Urdu" },
                                { icon: <Car size={32} />, title: "Clean & Comfortable", desc: "Premium vehicles" }
                            ].map((feature, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center p-4 bg-white/5 rounded-xl border border-white/10 hover:border-gold-primary/30 transition-colors">
                                    <div className="text-gold-primary mb-3 p-3 bg-gold-primary/10 rounded-full">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-white text-sm md:text-base mb-1">{feature.title}</h3>
                                    <p className="text-xs text-gray-400 font-light">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Route Pricing Table */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-4">
                                    Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Route Pricing</span>
                                </h2>
                                <p className="text-gray-400 font-light text-lg">Fixed rates for your peace of mind. No hidden fees.</p>
                            </div>

                            <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-2xl bg-black/60 backdrop-blur-md">
                                <table className="w-full text-sm md:text-base">
                                    <thead>
                                        <tr className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
                                            <th className="text-left p-5 text-[#D4AF37] font-bold uppercase tracking-wider min-w-[200px]">Route</th>
                                            <th className="text-center p-5 text-white font-bold tracking-wider">Sedan<br/><span className="text-xs text-gray-400 font-light">(1-4 Seats)</span></th>
                                            <th className="text-center p-5 text-white font-bold tracking-wider">GMC Yukon<br/><span className="text-xs text-gray-400 font-light">(1-7 Seats)</span></th>
                                            <th className="text-center p-5 text-white font-bold tracking-wider">Hyundai Staria<br/><span className="text-xs text-gray-400 font-light">(1-9 Seats)</span></th>
                                            <th className="text-center p-5 text-white font-bold tracking-wider">Toyota Hiace<br/><span className="text-xs text-gray-400 font-light">(10-14 Seats)</span></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="p-5 font-bold text-white flex items-center gap-2">
                                                <Plane size={16} className="text-[#D4AF37]" /> Jeddah Airport → Makkah
                                            </td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 180</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 350</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 280</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 350</td>
                                        </tr>
                                        <tr className="group hover:bg-white/5 transition-colors bg-white/[0.02]">
                                            <td className="p-5 font-bold text-white flex items-center gap-2">
                                                <Plane size={16} className="text-[#D4AF37]" /> Jeddah Airport → Madinah
                                            </td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 380</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 580</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 480</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 580</td>
                                        </tr>
                                        <tr className="group hover:bg-white/5 transition-colors">
                                            <td className="p-5 font-bold text-white flex items-center gap-2">
                                                <MapPin size={16} className="text-[#D4AF37]" /> Makkah → Jeddah Airport
                                            </td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 150</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 300</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 250</td>
                                            <td className="p-5 text-center font-semibold text-[#D4AF37]">SAR 300</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-20 bg-neutral-900/40 relative z-10 border-y border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.3}>
                        <div className="max-w-4xl mx-auto prose prose-invert prose-gold">
                            <h2 className="text-3xl font-bold font-sans text-white mb-6">Your Trusted Umrah Taxi Service in Jeddah</h2>
                            <p className="text-gray-300 leading-relaxed font-light mb-6 text-lg">
                                Embarking on your spiritual journey should be peaceful and entirely free of stress. As the <strong>best Umrah transport service</strong>, Al Kiswah provides a seamless, private <strong>Jeddah Airport to Makkah taxi</strong> experience. From the moment you land at King Abdulaziz International Airport (KAIA), our professional drivers ensure a smooth transition from the terminal straight to your hotel in the Holy City.
                            </p>

                            <h3 className="text-2xl font-bold font-sans text-white mb-4 mt-8 text-[#D4AF37]">How Our Private Airport Transfer in Saudi Arabia Works</h3>
                            <p className="text-gray-300 leading-relaxed font-light mb-6">
                                Booking your <strong>JED to Makkah cab</strong> is incredibly straightforward. Once you book online or via WhatsApp, we monitor your flight in real-time. Even if your flight is delayed, our driver will be there—offering a complimentary meet and greet service at the arrivals hall with a personalized name sign. There is no need to navigate chaotic taxi queues or negotiate prices; everything is arranged and fixed prior to your arrival.
                            </p>

                            <h3 className="text-2xl font-bold font-sans text-white mb-4 mt-8 text-[#D4AF37]">Why Pilgrims Prefer Our Jeddah Airport to Madinah Transfer</h3>
                            <p className="text-gray-300 leading-relaxed font-light mb-6">
                                Many pilgrims choose to head straight to the Prophet's City. Our <strong>Jeddah Airport to Madinah transfer</strong> offers exceptional comfort over the longer distance. Whether you choose a luxury GMC Yukon or a spacious Hyundai Staria, you are guaranteed a clean, climate-controlled environment driven by highly trained, multilingual professionals who speak English, Arabic, and Urdu.
                            </p>

                            <h3 className="text-2xl font-bold font-sans text-white mb-4 mt-8 text-[#D4AF37]">Safety, Comfort, and 10+ Years of Reliability</h3>
                            <p className="text-gray-300 leading-relaxed font-light mb-6">
                                With over 10 years of experience serving Umrah pilgrims, we understand the specific needs of families and individuals performing their religious duties. Safety is our top priority—all our vehicles are Nusuk-registered, strictly licensed, and maintained to the highest standards. We offer child seats upon request and operate with absolute <strong>24/7 availability</strong>, ensuring your ride is ready whether you land at noon or midnight. 
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10">
                <VehicleCapacityGuide />
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
                        <Link href={whatsappLink} className="inline-flex items-center btn-gold px-12 py-5 rounded-full font-bold text-lg transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] text-black hover:scale-105">
                            Book Your Transfer Now <ArrowRight size={20} className="ml-2" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main >
    );
}
