import { generateMetadataAlternates } from '@/lib/hreflang';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/settings-storage';
import { vehicleService } from '@/services/vehicleService';
import FleetPricingGrid from '@/components/fleet/FleetPricingGrid';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FAQSection from '@/components/services/FAQSection';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, Fuel, MapPin, CheckCircle, Phone } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Toyota Camry for Umrah Travel – Executive Sedan | Jeddah to Makkah | Al Kiswah Umrah Cab',
        description: 'Book a premium Toyota Camry for Umrah travel, airport transfers, and Ziyarat tours across Saudi Arabia. Comfortable 4-seater sedan, professional drivers. Jeddah Airport to Makkah, Makkah to Madinah. 24/7 booking with Al Kiswah Umrah Cab.',
        keywords: ['Toyota Camry Umrah', 'Jeddah to Makkah sedan', 'executive car Saudi Arabia', 'Makkah Madinah taxi', 'Umrah cab service', 'Al Kiswah Umrah Cab'],
        alternates: generateMetadataAlternates('/fleet/toyota-camry'),
    };
}

const exteriorImages = [
    { src: '/images/fleet/toyota-camry/toyota-camry-front-view-executive-sedan-al-kiswah-cab.jpeg', alt: 'Toyota Camry front view executive sedan Al Kiswah Umrah Cab', title: 'Bold Front Fascia' },
    { src: '/images/fleet/toyota-camry/toyota-camry-full-profile-luxury-sedan-umrah-pilgrims.jpeg', alt: 'Toyota Camry full profile luxury sedan for Umrah pilgrims', title: 'Sleek Side Profile' },
    { src: '/images/fleet/toyota-camry/toyota-camry-rear-view-executive-sedan-jeddah-transfer.jpeg', alt: 'Toyota Camry rear view executive sedan Jeddah transfer', title: 'Executive Rear Design' },
    { src: '/images/fleet/toyota-camry/toyota-camry-side-road-driving-jeddah-makkah-highway.jpeg', alt: 'Toyota Camry driving Jeddah to Makkah highway', title: 'Highway Road Presence' },
    { src: '/images/fleet/toyota-camry/toyota-camry-wheel-alloy-luxury-road-makkah-jeddah.jpeg', alt: 'Toyota Camry alloy wheel luxury road Makkah Jeddah', title: 'Premium Alloy Wheels' },
    { src: '/images/fleet/toyota-camry/toyota-camry-taif-road-mountain-drive-luxury-umrah-cab.jpeg', alt: 'Toyota Camry Taif road mountain drive luxury Umrah cab', title: 'Taif Mountain Drive' },
    { src: '/images/fleet/toyota-camry/toyota-camry-wide-side-view-luxury-car-madinah-route.jpeg', alt: 'Toyota Camry wide side view luxury car Madinah route', title: 'Madinah Route Ready' },
    { src: '/images/fleet/toyota-camry/toyota-camry-rear-aesthetic-premium-sedan-makkah-madinah.jpeg', alt: 'Toyota Camry rear aesthetic premium sedan Makkah Madinah', title: 'Refined Rear Aesthetic' },
];

const interiorImages = [
    { src: '/images/fleet/toyota-camry/toyota-camry-interior-premium-leather-seats-umrah-transfer.jpeg', alt: 'Toyota Camry premium leather seats interior Umrah transfer', title: 'Premium Leather Cabin' },
    { src: '/images/fleet/toyota-camry/toyota-camry-dashboard-luxury-interior-saudi-driver-service.jpeg', alt: 'Toyota Camry dashboard luxury interior Saudi driver service', title: 'Executive Dashboard' },
    { src: '/images/fleet/toyota-camry/toyota-camry-steering-wheel-tech-infotainment-umrah-cab.jpeg', alt: 'Toyota Camry steering wheel tech infotainment Umrah cab', title: 'Tech Steering & Infotainment' },
    { src: '/images/fleet/toyota-camry/toyota-camry-passenger-seats-comfortable-umrah-saudi-arabia.jpeg', alt: 'Toyota Camry passenger seats comfortable Umrah Saudi Arabia', title: 'Comfortable Passenger Seats' },
    { src: '/images/fleet/toyota-camry/toyota-camry-rear-legroom-spacious-interior-umrah-travel.jpeg', alt: 'Toyota Camry rear legroom spacious interior Umrah travel', title: 'Spacious Rear Legroom' },
    { src: '/images/fleet/toyota-camry/toyota-camry-rear-trunk-luxury-umrah-cab-saudi-arabia.jpeg', alt: 'Toyota Camry rear trunk luxury Umrah cab Saudi Arabia', title: 'Generous Trunk Space' },
];

const specs = [
    { icon: Fuel, title: 'Fuel Efficiency', desc: '2.5L Hybrid engine delivering 208 HP with outstanding fuel economy for long Saudi routes.' },
    { icon: Users, title: 'Comfort & Seating', desc: 'Premium leather seats for 4 passengers with dual-zone automatic climate control.' },
    { icon: Shield, title: 'Safety Systems', desc: 'Toyota Safety Sense — pre-collision system, lane departure alert, and adaptive cruise control.' },
    { icon: Wifi, title: 'Tech & Connectivity', desc: '9" infotainment display, wireless Apple CarPlay, Android Auto, and USB-C charging ports.' },
    { icon: Briefcase, title: 'Luggage Capacity', desc: '15.1 cu ft trunk accommodating 2–3 large suitcases — perfect for airport transfers.' },
    { icon: Star, title: 'Ride Quality', desc: 'Sound-dampened cabin with smooth suspension for a quiet, peaceful journey.' },
];

const camryFAQs = [
    { q: 'How many passengers fit in a Toyota Camry?', a: 'The Toyota Camry comfortably seats 4 passengers, making it ideal for couples, small families, and solo travelers.' },
    { q: 'Is there enough luggage space in the Camry?', a: 'Yes — the Camry has a 15.1 cu ft trunk, fitting 2–3 large suitcases. For more luggage we recommend our SUV options.' },
    { q: 'Is the Toyota Camry available for Jeddah Airport transfers?', a: 'Yes! We provide 24/7 Jeddah Airport to Makkah and Madinah transfers in our Camry fleet with professional drivers.' },
    { q: 'Can I book a Toyota Camry for Ziyarat tours?', a: 'Absolutely. Our Camry is available for Makkah and Madinah Ziyarat tours with knowledgeable drivers.' },
    { q: 'Are child seats available in the Camry?', a: 'Yes, child seats are available upon request for a small additional fee. Please mention it in your booking notes.' },
];

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Fleet", "item": "https://www.kiswahumrahcab.com/fleet" },
                { "@type": "ListItem", "position": 3, "name": "Toyota Camry", "item": "https://www.kiswahumrahcab.com/fleet/toyota-camry" }
            ]
        },
        {
            "@type": "Product",
            "name": "Toyota Camry Executive Sedan – Al Kiswah Umrah Cab",
            "image": "https://www.kiswahumrahcab.com/images/fleet/toyota-camry/toyota-camry-front-view-executive-sedan-al-kiswah-cab.jpeg",
            "description": "Premium Toyota Camry for Umrah travel, airport transfers, and intercity journeys across Saudi Arabia. Ideal for couples and small families.",
            "brand": { "@type": "Brand", "name": "Toyota" },
            "offers": { "@type": "Offer", "price": "200", "priceCurrency": "SAR", "availability": "https://schema.org/InStock", "url": "https://www.kiswahumrahcab.com/fleet/toyota-camry" },
            "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "187", "bestRating": "5", "worstRating": "1" }
        },
        {
            "@type": "Service",
            "name": "Toyota Camry Umrah Transfer Service",
            "provider": { "@type": "LocalBusiness", "name": "Al Kiswah Umrah Cab", "url": "https://www.kiswahumrahcab.com" },
            "areaServed": ["Makkah", "Madinah", "Jeddah", "Taif"],
            "serviceType": "Private Chauffeur Service",
            "description": "Executive Toyota Camry sedan for Umrah pilgrims, airport transfers, and Ziyarat tours across Saudi Arabia."
        },
        {
            "@type": "FAQPage",
            "mainEntity": camryFAQs.map(f => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a }
            }))
        }
    ]
};

export default async function ToyotaCamryPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Toyota%20Camry%20for%20Umrah`;
    const vehicles = await vehicleService.getActiveVehicles();
    const vehicleData = vehicles.find((v: any) => v.name.toLowerCase().includes('camry'));
    const camryId = vehicleData?.id || '692db09834f15bc89b45a5f6';

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* A. Cinematic Hero */}
            <section className="relative h-[92vh] min-h-[600px] flex items-end pb-20">
                <div className="absolute inset-0">
                    <Image
                        src="/images/fleet/toyota-camry/toyota-camry-side-road-driving-jeddah-makkah-highway.jpeg"
                        alt="Toyota Camry executive sedan for Umrah travel Saudi Arabia"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <span className="inline-block bg-amber-500 text-slate-900 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">Most Popular Sedan</span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-playfair text-white mb-5 max-w-4xl leading-tight">
                        Toyota Camry –<br />
                        <span className="text-amber-400">Executive Comfort</span><br />
                        for Umrah Travel
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
                        Smooth, stylish, and perfect for couples, small families &amp; business travelers across Saudi Arabia.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/booking?vehicle=camry" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center gap-2">
                            Book Now <ArrowRight size={20} />
                        </Link>
                        <a href={whatsappLink} className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center gap-2">
                            WhatsApp
                        </a>
                        <a href="tel:+966500000000" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2">
                            <Phone size={20} /> Call Us
                        </a>
                    </div>
                </div>
            </section>

            {/* Breadcrumb Strip */}
            <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3">
                <div className="container mx-auto px-4">
                    <nav aria-label="breadcrumb">
                        <ol className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <li><Link href="/" className="hover:text-amber-600 transition-colors">Home</Link></li>
                            <li className="text-slate-400">/</li>
                            <li><Link href="/fleet" className="hover:text-amber-600 transition-colors">Fleet</Link></li>
                            <li className="text-slate-400">/</li>
                            <li className="text-amber-600 font-medium">Toyota Camry</li>
                        </ol>
                    </nav>
                </div>
            </div>

            {/* B. Quick Stats Bar */}
            <section className="bg-slate-900 border-y border-slate-700 py-6">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { val: '4', label: 'Passengers' },
                            { val: '2–3', label: 'Suitcases' },
                            { val: '2.5L', label: 'Hybrid Engine' },
                            { val: '24/7', label: 'Availability' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="text-3xl font-bold text-amber-400 font-playfair">{s.val}</div>
                                <div className="text-slate-400 text-sm mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* C. Exterior Gallery */}
            <section className="py-20 bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Exterior Design</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mt-3 mb-4">Refined Road Presence</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Bold aerodynamic styling, LED lighting, and signature alloy wheels that command attention on every route.</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {exteriorImages.map((img, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <span className="text-white font-bold text-sm">{img.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* D. Interior Gallery */}
            <section className="py-20 bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Interior Luxury</span>
                        <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mt-3 mb-4">Premium Cabin Experience</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">Soft leather, whisper-quiet ride, and modern technology — every detail crafted for pilgrim comfort.</p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {interiorImages.map((img, i) => (
                            <div key={i} className="group relative rounded-2xl overflow-hidden aspect-[4/3]">
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                                    <h4 className="font-bold text-base text-amber-400">{img.title}</h4>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* E. Specifications Grid */}
            <section className="py-20 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mb-3">Premium Specifications</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {specs.map((s, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                <s.icon className="w-10 h-10 text-amber-500 mb-4" />
                                <h3 className="font-bold text-xl mb-2 text-slate-900 dark:text-white">{s.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* F. SEO Content + Why Choose */}
            <section className="py-24 bg-amber-50 dark:bg-amber-900/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8 text-slate-900 dark:text-white text-center">
                            Toyota Camry – Executive Sedan for Umrah, Airport Transfers & Saudi Travel
                        </h2>
                        <div className="prose prose-lg dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 space-y-6">
                            <p>The <strong>Toyota Camry</strong> is one of the most popular and reliable sedans for <strong>Umrah travel, airport transfers, and intercity journeys</strong> across Saudi Arabia. Known for its exceptional comfort, fuel efficiency, and smooth driving experience, the Camry is the perfect choice for couples, small families, business travelers, and pilgrims seeking a peaceful and elegant ride. At <strong>Al Kiswah Umrah Cab</strong>, we offer the Toyota Camry as part of our premium fleet, ensuring a safe, clean, and comfortable journey for every passenger.</p>
                            <p>The Camry's exterior features a sleek aerodynamic body, stylish LED headlights, and a modern executive look. Whether you are traveling from <Link href="/services/jeddah-airport-transfer" className="text-amber-600 font-semibold hover:underline">Jeddah Airport to Makkah</Link>, heading toward <Link href="/services/makkah-madinah-taxi" className="text-amber-600 font-semibold hover:underline">Madinah</Link>, or exploring holy sites during <Link href="/services/ziyarat-tours" className="text-amber-600 font-semibold hover:underline">Ziyarat tours</Link>, the Camry delivers a stable and refined driving experience. Its fuel-efficient hybrid engine makes it ideal for long routes.</p>
                            <p>Inside, the Toyota Camry provides a premium environment with <strong>comfortable leather seating</strong>, a modern infotainment system, spacious legroom, and excellent dual-zone climate control. The quiet cabin ensures a relaxing journey, especially for elderly pilgrims or travelers who prefer a peaceful ride.</p>
                            <p>At <strong>Al Kiswah Umrah Cab</strong>, we maintain our Camry fleet with strict standards of cleanliness, safety, and performance. Our professional drivers ensure timely pickups, courteous service, and complete assistance. With transparent pricing, 24/7 availability, and easy online booking, we make your travel experience seamless and enjoyable.</p>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mt-16">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
                            <Image
                                src="/images/fleet/toyota-camry/toyota-camry-taif-road-mountain-drive-luxury-umrah-cab.jpeg"
                                alt="Toyota Camry ideal for Umrah and Saudi Arabia travel"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold font-playfair mb-8 text-slate-900 dark:text-white">Why Choose Camry for Umrah Travel?</h3>
                            <ul className="space-y-4">
                                {[
                                    'Ideal for couples & small families',
                                    'Smooth, quiet ride for long routes',
                                    'Comfortable for elderly passengers',
                                    'Perfect for airport transfers',
                                    'Affordable premium option',
                                    'Fuel-efficient hybrid engine',
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-amber-100 dark:border-slate-800 hover:-translate-y-1 transition-transform">
                                        <CheckCircle className="w-6 h-6 text-amber-500 shrink-0" />
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* G. Pricing Grid */}
            <FleetPricingGrid
                vehicleId={camryId}
                vehicleImage="/images/fleet/toyota-camry/toyota-camry-front-view-executive-sedan-al-kiswah-cab.jpeg"
                vehicleType="camry"
                title="Toyota Camry Umrah Packages & Pricing"
                subtitle="Transparent, fixed pricing for Jeddah, Makkah, and Madinah journeys."
            />

            {/* H. Route Packages */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-14">
                        <span className="text-amber-500 font-bold tracking-widest uppercase text-sm">Routes & Packages</span>
                        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mt-3 mb-3">Popular Toyota Camry Routes</h2>
                        <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                route: 'Jeddah Airport → Makkah',
                                desc: 'Direct executive pickup from King Abdulaziz International Airport to your hotel in Makkah. Meet & greet service included.',
                                badge: 'Most Booked',
                                href: '/services/jeddah-airport-transfer',
                                icon: '✈️',
                            },
                            {
                                route: 'Makkah → Madinah',
                                desc: 'Comfortable 4-hour intercity transfer between the two holy cities with a professional driver. Fixed transparent pricing.',
                                badge: 'Holy Route',
                                href: '/services/makkah-madinah-taxi',
                                icon: '🕌',
                            },
                            {
                                route: 'Ziyarat Packages',
                                desc: 'Full-day Ziyarat tours in Makkah & Madinah — visit Jabal al-Nour, Arafat, Quba Mosque, and more at your pace.',
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
                            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-slate-900 dark:text-white mt-3 mb-2">Reserve Your Toyota Camry</h2>
                            <p className="text-slate-500 dark:text-slate-400">Fill in your details and our team will confirm your booking within minutes.</p>
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-100 dark:border-slate-700">
                            <div className="grid md:grid-cols-2 gap-5">
                                {[
                                    { label: 'Full Name', placeholder: 'Your full name', type: 'text', id: 'camry-name' },
                                    { label: 'Phone / WhatsApp', placeholder: '+966 5XX XXX XXXX', type: 'tel', id: 'camry-phone' },
                                    { label: 'Pickup Location', placeholder: 'e.g. Jeddah Airport, Terminal 1', type: 'text', id: 'camry-pickup' },
                                    { label: 'Drop Location', placeholder: 'e.g. Makkah Grand Mosque Hotel', type: 'text', id: 'camry-drop' },
                                    { label: 'Date & Time', placeholder: '', type: 'datetime-local', id: 'camry-datetime' },
                                    { label: 'No. of Passengers', placeholder: 'e.g. 3', type: 'number', id: 'camry-passengers' },
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
                                    <label htmlFor="camry-vehicle" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Vehicle</label>
                                    <input id="camry-vehicle" type="text" value="Toyota Camry (Pre-selected)" readOnly className="w-full px-4 py-3 rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold focus:outline-none cursor-not-allowed" />
                                </div>
                            </div>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <Link href="/booking?vehicle=camry" className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg text-center transition-all hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
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

            {/* H. CTA Banner */}
            <section className="py-24 relative flex items-center justify-center">
                <div className="absolute inset-0">
                    <Image
                        src="/images/fleet/toyota-camry/toyota-camry-full-profile-luxury-sedan-umrah-pilgrims.jpeg"
                        alt="Book Toyota Camry for Umrah travel"
                        fill
                        className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />
                </div>
                <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-6">Ready to Book Your Camry?</h2>
                    <p className="text-lg text-slate-300 mb-10">Reserve your Toyota Camry instantly with our online booking or chat with our support team on WhatsApp.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking?vehicle=camry" className="bg-amber-500 hover:bg-amber-400 text-slate-900 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2">
                            Go to Booking Form <ArrowRight size={20} />
                        </Link>
                        <a href={whatsappLink} className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
                            Book via WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            <FAQSection items={camryFAQs.map(f => ({ question: f.q, answer: f.a }))} title="Toyota Camry Umrah – Frequently Asked Questions" />

            <div className="py-10 bg-white dark:bg-slate-950">
                <FleetCarouselWrapper />
            </div>
        </main>
    );
}
