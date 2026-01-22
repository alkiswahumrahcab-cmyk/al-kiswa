import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, CheckCircle } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "Ziyarat Makkah Tours | Historical Places Visit",
    description: "Book private Ziyarat tours in Makkah. Visit Jabal Al-Nour (Cave Hira), Jabal Thawr, Arafat, and Mina with experienced drivers.",
    keywords: [
        "Ziyarat Makkah",
        "Cave Hira Tour",
        "Jabal Thawr Visit",
        "Makkah Historical Places",
        "Private Ziyarat Taxi Makkah",
        "ziarah makkah",
        "Umrah Ziyarat"
    ],
    alternates: {
        canonical: '/services/ziarah-makkah',
    },
    openGraph: {
        title: "Ziyarat Makkah Tours | Visit Cave Hira & Arafat",
        description: "Comprehensive private tours of Makkah's historical sites. Comfortable transport and knowledgeable drivers.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.png', width: 1200, height: 630, alt: 'Jabal Al-Nour Makkah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Makkah Ziyarat Tour",
    "description": "Private guided tour of historical Islamic sites in Makkah including Cave Hira, Thawr, and Arafat.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "Place",
            "name": "Jabal Al-Nour",
            "description": "Cave Hira - First Revelation"
        },
        {
            "@type": "Place",
            "name": "Jabal Thawr",
            "description": "Cave of Migration"
        },
        {
            "@type": "Place",
            "name": "Arafat",
            "description": "Mount of Mercy"
        }
    ],
    "offers": {
        "@type": "Offer",
        "price": "250",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const makkahFAQs = [
    {
        question: "How long is the Makkah Ziyarat tour?",
        answer: "The standard tour takes about 2-3 hours, covering the main historical sites like Jabal Al-Nour, Thawr, and Arafat."
    },
    {
        question: "Can we climb Cave Hira?",
        answer: "Yes, but please note that climbing requires 1-2 hours of hiking. If you wish to climb, please inform us when booking so we can adjust the schedule."
    },
    {
        question: "Is hotel pickup included?",
        answer: "Yes, we pick you up from your hotel in Makkah and drop you back after the tour."
    },
];

export default async function ZiarahMakkahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20Makkah%20Ziyarat`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="Makkah Ziyarat Tours"
                subtitle="Walk where the Prophet (SAW) walked. A spiritual journey through the history of Islam in the Holy City."
                bgImage="/images/routes/makkah-ziyarat-hero.png"
                ctaText="Book Makkah Ziyarat"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Jabal Al Nour Makkah Ziyarat Tour"
            />

            {/* Makkah Sites Detail */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-l-4 border-gold-primary pl-4">
                                    Sacred Sites We Visit
                                </h2>
                                <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
                                    Our private tours are designed to give you time to reflect. We don't rush you. Visit these blessed locations at your own pace.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            name: "Jabal Al-Nour (Cave Hira)",
                                            desc: "The mountain of Light, where the Prophet (SAW) received the first revelation of the Quran.",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "Jabal Thawr",
                                            desc: "The sanctuary where the Prophet (SAW) and Abu Bakr (RA) took refuge during the migration to Madinah.",
                                            icon: <CheckCircle size={24} />
                                        },
                                        {
                                            name: "Plain of Arafat (Jabal Al-Rahmah)",
                                            desc: "The Mount of Mercy, where the Prophet (SAW) delivered his Farewell Sermon.",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "Mina & Muzdalifah",
                                            desc: "Pass by the tent city of Mina and the open plains of Muzdalifah, witnessing the sites of Hajj.",
                                            icon: <Clock size={24} />
                                        },
                                        {
                                            name: "Jannat al-Mu'alla",
                                            desc: "The ancient cemetery of Makkah where Umm al-Mu'mineen Khadijah (RA) rests.",
                                            icon: <MapPin size={24} />
                                        }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl flex gap-6 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold-primary/10 p-4 rounded-full h-fit text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-colors">
                                                {site.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-xl mb-2">{site.name}</h3>
                                                <p className="text-gray-400 font-light leading-relaxed">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 sticky top-24">
                                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1537181534458-7dc2614c9546?q=80&w=1000&auto=format&fit=crop"
                                        alt="Jabal Al-Nour (Cave of Hira) Mountain View Makkah"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                        <div>
                                            <span className="text-gold-primary font-bold tracking-wider uppercase text-sm mb-2 block">Featured Destination</span>
                                            <h3 className="text-white text-3xl font-bold font-sans">Jabal Al-Nour</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Why Book With Us */}
            <section className="py-24 bg-white/5 relative z-10 border-y border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-sans text-white">Experience Makkah with Comfort</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Flexible Timing</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Start your tour whenever you want. We recommend early morning (after Fajr) to avoid the heat and crowds.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Camera size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Photo Stops</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Take your time to capture memories at Jabal Al-Nour and Arafat without any pressure.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <ArrowRight size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Premium Vehicles</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Travel in air-conditioned comfort with our GMC Yukon or Staria fleet.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.2em] text-sm text-black hover:scale-105">
                                Book Your Makkah Ziyarat <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={makkahFAQs} title="Makkah Ziyarat - FAQ" />
            </div>
        </main>
    );
}
