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
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332" },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "How long is the Makkah Ziyarat tour?", "acceptedAnswer": { "@type": "Answer", "text": "The standard tour covering 6 main sites takes 3–4 hours. Extended tours covering all 15 sites take 5–6 hours." } },
                { "@type": "Question", "name": "Can we climb Cave Hira?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, but climbing takes 1–2 hours of hiking up Jabal Al-Nour. If you wish to climb, inform us when booking so we adjust the schedule. Elderly passengers can view from the base." } },
                { "@type": "Question", "name": "Is hotel pickup included?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we pick you up from any hotel in Makkah and drop you back after the tour. No extra charges." } },
                { "@type": "Question", "name": "What vehicles are available?", "acceptedAnswer": { "@type": "Answer", "text": "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 250), Toyota Hiace (10 pax, SAR 300), GMC Yukon (7 pax, SAR 400), Toyota Coaster (19 pax, SAR 500)." } },
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
    { question: "What vehicles are available for Makkah Ziyarat?", answer: "Toyota Camry (4 pax, SAR 200), Hyundai H1/Staria (7 pax, SAR 250), Toyota Hiace (10 pax, SAR 300), GMC Yukon (7 pax, SAR 400), and Toyota Coaster (19 pax, SAR 500)." },
    { question: "Can we customize which sites we visit?", answer: "Absolutely. Every tour is private. Choose which of the 15 sites to visit, how long to stay at each, and the order of stops." },
    { question: "Is Makkah Ziyarat suitable for elderly or children?", answer: "Yes. Most sites are accessible from the vehicle or at ground level. Jabal Al-Nour and Thawr require climbing but can be viewed from base. Child seats available free." },
];

export default async function ZiarahMakkahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20Makkah%20Ziyarat`;

    return (
        <main className="min-h-screen bg-bg relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-multiply pointer-events-none z-0" />
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
                theme="light"
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-surface-alt border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {[
                                { vehicle: "Toyota Camry", capacity: "4 pax", price: "SAR 200" },
                                { vehicle: "Hyundai H1", capacity: "7 pax", price: "SAR 250" },
                                { vehicle: "Hyundai Staria", capacity: "7 pax", price: "SAR 250" },
                                { vehicle: "Toyota Hiace", capacity: "10 pax", price: "SAR 300" },
                                { vehicle: "GMC Yukon", capacity: "7 pax", price: "SAR 400" },
                                { vehicle: "Toyota Coaster", capacity: "19 pax", price: "SAR 500" },
                            ].map((v, i) => (
                                <div key={i} className="bg-surface border border-border rounded-xl p-4 hover:border-gold-line transition-all shadow-sm">
                                    <div className="text-gold-strong font-bold text-lg">{v.price}</div>
                                    <div className="text-ink font-semibold text-sm mt-1">{v.vehicle}</div>
                                    <div className="text-muted text-xs">{v.capacity}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-muted mt-4">All prices per vehicle • Fuel, tolls & waiting included • Duration: 3–4 hours</p>
                        <SeasonalPricingNote className="mt-4" />
                    </FadeIn>
                </div>
            </section>

            {/* ── All 15 Makkah Sites ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-3 border-l-[3px] border-gold pl-4">
                            15 Sacred Sites We Visit
                        </h2>
                        <p className="text-body font-normal mb-8 ml-5 max-w-2xl text-lg">
                            Our private Makkah Ziyarat covers every significant Islamic historical site outside the Haram. Tap any location to read its full history.
                        </p>
                        <LocationGrid sites={makkahSites} />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-24 bg-surface-alt border-y border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-[40px] font-semibold mb-16 font-display text-ink">Experience Makkah with Comfort</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
                            {[
                                { icon: <Clock size={26} strokeWidth={1.5} />, title: "Flexible Timing", desc: "Start whenever you want. We recommend early morning after Fajr to avoid heat and crowds." },
                                { icon: <Camera size={26} strokeWidth={1.5} />, title: "Photo Stops", desc: "Take your time to capture memories at Jabal Al-Nour and Arafat without any pressure." },
                                { icon: <BookOpen size={26} strokeWidth={1.5} />, title: "Historical Context", desc: "Multilingual drivers share the Islamic history and significance of each location." },
                                { icon: <Shield size={26} strokeWidth={1.5} />, title: "Licensed & Safe", desc: "Nusuk-registered, fully insured vehicles with professional licensed drivers." },
                                { icon: <Users size={26} strokeWidth={1.5} />, title: "All Group Sizes", desc: "From couples (Camry) to groups of 21 (Coaster) — we have the right vehicle." },
                            ].map((f, i) => (
                                <div key={i} className="group flex flex-col items-center">
                                    <div className="bg-gold-soft w-16 h-16 rounded-full flex items-center justify-center mb-6 text-gold-strong transition-transform duration-300 group-hover:scale-110 shadow-sm">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-3 text-ink font-display">{f.title}</h3>
                                    <p className="text-sm text-body leading-[1.6] font-normal">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16">
                            <Link href="/booking" className="inline-flex items-center justify-center h-[52px] px-8 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn transition-all shadow-sm">
                                Book Makkah Ziyarat <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-24 lg:py-32 bg-bg border-t border-border relative z-10">
                <div className="container mx-auto px-4 max-w-5xl">
                    <FadeIn>
                        <div className="mb-16 text-center max-w-2xl mx-auto">
                            <span className="text-gold font-semibold tracking-[0.14em] uppercase text-[13px] mb-4 block">Tour Guide</span>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-ink font-display leading-[1.15]">Private Makkah Ziyarat Tour — Complete Guide</h2>
                        </div>
                        
                        <div className="columns-1 md:columns-2 gap-10 lg:gap-16 text-body leading-[1.7] font-normal text-base lg:text-[17px]">
                            <p className="mb-6 md:mb-8">
                                <span className="float-left text-6xl lg:text-7xl font-display text-gold-strong leading-[0.8] pr-3 pt-2">A</span>
                                 <strong className="text-ink font-semibold">Makkah Ziyarat tour</strong> is an essential spiritual experience for every Umrah pilgrim. While the rituals of Umrah centre around the Haram and the Kaaba, the blessed city of Makkah is surrounded by sites where pivotal moments of Islamic history unfolded. At <strong className="text-ink font-semibold">Al Kiswah Umrah Transport</strong>, we offer fully private tours covering <strong className="text-ink font-semibold">15 Islamic historical sites</strong> with knowledgeable, multilingual drivers who share the significance of each location.
                            </p>
                            
                            <p className="mb-6 md:mb-8">
                                Our tour begins at <strong className="text-ink font-semibold">Jabal Al-Nour</strong>, the Mountain of Light, where Angel Jibreel (AS) revealed the first verses of the Quran in the Cave of Hira. The journey continues to <strong className="text-ink font-semibold">Jabal Thawr</strong>, where the Prophet (SAW) and Abu Bakr (RA) hid during the Hijra, then on to the vast plains of <strong className="text-ink font-semibold">Arafat</strong> (site of the Farewell Sermon), the tent city of <strong className="text-ink font-semibold">Mina</strong>, and the open skies of <strong className="text-ink font-semibold">Muzdalifah</strong>. We also visit lesser-known but historically rich sites including <strong className="text-ink font-semibold">Masjid Al-Jinn</strong>, <strong className="text-ink font-semibold">Masjid Al-Khayf</strong> (where 70 prophets prayed), and the <strong className="text-ink font-semibold">Hudaybiyyah treaty site</strong> on the Jeddah road.
                            </p>
                            
                            <p className="mb-0">
                                All prices are <strong className="text-ink font-semibold">fixed per vehicle</strong> starting from SAR 200 (sedan) with fuel, tolls, and unlimited waiting included. Choose from our <Link href="/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline transition-colors">Toyota Camry</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-gold-strong hover:text-gold hover:underline transition-colors">GMC Yukon</Link>, <Link href="/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline transition-colors">Hyundai Staria</Link>, or <Link href="/fleet/toyota-hiace" className="text-gold-strong hover:text-gold hover:underline transition-colors">Toyota Hiace</Link>. For the complete Ziyarat experience, see our <Link href="/services/ziyarat-tours" className="text-gold-strong hover:text-gold hover:underline transition-colors">full Ziyarat Tours page</Link> covering Makkah, Madinah, Jeddah &amp; Taif.
                            </p>
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
