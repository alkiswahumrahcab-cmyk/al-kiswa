import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Map, Briefcase, Stethoscope, ShieldCheck, Clock, UserCheck, Car } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { FLEET, formatSeats } from '@/data/fleet';

const HOURLY_PRICE_MAP: Record<string, string> = {
    'toyota-camry': 'SAR 80/hr',
    'hyundai-starex': 'SAR 100/hr',
    'hyundai-staria': 'SAR 100/hr',
    'toyota-hiace': 'SAR 150/hr',
    'gmc-yukon-xl': 'SAR 150/hr',
    'toyota-coaster': 'SAR 300/hr',
    'mitsubishi-xpander': 'SAR 80/hr'
};

export const metadata: Metadata = {
    title: "Hourly Chauffeur Service in Makkah & Madinah | Al Kiswah",
    description: "Hire a private VIP car with a professional chauffeur by the hour. Perfect for shopping, business, medical appointments, or custom tours. Minimum 4 hours.",
    keywords: [
        "hourly chauffeur makkah", "private car hire madinah", "hourly car rental with driver saudi arabia",
        "vip chauffeur makkah", "rent car by hour madinah", "shopping transport makkah",
        "custom ziyarat makkah", "business chauffeur saudi arabia"
    ],
    alternates: generateMetadataAlternates("/services/hourly-chauffeur"),
    openGraph: {
        title: "Hourly Chauffeur Service in Makkah & Madinah | Al Kiswah",
        description: "Hire a private VIP car with a professional chauffeur by the hour. Perfect for shopping, business, and custom ziyarats.",
        images: [{ url: '/images/routes/hourly-chauffeurs.jpg', width: 1200, height: 630, alt: 'Hourly Chauffeur Service' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/services/hourly-chauffeur`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service", "@id": `${pageUrl}#service`,
            "name": "Private Hourly Chauffeur Service",
            "description": "Professional VIP chauffeur service available for hourly hire in Makkah and Madinah for shopping, business, and custom tours. Minimum 4 hours required.",
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332" },
            "areaServed": ["Makkah", "Madinah", "Jeddah"],
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "80", "priceSpecification": { "@type": "UnitPriceSpecification", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "HUR" } } },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "What is the minimum booking time for the hourly service?", "acceptedAnswer": { "@type": "Answer", "text": "The minimum booking duration is 4 hours for all our hourly chauffeur services." } },
                { "@type": "Question", "name": "Can the driver wait for me while I shop?", "acceptedAnswer": { "@type": "Answer", "text": "Yes! That is exactly what this service is for. The driver will drop you off, wait in the parking area, and be ready whenever you finish." } },
                { "@type": "Question", "name": "Can I use the hourly service to travel between cities?", "acceptedAnswer": { "@type": "Answer", "text": "The hourly service is designed for travel within the same city (e.g., inside Makkah or inside Madinah). Intercity travel is charged as a standard one-way transfer route." } },
                { "@type": "Question", "name": "Do the drivers speak English?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide professional drivers who are fluent in English, Arabic, and Urdu to ensure smooth communication throughout your booking." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
                { "@type": "ListItem", "position": 3, "name": "Hourly Chauffeur", "item": pageUrl },
            ],
        },
    ],
};

const hourlyFAQs = [
    { question: "What is the minimum booking time?", answer: "The minimum booking duration is 4 hours for all our hourly chauffeur services." },
    { question: "Can the driver wait for me while I shop?", answer: "Yes! That is exactly what this service is for. Your driver will drop you off at your destination, wait in the parking area, and be immediately ready whenever you wish to leave or move to a new location." },
    { question: "Can I use the hourly service to travel between cities?", answer: "The hourly service is designed for travel within the same city (e.g., inside Makkah, Jeddah, or Madinah). For travel between cities, please book our standard intercity transfer routes." },
    { question: "Do the drivers speak English?", answer: "Yes, we provide professional, polite drivers who are fluent in English, Arabic, and Urdu to ensure smooth communication throughout your booking." },
    { question: "Are fuel and parking fees included?", answer: "Fuel is fully included in the hourly rate. However, paid parking fees (such as underground mall parking) are the responsibility of the passenger if they request the driver to park inside." },
];

export default async function HourlyChauffeurPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20a%20private%20chauffeur%20by%20the%20hour`;

    return (
        <main className="min-h-screen bg-bg relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Private Hourly Chauffeur"
                subtitle="Experience ultimate flexibility with our premium hourly chauffeur rentals. Perfect for shopping, business, or personalized tours."
                bgImage="/images/routes/hourly-chauffeurs.jpg"
                ctaText="Book a Chauffeur"
                ctaLink={whatsappLink}
                layout="left"
                removeBlur={true}
                breadcrumbs={<Breadcrumbs />}
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-surface-alt border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-display text-ink font-semibold">Hourly Rates by Vehicle</h2>
                            <p className="text-muted text-sm mt-2">Minimum booking duration: <span className="font-semibold text-gold-strong">4 Hours</span></p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {FLEET.filter(v => v.bookable).map((v, i) => (
                                <div key={v.id} className="bg-surface border border-border shadow-sm rounded-xl p-4 hover:shadow-md transition-all">
                                    <div className="text-gold-strong font-bold text-lg">{HOURLY_PRICE_MAP[v.id] || 'Contact Us'}</div>
                                    <div className="text-ink font-semibold text-sm mt-1">{v.name}</div>
                                    <div className="text-muted text-xs">{formatSeats(v)}</div>
                                </div>
                            ))}
                        </div>
                        <SeasonalPricingNote className="mt-6" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Perfect For (Use Cases) ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display text-center mb-16">Perfect For Your Custom Needs</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <ShoppingBag size={32} />, title: "Shopping Trips", desc: "Visit Makkah Malls or Red Sea Mall in Jeddah. Shop freely while your driver waits for you with the AC running." },
                                { icon: <Map size={32} />, title: "Custom Ziyarat", desc: "Go off the beaten path. Spend as much time as you desire at specific mosques or historical sites without being rushed." },
                                { icon: <Briefcase size={32} />, title: "Business Meetings", desc: "Arrive at your corporate meetings in style. Your chauffeur will wait and be ready to take you to your next appointment." },
                                { icon: <Stethoscope size={32} />, title: "Medical Appointments", desc: "Comfortable, stress-free transport for hospital visits. We ensure a smooth ride for patients and their families." },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface border border-border p-8 rounded-2xl hover:border-gold/40 hover:shadow-gold transition-all duration-300 group">
                                    <div className="text-gold mb-6 transform group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-3">{item.title}</h3>
                                    <p className="text-body font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-surface-alt border-y border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-12 font-display text-ink">The Al Kiswah Standard</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { icon: <UserCheck size={26} />, title: "Professional Drivers", desc: "Polite, punctual, and highly experienced in city navigation." },
                                { icon: <Car size={26} />, title: "Immaculate Fleet", desc: "Clean, smoke-free, and perfectly air-conditioned vehicles." },
                                { icon: <Clock size={26} />, title: "Wait-Time Flexibility", desc: "Take your time. The car is yours for the entire booked duration." },
                                { icon: <ShieldCheck size={26} />, title: "Door-to-Door", desc: "Direct pick-up and drop-off from your hotel lobby to your destination." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                    <div className="bg-surface w-14 h-14 rounded-btn flex items-center justify-center mx-auto mb-4 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-ink">{f.title}</h3>
                                    <p className="text-xs text-body leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/booking" className="inline-flex items-center bg-gold text-ink px-10 py-4 rounded-btn font-bold transition-all shadow-sm hover:shadow-md hover:bg-gold-light uppercase tracking-[0.15em] text-sm hover:scale-105">
                                Book a Chauffeur <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-6 text-body leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-semibold text-ink font-display text-center mb-6">Premium VIP Chauffeur Service in Saudi Arabia</h2>
                            <p>For those who require absolute flexibility and privacy, <strong className="text-ink">Al Kiswah Umrah Transport</strong> offers an exclusive hourly chauffeur service across Makkah, Madinah, and Jeddah. Unlike standard car rentals, our service provides you with a luxurious vehicle and a dedicated, professional driver, freeing you from the stress of navigating unfamiliar roads or finding parking.</p>
                            <p>Our hourly hire is the ultimate solution for <strong className="text-ink">shopping trips</strong>, allowing you to easily store your purchases in the vehicle while you continue exploring. It is equally popular for <strong className="text-ink">business travelers</strong> needing reliable transport between meetings, and for families who prefer a customized, unhurried <strong className="text-ink">Ziyarat tour</strong>.</p>
                            <p>With a minimum booking time of just 4 hours, you can reserve a comfortable <Link href="/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline">Sedan</Link> or a spacious <Link href="/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline">Family SUV</Link> tailored to your group size. Experience the pinnacle of Saudi hospitality with our punctual, English-speaking chauffeurs and immaculate fleet.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={hourlyFAQs} title="Hourly Chauffeur — Frequently Asked Questions" />
            </div>
        </main>
    );
}
