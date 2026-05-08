import { generateMetadataAlternates } from "@/lib/hreflang";
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
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/components/seo/schema-generator";
export const metadata: Metadata = {
    title: "Madinah Airport Taxi to Hotel 2026 | Al Kiswah",
    description: "Book a reliable Madinah Airport taxi to your Masjid Nabawi hotel. 24/7 VIP pickup, meet & greet, and fixed prices. Book your transfer online now.",
    keywords: [
        "madinah airport taxi",
        "madinah airport transfer",
        "madinah airport to hotel",
        "med airport taxi",
        "taxi from madinah airport to masjid nabawi",
        "vip taxi madinah airport"
    ],
    alternates: generateMetadataAlternates("/services/madinah-airport-transfer"),
    openGraph: {
        title: "Madinah Airport Taxi to Hotel 2026 | Al Kiswah",
        description: "Book a reliable Madinah Airport taxi to your Masjid Nabawi hotel. 24/7 VIP pickup, meet & greet, and fixed prices.",
        images: [{ url: '/images/routes/madinah-airport-hero.webp', width: 1200, height: 630, alt: 'Madinah Airport Transfer Service' }]
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

            <JsonLdScript schema={[
                generateServiceSchema(
                    "Madinah Airport Taxi",
                    "Private taxi transfer from Madinah Airport to Masjid Nabawi hotels.",
                    "https://kiswahumrahcab.com/images/routes/madinah-airport-hero.webp"
                ),
                generateBreadcrumbSchema([
                    { name: "Home", item: "/" },
                    { name: "Services", item: "/services" },
                    { name: "Madinah Airport Taxi", item: "/services/madinah-airport-transfer" }
                ]),
                generateFAQSchema(madinahAirportFAQs)
            ]} />
            <Hero
                title="Madinah Airport (MED) Transfers"
                subtitle="Start your visit to the Prophet's City with peace of mind. Reliable meet & greet service from Prince Mohammad Bin Abdulaziz Airport."
                bgImage="/images/routes/madinah-airport-hero.webp"
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

                    {/* Hotels We Serve — Fix P4-Bug3: hotel name keyword targeting */}
                    <div className="mt-24">
                        <FadeIn delay={0.2}>
                            <div className="max-w-3xl mx-auto text-center">
                                <h3 className="text-2xl font-bold text-white mb-4 font-sans">Hotels We Serve Near Masjid Nabawi</h3>
                                <p className="text-gray-400 leading-relaxed font-light mb-6">
                                    We provide direct transfers from <strong className="text-white">Madinah Airport (PMIA)</strong> to all major hotels in the Markazia District and beyond, including:
                                    <strong className="text-white"> Movenpick Hotel Madinah</strong>, <strong className="text-white">Dar Al Taqwa</strong>, <strong className="text-white">Anwar Al Madinah Movenpick</strong>,
                                    <strong className="text-white"> Oberoi Madinah</strong>, <strong className="text-white">Sheraton Madinah Hotel</strong>, <strong className="text-white">Al Rawda Royal Inn</strong>,
                                    <strong className="text-white"> Hilton Madinah</strong>, <strong className="text-white">Swissôtel Al Maqam</strong>, <strong className="text-white">Pullman Zamzam Madinah</strong>,
                                    and all hotels on <strong className="text-white">King Faisal Road</strong>, <strong className="text-white">Abu Bakr Al-Siddiq Road</strong>, and throughout the <strong className="text-white">Markazia (Central) District</strong>.
                                </p>
                                <p className="text-sm text-gray-500 italic font-light">
                                    Not sure if we cover your hotel? WhatsApp us the hotel name and we will confirm within minutes.
                                </p>
                                <Link
                                    href="/booking"
                                    className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black rounded-full font-bold transition-all text-sm uppercase tracking-wider"
                                >
                                    Book Airport to Hotel Transfer
                                </Link>
                            </div>
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
