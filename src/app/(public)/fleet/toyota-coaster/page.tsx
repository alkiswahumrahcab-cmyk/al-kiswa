import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Fuel, MapPin, Wifi } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetPricingGrid from '@/components/fleet/FleetPricingGrid';
import FleetFeatureImage from '@/components/fleet/FleetFeatureImage';
import Interior360Viewer from '@/components/fleet/Interior360Viewer';

import pricingData from '@/data/pricing.json';

// const vehicleData = pricingData.vehicles.find(v => v.id === 'coaster');


export const metadata: Metadata = {
    title: "Toyota Coaster Bus Rental Makkah | Group Umrah Transport",
    description: "Book Toyota Coaster 22-seater bus for Umrah groups. Comfortable transport from Jeddah Airport to Makkah & Madinah. Large luggage capacity.",
    keywords: [
        "Toyota Coaster Rental Makkah",
        "22 Seater Bus Makkah",
        "Group Umrah Bus",
        "Makkah Madinah Bus Transport",
        "Toyota Coaster Price",
        "تأجير باص كوستر",
        "نقل جماعي مكة",
        "باص 20 راكب جدة"
    ],
    alternates: { canonical: 'https://alkiswahumrahtransport.com/fleet/toyota-coaster' },
    openGraph: {
        title: "Toyota Coaster Bus Rental Makkah | Group Umrah Transport",
        description: "Rent a 22-Seater Toyota Coaster for your Umrah group. Spacious, air-conditioned, and reliable transport between Jeddah, Makkah, and Madinah.",
        url: 'https://alkiswahumrahtransport.com/fleet/toyota-coaster',
        siteName: 'Al Kiswah Umrah Transport',
        images: [
            {
                url: 'https://alkiswahumrahtransport.com/images/fleet/toyota-coaster-2025.png',
                width: 1200,
                height: 630,
                alt: 'Toyota Coaster 22-Seater Bus',
            },
        ],
        type: 'website',
    },
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Toyota Coaster 22-Seater Bus Rental",
    "image": "https://alkiswahumrahtransport.com/images/fleet/toyota-coaster-2025.png",
    "description": "Rent Toyota Coaster bus in Makkah. Premium 22-seater transport for Umrah groups. Spacious, comfortable, and reliable.",
    "brand": { "@type": "Brand", "name": "Toyota" },
    "offers": {
        "@type": "Offer",
        "price": "700",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2025-12-31",
        "url": "https://alkiswahumrahtransport.com/fleet/toyota-coaster"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "124"
    },
    "review": {
        "@type": "Review",
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
        },
        "author": {
            "@type": "Person",
            "name": "Ahmed Al-Sayed"
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Excellent bus for our large family group. Very spacious and the AC was perfect for the heat."
    }
};

const coasterFAQs = [
    {
        question: "How many passengers can the Coaster comfortably fit?",
        answer: "The Toyota Coaster comfortably seats 22 passengers with ample legroom. It is designed for medium-sized groups."
    },
    {
        question: "Is there enough luggage space for 20+ people?",
        answer: "Yes, the Coaster has a dedicated luggage area and overhead compartments. It can easily accommodate 15-20 standard suitcases."
    },
    {
        question: "Is the Coaster suitable for long trips to Madinah?",
        answer: "Absolutely. The Coaster features high-ceiling interiors, comfortable seating, and powerful air conditioning, making it ideal for the Jeddah-Makkah-Madinah route."
    },
];

export default async function ToyotaCoasterPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Toyota%20Coaster%20for%20Group%20Umrah`;

    // Toyota Coaster ID placeholder
    const coasterId = 'coaster_placeholder_id';
    const coasterImage = '/images/fleet/toyota-coaster-2025.png';

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="Toyota Coaster 2025 | Premium Group Transport"
                subtitle="The ultimate choice for medium-sized Umrah groups. Spacious, reliable, and comfortable travel across Saudi Arabia."
                bgImage={coasterImage}
                badge="Best for Groups"
                ctaText="Book via WhatsApp"
                ctaLink={whatsappLink}
                layout="center"
            />

            <FleetPricingGrid
                vehicleId={coasterId}
                vehicleImage={coasterImage}
                vehicleType="coaster"
                title="Toyota Coaster Rates | Jeddah, Makkah, Madinah"
                subtitle="Comfortable seating for up to 22 passengers. Ideal for organized group travel."
            />

            {/* Vehicle Highlights */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <FleetFeatureImage
                                src="/images/fleet/toyota-coaster-2025.png"
                                alt="Toyota Coaster Bus"
                                fallbackSrc={coasterImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                Group Favorite
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-slate-800 dark:text-slate-100">
                                Why Choose Toyota Coaster?
                            </h2>
                            <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                Experience seamless group travel with the Toyota Coaster. Designed for comfort and durability, it offers a smooth ride for up to 22 passengers.
                                Whether you are traveling from <Link href="/services/jeddah-airport-transfer" className="text-emerald-600 font-medium hover:underline">Jeddah Airport</Link> or visiting Ziyarat sites, the Coaster ensures everyone travels together in comfort.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                                        <Users className="text-emerald-500" size={20} /> 22 Passengers
                                    </div>
                                    <p className="text-sm text-slate-500">Ideal for 3-5 families</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                                        <Briefcase className="text-emerald-500" size={20} /> 15+ Bags
                                    </div>
                                    <p className="text-sm text-slate-500">Ample storage space</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                                        <Shield className="text-emerald-500" size={20} /> Safety First
                                    </div>
                                    <p className="text-sm text-slate-500">Equipped with ABS & safety belts</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-slate-800 dark:text-white">
                                        <Fuel className="text-emerald-500" size={20} /> Smooth Ride
                                    </div>
                                    <p className="text-sm text-slate-500">Stable suspension system</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/booking" className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-500/20">
                                    Book Toyota Coaster <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Specifications */}
            <section className="py-12 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 font-playfair text-slate-900 dark:text-white">Technical Specifications</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Engine</h3>
                            <p className="font-bold text-xl text-slate-900 dark:text-white">4.0L Diesel</p>
                            <p className="text-sm text-slate-400">Reliable Performance</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Climate Control</h3>
                            <p className="font-bold text-xl text-slate-900 dark:text-white">Ducted AC</p>
                            <p className="text-sm text-slate-400">Vents for every seat</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Seating</h3>
                            <p className="font-bold text-xl text-slate-900 dark:text-white">22 Seats</p>
                            <p className="text-sm text-slate-400">High-back fabric seats</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-2">Features</h3>
                            <p className="font-bold text-xl text-slate-900 dark:text-white">Mic & Audio</p>
                            <p className="text-sm text-slate-400">Guide seat included</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">Perfect For</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Umrah Groups",
                                desc: "Keep your entire group together in one comfortable vehicle.",
                                icon: Users
                            },
                            {
                                title: "Corporate Travel",
                                desc: "Professional transport for business delegations and staff transport.",
                                icon: Briefcase
                            },
                            {
                                title: "Sightseeing Tours",
                                desc: "High windows and microphone system make it perfect for guided tours.",
                                icon: MapPin
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border-t-4 border-emerald-500 transition-all hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-emerald-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={coasterFAQs} title="Toyota Coaster Rental - Frequently Asked Questions" />
        </main>
    );
}
