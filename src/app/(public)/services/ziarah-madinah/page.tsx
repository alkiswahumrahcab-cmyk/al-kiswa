import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Clock, Camera, Shield, Users, BookOpen } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { LocationGrid } from '@/components/ziyarat/LocationGrid';
import { madinahSites } from '@/data/ziyarat-locations';

export const metadata: Metadata = {
    title: "Madinah Ziyarat Tour 2026 — 14 Islamic Historical Sites | Al Kiswah",
    description: "Private Madinah Ziyarat tour covering 14 sacred sites: Masjid Quba, Mount Uhud, Seven Mosques, Jannat Al-Baqi, Masjid Qiblatain, Badr Battlefield & more. From SAR 200.",
    keywords: [
        "ziyarat madinah", "masjid quba tour", "mount uhud visit", "madinah historical places",
        "private ziyarat taxi madinah", "ziarah madinah", "seven mosques tour madinah",
        "jannat al-baqi visit", "masjid qiblatain", "badr battlefield trip",
        "khandaq trench madinah", "date market madinah", "madinah guided tour",
        "uhud martyrs cemetery", "companion mosques madinah", "madinah ziyarat taxi price"
    ],
    alternates: generateMetadataAlternates("/services/ziarah-madinah"),
    openGraph: {
        title: "Madinah Ziyarat Tour 2026 — 14 Sacred Sites | Al Kiswah",
        description: "Private tour of 14 Islamic historical sites in Madinah. Masjid Quba, Uhud, Seven Mosques & more.",
        images: [{ url: '/images/routes/madinah-airport-hero.webp', width: 1200, height: 630, alt: 'Madinah Ziyarat Tour — Masjid Quba' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/services/ziarah-madinah`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#trip`,
            "name": "Madinah Ziyarat Tour — 14 Islamic Historical Sites",
            "description": "Private tour of Madinah's most significant sacred landmarks including Masjid Quba, Mount Uhud, Seven Mosques, Jannat Al-Baqi, and companion mosques.",
            "touristType": "Umrah Pilgrim",
            "itinerary": { "@type": "ItemList", "numberOfItems": 14, "itemListElement": madinahSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966-576-088-555" },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "How long is the Madinah Ziyarat tour?", "acceptedAnswer": { "@type": "Answer", "text": "The standard tour covering 6 main sites takes 3–4 hours. Extended tours covering all 14 sites plus the Date Market take 5–6 hours." } },
                { "@type": "Question", "name": "Is Masjid Quba included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Masjid Quba is always our first stop. We allow ample time for Wudhu and 2 Rakaats prayer — the Prophet (SAW) said this equals an Umrah reward." } },
                { "@type": "Question", "name": "Can we visit Badr battlefield?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Badr is 150 km from Madinah and can be added as an optional extended trip. This adds approximately 3–4 hours to the tour." } },
                { "@type": "Question", "name": "What vehicles are available?", "acceptedAnswer": { "@type": "Answer", "text": "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 200), Toyota Hiace (10 pax, SAR 250), GMC Yukon (7 pax, SAR 400), Toyota Coaster (21 pax, SAR 500)." } },
                { "@type": "Question", "name": "Is the tour suitable for elderly?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. All sites are at ground level except Mount Uhud (optional climb). We drop elderly passengers at the closest accessible point. Air-conditioned throughout." } },
                { "@type": "Question", "name": "When is Jannat Al-Baqi open?", "acceptedAnswer": { "@type": "Answer", "text": "Jannat Al-Baqi cemetery gates are typically opened after Fajr and after Asr prayers. We schedule the tour to coincide with these times." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
                { "@type": "ListItem", "position": 3, "name": "Madinah Ziyarat", "item": pageUrl },
            ],
        },
    ],
};

const madinahFAQs = [
    { question: "How long is the Madinah Ziyarat tour?", answer: "The standard tour covering Masjid Quba, Mount Uhud, Qiblatayn, Seven Mosques, and Jannat Al-Baqi takes 3–4 hours. Extended tours covering all 14 sites including the Date Market take 5–6 hours." },
    { question: "Is Masjid Quba included?", answer: "Yes. Masjid Quba is always our first stop. We allow ample time for Wudhu and 2 Rakaats prayer — the Prophet (SAW) said this equals an Umrah reward." },
    { question: "Can we visit Badr battlefield?", answer: "Yes. Badr is approximately 150 km from Madinah and can be added as an optional extended trip. This adds 3–4 hours and is charged separately. A deeply moving experience for history enthusiasts." },
    { question: "What vehicles are available for Madinah Ziyarat?", answer: "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 200), Toyota Hiace (10 pax, SAR 250), GMC Yukon (7 pax, SAR 400), and Toyota Coaster (21 pax, SAR 500)." },
    { question: "Is the tour suitable for elderly or families?", answer: "Absolutely. All sites are at ground level except Mount Uhud which has an optional climb. We drop elderly passengers at the closest accessible point. Child seats are available free of charge." },
    { question: "When is Jannat Al-Baqi cemetery open?", answer: "Jannat Al-Baqi gates are typically opened after Fajr and after Asr prayers. We schedule the tour to coincide with these opening times so you can visit and make Dua." },
];

export default async function ZiarahMadinahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20Madinah%20Ziyarat`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Madinah Ziyarat Tour — 14 Sacred Sites"
                subtitle="Explore the City of the Prophet (SAW). Visit Masjid Quba, Mount Uhud, the Seven Mosques, Jannat Al-Baqi & more."
                bgImage="/images/hero/masjid-nabawi-sunset-umbrellas.jpg"
                ctaText="Book Madinah Ziyarat"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Private Madinah Ziyarat Tour — Masjid Quba and Mount Uhud"
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-neutral-900/40 border-b border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {[
                                { vehicle: "Toyota Camry", capacity: "4 pax", price: "SAR 200" },
                                { vehicle: "Hyundai H1", capacity: "7 pax", price: "SAR 200" },
                                { vehicle: "Hyundai Staria", capacity: "7 pax", price: "SAR 200" },
                                { vehicle: "Toyota Hiace", capacity: "10 pax", price: "SAR 250" },
                                { vehicle: "GMC Yukon", capacity: "7 pax", price: "SAR 400" },
                                { vehicle: "Toyota Coaster", capacity: "21 pax", price: "SAR 500" },
                            ].map((v, i) => (
                                <div key={i} className="bg-black/50 border border-white/10 rounded-xl p-4 hover:border-[#D4AF37]/30 transition-all">
                                    <div className="text-[#D4AF37] font-bold text-lg">{v.price}</div>
                                    <div className="text-white font-semibold text-sm mt-1">{v.vehicle}</div>
                                    <div className="text-gray-500 text-xs">{v.capacity}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-4">All prices per vehicle • Fuel, tolls & waiting included • Duration: 3–4 hours</p>
                        <SeasonalPricingNote className="mt-4" />
                    </FadeIn>
                </div>
            </section>

            {/* ── All 14 Madinah Sites ── */}
            <section className="py-20 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-3 border-l-4 border-[#D4AF37] pl-4">
                            14 Sacred Sites We Visit
                        </h2>
                        <p className="text-gray-400 font-light mb-8 ml-6">
                            Our private Madinah Ziyarat covers every significant Islamic site in the Prophet&apos;s city. Tap any location to read its full history and significance.
                        </p>
                        <LocationGrid sites={madinahSites} city="madinah" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-black/30 backdrop-blur-sm border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-sans text-white">The City of Peace — Your Way</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {[
                                { icon: <Clock size={26} />, title: "Ample Time for Dua", desc: "We ensure enough time at Uhud and Quba to pray and reflect without rushing." },
                                { icon: <BookOpen size={26} />, title: "Knowledgeable Drivers", desc: "Our drivers know the history and etiquette of visiting these sacred places." },
                                { icon: <Camera size={26} />, title: "Photo Stops", desc: "Capture memories at Mount Uhud, Masjid Quba, and the Seven Mosques." },
                                { icon: <Shield size={26} />, title: "Licensed & Safe", desc: "Nusuk-registered, fully insured vehicles with professional drivers." },
                                { icon: <Users size={26} />, title: "All Group Sizes", desc: "From couples (Camry) to groups of 21 (Coaster) — we have the right vehicle." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all hover:bg-white/10 group">
                                    <div className="bg-[#D4AF37]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-white">{f.title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.15em] text-sm text-black hover:scale-105">
                                Book Madinah Ziyarat <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-20 bg-neutral-900/50 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-6 text-gray-300 leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans text-center mb-6">Private Madinah Ziyarat Tour — Complete Guide</h2>
                            <p>Madinah Al-Munawwarah — the Illuminated City — holds a special place in every Muslim&apos;s heart. Beyond the magnificent <strong className="text-white">Masjid An-Nabawi</strong>, the city is filled with sacred sites that connect you to the earliest days of Islam. At <strong className="text-white">Al Kiswah Umrah Transport</strong>, we offer fully private tours covering <strong className="text-white">14 Islamic historical sites</strong> with multilingual drivers who share the significance of each location.</p>
                            <p>Our Madinah tour always begins at <strong className="text-white">Masjid Quba</strong> — the first mosque built in Islam. The Prophet (SAW) said that praying two Rakaats here equals an Umrah. We continue to <strong className="text-white">Mount Uhud</strong> and the Martyrs&apos; Cemetery where Hamza (RA), the Lion of Allah, rests alongside 70 companions. The <strong className="text-white">Seven Mosques</strong> complex marks the Battle of the Trench, and <strong className="text-white">Masjid Al-Qiblatayn</strong> is where the direction of prayer changed forever. We also visit <strong className="text-white">Jannat Al-Baqi</strong> (10,000+ companions), the companion mosques, and the famous <strong className="text-white">Date Market</strong> where you can buy Ajwa dates that the Prophet (SAW) recommended.</p>
                            <p>Prices start from <strong className="text-white">SAR 200</strong> per vehicle. Choose from our <Link href="/fleet/toyota-camry" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Camry</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] hover:text-white hover:underline">GMC Yukon</Link>, <Link href="/fleet/hyundai-staria" className="text-[#D4AF37] hover:text-white hover:underline">Hyundai Staria</Link>, or <Link href="/fleet/toyota-hiace" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Hiace</Link>. For the complete Ziyarat experience across all cities, see our <Link href="/services/ziyarat-tours" className="text-[#D4AF37] hover:text-white hover:underline">full Ziyarat Tours page</Link> covering Makkah, Madinah, Jeddah &amp; Taif.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={madinahFAQs} title="Madinah Ziyarat — Frequently Asked Questions" />
            </div>
        </main>
    );
}
