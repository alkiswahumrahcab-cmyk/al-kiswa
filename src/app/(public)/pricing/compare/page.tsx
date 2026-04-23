import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadataAlternates } from '@/lib/hreflang';
import { Check, X, ArrowRight, TrendingDown, ShieldCheck, Star, Zap } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Al Kiswah vs Kiwi Taxi vs Booking.com | Cheapest Umrah Taxi 2026',
    description: 'Compare Al Kiswah direct prices vs Kiwi Taxi, Booking.com, Telexo & Viator for Umrah transfers. We are the actual operator — book direct and save 20–30%. No commission, no middleman.',
    keywords: [
        'kiwi taxi alternative umrah',
        'cheaper than kiwi taxi jeddah makkah',
        'booking.com umrah taxi alternative',
        'telixo alternative umrah transport',
        '5star umrah taxi alternative',
        'umrah taxi without booking fee',
        'direct umrah taxi saudi arabia',
        'jeddah makkah taxi no commission',
        'al kiswah vs kiwi taxi',
        'al kiswah vs telixo',
        'al kiswah vs 5star',
        'umrah transport direct operator',
        'cheapest umrah taxi 2026',
    ],
    alternates: generateMetadataAlternates('/pricing/compare'),
    openGraph: {
        title: 'Al Kiswah vs Kiwi Taxi / Telixo / 5Star — Save 20–30% Booking Direct',
        description: 'We supply Kiwi Taxi, Telixo, 5Star & Booking.com with vehicles in Saudi Arabia. Book direct with us and skip the commission. Same car, lower price.',
        images: [{ url: '/images/fleet/gmc-yukon-hero-professional.png', width: 1200, height: 630 }],
    },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
    {
        label: 'Platform Commission',
        alkiswah: { text: '0% — You pay us, we drive you', good: true },
        kiwi: { text: '~20–30% added to every fare', good: false },
        booking: { text: '~25–30% platform fee', good: false },
        telexo: { text: '~15–25% markup', good: false },
    },
    {
        label: 'Fleet Ownership',
        alkiswah: { text: 'Own licensed fleet in Saudi Arabia', good: true },
        kiwi: { text: 'Subcontracts local operators', good: false },
        booking: { text: 'Random 3rd-party drivers', good: false },
        telexo: { text: 'Partner network, not owned', good: false },
    },
    {
        label: 'Price Guarantee',
        alkiswah: { text: 'Fixed at booking — never changes', good: true },
        kiwi: { text: 'May vary at checkout', good: false },
        booking: { text: 'Subject to availability changes', good: false },
        telexo: { text: 'Dynamic pricing can increase', good: false },
    },
    {
        label: 'Driver Contact',
        alkiswah: { text: 'Direct WhatsApp to your driver', good: true },
        kiwi: { text: 'Via platform app only', good: false },
        booking: { text: 'Email ticket system', good: false },
        telexo: { text: 'App messaging only', good: false },
    },
    {
        label: 'Hidden Fees',
        alkiswah: { text: 'Zero — tolls, fuel, parking included', good: true },
        kiwi: { text: 'Luggage fees may apply', good: false },
        booking: { text: 'Taxes added at checkout', good: false },
        telexo: { text: 'Extras billed on arrival', good: false },
    },
    {
        label: 'Cancellation',
        alkiswah: { text: 'Free up to 24h before trip', good: true },
        kiwi: { text: 'Platform fee retained', good: false },
        booking: { text: 'Varies by provider', good: false },
        telexo: { text: 'Cancellation fee applies', good: false },
    },
    {
        label: 'Saudi Hajj License',
        alkiswah: { text: 'Ministry of Hajj & Umrah licensed', good: true },
        kiwi: { text: 'Not always verified', good: false },
        booking: { text: 'Partner dependent', good: false },
        telexo: { text: 'Not always verified', good: false },
    },
    {
        label: 'Support Channel',
        alkiswah: { text: '24/7 WhatsApp + phone', good: true },
        kiwi: { text: 'App support during business hours', good: false },
        booking: { text: 'Email only, slow response', good: false },
        telexo: { text: 'App chat only', good: false },
    },
];

const PRICE_COMPARISON = [
    {
        route: 'Jeddah Airport → Makkah',
        distance: '100 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 50, kiwi: 65, booking: 70 },
            { type: 'Family Van (7 pax)', alkiswah: 60, kiwi: 78, booking: 85 },
            { type: 'Minibus 10 pax', alkiswah: 75, kiwi: 97, booking: 108 },
        ],
    },
    {
        route: 'Jeddah → Makkah',
        distance: '85 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 50, kiwi: 65, booking: 70 },
            { type: 'Comfort (4 pax)', alkiswah: 60, kiwi: 78, booking: 84 },
            { type: 'Minibus 7 pax', alkiswah: 78, kiwi: 101, booking: 109 },
        ],
    },
    {
        route: 'Jeddah → Madinah',
        distance: '413 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 115, kiwi: 150, booking: 162 },
            { type: 'Family Van (7 pax)', alkiswah: 140, kiwi: 182, booking: 196 },
            { type: 'Minibus 13 pax', alkiswah: 210, kiwi: 273, booking: 294 },
        ],
    },
    {
        route: 'Jeddah → Riyadh',
        distance: '960 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 380, kiwi: 494, booking: 532 },
            { type: 'Comfort (4 pax)', alkiswah: 420, kiwi: 546, booking: 588 },
        ],
    },
    {
        route: 'Jeddah → Taif',
        distance: '186 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 110, kiwi: 143, booking: 154 },
            { type: 'Comfort (4 pax)', alkiswah: 125, kiwi: 163, booking: 175 },
        ],
    },
];

const FAQ_ITEMS = [
    {
        q: 'Is Al Kiswah the same company as Kiwi Taxi in Saudi Arabia?',
        a: 'No — but Al Kiswah is one of the operators that supplies vehicles to platforms like Kiwi Taxi for Saudi Arabia routes. When you book Umrah transport on Kiwi Taxi, the actual car and driver may come from Al Kiswah or similar local operators. Kiwi then adds their commission. By booking at alkiswahumrahtransport.com directly, you get the same car and driver at the base operator price — no platform fee.',
    },
    {
        q: 'Why is Al Kiswah cheaper than Kiwi Taxi for Jeddah to Makkah?',
        a: 'Kiwi Taxi does not own vehicles in Saudi Arabia — they are a booking platform. They take 20–30% commission on every booking. Al Kiswah owns its fleet in Makkah, Saudi Arabia, so you pay the actual transport cost with zero platform markup. For Jeddah Airport to Makkah, Al Kiswah charges $50 USD (sedan). The same route on Kiwi Taxi costs approximately $65 USD — a $15 difference for the exact same service.',
    },
    {
        q: 'Does Booking.com use Al Kiswah as a transport provider?',
        a: 'Booking.com partners with local Saudi operators for Umrah transport. Al Kiswah is a Ministry of Hajj licensed operator in Makkah. Booking direct cuts out the Booking.com platform fee (typically 25–30%), reducing your cost significantly. For Jeddah to Madinah, Booking.com may charge $162+ USD where Al Kiswah direct is $115 USD — the same vehicle, the same driver, $47 less.',
    },
    {
        q: 'How do I know Al Kiswah prices are real and not bait-and-switch?',
        a: 'Our prices are fixed at the time of booking and legally binding. We are licensed by the Saudi Ministry of Hajj & Umrah. Unlike platforms that show low prices and add taxes at checkout, our prices include all tolls, fuel, parking, and driver fees. No extras on arrival. Price confirmation is sent instantly via WhatsApp and email.',
    },
    {
        q: 'What is the cheapest way to get a taxi from Jeddah Airport to Makkah?',
        a: 'The cheapest way is to book direct with a Saudi-licensed operator like Al Kiswah. A private sedan from Jeddah Airport (JED) to Makkah starts at $50 USD (approximately 188 SAR). This is 20–30% less than booking the same route through Kiwi Taxi ($65), Booking.com ($70), or Telexo. Go to alkiswahumrahtransport.com/booking or WhatsApp +966 54 870 7332.',
    },
    {
        q: 'Can I trust booking a taxi directly in Saudi Arabia without a platform?',
        a: 'Yes — Al Kiswah has been operating in Saudi Arabia since 2015. We are Ministry of Hajj & Umrah licensed, have 5-star Google ratings, and have transported over 10,000 pilgrims. We provide instant booking confirmation, driver details via WhatsApp, and free 24-hour cancellation. Direct booking is safer than platforms because you speak to the actual operator.',
    },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ComparePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'FAQPage',
                mainEntity: FAQ_ITEMS.map(item => ({
                    '@type': 'Question',
                    name: item.q,
                    acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
            },
            {
                '@type': 'Article',
                headline: 'Al Kiswah vs Kiwi Taxi vs Booking.com — Umrah Taxi Price Comparison 2026',
                description: 'Detailed price comparison of direct operator Al Kiswah vs middleman platforms Kiwi Taxi and Booking.com for Saudi Arabia Umrah transport.',
                author: { '@type': 'Organization', name: 'Al Kiswah Umrah Transport' },
                datePublished: '2026-01-01',
                dateModified: new Date().toISOString().split('T')[0],
            },
        ],
    };

    return (
        <main className="min-h-screen bg-primary-black relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="pt-32 pb-20 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <div className="mb-4">
                            <Breadcrumbs />
                        </div>
                        <span className="inline-block bg-gold-primary/10 border border-gold-primary/30 text-gold-primary text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Independent Price Comparison · 2026
                        </span>
                        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                            Al Kiswah vs{' '}
                            <span className="text-red-400 line-through opacity-70">Kiwi Taxi</span>{' '}
                            <span className="text-red-400 line-through opacity-70">Telixo</span>{' '}
                            <span className="text-red-400 line-through opacity-70">5Star</span>
                        </h1>
                        {/* Platforms we supply */}
                        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
                            <span className="text-gray-500 text-xs uppercase tracking-widest">We power:</span>
                            {['Kiwi Taxi', 'Telixo', '5Star', 'Booking.com'].map(p => (
                                <span key={p} className="bg-white/5 border border-white/10 text-gray-400 text-xs font-medium px-3 py-1.5 rounded-full">
                                    {p}
                                </span>
                            ))}
                        </div>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
                            Al Kiswah supplies the actual vehicles to Kiwi Taxi, Telixo, 5Star and Booking.com
                            for Saudi Arabia routes. Those platforms add{' '}
                            <strong className="text-red-400">20–30% commission</strong> before you see the price.
                        </p>
                        <p className="text-gray-500 max-w-xl mx-auto mb-10">
                            Book direct with Al Kiswah → same car, same driver, lower price. No platform. No commission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="bg-gold-primary text-black font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors uppercase tracking-wider">
                                Book Direct — Best Price
                            </Link>
                            <Link href="/pricing" className="bg-white/8 border border-white/15 text-white font-semibold px-10 py-4 rounded-xl hover:bg-white/15 transition-colors">
                                See All Prices
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SUMMARY STAT BOXES ───────────────────────────────── */}
            <section className="pb-16 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {[
                                { val: '0%', label: 'Platform Commission', color: 'text-gold-primary' },
                                { val: '20–30%', label: 'Cheaper than Kiwi Taxi', color: 'text-emerald-400' },
                                { val: '10,000+', label: 'Pilgrims Transported', color: 'text-white' },
                                { val: '5.0★', label: 'Google Rating', color: 'text-gold-primary' },
                            ].map(stat => (
                                <div key={stat.label} className="bg-white/5 border border-white/8 rounded-2xl p-5 text-center">
                                    <p className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.val}</p>
                                    <p className="text-gray-400 text-xs">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── FULL FEATURE COMPARISON TABLE ────────────────────── */}
            <section className="py-16 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                            Feature-by-Feature Comparison
                        </h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                            The full breakdown of what you actually get when booking each platform.
                        </p>

                        <div className="max-w-5xl mx-auto overflow-x-auto">
                            <table className="w-full text-sm border-collapse min-w-[700px]">
                                <thead>
                                    <tr>
                                        <th className="text-left py-4 px-4 text-gray-400 font-medium w-[22%]">Feature</th>
                                        <th className="py-4 px-3 text-center w-[22%]">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-gold-primary/15 border border-gold-primary/40 text-gold-primary font-bold px-3 py-2 rounded-xl text-xs">
                                                    Al Kiswah
                                                </span>
                                                <span className="text-[10px] text-gray-500 mt-1">Direct Operator</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-3 text-center w-[19%]">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-white/5 border border-white/10 text-gray-300 font-medium px-3 py-2 rounded-xl text-xs">
                                                    Kiwi Taxi
                                                </span>
                                                <span className="text-[10px] text-gray-500 mt-1">Platform</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-3 text-center w-[19%]">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-white/5 border border-white/10 text-gray-300 font-medium px-3 py-2 rounded-xl text-xs">
                                                    Telixo
                                                </span>
                                                <span className="text-[10px] text-gray-500 mt-1">Platform</span>
                                            </div>
                                        </th>
                                        <th className="py-4 px-3 text-center w-[18%]">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-white/5 border border-white/10 text-gray-300 font-medium px-3 py-2 rounded-xl text-xs">
                                                    5Star / Booking
                                                </span>
                                                <span className="text-[10px] text-gray-500 mt-1">Platform</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FEATURES.map((row, i) => (
                                        <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                                            <td className="py-4 px-4 text-gray-300 font-medium text-xs">{row.label}</td>
                                            {/* Al Kiswah */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-start gap-1.5">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                                                        <Check size={11} />
                                                    </div>
                                                    <span className="text-emerald-400 text-xs leading-tight">{row.alkiswah.text}</span>
                                                </div>
                                            </td>
                                            {/* Kiwi */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-start gap-1.5">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-red-500/20 text-red-400">
                                                        <X size={11} />
                                                    </div>
                                                    <span className="text-red-400 text-xs leading-tight">{row.kiwi.text}</span>
                                                </div>
                                            </td>
                                            {/* Telixo — same model as Kiwi */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-start gap-1.5">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-red-500/20 text-red-400">
                                                        <X size={11} />
                                                    </div>
                                                    <span className="text-red-400 text-xs leading-tight">{row.telexo.text}</span>
                                                </div>
                                            </td>
                                            {/* 5Star / Booking.com */}
                                            <td className="py-3 px-3">
                                                <div className="flex items-start gap-1.5">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-red-500/20 text-red-400">
                                                        <X size={11} />
                                                    </div>
                                                    <span className="text-red-400 text-xs leading-tight">{row.booking.text}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── USD PRICE TABLE BY ROUTE ─────────────────────────── */}
            <section className="py-16 bg-white/3 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                            Price Comparison by Route (USD)
                        </h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                            All prices are per vehicle, private, all-inclusive. Platform prices are estimates based on standard commission rates.
                        </p>

                        <div className="max-w-5xl mx-auto space-y-6">
                            {PRICE_COMPARISON.map((route, ri) => (
                                <div key={ri} className="bg-neutral-900/60 border border-white/8 rounded-2xl overflow-hidden">
                                    {/* Route header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-black/20">
                                        <div className="flex items-center gap-3">
                                            <ArrowRight size={16} className="text-gold-primary" />
                                            <h3 className="text-white font-bold">{route.route}</h3>
                                            <span className="text-gray-500 text-sm">{route.distance}</span>
                                        </div>
                                        <Link
                                            href={`/booking?from=${encodeURIComponent(route.route.split('→')[0].trim())}&to=${encodeURIComponent(route.route.split('→')[1].trim())}`}
                                            className="text-gold-primary text-xs font-bold hover:text-white transition-colors"
                                        >
                                            Book Direct →
                                        </Link>
                                    </div>

                                    {/* Price rows */}
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="text-left px-6 py-3 text-gray-400 font-medium">Vehicle</th>
                                                <th className="text-center px-4 py-3 text-gold-primary font-bold">Al Kiswah</th>
                                                <th className="text-center px-4 py-3 text-gray-400 font-medium">Kiwi Taxi</th>
                                                <th className="text-center px-4 py-3 text-gray-400 font-medium hidden md:table-cell">Booking.com</th>
                                                <th className="text-center px-4 py-3 text-emerald-400 font-medium hidden md:table-cell">You Save</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {route.vehicles.map((v, vi) => {
                                                const saveVsKiwi = v.kiwi - v.alkiswah;
                                                const savePct = Math.round((saveVsKiwi / v.kiwi) * 100);
                                                return (
                                                    <tr key={vi} className={`border-b border-white/5 last:border-0 ${vi % 2 === 0 ? 'bg-white/2' : ''}`}>
                                                        <td className="px-6 py-3 text-gray-300">{v.type}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="text-gold-primary font-black text-base">${v.alkiswah}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <span className="text-gray-400 line-through">${v.kiwi}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center hidden md:table-cell">
                                                            <span className="text-gray-500 line-through">${v.booking}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center hidden md:table-cell">
                                                            <span className="bg-emerald-500/15 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">
                                                                ${saveVsKiwi} ({savePct}%)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────── */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
                            Common questions pilgrims ask when comparing Umrah taxi options.
                        </p>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {FAQ_ITEMS.map((item, i) => (
                                <details key={i} className="group bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
                                    <summary className="flex items-start justify-between gap-4 cursor-pointer p-6 list-none">
                                        <h3 className="text-white font-semibold text-sm md:text-base leading-snug">{item.q}</h3>
                                        <span className="shrink-0 text-gold-primary text-xl font-light group-open:rotate-45 transition-transform duration-200 mt-0.5">+</span>
                                    </summary>
                                    <div className="px-6 pb-6">
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── BOTTOM CTA ──────────────────────────────────────── */}
            <section className="py-20 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-gold-primary/10 to-black border border-gold-primary/20 rounded-3xl p-12">
                            <ShieldCheck size={48} className="text-gold-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Skip the Platform. Book the Operator.
                            </h2>
                            <p className="text-gray-400 mb-8 text-lg">
                                Al Kiswah owns its fleet in Saudi Arabia. No broker. No markup. <br />
                                Same vehicle you'd get on Kiwi Taxi — at the real price.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/booking" className="bg-gold-primary text-black font-bold px-10 py-4 rounded-xl hover:bg-white transition-colors uppercase tracking-wider">
                                    Book Now — Instant Confirmation
                                </Link>
                                <a
                                    href="https://wa.me/966548707332"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-emerald-500 transition-colors uppercase tracking-wider"
                                >
                                    WhatsApp for Quote
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
