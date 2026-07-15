import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import { ServiceSchema } from '@/components/seo/ServiceSchema';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Star, 
  ChevronDown, 
  Check, 
  MapPin, 
  Clock, 
  Luggage, 
  Users,
  CarFront,
  CreditCard,
  Phone,
  ArrowRight
} from 'lucide-react';

const intercityFAQs = [
    { question: "How much is a Makkah to Madinah taxi transfer?", answer: "Our private Makkah to Madinah transfer starts from SAR 450 for a 5-seater GMC Yukon or Hyundai Staria. This is a fixed price with no hidden meter charges, covering the vehicle, fuel, driver, and any applicable tolls." },
    { question: "How long is the drive from Makkah to Madinah?", answer: "The journey takes approximately 4.5 to 5 hours via the smooth Al Hijrah Highway, depending on traffic conditions. We prioritize safety and comfort over speed, ensuring a peaceful trip between the two Holy Cities." },
    { question: "Can I add ziyarat stops on the way?", answer: "Yes, you can request ziyarat stops (such as Badr) or a stop at the Miqat (Dhul Hulayfah / Abyar Ali) for assuming Ihram. Please mention this during your booking so we can allocate the necessary time." },
    { question: "Are prices fixed or metered?", answer: "All Al Kiswah prices are 100% fixed. There are no meters, no haggling, and no surge pricing. The price you see at booking is exactly what you pay." },
    { question: "What vehicle is best for a family or large group?", answer: "For 2-5 passengers, our Hyundai Staria or GMC Yukon are ideal. For larger families, we recommend the 11-seater Toyota HiAce. For groups up to 19, our Toyota Coaster provides ample space for both passengers and luggage." },
    { question: "Do your drivers speak English?", answer: "Yes, we provide professional, English-speaking drivers who understand the needs of international pilgrims and are familiar with all major hotels in Makkah and Madinah." },
    { question: "Is the driver Nusuk-approved?", answer: "Yes, all our drivers and vehicles are fully licensed and Nusuk-approved for your peace of mind and security." },
    { question: "How do I book and pay?", answer: "You can book directly through our online widget above or via WhatsApp. We offer secure online payments or pay-later options depending on your preference." }
];

export const metadata = {
    title: "Intercity Transfers in Saudi Arabia | Al Kiswah",
    description: "Book private intercity taxi transfers between Makkah, Madinah, and Jeddah. Fixed prices, family transport, English-speaking drivers. Book online instantly.",
    keywords: [
        "intercity transfers Saudi Arabia",
        "Umrah intercity transport",
        "intercity taxi Makkah Madinah",
        "Makkah to Madinah transfer",
        "Jeddah to Makkah taxi"
    ],
    alternates: generateMetadataAlternates("/services/intercity-transfer"),
    openGraph: {
        title: "Intercity Transfers in Saudi Arabia | Al Kiswah",
        description: "Book private intercity taxi transfers between Makkah, Madinah, and Jeddah. Fixed prices, family transport, English-speaking drivers.",
        images: [{ url: '/images/hero/desert-highway-makkah-tower.jpg', width: 1200, height: 630, alt: 'Private car for Makkah to Madinah intercity transfer' }]
    }
};

const popularRoutes = [
    { from: 'Makkah', to: 'Madinah', distance: '450 km', time: '4.5 - 5 hrs', price: '450', vehicles: 'Staria, Yukon, HiAce', link: '/routes/makkah-to-madinah' },
    { from: 'Jeddah', to: 'Makkah', distance: '85 km', time: '1 - 1.5 hrs', price: '200', vehicles: 'Staria, Yukon, HiAce', link: '/routes/jeddah-to-makkah' },
    { from: 'Jeddah', to: 'Madinah', distance: '420 km', time: '4 - 4.5 hrs', price: '400', vehicles: 'Staria, Yukon, HiAce', link: '/routes/jeddah-to-madinah' },
    { from: 'Makkah', to: 'Taif', distance: '90 km', time: '1.5 hrs', price: '250', vehicles: 'Staria, Yukon', link: '/routes/makkah-to-taif' },
];

const vehicleOptions = [
    { name: 'Hyundai Staria / GMC Yukon', seats: '5-7', luggage: '4-5 Bags', bestFor: 'Families & small groups', desc: 'Premium comfort with ample legroom for the 4-hour highway journey.' },
    { name: 'Toyota HiAce', seats: '11', luggage: '10 Bags', bestFor: 'Extended families', desc: 'Spacious van ensuring everyone travels together with all luggage secured.' },
    { name: 'Toyota Coaster', seats: '19', luggage: '15 Bags', bestFor: 'Large groups', desc: 'Mini-bus designed for group travel without compromising on air-conditioned comfort.' }
];

export default function IntercityTransferPage() {
    return (
        <main className="bg-bg text-body flex flex-col min-h-screen">
            <ServiceSchema
                serviceName="Intercity transfer"
                serviceType="Intercity Transfer"
                description="Private intercity taxi transfers across Saudi Arabia, including Makkah, Madinah, and Jeddah."
                pageUrl="https://kiswahumrahcab.com/services/intercity-transfer"
                citiesServed={["Makkah", "Madinah", "Jeddah", "Taif", "Riyadh"]}
                ratingValue="4.9"
                ratingCount={245}
                priceFrom={200}
                priceTo={600}
                image="https://kiswahumrahcab.com/images/hero/desert-highway-makkah-tower.jpg"
                breadcrumbs={[
                    { name: "Home", url: "https://kiswahumrahcab.com" },
                    { name: "Services", url: "https://kiswahumrahcab.com/services" },
                    { name: "Intercity Transfer", url: "https://kiswahumrahcab.com/services/intercity-transfer" }
                ]}
                faqs={intercityFAQs}
            />

            {/* 1. HERO SECTION */}
            <section className="relative w-full min-h-[620px] max-md:min-h-[500px] flex flex-col pt-32 pb-24 md:pb-32 bg-surface-alt">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/hero/desert-highway-makkah-tower.jpg" 
                        alt="Private car for Makkah to Madinah intercity transfer" 
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    {/* Scrim for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                </div>

                <div className="container relative z-10 flex-grow flex flex-col justify-center">
                    <div className="max-w-[640px]">
                        <div className="flex items-center gap-2 text-sm text-surface-sunken mb-6">
                            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                            <span>›</span>
                            <Link href="/services" className="hover:text-gold transition-colors">Services</Link>
                            <span>›</span>
                            <span className="text-gold">Intercity Transfers</span>
                        </div>
                        
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-4">
                            INTERCITY TRANSPORTS
                        </span>
                        
                        <h1 className="font-display font-semibold text-[40px] md:text-[68px] leading-[1.04] text-white mb-6 tracking-[-0.01em]">
                            Intercity Transfers in Saudi Arabia
                        </h1>
                        
                        <p className="font-body text-[17px] md:text-[19px] leading-[1.65] text-white/90 mb-8 max-w-[44ch]">
                            Seamless, private transport between Makkah, Madinah, and Jeddah. Fixed prices, English-speaking drivers, and complete peace of mind.
                        </p>

                        <div className="flex items-center gap-2 text-sm text-white/80 font-body">
                            <div className="flex text-gold">
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                                <Star size={16} fill="currentColor" />
                            </div>
                            <span>·</span>
                            <span>10,000+ pilgrims</span>
                            <span>·</span>
                            <span>Nusuk-approved</span>
                        </div>
                    </div>
                </div>

            </section>

            {/* Booking Widget Floating Over Fold */}
            <div className="container relative z-20 -mt-32 md:-mt-48 mb-16 flex justify-center">
                <div className="w-full max-w-5xl">
                    <BookingFormWrapper />
                    <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted font-body text-center flex-wrap">
                        <span className="flex items-center gap-1"><Check size={14} className="text-gold" /> Fixed prices</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Check size={14} className="text-gold" /> Free cancellation</span>
                        <span className="hidden sm:inline">·</span>
                        <span className="flex items-center gap-1"><Check size={14} className="text-gold" /> Nusuk-approved drivers</span>
                    </div>
                </div>
            </div>

            {/* 2. INTRO PARAGRAPH (SEO) */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container max-w-3xl text-center">
                    <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink mb-6">
                        Travel Between the Haramains with Ease
                    </h2>
                    <p className="font-body text-[16px] md:text-[19px] text-body leading-[1.65]">
                        When performing Umrah, traveling between cities should be a time for rest and reflection, not stress. Our private intercity transport service connects the holy cities of Makkah and Madinah, as well as Jeddah and Taif, with a premium fleet designed for your comfort. Whether you are searching for a reliable Makkah to Madinah taxi or a spacious vehicle for a large family, Al Kiswah ensures a seamless journey without the hassle of haggling, shared buses, or hidden fees.
                    </p>
                </div>
            </section>

            {/* 3. POPULAR ROUTES */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt">
                <div className="container">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            POPULAR JOURNEYS
                        </span>
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            Makkah & Madinah Routes
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {popularRoutes.map((route, i) => (
                            <div key={i} className="bg-surface rounded-[20px] border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-150 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="text-ink font-body font-bold text-[18px]">
                                        {route.from} <span className="text-muted mx-1">→</span> {route.to}
                                    </div>
                                </div>
                                
                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center gap-2 text-sm text-body">
                                        <MapPin size={16} className="text-gold" />
                                        <span>{route.distance} distance</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-body">
                                        <Clock size={16} className="text-gold" />
                                        <span>{route.time} drive time</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-body">
                                        <CarFront size={16} className="text-gold" />
                                        <span>{route.vehicles}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border mt-auto">
                                    <div className="text-sm text-muted mb-1">From</div>
                                    <div className="text-gold font-display font-semibold text-[24px] mb-4">
                                        SAR {route.price}
                                    </div>
                                    <Link 
                                        href={route.link}
                                        className="block w-full text-center bg-gold hover:bg-gold-strong text-ink font-body font-semibold text-[16px] py-[12px] px-5 rounded-btn transition-colors duration-150"
                                    >
                                        Book Route
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. VEHICLE OPTIONS */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container">
                    <div className="text-center mb-10 md:mb-14">
                        <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                            OUR FLEET
                        </span>
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            Vehicles for Intercity Travel
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {vehicleOptions.map((vehicle, i) => (
                            <div key={i} className="bg-surface rounded-[20px] border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-150">
                                <div className="aspect-[4/3] bg-surface-alt relative border-b border-border">
                                    {/* Placeholder for actual vehicle image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-muted">
                                        <CarFront size={48} opacity={0.2} />
                                    </div>
                                </div>
                                <div className="p-6 md:p-8">
                                    <h3 className="font-body font-bold text-[19px] md:text-[22px] text-ink mb-2">
                                        {vehicle.name}
                                    </h3>
                                    <div className="text-sm font-semibold text-gold mb-4 uppercase tracking-wider">
                                        {vehicle.bestFor}
                                    </div>
                                    
                                    <div className="flex gap-4 mb-4 border-b border-border pb-4">
                                        <div className="flex items-center gap-1.5 text-sm text-body">
                                            <Users size={16} className="text-muted" />
                                            <span>{vehicle.seats}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-body">
                                            <Luggage size={16} className="text-muted" />
                                            <span>{vehicle.luggage}</span>
                                        </div>
                                    </div>
                                    
                                    <p className="text-body text-[16px] leading-[1.65]">
                                        {vehicle.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-10 text-center">
                        <Link href="/fleet" className="inline-flex items-center gap-2 text-gold-strong font-body font-semibold hover:text-gold transition-colors">
                            View our full fleet <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. HOW IT WORKS */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt">
                <div className="container">
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            How Your Intercity Transfer Works
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] border-t border-dashed border-border-strong z-0" />
                        
                        {[
                            { num: '1', title: 'Book Online', desc: 'Select your route, date, and vehicle. Get an instant fixed price.' },
                            { num: '2', title: 'Confirmation', desc: 'Receive your booking details and driver contact via WhatsApp.' },
                            { num: '3', title: 'Meet Driver', desc: 'Your driver arrives at your hotel or location at the scheduled time.' },
                            { num: '4', title: 'Arrive Relaxed', desc: 'Enjoy a smooth, air-conditioned ride to your destination city.' }
                        ].map((step, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-14 h-14 bg-surface border border-gold-line rounded-full flex items-center justify-center text-gold font-body font-bold text-[20px] shadow-sm mb-6">
                                    {step.num}
                                </div>
                                <h4 className="font-body font-bold text-[19px] text-ink mb-2">{step.title}</h4>
                                <p className="text-sm text-body leading-[1.6] max-w-[240px]">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. WHY AL KISWAH (Feature Cards) & 7. PRICING TRANSPARENCY */}
            <section className="py-[64px] md:py-[120px] bg-bg">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div>
                            <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-3 md:mb-4">
                                THE AL KISWAH DIFFERENCE
                            </span>
                            <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink mb-6">
                                Why Book Your Intercity Transfer With Us?
                            </h2>
                            <p className="text-[17px] text-body leading-[1.65] mb-10">
                                Navigating between cities in a foreign country can be overwhelming. We remove the uncertainty by providing a service built on trust, transparency, and comfort for your Umrah journey.
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-6">
                                {[
                                    { icon: CreditCard, title: 'Fixed Prices', desc: 'No haggling, no meters. The price you see is exactly what you pay.' },
                                    { icon: ShieldCheck, title: 'Nusuk-Approved', desc: 'Fully licensed vehicles and professional drivers.' },
                                    { icon: Users, title: 'English-Speaking', desc: 'Drivers who understand you and can assist with your needs.' },
                                    { icon: Clock, title: '24/7 Availability', desc: 'Travel on your schedule, day or night.' }
                                ].map((feature, i) => (
                                    <div key={i} className="bg-surface border border-border p-5 rounded-[16px]">
                                        <div className="w-10 h-10 bg-gold-soft rounded-full flex items-center justify-center mb-4">
                                            <feature.icon size={20} className="text-gold-strong" />
                                        </div>
                                        <h4 className="font-body font-bold text-[16px] text-ink mb-2">{feature.title}</h4>
                                        <p className="text-[14px] text-body leading-[1.6]">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-surface-alt p-8 md:p-12 rounded-[24px]">
                            <h3 className="font-display font-semibold text-[24px] md:text-[30px] text-ink mb-6">
                                Transparent Pricing
                            </h3>
                            <p className="text-body leading-[1.65] mb-8">
                                How much does a Makkah to Madinah taxi cost? With Al Kiswah, the price is guaranteed upfront. Our intercity fares are calculated per vehicle, not per person, making it an economical choice for families.
                            </p>
                            
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Private vehicle exclusively for your group',
                                    'Professional driver and fuel included',
                                    'All highway tolls covered',
                                    'Optional ziyarat or Miqat stops (request at booking)',
                                    'No hidden taxes or fees'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-body">
                                        <Check size={20} className="text-gold shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            
                            <a href="#interactive-map" className="inline-block bg-surface border-[1.5px] border-border-strong hover:bg-gold-soft text-ink font-body font-semibold text-[16px] py-[12px] px-6 rounded-btn transition-colors duration-150 text-center w-full sm:w-auto">
                                Check Route Prices
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. FAQ ACCORDION */}
            <section className="py-[64px] md:py-[120px] bg-surface-alt border-y border-border">
                <div className="container max-w-3xl">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 className="font-display font-semibold text-[30px] md:text-[44px] text-ink">
                            Intercity Transfer FAQs
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {intercityFAQs.map((faq, i) => (
                            <details key={i} className="group bg-surface border border-border rounded-[16px] overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex items-center justify-between p-6 cursor-pointer text-ink font-body font-bold text-[16px] md:text-[18px]">
                                    {faq.question}
                                    <span className="ml-4 flex-shrink-0 text-gold transition-transform duration-200 group-open:rotate-180">
                                        <ChevronDown size={20} />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-body text-[16px] leading-[1.65]">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA BAND */}
            <section className="py-[64px] md:py-[100px] bg-ink-bg text-center px-4">
                <div className="container max-w-2xl">
                    <span className="text-gold font-body font-semibold tracking-[0.14em] text-[13px] uppercase block mb-4">
                        READY TO TRAVEL?
                    </span>
                    <h2 className="font-display font-semibold text-[32px] md:text-[44px] text-on-ink mb-6">
                        Book Your Intercity Transfer Today
                    </h2>
                    <p className="font-body text-[17px] text-on-ink-muted mb-10">
                        Secure your private vehicle for a comfortable, stress-free journey between Makkah, Madinah, and Jeddah.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#interactive-map" className="w-full sm:w-auto bg-gold hover:bg-gold-strong text-ink font-body font-semibold text-[16px] py-[14px] px-8 rounded-btn transition-colors duration-150 shadow-gold">
                            Book Online Now
                        </a>
                        <a href="https://wa.me/966500000000" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent hover:bg-ink-surface border-[1.5px] border-on-ink/20 text-on-ink font-body font-semibold text-[16px] py-[14px] px-8 rounded-btn transition-colors duration-150">
                            <Phone size={18} />
                            Book via WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}
