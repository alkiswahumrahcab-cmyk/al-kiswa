import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Features from '@/components/home/Features';
import styles from '@/app/page.module.css';
import Link from 'next/link';
import { ArrowRight, Plane, ShieldCheck, UserCheck } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import VehicleCapacityGuide from '@/components/services/VehicleCapacityGuide';
import RouteVisual from '@/components/services/RouteVisual';

export const metadata: Metadata = {
    title: "Taxi Jeddah Airport to Makkah | Private Hotel Transfer Price",
    description: "Book your Jeddah Airport to Makkah taxi. Private GMC Yukon & Hyundai Staria transfer with Meet & Greet service (استقبال المطار). Fixed rates, no hidden fees.",
    keywords: [
        "Jeddah Airport to Makkah Taxi",
        "Taxi Jeddah Airport Price",
        "Private Driver Jeddah Airport",
        "KAIA Terminal 1 Taxi",
        "GMC Yukon Jeddah Airport",
        "تاكسي مطار جدة",
        "توصيل من مطار جدة الى مكة",
        "سعر التوصيل من مطار جدة للكعبة",
        "استقبال مطار جدة",
        "حجز سيارة من مطار جدة"
    ],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/jeddah-airport-transfer',
    },
    openGraph: {
        title: "Taxi Jeddah Airport to Makkah | Private Transfer Price",
        description: "Reliable transfer from Jeddah Airport (JED) to Makkah hotels. Our driver waits for you at the arrival hall.",
        images: [{ url: '/images/routes/jeddah-airport-hero-professional.png', width: 1200, height: 630, alt: 'Jeddah Airport VIP Transfer' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Jeddah Airport to Makkah Transfer",
    "alternateName": "توصيل من مطار جدة الى مكة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport",
        "image": "https://alkiswahumrahtransport.com/logo.png"
    },
    "serviceType": "Airport Transfer",
    "areaServed": {
        "@type": "Airport",
        "name": "King Abdulaziz International Airport (JED)"
    },
    "description": "Private VIP transfer from Jeddah Airport to Makkah hotels. 24/7 Meet & Greet. خدمة توصيل vip من المطار.",
    "offers": {
        "@type": "Offer",
        "price": "200",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    },
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://alkiswahumrahtransport.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://alkiswahumrahtransport.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Jeddah Airport to Makkah",
                "item": "https://alkiswahumrahtransport.com/services/jeddah-airport-transfer"
            }
        ]
    }
};

const jeddahAirportFAQs = [
    {
        question: "Where will the driver meet me?",
        answer: "Our driver will be waiting for you at the arrival hall after you clear customs and baggage claim. They will be holding a sign with your name or 'Al Kiswah Transport'. We track your flight to ensure we are there when you land."
    },
    {
        question: "What if my flight is delayed?",
        answer: "Don't worry. We monitor flight statuses in real-time. If your flight is delayed, we automatically adjust the pickup time. There are no extra charges for flight delays."
    },
    {
        question: "How long does the trip to Makkah take?",
        answer: "The journey from King Abdulaziz International Airport (JED) to Makkah typically takes 60 to 75 minutes, depending on traffic conditions in Jeddah."
    },
    {
        question: "Can I pay in cash?",
        answer: "Yes, you can pay the driver in cash (SAR) upon arrival. However, we recommend booking online to secure your rate and vehicle."
    }
];

import { getSettings } from '@/lib/settings-storage';

export default async function JeddahAirportTransferPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const content = {
        title: "Jeddah Airport to Makkah Transfers",
        subtitle: "Start your Umrah with peace of mind. Professional drivers, Meet & Greet service (استقبال خاص). Direct transfer to your Makkah hotel.",
        heroImage: "/images/routes/jeddah-airport-hero-professional.png"
    };

    return (
        <main className="overflow-x-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title={content.title}
                subtitle={content.subtitle}
                bgImage={content.heroImage}
                ctaText="Book Arrival Transfer"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Arrival Guide Section */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h2 className="text-3xl font-bold mb-4 font-playfair text-slate-800 dark:text-slate-100">
                            Arrival Procedure: What to Expect
                        </h2>
                        <p className="text-slate-600 dark:text-slate-300">
                            We know arriving in a new country can be stressful. Here is how we make it easy:
                        </p>
                        <div className="mt-6 p-6 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100/50 dark:border-emerald-800/30 inline-block font-playfair italic">
                            <p className="text-emerald-900 dark:text-emerald-100 font-medium">
                                "We wait for you, even if your flight is delayed – because your comfort matters."
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <UserCheck size={40} className="text-emerald-600" />,
                                title: "1. Meet & Greet",
                                desc: "Our driver will be waiting at the arrival hall holding a sign with your name. No need to search for a taxi."
                            },
                            {
                                icon: <ShieldCheck size={40} className="text-emerald-600" />,
                                title: "2. Luggage Assistance",
                                desc: <span>Our vehicles (<Link href="/fleet/gmc-yukon-at4" className="text-amber-600 hover:underline">GMC</Link>/<Link href="/fleet/hyundai-starex" className="text-amber-600 hover:underline">H1</Link>) are chosen for their large luggage capacity. The driver will handle your bags.</span>
                            },
                            {
                                icon: <Plane size={40} className="text-amber-500" />,
                                title: "3. Direct to Hotel",
                                desc: <span>Relax in a cooled vehicle while we take you directly to your <Link href="/services/makkah-madinah-taxi" className="text-amber-600 hover:underline">hotel door in Makkah</Link> (approx 60-75 mins).</span>
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
                                <div className="flex justify-center mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-100">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Route Visual Section */}
            <section className="py-8 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-center mb-8 font-playfair">Your Journey to Makkah</h2>
                    <RouteVisual
                        from="Jeddah Airport (JED)"
                        fromLabel="Arrival Hall (Meet & Greet)"
                        to="Makkah Hotel"
                        toLabel="Hotel Reception Drop-off"
                        duration="60-75 Mins"
                        distance="95 km"
                        showMiqat={false}
                    />
                </div>
            </section>

            {/* Terminal Info */}
            <section className="py-12 bg-emerald-50/30 dark:bg-slate-800/50 border-y border-emerald-100/50">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold mb-4 text-emerald-950 dark:text-slate-100 font-playfair">Which Terminal?</h3>
                    <p className="text-emerald-900/70 dark:text-slate-300 max-w-2xl mx-auto mb-6 font-light">
                        Most international flights land at <strong className="font-bold text-emerald-950">Terminal 1 (New Airport)</strong>.
                        Some regional carriers use the North Terminal.
                        Don't worry, we track your flight number and adjust the pickup location automatically.
                    </p>
                </div>
            </section>

            <VehicleCapacityGuide />

            <Features />
            <FleetCarouselWrapper />

            <FAQSection items={jeddahAirportFAQs} title="Jeddah Airport Transfer FAQs" />

            {/* CTA */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <Link href="/booking" className="btn-emerald px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-emerald-900/20">
                        Check Taxi Fares <ArrowRight size={20} className="ml-2" />
                    </Link>
                    <p className="mt-8 text-sm text-emerald-900/60 font-light">
                        Going to Madinah next? Check our <Link href="/services/makkah-madinah-taxi" className="text-emerald-700 hover:text-emerald-600 font-bold underline underline-offset-4">Makkah to Madinah Taxi</Link> rates.
                    </p>
                </div>
            </section>
        </main >
    );
}
