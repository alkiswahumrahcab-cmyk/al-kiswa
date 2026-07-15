import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { 
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
    Star,
    Train,
    Car
} from 'lucide-react';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import RouteVisual from '@/components/services/RouteVisual';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { getSettings } from '@/lib/settings-storage';

const makkahMadinahFAQs = [
    {
        question: "What is the price of a taxi from Makkah to Madinah?",
        answer: "Our prices are fixed and strictly transparent with no hidden fees. A private 4-seater Sedan starts from SAR 400. If you need more space, our luxury 7-seater vehicles (GMC Yukon or Hyundai Staria) start from SAR 600. Prices may vary slightly during peak Ramadan or Hajj seasons."
    },
    {
        question: "Which vehicle is best for a family or large group?",
        answer: "For small families (up to 4 people), a Sedan is economical and comfortable. For up to 7 passengers with standard luggage, the Hyundai Staria or GMC Yukon provides a premium, spacious ride. If you have a larger group (up to 11 people) or excessive luggage, we highly recommend booking the Toyota HiAce."
    },
    {
        question: "How long is the journey from Makkah to Madinah?",
        answer: "The distance between Makkah and Madinah is approximately 450 km. By private taxi, the journey typically takes 4.5 to 5 hours driving on the direct highway (Route 15). You can request rest stops for food, prayer, or restrooms at any time."
    },
    {
        question: "Can we stop at the Miqat (Bir Ali)?",
        answer: "Yes. If you are traveling from Madinah to Makkah, or require a stop at Bir Ali, we can accommodate a 15-30 minute stop at the Miqat so you can assume Ihram. Please inform your driver or select this option when booking."
    },
    {
        question: "Can we do Ziyarat stops en route (e.g., Badr)?",
        answer: "Yes, a major advantage of a private taxi is flexibility. We can arrange a stop at historical sites like the Battle of Badr location along the way, or organize a dedicated Ziyarat tour within Madinah upon your arrival. Additional charges apply for custom routing; contact us via WhatsApp for a quote."
    },
    {
        question: "How does a private taxi compare to the Haramain Train?",
        answer: "While the train is fast, a private taxi provides door-to-door service. You do not need to arrange separate transport to the train station in Makkah, handle your heavy luggage through terminals, or wait for scheduled departures. We pick you up from your Makkah hotel lobby and drop you exactly at your Madinah hotel."
    },
    {
        question: "How do I pay for my transfer?",
        answer: "You can easily book online or via WhatsApp. You have the flexibility to pay securely online in advance, or you can pay cash (in SAR) directly to your professional driver on the day of your transfer."
    }
];

export const metadata: Metadata = {
    title: "Makkah to Madinah Taxi Price 2026 | Private Transfer | Al Kiswah",
    description: "Book a private Makkah to Madinah taxi transfer. Door-to-door service, 4.5-hour journey. Fixed price guaranteed. Sedan from SAR 400, SUV from SAR 600.",
    alternates: generateMetadataAlternates("/services/makkah-madinah-taxi"),
    openGraph: {
        title: "Makkah to Madinah Taxi Price 2026 | Private Transfer | Al Kiswah",
        description: "Book a private Makkah to Madinah taxi transfer. Door-to-door service, 4.5-hour journey. Fixed price guaranteed. Sedan from SAR 400, SUV from SAR 600.",
        images: [{ url: '/images/routes/makkah-madinah-route-hero.webp', width: 1200, height: 630, alt: 'Private taxi for Makkah to Madinah transfer' }]
    }
};

const vehicleOptions = [
    { name: 'Standard Sedan', seats: '4', luggage: '2-3 Bags', bestFor: 'Couples', desc: 'Comfortable standard sedan ideal for individuals or couples.', image: null },
    { name: 'GMC Yukon', seats: '7', luggage: '6 Bags', bestFor: 'Luxury', desc: 'Premium American SUV offering superior highway comfort and presence.', image: '/images/fleet/gmc/gmc-yukon-2026-exterior-front-view.jpeg' },
    { name: 'Hyundai Staria', seats: '7', luggage: '7 Bags', bestFor: 'Families', desc: 'Premium comfort with ample legroom and panoramic windows.', image: '/images/fleet/staria/hyundai-staria-2026-exterior-front-view.jpeg' },
    { name: 'Toyota HiAce', seats: '11', luggage: '10 Bags', bestFor: 'Extended families', desc: 'Spacious van ensuring everyone travels together with all luggage secured.', image: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg' },
    { name: 'Toyota Coaster', seats: '19', luggage: '15 Bags', bestFor: 'Large groups', desc: 'Mini-bus designed for group travel without compromising on air-conditioned comfort.', image: '/images/fleet/toyota-coaster-2025.webp' }
];

export default async function MakkahMadinahTaxiPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20need%20a%20taxi%20from%20Makkah%20to%20Madinah`;

    const jsonLd = [
        {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://kiswahumrahcab.com/services/makkah-madinah-taxi/#service",
            "name": "Makkah to Madinah Taxi",
            "serviceType": "Intercity Transfer",
            "description": "Private door-to-door taxi transfer from your hotel in Makkah to your hotel in Madinah. Fixed prices starting from SAR 400 for a Sedan. ~450 km journey taking 4.5 hours.",
            "url": "https://kiswahumrahcab.com/services/makkah-madinah-taxi",
            "provider": {
                "@type": "LocalBusiness",
                "@id": "https://kiswahumrahcab.com/#organization",
                "name": "Al Kiswah Umrah Transport",
                "telephone": phoneNumber
            },
            "areaServed": [
                { "@type": "City", "name": "Makkah" },
                { "@type": "City", "name": "Madinah" }
            ],
            "availableChannel": {
                "@type": "ServiceChannel",
                "serviceUrl": "https://kiswahumrahcab.com/booking",
                "availableLanguage": ["English", "Arabic", "Urdu"]
            },
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "SAR",
                "lowPrice": "400",
                "highPrice": "600",
                "offerCount": "2"
            }
        },
        {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://kiswahumrahcab.com/services/makkah-madinah-taxi/#faq",
            "mainEntity": makkahMadinahFAQs.map(faq => ({
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
            "@id": "https://kiswahumrahcab.com/services/makkah-madinah-taxi/#breadcrumb",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://kiswahumrahcab.com" },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://kiswahumrahcab.com/services" },
                { "@type": "ListItem", "position": 3, "name": "Makkah to Madinah Taxi", "item": "https://kiswahumrahcab.com/services/makkah-madinah-taxi" }
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
                        src="/images/routes/makkah-madinah-route-hero.webp"
                        alt="Private taxi for Makkah to Madinah transfer"
                        fill
                        priority
                        className="object-cover opacity-[0.15] mix-blend-multiply"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface" />
                </div>

                <div className="container relative z-10">
                    <div className="max-w-4xl">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wider uppercase text-muted mb-6 md:mb-8 font-body">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <span>›</span>
                            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                            <span>›</span>
                            <span className="text-gold">Makkah to Madinah</span>
                        </div>

                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6 backdrop-blur-sm">
                            <MapPin size={16} />
                            <span className="text-[13px] font-bold tracking-wider uppercase">Premium Intercity Transfer</span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-6 tracking-tight">
                            Makkah to Madinah Taxi
                        </h1>

                        <p className="font-body text-lg md:text-xl text-body leading-relaxed mb-6 max-w-2xl font-light">
                            Travel the 450 km between the two Holy Cities in complete comfort. A door-to-door private transfer that drops you right at your hotel lobby.
                        </p>

                        <div className="flex flex-wrap items-center gap-6 mb-10 text-ink font-body">
                            <div className="bg-surface-alt border border-border px-4 py-2 rounded-xl">
                                <span className="text-[13px] text-muted block uppercase font-bold tracking-wider mb-1">Standard Sedan</span>
                                <span className="font-semibold text-lg text-gold">From SAR 400</span>
                            </div>
                            <div className="bg-surface-alt border border-border px-4 py-2 rounded-xl">
                                <span className="text-[13px] text-muted block uppercase font-bold tracking-wider mb-1">Premium SUV (GMC/Staria)</span>
                                <span className="font-semibold text-lg text-gold">From SAR 600</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                href={whatsappLink}
                                className="inline-flex items-center justify-center gap-2 bg-gold text-ink px-8 py-4 rounded-btn font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-gold-light transition-colors shadow-sm"
                            >
                                Book Your Transfer
                            </Link>
                            <Link 
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 bg-transparent text-ink border-2 border-border px-8 py-4 rounded-btn font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:border-gold hover:text-gold transition-colors shadow-sm"
                            >
                                Get Exact Prices
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

            {/* 2. WHY CHOOSE / FEATURE CARDS */}
            <section className="py-[64px] md:py-[120px] bg-bg relative">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            Seamless Highway Travel
                        </span>
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mb-6">
                            Why Choose Our Intercity Taxi?
                        </h2>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light mb-6">
                            The 450 km journey via Route 15 requires a vehicle that guarantees comfort and safety. Skip the crowded buses and inflexible train schedules.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Hotel size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">Door-to-Door Service</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                We pick you up from your Makkah hotel lobby and drop you directly at your Madinah hotel.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Luggage size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">No Luggage Limits</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Unlike trains with strict baggage policies, you can bring all your luggage (within vehicle capacity).
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Clock size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">Flexible Departure</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Punctual pickups at any time of day or night. You dictate the schedule, not a ticket counter.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">Miqat Stop (Bir Ali)</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Stop at the Miqat for 15-30 minutes if you need to assume Ihram on your journey.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. TAXI VS TRAIN COMPARISON */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt border-y border-border">
                <div className="container max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            MAKE THE RIGHT CHOICE
                        </span>
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mb-6">
                            Private Taxi vs. Haramain Train
                        </h2>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light max-w-2xl mx-auto">
                            While the high-speed train is fast, a private taxi is often faster end-to-end for families when you factor in station transit and waiting times.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-surface border border-border rounded-[20px] p-8 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-gold/10 text-gold flex items-center justify-center rounded-full">
                                    <Car size={28} />
                                </div>
                                <h3 className="font-display font-bold text-[24px] text-ink">Al Kiswah Taxi</h3>
                            </div>
                            <ul className="space-y-4 font-body text-[15px] text-body">
                                <li className="flex items-start gap-3"><Check className="text-gold shrink-0 mt-0.5" size={18} /> <strong>Total Time:</strong> ~4.5 hours hotel-to-hotel</li>
                                <li className="flex items-start gap-3"><Check className="text-gold shrink-0 mt-0.5" size={18} /> <strong>Luggage:</strong> Fill the trunk, no weigh-ins</li>
                                <li className="flex items-start gap-3"><Check className="text-gold shrink-0 mt-0.5" size={18} /> <strong>Convenience:</strong> Step out of your hotel lobby into the car</li>
                                <li className="flex items-start gap-3"><Check className="text-gold shrink-0 mt-0.5" size={18} /> <strong>Cost for Families:</strong> Often cheaper per-person for groups of 4+</li>
                            </ul>
                        </div>

                        <div className="bg-bg border border-border rounded-[20px] p-8 shadow-sm">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 bg-surface-alt text-muted flex items-center justify-center rounded-full border border-border">
                                    <Train size={28} />
                                </div>
                                <h3 className="font-display font-bold text-[24px] text-ink">Haramain Train</h3>
                            </div>
                            <ul className="space-y-4 font-body text-[15px] text-body-light">
                                <li className="flex items-start gap-3"><span className="text-muted shrink-0 mt-0.5 px-1">—</span> <strong>Total Time:</strong> 2.5 hr train + 1 hr station transit/wait + 1 hr hotel taxis</li>
                                <li className="flex items-start gap-3"><span className="text-muted shrink-0 mt-0.5 px-1">—</span> <strong>Luggage:</strong> Strictly 1 large bag + 1 carry-on per ticket</li>
                                <li className="flex items-start gap-3"><span className="text-muted shrink-0 mt-0.5 px-1">—</span> <strong>Convenience:</strong> Requires booking separate taxis to/from stations</li>
                                <li className="flex items-start gap-3"><span className="text-muted shrink-0 mt-0.5 px-1">—</span> <strong>Cost for Families:</strong> Expensive per-ticket for larger groups</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. JOURNEY VISUAL */}
            <section className="py-[64px] md:py-[100px] bg-surface border-b border-border overflow-hidden">
                <div className="container">
                    <div className="max-w-4xl mx-auto text-center mb-10">
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink">
                            The Route Timeline
                        </h2>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <RouteVisual
                            from="Makkah Hotel"
                            fromLabel="Pickup"
                            to="Madinah Hotel"
                            toLabel="Drop-off"
                            duration="~4.5 Hours"
                            distance="450 km Highway"
                            showMiqat={true}
                        />
                    </div>
                </div>
            </section>

            {/* 5. ROUTE PRICING TABLE */}
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
                                            <MapPin size={16} className="text-gold shrink-0" /> Makkah → Madinah
                                        </td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 400</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 700</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 600</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 700</td>
                                    </tr>
                                    <tr className="hover:bg-bg transition-colors">
                                        <td className="p-5 font-bold text-ink flex items-center gap-2">
                                            <MapPin size={16} className="text-gold shrink-0" /> Madinah → Makkah
                                        </td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 400</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 700</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 600</td>
                                        <td className="p-5 text-center font-semibold text-gold">SAR 700</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <SeasonalPricingNote className="mt-8" />
                    </div>
                </div>
            </section>

            {/* 6. VEHICLE CAPACITY GUIDE */}
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

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            {/* 7. WHY PILGRIMS TRUST AL KISWAH */}
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
                                We operate day and night. Schedule your pickup for whenever suits you best.
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

            {/* 8. FAQS */}
            <section className="py-[64px] md:py-[120px] bg-surface border-t border-border">
                <div className="container max-w-4xl mx-auto px-4">
                    <h2 className="text-[32px] md:text-[44px] font-semibold text-center mb-16 font-display text-ink">
                        Makkah to Madinah FAQs
                    </h2>
                    <div className="space-y-4">
                        {makkahMadinahFAQs.map((faq, i) => (
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

            {/* 9. RETURN JOURNEY CTA BAND */}
            <section className="py-[64px] md:py-[100px] bg-ink text-center px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
                <div className="container max-w-2xl relative z-10">
                    <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-4">
                        ROUND-TRIP OFFER
                    </span>
                    <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-surface mb-6">
                        Heading Back to Makkah?
                    </h2>
                    <p className="font-body text-[17px] text-surface-muted mb-10 leading-relaxed">
                        Book your return journey from Madinah to Makkah at the same time and save time. Our driver picks you up from your Madinah hotel lobby — no stress, no haggling.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/booking" className="w-full sm:w-auto bg-gold hover:bg-gold-light text-ink font-body font-bold text-[15px] py-[16px] px-10 rounded-btn uppercase tracking-[0.08em] transition-colors shadow-sm">
                            Book Round-Trip Now
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
