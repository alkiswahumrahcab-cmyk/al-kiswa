import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, MapPin, CheckCircle } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetPricingGrid from '@/components/fleet/FleetPricingGrid';
import Interior360Viewer from '@/components/fleet/Interior360Viewer';
import { vehicleService } from '@/services/vehicleService';
import Image from 'next/image';

const generateJsonLd = (vehicleData: any) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://kiswahumrahcab.com/fleet" },
                { "@type": "ListItem", "position": 3, "name": "GMC Yukon XL", "item": "https://kiswahumrahcab.com/fleet/gmc-yukon-at4" }
            ]
        },
        {
            "@type": "Product",
            "name": "GMC Yukon XL Luxury SUV",
            "image": "https://kiswahumrahcab.com/images/fleet/gmc-yukon/gmc-yukon-xl-luxury-umrah-transport-cinematic.webp",
            "description": "Book luxury GMC Yukon XL in Makkah & Madinah. 7 Seater SUV for VIP Umrah transport.",
            "brand": { "@type": "Brand", "name": "GMC" },
            "offers": {
                "@type": "Offer",
                "price": vehicleData?.basePrice?.toString() || "600",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": '2026-12-31',
                "url": "https://kiswahumrahcab.com/fleet/gmc-yukon-at4"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "120",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        {
            "@type": "Service",
            "name": "VIP Umrah Transport - GMC Yukon",
            "provider": {
                "@type": "LocalBusiness",
                "name": "Al Kiswah Umrah Transport",
                "image": "https://kiswahumrahcab.com/images/logo.png"
            },
            "areaServed": ["Makkah", "Madinah", "Jeddah"],
            "description": "Premium chauffeured GMC Yukon for Umrah pilgrims."
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "How many passengers can fit in the GMC Yukon?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "The GMC Yukon XL comfortably seats up to 7 passengers (including children). However, for maximum comfort with luggage, we recommend it for 4-5 adults + 5 large suitcases."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Is the GMC Yukon suitable for Makkah to Madinah travel?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Absolutely. It is the most popular choice for the 4.5-hour journey between Holy Cities. With its premium suspension, leather seats, and dual AC, it ensures a fatigue-free journey for pilgrims."
                    }
                }
            ]
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "GMC Yukon for Umrah Travel – Luxury SUV | Jeddah to Makkah | Al Kiswah Umrah Cab",
        description: "Book a premium GMC Yukon for Umrah travel, Ziyarat tours, and airport transfers across Saudi Arabia. Spacious 7‑seater, luxury interior, professional drivers. Jeddah Airport to Makkah, Makkah to Madinah. 24/7 booking with Al Kiswah Umrah Cab.",
        keywords: [
            "GMC Yukon Saudi Arabia",
            "GMC Yukon Umrah",
            "Jeddah to Makkah SUV",
            "Makkah to Madinah transport",
            "Umrah cab service",
            "luxury SUV Saudi Arabia",
            "Al Kiswah Umrah Cab"
        ],
        alternates: generateMetadataAlternates("/fleet/gmc-yukon-at4"),
    };
}

const gmcFAQs = [
    {
        question: "How many passengers can fit in the GMC Yukon?",
        answer: "The GMC Yukon XL comfortably seats up to 7 passengers (including children). However, for maximum comfort with luggage, we recommend it for 4-5 adults + 5 large suitcases."
    },
    {
        question: "Is the GMC Yukon suitable for Makkah to Madinah travel?",
        answer: "Absolutely. It is the most popular choice for the 4.5-hour journey between Holy Cities. With its premium suspension, leather seats, and dual AC, it ensures a fatigue-free journey for pilgrims."
    },
    {
        question: "What is the price for GMC Yukon from Jeddah Airport to Makkah?",
        answer: "Our rates are competitive for VIP service. Please use the booking grid to get an instant quote or contact us via WhatsApp for the best seasonal offers."
    },
];

export default async function GmcYukonPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20GMC%20Yukon%20for%20Umrah`;

    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('yukon') || v.name.toLowerCase().includes('gmc'));
    const gmcId = vehicleData?.id || '692db09834f15bc89b45a5f8';

    const jsonLd = generateJsonLd(vehicleData);

    const exteriorImages = [
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-full-exterior-view-umrah-taxi-service.webp", alt: "GMC Yukon full exterior view umrah taxi service", title: "Rugged Body Design" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-side-profile-vip-umrah-taxi.webp", alt: "GMC Yukon side profile VIP umrah taxi", title: "Premium Side Profile" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-rear-view-umrah-cab-saudi-arabia.webp", alt: "GMC Yukon rear view umrah cab Saudi Arabia", title: "Elegant Rear View" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-front-grille-jeddah-to-makkah-transport.webp", alt: "GMC Yukon front grille Jeddah to Makkah transport", title: "Bold GMC Grille" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-led-headlights-makkah-transport.webp", alt: "GMC Yukon LED headlights Makkah transport", title: "Signature LED Headlights" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-premium-alloy-wheels-umrah-cab.webp", alt: "GMC Yukon premium alloy wheels umrah cab", title: "Premium Wheels" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-umrah-taxi-tail-lights-makkah.webp", alt: "GMC Yukon umrah taxi tail lights Makkah", title: "Tail Lamp Design" },
    ];

    const interiorImages = [
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-premium-dashboard-interior-umrah-taxi.webp", alt: "GMC Yukon premium dashboard interior umrah taxi", title: "Touchscreen Infotainment" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-vip-passenger-seats-umrah-transport.webp", alt: "GMC Yukon VIP passenger seats umrah transport", title: "Premium Leather Seats" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-family-seating-makkah-to-madinah-taxi.webp", alt: "GMC Yukon family seating Makkah to Madinah taxi", title: "Spacious Cabin" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-luggage-capacity-jeddah-airport-transfer.webp", alt: "GMC Yukon luggage capacity Jeddah airport transfer", title: "Massive Cargo Space" },
        { src: "/images/fleet/gmc-yukon/gmc-yukon-xl-panoramic-sunroof-luxury-umrah-transport.webp", alt: "GMC Yukon panoramic sunroof luxury umrah transport", title: "Panoramic Sunroof" },
        { src: "/images/fleet/gmc-yukon-interior-360.webp", alt: "GMC Yukon interior lighting and climate control", title: "Climate Control & Lighting" },
    ];

    return (
        <main className="overflow-x-hidden bg-slate-50 dark:bg-slate-950">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            
            {/* A. Hero Section */}
            <Hero
                title="GMC Yukon – Luxury SUV for Umrah & Saudi Travel"
                subtitle="Spacious. Powerful. Perfect for Families & Groups."
                bgImage="/images/fleet/gmc-yukon/gmc-yukon-xl-luxury-umrah-transport-cinematic.webp"
                badge="Premium VIP Choice"
                ctaText="Book Now"
                ctaLink="/booking?vehicle=gmc"
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            >
                <div className="mt-4 flex justify-center gap-4">
                    <a href={whatsappLink} className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-colors">
                        WhatsApp Inquiry
                    </a>
                </div>
            </Hero>

            {/* B & C. Exterior Highlights / Cinematic Gallery */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Exterior</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-slate-900 dark:text-white mb-6">Commanding Presence</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300">The GMC Yukon XL makes a statement on the roads of Makkah and Madinah with its rugged yet luxurious exterior design.</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {exteriorImages.map((img, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                                    <h3 className="text-white font-bold text-base">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* D. Interior Luxury Section */}
            <section className="py-20 bg-slate-900 text-white relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">Interior</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-6">Unmatched Cabin Comfort</h2>
                        <p className="text-slate-300 text-lg">Experience first-class travel with premium leather seating, advanced climate control, and massive legroom for every passenger.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {interiorImages.map((img, i) => (
                            <div key={i} className="group relative rounded-xl overflow-hidden aspect-[4/3]">
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-opacity duration-500 group-hover:opacity-75" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <h4 className="font-bold text-lg text-amber-400">{img.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="max-w-5xl mx-auto mt-12 bg-slate-800 rounded-2xl p-2 md:p-4 shadow-2xl border border-slate-700">
                        <Interior360Viewer
                            imageUrl="/images/fleet/gmc-yukon-interior-360.webp"
                            title="Interactive 360° Cabin View"
                        />
                    </div>
                </div>
            </section>

            {/* E. Features & Specifications */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mb-4">Premium Specifications</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <Shield className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Safety Features</h3>
                            <p className="text-slate-600 dark:text-slate-400">Advanced airbags, lane departure warning, and StabiliTrak electronic stability control system.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <Users className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Comfort & Seating</h3>
                            <p className="text-slate-600 dark:text-slate-400">Plush leather bucket seats, 7-passenger capacity, with Tri-Zone automatic climate control.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <Briefcase className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Luggage Capacity</h3>
                            <p className="text-slate-600 dark:text-slate-400">Massive trunk space accommodating 5+ large suitcases easily, perfect for international pilgrims.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <Wifi className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Tech & Connectivity</h3>
                            <p className="text-slate-600 dark:text-slate-400">10.2" diagonal premium infotainment system with wireless Apple CarPlay and Android Auto.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <MapPin className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Engine Power</h3>
                            <p className="text-slate-600 dark:text-slate-400">Powerful 5.3L V8 Engine delivering 355 horsepower, ensuring smooth highway cruising.</p>
                        </div>
                        <div className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                            <Star className="w-10 h-10 text-amber-500 mb-4" />
                            <h3 className="font-bold text-xl mb-2 dark:text-white">Suspension & Ride</h3>
                            <p className="text-slate-600 dark:text-slate-400">Premium Smooth Ride suspension isolates the cabin from rough roads for maximum comfort.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* F. Comprehensive SEO Content & Why Choose */}
            <section className="py-24 bg-amber-50 dark:bg-amber-900/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8 text-slate-900 dark:text-white text-center">GMC Yukon – Luxury SUV for Umrah, Ziyarat & Long‑Distance Travel in Saudi Arabia</h2>
                        
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
                            <p>
                                The <strong>GMC Yukon</strong> stands as one of the most trusted luxury SUVs for <strong>Umrah pilgrims, families, and international travelers</strong> seeking comfort, safety, and premium travel across Saudi Arabia. At <strong>Al Kiswah Umrah Cab</strong>, we proudly offer the Yukon as part of our elite fleet, ensuring a smooth, spacious, and reliable journey whether you are traveling for Umrah, Ziyarat, or airport transfers.
                            </p>
                            <p>
                                With its bold exterior design, signature GMC grille, LED headlights, and commanding road presence, the Yukon delivers both elegance and power. Its rugged build and aerodynamic shape make it ideal for long‑distance routes such as <Link href="/services/jeddah-airport-transfer" className="text-amber-600 font-semibold hover:underline">Jeddah Airport to Makkah</Link>, <Link href="/services/makkah-madinah-taxi" className="text-amber-600 font-semibold hover:underline">Makkah to Madinah</Link>, and <Link href="/services/ziyarat-tours" className="text-amber-600 font-semibold hover:underline">Madinah Ziyarat tours</Link>. The vehicle handles highways with ease, offering stability, comfort, and a premium travel experience for all passengers.
                            </p>
                            <p>
                                Inside, the GMC Yukon offers a <strong>luxurious cabin</strong> designed for comfort during long journeys. Premium leather seating, a modern infotainment system, rear entertainment screens, and tri‑zone climate control ensure a relaxing ride for families, elderly pilgrims, and groups carrying multiple suitcases. The spacious interior comfortably accommodates up to <strong>7 passengers</strong>, making it a preferred choice for Umrah groups and family travelers.
                            </p>
                            <p>
                                For pilgrims, the Yukon’s <strong>smooth suspension</strong>, <strong>quiet cabin</strong>, and <strong>large luggage capacity</strong> make it ideal for sacred journeys between holy cities. Whether you are performing Umrah, visiting historical sites, or traveling between hotels and airports, the Yukon guarantees a peaceful and stress‑free experience.
                            </p>
                            <p>
                                At <strong>Al Kiswah Umrah Cab</strong>, we maintain our Yukon fleet with the highest standards of safety, cleanliness, and performance. Our professional drivers ensure punctual pickups, courteous service, and complete assistance throughout your journey. With transparent pricing, 24/7 availability, and easy online booking, we make your travel experience seamless and reliable.
                            </p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-20">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                            <Image 
                                src="/images/fleet/gmc-yukon/gmc-yukon-xl-highway-driving-makkah-to-madinah.webp" 
                                alt="GMC Yukon for Umrah travel Makkah to Madinah" 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold font-playfair mb-8 text-slate-900 dark:text-white">Why Choose the GMC Yukon for Umrah Travel?</h3>
                            <ul className="space-y-5">
                                {[
                                    "Ideal for families and groups",
                                    "Smooth and comfortable for long routes",
                                    "Spacious seating and luggage capacity",
                                    "Perfect for elderly pilgrims",
                                    "Premium comfort for sacred journeys"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-amber-100 dark:border-slate-800 transition-transform hover:-translate-y-1">
                                        <CheckCircle className="w-6 h-6 text-amber-500 shrink-0" />
                                        <span className="text-lg font-medium text-slate-800 dark:text-slate-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* G. Pricing & Packages */}
            <FleetPricingGrid
                vehicleId={gmcId}
                vehicleImage="/images/fleet/gmc-yukon-hero-professional.webp"
                vehicleType="gmc"
                title="GMC Yukon Umrah Packages & Pricing"
                subtitle="Transparent, VIP pricing for your journey between Jeddah, Makkah, and Madinah."
            />

            {/* H. Route Packages */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Routes & Packages</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mt-3 mb-3">Popular GMC Yukon Routes</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                route: 'Jeddah Airport → Makkah',
                                desc: 'Direct luxury pickup from King Abdulaziz International Airport to your hotel in Makkah. Meet & greet service included.',
                                badge: 'Most Booked',
                                href: '/services/jeddah-airport-transfer',
                                icon: '✈️',
                            },
                            {
                                route: 'Makkah → Madinah',
                                desc: 'Comfortable 4-hour intercity transfer between the two holy cities with an experienced professional driver.',
                                badge: 'Holy Route',
                                href: '/services/makkah-madinah-taxi',
                                icon: '🕌',
                            },
                            {
                                route: 'Ziyarat Packages',
                                desc: 'Full-day Ziyarat tours in Makkah & Madinah — visit Jabal al-Nour, Arafat, Quba Mosque, and more.',
                                badge: 'Full Day',
                                href: '/services/ziyarat-tours',
                                icon: '📍',
                            },
                        ].map((r, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl shadow-md border-t-4 border-amber-500 p-6 hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                                <div className="text-4xl mb-4">{r.icon}</div>
                                <span className="inline-block bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 w-fit">{r.badge}</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{r.route}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-1">{r.desc}</p>
                                <Link href={r.href} className="mt-5 inline-flex items-center gap-2 text-amber-600 hover:text-amber-500 font-bold text-sm transition-colors">
                                    View Route Details <ArrowRight size={16} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* I. Booking Form */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Quick Booking</span>
                            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mt-3 mb-2">Reserve Your GMC Yukon</h2>
                            <p className="text-slate-500 dark:text-slate-400">Fill in your details and our team will confirm your booking within minutes.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { label: 'Full Name', placeholder: 'Your full name', type: 'text', id: 'gmc-name' },
                                    { label: 'Phone / WhatsApp', placeholder: '+966 5XX XXX XXXX', type: 'tel', id: 'gmc-phone' },
                                    { label: 'Pickup Location', placeholder: 'e.g. Jeddah Airport, Terminal 1', type: 'text', id: 'gmc-pickup' },
                                    { label: 'Drop Location', placeholder: 'e.g. Makkah Grand Mosque Hotel', type: 'text', id: 'gmc-drop' },
                                    { label: 'Date & Time', placeholder: '', type: 'datetime-local', id: 'gmc-datetime' },
                                    { label: 'No. of Passengers', placeholder: 'e.g. 5', type: 'number', id: 'gmc-passengers' },
                                ].map((field) => (
                                    <div key={field.id}>
                                        <label htmlFor={field.id} className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{field.label}</label>
                                        <input
                                            id={field.id}
                                            type={field.type}
                                            placeholder={field.placeholder}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                                        />
                                    </div>
                                ))}
                                <div className="md:col-span-2">
                                    <label htmlFor="gmc-vehicle" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Vehicle</label>
                                    <input id="gmc-vehicle" type="text" value="GMC Yukon XL (Pre-selected)" readOnly className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold focus:outline-none cursor-not-allowed" />
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/booking?vehicle=gmc" className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg text-center transition-all hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
                                    Go to Full Booking Form <ArrowRight size={20} />
                                </Link>
                                <a href={whatsappLink} className="flex-1 bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg text-center transition-all hover:scale-105 flex items-center justify-center gap-2">
                                    Book via WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* J. Booking CTA Banner */}
            <section className="py-24 relative flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image 
                        src="/images/fleet/gmc-yukon/gmc-yukon-xl-luxury-umrah-transport-cinematic.webp" 
                        alt="Book GMC Yukon Umrah Taxi" 
                        fill 
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>
                </div>
                
                <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-6">Ready to Book Your VIP Ride?</h2>
                    <p className="text-lg text-slate-300 mb-10">Reserve your GMC Yukon XL instantly with our online booking system or chat with our support team via WhatsApp.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking?vehicle=gmc" className="bg-amber-500 hover:bg-amber-600 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
                            Go to Booking Form <ArrowRight size={20} />
                        </Link>
                        <a href={whatsappLink} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            Book via WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <FAQSection items={gmcFAQs} title="GMC Yukon Transport - FAQs" />
            
            <div className="py-10 bg-white dark:bg-slate-950">
                <FleetCarouselWrapper />
            </div>
        </main>
    );
}
