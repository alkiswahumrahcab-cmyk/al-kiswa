import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Image from 'next/image';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { Plane, Clock, ShieldCheck, MapPin, UserCheck, Smartphone, CheckCircle2, Star, ChevronDown, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AirportQuoteWidget from '@/components/services/airport/AirportQuoteWidget';
import { Metadata } from 'next';
import GlassCard from '@/components/ui/GlassCard';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';

export const metadata: Metadata = {
    title: "Jeddah & Madinah Airport Transfers 2026 | Al Kiswah",
    description: "Private airport transfers from Jeddah (KAIA) and Madinah (PMIA) to your hotel in Makkah or Madinah. We track your flight and meet you at arrivals.",
    alternates: generateMetadataAlternates("/services/airport-transfers"),
    openGraph: {
        title: "Jeddah & Madinah Airport Transfers 2026 | Al Kiswah",
        description: "Private airport transfers from Jeddah (KAIA) and Madinah (PMIA) to your hotel in Makkah or Madinah.",
        images: ["/images/real-fleet/hotel-pickup.jpg"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Jeddah & Madinah Airport Transfers 2026 | Al Kiswah",
        description: "Private airport transfers from Jeddah (KAIA) and Madinah (PMIA) to your hotel in Makkah or Madinah.",
        images: ["/images/real-fleet/hotel-pickup.jpg"],
    }
};

export default function AirportTransfersPage() {
    // Schema.org Structured Data
    const jsonLdService = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Jeddah & Madinah Airport Transfers",
        "provider": {
            "@type": "LocalBusiness",
            "name": "Al Kiswah",
            "image": "https://kiswahumrahcab.com/logo.png"
        },
        "serviceType": "Airport Transfer",
        "areaServed": [
            {
                "@type": "Airport",
                "name": "King Abdulaziz International Airport"
            },
            {
                "@type": "Airport",
                "name": "Prince Mohammad Bin Abdulaziz International Airport"
            }
        ],
        "description": "Premium VIP airport transfer service connecting Jeddah and Madinah airports to holy sites in Makkah and Madinah.",
        "offers": {
            "@type": "Offer",
            "priceCurrency": "SAR",
            "availability": "https://schema.org/InStock"
        }
    };

    const jsonLdFaq = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Where will I meet the driver at Jeddah Airport (KAIA)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our driver will be waiting for you at the arrival terminal holding a sign with your name. We also share the driver's contact details via WhatsApp before you land."
                }
            },
            {
                "@type": "Question",
                "name": "Where do I meet my driver at Madinah Airport (PMIA)?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For PMIA, your driver will wait outside the main arrivals hall with a name board. Madinah airport is smaller, making meet-and-greets very fast."
                }
            },
            {
                "@type": "Question",
                "name": "Do you serve both airports equally?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we provide full 24/7 VIP transfer coverage from both King Abdulaziz International Airport (JED) and Prince Mohammad Bin Abdulaziz International Airport (MED)."
                }
            },
            {
                "@type": "Question",
                "name": "Which vehicle should I choose for my family and luggage?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "For 2-4 passengers with light luggage, a Camry is perfect. For up to 7 passengers, the Staria or GMC is ideal. For larger groups up to 11 with heavy luggage, the HiAce is required."
                }
            },
            {
                "@type": "Question",
                "name": "Is the price per person or per vehicle?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our prices are per vehicle, not per person. The price you see is for the entire car including luggage spaces."
                }
            }
        ]
    };

    const jsonLdBreadcrumb = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
            { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://kiswahumrahcab.com/services" },
            { "@type": "ListItem", "position": 3, "name": "Airport Transfers", "item": "https://kiswahumrahcab.com/services/airport-transfers" }
        ]
    };

    return (
        <main className="bg-bg text-body relative selection:bg-gold/20">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdService) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />

            <Hero
                title="Jeddah & Madinah Airport Transfers"
                subtitle="Private airport transfers from Jeddah (KAIA) and Madinah (PMIA) to your hotel in Makkah or Madinah. We track your flight and meet you at arrivals."
                bgImage="/images/hero/airportransfer.jpg"
                ctaText="Book Transfer Now"
                ctaLink="/booking?service=airport"
                alt="Jeddah and Madinah Airport Transfers"
                removeBlur={true}
                layout="right"
            />

            {/* Instant Quote Section */}
            <section className="relative z-10 -mt-20 mb-24 px-4">
                <div className="container mx-auto flex justify-center">
                    <AirportQuoteWidget />
                </div>
            </section>

            {/* JED and MED Indexable Sections */}
            <section className="py-24 bg-surface-alt border-y border-border">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16">
                        {/* Jeddah (KAIA) */}
                        <FadeIn>
                            <div className="flex flex-col h-full bg-surface p-8 lg:p-12 rounded-2xl border border-border shadow-sm">
                                <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4">King Abdulaziz Int'l</span>
                                <h2 className="text-3xl font-display font-semibold text-ink mb-6">Jeddah Airport Transfer (JED)</h2>
                                <p className="text-body leading-relaxed mb-6">
                                    As the main gateway for pilgrims, KAIA requires efficient navigation. Our chauffeurs meet you right at the designated arrival areas across all terminals (North, South, Terminal 1, and Hajj Terminal). 
                                </p>
                                <ul className="space-y-4 mb-8 text-sm">
                                    <li className="flex items-center gap-3"><MapPin className="text-gold" size={18} /> <strong>Jeddah to Makkah:</strong> ~90 KM (1.5 Hours)</li>
                                    <li className="flex items-center gap-3"><MapPin className="text-gold" size={18} /> <strong>Jeddah to Madinah:</strong> ~420 KM (4.5 Hours)</li>
                                    <li className="flex items-center gap-3"><MapPin className="text-gold" size={18} /> <strong>Jeddah to Taif:</strong> ~150 KM (2 Hours)</li>
                                </ul>
                                <div className="mt-auto pt-6 border-t border-border">
                                    <Link href="/booking?from=Jeddah+Airport&service=transfer" className="text-gold-strong font-bold hover:text-gold flex items-center gap-2">
                                        Book from Jeddah <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Madinah (PMIA) */}
                        <FadeIn delay={0.2}>
                            <div className="flex flex-col h-full bg-surface p-8 lg:p-12 rounded-2xl border border-border shadow-sm">
                                <span className="text-gold font-bold tracking-widest uppercase text-xs mb-4">Prince Mohammad Bin Abdulaziz</span>
                                <h2 className="text-3xl font-display font-semibold text-ink mb-6">Madinah Airport Transfer (MED)</h2>
                                <p className="text-body leading-relaxed mb-6">
                                    Arriving in Madinah is calm and serene. Our drivers wait just outside the main arrivals hall at PMIA with a name board, providing a direct, comfortable journey straight to your hotel in the Markazia or onward to Makkah.
                                </p>
                                <ul className="space-y-4 mb-8 text-sm">
                                    <li className="flex items-center gap-3"><MapPin className="text-gold" size={18} /> <strong>Madinah Airport to City:</strong> ~20 KM (25 Mins)</li>
                                    <li className="flex items-center gap-3"><MapPin className="text-gold" size={18} /> <strong>Madinah to Makkah:</strong> ~450 KM (4.5 Hours)</li>
                                </ul>
                                <div className="mt-auto pt-6 border-t border-border">
                                    <Link href="/booking?from=Madinah+Airport&service=transfer" className="text-gold-strong font-bold hover:text-gold flex items-center gap-2">
                                        Book from Madinah <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-24 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-xs">Our Commitment</span>
                            <h2 className="text-4xl font-semibold mt-4 mb-6 font-display text-ink">
                                Why Book Your Airport Transfer?
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { icon: Clock, title: "Flight Tracking", desc: "We monitor your flight status. Delayed? We wait for free." },
                            { icon: UserCheck, title: "Meet & Greet", desc: "Professional driver waiting with a name sign at arrivals." },
                            { icon: ShieldCheck, title: "Secure & Safe", desc: "Fully licensed vehicles and vetted professional drivers." },
                            { icon: Award, title: "Fixed Pricing", desc: "No hidden fees. Steps are clear and prices are all-inclusive." }
                        ].map((item, idx) => (
                            <GlassCard key={idx} delay={idx * 0.1} className="p-8 bg-surface border-border hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 rounded-full bg-gold-soft flex items-center justify-center mb-6 text-gold">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-3 text-ink font-body">{item.title}</h3>
                                <p className="text-sm text-muted leading-relaxed">
                                    {item.desc}
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 bg-surface-alt border-y border-border">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-semibold font-display text-ink">
                                Seamless Journey in 4 Steps
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-4 gap-8 relative max-w-5xl mx-auto">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-border-strong -z-10" />

                            {[
                                { icon: Smartphone, title: "Book Online", desc: "Select your ride and enter flight details." },
                                { icon: CheckCircle2, title: "Confirmation", desc: "Receive instant confirmation details." },
                                { icon: Plane, title: "We Track", desc: "We allow for flight delays and track arrival." },
                                { icon: UserCheck, title: "Meet & Ride", desc: "Driver meets you at arrivals for a smooth ride." }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center">
                                    <div className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center shadow-sm mb-6 relative">
                                        <step.icon size={20} className="text-gold" />
                                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-ink font-bold text-xs flex items-center justify-center">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-ink font-body">{step.title}</h3>
                                    <p className="text-sm text-muted">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Vehicle Options - Canonical Fleet */}
            <section className="py-24 bg-bg">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-semibold font-display mb-4 text-ink">Choose Your Vehicle</h2>
                            <p className="text-muted text-lg">Select the perfect vehicle for your group size and comfort preferences.</p>
                        </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Staria */}
                        <FadeIn delay={0.1}>
                            <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
                                <div className="h-56 relative bg-surface-alt p-6">
                                    <Image
                                        src="/images/fleet/hyundai-staria.webp"
                                        alt="Hyundai Staria VIP 7-Seater"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-1 border-t border-border">
                                    <h3 className="text-2xl font-bold mb-2 text-ink font-display">Hyundai Staria</h3>
                                    <p className="text-muted text-sm mb-6">Premium comfort for families and groups.</p>
                                    <ul className="text-sm space-y-4 mb-8 text-body flex-1">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 5-7 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 5-7 Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        {/* GMC */}
                        <FadeIn delay={0.2}>
                            <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow relative">
                                <div className="absolute top-4 right-4 bg-gold text-ink text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest z-10">Popular</div>
                                <div className="h-56 relative bg-surface-alt p-6">
                                    <Image
                                        src="/images/fleet/gmc.webp"
                                        alt="GMC Yukon XL VIP Luxury SUV"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-1 border-t border-border">
                                    <h3 className="text-2xl font-bold mb-2 text-ink font-display">VIP GMC Yukon</h3>
                                    <p className="text-muted text-sm mb-6">Luxury and space for VIP travel.</p>
                                    <ul className="text-sm space-y-4 mb-8 text-body flex-1">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> Up to 7 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 5-6 Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        {/* HiAce */}
                        <FadeIn delay={0.3}>
                            <div className="bg-surface rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
                                <div className="h-56 relative bg-surface-alt p-6">
                                    <Image
                                        src="/images/fleet/toyota-hiace-2025.webp"
                                        alt="Toyota HiAce 11-Seater Van"
                                        fill
                                        className="object-contain p-4"
                                    />
                                </div>
                                <div className="p-8 flex flex-col flex-1 border-t border-border">
                                    <h3 className="text-2xl font-bold mb-2 text-ink font-display">Toyota HiAce</h3>
                                    <p className="text-muted text-sm mb-6">Ideal for large groups with extra luggage.</p>
                                    <ul className="text-sm space-y-4 mb-8 text-body flex-1">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 11 Passengers</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> 10-12 Suitcases</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                    <div className="mt-12 text-center max-w-2xl mx-auto">
                        <SeasonalPricingNote />
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-surface-alt border-t border-border">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-4xl font-semibold text-center mb-16 font-display text-ink">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {jsonLdFaq.mainEntity.map((faq, i) => (
                                <div key={i} className="bg-surface border border-border rounded-xl p-6 shadow-sm">
                                    <h3 className="font-bold text-lg mb-2 text-ink flex items-start gap-4">
                                        <span className="text-gold mt-1"><ChevronDown size={18} /></span>
                                        {faq.name}
                                    </h3>
                                    <p className="text-body pl-8">{faq.acceptedAnswer.text}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Final CTA Band */}
            <section className="py-24 bg-ink-bg text-on-ink text-center">
                <div className="container max-w-3xl">
                    <span className="text-gold font-bold tracking-[0.14em] uppercase text-xs block mb-4">Secure Your Ride</span>
                    <h2 className="text-4xl md:text-5xl font-semibold mb-6 font-display">
                        Ready for a Comfortable Journey?
                    </h2>
                    <p className="text-lg mb-10 text-on-ink-muted">
                        Book your trusted airport transport today and let us handle the logistics while you focus on your worship.
                    </p>
                    <Link
                        href="/booking?service=airport"
                        className="inline-flex items-center gap-3 bg-gold hover:bg-gold-strong text-ink px-10 py-4 rounded-btn font-bold transition-all shadow-gold"
                    >
                        Book Your Transfer Now
                        <Plane className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
