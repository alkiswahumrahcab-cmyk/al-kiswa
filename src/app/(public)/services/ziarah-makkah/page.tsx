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
import { makkahSites } from '@/data/ziyarat-locations';

export const metadata: Metadata = {
    title: "Makkah Ziyarat Tour 2026 — 15 Islamic Historical Sites | Al Kiswah",
    description: "Private Makkah Ziyarat tour covering 15 sacred sites: Jabal Al-Nour (Cave Hira), Jabal Thawr, Arafat, Mina, Muzdalifah, Masjid Al-Jinn, Jannat Al-Mu'alla & more. From SAR 200.",
    keywords: [
        "ziyarat makkah", "cave hira tour", "jabal thawr visit", "makkah historical places",
        "private ziyarat taxi makkah", "ziarah makkah", "umrah ziyarat makkah",
        "jabal al-nour transport", "arafat tour", "mina visit makkah",
        "muzdalifah tour", "jannat al-mualla", "masjid al-jinn",
        "makkah guided tour", "holy sites makkah tour", "birthplace prophet muhammad"
    ],
    alternates: generateMetadataAlternates("/services/ziarah-makkah"),
    openGraph: {
        title: "Makkah Ziyarat Tour 2026 — 15 Sacred Sites | Al Kiswah",
        description: "Private tour of 15 Islamic historical sites in Makkah. Jabal Al-Nour, Thawr, Arafat, Mina & more.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Makkah Ziyarat Tour — Jabal Al-Nour' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/services/ziarah-makkah`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#trip`,
            "name": "Makkah Ziyarat Tour — 15 Islamic Historical Sites",
            "description": "Private tour of Makkah's most significant sacred landmarks including Jabal Al-Nour, Jabal Thawr, Arafat, Mina, Muzdalifah, and 10 additional sites.",
            "touristType": "Umrah Pilgrim",
            "itinerary": { "@type": "ItemList", "numberOfItems": 15, "itemListElement": makkahSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966-576-088-555" },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "How long is the Makkah Ziyarat tour?", "acceptedAnswer": { "@type": "Answer", "text": "The standard tour covering 6 main sites takes 3–4 hours. Extended tours covering all 15 sites take 5–6 hours." } },
                { "@type": "Question", "name": "Can we climb Cave Hira?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but climbing takes 1–2 hours of hiking up Jabal Al-Nour. If you wish to climb, inform us when booking so we adjust the schedule. Elderly passengers can view from the base." } },
                { "@type": "Question", "name": "Is hotel pickup included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we pick you up from any hotel in Makkah and drop you back after the tour. No extra charges." } },
                { "@type": "Question", "name": "What vehicles are available?", "acceptedAnswer": { "@type": "Answer", "text": "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 250), Toyota Hiace (10 pax, SAR 300), GMC Yukon (7 pax, SAR 400), Toyota Coaster (21 pax, SAR 500)." } },
                { "@type": "Question", "name": "Can we customize the itinerary?", "acceptedAnswer": { "@type": "Answer", "text": "Absolutely. Every tour is private. Choose which sites to visit, how long to stay, and the order. Discuss your preferences on WhatsApp before booking." } },
                { "@type": "Question", "name": "Is Makkah Ziyarat suitable for elderly?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. Most sites are accessible from the vehicle or at ground level. Jabal Al-Nour and Thawr require climbing but can be viewed from the base. Air-conditioned vehicles throughout." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
                { "@type": "ListItem", "position": 3, "name": "Makkah Ziyarat", "item": pageUrl },
            ],
        },
    ],
};

const makkahFAQs = [
    { question: "How long is the Makkah Ziyarat tour?", answer: "The standard tour covering 6 main sites takes 3–4 hours. Extended tours covering all 15 sites take 5–6 hours. We recommend starting after Fajr to avoid heat." },
    { question: "Can we climb Cave Hira on Jabal Al-Nour?", answer: "Yes, but climbing takes 1–2 hours of hiking. If you wish to climb, inform us when booking so we adjust the schedule. Elderly passengers can view from the base and pray." },
    { question: "Is hotel pickup included in the price?", answer: "Yes, we pick you up from any hotel in Makkah and drop you back after the tour. No extra charges for pickup/drop-off." },
    { question: "What vehicles are available for Makkah Ziyarat?", answer: "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 250), Toyota Hiace (10 pax, SAR 300), GMC Yukon (7 pax, SAR 400), and Toyota Coaster (21 pax, SAR 500)." },
    { question: "Can we customize which sites we visit?", answer: "Absolutely. Every tour is private. Choose which of the 15 sites to visit, how long to stay at each, and the order of stops." },
    { question: "Is Makkah Ziyarat suitable for elderly or children?", answer: "Yes. Most sites are accessible from the vehicle or at ground level. Jabal Al-Nour and Thawr require climbing but can be viewed from base. Child seats available free." },
];

export default async function ZiarahMakkahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20Makkah%20Ziyarat`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Makkah Ziyarat Tour — 15 Sacred Sites"
                subtitle="Walk where revelation began. Private tours of Cave Hira, Jabal Thawr, Arafat, Mina, Muzdalifah & 10 more sacred locations."
                bgImage="/images/hero/pilgrims-walking-makkah-haram.jpg"
                ctaText="Book Makkah Ziyarat"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Private Makkah Ziyarat Tour — Jabal Al-Nour Cave Hira"
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-neutral-900/40 border-b border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {[
                                { vehicle: "Toyota Camry", capacity: "4 pax", price: "SAR 200" },
                                { vehicle: "Hyundai H1", capacity: "7 pax", price: "SAR 250" },
                                { vehicle: "Hyundai Staria", capacity: "7 pax", price: "SAR 250" },
                                { vehicle: "Toyota Hiace", capacity: "10 pax", price: "SAR 300" },
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

            {/* ── All 15 Makkah Sites ── */}
            <section className="py-20 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white font-sans mb-3 border-l-4 border-[#D4AF37] pl-4">
                            15 Sacred Sites We Visit
                        </h2>
                        <p className="text-gray-400 font-light mb-8 ml-6">
                            Our private Makkah Ziyarat covers every significant Islamic historical site outside the Haram. Tap any location to read its full history.
                        </p>
                        <LocationGrid sites={makkahSites} city="makkah" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-black/30 backdrop-blur-sm border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-sans text-white">Experience Makkah with Comfort</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {[
                                { icon: <Clock size={26} />, title: "Flexible Timing", desc: "Start whenever you want. We recommend early morning after Fajr to avoid heat and crowds." },
                                { icon: <Camera size={26} />, title: "Photo Stops", desc: "Take your time to capture memories at Jabal Al-Nour and Arafat without any pressure." },
                                { icon: <BookOpen size={26} />, title: "Historical Context", desc: "Multilingual drivers share the Islamic history and significance of each location." },
                                { icon: <Shield size={26} />, title: "Licensed & Safe", desc: "Nusuk-registered, fully insured vehicles with professional licensed drivers." },
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
                                Book Makkah Ziyarat <ArrowRight size={18} className="ml-2" />
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
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans text-center mb-6">Private Makkah Ziyarat Tour — Complete Guide</h2>
                            <p>A <strong className="text-white">Makkah Ziyarat tour</strong> is an essential spiritual experience for every Umrah pilgrim. While the rituals of Umrah centre around the Haram and the Kaaba, the blessed city of Makkah is surrounded by sites where pivotal moments of Islamic history unfolded. At <strong className="text-white">Al Kiswah Umrah Transport</strong>, we offer fully private tours covering <strong className="text-white">15 Islamic historical sites</strong> with knowledgeable, multilingual drivers who share the significance of each location.</p>
                            <p>Our tour begins at <strong className="text-white">Jabal Al-Nour</strong>, the Mountain of Light, where Angel Jibreel (AS) revealed the first verses of the Quran in the Cave of Hira. The journey continues to <strong className="text-white">Jabal Thawr</strong>, where the Prophet (SAW) and Abu Bakr (RA) hid during the Hijra, then on to the vast plains of <strong className="text-white">Arafat</strong> (site of the Farewell Sermon), the tent city of <strong className="text-white">Mina</strong>, and the open skies of <strong className="text-white">Muzdalifah</strong>. We also visit lesser-known but historically rich sites including <strong className="text-white">Masjid Al-Jinn</strong>, <strong className="text-white">Masjid Al-Khayf</strong> (where 70 prophets prayed), and the <strong className="text-white">Hudaybiyyah treaty site</strong> on the Jeddah road.</p>
                            <p>All prices are <strong className="text-white">fixed per vehicle</strong> starting from SAR 200 (sedan) with fuel, tolls, and unlimited waiting included. Choose from our <Link href="/fleet/toyota-camry" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Camry</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] hover:text-white hover:underline">GMC Yukon</Link>, <Link href="/fleet/hyundai-staria" className="text-[#D4AF37] hover:text-white hover:underline">Hyundai Staria</Link>, or <Link href="/fleet/toyota-hiace" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Hiace</Link>. For the complete Ziyarat experience, see our <Link href="/services/ziyarat-tours" className="text-[#D4AF37] hover:text-white hover:underline">full Ziyarat Tours page</Link> covering Makkah, Madinah, Jeddah &amp; Taif.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={makkahFAQs} title="Makkah Ziyarat — Frequently Asked Questions" />
            </div>
        </main>
    );
}
