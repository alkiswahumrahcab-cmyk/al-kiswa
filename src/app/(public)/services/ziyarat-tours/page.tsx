import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, Heart, BookOpen } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "Ziyarat Makkah Madinah Tours | Visit Historical Sites",
    description: "Private Ziyarat tours in Makkah (Jabal Al-Nour, Arafat) & Madinah (Masjid Quba, Uhud). Experienced drivers sharing Islamic history.",
    keywords: [
        "Ziyarat Tours Makkah",
        "Ziyarat Madinah Places",
        "Masjid Quba Transport",
        "Historical Places Tour Makkah",
        "Private Ziyarat Taxi",
        "Taif Day Trip from Makkah",
        "رحلات زيارة مكة",
        "مزارات المدينة المنورة",
        "زيارة مسجد قباء",
        "جبل النور",
        "زيارة غار حراء"
    ],
    alternates: {
        canonical: 'https://alkiswahumrahtransport.com/services/ziyarat-tours',
    },
    openGraph: {
        title: "Ziyarat Makkah Madinah Tours | Historical Site Visits",
        description: "Guided private tours to Jabal Al-Nour, Masjid Quba, Mount Uhud, and more. deeply spiritual experience with knowledgeable drivers.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.png', width: 1200, height: 630, alt: 'Jabal Al-Nour Makkah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Makkah and Madinah Ziyarat Tour",
    "description": "Private guided tour of historical Islamic sites in Makkah and Madinah including Cave Hira and Masjid Quba.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "City",
            "name": "Makkah",
            "description": "Visit Jabal Al-Nour, Jabal Thawr, and Arafat. زيارة جبل النور وغار ثور."
        },
        {
            "@type": "City",
            "name": "Madinah",
            "description": "Visit Masjid Quba, Mount Uhud, and Qiblatayn. زيارة مسجد قباء وجبل أحد."
        }
    ],
    "offers": {
        "@type": "Offer",
        "price": "300",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const ziyaratFAQs = [
    {
        question: "How long is a typical Ziyarat tour?",
        answer: "A standard Ziyarat tour in either Makkah or Madinah takes about 2 to 3 hours. However, we offer extended tours if you wish to visit more distant sites like Badr or Taif."
    },
    {
        question: "Do the drivers speak English?",
        answer: "Yes, our Ziyarat drivers are selected for their language skills and knowledge of the historical sites. They can guide you to the best parking spots and explain the significance of the locations."
    },
    {
        question: "Can we customize the places we visit?",
        answer: "Absolutely. It is a private tour. You can choose which sites to visit and how long to stay at each. We are here to serve your schedule."
    },
];

export default async function ZiyaratToursPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20a%20Ziyarat%20Tour`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="Ziyarat Tours: Relive Islamic History"
                subtitle="Walk in the footsteps of the Prophet (SAW). Comprehensive engaging tours of the holy sites in Makkah and Madinah."
                bgImage="/images/routes/makkah-ziyarat-hero.png"
                ctaText="Book Ziyarat Tour"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Makkah and Madinah Historical Ziyarat Tours - Jabal Al Noor"
            />

            {/* Makkah Ziyarat */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-l-4 border-gold-primary pl-4">
                                    Makkah Ziyarat Sites
                                </h2>
                                <p className="text-gray-300 mb-6 leading-relaxed font-light text-lg">
                                    Discover the places where Revelation began. Our Makkah tour covers the most significant landmarks outside the Haram.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { name: "Jabal Al-Nour (Cave Hira)", desc: "The place of the first revelation." },
                                        { name: "Jabal Thawr", desc: "The cave where the Prophet (SAW) hid during migration." },
                                        { name: "Mina, Arafat & Muzdalifah", desc: "The sites of Hajj rituals." },
                                        { name: "Jannat al-Mu'alla", desc: "The cemetery where Khadijah (RA) is buried." }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold-primary/10 p-3 rounded-full h-fit text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-colors">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{site.name}</h4>
                                                <p className="text-sm text-gray-400 font-light">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1537181534458-7dc2614c9546?q=80&w=1000&auto=format&fit=crop"
                                    alt="Jabal Al-Nour (Cave of Hira) Mountain View Makkah"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                    <span className="text-white text-2xl font-bold font-sans">Jabal Al-Nour</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Madinah Ziyarat */}
            <section className="py-24 bg-black/30 relative z-10 backdrop-blur-sm border-y border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-l-4 border-gold-primary pl-4">
                                    Madinah Ziyarat Sites
                                </h2>
                                <p className="text-gray-300 mb-6 leading-relaxed font-light text-lg">
                                    Feel the peace of the City of the Prophet. Visit the first mosque of Islam and the sites of early battles.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { name: "Masjid Quba", desc: "The first mosque in Islam. Offering 2 Rakaats here equals an Umrah." },
                                        { name: "Mount Uhud", desc: "Site of the Battle of Uhud and the cemetery of the martyrs." },
                                        { name: "Masjid Al-Qiblatayn", desc: "The mosque where the Qibla was changed." },
                                        { name: "The Seven Mosques", desc: "Site of the Battle of the Trench." }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold-primary/10 p-3 rounded-full h-fit text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-colors">
                                                <Heart size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{site.name}</h4>
                                                <p className="text-sm text-gray-400 font-light">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                    alt="Masjid Quba Madinah First Mosque in Islam Exterior"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                    <span className="text-white text-2xl font-bold font-sans">Masjid Quba</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Why Book Ziyarat With Us */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-sans text-white">Enhance Your Spiritual Journey</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">No Hasted Visits</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Unlike group buses, we wait for you. Travel in our private <Link href="/fleet/gmc-yukon-at4" className="text-gold-primary hover:text-white hover:underline decoration-gold-primary/50">GMC Yukon</Link> or <Link href="/fleet/hyundai-staria" className="text-gold-primary hover:text-white hover:underline decoration-gold-primary/50">Hyundai Staria</Link> and take your time to pray.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Historical Context</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Our drivers share the history and significance of the locations you visit.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Camera size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">Photo Opportunities</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">Flexibility to stop for photos at scenic points like the mountains surrounding Makkah.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.2em] text-sm text-black hover:scale-105">
                                Book Your Private Ziyarat Tour <ArrowRight size={20} className="ml-2" />
                            </Link>
                            <p className="mt-8 text-sm text-gray-500 font-light">
                                Need to travel between cities? We also offer <Link href="/services/makkah-madinah-taxi" className="text-gold-primary hover:text-white transition-colors hover:underline decoration-gold-primary/50">Makkah to Madinah Taxi</Link> services.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={ziyaratFAQs} title="Ziyarat Tours - Frequently Asked Questions" />
            </div>
        </main>
    );
}
