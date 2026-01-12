import React, { Suspense } from 'react';
import Link from 'next/link';
import { Bus, MapPin, Users, Headphones, ArrowRight, Calendar, CheckCircle, Car, Check } from 'lucide-react';
import FleetSectionLoader from '@/components/services/FleetSectionLoader';
import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FAQSection from '@/components/services/FAQSection';
import TrustAmenities from '@/components/services/TrustAmenities';
import ReviewsSection from '@/components/reviews/ReviewsSection';

export async function generateMetadata() {
    return {
        title: "Umrah Taxi Services & Ziyarat Tours | Jeddah, Makkah, Madinah",
        description: "Comprehensive Umrah transport services: Jeddah Airport pickup, Makkah to Madinah taxi, and historic Ziyarat tours. Reliable 24/7 service.",
        keywords: [
            "Umrah Taxi Services", "Ziyarat Tours Makkah", "Intercity Transfers Saudi",
            "Jeddah Airport Pickup", "Madinah Ziyarat", "Makkah to Madinah Taxi",
            "خدمات نقل المعتمرين", "زيارات المدينة المنورة", "توصيل مطار جدة"
        ],
        alternates: {
            canonical: 'https://alkiswahumrahtransport.com/services',
        },
    };
}

const processSteps = [
    {
        title: "Book Online",
        description: "Select your vehicle and schedule your pickup in just a few clicks.",
        icon: <Calendar size={24} />
    },
    {
        title: "Get Confirmation",
        description: "Receive instant confirmation with driver details and tracking link.",
        icon: <CheckCircle size={24} />
    },
    {
        title: "Enjoy the Ride",
        description: "Travel in comfort and safety to your destination.",
        icon: <Car size={24} />
    }
];

export default function ServicesPage() {
    const services = [
        {
            title: 'Makkah to Madinah Taxi & Private Car',
            description: 'Premium intercity transfers between the Holy Cities. Enjoy a comfortable 450km journey in our wide range of fleets including GMC Yukon XL and Hyundai H1.',
            image: '/images/routes/makkah-madinah-route-hero.png',
            link: '/services/makkah-madinah-taxi',
            features: ['Door-to-Door Service', 'Luxury Fleet Options', '4.5 Hour Average Time'],
            alt: 'Makkah to Madinah Intercity Private Taxi App Map'
        },
        {
            title: 'Jeddah Airport (KAIA) to Makkah Taxi',
            description: 'Hassle-free airport authorities approved pickup. Our driver will welcome you at Jeddah Airport arrivals for a seamless transfer to your Makkah hotel or Haram.',
            image: '/images/routes/jeddah-airport-hero-professional.png',
            link: '/services/jeddah-airport-transfer',
            features: ['Flight Tracking', 'Free Meet & Greet', 'Luggage Assistance'],
            alt: 'Jeddah Airport (KAIA) to Makkah Hotel Transfer Driver Chauffeur'
        },
        {
            title: 'VIP Luxury GMC Yukon Umrah Transport',
            description: 'Travel in style with our VIP service. Top-of-the-line vehicles (GMC Yukon XL) and private chauffeurs for maximum privacy and ease.',
            image: '/images/fleet/gmc-yukon-hero-professional.png',
            link: '/booking?service=luxury',
            features: ['Private Chauffeur', 'Latest Model Vehicles', 'Privacy Partition'],
            alt: 'GMC Yukon XL 2025 VIP Black SUV for Umrah Transport'
        },
        {
            title: 'Makkah & Madinah Ziyarat Tours',
            description: 'Comprehensive Ziyarat packages to holy sites. Visit Masjid Quba, Mount Uhud, Jabal Al-Nour, and other historical Islamic landmarks with knowledgeable drivers.',
            image: '/images/routes/makkah-ziyarat-hero.png',
            link: '/services/ziyarat-tours',
            features: ['Custom Itinerary', 'Expert Local Knowledge', 'Flexible Hours'],
            alt: 'Makkah and Madinah Historical Ziyarat Tour Mountains and Mosques'
        }
    ];

    const serviceFAQs = [
        {
            question: "How do I book a taxi from Jeddah Airport to Makkah?",
            answer: <span>Booking is simple. You can reserve your <Link href="/services/jeddah-airport-transfer" className="text-gold-primary hover:text-white transition-colors hover:underline">Jeddah Airport to Makkah taxi</Link> online in advance. We monitor your flight arrival and our driver meets you at the terminal with a name sign.</span>
        },
        {
            question: "What is the best transport for Umrah families?",
            answer: <span>For families, we highly recommend our <Link href="/fleet/gmc-yukon-at4" className="text-gold-primary hover:text-white transition-colors hover:underline">GMC Yukon XL</Link> or <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:text-white transition-colors hover:underline">Hyundai Staria</Link>. These spacious vehicles offer ample luggage space and AC comfort for the 1-hour journey to Makkah.</span>
        },
        {
            question: "Do you offer direct Makkah to Madinah taxi services?",
            answer: <span>Yes, our <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:text-white transition-colors hover:underline">Makkah to Madinah private taxi</Link> service is the most convenient option. Unlike the train or bus, we offer door-to-door service from your Makkah hotel lobby directly to your Madinah hotel.</span>
        },
        {
            question: "Can I stop at Miqat on the way to Makkah?",
            answer: "Absolutely. If you are travelling from Madinah or Jeddah, our drivers are happy to stop at the designated Miqat (e.g., Bir Ali or Juhfah) for you to assume Ihram and pray."
        },
        {
            question: "Is the taxi fare fixed or metered?",
            answer: <span>Our prices are fixed and transparent. You will know the exact cost of your <Link href="/booking" className="text-gold-primary hover:text-white transition-colors hover:underline">Umrah transport booking</Link> upfront, with no hidden fees or toll charges.</span>
        },
        {
            question: "Do you provide Ziyarat tours in Makkah and Madinah?",
            answer: <span>Yes, we offer comprehensive <Link href="/services/ziyarat-tours" className="text-gold-primary hover:text-white transition-colors hover:underline">Ziyarat packages</Link>. Visit historical sites like Jabal Al-Nour, Masjid Quba, and Mount Uhud in the comfort of a private vehicle with a knowledgeable driver.</span>
        }
    ];

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />

            {/* Hero Section */}
            <Hero
                title="Trusted Umrah Transport Services in Saudi Arabia"
                subtitle="From Jeddah Airport pickup to Ziyarat tours, we provide safe, affordable, and comfortable taxi services for pilgrims."
                bgImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop"
                ctaText="Book Your Ride"
                ctaLink="/booking"
                secondaryCtaText="Contact Us"
                secondaryCtaLink="/contact"
                breadcrumbs={<Breadcrumbs />}
                alt="Jeddah Airport to Makkah & Madinah Umrah Taxi Services Fleet"
            />

            {/* Trust Amenities Section */}
            <TrustAmenities />

            {/* Services Section */}
            <section className="py-24 relative z-10">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-center text-white mb-20">
                            Our Premium <span className="text-gold-primary">Umrah Services</span>
                        </h2>
                    </FadeIn>
                    <div className="flex flex-col gap-24 px-4 max-w-7xl mx-auto">
                        {services.map((service, index) => {
                            const isImageRight = index % 2 !== 0;

                            return (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
                                        {/* Image Side */}
                                        <div className={`w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-10" />
                                            <img
                                                src={service.image}
                                                alt={service.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Content Side */}
                                        <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                                            <div className="mb-6">
                                                <h3 className="text-3xl lg:text-4xl font-sans font-bold text-white mb-6 leading-tight group-hover:text-gold-primary transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <div className="h-1.5 w-24 bg-gold-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                                            </div>

                                            <p className="text-gray-400 text-lg leading-relaxed mb-8 font-light">
                                                {service.description}
                                            </p>

                                            {/* Benefits List */}
                                            <ul className="mb-10 space-y-4">
                                                {service.features.map((feat, i) => (
                                                    <li key={i} className="flex items-center gap-4 text-gray-300 font-medium text-lg">
                                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold-primary/10 text-gold-primary flex items-center justify-center border border-gold-primary/20">
                                                            <Check size={16} strokeWidth={3} />
                                                        </span>
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link
                                                href={service.link}
                                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-gold-primary hover:text-black border border-white/10 hover:border-gold-primary text-white font-bold uppercase tracking-widest rounded-full transition-all duration-300 group/link self-start"
                                            >
                                                Explore Details
                                                <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 relative bg-deep-black border-y border-white/5">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-center text-white mb-20">How It Works</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-12 relative px-4">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-gold-primary/30 to-transparent border-t border-dashed border-white/10" />

                        {processSteps.map((step, index) => (
                            <FadeIn key={index} delay={index * 0.2} direction="up">
                                <div className="flex flex-col items-center text-center relative z-10 group">
                                    <div className="w-32 h-32 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center mb-8 relative group-hover:border-gold-primary/50 transition-colors duration-300">
                                        <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-gold-primary/30 animate-spin-slow" />
                                        <div className="w-16 h-16 rounded-full bg-gold-primary/10 flex items-center justify-center text-gold-primary shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-gold-primary text-black font-bold rounded-full flex items-center justify-center border-4 border-deep-black shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold-primary transition-colors">{step.title}</h3>
                                    <p className="text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet Showcase */}
            <section className="py-24 relative">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold-primary font-bold tracking-[0.2em] uppercase text-sm">Our Premium Fleet</span>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-white mt-4">Travel in Style</h2>
                    </div>
                    <Suspense fallback={<div className="h-[400px] w-full bg-white/5 animate-pulse rounded-3xl" />}>
                        <FleetSectionLoader />
                    </Suspense>
                </FadeIn>
            </section>

            {/* Reviews Section */}
            <ReviewsSection />

            {/* FAQSection */}
            <FAQSection items={serviceFAQs} title="Frequent Questions" />

            {/* Booking CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold-primary/80 z-0">
                    <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20 mix-blend-multiply" />
                </div>
                <div className="container relative z-10 text-center">
                    <FadeIn>
                        <blockquote className="text-3xl md:text-5xl font-serif text-black font-bold mb-12 max-w-4xl mx-auto leading-tight">
                            &ldquo;Your journey of faith deserves comfort and care.&rdquo;
                        </blockquote>
                        <Link
                            href="/booking"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-gold-primary hover:bg-neutral-900 font-bold uppercase tracking-widest rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            Book Your Ride Now
                            <ArrowRight size={20} />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                    })
                }}
            />
        </main>
    );
}
