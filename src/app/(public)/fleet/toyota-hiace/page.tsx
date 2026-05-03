import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Shield, Star, Users, Fuel, Phone, MessageCircle, CheckCircle, Zap, Wind } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetPricingGrid from '@/components/fleet/FleetPricingGrid';
import { vehicleService } from '@/services/vehicleService';
import HiaceGallery from './HiaceGallery';
import HiaceHero from './HiaceHero';

const HERO_IMAGE = '/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg';

const generateJsonLd = (vehicleData: any) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://kiswahumrahcab.com/fleet" },
                { "@type": "ListItem", "position": 3, "name": "Toyota Hiace 2026", "item": "https://kiswahumrahcab.com/fleet/toyota-hiace" }
            ]
        },
        {
            "@type": "Product",
            "name": "Toyota Hiace 2026",
            "brand": { "@type": "Brand", "name": "Toyota" },
            "category": "Automotive",
            "description": "Toyota Hiace 2026 – reliable, spacious van ideal for business and family travel in Saudi Arabia. Perfect for Umrah groups, airport transfers, and intercity travel.",
            "image": [
                "https://kiswahumrahcab.com/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg",
                "https://kiswahumrahcab.com/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg",
                "https://kiswahumrahcab.com/images/fleet/hiace/toyota-hiace-2026-interior-passenger-comfort.jpeg"
            ],
            "offers": {
                "@type": "Offer",
                "price": vehicleData?.basePrice?.toString() || "350",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": "2026-12-31",
                "url": "https://kiswahumrahcab.com/fleet/toyota-hiace"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "310",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ibrahim Al-Siddiqui" },
                "datePublished": "2026-02-10",
                "reviewBody": "The Toyota Hiace kept our entire family of 10 together. Spotless, powerful AC, and the driver was professional. Best group transport in Saudi Arabia.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How many passengers can the Toyota Hiace carry?",
                    "acceptedAnswer": { "@type": "Answer", "text": "The Toyota Hiace seats up to 12 passengers in the commuter configuration, or 10 passengers with extra luggage space." }
                },
                {
                    "@type": "Question",
                    "name": "Is the Toyota Hiace suitable for Umrah groups?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Hiace is the most popular group transport for Umrah families traveling between Jeddah, Makkah, and Madinah. It keeps your entire group together at an economical per-person cost." }
                }
            ]
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Toyota Hiace 2026 – Price, Features & Interior | Saudi Arabia | Al Kiswah",
        description: "Discover the Toyota Hiace 2026 in Saudi Arabia. Spacious, reliable, and perfect for business or family Umrah travel. Explore real Abha photos, features, and book transport.",
        keywords: [
            "Toyota Hiace Saudi Arabia", "Toyota Hiace price KSA", "Toyota Hiace 2026",
            "Toyota Hiace interior", "Toyota Hiace Abha", "group transport makkah",
            "hiace umrah transfer", "toyota van 2026", "باص هايس السعودية"
        ],
        openGraph: {
            title: "Toyota Hiace 2026 – Reliable Group Transport | Al Kiswah",
            description: "Real photos from Abha. Spacious, trusted, and built for Saudi roads. Book your Toyota Hiace group transport today.",
            images: [{ url: "https://kiswahumrahcab.com/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg", width: 1200, height: 630 }],
        },
        alternates: generateMetadataAlternates("/fleet/toyota-hiace"),
    };
}

const hiaceFAQs = [
    { question: "How many passengers can the Toyota Hiace carry?", answer: "The Toyota Hiace seats up to 12 passengers in commuter configuration, or 10 with extra luggage room in the rear." },
    { question: "Is the Toyota Hiace suitable for Umrah groups?", answer: "Absolutely. It's the most popular group transport for Umrah families between Jeddah, Makkah, and Madinah. Economical, spacious, and reliable." },
    { question: "How many bags fit in a Toyota Hiace?", answer: "For 10 passengers, approximately 10–12 medium suitcases fit in the rear cargo area. For heavier luggage loads, we recommend pairing with a cargo vehicle." },
    { question: "Does the Hiace have AC throughout the cabin?", answer: "Yes. Our Hiace fleet features dual-zone heavy-duty AC with individual roof vents for every passenger row." },
    { question: "What is the Toyota Hiace price for Makkah to Madinah?", answer: "Prices start from 350 SAR depending on the season and number of passengers. Contact us via WhatsApp for an instant fixed quote." },
];

const exteriorImages = [
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg', alt: 'Toyota Hiace 2026 front view in Saudi Arabia', label: 'Bold Front Grille' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-side-profile.jpeg', alt: 'Toyota Hiace 2026 side profile', label: 'Clean Side Profile' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-sliding-door-open.jpeg', alt: 'Toyota Hiace 2026 sliding door open', label: 'Wide Sliding Door' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-alloy-wheel.jpeg', alt: 'Toyota Hiace 2026 alloy wheels', label: 'Premium Alloy Wheels' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-full-rear.jpeg', alt: 'Toyota Hiace 2026 rear cargo view', label: 'Rear Cargo Access' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-exterior-led-headlight.jpeg', alt: 'Toyota Hiace 2026 LED headlights', label: 'LED Headlights' },
];

const interiorImages = [
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-dashboard-main.jpeg', alt: 'Toyota Hiace 2026 dashboard', label: 'Modern Dashboard', desc: 'Intuitive controls with digital display and premium finish.' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-passenger-seats.jpeg', alt: 'Toyota Hiace 2026 passenger seating', label: 'Spacious Seating', desc: 'Up to 12 seats with generous legroom for long journeys.' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-passenger-comfort.jpeg', alt: 'Toyota Hiace 2026 passenger comfort', label: 'Passenger Comfort', desc: 'Reclinable seats, soft headrests, individual AC vents.' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-interior-steering-wheel.jpeg', alt: 'Toyota Hiace 2026 steering wheel', label: 'Driver Controls', desc: 'Ergonomic multi-function steering with full visibility.' },
];

const useCases = [
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-cinematic-abha.jpeg', alt: 'Toyota Hiace Umrah family transport', title: 'Family & Group Umrah', desc: 'Keep your entire family together on the sacred journey — from Jeddah Airport to Makkah and Madinah.' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-aerial-location.jpeg', alt: 'Toyota Hiace Abha tourism transport', title: 'Abha Tourism Transfers', desc: "Explore Abha's mountains and heritage sites comfortably with a spacious, air-conditioned Hiace." },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-full-desert-road.jpeg', alt: 'Toyota Hiace business shuttle', title: 'Business Shuttles', desc: 'Reliable corporate transport for teams, events, and daily staff transfers across Saudi Arabia.' },
    { src: '/images/fleet/hiace/toyota-hiace-2026-lifestyle-open-road.jpeg', alt: 'Toyota Hiace intercity travel', title: 'Intercity Road Trips', desc: 'Power through Saudi highways in comfort — Riyadh, Jeddah, Dammam, Abha and beyond.' },
];

const safetyFeatures = [
    { icon: Shield, label: 'ABS Braking', desc: 'Anti-lock system for confident stops' },
    { icon: Star, label: 'Dual Airbags', desc: 'Driver and passenger protection' },
    { icon: Zap, label: 'Stability Control', desc: 'VSC keeps you on track in curves' },
    { icon: Wind, label: 'Rear Sensors', desc: 'Parking assistance for tight spaces' },
    { icon: CheckCircle, label: 'Rear Camera', desc: 'Full rear visibility on every model' },
    { icon: Fuel, label: 'Hill Start Assist', desc: 'Safe on mountain roads like Abha' },
];

export default async function ToyotaHiacePage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I'm%20interested%20in%20booking%20a%20Toyota%20Hiace%20for%20group%20transport`;

    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('hiace'));
    const hiaceId = vehicleData?.id || '692db09834f15bc89b45a5fb';
    const jsonLd = generateJsonLd(vehicleData);

    return (
        <main className="overflow-x-hidden bg-deep-black">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── HERO ── */}
            <HiaceHero whatsappLink={whatsappLink} phoneNumber={phoneNumber} />



            {/* ── EXTERIOR HIGHLIGHTS ── */}
            <section className="py-24 bg-[#0d0d0d]" id="exterior">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Real Abha Shots</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Toyota Hiace Exterior Design</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Photographed in Abha's mountains and open highways — every angle reflects confidence and durability.</p>
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
            <section className="py-24 bg-[#080808]" id="interior">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Premium Cabin</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Toyota Hiace Interior & Comfort</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Designed for long-distance comfort with generous legroom, dual-zone AC, and premium seating throughout.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {interiorImages.map((img, i) => (
                            <div key={i} className="group flex gap-5 bg-white/3 border border-white/8 rounded-2xl p-4 hover:border-gold-primary/30 transition-colors duration-300">
                                <div className="relative w-40 h-32 shrink-0 rounded-xl overflow-hidden">
                                    <Image src={img.src} alt={img.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="160px" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                                        <h3 className="text-white font-bold">{img.label}</h3>
                                    </div>
                                    <p className="text-slate-400 text-sm leading-relaxed">{img.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PERFORMANCE ── */}
            <section className="py-24 bg-[#0d0d0d] border-y border-white/5" id="performance">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative h-[440px] rounded-2xl overflow-hidden">
                            <Image src="/images/fleet/hiace/toyota-hiace-2026-lifestyle-night-road.jpeg" alt="Toyota Hiace 2026 performance on Saudi roads" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <div className="grid grid-cols-3 gap-3">
                                    {[['2.8L', 'Turbo Diesel'], ['174hp', 'Peak Power'], ['10-12', 'Passengers']].map(([val, lbl]) => (
                                        <div key={lbl} className="bg-black/60 backdrop-blur-sm border border-gold-primary/30 rounded-xl p-3 text-center">
                                            <p className="text-gold-primary font-bold text-xl">{val}</p>
                                            <p className="text-slate-400 text-xs">{lbl}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Engine & Performance</span>
                            <h2 className="text-4xl font-bold font-playfair text-white mb-6">Toyota Hiace Performance & Reliability</h2>
                            <p className="text-slate-400 leading-relaxed mb-8">The 2.8L turbocharged diesel engine delivers smooth, confident power on Saudi Arabia's highways — from Jeddah's coastal roads to Abha's mountain passes. Toyota's legendary reliability means zero compromise on your journey.</p>
                            <div className="space-y-4">
                                {[
                                    ['Engine', '2.8L 1GD-FTV Turbo Diesel', '174hp / 450Nm'],
                                    ['Transmission', '6-Speed Automatic', 'Smooth city & highway shifts'],
                                    ['Fuel Economy', '~11L/100km', 'Economical for long routes'],
                                    ['Cooling', 'Heavy Duty Dual-Zone AC', 'Individual roof vents per row'],
                                ].map(([label, val, sub]) => (
                                    <div key={label} className="flex items-start gap-4 p-4 bg-white/3 rounded-xl border border-white/5">
                                        <div className="w-1.5 h-full min-h-[2rem] rounded-full bg-gold-primary shrink-0 mt-1" />
                                        <div>
                                            <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                                            <p className="text-white font-bold">{val}</p>
                                            <p className="text-slate-400 text-sm">{sub}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SAFETY ── */}
            <section className="py-24 bg-[#080808]" id="safety">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Passenger Protection</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Toyota Hiace Safety Systems</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Every vehicle in our fleet is maintained to Toyota's strict safety standards — your family's protection is non-negotiable.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {safetyFeatures.map(({ icon: Icon, label, desc }) => (
                            <div key={label} className="flex flex-col gap-3 p-6 bg-white/3 border border-white/8 rounded-2xl hover:border-gold-primary/30 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-gold-primary/10 flex items-center justify-center">
                                    <Icon size={22} className="text-gold-primary" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold mb-1">{label}</h3>
                                    <p className="text-slate-400 text-sm">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── USE CASES ── */}
            <section className="py-24 bg-[#0d0d0d]" id="use-cases">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-3 block">Versatile Transport</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Toyota Hiace for Every Journey</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">From Umrah pilgrimages to Abha tourism and corporate shuttles — the Hiace delivers every time.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((item, i) => (
                            <div key={i} className="group relative h-72 rounded-2xl overflow-hidden border border-white/5 cursor-pointer">
                                <Image src={item.src} alt={item.alt} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6">
                                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GALLERY ── */}
            <HiaceGallery />

            {/* ── BOOKING CTA ── */}
            <section className="py-24 relative overflow-hidden" id="booking">
                <div className="absolute inset-0">
                    <Image src="/images/fleet/hiace/toyota-hiace-2026-lifestyle-top-wide-view.jpeg" alt="Book Toyota Hiace group transport Saudi Arabia" fill className="object-cover opacity-20" sizes="100vw" />
                    <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-deep-black/95 to-deep-black" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <span className="text-gold-primary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Ready to Travel?</span>
                    <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">Book Your Toyota Hiace Today</h2>
                    <p className="text-slate-400 max-w-xl mx-auto mb-10">Fixed prices. Professional drivers. Instant confirmation. Keep your entire group together.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking" className="inline-flex items-center justify-center gap-2 bg-gold-primary hover:bg-white text-black font-bold px-10 py-4 rounded-xl transition-all duration-300 text-lg shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                            Book Now <ArrowRight size={20} />
                        </Link>
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1fb85a] text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg">
                            <MessageCircle size={20} /> WhatsApp
                        </a>
                        <a href={`tel:${phoneNumber}`} className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/15 text-white font-bold px-10 py-4 rounded-xl transition-colors text-lg">
                            <Phone size={20} /> Call Us
                        </a>
                    </div>
                    <div className="flex flex-wrap justify-center gap-8 mt-12">
                        {[['10–12', 'Passengers'], ['29+', 'Abha Photos'], ['4.8★', 'Rating'], ['350+', 'Bookings']].map(([val, lbl]) => (
                            <div key={lbl} className="text-center">
                                <p className="text-gold-primary font-bold text-3xl">{val}</p>
                                <p className="text-slate-500 text-sm">{lbl}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRICING ── */}
            <div className="bg-[#0a0a0a]">
                <FleetPricingGrid
                    vehicleId={hiaceId}
                    vehicleImage="/images/fleet/toyota-hiace-2025.webp"
                    vehicleType="hiace"
                    title="Toyota Hiace 2026 – Route Pricing"
                    subtitle="Fixed, transparent pricing. No hidden fees. Your entire group, one vehicle."
                />
            </div>

            <FleetCarouselWrapper />
            <FAQSection items={hiaceFAQs} title="Toyota Hiace 2026 – Frequently Asked Questions" />
        </main>
    );
}
