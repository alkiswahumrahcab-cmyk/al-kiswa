import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { 
    Plane, 
    Clock, 
    Hotel, 
    MapPin, 
    ChevronDown, 
    CarFront,
    ShieldCheck,
    Check,
    Phone,
    Users,
    Luggage,
    Star
} from 'lucide-react';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import RouteVisual from '@/components/services/RouteVisual';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { getSettings } from '@/lib/settings-storage';

const jeddahAirportFAQs = [
    {
        question: "How much is a Jeddah Airport to Makkah taxi?",
        answer: "A private transfer from King Abdulaziz International Airport (JED) to a Makkah hotel starts from SAR 180 for a standard Sedan, and up to SAR 350 for a large family vehicle like a Toyota HiAce. These are 100% fixed prices covering the entire vehicle, fuel, and tolls. There are no hidden fees or metered charges."
    },
    {
        question: "Where do I meet my driver at Jeddah Airport (KAIA)?",
        answer: "Your driver will meet you directly inside the arrival hall of your terminal (Terminal 1, North, or Hajj Terminal). They will be holding a personalized name sign so you can spot them immediately. Our meet-and-greet service means you won't need to step outside into the heat to find your taxi; the driver will assist with your luggage and escort you to the car."
    },
    {
        question: "What if my flight into Jeddah is delayed?",
        answer: "We track your flight number in real-time. If your arrival is delayed, or even if it arrives early, your driver adjusts automatically and will be waiting for you when you land. We do not charge any extra fees for flight delays or waiting time."
    },
    {
        question: "Which vehicle should I choose for my family and luggage?",
        answer: "For couples or small groups of up to 4, a Sedan is perfect. For families of up to 7 passengers with standard luggage, we recommend the Hyundai Staria or GMC Yukon. For larger extended families (up to 11 passengers), the Toyota HiAce is ideal, and for big groups, we offer the 19-seater Toyota Coaster. When booking, select the vehicle that best fits both your passenger count and luggage volume."
    },
    {
        question: "How long is the journey from Jeddah Airport to Makkah?",
        answer: "The drive from Jeddah Airport to Makkah is approximately 90 kilometers and typically takes around 1 hour via the direct highway. Traffic conditions during peak seasons (like Ramadan or Hajj) may add to this time, but your fixed price remains the same regardless of traffic."
    },
    {
        question: "Do your drivers speak English?",
        answer: "Yes, many of our professional drivers speak English, as well as Arabic and Urdu. They are experienced in serving international Umrah pilgrims and will ensure clear communication and a hospitable welcome to Saudi Arabia."
    },
    {
        question: "Is the driver and vehicle Nusuk or Ministry licensed?",
        answer: "Absolutely. Every vehicle in the Al Kiswah fleet is fully licensed and registered with the Ministry of Hajj & Umrah (Nusuk-Registered). Our drivers are trained professionals, ensuring your journey meets all official safety and quality standards."
    },
    {
        question: "How do I pay for my transfer?",
        answer: "You can book your transfer online or via WhatsApp. We offer the flexibility to pay securely online in advance, or you can choose to pay cash directly to your driver on the day of your arrival in SAR."
    }
];

export const metadata: Metadata = {
    title: "Jeddah Airport to Makkah Taxi | Fixed Price Transfer | Al Kiswah",
    description: "Book a private Jeddah Airport (KAIA) to Makkah taxi. Fixed prices, 24/7 meet & greet, flight tracking, and Nusuk-licensed vehicles. Book online instantly.",
    alternates: generateMetadataAlternates("/services/jeddah-airport-transfer"),
    openGraph: {
        title: "Jeddah Airport to Makkah Taxi | Fixed Price Transfer | Al Kiswah",
        description: "Book a private Jeddah Airport (KAIA) to Makkah taxi. Fixed prices, 24/7 meet & greet, flight tracking, and Nusuk-licensed vehicles.",
        images: [{ url: '/images/routes/jeddah-airport-hero-professional.webp', width: 1200, height: 630, alt: 'Jeddah Airport to Makkah Taxi Transfer' }]
    }
};

const vehicleOptions = [
    { name: 'Hyundai Staria', seats: '7', luggage: '7 Bags', bestFor: 'Families', desc: 'Premium comfort with ample legroom for airport transfers.', image: '/images/fleet/staria/hyundai-staria-2026-exterior-front-view.jpeg' },
    { name: 'Toyota HiAce', seats: '11', luggage: '10 Bags', bestFor: 'Extended families', desc: 'Spacious van ensuring everyone travels together with all luggage secured.', image: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg' },
    { name: 'Toyota Coaster', seats: '19', luggage: '15 Bags', bestFor: 'Large groups', desc: 'Mini-bus designed for group travel without compromising on air-conditioned comfort.', image: '/images/fleet/toyota-coaster-2025.webp' }
];

export default async function JeddahAirportTransferPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20need%20pickup%20from%20Jeddah%20Airport`;

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#service",
            "name": "Jeddah Airport to Makkah Taxi",
            "serviceType": "Airport Transfer",
            "description": "Private Umrah taxi from King Abdulaziz International Airport (KAIA) Jeddah to your hotel in Makkah. Fixed price, meet and greet, flight tracking included. 90 km, ~1 hour journey.",
            "url": "https://kiswahumrahcab.com/services/jeddah-airport-transfer",
            "provider": {
                "@type": "LocalBusiness",
                "@id": "https://kiswahumrahcab.com/#organization",
                "name": "Al Kiswah Umrah Transport",
                "telephone": phoneNumber
            },
            "areaServed": [
                { "@type": "City", "name": "Jeddah" },
                { "@type": "City", "name": "Makkah" }
            ],
            "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://kiswahumrahcab.com/booking",
                "availableLanguage": ["English", "Arabic", "Urdu"]
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "SAR",
                "lowPrice": "180",
                "highPrice": "350",
                "offerCount": "4"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#faq",
            "mainEntity": jeddahAirportFAQs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                }
            }))
        },
        {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://kiswahumrahcab.com/services/jeddah-airport-transfer/#breadcrumb",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://kiswahumrahcab.com/services" },
                { "@type": "ListItem", "position": 3, "name": "Jeddah Airport to Makkah Taxi", "item": "https://kiswahumrahcab.com/services/jeddah-airport-transfer" }
            ]
        }
    ];

    return (
        <main className="bg-bg text-body flex flex-col min-h-screen">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* 1. HERO SECTION (Light Theme) */}
            <section className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden border-b border-border bg-surface">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/routes/jeddah-airport-hero-professional.webp"
                        alt="Jeddah Airport to Makkah Taxi Transfer"
                        fill
                        priority
                        className="object-cover opacity-[0.12] mix-blend-multiply"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface" />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wider uppercase text-muted mb-6 md:mb-8 font-body">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <span>›</span>
                            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                            <span>›</span>
                            <span className="text-gold">Jeddah Airport Transfer</span>
                        </div>

                        {/* Trust Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6 backdrop-blur-sm">
                            <ShieldCheck size={16} />
                            <span className="text-[13px] font-bold tracking-wider uppercase">Ministry Licensed Operator</span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-6 tracking-tight">
                            Jeddah Airport to Makkah Transfers
                        </h1>

                        <p className="font-body text-lg md:text-xl text-body leading-relaxed mb-8 md:mb-10 max-w-2xl font-light">
                            Private, fixed-price Umrah taxi from King Abdulaziz International Airport (KAIA) directly to your hotel in Makkah. Real-time flight tracking and 24/7 meet & greet included.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                href={whatsappLink}
                                className="inline-flex items-center justify-center gap-2 bg-gold text-ink px-8 py-4 rounded-btn font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-gold-light transition-colors shadow-sm"
                            >
                                Book Arrival Transfer
                            </Link>
                            <Link 
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 bg-transparent text-ink border-2 border-border px-8 py-4 rounded-btn font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:border-gold hover:text-gold transition-colors shadow-sm"
                            >
                                Get Prices
                            </Link>
                        </div>

                        {/* Trust Signals Row */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-[13px] font-bold tracking-wider uppercase text-muted">
                            <div className="flex items-center gap-2">
                                <Star size={16} className="text-gold fill-gold" />
                                <span>10,000+ Pilgrims</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gold" />
                                <span>Nusuk Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-gold" />
                                <span>24/7 Availability</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Widget */}
            <div className="container relative z-20 -mt-8 mb-16 flex justify-center">
                <div className="w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden border border-border">
                    <BookingFormWrapper />
                </div>
            </div>

            {/* 2. ARRIVAL PROCEDURE & WHICH TERMINAL? */}
            <section className="py-[64px] md:py-[120px] bg-bg relative">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            Stress-Free Welcome
                        </span>
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mb-6">
                            Arrival Procedure & Which Terminal?
                        </h2>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light mb-6">
                            Arriving in Jeddah for Umrah can be busy. Avoid the hassle of haggling with local taxis. Our professional drivers greet you at the arrival terminal with a name sign and assist with your luggage to your comfortable private vehicle.
                        </p>
                        <div className="font-body text-[17px] leading-[1.8] text-body-light font-medium bg-surface border border-border p-8 rounded-2xl text-left shadow-sm">
                            <h3 className="font-display text-[22px] font-bold text-ink mb-3">Which Terminal at Jeddah Airport (KAIA)?</h3>
                            <p className="mb-4">King Abdulaziz International Airport (JED) has multiple terminals for arriving pilgrims:</p>
                            <ul className="space-y-2 list-disc list-inside">
                                <li><strong className="text-ink">Terminal 1:</strong> The stunning new main terminal handling Saudia Airlines, Flynas, and most international carriers.</li>
                                <li><strong className="text-ink">North Terminal:</strong> Handles various foreign airlines.</li>
                                <li><strong className="text-ink">Hajj Terminal:</strong> A dedicated, iconic open-air terminal used primarily during the Hajj and peak Umrah seasons.</li>
                            </ul>
                            <p className="mt-4">Regardless of which terminal your flight lands at, our dispatch team tracks your flight and ensures your driver is waiting for you in the correct arrival hall.</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Plane size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">1. Flight Tracking</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                We monitor your flight status to ensure we are there when you land, adjusting for any delays automatically.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">2. Meet & Greet</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Your driver will be waiting in the arrival hall holding a sign with your name on it for easy recognition.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Hotel size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">3. Hotel Drop-off</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Relax in a premium, air-conditioned vehicle for the ~1 hour drive directly to your Makkah hotel lobby.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. JOURNEY VISUAL */}
            <section className="py-[64px] md:py-[100px] bg-surface border-y border-border overflow-hidden">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink">
                            Your Journey to Makkah
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <RouteVisual
                            from="Jeddah KAIA (JED)"
                            fromLabel="Arrival Terminal"
                            to="Makkah Hotel"
                            toLabel="Direct Drop-off"
                            duration="~1 Hour"
                            distance="90 km Highway"
                            showMiqat={false}
                        />
                    </div>
                </div>
            </section>

            {/* 4. ROUTE PRICING TABLE */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-10 md:mb-14">
                            <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3">
                                FIXED FARES
                            </span>
                            <h2 className="text-[30px] md:text-[44px] font-semibold text-ink font-display mb-4">
                                Transparent Route Pricing
                            </h2>
                            <p className="text-body-light font-light text-lg">Fixed rates for your peace of mind. No hidden fees.</p>
                        </div>

                        <div className="overflow-x-auto rounded-[20px] border border-border shadow-sm bg-surface">
                            <table className="w-full text-sm md:text-[15px] font-body">
                                <thead>
                                    <tr className="bg-surface-alt border-b border-border">
                                        <th className="text-left p-5 text-ink font-bold uppercase tracking-wider min-w-[200px]">Route</th>
                                        <th className="text-center p-5 text-ink font-bold tracking-wider">Sedan<br/><span className="text-xs text-muted font-light">(4 Seats)</span></th>
                                        <th className="text-center p-5 text-ink font-bold tracking-wider">GMC Yukon<br/><span className="text-xs text-muted font-light">(7 Seats)</span></th>
                                        <th className="text-center p-5 text-ink font-bold tracking-wider">Hyundai Staria<br/><span className="text-xs text-muted font-light">(7 Seats)</span></th>
                                        <th className="text-center p-5 text-ink font-bold tracking-wider">Toyota HiAce<br/><span className="text-xs text-muted font-light">(11 Seats)</span></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    <tr className="hover:bg-bg transition-colors">
                                        <td className="p-5 font-bold text-ink flex items-center gap-2">
                                            <Plane size={16} className="text-gold shrink-0" /> Jeddah Airport → Makkah
                                        </td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 180</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 350</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 280</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 350</td>
                                    </tr>
                                    <tr className="hover:bg-bg transition-colors">
                                        <td className="p-5 font-bold text-ink flex items-center gap-2">
                                            <Plane size={16} className="text-gold shrink-0" /> Jeddah Airport → Madinah
                                        </td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 380</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 580</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 480</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 580</td>
                                    </tr>
                                    <tr className="hover:bg-bg transition-colors">
                                        <td className="p-5 font-bold text-ink flex items-center gap-2">
                                            <MapPin size={16} className="text-gold shrink-0" /> Makkah → Jeddah Airport
                                        </td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 150</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 300</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 250</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 300</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <SeasonalPricingNote className="mt-8" />
                    </div>
                </div>
            </section>

            {/* 5. VEHICLE CAPACITY GUIDE */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt border-y border-border">
                <div className="container">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            VEHICLE CAPACITY GUIDE
                        </span>
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            Choose Your Ideal Transfer Vehicle
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {vehicleOptions.map((vehicle, i) => (
                            <div key={i} className="bg-surface rounded-[20px] border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150">
                                <div className="aspect-[4/3] bg-bg relative border-b border-border">
                                    {vehicle.image ? (
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-muted">
                                            <CarFront size={48} opacity={0.2} />
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-body font-bold text-[19px] md:text-[22px] text-ink mb-2">
                                        {vehicle.name}
                                    </h3>
                                    <div className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
                                        {vehicle.bestFor}
                                    </div>
                                    
                                    <div className="flex gap-4 mb-4 border-b border-border pb-4">
                                        <div className="flex items-center gap-2 text-body">
                                            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-ink border border-border">
                                                <Users size={16} />
                                            </div>
                                            <span className="text-[15px] font-medium">{vehicle.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-body">
                                            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-ink border border-border">
                                                <Luggage size={16} />
                                            </div>
                                            <span className="text-[15px] font-medium">{vehicle.luggage}</span>
                                        </div>
                                    </div>

                                    <p className="text-body-light text-[15px] leading-[1.6]">
                                        {vehicle.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. WHY PILGRIMS TRUST AL KISWAH */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            10,000+ PILGRIMS SERVED
                        </span>
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mb-6">
                            Why Pilgrims Trust Al Kiswah
                        </h2>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm text-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 mx-auto">
                                <Clock size={28} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-1">24/7 Availability</h3>
                            <p className="text-gold font-body font-semibold text-sm mb-4">متاح على مدار الساعة</p>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                We operate day and night. Whenever your flight lands, your driver is ready.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm text-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 mx-auto">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-1">Fixed Pricing</h3>
                            <p className="text-gold font-body font-semibold text-sm mb-4">أسعار ثابتة</p>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                The price you book is exactly what you pay. No meters, no haggling, no surprises.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm text-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 mx-auto">
                                <Check size={28} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-1">Nusuk Approved</h3>
                            <p className="text-gold font-body font-semibold text-sm mb-4">مرخص من وزارة الحج</p>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Our entire fleet is officially registered and licensed for pilgrim transport in Saudi Arabia.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm text-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6 mx-auto">
                                <Users size={28} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-1">Professional Drivers</h3>
                            <p className="text-gold font-body font-semibold text-sm mb-4">سائقين محترفين</p>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Experienced, courteous drivers who understand the needs of Umrah pilgrims.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FAQS */}
            <section className="py-[64px] md:py-[120px] bg-surface border-t border-border">
                <div className="container max-w-4xl mx-auto px-4">
                    <h2 className="text-[32px] md:text-[44px] font-semibold text-center mb-16 font-display text-ink">
                        Jeddah Airport Transfer FAQs
                    </h2>
                    <div className="space-y-4">
                        {jeddahAirportFAQs.map((faq, i) => (
                            <div key={i} className="group">
                                <details className="group [&_summary::-webkit-details-marker]:hidden bg-bg border border-border rounded-2xl shadow-sm hover:border-gold/30 transition-colors overflow-hidden">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-ink">
                                        <h3 className="font-semibold font-display text-lg group-open:text-gold transition-colors">{faq.question}</h3>
                                        <span className="shrink-0 rounded-full bg-surface p-1.5 text-muted sm:p-3 group-open:bg-gold/10 group-open:text-gold transition-all">
                                            <ChevronDown size={20} className="group-open:rotate-180 transition-transform duration-300" />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 pt-0 leading-relaxed text-body-light text-[15px] font-light">
                                        <div className="border-t border-border pt-4">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CTA BAND */}
            <section className="py-[64px] md:py-[100px] bg-ink text-center px-4">
                <div className="container max-w-2xl">
                    <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-4">
                        READY FOR UMRAH?
                    </span>
                    <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-surface mb-6">
                        Book Your Airport Transfer Today
                    </h2>
                    <p className="font-body text-[17px] text-surface-muted mb-10">
                        Secure your private vehicle for a comfortable, stress-free journey from Jeddah to Makkah.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/booking" className="w-full sm:w-auto bg-gold hover:bg-gold-light text-ink font-body font-bold text-[15px] py-[16px] px-10 rounded-btn uppercase tracking-[0.08em] transition-colors shadow-sm">
                            Book Online Now
                        </Link>
                        <Link href={whatsappLink} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 border-2 border-surface/20 text-surface font-body font-bold text-[15px] py-[14px] px-8 rounded-btn uppercase tracking-[0.08em] transition-colors">
                            <Phone size={18} />
                            Book via WhatsApp
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
