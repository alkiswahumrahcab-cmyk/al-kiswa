import React from 'react';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { Plane, Clock, ShieldCheck, MapPin, UserCheck, Smartphone, CheckCircle2, Star, ChevronDown, Award } from 'lucide-react';
import Link from 'next/link';
import { routeService } from '@/services/routeService';
import AirportInteractiveMap from '@/components/services/airport/AirportInteractiveMap';
import { Metadata } from 'next';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = {
    title: "Jeddah & Madinah Airport Transfers | Umrah Taxi | توصيل المطارات",
    description: "Reliable airport pickups for Jeddah & Madinah. Punctual, hassle-free transfers. 24/7 service. توصيل من مطار جدة الى مكة. استقبال مطار المدينة المنورة.",
    keywords: [
        "Jeddah airport to Makkah taxi", "KAIA transfer", "Umrah airport pickup", "Madinah airport taxi",
        "VIP Umrah Transport", "Jeddah Airport Shuttle", "Makkah Private Taxi",
        "توصيل مطار جدة", "تاكسي مطار المدينة", "استقبال المعتمرين",
        "نقل من مطار الملك عبدالعزيز", "حجز تاكسي الحرم", "خدمات المعتمرين"
    ],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/airport-transfers',
    },
    openGraph: {
        title: "Jeddah & Madinah Airport Transfers | Al Kiswah Transport",
        description: "Reliable airport pickups for Jeddah & Madinah. توصيل آمن ومريح من المطارات.",
        images: ["/images/fleet/gmc.png"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jeddah & Madinah Airport Transfers | Umrah Taxi",
        description: "Reliable airport pickups for Jeddah & Madinah. توصيل من مطار جدة ومطار المدينة.",
        images: ["/images/fleet/gmc.png"],
    }
};

export default async function AirportTransfersPage() {
    const allRoutes = await routeService.getActiveRoutes();
    const airportRoutes = allRoutes.filter(r =>
        r.origin.toLowerCase().includes('airport') ||
        r.destination.toLowerCase().includes('airport') ||
        r.origin.toLowerCase().includes('jeddah')
    );

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Jeddah Airport Transfer to Makkah",
        "alternateName": "توصيل من مطار جدة الى مكة",
        "provider": {
            "@type": "TransportationService",
            "name": "Al Kiswah Umrah Transport"
        },
        "description": "Premium airport transfer service from King Abdulaziz International Airport (KAIA) to Makkah. خدمة نقل فاخرة من مطار الملك عبدالعزيز الى مكة.",
        "areaServed": {
            "@type": "City",
            "name": "Makkah"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Airport Transfer Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Standard Sedan Transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "VIP GMC Yukon Transfer"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "Family Hiace Van Transfer"
                    }
                }
            ]
        }
    };

    return (
        <main className="bg-primary-black text-white relative">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Background Texture*/}
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="VIP Jeddah Airport Transfers"
                subtitle="Experience a seamless arrival with our premium chauffeur service. We track your flight and wait for you at KAIA, ensuring a stress-free journey to Makkah."
                bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
                ctaText="Book Transfer Now"
                ctaLink="/booking?service=airport"
                alt="Jeddah Airport Arrival Lounge Private Chauffeur Transfer"
            />

            {/* Interactive Map Section */}
            <section className="relative z-10 -mt-20 mb-24 px-4">
                <div className="container mx-auto">
                    <div className="bg-neutral-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-end gap-6 bg-white/5">
                            <div>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Real-time Connections</span>
                                <h1 className="text-3xl md:text-4xl font-bold font-sans text-white">
                                    Airport Connectivity Network
                                </h1>
                                <p className="text-gray-400 mt-3 max-w-xl font-light leading-relaxed">
                                    Visualize your journey from King Abdulaziz International Airport (KAIA).
                                    Select your destination to see route details, estimated time, and instant pricing.
                                </p>
                            </div>
                            <div className="flex items-center gap-6 text-xs font-bold text-gray-300 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse shadow-[0_0_10px_#D4AF37]" />
                                    Live Flight Tracking
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                    24/7 Availability
                                </div>
                            </div>
                        </div>

                        {/* The Map Component */}
                        <AirportInteractiveMap routes={airportRoutes} />
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Enhanced */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm border-b border-gold-primary/30 pb-2">Our Commitment</span>
                            <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-6 font-sans text-white">
                                Why Book Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Airport Transfer?</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg leading-relaxed">
                                We go beyond just transport. We offer comprehensive service ensuring your peace of mind from the moment you land.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Clock, title: "Flight Tracking", desc: "We monitor your flight status. Delayed? We wait for free." },
                            { icon: UserCheck, title: "Meet & Greet", desc: "Professional driver waiting with a name sign at arrivals." },
                            { icon: ShieldCheck, title: "Secure & Safe", desc: "Fully licensed vehicles and vetted professional drivers." },
                            { icon: Award, title: "Fixed Pricing", desc: "No hidden fees. Steps are clear and prices are all-inclusive." }
                        ].map((item, idx) => (
                            <GlassCard key={idx} delay={idx * 0.1} className="text-center p-10 bg-neutral-900/50 border-white/10 hover:border-[#D4AF37]/50 hover:bg-neutral-900 transition-all duration-500 group">
                                <div className="w-20 h-20 mx-auto bg-black/40 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-inner group-hover:border-[#D4AF37]/30">
                                    <item.icon size={36} className="text-[#D4AF37] group-hover:text-[#F3D383] transition-colors" />
                                </div>
                                <h3 className="font-bold text-xl mb-4 text-white font-sans">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors">
                                    {item.desc}
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative overflow-hidden bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-bold text-center mb-24 font-sans text-white">
                            Seamless Journey in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">4 Steps</span>
                        </h2>
                        <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent border-t border-dashed border-white/10 -z-10" />

                            {[
                                { icon: Smartphone, title: "1. Book Online", desc: "Select your ride and enter flight details." },
                                { icon: CheckCircle2, title: "2. Confirmation", desc: "Receive instant confirmation details." },
                                { icon: Plane, title: "3. We Track", desc: "We allow for flight delays and track arrival." },
                                { icon: UserCheck, title: "4. Meet & Ride", desc: "Driver meets you at arrivals for a smooth ride." }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 bg-neutral-900 border border-white/10 p-1.5 rounded-full relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="w-full h-full rounded-full border border-dashed border-white/20 flex items-center justify-center bg-black/40 group-hover:border-[#D4AF37]/50 transition-colors duration-500">
                                            <step.icon size={36} className="text-[#D4AF37]" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B4932F] flex items-center justify-center text-black font-bold text-sm shadow-lg border border-white/10">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-xl mt-8 mb-2 text-white group-hover:text-[#D4AF37] transition-colors font-sans">{step.title}</h3>
                                    <p className="text-sm text-gray-400 font-light max-w-[200px]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Vehicle Options */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-bold font-sans mb-6 text-white">Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Vehicle</span></h2>
                            <p className="text-gray-400 text-lg font-light">Select the perfect vehicle for your group size and comfort preferences.</p>
                        </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FadeIn delay={0.1}>
                            <div className="bg-neutral-900/50 rounded-[2rem] overflow-hidden shadow-lg border border-white/10 h-full flex flex-col group hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/camry.png"
                                        alt="Toyota Camry Standard Sedan for Affordable Makkah Airport Transfer"
                                        className="w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/5 bg-black/20 backdrop-blur-sm">
                                    <h3 className="text-2xl font-bold mb-2 text-white font-sans">Standard Sedan</h3>
                                    <p className="text-gray-400 text-sm mb-6 font-light">Perfect for couples or solo travelers with light luggage.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-gray-300">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Comfortable for 2-3 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Space for 2 Standard Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="bg-black/60 rounded-[2rem] overflow-hidden shadow-[0_0_40px_-10px_rgba(212,175,55,0.15)] border border-[#D4AF37]/50 relative h-full flex flex-col transform md:-translate-y-6 scale-[1.02] z-20">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]" />
                                <div className="absolute top-6 right-6 bg-gradient-to-r from-[#D4AF37] to-[#B4932F] text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest z-10 shadow-lg">Most Popular</div>
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-[#D4AF37]/5 to-transparent flex items-center justify-center p-6">
                                    <div className="absolute inset-0 bg-[#D4AF37]/5 blur-3xl rounded-full" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/gmc.png"
                                        alt="GMC Yukon XL VIP Luxury SUV for Jeddah Airport Pickup"
                                        className="relative z-10 w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/10 bg-black/80 backdrop-blur-md">
                                    <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37] font-sans">VIP GMC Yukon</h3>
                                    <p className="text-gray-300 text-sm mb-6 font-light">Luxury and space for families. Travel like a VIP.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-white">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Luxury seating for 7 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Large boot for 5-6 Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="bg-neutral-900/50 rounded-[2rem] overflow-hidden shadow-lg border border-white/10 h-full flex flex-col group hover:border-[#D4AF37]/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/hiace.png"
                                        alt="Toyota Hiace 10-Seater Family Van for Airport Group Transport"
                                        className="w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/5 bg-black/20 backdrop-blur-sm">
                                    <h3 className="text-2xl font-bold mb-2 text-white font-sans">Family Van (Hiace)</h3>
                                    <p className="text-gray-400 text-sm mb-6 font-light">Ideal for large groups or families with extra luggage.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-gray-300">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Spacious for 10 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Capacity for 8-10 Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative z-10 bg-neutral-900/40 border-t border-white/5">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-sans text-white">
                            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Questions</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "Where will I meet the driver?", a: "Our driver will be waiting for you at the arrival terminal holding a sign with your name. We also share the driver's contact details via WhatsApp before you land." },
                                { q: "What if my flight is delayed?", a: "We monitor flight schedules in real-time. If your flight is delayed, our driver will adjust the pickup time accordingly, free of charge." },
                                { q: "Do you provide child seats?", a: "Yes, child seats are available upon request. Please mention this requirement in the booking notes so we can arrange it for you." },
                                { q: "How long does the journey take?", a: "The journey from Jeddah Airport to Makkah typically takes about 60-90 minutes, depending on traffic conditions." },
                                { q: "Can I pay in cash?", a: "Yes, you can pay the driver in cash (SAR) upon arrival. We also accept online payments if you prefer to prepay." },
                                { q: "Is the price per person or per vehicle?", a: "Our prices are per vehicle, not per person. The price you see is for the entire car including luggage spaces." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-[#D4AF37]/30 transition-all duration-300 group">
                                    <h3 className="font-bold text-lg mb-3 text-white flex items-start gap-4 font-sans">
                                        <span className="text-[#D4AF37] mt-1 p-1 bg-[#D4AF37]/10 rounded-full"><ChevronDown size={16} /></span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-gray-400 font-light leading-relaxed pl-10 group-hover:text-gray-300 transition-colors">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-r from-[#D4AF37] via-[#E5B842] to-[#D4AF37]">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20 pointer-events-none mix-blend-multiply" />
                <div className="container relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 font-sans text-black drop-shadow-sm">
                        Ready for a <span className="text-white drop-shadow-md">Comfortable Journey?</span>
                    </h2>
                    <p className="text-lg md:text-xl mb-12 text-black/80 max-w-2xl mx-auto font-medium">
                        Book your trusted Makkah transport today and let us handle the logistics while you focus on your worship.
                    </p>
                    <Link
                        href="/booking?service=airport"
                        className="inline-flex items-center gap-3 bg-black text-[#D4AF37] hover:bg-white hover:text-black px-12 py-5 rounded-full font-bold uppercase tracking-[0.15em] text-sm shadow-2xl transition-all transform hover:-translate-y-1 border border-black/20"
                    >
                        Book Your Transfer Now
                        <Plane className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
