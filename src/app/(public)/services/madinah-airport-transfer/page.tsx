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
    Check
} from 'lucide-react';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import RouteVisual from '@/components/services/RouteVisual';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import { getSettings } from '@/lib/settings-storage';

const madinahAirportFAQs = [
    {
        question: "How much is a taxi from Madinah Airport to my hotel?",
        answer: "A private Madinah Airport taxi to a hotel in the Markazia (Central) District near Masjid Nabawi starts from SAR 120 for a standard vehicle, with a fixed price confirmed at the time of booking. The rate depends on your vehicle choice and hotel location, but it never changes based on traffic or waiting time — no meter, no surprises. For an exact price on your travel dates, enter your details on our booking page or send us your hotel name on WhatsApp."
    },
    {
        question: "Where will I meet my driver at Madinah Airport?",
        answer: "Your driver waits inside the arrival hall at Prince Mohammad Bin Abdulaziz Airport (PMIA/MED), holding a name sign, so you're recognised the moment you clear the terminal. This is a full meet-and-greet service: the driver helps with your luggage and walks you to your private vehicle. You won't need to search for a taxi rank or negotiate with drivers outside."
    },
    {
        question: "Will the driver wait if my flight is delayed?",
        answer: "Yes. We track your flight in real time using your flight number, so your driver adjusts automatically to early or late arrivals and is ready when you land — at no extra charge for the wait. This applies to late-night and early-morning flights too, since we operate 24/7. Just add your flight number when booking so we can monitor it."
    },
    {
        question: "Is the price fixed, or does it change like a metered taxi?",
        answer: "The price is completely fixed and agreed before your journey begins. Unlike metered airport taxis, the fare won't rise due to traffic, detours, or the time of day. Because Al Kiswah owns its vehicles, there are no aggregator commissions or hidden fees added on top — the quoted price is the price you pay. (During Ramadan, Hajj, and other peak periods, seasonal rates may apply, and these are always shown upfront.)"
    },
    {
        question: "Which vehicle should I choose for my family and luggage?",
        answer: "For most families, a 7-seater such as the Hyundai Staria comfortably carries up to 5–7 passengers with airport luggage. Larger groups travelling together are better suited to an 11-seat Toyota HiAce, which has generous luggage space, or a 19-seat Coaster for big group transfers. If you're unsure, tell us your passenger count and number of bags when booking and we'll match you to the right vehicle so everyone — and every suitcase — fits comfortably."
    },
    {
        question: "Are your drivers licensed and Nusuk-approved?",
        answer: "Yes. Every Al Kiswah vehicle is officially registered on the Nusuk platform, the Ministry of Hajj and Umrah's government-verified system for licensed pilgrim transport in Saudi Arabia. Our drivers are Ministry-licensed professionals experienced in serving Umrah and Ziyarat guests, and many speak English to help international pilgrims travel with confidence."
    },
    {
        question: "Can I book a transfer from Madinah Airport directly to Makkah?",
        answer: "Yes. We offer direct private transfers from Madinah Airport (MED) to Makkah hotels, a journey of roughly 450 km that takes about 4.5 hours via the Hijrah Highway. This is ideal if you're beginning your Umrah in Makkah after flying into Madinah. You can also add a stop for Ziyarat along the way — just let us know when booking and we'll plan the route around it."
    },
    {
        question: "How do I pay for my Madinah Airport transfer?",
        answer: "Booking is simple: confirm your transfer online or over WhatsApp, and you'll receive a booking reference with your fixed price. Payment is typically made directly to the driver on the day of your transfer, so there's nothing to arrange in advance. We accept payment in SAR, and can advise on other currencies (USD, GBP, EUR) if you're arriving from abroad."
    }
];

export const metadata: Metadata = {
    title: "Madinah Airport Taxi to Hotel 2026 | Al Kiswah",
    description: "Book a reliable Madinah Airport taxi to your Masjid Nabawi hotel. 24/7 VIP pickup, meet & greet, and fixed prices. Book your transfer online now.",
    keywords: [
        "madinah airport taxi",
        "madinah airport transfer",
        "madinah airport to hotel",
        "med airport taxi",
        "taxi from madinah airport to masjid nabawi",
        "vip taxi madinah airport"
    ],
    alternates: generateMetadataAlternates("/services/madinah-airport-transfer"),
    openGraph: {
        title: "Madinah Airport Taxi to Hotel 2026 | Al Kiswah",
        description: "Book a reliable Madinah Airport taxi to your Masjid Nabawi hotel. 24/7 VIP pickup, meet & greet, and fixed prices.",
        images: [{ url: '/images/routes/madinah-airport-hero.webp', width: 1200, height: 630, alt: 'Madinah Airport Transfer to Hotel' }]
    }
};

const vehicleOptions = [
    { name: 'Hyundai Staria', seats: '5-7', luggage: '4-5 Bags', bestFor: 'Families', desc: 'Premium comfort with ample legroom for airport transfers.', image: '/images/fleet/staria/hyundai-staria-2026-exterior-front-view.jpeg' },
    { name: 'Toyota HiAce', seats: '11', luggage: '10 Bags', bestFor: 'Extended families', desc: 'Spacious van ensuring everyone travels together with all luggage secured.', image: '/images/fleet/hiace/toyota-hiace-2026-exterior-front-view.jpeg' },
    { name: 'Toyota Coaster', seats: '19', luggage: '15 Bags', bestFor: 'Large groups', desc: 'Mini-bus designed for group travel without compromising on air-conditioned comfort.', image: '/images/fleet/toyota-coaster-2025.webp' }
];

export default async function MadinahAirportPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20need%20pickup%20from%20Madinah%20Airport`;

    return (
        <main className="bg-bg text-body flex flex-col min-h-screen">
            <ServiceSchema
                serviceName="Madinah Airport to Hotel Private Transfer"
                serviceType="Airport Transfer"
                description="Private taxi from Prince Mohammad Bin Abdulaziz International Airport to your hotel in Madinah. Meet and greet, luggage assistance, real-time flight tracking included."
                pageUrl="https://kiswahumrahcab.com/services/madinah-airport-transfer"
                citiesServed={["Madinah"]}
                ratingValue="4.9"
                ratingCount={245}
                priceFrom={120}
                priceTo={350}
                image="https://kiswahumrahcab.com/images/routes/madinah-airport-hero.webp"
                breadcrumbs={[
                    { name: "Home", url: "https://kiswahumrahcab.com" },
                    { name: "Services", url: "https://kiswahumrahcab.com/services" },
                    { name: "Madinah Airport Transfer", url: "https://kiswahumrahcab.com/services/madinah-airport-transfer" }
                ]}
                faqs={madinahAirportFAQs}
            />

            {/* 1. HERO SECTION */}
            <section className="relative w-full min-h-[600px] md:min-h-[720px] flex flex-col pt-32 md:pt-40 pb-40 md:pb-56 bg-surface-alt">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/routes/madinah-airport-hero.webp" 
                        alt="Madinah Airport Transfer to Masjid Nabawi Hotel" 
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                </div>

                <div className="container relative z-10 flex-1 flex flex-col justify-center">
                    <div className="max-w-3xl">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wider uppercase text-surface/80 mb-6 md:mb-8 font-body">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <span>›</span>
                            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                            <span>›</span>
                            <span className="text-gold">Madinah Airport Transfer</span>
                        </div>

                        {/* Trust Eyebrow */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold mb-6 md:mb-8 backdrop-blur-sm">
                            <ShieldCheck size={16} />
                            <span className="text-[13px] font-bold tracking-wider uppercase">Ministry Licensed Operator</span>
                        </div>

                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-surface leading-[1.1] mb-6 md:mb-8">
                            Madinah Airport (MED) Transfers
                        </h1>

                        <p className="font-body text-lg md:text-xl text-surface/90 leading-relaxed mb-8 md:mb-10 max-w-2xl font-light">
                            Start your visit to the Prophet&apos;s City with peace of mind. Reliable meet & greet service from Prince Mohammad Bin Abdulaziz Airport.
                        </p>

                        <div className="flex flex-wrap items-center gap-4">
                            <Link 
                                href={whatsappLink}
                                className="inline-flex items-center justify-center gap-2 bg-gold text-ink px-8 py-4 rounded-[8px] font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-gold-light transition-colors shadow-sm min-h-[44px] min-w-[44px]"
                            >
                                Book Airport Pickup
                            </Link>
                            <Link 
                                href="/booking"
                                className="inline-flex items-center justify-center gap-2 bg-surface text-ink px-8 py-4 rounded-[8px] font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-surface-alt transition-colors shadow-sm min-h-[44px] min-w-[44px]"
                            >
                                Get Prices
                            </Link>
                        </div>

                        {/* Trust Signals Row */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-10 text-[13px] font-bold tracking-wider uppercase text-surface/80">
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gold" />
                                <span>24/7 Availability</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gold" />
                                <span>Nusuk Approved</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Check size={16} className="text-gold" />
                                <span>Flight Tracking</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Booking Widget Floating Over Fold */}
            <div className="container relative z-20 -mt-32 md:-mt-48 mb-16 flex justify-center">
                <div className="w-full max-w-5xl">
                    <BookingFormWrapper />
                </div>
            </div>

            {/* 2. SEAMLESS ARRIVAL */}
            <section className="py-[64px] md:py-[120px] bg-bg relative">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            Stress-Free Welcome
                        </span>
                        <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-ink mb-6">
                            Seamless Arrival in Madinah
                        </h2>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light mb-6">
                            Arriving for Umrah or Ziyarat should be stress-free. Avoid the hassle of haggling with local taxis. Our professional drivers greet you at the arrival terminal with a name sign and assist with your luggage to your comfortable private vehicle.
                        </p>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light font-medium bg-gold/5 border border-gold/10 p-6 rounded-2xl">
                            <strong className="text-ink">Arriving at Prince Mohammad Bin Abdulaziz Airport (PMIA): What to Expect</strong><br />
                            Prince Mohammad Bin Abdulaziz International Airport (MED) is modern, well-organized, and located just 20 kilometers from the Prophet&apos;s Mosque. After clearing immigration and collecting your luggage, you will exit into the main arrival hall. This is exactly where your Al Kiswah driver will be waiting, holding a personalized name board. There is no need to navigate the busy taxi ranks outside; your driver will assist you with your luggage and guide you directly to your private, air-conditioned vehicle for the quick 25-minute drive into the Markazia district.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Plane size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">Flight Tracking</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                We monitor your flight status to ensure we are there when you land, adjusting for any delays automatically.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Hotel size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">Hotel Drop-off</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Direct transfer to your hotel lobby in the Markazia District (near Masjid Nabawi) or any other location.
                            </p>
                        </div>
                        <div className="bg-surface border border-border p-8 rounded-[20px] shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                                <Clock size={24} />
                            </div>
                            <h3 className="font-body font-bold text-[19px] text-ink mb-3">24/7 Availability</h3>
                            <p className="text-body-light text-[15px] leading-relaxed">
                                Late night or early morning flight? We are always available to serve you at any hour.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. POPULAR ROUTES */}
            <section className="py-[64px] md:py-[120px] bg-surface border-y border-border">
                <div className="container">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            DESTINATIONS
                        </span>
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink mb-4">
                            Popular Routes from Madinah Airport
                        </h2>
                        <p className="font-body text-[17px] text-body-light max-w-2xl mx-auto">
                            Direct, private transfers to major destinations across the region.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
                        {/* Route Card 1 */}
                        <div className="bg-bg border border-border p-6 rounded-[20px] hover:border-gold/30 transition-colors shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="font-body font-bold text-[19px] text-ink">To Masjid Nabawi</h3>
                                    <p className="text-[13px] font-semibold text-gold uppercase tracking-wider mt-1">Central Hotels</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block bg-surface-alt px-3 py-1 rounded-full text-[13px] font-bold text-ink">
                                        25 Mins
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-body-light text-[14px] pt-4 border-t border-border">
                                <MapPin size={16} className="text-gold" />
                                <span>20 km distance</span>
                            </div>
                        </div>

                        {/* Route Card 2 */}
                        <div className="bg-bg border border-border p-6 rounded-[20px] hover:border-gold/30 transition-colors shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <Link href="/services/makkah-madinah-taxi" className="hover:text-gold transition-colors">
                                        <h3 className="font-body font-bold text-[19px] text-ink underline decoration-dotted underline-offset-4">To Makkah Hotel</h3>
                                    </Link>
                                    <p className="text-[13px] font-semibold text-gold uppercase tracking-wider mt-1">Direct Transfer</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block bg-surface-alt px-3 py-1 rounded-full text-[13px] font-bold text-ink">
                                        4.5 Hours
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-body-light text-[14px] pt-4 border-t border-border">
                                <MapPin size={16} className="text-gold" />
                                <span>450 km distance</span>
                            </div>
                        </div>

                        {/* Route Card 3 */}
                        <div className="bg-bg border border-border p-6 rounded-[20px] hover:border-gold/30 transition-colors shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <Link href="/services/ziyarat-tours" className="hover:text-gold transition-colors">
                                        <h3 className="font-body font-bold text-[19px] text-ink underline decoration-dotted underline-offset-4">To Masjid Quba</h3>
                                    </Link>
                                    <p className="text-[13px] font-semibold text-gold uppercase tracking-wider mt-1">Ziyarat Start</p>
                                </div>
                                <div className="text-right">
                                    <span className="inline-block bg-surface-alt px-3 py-1 rounded-full text-[13px] font-bold text-ink">
                                        30 Mins
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-body-light text-[14px] pt-4 border-t border-border">
                                <MapPin size={16} className="text-gold" />
                                <span>25 km distance</span>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-center text-xs text-body-light mt-8 italic font-light">
                        *Travel times may vary based on traffic conditions
                    </p>
                    <SeasonalPricingNote className="mt-6" />
                </div>
            </section>

            {/* 4. JOURNEY VISUAL */}
            <section className="py-[64px] md:py-[120px] bg-bg relative overflow-hidden">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <h3 className="text-[28px] md:text-[36px] font-display font-semibold mb-12 text-center text-ink">
                            Journey to Markazia
                        </h3>
                        <div className="bg-surface border border-border p-8 md:p-12 rounded-[32px] shadow-sm">
                            <RouteVisual
                                from="Madinah Airport (MED)"
                                fromLabel="Arrival Terminal"
                                to="Masjid Nabawi Hotel"
                                toLabel="Your Hotel / Markazia"
                                duration="25 Mins"
                                distance="20 km"
                                showMiqat={false}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. HOTELS WE SERVE */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt border-y border-border">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="font-display font-semibold text-[28px] md:text-[36px] text-ink mb-6">
                            Hotels We Serve Near Masjid Nabawi
                        </h3>
                        <p className="font-body text-[17px] leading-[1.8] text-body-light mb-8">
                            We provide direct transfers from <strong className="text-ink">Madinah Airport (PMIA)</strong> to all major hotels in the Markazia District and beyond, including: 
                            <strong className="text-ink"> Movenpick Hotel Madinah</strong>, <strong className="text-ink">Dar Al Taqwa</strong>, <strong className="text-ink">Anwar Al Madinah Movenpick</strong>, 
                            <strong className="text-ink"> Oberoi Madinah</strong>, <strong className="text-ink">Sheraton Madinah Hotel</strong>, <strong className="text-ink">Al Rawda Royal Inn</strong>, 
                            <strong className="text-ink"> Hilton Madinah</strong>, <strong className="text-ink">Swissôtel Al Maqam</strong>, <strong className="text-ink">Pullman Zamzam Madinah</strong>, 
                            and all hotels on <strong className="text-ink">King Faisal Road</strong>, <strong className="text-ink">Abu Bakr Al-Siddiq Road</strong>, and throughout the <strong className="text-ink">Markazia (Central) District</strong>.
                        </p>
                        <p className="text-[15px] text-gold font-medium mb-8">
                            Not sure if we cover your hotel? WhatsApp us the hotel name and we will confirm within minutes.
                        </p>
                        <Link
                            href="/booking"
                            className="inline-flex items-center justify-center gap-2 bg-gold text-ink px-8 py-4 rounded-[8px] font-body font-bold text-[15px] uppercase tracking-[0.08em] hover:bg-gold-light transition-colors shadow-sm min-h-[44px]"
                        >
                            Book Airport to Hotel Transfer
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. VEHICLES FOR MADINAH TRANSFERS */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            OUR FLEET
                        </span>
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            Vehicles for Madinah Transfers
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {vehicleOptions.map((vehicle, i) => (
                            <div key={i} className="bg-surface rounded-[20px] border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150">
                                <div className="aspect-[4/3] bg-surface-alt relative border-b border-border">
                                    {vehicle.image ? (
                                        <Image
                                            src={vehicle.image}
                                            alt={vehicle.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                                            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-ink">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                                            </div>
                                            <span className="text-[15px] font-medium">{vehicle.seats} Seats</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-body">
                                            <div className="w-8 h-8 rounded-full bg-surface-alt flex items-center justify-center text-ink">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9"/><path d="M12 16v5"/><path d="M8 21h8"/><path d="M8 5V3h8v2"/></svg>
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

            {/* 7. FAQS */}
            <section className="py-[64px] md:py-[120px] bg-surface border-t border-border">
                <div className="container max-w-4xl mx-auto px-4">
                    <h2 className="text-[32px] md:text-[44px] font-semibold text-center mb-16 font-display text-ink">
                        Common Questions
                    </h2>
                    <div className="space-y-4">
                        {madinahAirportFAQs.map((faq, i) => (
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
        </main>
    );
}
