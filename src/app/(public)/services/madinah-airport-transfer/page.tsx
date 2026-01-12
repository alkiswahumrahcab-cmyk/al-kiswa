import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Plane, Clock, Hotel, MapPin, ChevronDown } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import RouteVisual from '@/components/services/RouteVisual';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/common/FadeIn';

export const metadata: Metadata = {
    title: "Madinah Airport Taxi to Hotel | Meet & Greet | تاكسي مطار المدينة",
    description: "Reliable taxi from Madinah Airport (MED) to Masjid Nabawi hotels. 24/7 airport pickup. حجز تاكسي مطار المدينة المنورة. توصيل الى فندق الحرم.",
    keywords: [
        "Madinah Airport Taxi",
        "Madinah Airport to Masjid Nabawi",
        "Prince Mohammad Bin Abdulaziz Airport",
        "MED Airport Transfer",
        "Madinah Airport to Makkah Taxi",
        "Madinah Hotel Transfer",
        "Umrah Taxi Madinah",
        "تاكسي مطار المدينة",
        "استقبال مطار الامير محمد بن عبدالعزيز",
        "توصيل من مطار المدينة للحرم",
        "سعر مشوار مطار المدينة"
    ],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/madinah-airport-transfer',
    },
    openGraph: {
        title: "Madinah Airport Taxi to Hotel | Prince Mohammad Bin Abdulaziz Airport Transfer",
        description: "Reliable taxi from Madinah Airport (MED) to Masjid Nabawi hotels. 24/7 airport pickup, meet & greet service.",
        images: [{ url: '/images/routes/madinah-airport-hero.png', width: 1200, height: 630, alt: 'Madinah Airport Transfer Service' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Madinah Airport Transfer",
    "alternateName": "توصيل مطار المدينة المنورة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport"
    },
    "serviceType": "Airport Transfer",
    "areaServed": {
        "@type": "Airport",
        "name": "Prince Mohammad Bin Abdulaziz International Airport"
    },
    "description": "Private transfer from Madinah Airport to Masjid Nabawi hotels.",
    "offers": {
        "@type": "Offer",
        "price": "150",
        "priceCurrency": "SAR"
    }
};

const madinahAirportFAQs = [
    {
        question: "How far is Madinah Airport from Masjid Nabawi?",
        answer: "The airport is approximately 20-25 minutes (20 km) away from the central area (Markazia) where Masjid Nabawi and most hotels are located."
    },
    {
        question: "Will the driver wait if my flight is delayed?",
        answer: "Yes, we track all flights. Our driver will wait for you at the arrival hall, regardless of delays, at no extra cost."
    },
    {
        question: "Can I book a taxi from Madinah Airport directly to Makkah?",
        answer: "Yes, we offer direct transfers from Madinah Airport (MED) to Makkah hotels. The journey takes about 4.5 hours via the Hijrah Highway."
    },
];

export default async function MadinahAirportPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20need%20pickup%20from%20Madinah%20Airport`;

    return (
        <main className="overflow-x-hidden bg-primary-black min-h-screen relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="Madinah Airport (MED) Transfers"
                subtitle="Start your visit to the Prophet's City with peace of mind. Reliable meet & greet service from Prince Mohammad Bin Abdulaziz Airport."
                bgImage="/images/routes/madinah-airport-hero.png"
                ctaText="Book Airport Pickup"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Service Highlights */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div>
                                <span className="text-[#D4AF37] font-bold tracking-[0.2em] uppercase text-sm border-b border-[#D4AF37]/30 pb-2 mb-4 block w-fit">Stress-Free Welcome</span>
                                <h2 className="text-4xl md:text-5xl font-bold mb-8 font-sans text-white">
                                    Seamless Arrival in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Madinah</span>
                                </h2>
                                <p className="text-gray-400 mb-8 leading-relaxed font-light text-lg">
                                    Arriving for Umrah or Ziyarat should be stress-free. Avoid the hassle of haggling with local taxis.
                                    Our professional drivers greet you at the arrival terminal with a name sign and assist with your luggage to your comfortable private vehicle.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                                            <Plane size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#D4AF37] transition-colors font-sans">Flight Tracking</h4>
                                            <p className="text-sm text-gray-400 font-light leading-relaxed">We monitor your flight status to ensure we are there when you land, adjusting for any delays automatically.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                                            <Hotel size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#D4AF37] transition-colors font-sans">Hotel Drop-off</h4>
                                            <p className="text-sm text-gray-400 font-light leading-relaxed">Direct transfer to your hotel lobby in the Markazia District (near Masjid Nabawi) or any other location.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors shadow-lg">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-2 text-white group-hover:text-[#D4AF37] transition-colors font-sans">24/7 Availability</h4>
                                            <p className="text-sm text-gray-400 font-light leading-relaxed">Late night or early morning flight? We are always available to serve you at any hour.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <Link href="/booking" className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B4932F] text-black hover:bg-white hover:text-black hover:from-white hover:to-white px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase tracking-wider text-sm transform hover:-translate-y-1">
                                        Book Transfer Now <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Map / Route Visual Placeholder */}
                        <FadeIn delay={0.2}>
                            <div className="bg-neutral-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />

                                <h3 className="text-2xl font-bold mb-8 text-center text-white font-sans">Popular Routes from Madinah Airport</h3>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-[#D4AF37]">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg">To Masjid Nabawi</p>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Central Hotels</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#D4AF37]">25 Mins</p>
                                            <p className="text-xs text-gray-500">20 km</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-green-500">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg"><Link href="/services/makkah-madinah-taxi" className="hover:text-green-400 transition-colors underline decoration-dotted underline-offset-4">To Makkah Hotel</Link></p>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Direct Transfer</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#D4AF37]">4.5 Hours</p>
                                            <p className="text-xs text-gray-500">450 km</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-[#D4AF37]/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-[#D4AF37]/10 p-2 rounded-lg text-blue-500">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg"><Link href="/services/ziyarat-tours" className="hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4">To Masjid Quba</Link></p>
                                                <p className="text-xs text-gray-500 uppercase tracking-wider">Ziyarat Start</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#D4AF37]">30 Mins</p>
                                            <p className="text-xs text-gray-500">25 km</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-xs text-gray-500 mt-8 italic font-light">
                                    *Travel times may vary based on traffic conditions
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="mt-24">
                        <FadeIn>
                            <h3 className="text-3xl font-bold mb-10 text-center font-sans text-white">Journey to Markazia</h3>
                            <RouteVisual
                                from="Madinah Airport (MED)"
                                fromLabel="Arrival Terminal"
                                to="Masjid Nabawi Hotel"
                                toLabel="Your Hotel / Markazia"
                                duration="25 Mins"
                                distance="20 km"
                                showMiqat={false}
                            />
                        </FadeIn>
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <section className="py-24 bg-neutral-900/30 border-t border-white/5">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 font-sans text-white">
                            Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Questions</span>
                        </h2>
                        <div className="space-y-4">
                            {madinahAirportFAQs.map((faq, i) => (
                                <div key={i} className="group">
                                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-2xl bg-neutral-900 border border-white/10 p-6 text-white hover:border-[#D4AF37]/50 transition-colors shadow-md">
                                            <h3 className="font-bold font-sans text-lg group-open:text-[#D4AF37] transition-colors">{faq.question}</h3>
                                            <span className="shrink-0 rounded-full bg-white/5 p-1.5 text-gray-400 sm:p-3 group-open:bg-[#D4AF37]/10 group-open:text-[#D4AF37] transition-all">
                                                <ChevronDown size={20} className="group-open:rotate-180 transition-transform duration-300" />
                                            </span>
                                        </summary>
                                        <div className="mt-4 px-6 leading-relaxed text-gray-400 font-light border-l-2 border-[#D4AF37]/30 ml-4">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
