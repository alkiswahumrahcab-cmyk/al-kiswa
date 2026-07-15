import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Clock, Camera, Heart, BookOpen, Shield, Users, Star, Mountain, Landmark } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { LocationGrid } from '@/components/ziyarat/LocationGrid';
import { PackagePricingTable } from '@/components/ziyarat/PackagePricingTable';
import { makkahSites, madinahSites, jeddahSites, taifSites } from '@/data/ziyarat-locations';
import { tourPackages } from '@/data/ziyarat-packages';

export const metadata: Metadata = {
    title: "Private Ziyarat Tours Makkah Madinah Jeddah Taif 2026 | Al Kiswah",
    description: "Book private Ziyarat tours across Makkah, Madinah, Jeddah & Taif. Visit 43+ Islamic historical sites — Jabal Al-Nour, Masjid Quba, Mount Uhud, Al Balad & more. Fixed prices, multilingual drivers, all vehicle types.",
    alternates: generateMetadataAlternates("/services/ziyarat-tours"),
    openGraph: {
        title: "Private Ziyarat Tours — Makkah, Madinah, Jeddah & Taif 2026 | Al Kiswah",
        description: "VIP guided tours of 43+ Islamic historical sites across Saudi Arabia. Jabal Al-Nour, Masjid Quba, Al Balad & more.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Private Ziyarat Tour Makkah Madinah' }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Private Ziyarat Tours Makkah Madinah Jeddah Taif 2026 | Al Kiswah",
        description: "VIP guided tours of 43+ Islamic historical sites across Saudi Arabia. Jabal Al-Nour, Masjid Quba, Al Balad & more.",
        images: ['/images/routes/makkah-ziyarat-hero.webp']
    }
};

const ziyaratFAQs = [
    { question: "How long is a typical Ziyarat tour in Makkah?", answer: "A standard Makkah Ziyarat tour covering Jabal Al-Nour (Cave Hira), Jabal Thawr, Arafat, Mina, Muzdalifah, and Jannat Al-Mu'alla takes approximately 3 to 4 hours. Extended tours covering all 15 sites take 5–6 hours." },
    { question: "How long is a Madinah Ziyarat tour?", answer: "A typical Madinah Ziyarat tour visiting Masjid Quba, Mount Uhud, the Martyrs Cemetery, Masjid Al-Qiblatayn, Seven Mosques, and Jannat Al-Baqi takes approximately 3 to 4 hours. Add the Date Market and companion mosques for a 5-hour extended tour." },
    { question: "Do you offer Taif day trips from Makkah?", answer: "Yes. Our Taif Mountain Day Trip departs from your Makkah hotel and includes Al Hada cable car, rose gardens, Al Shafa mountain, traditional souq, and Al Rudaf Park. The full trip takes 8–10 hours with prices starting from SAR 400 (sedan)." },
    { question: "Can you arrange a Jeddah city tour?", answer: "Absolutely. We offer tours of Jeddah's top attractions including the Corniche, King Fahd Fountain, Al Balad UNESCO district, the Floating Mosque (Masjid Al-Rahma), and Fakieh Aquarium. Tours take 4–5 hours." },
    { question: "Do the drivers speak English, Urdu, or Arabic?", answer: "Yes, our drivers are multilingual and speak English, Arabic, and Urdu. They are selected for their language skills and deep knowledge of the historical and religious significance of each site." },
    { question: "Can we customize which places we visit?", answer: "Every tour is fully private. You choose which sites to visit, how long to stay at each, and the order of stops. Discuss your preferred itinerary on WhatsApp before booking." },
    { question: "What vehicles are available for Ziyarat tours?", answer: "Toyota Camry sedans (4 pax), GMC Yukon AT4 SUVs (7 pax), Hyundai Staria/H1 vans (7 pax), Toyota Hiace (11 pax), and Toyota Coaster buses (19 pax)." },
    { question: "Is the tour suitable for elderly or families with children?", answer: "Yes. All vehicles are air-conditioned. Drivers drop elderly passengers at the closest accessible point. Child seats are available free of charge. Sites like Jabal Al-Nour require climbing but can be viewed from base." },
    { question: "Do you offer tours during Hajj and Ramadan?", answer: "Yes, year-round including Hajj and Ramadan. Availability is limited during peak periods — book at least 48 hours in advance." },
    { question: "What is included in the tour price?", answer: "All prices are per vehicle and include fuel, tolls, parking, and unlimited waiting time at each site. No hidden charges. Hotel pickup and drop-off included." },
];

/* ── Consolidated @graph JSON-LD ── */
const siteUrl = "https://kiswahumrahcab.com";
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
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332", "url": siteUrl },
            "areaServed": [{ "@type": "City", "name": "Makkah" }, { "@type": "City", "name": "Madinah" }, { "@type": "City", "name": "Jeddah" }, { "@type": "City", "name": "Taif" }],
            "hasOfferCatalog": { "@type": "OfferCatalog", "name": "Ziyarat Tour Packages", "itemListElement": [
                { "@type": "Offer", "name": "Makkah Ziyarat Tour — Sedan", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Makkah Ziyarat Tour" } },
                { "@type": "Offer", "name": "Madinah Ziyarat Tour — Sedan", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Madinah Ziyarat Tour" } },
                { "@type": "Offer", "name": "Taif Day Trip — Sedan", "priceCurrency": "SAR", "price": "400", "availability": "https://schema.org/InStock", "itemOffered": { "@type": "Service", "name": "Taif Mountain Day Trip" } },
            ]},
        },
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#makkah-trip`,
            "name": "Makkah Ziyarat City Tour — Private Taxi",
            "description": "Private Ziyarat tours of Makkah's historical Islamic sites. Visit Jabal Al-Noor, Jannat Al-Mualla, Cave of Hira, Mina, Arafat and Muzdalifah. Customisable duration.",
            "url": pageUrl,
            "provider": {
                "@type": "TransportationCompany",
                "@id": `${siteUrl}/#organization`
            },
            "touristType": ["Muslim pilgrims", "Umrah visitors", "Hajj pilgrims"],
            "itinerary": { "@type": "ItemList", "numberOfItems": 15, "itemListElement": makkahSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "200", "availability": "https://schema.org/InStock" },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "bestRating": "5",
                "ratingCount": "245"
            }
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
        // Adding TouristAttractions for top sites
        ...makkahSites.slice(0, 3).map(s => ({
            "@type": "TouristAttraction",
            "@id": `${pageUrl}#${s.id}`,
            "name": s.name,
            "description": s.desc
        })),
    ],
};

export default async function ZiyaratToursPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20a%20Ziyarat%20Tour`;

    return (
        <main className="min-h-screen bg-bg">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            {/* ── Static Hero Section ── */}
            <section className="relative pt-[120px] pb-16 md:pt-[160px] md:pb-24 overflow-hidden border-b border-border bg-surface">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/hero/pilgrims-walking-makkah-haram.jpg"
                        alt="Private Ziyarat Tour Makkah Madinah"
                        fill
                        priority
                        className="object-cover opacity-15"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/60 to-surface" />
                </div>

                <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <Breadcrumbs />
                        </div>
                        
                        <div className="inline-block px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-[13px] font-bold uppercase tracking-wider mb-6">
                            Ministry Licensed Operator
                        </div>

                        <h1 className="font-display font-semibold text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] mb-6">
                            Ziyarat Tours: Explore Islamic History
                        </h1>

                        <p className="font-body text-lg md:text-xl text-body-light leading-relaxed mb-8 md:mb-10 max-w-2xl mx-auto font-light">
                            Private guided tours of 43+ sacred sites across Makkah, Madinah, Jeddah & Taif. Walk in the footsteps of the Prophet (SAW).
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link href={whatsappLink} className="btn-gold px-8 py-4 rounded-btn font-bold text-[14px] uppercase tracking-[0.15em] text-black shadow-sm transition-transform hover:scale-105 inline-flex items-center justify-center">
                                Book Ziyarat Tour
                            </Link>
                            <Link href="#pricing" className="px-8 py-4 rounded-btn font-bold text-[14px] uppercase tracking-[0.15em] text-ink border border-border bg-white hover:bg-surface transition-colors inline-flex items-center justify-center">
                                View Prices
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Tour Packages Overview ── */}
            <section id="pricing" className="py-16 bg-bg border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-3">Tour Packages &amp; Pricing</h2>
                            <p className="text-body-light font-light text-[17px]">Fixed prices per vehicle — no hidden charges. All tours include hotel pickup &amp; drop-off.</p>
                        </div>
                        <PackagePricingTable packages={tourPackages} whatsappLink={whatsappLink} />
                        <SeasonalPricingNote className="mt-6" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Makkah Ziyarat — 15 Sites ── */}
            <section className="py-20 bg-surface border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-gold/10 p-3.5 rounded-2xl text-gold border border-gold/20 shrink-0">
                                <Landmark size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-2">Makkah Ziyarat Sites</h2>
                                <p className="text-body-light font-medium text-[17px]">15 sacred locations — tap any site to read its full history</p>
                            </div>
                        </div>
                        <LocationGrid sites={makkahSites} />
                        <div className="mt-10 text-center">
                            <Link href={whatsappLink} className="inline-flex items-center text-gold hover:text-ink transition-colors text-[14px] font-bold uppercase tracking-wider">
                                Book Makkah Ziyarat Tour <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Madinah Ziyarat — 14 Sites ── */}
            <section className="py-20 bg-bg border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.1}>
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-gold/10 p-3.5 rounded-2xl text-gold border border-gold/20 shrink-0">
                                <Heart size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-2">Madinah Ziyarat Sites</h2>
                                <p className="text-body-light font-medium text-[17px]">14 sacred locations in the City of the Prophet (SAW)</p>
                            </div>
                        </div>
                        <LocationGrid sites={madinahSites} />
                        <div className="mt-10 text-center">
                            <Link href={whatsappLink} className="inline-flex items-center text-gold hover:text-ink transition-colors text-[14px] font-bold uppercase tracking-wider">
                                Book Madinah Ziyarat Tour <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Jeddah Tourist Attractions — 8 Sites ── */}
            <section className="py-20 bg-surface border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-gold/10 p-3.5 rounded-2xl text-gold border border-gold/20 shrink-0">
                                <Star size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-2">Jeddah Islamic &amp; Tourist Attractions</h2>
                                <p className="text-body-light font-medium text-[17px]">8 must-see destinations — optional add-on tour</p>
                            </div>
                        </div>
                        <p className="text-body-light font-light text-[17px] leading-relaxed mb-8 md:pl-[68px]">
                            Combine a Jeddah city tour with your <Link href="/services/jeddah-airport-transfer" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">airport transfer</Link> for a memorable day out.
                        </p>
                        <LocationGrid sites={jeddahSites} />
                    </FadeIn>
                </div>
            </section>

            {/* ── Taif Mountain Tour — 6 Sites ── */}
            <section className="py-20 bg-bg border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.3}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="bg-gold/10 p-3.5 rounded-2xl text-gold border border-gold/20 shrink-0">
                                <Mountain size={32} />
                            </div>
                            <div>
                                <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-2">Taif Mountain Tour</h2>
                                <p className="text-body-light font-medium text-[17px]">6 scenic attractions — full-day escape from Makkah heat</p>
                            </div>
                        </div>
                        <p className="text-body-light font-light text-[17px] leading-relaxed mb-8 md:pl-[68px]">
                            Just 90 km from Makkah, Taif offers cooler mountain air, rose gardens, and cable car rides. Perfect for families with children.
                        </p>
                        <LocationGrid sites={taifSites} />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us — 5 Features ── */}
            <section className="py-24 bg-surface border-b border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-14 font-display text-ink">Why Choose Al Kiswah for Your Ziyarat?</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {[
                                { icon: <Clock size={28} />, title: "No Rushed Visits", desc: "Unlike group buses, we wait. Take your time to pray and reflect at every site." },
                                { icon: <BookOpen size={28} />, title: "Historical Context", desc: "Multilingual drivers share the Islamic history and significance of each location." },
                                { icon: <Camera size={28} />, title: "Photo Stops", desc: "Flexibility to stop at scenic viewpoints for photographs and memories." },
                                { icon: <Shield size={28} />, title: "Licensed & Safe", desc: "Nusuk-registered, fully insured vehicles with professional licensed drivers." },
                                { icon: <Users size={28} />, title: "All Group Sizes", desc: "Sedan, SUV, van, and bus — from couples to groups of 19 passengers." },
                            ].map((f, i) => (
                                <div key={i} className="p-8 rounded-[20px] bg-bg border border-border hover:border-gold/30 transition-all hover:shadow-md group">
                                    <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-white transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-[17px] font-bold mb-3 text-ink font-body">{f.title}</h3>
                                    <p className="text-[14px] text-body-light leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-14">
                            <Link href="/booking" className="inline-flex items-center btn-gold px-10 py-4 rounded-btn font-bold transition-all uppercase tracking-[0.15em] text-[14px] text-black hover:scale-105 shadow-sm">
                                Book Your Private Tour <ArrowRight size={18} className="ml-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content Block ── */}
            <section className="py-24 bg-bg border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-semibold text-ink mb-10 font-display text-center">
                                Private Ziyarat Tours in Saudi Arabia — Your Complete Guide
                            </h2>
                            <div className="space-y-6 text-body leading-relaxed font-light text-[17px]">
                                <p>A Ziyarat tour is one of the most spiritually rewarding experiences any Umrah pilgrim can undertake. While the rituals of Umrah centre around the Haram in Makkah, the surrounding region is filled with Islamic historical sites that deepen your connection to the faith. At <strong className="text-ink font-semibold">Al Kiswah Umrah Transport</strong>, we offer fully private Ziyarat tours across four cities — <strong className="text-ink font-semibold">Makkah, Madinah, Jeddah, and Taif</strong> — covering more than 43 sacred and historical locations with knowledgeable multilingual drivers.</p>

                                <h3 className="text-2xl font-semibold text-ink mt-10 mb-4 font-display">Makkah Ziyarat: Walk Where Revelation Began</h3>
                                <p>Our Makkah Ziyarat tour covers 15 sites starting with <strong className="text-ink font-semibold">Jabal Al-Nour</strong>, where the first Quranic revelation descended in the Cave of Hira. The journey continues to <strong className="text-ink font-semibold">Jabal Thawr</strong>, the plains of <strong className="text-ink font-semibold">Arafat, Mina, and Muzdalifah</strong>, the Meeqat mosques, <strong className="text-ink font-semibold">Masjid Al-Jinn</strong>, and the historic <strong className="text-ink font-semibold">Jannat Al-Mu&apos;alla</strong> cemetery where Khadijah (RA) is buried. We also visit lesser-known but significant sites like <strong className="text-ink font-semibold">Masjid Al-Khayf</strong> in Mina (where 70 prophets prayed) and the <strong className="text-ink font-semibold">Hudaybiyyah treaty site</strong>.</p>

                                <h3 className="text-2xl font-semibold text-ink mt-10 mb-4 font-display">Madinah Ziyarat: The City of the Prophet (SAW)</h3>
                                <p>In Madinah, our tour covers 14 sites including <strong className="text-ink font-semibold">Masjid Quba</strong> (praying here equals an Umrah), <strong className="text-ink font-semibold">Mount Uhud</strong> and the Martyrs&apos; Cemetery, the <strong className="text-ink font-semibold">Seven Mosques</strong> at the Khandaq battle site, <strong className="text-ink font-semibold">Jannat Al-Baqi</strong> (10,000+ companions buried), and the companion mosques of Abu Bakr, Umar, Ali, and Salman Al-Farsi. For history enthusiasts, we offer an optional extended trip to the <strong className="text-ink font-semibold">Badr battlefield</strong> (130 km) — site of Islam&apos;s first decisive victory.</p>

                                <h3 className="text-2xl font-semibold text-ink mt-10 mb-4 font-display">Jeddah &amp; Taif: Beyond the Holy Cities</h3>
                                <p>Jeddah offers the <strong className="text-ink font-semibold">UNESCO Al Balad district</strong>, the iconic <strong className="text-ink font-semibold">Floating Mosque</strong>, and the world&apos;s tallest <strong className="text-ink font-semibold">King Fahd Fountain</strong>. For a cooler escape, our <strong className="text-ink font-semibold">Taif day trip</strong> (from SAR 400) includes the Al Hada cable car, famous rose gardens, and mountain souqs — perfect for families. All tours use your choice of vehicle: <Link href="/fleet/toyota-camry" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">Toyota Camry</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">GMC Yukon</Link>, <Link href="/fleet/hyundai-staria" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">Hyundai Staria</Link>, or <Link href="/fleet/toyota-hiace" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">Toyota Hiace bus</Link>.</p>

                                <h3 className="text-2xl font-semibold text-ink mt-10 mb-4 font-display">Pricing &amp; Booking</h3>
                                <p>All prices are <strong className="text-ink font-semibold">fixed per vehicle</strong> with fuel, tolls, parking, and waiting time included. Makkah and Madinah tours start from <strong className="text-ink font-semibold">SAR 200</strong>, Taif from <strong className="text-ink font-semibold">SAR 400</strong>. We operate 24/7 year-round. <Link href="/booking" className="text-gold hover:text-ink font-semibold underline underline-offset-4 decoration-gold/30">Book on WhatsApp</Link> with your preferred date, group size, and itinerary — we confirm within minutes. Need an <Link href="/services/jeddah-airport-transfer" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">airport transfer</Link> or <Link href="/services/makkah-madinah-taxi" className="text-gold hover:text-ink font-medium underline underline-offset-4 decoration-gold/30">intercity taxi</Link> too? Bundle and save.</p>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Static Fleet Section ── */}
            <section className="py-24 bg-surface border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-4">Vehicles for Ziyarat Tours</h2>
                        <p className="text-body-light font-light text-[17px] max-w-2xl mx-auto">
                            Choose the perfect vehicle for your group size. All vehicles are air-conditioned, fully insured, and driven by licensed professionals.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-bg rounded-[20px] overflow-hidden border border-border hover:shadow-md transition-shadow">
                            <div className="relative h-56 bg-surface p-6 flex items-center justify-center">
                                <Image src="/images/fleet/staria.png" alt="Hyundai Staria Umrah Taxi" width={400} height={200} className="object-contain" />
                            </div>
                            <div className="p-6 border-t border-border">
                                <h3 className="font-display font-bold text-xl text-ink mb-1">Hyundai Staria</h3>
                                <p className="text-gold font-medium text-sm mb-4">5–7 Passengers • 5 Bags</p>
                                <p className="text-body-light text-sm">Perfect for families. Spacious interior with comfortable seating and excellent visibility for sightseeing.</p>
                            </div>
                        </div>
                        
                        <div className="bg-bg rounded-[20px] overflow-hidden border border-border hover:shadow-md transition-shadow">
                            <div className="relative h-56 bg-surface p-6 flex items-center justify-center">
                                <Image src="/images/fleet/hiace.png" alt="Toyota HiAce Umrah Van" width={400} height={200} className="object-contain" />
                            </div>
                            <div className="p-6 border-t border-border">
                                <h3 className="font-display font-bold text-xl text-ink mb-1">Toyota HiAce</h3>
                                <p className="text-gold font-medium text-sm mb-4">11 Passengers • 10 Bags</p>
                                <p className="text-body-light text-sm">Ideal for larger families and groups traveling together. High roof and ample space for a comfortable tour.</p>
                            </div>
                        </div>
                        
                        <div className="bg-bg rounded-[20px] overflow-hidden border border-border hover:shadow-md transition-shadow">
                            <div className="relative h-56 bg-surface p-6 flex items-center justify-center">
                                <Image src="/images/fleet/coaster.png" alt="Toyota Coaster Umrah Bus" width={400} height={200} className="object-contain" />
                            </div>
                            <div className="p-6 border-t border-border">
                                <h3 className="font-display font-bold text-xl text-ink mb-1">Toyota Coaster</h3>
                                <p className="text-gold font-medium text-sm mb-4">19 Passengers • 15 Bags</p>
                                <p className="text-body-light text-sm">The best choice for large groups. Professional driver ensures a smooth journey to all historical sites.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="relative z-10 bg-bg">
                <FAQSection items={ziyaratFAQs} title="Ziyarat Tours — Frequently Asked Questions" />
            </div>
        </main>
    );
}
