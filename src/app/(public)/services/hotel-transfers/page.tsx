import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import { Metadata } from 'next';
import FadeIn from '@/components/common/FadeIn';
import { Building2, Clock, MapPin, ShieldCheck, Users, ArrowRight, Info, Shield, CheckCircle, CarFront, Check, Star, ShieldAlert, BadgeCheck, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export const metadata: Metadata = {
    title: "VIP Hotel Transfers Makkah & Madinah 2026 | Al Kiswah",
    description: "Book VIP hotel transfers in Makkah and Madinah. Enjoy door-to-door, fixed price transport to Masjid Al Haram and Masjid Nabawi.",
    keywords: [
        "vip hotel transfers makkah",
        "masjid nabawi hotel taxi",
        "umrah hotel transfer",
        "makkah hotel private transport",
        "madinah hotel shuttle services"
    ],
    alternates: generateMetadataAlternates("/services/hotel-transfers")
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Makkah & Madinah Hotel Transfers",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah",
        "image": "https://kiswahumrahcab.com/logo.png"
    },
    "serviceType": "Hotel Transfer",
    "areaServed": [
        {
            "@type": "City",
            "name": "Makkah"
        },
        {
            "@type": "City",
            "name": "Madinah"
        }
    ],
    "description": "Premium VIP door-to-door hotel transport in Makkah and Madinah.",
    "offers": {
        "@type": "Offer",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

export default function HotelTransferPage() {
    return (
        <main className="bg-ivory text-charcoal min-h-screen relative font-body selection:bg-gold-tint selection:text-charcoal">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* 1. Custom Hero Section (Full-Bleed) */}
            <section className="relative w-full min-h-[500px] sm:min-h-[760px] md:min-h-[850px] lg:h-[920px] xl:h-screen flex flex-col justify-end lg:justify-center pt-24 sm:pt-32 pb-8 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                {/* Full-bleed background image */}
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src="/images/hero/hotel-transfers.jpg"
                        alt="Premium Hotel Transfers"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-[center_top] md:object-center"
                    />
                </div>
                
                {/* Two-layer scrim for text readability (AA contrast) */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

                <div className="container relative z-20 px-4 w-full">
                    {/* -mt-8 to shift the block slightly upward as requested */}
                    <div className="w-full lg:w-[50%] max-w-[640px] md:ml-auto flex flex-col gap-5 lg:max-w-none text-left lg:-mt-16">
                        
                        {/* Eyebrow Chip */}
                        <div className="text-gold uppercase tracking-[0.14em] font-semibold text-[13px]">
                            Ministry Licensed Operator
                        </div>

                        <h1 className="font-display font-semibold text-[32px] sm:text-[40px] md:text-[58px] leading-[1.1] text-white tracking-[-0.01em]">
                            Premium Hotel Transfers
                        </h1>

                        <p className="text-white/90 font-light text-lg md:text-[19px] leading-[1.65] max-w-[44ch]">
                            Seamless door-to-door transport between your hotel and the Holy Mosques in Makkah & Madinah.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start gap-6 mt-2">
                            <Link 
                                href="/booking"
                                className="inline-flex items-center justify-center h-[48px] px-8 bg-gold hover:bg-gold-soft text-ink font-semibold rounded-btn shadow-sm transition-all min-w-[200px]"
                            >
                                Book Your Ride
                                <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="hidden md:flex flex-col gap-3 mt-6 text-[14px] text-white/90 font-body">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                    <span>Nusuk Registered</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <ShieldCheck size={18} strokeWidth={1.5} className="text-gold shrink-0" />
                                    <span>Ministry Licensed</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Star size={18} strokeWidth={1.5} fill="currentColor" className="text-gold shrink-0" />
                                    <span>Verified Transport</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Value - "Comfort & Convenience" Section (Ivory Band) */}
            <section className="py-[clamp(64px,8vw,128px)] bg-ivory">
                <div className="container">
                    <FadeIn>
                        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                                Comfort & Convenience
                            </span>
                            <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal mb-6 leading-[1.15]">
                                Stress-Free Travel To Your Doorstep
                            </h2>
                            <p className="text-charcoal-soft leading-[1.65] md:text-lg">
                                Arrive refreshed and on time. Whether you are heading to the Haram for prayers or returning to your hotel after Umrah, our dedicated drivers ensure a smooth, comfortable, and private journey for you and your family.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                icon: <MapPin className="text-gold-deep" size={28} strokeWidth={1.5} />,
                                title: "Door-to-Door Service",
                                desc: "Direct pickup from your hotel lobby and drop-off at the closest accessible point to the Haram."
                            },
                            {
                                icon: <Clock className="text-gold-deep" size={28} strokeWidth={1.5} />,
                                title: "24/7 Availability",
                                desc: "Round-the-clock service to align with your prayer times, Ziyarat plans, and flight schedules."
                            },
                            {
                                icon: <Users className="text-gold-deep" size={28} strokeWidth={1.5} />,
                                title: "Family Friendly",
                                desc: "Spacious vehicles (GMC, H1, HiAce) perfect for families with children, elderly, and luggage."
                            }
                        ].map((feature, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="h-full bg-surface p-6 lg:p-8 rounded-2xl border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] hover:-translate-y-1 hover:border-gold/50 transition-all duration-200 group">
                                    <div className="bg-gold-tint w-14 h-14 rounded-full flex items-center justify-center mb-6">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-[20px] md:text-[22px] font-semibold text-charcoal mb-3 font-display">{feature.title}</h3>
                                    <p className="text-charcoal-soft leading-[1.65]">{feature.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. How It Works (Ivory Band) */}
            <section className="pb-[clamp(64px,8vw,128px)] bg-ivory">
                <div className="container">
                    <FadeIn>
                        <div className="bg-surface rounded-[24px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] p-8 md:p-12">
                            <div className="text-center max-w-2xl mx-auto mb-12">
                                <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                                    Seamless Process
                                </span>
                                <h2 className="text-[clamp(28px,3vw,36px)] font-semibold font-display text-charcoal leading-[1.15]">
                                    How It Works
                                </h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                                {/* Desktop connecting line */}
                                <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-hairline z-0" />
                                
                                {[
                                    { step: 1, title: "Book Online", desc: "Select your route and vehicle size securely." },
                                    { step: 2, title: "Instant Confirmation", desc: "Receive your driver details and fixed price." },
                                    { step: 3, title: "Driver Meets You", desc: "Your driver waits at your hotel lobby." },
                                    { step: 4, title: "Arrive Safely", desc: "Enjoy a smooth ride to the Haram or airport." }
                                ].map((item, idx) => (
                                    <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                                        <div className="w-12 h-12 rounded-full bg-gold text-charcoal flex items-center justify-center text-xl font-bold font-display mb-4 shadow-sm">
                                            {item.step}
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

            {/* 4. Hotels and Districts Covered (Surface-Warm Band) */}
            <HotelsAndDistricts />

            {/* 5. Premium Fleet (Surface-Warm Band) */}
            <section className="py-[clamp(64px,8vw,128px)] bg-surface-warm">
                <div className="container">
                    <FadeIn>
                        <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-4 block">
                                Our Fleet
                            </span>
                            <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal mb-6 leading-[1.15]">
                                Find The Perfect Vehicle
                            </h2>
                            <p className="text-charcoal-soft leading-[1.65] md:text-lg">
                                From solo travelers to large families, we have a meticulously maintained vehicle ready to accommodate your group and luggage comfortably.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                class: "Standard VIP",
                                name: "Toyota Camry / Taurus",
                                pax: "Up to 4 Passengers",
                                luggage: "3 Standard Bags",
                                img: "/images/fleet/camry-2025.png"
                            },
                            {
                                class: "Family Premium",
                                name: "Hyundai Staria / H1",
                                pax: "5-7 Passengers",
                                luggage: "5-7 Standard Bags",
                                img: "/images/fleet/hyundai-staria-2025.png"
                            },
                            {
                                class: "Group VIP",
                                name: "Toyota HiAce",
                                pax: "Up to 11 Passengers",
                                luggage: "10+ Standard Bags",
                                img: "/images/fleet/toyota-hiace-2025.png"
                            }
                        ].map((vehicle, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="h-full bg-surface p-6 rounded-[20px] border border-hairline shadow-[0_1px_2px_rgba(21,20,15,0.04),0_8px_24px_rgba(21,20,15,0.06)] flex flex-col">
                                    <div className="mb-4">
                                        <span className="inline-block bg-gold-tint text-charcoal text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                                            {vehicle.class}
                                        </span>
                                        <h3 className="text-[20px] lg:text-[22px] font-semibold text-charcoal font-display">{vehicle.name}</h3>
                                    </div>
                                    
                                    <div className="relative w-full aspect-[4/3] mb-6 rounded-lg overflow-hidden bg-surface-warm/50 flex items-center justify-center p-4">
                                        <Image
                                            src={vehicle.img}
                                            alt={vehicle.name}
                                            fill
                                            className="object-contain z-10"
                                        />
                                    </div>
                                    
                                    <div className="space-y-3 mt-auto pt-4 border-t border-hairline">
                                        <div className="flex items-center gap-3 text-charcoal-soft text-sm">
                                            <Users size={18} className="text-gold-deep" />
                                            <span>{vehicle.pax}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-charcoal-soft text-sm">
                                            <BadgeCheck size={18} className="text-gold-deep" />
                                            <span>{vehicle.luggage}</span>
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Fixed-Price Assurance (Ivory Band) */}
            <section className="py-12 bg-ivory border-y border-hairline">
                <div className="container">
                    <FadeIn>
                        <div className="bg-gold-tint/50 rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-gold/20 shadow-sm">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center shrink-0 shadow-md">
                                    <ShieldAlert className="text-charcoal" size={32} />
                                </div>
                                <div>
                                    <h3 className="text-[22px] md:text-[28px] font-semibold text-charcoal font-display mb-2">
                                        Fixed Prices. No Surge. No Hidden Fees.
                                    </h3>
                                    <p className="text-charcoal-soft text-lg">
                                        Avoid the uncertainty of street taxis and ride-apps. Your booking price is guaranteed.
                                    </p>
                                </div>
                            </div>
                            <div className="shrink-0">
                                <Link 
                                    href="/booking"
                                    className="inline-flex items-center justify-center bg-charcoal text-white font-semibold px-8 py-4 rounded-btn hover:bg-charcoal-soft transition-colors duration-200"
                                >
                                    Check Prices Now
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 7. Social Proof / Reviews (Surface Band) */}
            <section className="py-[clamp(64px,8vw,128px)] bg-surface">
                <div className="container">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                        <div>
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                                Pilgrim Experiences
                            </span>
                            <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal leading-[1.15]">
                                Trusted Globally
                            </h2>
                        </div>
                        <div className="flex items-center gap-4 bg-surface-warm px-6 py-3 rounded-full border border-hairline shadow-sm">
                            <span className="font-display text-2xl font-bold text-charcoal">5.0</span>
                            <div className="flex text-gold">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                            </div>
                            <span className="text-charcoal-soft text-sm font-medium border-l border-hairline pl-4">Google Reviews</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {[
                            {
                                text: "\"The driver was waiting for us at our Makkah hotel exactly on time. The GMC was spotless and incredibly comfortable for my elderly parents. Highly recommended.\"",
                                name: "Tariq A.",
                                loc: "United Kingdom"
                            },
                            {
                                text: "\"Booking from abroad was seamless. They confirmed instantly via WhatsApp and the fixed price gave us immense peace of mind compared to haggling with local taxis.\"",
                                name: "Farah M.",
                                loc: "Malaysia"
                            },
                            {
                                text: "\"Exceptional service. We used them for our transfer from Madinah to Makkah, and then for hotel drops. Professional, polite, and very safe driving.\"",
                                name: "Usman R.",
                                loc: "United States"
                            }
                        ].map((review, idx) => (
                            <FadeIn key={idx} delay={idx * 0.1}>
                                <div className="bg-ivory p-8 rounded-2xl border border-hairline h-full flex flex-col relative shadow-sm">
                                    <div className="flex text-gold mb-6">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-charcoal-soft italic leading-[1.7] mb-8 font-display text-lg">
                                        {review.text}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="font-semibold text-charcoal">{review.name}</div>
                                        <div className="text-muted text-sm">{review.loc}</div>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. FAQ (Ivory Band) */}
            <section className="py-[clamp(64px,8vw,128px)] bg-ivory">
                <div className="container max-w-4xl">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <span className="text-gold font-bold tracking-[0.14em] uppercase text-[12px] md:text-[13px] mb-3 block">
                                Common Questions
                            </span>
                            <h2 className="text-[clamp(34px,4vw,44px)] font-semibold font-display text-charcoal leading-[1.15]">
                                Hotel Transfers FAQ
                            </h2>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                                {
                                    q: "Will the driver pick us up from our hotel lobby?",
                                    a: "Yes, our drivers will meet you directly at your hotel lobby or the designated reception area, assisting you with your luggage straight to the vehicle."
                                },
                                {
                                    q: "Can you drop us directly at the Haram gates?",
                                    a: "We drop you off at the closest legally permissible points to Masjid Al Haram and Masjid Nabawi. Certain direct access roads are strictly pedestrian-only or restricted by authorities."
                                },
                                {
                                    q: "What is your luggage allowance?",
                                    a: "Luggage allowance depends on the vehicle you select. A standard Camry holds 3 bags, while our H1s and HiAces can easily accommodate large groups with 7 to 10+ standard bags."
                                },
                                {
                                    q: "Do you provide child seats?",
                                    a: "Yes, child seats are available upon request. Please specify this requirement when booking so we can equip the vehicle appropriately."
                                },
                                {
                                    q: "How do I pay for the transfer?",
                                    a: "We offer flexible payment options. You can pay securely online via credit card during booking, or opt to pay directly in cash (SAR) to your driver upon arrival."
                                }
                            ].map((faq, idx) => (
                                <details key={idx} className="group bg-surface rounded-xl border border-hairline shadow-sm overflow-hidden open:shadow-md transition-shadow">
                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-semibold text-lg text-charcoal group-open:text-gold-deep transition-colors">
                                        {faq.q}
                                        <span className="transition group-open:rotate-180 text-muted group-open:text-gold-deep">
                                            <ChevronDown size={20} />
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-6 text-charcoal-soft leading-[1.65]">
                                        {faq.a}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* 9. Final CTA Band (Surface-Warm Band) */}
            <section className="py-24 bg-surface-warm border-t border-hairline text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-tint/40 rounded-full blur-[120px] pointer-events-none" />
                <div className="container relative z-10">
                    <FadeIn>
                        <h2 className="text-[clamp(36px,5vw,56px)] font-bold font-display text-charcoal mb-6 leading-[1.1]">
                            Ready for a Seamless Journey?
                        </h2>
                        <p className="text-charcoal-soft text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-[1.65]">
                            Book your premium hotel transfer today and experience the comfort, reliability, and peace of mind you deserve.
                        </p>
                        <Link 
                            href="/booking"
                            className="inline-flex items-center justify-center bg-gold text-charcoal font-semibold px-10 py-5 rounded-btn hover:bg-gold-deep hover:shadow-lg transition-all duration-300 text-lg shadow-sm"
                        >
                            Book Your Hotel Transfer
                            <ArrowRight size={24} className="ml-2" />
                        </Link>
                    </FadeIn>
                </div>
            </section>

        </main>
    );
}
