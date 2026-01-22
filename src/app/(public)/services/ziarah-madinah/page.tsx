import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, CheckCircle, Heart } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "Ziyarat Madinah Tours | Masjid Quba & Uhud Visit",
    description: "Private Ziyarat tours in Madinah. Visit Masjid Quba, Mount Uhud, Seven Mosques and Qiblatayn. Experienced drivers and comfortable transport.",
    keywords: [
        "Ziyarat Madinah",
        "Masjid Quba Tour",
        "Mount Uhud Visit",
        "Madinah Historical Places",
        "Private Ziyarat Taxi Madinah",
        "ziarah madinah",
        "Seven Mosques Tour"
    ],
    alternates: {
        canonical: '/services/ziarah-madinah',
    },
    openGraph: {
        title: "Ziyarat Madinah Tours | Visit Masjid Quba & Uhud",
        description: "Comprehensive private tours of Madinah's historical sites. Follow the footsteps of the Prophet (SAW).",
        images: [{ url: '/images/routes/madinah-ziyarat-hero.png', width: 1200, height: 630, alt: 'Masjid Quba Madinah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Madinah Ziyarat Tour",
    "description": "Private guided tour of historical Islamic sites in Madinah including Masjid Quba, Uhud, and Qiblatayn.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "Place",
            "name": "Masjid Quba",
            "description": "First Mosque in Islam"
        },
        {
            "@type": "Place",
            "name": "Mount Uhud",
            "description": "Site of Battle of Uhud"
        },
        {
            "@type": "Place",
            "name": "Masjid Al-Qiblatayn",
            "description": "Mosque of Two Qiblas"
        }
    ],
    "offers": {
        "@type": "Offer",
        "price": "200",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const madinahFAQs = [
    {
        question: "How long is the Madinah Ziyarat tour?",
        answer: "The tour typically lasts 3 hours, covering all major historical mosques and sites."
    },
    {
        question: "Does the tour include the Printing Press?",
        answer: "The Quran Printing Complex has specific opening hours (usually mornings). We can include it in the itinerary if it is open."
    },
    {
        question: "Is Masjid Quba included?",
        answer: "Yes, Masjid Quba is a key stop. We allow ample time for you to perform Wudhu and offer 2 Rakaats prayer."
    },
];

export default async function ZiarahMadinahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20Madinah%20Ziyarat`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="Madinah Ziyarat Tours"
                subtitle="Explore the City of the Prophet (SAW). Visit the first mosque of Islam and relive the earliest days of our faith."
                bgImage="/images/routes/madinah-ziyarat-hero.png"
                ctaText="Book Madinah Ziyarat"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Masjid Quba Madinah Ziyarat Tour"
            />

            {/* Madinah Sites Detail */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-l-4 border-gold-primary pl-4">
                                    Illuminated Landmarks
                                </h2>
                                <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
                                    Madinah is filled with history in every corner. Our drivers take you to the most spiritually significant sites.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            name: "Masjid Quba",
                                            desc: "The first mosque built by the Prophet (SAW). Offering 2 Rakaats here is equivalent to an Umrah.",
                                            icon: <Heart size={24} />
                                        },
                                        {
                                            name: "Mount Uhud & Martyrs Cemetery",
                                            desc: "The site of the second major battle in Islam and the resting place of Hamza (RA).",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "Masjid Al-Qiblatayn",
                                            desc: "The Mosque of the Two Qiblas, where the direction of prayer was changed towards the Kaaba.",
                                            icon: <Clock size={24} />
                                        },
                                        {
                                            name: "The Seven Mosques",
                                            desc: "A complex of small historical mosques at the site of the Battle of the Trench (Khandaq).",
                                            icon: <CheckCircle size={24} />
                                        },
                                        {
                                            name: "Masjid Al-Ghamamah",
                                            desc: "Where the Prophet (SAW) offered the prayer for rain.",
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
                                        src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                        alt="Masjid Quba Madinah First Mosque in Islam Exterior"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                        <div>
                                            <span className="text-gold-primary font-bold tracking-wider uppercase text-sm mb-2 block">The First Mosque</span>
                                            <h3 className="text-white text-3xl font-bold font-sans">Masjid Quba</h3>
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
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-sans text-white">The City of Peace</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Ample Time for Dua</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">We ensure you have enough time at Uhud and Quba to make Dua and offer prayers without rushing.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Knowledgeable Drivers</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Our drivers know the history and etiquette of visiting these sacred places.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <ArrowRight size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Door-to-Door</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">We pick you up from your hotel in the Markazia area and drop you back right at the door.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.2em] text-sm text-black hover:scale-105">
                                Book Your Madinah Ziyarat <ArrowRight size={20} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={madinahFAQs} title="Madinah Ziyarat - FAQ" />
            </div>
        </main>
    );
}
