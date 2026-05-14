import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, Heart, BookOpen, Shield, Users, Star, Mountain, Landmark, TreePalm } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { LocationGrid } from '@/components/ziyarat/LocationGrid';
import { PackagePricingTable } from '@/components/ziyarat/PackagePricingTable';
import { makkahSites, madinahSites, jeddahSites, taifSites } from '@/data/ziyarat-locations';
import { tourPackages } from '@/data/ziyarat-packages';

export const metadata: Metadata = {
    title: "Private Ziyarat Tours Makkah Madinah Jeddah Taif 2026 | Al Kiswah",
    description: "Book private Ziyarat tours across Makkah, Madinah, Jeddah & Taif. Visit 43+ Islamic historical sites — Jabal Al-Nour, Masjid Quba, Mount Uhud, Al Balad & more. Fixed prices, multilingual drivers, all vehicle types.",
    keywords: [
        "ziyarat tours makkah", "ziyarat madinah places", "islamic historical sites saudi arabia",
        "private ziyarat transfer", "umrah ziyarat taxi", "cave hira tour",
        "masjid quba visit", "mount uhud tour", "jannat al-baqi", "seven mosques madinah",
        "taif day trip from makkah", "jeddah tourist places", "al balad jeddah tour",
        "makkah guided tour private car", "madinah historical tour", "taif rose gardens visit",
        "king fahd fountain jeddah", "floating mosque jeddah", "badr battlefield trip",
        "umrah ziyarat package 2026", "private islamic tour saudi", "makkah ziyarat taxi price",
        "tourist places makkah", "tourist places madinah", "jeddah city tour",
        "battle of uhud site", "jabal thawr tour", "mina arafat muzdalifah visit",
        "masjid qiblatain", "zamzam well history", "hudaybiyyah treaty site"
    ],
    alternates: generateMetadataAlternates("/services/ziyarat-tours"),
    openGraph: {
        title: "Private Ziyarat Tours — Makkah, Madinah, Jeddah & Taif 2026 | Al Kiswah",
        description: "VIP guided tours of 43+ Islamic historical sites across Saudi Arabia. Jabal Al-Nour, Masjid Quba, Al Balad & more.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Private Ziyarat Tour Makkah Madinah' }]
    }
};

const ziyaratFAQs = [
    { question: "How long is a typical Ziyarat tour in Makkah?", answer: "A standard Makkah Ziyarat tour covering Jabal Al-Nour (Cave Hira), Jabal Thawr, Arafat, Mina, Muzdalifah, and Jannat Al-Mu'alla takes approximately 3 to 4 hours. Extended tours covering all 15 sites take 5–6 hours." },
    { question: "How long is a Madinah Ziyarat tour?", answer: "A typical Madinah Ziyarat tour visiting Masjid Quba, Mount Uhud, the Martyrs Cemetery, Masjid Al-Qiblatayn, Seven Mosques, and Jannat Al-Baqi takes approximately 3 to 4 hours. Add the Date Market and companion mosques for a 5-hour extended tour." },
    { question: "Do you offer Taif day trips from Makkah?", answer: "Yes. Our Taif Mountain Day Trip departs from your Makkah hotel and includes Al Hada cable car, rose gardens, Al Shafa mountain, traditional souq, and Al Rudaf Park. The full trip takes 8–10 hours with prices starting from SAR 400 (sedan)." },
    { question: "Can you arrange a Jeddah city tour?", answer: "Absolutely. We offer tours of Jeddah's top attractions including the Corniche, King Fahd Fountain, Al Balad UNESCO district, the Floating Mosque (Masjid Al-Rahma), and Fakieh Aquarium. Tours take 4–5 hours." },
    { question: "Do the drivers speak English, Urdu, or Arabic?", answer: "Yes, our drivers are multilingual and speak English, Arabic, and Urdu. They are selected for their language skills and deep knowledge of the historical and religious significance of each site." },
    { question: "Can we customize which places we visit?", answer: "Every tour is fully private. You choose which sites to visit, how long to stay at each, and the order of stops. Discuss your preferred itinerary on WhatsApp before booking." },
    { question: "What vehicles are available for Ziyarat tours?", answer: "Toyota Camry sedans (4 pax), GMC Yukon AT4 SUVs (7 pax), Hyundai Staria/H1 vans (7 pax), Toyota Hiace (10 pax), and Toyota Coaster buses (21 pax)." },
    { question: "Is the tour suitable for elderly or families with children?", answer: "Yes. All vehicles are air-conditioned. Drivers drop elderly passengers at the closest accessible point. Child seats are available free of charge. Sites like Jabal Al-Nour require climbing but can be viewed from base." },
    { question: "Do you offer tours during Hajj and Ramadan?", answer: "Yes, year-round including Hajj and Ramadan. Availability is limited during peak periods — book at least 48 hours in advance." },
    { question: "What is included in the tour price?", answer: "All prices are per vehicle and include fuel, tolls, parking, and unlimited waiting time at each site. No hidden charges. Hotel pickup and drop-off included." },
];

/* ── Consolidated @graph JSON-LD ── */
const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/services/ziyarat-tours`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service", "@id": `${pageUrl}#service`,
            "name": "Private Ziyarat Tours — Makkah, Madinah, Jeddah & Taif",
            "description": "Fully private chauffeured Ziyarat tours of 43+ Islamic historical and tourist sites across Makkah, Madinah, Jeddah, and Taif.",
            "url": pageUrl, "image": `${siteUrl}/images/routes/makkah-ziyarat-hero.webp`,
            "serviceType": "Ziyarat Tour", "category": "Islamic Historical Tours",
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966-576-088-555", "url": siteUrl },
            "areaServed": [{ "@type": "City", "name": "Makkah" }, { "@type": "City", "name": "Madinah" }, { "@type": "City", "name": "Jeddah" }, { "@type": "City", "name": "Taif" }],
            "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Ziyarat Tour Packages", "itemListElement": [
                { "@type": "Offer", "name": "Makkah Ziyarat Tour — Sedan", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Makkah Ziyarat Tour" } },
                { "@type": "Offer", "name": "Madinah Ziyarat Tour — Sedan", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Madinah Ziyarat Tour" } },
                { "@type": "Offer", "name": "Taif Day Trip — Sedan", "priceCurrency": "SAR", "price": "400", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Taif Mountain Day Trip" } },
            ]},
        },
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#makkah-trip`,
            "name": "Makkah Ziyarat Tour — 15 Islamic Historical Sites",
            "description": "Private tour of Makkah's most significant landmarks: Jabal Al-Nour, Jabal Thawr, Arafat, Mina, Muzdalifah, Masjid Aisha, Jannat Al-Mu'alla, Masjid Al-Jinn, and more.",
            "touristType": "Umrah Pilgrim",
            "itinerary": { "@type": "ItemList", "numberOfItems": 15, "itemListElement": makkahSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#madinah-trip`,
            "name": "Madinah Ziyarat Tour — 14 Islamic Historical Sites",
            "description": "Private tour of Madinah's sacred sites: Masjid Quba, Mount Uhud, Seven Mosques, Jannat Al-Baqi, Masjid Al-Qiblatayn, Badr Battlefield, and more.",
            "touristType": "Umrah Pilgrim",
            "itinerary": { "@type": "ItemList", "numberOfItems": 14, "itemListElement": madinahSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#taif-trip`,
            "name": "Taif Mountain Day Trip — Nature & Heritage Tour",
            "description": "Full-day tour from Makkah to Taif covering Al Hada cable car, rose gardens, Al Shafa mountain, traditional souq, and Al Rudaf Park.",
            "touristType": "Tourist",
            "itinerary": { "@type": "ItemList", "numberOfItems": 6, "itemListElement": taifSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "400", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": ziyaratFAQs.map(f => ({ "@type": "Question", "name": f.question, "acceptedAnswer": { "@type": "Answer", "text": f.answer } })),
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Services", "item": `${siteUrl}/services` },
                { "@type": "ListItem", "position": 3, "name": "Ziyarat Tours", "item": pageUrl },
            ],
        },
    ],
};

export default async function ZiyaratToursPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20a%20Ziyarat%20Tour`;

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Ziyarat Tours: Explore Islamic History"
                subtitle="Private guided tours of 43+ sacred sites across Makkah, Madinah, Jeddah & Taif. Walk in the footsteps of the Prophet (SAW)."
                bgImage="/images/hero/pilgrims-walking-makkah-haram.jpg"
                ctaText="Book Ziyarat Tour"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Private Ziyarat Tour Makkah Madinah Jeddah Taif"
            />

            {/* ── Tour Packages Overview ── */}
            <section className="py-16 bg-neutral-900/40 border-b border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans mb-2">Tour Packages &amp; Pricing</h2>
                            <p className="text-gray-400 font-light">Fixed prices per vehicle — no hidden charges. All tours include hotel pickup &amp; drop-off.</p>
                        </div>
                        <div className="bg-black/50 border border-[#D4AF37]/20 rounded-3xl p-6 md:p-8">
                            <PackagePricingTable packages={tourPackages} whatsappLink={whatsappLink} />
                        </div>
                        <SeasonalPricingNote className="mt-6" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Makkah Ziyarat — 15 Sites ── */}
            <section className="py-20 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                                <Landmark size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Makkah Ziyarat Sites</h2>
                                <p className="text-gray-400 font-light">15 sacred locations — tap any site to read its full history</p>
                            </div>
                        </div>
                        <LocationGrid sites={makkahSites} city="makkah" />
                        <div className="mt-6 text-center">
                            <Link href={whatsappLink} className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                                Book Makkah Ziyarat Tour <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Madinah Ziyarat — 14 Sites ── */}
            <section className="py-20 bg-black/30 backdrop-blur-sm border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.1}>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                                <Heart size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Madinah Ziyarat Sites</h2>
                                <p className="text-gray-400 font-light">14 sacred locations in the City of the Prophet (SAW)</p>
                            </div>
                        </div>
                        <LocationGrid sites={madinahSites} city="madinah" />
                        <div className="mt-6 text-center">
                            <Link href={whatsappLink} className="inline-flex items-center text-[#D4AF37] hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                                Book Madinah Ziyarat Tour <ArrowRight size={16} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Jeddah Tourist Attractions — 8 Sites ── */}
            <section className="py-20 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                                <Star size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Jeddah Islamic &amp; Tourist Attractions</h2>
                                <p className="text-gray-400 font-light">8 must-see destinations — optional add-on tour</p>
                            </div>
                        </div>
                        <p className="text-gray-400 font-light mb-8 ml-16">Combine a Jeddah city tour with your <Link href="/services/jeddah-airport-transfer" className="text-[#D4AF37] hover:text-white hover:underline">airport transfer</Link> for a memorable day out.</p>
                        <LocationGrid sites={jeddahSites} city="jeddah" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Taif Mountain Tour — 6 Sites ── */}
            <section className="py-20 bg-black/30 backdrop-blur-sm border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.3}>
                        <div className="flex items-center gap-4 mb-3">
                            <div className="bg-[#D4AF37]/10 p-3 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20">
                                <Mountain size={28} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white font-sans">Taif Mountain Tour</h2>
                                <p className="text-gray-400 font-light">6 scenic attractions — full-day escape from Makkah heat</p>
                            </div>
                        </div>
                        <p className="text-gray-400 font-light mb-8 ml-16">Just 80 km from Makkah, Taif offers cooler mountain air, rose gardens, and cable car rides. Perfect for families with children.</p>
                        <LocationGrid sites={taifSites} city="taif" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us — 5 Features ── */}
            <section className="py-20 bg-transparent relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-bold mb-12 font-sans text-white">Why Choose Al Kiswah for Your Ziyarat?</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {[
                                { icon: <Clock size={26} />, title: "No Rushed Visits", desc: "Unlike group buses, we wait. Take your time to pray and reflect at every site." },
                                { icon: <BookOpen size={26} />, title: "Historical Context", desc: "Multilingual drivers share the Islamic history and significance of each location." },
                                { icon: <Camera size={26} />, title: "Photo Stops", desc: "Flexibility to stop at scenic viewpoints for photographs and memories." },
                                { icon: <Shield size={26} />, title: "Licensed & Safe", desc: "Nusuk-registered, fully insured vehicles with professional licensed drivers." },
                                { icon: <Users size={26} />, title: "All Group Sizes", desc: "Sedan, SUV, van, and bus — from couples to groups of 21 passengers." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 transition-all hover:bg-white/10 group">
                                    <div className="bg-[#D4AF37]/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-white">{f.title}</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-10 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] uppercase tracking-[0.15em] text-sm text-black hover:scale-105">
                                Book Your Private Tour <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content Block ── */}
            <section className="py-20 bg-neutral-900/50 border-y border-white/5 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 font-sans text-center">
                                Private Ziyarat Tours in Saudi Arabia — Your Complete Guide
                            </h2>
                            <div className="space-y-6 text-gray-300 leading-relaxed font-light">
                                <p>A Ziyarat tour is one of the most spiritually rewarding experiences any Umrah pilgrim can undertake. While the rituals of Umrah centre around the Haram in Makkah, the surrounding region is filled with Islamic historical sites that deepen your connection to the faith. At <strong className="text-white">Al Kiswah Umrah Transport</strong>, we offer fully private Ziyarat tours across four cities — <strong className="text-white">Makkah, Madinah, Jeddah, and Taif</strong> — covering more than 43 sacred and historical locations with knowledgeable multilingual drivers.</p>

                                <h3 className="text-xl font-bold text-white mt-8 mb-3 font-sans">Makkah Ziyarat: Walk Where Revelation Began</h3>
                                <p>Our Makkah Ziyarat tour covers 15 sites starting with <strong className="text-white">Jabal Al-Nour</strong>, where the first Quranic revelation descended in the Cave of Hira. The journey continues to <strong className="text-white">Jabal Thawr</strong>, the plains of <strong className="text-white">Arafat, Mina, and Muzdalifah</strong>, the Meeqat mosques, <strong className="text-white">Masjid Al-Jinn</strong>, and the historic <strong className="text-white">Jannat Al-Mu&apos;alla</strong> cemetery where Khadijah (RA) is buried. We also visit lesser-known but significant sites like <strong className="text-white">Masjid Al-Khayf</strong> in Mina (where 70 prophets prayed) and the <strong className="text-white">Hudaybiyyah treaty site</strong>.</p>

                                <h3 className="text-xl font-bold text-white mt-8 mb-3 font-sans">Madinah Ziyarat: The City of the Prophet (SAW)</h3>
                                <p>In Madinah, our tour covers 14 sites including <strong className="text-white">Masjid Quba</strong> (praying here equals an Umrah), <strong className="text-white">Mount Uhud</strong> and the Martyrs&apos; Cemetery, the <strong className="text-white">Seven Mosques</strong> at the Khandaq battle site, <strong className="text-white">Jannat Al-Baqi</strong> (10,000+ companions buried), and the companion mosques of Abu Bakr, Umar, Ali, and Salman Al-Farsi. For history enthusiasts, we offer an optional extended trip to the <strong className="text-white">Badr battlefield</strong> (150 km) — site of Islam&apos;s first decisive victory.</p>

                                <h3 className="text-xl font-bold text-white mt-8 mb-3 font-sans">Jeddah &amp; Taif: Beyond the Holy Cities</h3>
                                <p>Jeddah offers the <strong className="text-white">UNESCO Al Balad district</strong>, the iconic <strong className="text-white">Floating Mosque</strong>, and the world&apos;s tallest <strong className="text-white">King Fahd Fountain</strong>. For a cooler escape, our <strong className="text-white">Taif day trip</strong> (from SAR 400) includes the Al Hada cable car, famous rose gardens, and mountain souqs — perfect for families. All tours use your choice of vehicle: <Link href="/fleet/toyota-camry" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Camry</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] hover:text-white hover:underline">GMC Yukon</Link>, <Link href="/fleet/hyundai-staria" className="text-[#D4AF37] hover:text-white hover:underline">Hyundai Staria</Link>, or <Link href="/fleet/toyota-hiace" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Hiace bus</Link>.</p>

                                <h3 className="text-xl font-bold text-white mt-8 mb-3 font-sans">Pricing &amp; Booking</h3>
                                <p>All prices are <strong className="text-white">fixed per vehicle</strong> with fuel, tolls, parking, and waiting time included. Makkah and Madinah tours start from <strong className="text-white">SAR 200</strong>, Taif from <strong className="text-white">SAR 400</strong>. We operate 24/7 year-round. <Link href="/booking" className="text-[#D4AF37] hover:text-white hover:underline font-semibold">Book on WhatsApp</Link> with your preferred date, group size, and itinerary — we confirm within minutes. Need an <Link href="/services/jeddah-airport-transfer" className="text-[#D4AF37] hover:text-white hover:underline">airport transfer</Link> or <Link href="/services/makkah-madinah-taxi" className="text-[#D4AF37] hover:text-white hover:underline">intercity taxi</Link> too? Bundle and save.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={ziyaratFAQs} title="Ziyarat Tours — Frequently Asked Questions" />
            </div>
        </main>
    );
}
