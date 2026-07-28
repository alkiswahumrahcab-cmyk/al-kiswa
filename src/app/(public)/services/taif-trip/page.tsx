import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Mountain, Trees, ShoppingBag, Shield, Users } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { LocationGrid } from '@/components/ziyarat/LocationGrid';
import { taifSites } from '@/data/ziyarat-locations';
import { FLEET, formatSeats } from '@/data/fleet';

const PRICE_MAP: Record<string, string> = {
    'toyota-camry': 'SAR 400',
    'hyundai-starex': 'SAR 400',
    'hyundai-staria': 'SAR 400',
    'toyota-hiace': 'SAR 500',
    'gmc-yukon-xl': 'SAR 600',
    'toyota-coaster': 'SAR 1200',
    'mitsubishi-xpander': 'SAR 400'
};

export const metadata: Metadata = {
    title: "Taif Day Trip 2026 — Private VIP Tour from Makkah | Al Kiswah",
    description: "Escape the heat with a private day trip to Taif from Makkah. Visit Al Hada Cable Car, Rose Gardens, Al Shafa, and traditional souqs. From SAR 400.",
    keywords: [
        "taif day trip", "makkah to taif", "taif tour from makkah", "al hada cable car",
        "taif rose gardens", "private taxi taif", "taif sightseeing", "al shafa taif",
        "taif mountain trip", "taif tour price", "makkah ziyarat to taif"
    ],
    alternates: generateMetadataAlternates("/services/taif-trip"),
    openGraph: {
        title: "Taif Day Trip 2026 — Private VIP Tour from Makkah | Al Kiswah",
        description: "Full-day mountain escape to Taif's rose gardens and cable cars. Private VIP transport from SAR 400.",
        images: [{ url: '/images/routes/taif.jpg', width: 1200, height: 630, alt: 'Taif Day Trip from Makkah' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/services/taif-trip`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#trip`,
            "name": "Taif Mountain Day Trip — Nature & Heritage Tour",
            "description": "Full-day private tour from Makkah to Taif covering Al Hada cable car, rose gardens, Al Shafa mountain, traditional souq, and Al Rudaf Park.",
            "touristType": ["Umrah Pilgrim", "Tourist"],
            "itinerary": { "@type": "ItemList", "numberOfItems": 6, "itemListElement": taifSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332" },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "400", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "How long is the Taif day trip?", "acceptedAnswer": { "@type": "Answer", "text": "The full trip typically takes 8 to 10 hours including driving time from Makkah. You can spend the whole day exploring." } },
                { "@type": "Question", "name": "Is the cable car ticket included in the price?", "acceptedAnswer": { "@type": "Answer", "text": "No, our price covers the private VIP transportation and driver for the entire day. Entry tickets to attractions like the cable car are purchased separately." } },
                { "@type": "Question", "name": "What is the best time to see the rose gardens?", "acceptedAnswer": { "@type": "Answer", "text": "The famous Taif rose harvesting season is in spring (March to April), but the gardens and factories are beautiful to visit year-round." } },
                { "@type": "Question", "name": "Do we need Ihram to return to Makkah from Taif?", "acceptedAnswer": { "@type": "Answer", "text": "If you are planning to perform Umrah upon returning to Makkah, you must enter Ihram at the Miqat (Qarn Al-Manazil). If you are just returning to your hotel, Ihram is not required." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
                { "@type": "ListItem", "position": 3, "name": "Taif Day Trip", "item": pageUrl },
            ],
        },
    ],
};

const taifFAQs = [
    { question: "How long is the Taif day trip?", answer: "The full trip typically takes 8 to 10 hours including driving time from Makkah. You can spend the whole day exploring without feeling rushed." },
    { question: "Is the cable car ticket included in the price?", answer: "No, our price covers the private VIP transportation, fuel, tolls, and the driver for the entire day. Entry tickets to attractions like the cable car and zoo are purchased separately." },
    { question: "What is the best time to see the rose gardens?", answer: "The famous Taif rose harvesting season is in spring (March to April), but the gardens and factories are beautiful and fragrant to visit year-round." },
    { question: "What vehicles are available for the Taif trip?", answer: FLEET.filter(v => v.bookable).map(v => `${v.name} (${formatSeats(v)}, ${PRICE_MAP[v.id] || 'Contact Us'})`).join(', ') + '.' },
    { question: "Do we need Ihram to return to Makkah from Taif?", answer: "If you are planning to perform Umrah upon returning to Makkah, you must enter Ihram at the Miqat (Qarn Al-Manazil). If you are just returning to your hotel, Ihram is not required." },
];

export default async function TaifTripPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20the%20Taif%20Day%20Trip`;

    return (
        <main className="min-h-screen bg-bg relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Taif Day Trip"
                subtitle="Escape the heat of Makkah with a refreshing mountain getaway. Cable cars, rose gardens, and breathtaking views."
                bgImage="/images/routes/taif.jpg"
                ctaText="Book Your Trip"
                ctaLink={whatsappLink}
                layout="center"
                removeBlur={true}
                breadcrumbs={<Breadcrumbs />}
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-surface-alt border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {FLEET.filter(v => v.bookable).map((v, i) => (
                                <div key={v.id} className="bg-surface border border-border shadow-sm rounded-xl p-4 hover:shadow-md transition-all">
                                    <div className="text-gold-strong font-bold text-lg">{PRICE_MAP[v.id] || 'Contact Us'}</div>
                                    <div className="text-ink font-semibold text-sm mt-1">{v.name}</div>
                                    <div className="text-muted text-xs">{formatSeats(v)}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-muted mt-4">All prices per vehicle • Fuel, tolls & full-day waiting included • Duration: 8–10 hours</p>
                        <SeasonalPricingNote className="mt-4" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Taif Attractions ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-3 border-l-4 border-gold pl-4">
                            Discover the City of Roses
                        </h2>
                        <p className="text-body font-light mb-8 ml-6 max-w-2xl">
                            Our private Taif tour covers the most scenic and famous attractions in the Hejaz mountains. Tap any location to learn more.
                        </p>
                        <LocationGrid sites={taifSites} />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-surface border-y border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-12 font-display text-ink">A Perfect Mountain Escape</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {[
                                { icon: <Mountain size={26} />, title: "Cooler Climate", desc: "Enjoy refreshing mountain air, significantly cooler than Makkah." },
                                { icon: <Trees size={26} />, title: "Nature & Parks", desc: "Explore Al Shafa and Al Rudaf Park for beautiful family picnics." },
                                { icon: <ShoppingBag size={26} />, title: "Local Souqs", desc: "Shop for authentic honey, fresh fruits, and Taif rose oil." },
                                { icon: <Shield size={26} />, title: "Mountain Experts", desc: "Our drivers are highly experienced in navigating the winding mountain roads safely." },
                                { icon: <Users size={26} />, title: "All Group Sizes", desc: "From couples (Camry) to large family groups (Coaster) — we have the right vehicle." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                    <div className="bg-surface-alt w-14 h-14 rounded-btn flex items-center justify-center mx-auto mb-4 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-ink">{f.title}</h3>
                                    <p className="text-xs text-body leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/booking" className="inline-flex items-center bg-gold text-ink px-10 py-4 rounded-btn font-bold transition-all shadow-sm hover:shadow-md hover:bg-gold-light uppercase tracking-[0.15em] text-sm hover:scale-105">
                                Book Taif Trip <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-20 bg-surface-alt border-y border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-6 text-body leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-semibold text-ink font-display text-center mb-6">Private VIP Taif Day Trip from Makkah</h2>
                            <p>Nestled in the Hejaz Mountains at an elevation of nearly 1,900 meters, <strong className="text-ink">Taif</strong> is Saudi Arabia&apos;s unofficial summer capital. Known affectionately as the &quot;City of Roses&quot;, it offers pilgrims and tourists a perfect, cool escape from the intense heat of Makkah. At <strong className="text-ink">Al Kiswah Umrah Transport</strong>, we offer a dedicated full-day mountain trip starting from just <strong className="text-ink">SAR 400</strong>.</p>
                            <p>The journey itself is spectacular as you travel along the winding <strong className="text-ink">Al Hada Mountain road</strong>, passing troops of wild baboons and breathtaking valley viewpoints. Once in Taif, you can ride the famous <strong className="text-ink">Telefrique (cable car)</strong>, visit the historic <strong className="text-ink">Shubra Palace</strong>, and stroll through the vibrant <strong className="text-ink">Taif Central Market</strong> to purchase local honey and fruits.</p>
                            <p>No trip to Taif is complete without visiting the <strong className="text-ink">Rose Gardens</strong>. Every spring, over 900 farms burst into bloom, producing the famous Damascus roses that are harvested to create the precious rose water and oil used to perfume the Holy Kaaba. Whether you travel in a comfortable <Link href="/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline">Toyota Camry</Link> or a spacious <Link href="/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline">Hyundai Staria</Link>, our professional drivers ensure a safe, smooth, and unforgettable 8-10 hour journey.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={taifFAQs} title="Taif Day Trip — Frequently Asked Questions" />
            </div>
        </main>
    );
}
