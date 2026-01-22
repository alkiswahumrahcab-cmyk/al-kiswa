import type { Metadata } from 'next';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { Check, HelpCircle, Shield, CreditCard, Banknote, AlertCircle } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import FadeIn from '@/components/common/FadeIn';

export const metadata: Metadata = {
    title: "Umrah Taxi Prices 2026 | Jeddah to Makkah Taxi Fare",
    description: "Transparent 2026 Umrah taxi rates. Check fares for Jeddah Airport to Makkah, Makkah to Madinah, and Ziyarat tours. No hidden fees.",
    keywords: [
        "Jeddah to Makkah Taxi Price",
        "Makkah to Madinah Taxi Fare",
        "Umrah Taxi Rates 2026",
        "Cheap Umrah Taxi",
        "GMC Yukon Price Makkah",
        "Taxi Cost Jeddah Airport"
    ],
    alternates: {
        canonical: '/pricing',
    },
    openGraph: {
        title: "Umrah Transport Pricing 2026 | Best Rates Guaranteed",
        description: "See our fixed rates for Umrah transfers. Jeddah to Makkah from 200 SAR. No hidden charges.",
        images: [{ url: '/images/fleet/gmc-yukon-hero-professional.png', width: 1200, height: 630, alt: 'Umrah Taxi Pricing' }]
    }
};

const pricingRoutes = [
    {
        title: "Jeddah Airport ➔ Makkah",
        price: "200",
        currency: "SAR",
        duration: "1 Hour",
        features: [
            "Meet & Greet at Arrivals",
            "Flight Tracking",
            "60 Mins Free Waiting",
            "Luggage Assistance"
        ],
        link: "/services/jeddah-airport-transfer",
        highlight: true
    },
    {
        title: "Makkah ➔ Madinah",
        price: "450",
        currency: "SAR",
        duration: "4.5 Hours",
        features: [
            "Door-to-Door Service",
            "Prayer Stop at Miqat",
            "Comfort Break Available",
            "Freeway Route"
        ],
        link: "/services/makkah-madinah-taxi",
        highlight: false
    },
    {
        title: "Ziyarat (City Tour)",
        price: "250",
        currency: "SAR",
        duration: "3 Hours",
        features: [
            "Visit Historical Sites",
            "Private Driver Guide",
            "Flexible Photo Stops",
            "Hotel Pickup & Drop"
        ],
        link: "/services/ziyarat-tours",
        highlight: false
    }
];

const vehicles = [
    { name: "Sedan (Camry/Sonata)", capacity: "3 Pax", bags: "2 Bags" },
    { name: "Family Van (H1/Staria)", capacity: "7 Pax", bags: "5 Bags" },
    { name: "VIP SUV (GMC Yukon)", capacity: "7 Pax", bags: "5 Bags", badge: "VIP" }
];

const pricingFAQs = [
    {
        question: "Are there any hidden fees?",
        answer: "No. The price you see is the price you pay. All tolls, parking fees, and fuel are included in the quoted fare."
    },
    {
        question: "Do you accept credit cards?",
        answer: "Yes, you can pay online securely or pay cash to the driver upon arrival. We accept all major currencies (SAR, USD, EUR, GBP)."
    },
    {
        question: "Is the price per person or per vehicle?",
        answer: "The price is per vehicle. You book the entire car for yourself and your family for complete privacy."
    },
    {
        question: "Do prices change during Ramadan?",
        answer: "During high seasons like Ramadan and Hajj, availability is limited and rates may differ. We recommend booking early to lock in the best rate."
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="Transparent & Fair Pricing"
                subtitle="Know your travel costs upfront. No meters, no surprises, just honest, fixed rates for your sacred journey."
                bgImage="https://images.unsplash.com/photo-1631631480669-535cc43f2327?q=80&w=2000&auto=format&fit=crop"
                ctaText="Get Custom Quote"
                ctaLink="/contact"
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Saudi Riyals Payment Pricing"
            />

            {/* Pricing Cards */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold font-sans text-white mb-6">Popular Routes from <span className="text-gold-primary">Starting Rates</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">
                                Rates shown are for standard sedan booking. Upgrade options for GMC Yukon and Staria are available during booking.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {pricingRoutes.map((route, idx) => (
                                <div key={idx} className={`relative p-8 rounded-3xl border transition-all duration-300 group hover:-translate-y-2
                                    ${route.highlight
                                        ? 'bg-gradient-to-b from-white/10 to-black border-gold-primary shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:border-gold-primary/50'
                                    }`}>
                                    {route.highlight && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-primary text-black font-bold px-4 py-1 rounded-full text-sm uppercase tracking-wider shadow-lg">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-bold text-white mb-4">{route.title}</h3>
                                        <div className="flex justify-center items-end gap-1 mb-2">
                                            <span className="text-sm text-gray-400 mb-2">from</span>
                                            <span className="text-5xl font-bold text-gold-primary">{route.price}</span>
                                            <span className="text-xl font-bold text-gray-400 mb-2">{route.currency}</span>
                                        </div>
                                        <p className="text-gray-500 font-light text-sm">{route.duration} • Sedan Class</p>
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {route.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-300 text-sm">
                                                <Check className="text-gold-primary shrink-0" size={18} />
                                                <span>{feat}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={route.link}
                                        className={`block w-full py-4 rounded-xl font-bold text-center uppercase tracking-wider transition-all
                                            ${route.highlight
                                                ? 'bg-gold-primary text-black hover:bg-white hover:shadow-lg'
                                                : 'bg-white/10 text-white hover:bg-gold-primary hover:text-black'
                                            }`}
                                    >
                                        Check Availability
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-16 bg-white/5 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-gold-primary/10 text-gold-primary mb-2">
                                <Shield size={32} />
                            </div>
                            <h4 className="font-bold text-white">Fixed Rates</h4>
                            <p className="text-xs text-gray-400">Price locked at booking</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-gold-primary/10 text-gold-primary mb-2">
                                <Banknote size={32} />
                            </div>
                            <h4 className="font-bold text-white">Pay Later</h4>
                            <p className="text-xs text-gray-400">Cash to driver accepted</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-gold-primary/10 text-gold-primary mb-2">
                                <CreditCard size={32} />
                            </div>
                            <h4 className="font-bold text-white">Secure Online</h4>
                            <p className="text-xs text-gray-400">All cards supported</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 rounded-full bg-gold-primary/10 text-gold-primary mb-2">
                                <AlertCircle size={32} />
                            </div>
                            <h4 className="font-bold text-white">Free Cancel</h4>
                            <p className="text-xs text-gray-400">Up to 24h before trip</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vehicle Comparison */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="max-w-4xl mx-auto bg-neutral-900/50 rounded-3xl p-8 border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-bold text-white mb-8 text-center">Vehicle Class Pricing Difference</h3>
                            <div className="space-y-4">
                                {vehicles.map((v, i) => (
                                    <div key={i} className="flex flex-col md:flex-row justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-400">
                                                <span className="font-bold text-lg">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold flex items-center gap-2">
                                                    {v.name}
                                                    {v.badge && <span className="bg-gold-primary text-black text-[10px] px-2 py-0.5 rounded-full font-bold">{v.badge}</span>}
                                                </h4>
                                                <p className="text-gray-500 text-sm">{v.capacity} • {v.bags}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            {i === 0 ? (
                                                <span className="text-gold-primary font-bold">Standard Rate</span>
                                            ) : (
                                                <span className="text-gray-400 font-light">+ {i === 1 ? '50-100' : '150-200'} SAR approx.</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 text-center">
                                <Link href="/booking" className="text-gold-primary hover:text-white underline text-sm transition-colors">See exact price for your specific date ➔</Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10">
                <FAQSection items={pricingFAQs} title="Pricing & Payment FAQ" />
            </div>
        </main>
    );
}
