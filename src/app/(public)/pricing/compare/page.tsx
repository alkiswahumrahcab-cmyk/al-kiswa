import type { Metadata } from 'next';
import Link from 'next/link';
import { generateMetadataAlternates } from '@/lib/hreflang';
import { X, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { TRUST_METRICS, formatMetric, SOCIAL_LINKS } from '@/config/site';
import FadeIn from '@/components/common/FadeIn';
import Breadcrumbs from '@/components/common/Breadcrumbs';

export const metadata: Metadata = {
    title: 'Al Kiswah vs Third-Party Platforms | Cheapest Umrah Taxi 2026',
    description: 'Compare Al Kiswah direct prices vs international booking platforms for Umrah transfers. We are the actual operator — book direct and save 20–30%. No commission, no middleman.',
    keywords: [
        'umrah taxi alternative',
        'cheaper than platforms jeddah makkah',
        'umrah transport direct operator',
        'umrah taxi without booking fee',
        'direct umrah taxi saudi arabia',
        'jeddah makkah taxi no commission',
        'al kiswah vs booking platforms',
        'cheapest umrah taxi 2026',
    ],
    alternates: generateMetadataAlternates('/pricing/compare'),
    openGraph: {
        title: 'Al Kiswah vs Booking Platforms — Save 20–30% Booking Direct',
        description: 'We supply international booking platforms with vehicles in Saudi Arabia. Book direct with us and skip the commission. Same car, lower price.',
        images: [{ url: '/images/fleet/gmc-yukon-2025.webp', width: 1200, height: 630 }],
    },
};

// ── Data ─────────────────────────────────────────────────────────────────────

const FEATURES = [
    {
        label: 'Platform Commission',
        alkiswah: { text: '0% — You pay us, we drive you', good: true },
        platform: { text: '~20–30% added to every fare', good: false },
    },
    {
        label: 'Fleet Ownership',
        alkiswah: { text: 'Own licensed fleet in Saudi Arabia', good: true },
        platform: { text: 'Subcontracts to local operators', good: false },
    },
    {
        label: 'Price Guarantee',
        alkiswah: { text: 'Fixed at booking — never changes', good: true },
        platform: { text: 'Subject to availability & dynamic pricing', good: false },
    },
    {
        label: 'Driver Contact',
        alkiswah: { text: 'Direct WhatsApp to your driver', good: true },
        platform: { text: 'App messaging or email only', good: false },
    },
    {
        label: 'Hidden Fees',
        alkiswah: { text: 'Zero — tolls, fuel, parking included', good: true },
        platform: { text: 'Luggage fees or taxes may apply', good: false },
    },
    {
        label: 'Cancellation',
        alkiswah: { text: 'Free up to 24h before trip', good: true },
        platform: { text: 'Cancellation or platform fees often apply', good: false },
    },
    {
        label: 'Saudi Hajj License',
        alkiswah: { text: 'Ministry of Hajj & Umrah licensed', good: true },
        platform: { text: 'Not always verified', good: false },
    },
    {
        label: 'Support Channel',
        alkiswah: { text: '24/7 WhatsApp + phone', good: true },
        platform: { text: 'Email or slow app support', good: false },
    },
];

const PRICE_COMPARISON = [
    {
        route: 'Jeddah Airport → Makkah',
        distance: '100 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 50, platform: 68 },
            { type: 'Family Van (7 pax)', alkiswah: 60, platform: 82 },
            { type: 'Minibus 10 pax', alkiswah: 75, platform: 105 },
            { type: 'Minibus 19 pax', alkiswah: 185, platform: 250 },
        ],
    },
    {
        route: 'Jeddah → Makkah',
        distance: '85 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 50, platform: 68 },
            { type: 'Comfort (4 pax)', alkiswah: 60, platform: 81 },
            { type: 'Minibus 7 pax', alkiswah: 78, platform: 105 },
            { type: 'Minibus 19 pax', alkiswah: 185, platform: 250 },
        ],
    },
    {
        route: 'Jeddah → Madinah',
        distance: '413 km',
        vehicles: [
            { type: 'Sedan (3 pax)', alkiswah: 115, platform: 156 },
            { type: 'Family Van (7 pax)', alkiswah: 140, platform: 189 },
            { type: 'Minibus 13 pax', alkiswah: 210, platform: 283 },
        ],
    },
];

const FAQ_ITEMS = [
    {
        q: 'Is Al Kiswah a booking platform or an actual transport operator?',
        a: 'Al Kiswah is an actual transport operator. We own our fleet in Saudi Arabia and are licensed by the Ministry of Hajj & Umrah. When you book with us, you are booking directly with the company providing the car and driver, cutting out the middleman.',
    },
    {
        q: 'Why is booking directly with Al Kiswah cheaper than using international platforms?',
        a: 'International booking platforms do not own vehicles in Saudi Arabia. They take a 20–30% commission on every booking before passing the reservation to local operators like us. By booking at kiswahumrahcab.com directly, you pay the actual transport cost with zero platform markup.',
    },
    {
        q: 'How do I know Al Kiswah prices are real and not bait-and-switch?',
        a: 'Our prices are fixed at the time of booking and legally binding. Unlike platforms that show low initial prices and add taxes or luggage fees at checkout, our prices include all tolls, fuel, parking, and driver fees. No extras on arrival.',
    },
    {
        q: 'Can I trust booking a taxi directly in Saudi Arabia without a platform?',
        a: 'Yes — Al Kiswah has been operating in Saudi Arabia since 2015. We have 5-star Google ratings and have transported over 10,000 pilgrims. We provide instant booking confirmation, driver details via WhatsApp, and free 24-hour cancellation. Direct booking is safer because you speak to the actual operator.',
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
                headline: 'Al Kiswah vs Third-Party Platforms — Umrah Taxi Price Comparison 2026',
                description: 'Detailed price comparison of direct operator Al Kiswah vs middleman platforms for Saudi Arabia Umrah transport.',
                author: { '@type': 'Organization', name: 'Al Kiswah Umrah Transport' },
                datePublished: '2026-01-01',
                dateModified: '2026-04-29',
            },
        ],
    };

    return (
        <main className="min-h-screen bg-bg relative">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── HERO ─────────────────────────────────────────────── */}
            <section className="pt-32 pb-20 relative z-10 bg-surface-alt border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn>
                        <div className="mb-4">
                            <Breadcrumbs theme="light" />
                        </div>
                        <span className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                            Independent Price Comparison · 2026
                        </span>
                        <h1 className="text-4xl md:text-6xl font-display font-black text-ink mb-6 leading-tight">
                            Al Kiswah vs{' '}
                            <span className="text-ink-muted line-through opacity-70">Booking Platforms</span>
                        </h1>
                        <p className="text-xl text-ink max-w-2xl mx-auto mb-4 font-medium">
                            Al Kiswah supplies the actual vehicles to international platforms 
                            for Saudi Arabia routes. Those platforms add{' '}
                            <strong className="text-error">20–30% commission</strong> before you see the price.
                        </p>
                        <p className="text-ink-muted max-w-xl mx-auto mb-10">
                            Book direct with Al Kiswah → same car, same driver, lower price. No platform. No commission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">
                                Book Direct — Best Price
                            </Link>
                            <Link href="/pricing" className="btn-secondary">
                                See All Prices
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SUMMARY STAT BOXES ───────────────────────────────── */}
            <section className="py-16 relative z-10 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                            {[
                                { val: '0%', label: 'Platform Commission' },
                                { val: '20–30%', label: 'Cheaper than Platforms' },
                                { val: `${formatMetric(TRUST_METRICS.pilgrimsServed)}`, label: 'Pilgrims Transported' },
                                { val: `${TRUST_METRICS.googleRating || "5.0"}★`, label: 'Google Rating' },
                            ].map(stat => (
                                <div key={stat.label} className="card p-5 text-center">
                                    <p className="text-3xl font-black mb-1 text-gold">{stat.val}</p>
                                    <p className="text-ink-muted text-xs font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── FULL FEATURE COMPARISON TABLE ────────────────────── */}
            <section className="py-16 relative z-10 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-ink text-center mb-3">
                            Feature-by-Feature Comparison
                        </h2>
                        <p className="text-ink-muted text-center mb-12 max-w-xl mx-auto">
                            The full breakdown of what you actually get when booking direct vs through a third party.
                        </p>

                        <div className="max-w-4xl mx-auto overflow-x-auto card p-0">
                            <table className="w-full text-sm border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-surface-alt border-b border-border">
                                        <th className="text-left py-5 px-6 text-ink-muted font-medium w-[30%]">Feature</th>
                                        <th className="py-5 px-4 text-center w-[35%] border-l border-border">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-gold/15 border border-gold/40 text-gold-strong font-bold px-3 py-1.5 rounded-full text-xs">
                                                    Al Kiswah
                                                </span>
                                                <span className="text-[10px] text-ink-muted mt-1 uppercase tracking-wider font-bold">Direct Operator</span>
                                            </div>
                                        </th>
                                        <th className="py-5 px-4 text-center w-[35%] border-l border-border">
                                            <div className="inline-flex flex-col items-center">
                                                <span className="bg-surface border border-border-strong text-ink font-medium px-3 py-1.5 rounded-full text-xs">
                                                    Other Platforms
                                                </span>
                                                <span className="text-[10px] text-ink-muted mt-1 uppercase tracking-wider font-bold">Middleman</span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FEATURES.map((row, i) => (
                                        <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'}`}>
                                            <td className="py-4 px-6 text-ink font-semibold text-xs md:text-sm">{row.label}</td>
                                            {/* Al Kiswah */}
                                            <td className="py-4 px-4 border-l border-border bg-gold/5">
                                                <div className="flex items-start gap-2 justify-center">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-success/20 text-success">
                                                        <Check size={14} />
                                                    </div>
                                                    <span className="text-ink text-sm leading-tight font-medium text-left">{row.alkiswah.text}</span>
                                                </div>
                                            </td>
                                            {/* Platform */}
                                            <td className="py-4 px-4 border-l border-border">
                                                <div className="flex items-start gap-2 justify-center opacity-80">
                                                    <div className="mt-0.5 shrink-0 p-0.5 rounded-full bg-error/10 text-error">
                                                        <X size={14} />
                                                    </div>
                                                    <span className="text-ink-muted text-sm leading-tight text-left">{row.platform.text}</span>
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
            <section className="py-20 bg-surface-sunken border-y border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-ink text-center mb-3">
                            Price Comparison by Route (USD)
                        </h2>
                        <p className="text-ink-muted text-center mb-12 max-w-xl mx-auto">
                            All prices are per vehicle, private, all-inclusive. Platform prices are estimates based on standard commission rates.
                        </p>

                        <div className="max-w-4xl mx-auto space-y-8">
                            {PRICE_COMPARISON.map((route, ri) => (
                                <div key={ri} className="card overflow-hidden border-border shadow-sm">
                                    {/* Route header */}
                                    <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-surface-alt">
                                        <div className="flex items-center gap-3">
                                            <ArrowRight size={18} className="text-gold-strong" />
                                            <h3 className="text-ink font-bold text-lg">{route.route}</h3>
                                            <span className="text-ink-muted text-sm hidden sm:inline-block">({route.distance})</span>
                                        </div>
                                        <Link
                                            href={`/booking?from=${encodeURIComponent(route.route.split('→')[0].trim())}&to=${encodeURIComponent(route.route.split('→')[1].trim())}`}
                                            className="text-gold-strong text-sm font-bold hover:text-gold transition-colors"
                                        >
                                            Book Direct →
                                        </Link>
                                    </div>

                                    {/* Price rows */}
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-border bg-surface">
                                                    <th className="text-left px-6 py-4 text-ink-muted font-medium w-[40%]">Vehicle</th>
                                                    <th className="text-center px-4 py-4 text-ink font-bold w-[20%] border-l border-border">Al Kiswah</th>
                                                    <th className="text-center px-4 py-4 text-ink-muted font-medium w-[20%] border-l border-border">Other Platforms</th>
                                                    <th className="text-center px-4 py-4 text-success font-bold w-[20%] border-l border-border hidden sm:table-cell">You Save</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {route.vehicles.map((v, vi) => {
                                                    const saveVsPlatform = v.platform - v.alkiswah;
                                                    const savePct = Math.round((saveVsPlatform / v.platform) * 100);
                                                    return (
                                                        <tr key={vi} className={`border-b border-border last:border-0 ${vi % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'}`}>
                                                            <td className="px-6 py-4 text-ink font-medium">{v.type}</td>
                                                            <td className="px-4 py-4 text-center border-l border-border bg-gold/5">
                                                                <span className="text-gold-strong font-black text-lg">${v.alkiswah}</span>
                                                            </td>
                                                            <td className="px-4 py-4 text-center border-l border-border">
                                                                <span className="text-ink-muted line-through">${v.platform}</span>
                                                            </td>
                                                            <td className="px-4 py-4 text-center border-l border-border hidden sm:table-cell bg-success/5">
                                                                <span className="text-success font-bold">
                                                                    ${saveVsPlatform} ({savePct}%)
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────────────── */}
            <section className="py-20 relative z-10 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-ink text-center mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-ink-muted text-center mb-12 max-w-xl mx-auto">
                            Common questions pilgrims ask when comparing Umrah taxi options.
                        </p>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {FAQ_ITEMS.map((item, i) => (
                                <details key={i} className="group card overflow-hidden cursor-pointer">
                                    <summary className="flex items-start justify-between gap-4 p-6 list-none outline-none">
                                        <h3 className="text-ink font-semibold text-base leading-snug group-hover:text-gold-strong transition-colors">{item.q}</h3>
                                        <span className="shrink-0 text-gold text-2xl font-light group-open:rotate-45 transition-transform duration-200 leading-none">+</span>
                                    </summary>
                                    <div className="px-6 pb-6 pt-2">
                                        <p className="text-ink-muted text-sm leading-relaxed">{item.a}</p>
                                    </div>
                                </details>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── BOTTOM CTA (DARK ANCHOR) ─────────────────────────── */}
            <section className="py-20 relative z-10 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto text-center bg-ink-bg rounded-3xl p-12 lg:p-16 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                            <div className="relative z-10">
                                <ShieldCheck size={48} className="text-gold mx-auto mb-6" />
                                <h2 className="text-3xl md:text-4xl font-display font-bold text-on-ink mb-4">
                                    Skip the Platform. Book the Operator.
                                </h2>
                                <p className="text-on-ink-muted mb-10 text-lg max-w-2xl mx-auto">
                                    Al Kiswah owns its fleet in Saudi Arabia. No broker. No markup. <br />
                                    Same vehicle you'd get elsewhere — at the real price.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link href="/booking" className="btn-primary">
                                        Book Now — Instant Confirmation
                                    </Link>
                                    <a
                                        href={SOCIAL_LINKS.whatsapp}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-ghost"
                                    >
                                        WhatsApp for Quote
                                    </a>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
