import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from 'next';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { Shield, CreditCard, Banknote, AlertCircle, Star, CheckCircle2 } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import FadeIn from '@/components/common/FadeIn';
import LivePricingTable from './LivePricingTable';
import DirectVsMiddleman from '@/components/pricing/DirectVsMiddleman';
import PriceComparisonTable from '@/components/pricing/PriceComparisonTable';
import { settingsService } from '@/services/settingsService';
import { routeService } from '@/services/routeService';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Umrah Taxi Prices 2026 | Jeddah to Makkah — Direct Operator, No Middleman",
    description: "Book direct with Al Kiswah — Saudi Arabia's own licensed Umrah taxi fleet. Jeddah to Makkah from 200 SAR. 20–30% cheaper than Booking.com, Telexo & Kiwi. Fixed price, no hidden fees.",
    keywords: [
        "Jeddah to Makkah Taxi Price 2026",
        "Makkah to Madinah Taxi Fare",
        "Umrah Taxi Rates 2026",
        "Cheap Umrah Taxi no middleman",
        "cheaper than booking.com umrah",
        "cheaper than kiwi taxi umrah",
        "Al Kiswah vs Kiwi Taxi",
        "Al Kiswah vs Telixo",
        "Al Kiswah vs 5Star",
        "Al Kiswah taxi price",
        "GMC Yukon Price Makkah",
        "Taxi Cost Jeddah Airport",
        "direct umrah taxi no commission",
        "Saudi owned taxi fleet",
        "umrah taxi operator not middleman"
    ],
    alternates: generateMetadataAlternates("/pricing"),
    openGraph: {
        title: "Umrah Taxi Prices 2026 | Al Kiswah — Book Direct, No Commission",
        description: "We own our fleet. No middleman. Jeddah to Makkah from 200 SAR — 20% cheaper than Booking.com. Fixed price, WhatsApp support, Saudi-licensed.",
        images: [{ url: '/images/fleet/gmc-yukon-hero-professional.webp', width: 1200, height: 630, alt: 'Al Kiswah Umrah Taxi Pricing — Direct Operator' }]
    }
};

const pricingFAQs = [
    {
        question: "Is Al Kiswah a booking platform or do you own your vehicles?",
        answer: "We own every vehicle in our fleet. Al Kiswah is a licensed ground transport operator based in Makkah, Saudi Arabia — NOT a booking platform, broker, or middleman. When you book with us, you book directly with the company that owns and operates the car."
    },
    {
        question: "Why is Al Kiswah cheaper than Booking.com, Telexo, and Kiwi?",
        answer: "Booking.com, Telexo, and Kiwi add 15–30% commission on top of the transport cost. Because we are the direct operator, there is no middleman taking a cut. You pay us directly, and that's why our prices are consistently 20–30% lower than platform-based services."
    },
    {
        question: "What is the taxi fare from Jeddah Airport to Makkah in 2026?",
        answer: "Our Jeddah Airport (JED) to Makkah taxi starts from 200 SAR (approximately $53 USD) for a private sedan (Toyota Camry/Sonata) for up to 3 passengers. Family Van (Hyundai Staria) and VIP SUV (GMC Yukon XL) options are also available at competitive rates."
    },
    {
        question: "How much does a GMC Yukon taxi cost for Umrah transport?",
        answer: "The GMC Yukon XL VIP SUV is our premium vehicle option. Rates start from approximately 350–450 SAR for Jeddah to Makkah, depending on the route. All prices are fixed and include fuel, tolls, and parking. View exact prices in the table above."
    },
    {
        question: "Are there any hidden fees or extra charges?",
        answer: "None. The price shown is the price you pay. All tolls, highway fees, parking, fuel, and driver fees are included. We do not add fees on arrival. Price is locked at the time of booking."
    },
    {
        question: "Is the price per person or per vehicle?",
        answer: "All prices are per vehicle — you book the entire car for your family group. This means complete privacy and comfort, at a lower per-person cost than shared transfers."
    },
    {
        question: "Can I book an Umrah taxi without paying a platform commission?",
        answer: "Yes — that's exactly what we offer. By booking directly with Al Kiswah at alkiswahumrahtransport.com, you bypass all third-party platforms and pay only the actual transport cost with zero commission added."
    },
    {
        question: "Do prices change during Ramadan or Hajj season?",
        answer: "During peak seasons like Ramadan and Hajj, demand is very high and availability is limited. We recommend booking 2–4 weeks in advance. Our admin team may apply seasonal adjustments, which will be clearly shown on the booking page. WhatsApp us for a direct Ramadan quote."
    },
    {
        question: "Do you accept credit cards and international currencies?",
        answer: "Yes. We accept all major credit and debit cards, PayPal, and cash payment (SAR, USD, EUR, GBP). Online payment is secured with SSL encryption. You can also pay cash directly to the driver on arrival."
    },
    {
        question: "Is Al Kiswah licensed by the Saudi Ministry of Hajj?",
        answer: "Yes. Al Kiswah Umrah Transport is a Ministry of Hajj and Umrah licensed transport company operating out of Makkah, Saudi Arabia. All drivers are licensed, vehicles are regularly inspected, and we comply fully with Saudi transport regulations."
    },
];

function PricingTableSkeleton() {
    return (
        <div className="space-y-8 max-w-6xl mx-auto animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-64 bg-white/5 rounded-3xl border border-white/8" />
            ))}
        </div>
    );
}

export default async function PricingPage() {
    // Fetch exchange rate server-side
    let exchangeRate = 3.75;
    try {
        const rawSettings = await settingsService.getSettings() as any[];
        const rawMap = rawSettings.reduce((acc: Record<string, string>, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);
        if (rawMap['exchange_rate']) {
            exchangeRate = parseFloat(rawMap['exchange_rate']);
        }
    } catch (e) {
        console.error('[PricingPage] failed to fetch exchange rate:', e);
    }

    // Fetch routes for JSON-LD
    let routesForSchema: any[] = [];
    try {
        const routes = await routeService.getActiveRoutes();
        routesForSchema = routes
            .filter(r => r.prices && r.prices.length > 0)
            .map(r => ({
                "@type": "Offer",
                "name": `${r.origin} to ${r.destination} — Private Taxi`,
                "description": `Private Umrah taxi from ${r.origin} to ${r.destination}. Fixed price, no hidden fees. Saudi-licensed fleet.`,
                "price": r.prices?.[0]?.price ?? 0,
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "url": `https://alkiswahumrahtransport.com/booking?route=${r.id}`,
            }));
    } catch (e) {}

    // Static price offers for Google rich snippets (from real operator rates)
    const staticOffers = [
        { name: 'Jeddah Airport to Makkah — Sedan (3 pax)', price: 50, route: 'jeddah-airport-makkah' },
        { name: 'Jeddah Airport to Makkah — Family Van (7 pax)', price: 60, route: 'jeddah-airport-makkah' },
        { name: 'Jeddah Airport to Makkah — Minibus 13 pax', price: 160, route: 'jeddah-airport-makkah' },
        { name: 'Jeddah to Madinah — Sedan (3 pax)', price: 115, route: 'jeddah-madinah' },
        { name: 'Jeddah to Madinah — Family Van (7 pax)', price: 140, route: 'jeddah-madinah' },
        { name: 'Jeddah to Madinah — Minibus 13 pax', price: 210, route: 'jeddah-madinah' },
        { name: 'Jeddah to Makkah — Sedan (3 pax)', price: 50, route: 'jeddah-makkah' },
        { name: 'Jeddah to Riyadh — Sedan (3 pax)', price: 380, route: 'jeddah-riyadh' },
        { name: 'Jeddah to Taif — Sedan (3 pax)', price: 110, route: 'jeddah-taif' },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "@id": "https://kiswahumrahcab.com/#business",
                "name": "Al Kiswah Umrah Transport",
                "description": "Saudi Arabia's own licensed Umrah taxi operator. We own our fleet — no middleman, no commission. Serving Makkah, Madinah, Jeddah and all Umrah routes. We supply vehicles to Kiwi Taxi, Telixo, 5Star and Booking.com — book direct for 20–30% savings.",
                "url": "https://kiswahumrahcab.com",
                "telephone": "+966548707332",
                "priceRange": "$50–$850 USD",
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Makkah",
                    "addressCountry": "SA"
                },
                "areaServed": ["Makkah", "Madinah", "Jeddah", "Riyadh", "Taif", "Saudi Arabia"],
                "sameAs": [
                    "https://wa.me/966548707332"
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Umrah Taxi Direct Prices 2026 — No Commission",
                    "itemListElement": [
                        ...staticOffers.map(o => ({
                            "@type": "Offer",
                            "name": o.name,
                            "price": o.price,
                            "priceCurrency": "USD",
                            "availability": "https://schema.org/InStock",
                            "url": `https://kiswahumrahcab.com/booking?route=${o.route}`,
                            "seller": { "@type": "Organization", "name": "Al Kiswah Umrah Transport" }
                        })),
                        ...routesForSchema
                    ]
                }
            },
            {
                "@type": "FAQPage",
                "mainEntity": pricingFAQs.map(faq => ({
                    "@type": "Question",
                    "name": faq.question,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": faq.answer
                    }
                }))
            }
        ]
    };

    return (
        <main className="min-h-screen bg-primary-black relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="Our Prices. Direct. No Commission."
                subtitle="We own our Saudi fleet. No middleman markup. What you see is what you pay — fixed price, all-inclusive, guaranteed."
                bgImage="https://images.unsplash.com/photo-1631631480669-535cc43f2327?q=80&w=2000&auto=format&fit=crop"
                ctaText="Book Direct Now"
                ctaLink="/booking"
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Al Kiswah Umrah Taxi — Direct Operator Pricing"
            />

            {/* ── LIVE PRICE TABLE ────────────────────────────────── */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="inline-block bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                                Live Prices — Updated from Admin
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6">
                                All Routes &amp; <span className="text-gold-primary">Exact Prices</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Prices below are set directly by our team and update in real time.
                                Every fare includes all taxes, tolls, and fuel — no surprises.
                            </p>
                        </div>

                        <Suspense fallback={<PricingTableSkeleton />}>
                            <LivePricingTable exchangeRate={exchangeRate} />
                        </Suspense>
                    </FadeIn>
                </div>
            </section>

            {/* ── COMPARE LINK STRIP ──────────────────────────────── */}
            <div className="relative z-10 py-4 border-b border-white/5 bg-white/2">
                <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-center">
                    <span className="text-gray-400">We supply Kiwi Taxi, Telixo, 5Star &amp; Booking.com. Book direct and save 20–30%.</span>
                    <Link href="/pricing/compare" className="text-gold-primary font-bold hover:text-white transition-colors whitespace-nowrap">
                        See Full Comparison →
                    </Link>
                </div>
            </div>

            {/* ── DIRECT VS MIDDLEMAN ─────────────────────────────── */}
            <DirectVsMiddleman />

            {/* ── REAL PRICE COMPARISON TABLE ─────────────────────── */}
            <PriceComparisonTable />

            {/* ── TRUST BADGES ────────────────────────────────────── */}
            <section className="py-16 bg-white/5 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { Icon: Shield, title: 'Fixed Rates', sub: 'Price locked at booking' },
                            { Icon: Banknote, title: 'Pay Later', sub: 'Cash to driver accepted' },
                            { Icon: CreditCard, title: 'Secure Online', sub: 'All cards supported' },
                            { Icon: AlertCircle, title: 'Free Cancel', sub: 'Up to 24h before trip' },
                        ].map(({ Icon, title, sub }) => (
                            <div key={title} className="flex flex-col items-center gap-4">
                                <div className="p-4 rounded-full bg-gold-primary/10 text-gold-primary mb-2">
                                    <Icon size={32} />
                                </div>
                                <h4 className="font-bold text-white">{title}</h4>
                                <p className="text-xs text-gray-400">{sub}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SOCIAL PROOF STRIP ──────────────────────────────── */}
            <section className="py-14 relative z-10 border-b border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                            <div>
                                <p className="text-3xl font-black text-white mb-1">10,000+</p>
                                <p className="text-gray-400 text-sm">Pilgrims transported</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div>
                                <div className="flex items-center justify-center md:justify-start gap-1 mb-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-gold-primary fill-gold-primary" />)}
                                    <span className="text-white font-bold ml-2">5.0</span>
                                </div>
                                <p className="text-gray-400 text-sm">Google Reviews — Verified</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black text-white mb-1">0%</p>
                                <p className="text-gray-400 text-sm">Commission. Book direct.</p>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div>
                                <p className="text-3xl font-black text-gold-primary mb-1">SAR · USD</p>
                                <p className="text-gray-400 text-sm">Pay in your currency</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────── */}
            <div className="relative z-10">
                <FAQSection items={pricingFAQs} title="Pricing & Common Questions" />
            </div>

            {/* ── BOTTOM CTA ──────────────────────────────────────── */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gold-primary/10 to-black border border-gold-primary/20 rounded-3xl p-12">
                            <CheckCircle2 size={48} className="text-gold-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Book Direct?
                            </h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                No platform fees. No broker markup. Just a fair price from Saudi Arabia's own Umrah fleet.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/booking"
                                    className="bg-gold-primary text-black font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors uppercase tracking-wider"
                                >
                                    Book Now — Instant Confirmation
                                </Link>
                                <a
                                    href="https://wa.me/966548707332"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-emerald-500 transition-colors uppercase tracking-wider"
                                >
                                    WhatsApp Us
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
