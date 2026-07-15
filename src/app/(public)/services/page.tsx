import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Shield, ArrowRight, CheckCircle, Clock, Award, Check, Calendar, Car, CarFront, Users, BadgeCheck, Star, ChevronDown, MapPin, Building2 } from 'lucide-react';
import FadeIn from '@/components/common/FadeIn';
import ReviewsSection from '@/components/reviews/ReviewsSection';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Umrah Taxi Services & Ziyarat Tours | Jeddah, Makkah, Madinah",
        description: "Comprehensive Umrah transport services: Jeddah Airport pickup, Makkah to Madinah taxi, and historic Ziyarat tours. Reliable 24/7 service.",
        keywords: [
            "Umrah Taxi Services", "Ziyarat Tours Makkah", "Intercity Transfers Saudi",
            "Jeddah Airport Pickup", "Madinah Ziyarat", "Makkah to Madinah Taxi",
            "خدمات نقل المعتمرين", "زيارات المدينة المنورة", "توصيل مطار جدة"
        ],
        alternates: generateMetadataAlternates("/services"),
    };
}

const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Umrah Transport",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "areaServed": {
        "@type": "Place",
        "name": "Saudi Arabia"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Transport Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Pilgrim Transport Makkah and Madinah"
                }
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Jeddah Airport to Makkah Transport"
                }
            }
        ]
    }
};

const serviceFAQs = [
    {
        question: "How do I book a taxi from Jeddah Airport to Makkah?",
        answer: "Booking is simple. You can reserve your Jeddah Airport to Makkah taxi online in advance. We monitor your flight arrival and our driver meets you at the terminal with a name sign."
    },
    {
        question: "What is the best transport for Umrah families?",
        answer: "For families, we highly recommend our GMC Yukon XL or Hyundai Staria. These spacious vehicles offer ample luggage space and AC comfort for the journey to Makkah."
    },
    {
        question: "Do you offer direct Makkah to Madinah taxi services?",
        answer: "Yes, our Makkah to Madinah private taxi service is the most convenient option. Unlike the train or bus, we offer door-to-door service from your Makkah hotel lobby directly to your Madinah hotel."
    },
    {
        question: "Can I stop at Miqat on the way to Makkah?",
        answer: "Absolutely. If you are travelling from Madinah or Jeddah, our drivers are happy to stop at the designated Miqat (e.g., Bir Ali or Juhfah) for you to assume Ihram and pray."
    },
    {
        question: "Is the taxi fare fixed or metered?",
        answer: "Our prices are fixed and transparent. You will know the exact cost of your Umrah transport booking upfront, with no hidden fees or toll charges."
    },
    {
        question: "Do you provide Ziyarat tours in Makkah and Madinah?",
        answer: "Yes, we offer comprehensive Ziyarat packages. Visit historical sites like Jabal Al-Nour, Masjid Quba, and Mount Uhud in the comfort of a private vehicle with a knowledgeable driver."
    }
];

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": serviceFAQs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
};

export default function ServicesPage() {
    return (
        <main className="bg-ivory text-charcoal min-h-screen relative font-body selection:bg-gold-tint selection:text-charcoal">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

            <HeroSection />
            <WhyChooseSection />
            <ServicesGridSection />
            <HowItWorksSection />
            <FleetSection />
            <FAQSection />
            <CondensedCoverageSection />
            <ReviewsSection />
            <FinalCTASection />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative w-full min-h-[clamp(560px,80vh,760px)] flex items-end pb-16 lg:pb-24 pt-32 overflow-hidden">
            <Image
                src="/images/services/hotel-transfers-new.png"
                alt="Umrah Transport Services Fleet"
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
            />
            
            <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/90 via-charcoal/60 to-transparent pointer-events-none z-10" />

            <div className="container relative z-20">
                <div className="max-w-3xl flex flex-col items-start text-left gap-5">
                    <div className="text-xl md:text-2xl font-arabic text-gold leading-relaxed drop-shadow-md mb-2" dir="rtl">
                        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-tint border border-gold/30 text-[13px] font-bold tracking-[0.14em] uppercase text-charcoal">
                        <Shield size={14} className="text-gold-deep" />
                        Ministry Licensed Operator
                    </div>
                    <h1 className="font-display font-semibold text-[clamp(40px,5vw,72px)] text-white leading-[1.1] tracking-tight drop-shadow-md">
                        Trusted Umrah Transport Services in Saudi Arabia
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl font-light max-w-[52ch] leading-[1.65]">
                        From Jeddah Airport pickup to Ziyarat tours, we provide safe, affordable, and comfortable taxi services for pilgrims.
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
                        <Link href="/booking" className="inline-flex items-center justify-center bg-gold text-charcoal font-semibold px-8 py-4 rounded-btn hover:bg-gold-deep transition-colors duration-200">
                            Book Your Ride <ArrowRight size={20} className="ml-2" />
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center bg-transparent border border-hairline text-white hover:border-gold hover:text-gold font-semibold px-8 py-4 rounded-btn transition-colors duration-200 backdrop-blur-sm">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhyChooseSection() {
    const features = [
        { icon: <Shield className="text-gold-deep" size={24} />, title: "Officially Licensed", desc: "Nusuk registered & Ministry of Hajj approved operator." },
        { icon: <Clock className="text-gold-deep" size={24} />, title: "24/7 Support", desc: "Round-the-clock customer service via WhatsApp." },
        { icon: <Award className="text-gold-deep" size={24} />, title: "Experienced Drivers", desc: "Professional, vetted local chauffeurs you can trust." },
        { icon: <CheckCircle className="text-gold-deep" size={24} />, title: "Punctuality", desc: "Guaranteed on-time pickups for flights & prayers." }
    ];

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-ivory">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feat, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="h-full bg-surface p-6 lg:p-8 rounded-[16px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] hover:-translate-y-1 hover:border-gold/50 transition-all duration-200 group flex flex-col items-center text-center">
                                <div className="bg-gold-tint w-14 h-14 rounded-full flex items-center justify-center mb-6">
                                    {feat.icon}
                                </div>
                                <h3 className="text-[20px] md:text-[22px] font-semibold text-charcoal mb-3 font-display">{feat.title}</h3>
                                <p className="text-charcoal-soft leading-[1.65] text-sm">{feat.desc}</p>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ServicesGridSection() {
    const services = [
        {
            title: 'Makkah to Madinah Taxi',
            img: '/images/routes/makkah-madinah-route-hero.webp',
            link: '/services/makkah-madinah-taxi',
            features: ['Door-to-Door Service', 'Luxury Fleet Options', '4.5 Hour Average Time']
        },
        {
            title: 'Jeddah Airport to Makkah',
            img: '/images/routes/jeddah-airport-hero-professional.webp',
            link: '/services/jeddah-airport-transfer',
            features: ['Flight Tracking', 'Free Meet & Greet', 'Luggage Assistance']
        },
        {
            title: 'VIP Luxury GMC Yukon',
            img: '/images/fleet/gmc-yukon-hero-professional.webp',
            link: '/booking?service=luxury',
            features: ['Private Chauffeur', 'Latest Model Vehicles', 'Privacy Partition']
        },
        {
            title: 'Ziyarat Tours',
            img: '/images/routes/makkah-ziyarat-hero.webp',
            link: '/services/ziyarat-tours',
            features: ['Custom Itinerary', 'Expert Local Knowledge', 'Flexible Hours']
        },
        {
            title: 'Hotel Transfers',
            img: '/images/services/hotel-transfers-new.png',
            link: '/services/hotel-transfers',
            features: ['Direct to Haram Gates', 'Spacious Vehicles', 'Fixed Transparent Pricing']
        },
        {
            title: 'Madinah Airport to Hotel',
            img: '/images/services/airport-transport-new.png',
            link: '/services/madinah-airport-transfer',
            features: ['24/7 Availability', 'Family Friendly', 'Meet at Arrivals']
        }
    ];

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-surface-warm border-y border-hairline">
            <div className="container">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                        <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                            Our Premium Services
                        </span>
                        <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal leading-[1.15]">
                            Comprehensive Umrah Transport
                        </h2>
                    </div>
                </FadeIn>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((svc, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="h-full bg-surface rounded-[16px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] hover:-translate-y-1 hover:border-gold/50 transition-all duration-300 group overflow-hidden flex flex-col">
                                <div className="relative w-full aspect-video overflow-hidden bg-ivory">
                                    <Image src={svc.img} alt={svc.title} fill className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                                </div>
                                <div className="p-6 lg:p-8 flex flex-col flex-1">
                                    <h3 className="text-[20px] lg:text-[22px] font-semibold text-charcoal font-display mb-4">{svc.title}</h3>
                                    <ul className="mb-8 space-y-3 flex-1">
                                        {svc.features.map((feat, i) => (
                                            <li key={i} className="flex items-start gap-3 text-charcoal-soft text-[15px]">
                                                <Check size={16} className="text-gold mt-0.5 shrink-0" strokeWidth={3} />
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link href={svc.link} className="inline-flex items-center text-charcoal font-bold uppercase tracking-widest text-sm group/link mt-auto">
                                        Explore Details
                                        <ArrowRight size={16} className="ml-2 text-gold group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection() {
    const steps = [
        { title: "Book Online", desc: "Select your vehicle and schedule your pickup." },
        { title: "Get Confirmation", desc: "Receive instant driver details & fixed price." },
        { title: "Enjoy the Ride", desc: "Travel in comfort and safety." }
    ];

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-ivory">
            <div className="container">
                <FadeIn>
                    <div className="bg-surface rounded-[24px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] p-8 md:p-12">
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                                Simple Process
                            </span>
                            <h2 className="text-[clamp(28px,3vw,36px)] font-semibold font-display text-charcoal leading-[1.15]">
                                How It Works
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-4xl mx-auto">
                            <div className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-gold/30 z-0" />
                            {steps.map((item, idx) => (
                                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-gold-tint border border-gold/30 text-charcoal flex items-center justify-center text-xl font-bold font-display mb-4 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <h3 className="text-[18px] font-semibold text-charcoal mb-2 font-display">{item.title}</h3>
                                    <p className="text-charcoal-soft text-sm leading-[1.65] max-w-[200px]">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function FleetSection() {
    const fleet = [
        { class: "Standard VIP", name: "Toyota Camry", pax: "4", lug: "3", img: "/images/fleet/camry-2025.png" },
        { class: "Luxury SUV", name: "GMC Yukon XL", pax: "7", lug: "6", img: "/images/fleet/gmc-yukon-2025.png" },
        { class: "Family Premium", name: "Hyundai Staria", pax: "7", lug: "6", img: "/images/fleet/hyundai-staria-2025.png" },
        { class: "Family Standard", name: "Hyundai Starex", pax: "7", lug: "6", img: "/images/fleet/hyundai-h1.webp" },
        { class: "Group VIP", name: "Toyota HiAce", pax: "11", lug: "10", img: "/images/fleet/toyota-hiace-2025.png" },
        { class: "Large Group", name: "Toyota Coaster", pax: "19", lug: "15", img: "/images/fleet/toyota-coaster-2025.png" }
    ];

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-surface-warm border-y border-hairline">
            <div className="container">
                <FadeIn>
                    <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                        <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                            Our Premium Fleet
                        </span>
                        <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal leading-[1.15]">
                            Travel In Style
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {fleet.map((v, idx) => (
                        <FadeIn key={idx} delay={idx * 0.1}>
                            <div className="h-full bg-surface p-6 rounded-[16px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] flex flex-col">
                                <div className="mb-4 flex justify-between items-start">
                                    <div>
                                        <span className="inline-block bg-gold-tint text-charcoal text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">
                                            {v.class}
                                        </span>
                                        <h3 className="text-[20px] lg:text-[22px] font-semibold text-charcoal font-display">{v.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-gold">
                                        <span className="text-sm font-bold text-charcoal mr-1">5.0</span>
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                                <div className="relative w-full aspect-[4/3] mb-6 rounded-lg overflow-hidden bg-ivory flex items-center justify-center p-4">
                                    <Image src={v.img} alt={v.name} fill className="object-contain z-10" />
                                </div>
                                <div className="space-y-3 mt-auto pt-4 border-t border-hairline">
                                    <div className="flex justify-between">
                                        <div className="flex items-center gap-2 text-charcoal-soft text-sm">
                                            <Users size={16} className="text-gold-deep" />
                                            <span>{v.pax} Passengers</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-charcoal-soft text-sm">
                                            <BadgeCheck size={16} className="text-gold-deep" />
                                            <span>{v.lug} Bags</span>
                                        </div>
                                    </div>
                                    <Link href="/booking" className="mt-4 flex items-center justify-center w-full bg-surface hover:bg-gold-tint border border-hairline text-charcoal font-semibold px-4 py-3 rounded-lg transition-colors">
                                        Book Vehicle
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FAQSection() {
    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-ivory">
            <div className="container max-w-4xl">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                            Common Questions
                        </span>
                        <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal leading-[1.15]">
                            Frequently Asked Questions
                        </h2>
                    </div>
                    
                    <div className="space-y-4">
                        {serviceFAQs.map((faq, idx) => (
                            <details key={idx} className="group bg-surface rounded-xl border border-hairline shadow-sm overflow-hidden open:shadow-md transition-shadow">
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg text-charcoal group-open:text-gold-deep transition-colors">
                                    {faq.question}
                                    <span className="transition group-open:rotate-180 text-muted group-open:text-gold-deep">
                                        <ChevronDown size={20} />
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 text-charcoal-soft leading-[1.65]">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}

function CondensedCoverageSection() {
    const popular = ["Fairmont Makkah Clock Royal", "Pullman ZamZam Makkah", "Swissôtel Al Maqam"];
    const districts = ["Aziziyah", "Jabal Omar", "Ajyad", "Misfalah"];

    return (
        <section className="py-[clamp(64px,8vw,128px)] bg-surface-warm border-y border-hairline relative overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10">
                <FadeIn>
                    <div className="text-center mb-12">
                        <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                            Service Area
                        </span>
                        <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal mb-4 leading-[1.15]">
                            Major Hotels & Districts
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto bg-surface border border-hairline rounded-[24px] shadow-sm p-6 md:p-10 lg:p-12 overflow-hidden relative text-center">
                        <div className="grid md:grid-cols-2 gap-10 text-left">
                            <div>
                                <h4 className="flex items-center gap-3 text-[20px] md:text-[22px] font-semibold text-charcoal mb-6 font-display">
                                    <Building2 className="text-gold-deep" size={24} />
                                    Popular Makkah Hotels
                                </h4>
                                <ul className="space-y-4 mb-6">
                                    {popular.map((h, i) => (
                                        <li key={i} className="flex items-center gap-3 text-charcoal-soft border-b border-hairline pb-3 last:border-0 last:pb-0">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/services/hotel-transfers" className="text-gold-deep font-semibold hover:underline">
                                    View all 50+ hotels →
                                </Link>
                            </div>
                            <div>
                                <h4 className="flex items-center gap-3 text-[20px] md:text-[22px] font-semibold text-charcoal mb-6 font-display">
                                    <MapPin className="text-gold-deep" size={24} />
                                    Districts Covered
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {districts.map((d, i) => (
                                        <span key={i} className="inline-flex items-center bg-ivory text-charcoal px-4 py-1.5 rounded-full text-[14px] font-medium border border-hairline shadow-sm">
                                            {d}
                                        </span>
                                    ))}
                                    <span className="inline-flex items-center bg-gold-tint text-charcoal px-4 py-1.5 rounded-full text-[14px] font-medium border border-gold/30 shadow-sm">
                                        + Many More
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}


function FinalCTASection() {
    return (
        <section className="py-24 bg-surface-warm border-t border-hairline text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-tint/40 rounded-full blur-[120px] pointer-events-none" />
            <div className="container relative z-10">
                <FadeIn>
                    <blockquote className="text-[clamp(32px,4vw,48px)] font-bold font-display text-charcoal mb-10 max-w-3xl mx-auto leading-[1.15] italic">
                        "Your journey of faith deserves comfort and care."
                    </blockquote>
                    <Link href="/booking" className="inline-flex items-center justify-center bg-gold text-charcoal font-semibold px-10 py-5 rounded-btn hover:bg-gold-deep hover:shadow-lg transition-all duration-300 text-lg shadow-sm">
                        Book Your Ride Now
                        <ArrowRight size={24} className="ml-2" />
                    </Link>
                </FadeIn>
            </div>
        </section>
    );
}
