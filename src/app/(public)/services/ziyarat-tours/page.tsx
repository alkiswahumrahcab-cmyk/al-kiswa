import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Image from 'next/image';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, Heart, BookOpen } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "VIP Makkah & Madinah Ziyarat Tours 2026 | Al Kiswah",
    description: "Book private VIP Ziyarat tours in Makkah and Madinah. Fixed prices, knowledgeable drivers for Jabal Al-Nour, Masjid Quba, and guided trips.",
    keywords: [
        "ziyarat tours makkah",
        "ziyarat madinah places",
        "historical places tour makkah",
        "private ziyarat transfer",
        "taif day trip from makkah",
        "jabal al-nour transport",
        "masjid quba taxi"
    ],
    alternates: generateMetadataAlternates("/services/ziyarat-tours"),
    openGraph: {
        title: "VIP Makkah & Madinah Ziyarat Tours 2026 | Al Kiswah",
        description: "Book private VIP Ziyarat tours in Makkah and Madinah. Fixed prices, knowledgeable drivers.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Jabal Al-Nour Makkah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "VIP Makkah & Madinah Ziyarat Tour",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah",
        "image": "https://kiswahumrahcab.com/logo.png"
    },
    "description": "Private guided VIP tour of historical Islamic sites in Makkah and Madinah.",
    "itinerary": [
        {
            "@type": "City",
            "name": "Makkah",
            "description": "Visit Jabal Al-Nour, Jabal Thawr, and Arafat."
        },
        {
            "@type": "City",
            "name": "Madinah",
            "description": "Visit Masjid Quba, Mount Uhud, and Qiblatayn."
        }
    ],
    "offers": {
        "@type": "Offer",
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
                bgImage="/images/routes/makkah-ziyarat-hero.webp"
                ctaText="Book Ziyarat Tour"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Makkah and Madinah Historical Ziyarat Tours - Jabal Al Noor"
            />

            {/* Tour at a Glance — Fix P6-Bug4: duration + starting price */}
            <section className="py-16 bg-neutral-900/40 border-b border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-2">Tour Info at a Glance</h2>
                            <p className="text-gray-400 font-light">Private vehicle — you choose which sites to visit and how long to stay</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Makkah Tour */}
                            <div className="bg-black/50 border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37]/40 transition-all group">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37]"><MapPin size={24} /></div>
                                    <h3 className="text-xl font-bold text-white font-sans">Makkah Ziyarat Tour</h3>
                                </div>
                                <div className="flex gap-6 mb-5">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-white font-bold text-lg flex items-center gap-1.5"><Clock size={16} className="text-[#D4AF37]" /> 4–6 Hours</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
                                        <p className="text-[#D4AF37] font-bold text-2xl">SAR 250</p>
                                        <p className="text-xs text-gray-500">per vehicle</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                                    {["Jabal Al-Nour (Cave Hira)", "Jabal Thawr", "Arafat, Mina & Muzdalifah", "Jannat Al-Mu'alla"].map((s, i) => (
                                        <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />{s}</li>
                                    ))}
                                </ul>
                                <Link href={whatsappLink} className="block w-full text-center py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-black transition-all text-sm uppercase tracking-wider">
                                    Book Makkah Tour →
                                </Link>
                            </div>
                            {/* Madinah Tour */}
                            <div className="bg-black/50 border border-[#D4AF37]/20 rounded-3xl p-8 hover:border-[#D4AF37]/40 transition-all group">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37]"><Heart size={24} /></div>
                                    <h3 className="text-xl font-bold text-white font-sans">Madinah Ziyarat Tour</h3>
                                </div>
                                <div className="flex gap-6 mb-5">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-white font-bold text-lg flex items-center gap-1.5"><Clock size={16} className="text-[#D4AF37]" /> 3–5 Hours</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Starting From</p>
                                        <p className="text-[#D4AF37] font-bold text-2xl">SAR 200</p>
                                        <p className="text-xs text-gray-500">per vehicle</p>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-sm text-gray-400 mb-6">
                                    {["Masjid Quba (reward = Umrah)", "Mount Uhud & Martyrs Cemetery", "Masjid Al-Qiblatayn", "The Seven Mosques (Khandaq)"].map((s, i) => (
                                        <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />{s}</li>
                                    ))}
                                </ul>
                                <Link href={whatsappLink} className="block w-full text-center py-3 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-bold hover:bg-[#D4AF37] hover:text-black transition-all text-sm uppercase tracking-wider">
                                    Book Madinah Tour →
                                </Link>
                            </div>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-6">All tours depart from your hotel. Customize your itinerary on WhatsApp before booking.</p>
                    </FadeIn>
                </div>
            </section>

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
                                <Image
                                    src="https://images.unsplash.com/photo-1537181534458-7dc2614c9546?q=80&w=1000&auto=format&fit=crop"
                                    alt="Jabal Al-Nour (Cave of Hira) Mountain View Makkah"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="lazy"
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
                                <Image
                                    src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                    alt="Masjid Quba Madinah First Mosque in Islam Exterior"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="lazy"
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
