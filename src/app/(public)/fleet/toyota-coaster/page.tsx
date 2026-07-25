import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Star, Users, Fuel, Phone, MessageCircle, CheckCircle, Zap, Wind } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import CoasterGallery from './CoasterGallery';
import CoasterHero from './CoasterHero';
import { getVehicle, formatSeats, formatLuggage } from '@/data/fleet';

const HERO_IMAGE = '/images/fleet/toyota-coaster-2025.png';

const generateJsonLd = (vehicleData: any) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://kiswahumrahcab.com/fleet" },
                { "@type": "ListItem", "position": 3, "name": "Toyota Coaster", "item": "https://kiswahumrahcab.com/fleet/toyota-coaster" }
            ]
        },
        {
            "@type": "Product",
            "name": "Toyota Coaster",
            "brand": { "@type": "Brand", "name": "Toyota" },
            "category": "Automotive",
            "description": "Toyota Coaster – spacious 19-seater bus ideal for large Umrah groups in Saudi Arabia.",
            "image": [
                "https://kiswahumrahcab.com/images/fleet/toyota-coaster-2025.png"
            ],
            "offers": {
                "@type": "Offer",
                "price": vehicleData?.basePrice?.toString() || "700",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2026-12-31",
                "url": "https://kiswahumrahcab.com/fleet/toyota-coaster"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ahmed Al-Sayed" },
                "datePublished": "2025-01-10",
                "reviewBody": "Excellent bus for our large family group. Very spacious and the AC was perfect for the heat.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How many passengers can the Toyota Coaster carry?",
                    "acceptedAnswer": { "@type": "Answer", "text": "The Toyota Coaster comfortably seats up to 19 passengers." }
                },
                {
                    "@type": "Question",
                    "name": "Is there enough luggage space for 20+ people?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes, it can easily accommodate 15 standard suitcases." }
                }
            ]
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Toyota Coaster – Group Umrah Transport | Saudi Arabia | Al Kiswah",
        description: "Discover the Toyota Coaster in Saudi Arabia. Spacious 19-seater, reliable, and perfect for group Umrah travel. Explore features and book transport.",
        keywords: [
            "Toyota Coaster Saudi Arabia", "Toyota Coaster price KSA", "Toyota Coaster 2026",
            "group transport makkah", "coaster umrah transfer", "19 seater bus jeddah"
        ],
        openGraph: {
            title: "Toyota Coaster – Reliable Group Transport | Al Kiswah",
            description: "Spacious, trusted, and built for Saudi roads. Book your Toyota Coaster group transport today.",
            images: [{ url: "https://kiswahumrahcab.com/images/fleet/toyota-coaster-2025.png", width: 1200, height: 630 }],
        },
        alternates: generateMetadataAlternates("/fleet/toyota-coaster"),
    };
}

const coasterFAQs = [
    { question: "How many passengers can the Coaster comfortably fit?", answer: "The Toyota Coaster comfortably seats 19 passengers with ample legroom. It is designed for medium-sized groups." },
    { question: "Is there enough luggage space for 20+ people?", answer: "Yes, the Coaster can easily accommodate 15 standard suitcases." },
    { question: "Is the Coaster suitable for long trips to Madinah?", answer: "Absolutely. The Coaster features high-ceiling interiors, comfortable seating, and powerful air conditioning, making it ideal for the Jeddah-Makkah-Madinah route." },
];

// <!-- TODO COPYWRITER: Note that the Coaster's luggage loads through a side-hinged rear swing door into a compartment behind the last row of seats. -->
const exteriorImages = [
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster front view in Saudi Arabia', label: 'Bold Front Design' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster side profile', label: 'Spacious Profile' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster sliding door open', label: 'Easy Access Door' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster wheels', label: 'Heavy Duty Wheels' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster rear cargo view', label: 'Side-Hinged Rear Door' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster headlights', label: 'Bright Headlights' },
];

const interiorImages = [
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster dashboard', label: 'Functional Dashboard', desc: 'A well-designed driver space ensuring maximum focus and safety on the road.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster passenger seating', label: '19 Passenger Seats', desc: 'Comfortable, well-spaced seating designed for medium-to-large group travel.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster passenger comfort', label: 'Passenger Comfort', desc: 'Features heavy-duty ducted air conditioning vents for every passenger to ensure a cool ride.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster luggage compartment', label: 'Rear Luggage Space', desc: 'Secure luggage storage accessed through a convenient side-hinged rear swing door.' },
];

const useCases = [
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster Umrah group transport', title: 'Large Group Umrah', desc: 'Keep your entire family or group together during your spiritual journey between Makkah and Madinah.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster tourism transport', title: 'Tourism Transfers', desc: 'Perfect for guided Ziyarat tours and exploring historical sites around Saudi Arabia.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster business shuttle', title: 'Business Shuttles', desc: 'Reliable staff transport and corporate shuttles for events or daily commuting.' },
    { src: '/images/fleet/toyota-coaster-2025.png', alt: 'Toyota Coaster intercity travel', title: 'Intercity Road Trips', desc: 'Spacious seating and ample luggage room make long-distance travel across cities comfortable.' },
];

const safetyFeatures = [
    { icon: Shield, label: 'ABS Braking', desc: 'Anti-lock system for confident stops' },
    { icon: Star, label: 'Dual Airbags', desc: 'Driver and passenger protection' },
    { icon: Zap, label: 'Stability Control', desc: 'VSC keeps you on track in curves' },
    { icon: Wind, label: 'Rear Sensors', desc: 'Parking assistance for tight spaces' },
    { icon: CheckCircle, label: 'Rear Camera', desc: 'Full rear visibility on every model' },
    { icon: Fuel, label: 'Hill Start Assist', desc: 'Safe on mountain roads' },
];

export default async function ToyotaCoasterPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I'm%20interested%20in%20booking%20a%20Toyota%20Coaster%20for%20group%20transport`;


    const vehicle = getVehicle('toyota-coaster')!;
    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden bg-surface">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── HERO ── */}
            <CoasterHero whatsappLink={whatsappLink} phoneNumber={phoneNumber} />

            {/* ── EXTERIOR HIGHLIGHTS ── */}
            <section className="py-24 bg-surface-alt" id="exterior">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-strong text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Design & Access</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-ink mb-4">Functional & Sturdy Exterior</h2>
                        <p className="text-ink-muted max-w-2xl mx-auto">The Toyota Coaster combines robust engineering with practical design elements, including a distinctive side-hinged rear swing door for easy luggage loading behind the last row of seats.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {exteriorImages.map((img, i) => (
                            <div key={i} className="group relative h-56 md:h-72 rounded-2xl overflow-hidden border border-white/5">
                                <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 50vw, 33vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white font-bold text-sm">{img.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INTERIOR ── */}
            <section className="py-24 bg-surface" id="interior">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-strong text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Premium Cabin</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-ink mb-4">Spacious 19-Passenger Interior</h2>
                        <p className="text-ink-muted max-w-2xl mx-auto">Designed for comfort over long distances, the cabin features 19 individual seats, powerful air conditioning, and dedicated space for up to 15 bags in the rear compartment.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {interiorImages.map((img, i) => (
                            <div key={i} className="group flex gap-5 bg-surface-alt border border-border rounded-2xl p-4 hover:border-gold/30 transition-colors duration-300">
                                <div className="relative w-40 h-32 shrink-0 rounded-xl overflow-hidden">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="160px" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                        <h3 className="text-ink font-bold">{img.label}</h3>
                                    </div>
                                    <p className="text-ink-muted text-sm leading-relaxed">{img.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PERFORMANCE ── */}
            <section className="py-24 bg-surface-alt border-y border-border" id="performance">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[440px] rounded-2xl overflow-hidden shadow-xl border border-border">
                            <Image src="/images/fleet/toyota-coaster-2025.png" alt="Toyota Coaster performance" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="grid grid-cols-3 gap-3">
                                    {[['4.0L', 'Diesel Engine'], ['19', 'Seats'], [formatLuggage(vehicle), 'Luggage']].map(([val, lbl]) => (
                                        <div key={lbl} className="bg-ink/60 backdrop-blur-sm border border-gold/30 rounded-xl p-3 text-center">
                                            <p className="text-gold font-bold text-xl">{val}</p>
                                            <p className="text-white/80 text-xs">{lbl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="text-gold-strong text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Engine & Performance</span>
                            <h2 className="text-4xl font-bold font-playfair text-ink mb-6">Built for Reliability</h2>
                            <p className="text-ink-muted leading-relaxed mb-8">Powered by a robust 4.0L diesel engine, the Toyota Coaster provides consistent, reliable performance for group transport across all Saudi terrains, from city streets to mountain highways.</p>
                            <div className="space-y-4">
                                {[
                                    ['Engine', '4.0L Diesel', 'Reliable power for groups'],
                                    ['Transmission', 'Manual/Automatic', 'Smooth city & highway shifts'],
                                    ['Cooling', 'Heavy Duty Ducted AC', 'Vents for every passenger'],
                                    ['Capacity', '19 Pax', 'Perfect for medium to large groups'],
                                ].map(([label, val, sub]) => (
                                    <div key={label} className="flex items-start gap-4 p-4 bg-surface rounded-xl border border-border shadow-sm">
                                        <div className="w-1.5 h-full min-h-[2rem] rounded-full bg-gold shrink-0 mt-1" />
                                        <div>
                                            <p className="text-ink-muted/70 text-xs uppercase tracking-wider">{label}</p>
                                            <p className="text-ink font-bold">{val}</p>
                                            <p className="text-ink-muted text-sm">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SAFETY ── */}
            <section className="py-24 bg-surface" id="safety">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-strong text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Passenger Protection</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-ink mb-4">Advanced Safety Systems</h2>
                        <p className="text-ink-muted max-w-xl mx-auto">Your group's safety is our top priority. The Coaster is equipped with modern safety features to ensure a secure journey.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {safetyFeatures.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex flex-col gap-3 p-6 bg-surface-alt border border-border rounded-2xl hover:border-gold/30 transition-colors shadow-sm">
                                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                                    <Icon size={22} className="text-gold-strong" />
                                </div>
                                <div>
                                    <h3 className="text-ink font-bold mb-1">{label}</h3>
                                    <p className="text-ink-muted text-sm">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── USE CASES ── */}
            <section className="py-24 bg-surface-alt" id="use-cases">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-strong text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Versatile Transport</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-ink mb-4">Perfect for Any Group Journey</h2>
                        <p className="text-ink-muted max-w-xl mx-auto">Whether for religious pilgrimages, corporate events, or family tours, the Toyota Coaster adapts to your group's needs.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((item, i) => (
                            <div key={i} className="group relative h-72 rounded-2xl overflow-hidden border border-border cursor-pointer shadow-md">
                                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <CoasterGallery />

            {/* ── BOOKING CTA ── */}
            <section className="py-24 relative overflow-hidden" id="booking">
                <div className="absolute inset-0">
                    <Image src="/images/fleet/toyota-coaster-2025.png" alt="Book Toyota Coaster group transport Saudi Arabia" fill className="object-cover opacity-30" sizes="100vw" />
                    <div className="absolute inset-0 bg-[#15140F]/80 backdrop-blur-sm" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-gold text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Ready to Travel?</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Book Your Toyota Coaster Today</h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-10">Fixed prices. Professional drivers. Instant confirmation. Keep your entire group together.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking" className="btn-primary text-lg flex items-center justify-center gap-2">
                            Book Now <ArrowRight size={20} />
                        </Link>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-whatsapp text-lg flex items-center justify-center gap-2">
                            <MessageCircle size={20} /> WhatsApp
                        </a>
                        <a href={`tel:${phoneNumber}`} className="btn-secondary border-white/30 text-white hover:bg-white/10 text-lg flex items-center justify-center gap-2">
                            <Phone size={20} /> Call Us
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        {[[formatSeats(vehicle), 'Capacity'], [formatLuggage(vehicle), 'Luggage'], ['4.8★', 'Rating'], ['100+', 'Bookings']].map(([val, lbl]) => (
                            <div key={lbl} className="text-center">
                                <p className="text-gold font-bold text-3xl">{val}</p>
                                <p className="text-white/70 text-sm">{lbl}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />
            <FAQSection items={coasterFAQs} title="Toyota Coaster – Frequently Asked Questions" />
        </main>
    );
}
