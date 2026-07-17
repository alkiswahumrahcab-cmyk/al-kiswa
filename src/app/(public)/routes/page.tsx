import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from 'next';
import Image from 'next/image';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, ShieldCheck, Star, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/common/FadeIn';
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import dynamic from 'next/dynamic';
import styles from "./routes-stack.module.css";

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export const metadata: Metadata = {
    title: 'Umrah Transport Routes Network | Makkah & Madinah | شبكة المسارات',
    description: 'Explore our comprehensive transport network connecting Jeddah, Makkah, and Madinah. Premium VIP transfers. شبكة مواصلات شاملة بين جدة ومكة والمدينة.',
    keywords: [
        "Umrah transport routes", "Jeddah to Makkah route", "Makkah to Madinah road",
        "Saudi intercity transport", "Haramain transport network",
        "طريق مكة المدينة", "مسارات النقل في السعودية", "توصيل بين المدن المقدسة",
        "شبكة مواصلات العمرة", "نقل من جدة الى مكة"
    ],
    alternates: generateMetadataAlternates("/routes"),
    openGraph: {
        title: "Umrah Transport Routes Network | Al Kiswah Transport",
        description: "Connect seamlessly between Holy Cities. VIP Jeddah to Makkah, Makkah to Madinah.",
        images: [{ url: '/images/routes/routes-network-hero.webp', width: 1200, height: 630, alt: 'Saudi Arabia Transport Network Map' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service", "@id": `${siteUrl}/routes#service`,
            "name": "Al Kiswah Umrah Transport — Route Network",
            "description": "Premium transport routes connecting Jeddah Airport, Makkah, Madinah, and Taif.",
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport" },
            "areaServed": [{ "@type": "City", "name": "Makkah" }, { "@type": "City", "name": "Madinah" }, { "@type": "City", "name": "Jeddah" }, { "@type": "City", "name": "Taif" }],
        },
        {
            "@type": "ItemList", "@id": `${siteUrl}/routes#routes`,
            "name": "Transport Routes", "numberOfItems": 8,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Jeddah Airport to Makkah", "url": `${siteUrl}/services/jeddah-airport-transfer` },
                { "@type": "ListItem", "position": 2, "name": "Makkah to Madinah", "url": `${siteUrl}/services/makkah-madinah-taxi` },
                { "@type": "ListItem", "position": 3, "name": "Madinah Airport Transfer", "url": `${siteUrl}/services/madinah-airport-transfer` },
                { "@type": "ListItem", "position": 4, "name": "Makkah Ziyarat Tours", "url": `${siteUrl}/services/ziyarat-tours` },
                { "@type": "ListItem", "position": 5, "name": "Madinah Ziyarat Tours", "url": `${siteUrl}/services/ziarah-madinah` },
                { "@type": "ListItem", "position": 6, "name": "Jeddah Airport to Madinah", "url": `${siteUrl}/services/intercity-transfer` },
                { "@type": "ListItem", "position": 7, "name": "Makkah to Taif Day Trip", "url": `${siteUrl}/services/ziyarat-tours` },
                { "@type": "ListItem", "position": 8, "name": "Hourly Rental", "url": `${siteUrl}/booking` },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${siteUrl}/routes#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": siteUrl },
                { "@type": "ListItem", "position": 2, "name": "Routes", "item": `${siteUrl}/routes` },
            ],
        },
    ],
};

const ROUTES = [
    {
        id: 'jeddah-makkah',
        title: 'Jeddah Airport ⇄ Makkah',
        titleAr: 'من مطار جدة إلى مكة',
        description: 'The most popular route for arriving pilgrims. Direct VIP transfer from King Abdulaziz International Airport (KAIA) to your hotel in Makkah.',
        descriptionAr: 'الخيار الأول للمعتمرين. خدمة انتقالات VIP مباشرة من مطار الملك عبدالعزيز إلى باب فندقك في مكة المكرمة.',
        distance: '95 km', time: '60-75 mins', price: 'From SAR 250',
        features: ['Meet & Greet', 'Flight Monitoring', 'Luggage Assistance'],
        featuresAr: ['خدمة استقبال', 'متابعة الرحلات', 'مساعدة في الحقائب'],
        link: '/services/jeddah-airport-transfer',
        image: '/images/routes/jeddah-airport-hero-professional.webp'
    },
    {
        id: 'makkah-madinah',
        title: 'Makkah ⇄ Madinah',
        titleAr: 'من مكة إلى المدينة',
        description: 'A spiritual journey between the two Holy Cities. Travel in absolute comfort with our luxury fleet, including stops at Miqat if requested.',
        descriptionAr: 'رحلة روحانية عبر طريق الهجرة. نوفر لك الراحة التامة مع إمكانية التوقف في ميقات السيل الكبير للإحرام.',
        distance: '450 km', time: '4.5 - 5 hours', price: 'From SAR 450',
        features: ['Miqat Stop', 'Premium Comfort', 'Rest Stops Available'],
        featuresAr: ['توقف للميقات', 'سيارات فارهة', 'استراحات طريق'],
        link: '/services/makkah-madinah-taxi',
        image: '/images/routes/makkah-madinah-route-hero.webp'
    },
    {
        id: 'madinah-airport',
        title: 'Madinah Airport ⇄ Hotel',
        titleAr: 'من مطار المدينة إلى الفندق',
        description: 'Seamless transfer from Prince Mohammad Bin Abdulaziz International Airport to your hotel in the Prophet\u2019s City.',
        descriptionAr: 'انتقال سلس من مطار الأمير محمد بن عبدالعزيز إلى فندقك في رحاب مدينة الرسول ﷺ.',
        distance: '20 km', time: '25-30 mins', price: 'From SAR 150',
        features: ['24/7 Service', 'Door-to-Door', 'Family Friendly'],
        featuresAr: ['خدمة 24/7', 'توصيل لباب الفندق', 'مناسب للعوائل'],
        link: '/services/madinah-airport-transfer',
        image: '/images/routes/madinah-airport-hero.webp'
    },
    {
        id: 'ziyarat-makkah',
        title: 'Makkah Ziyarat Tours',
        titleAr: 'جولات مزارات مكة',
        description: 'Visit 15 sacred sites: Jabal Al-Nour (Cave Hira), Jabal Thawr, Arafat, Mina, Muzdalifah & more with a knowledgeable driver.',
        descriptionAr: 'زيارة 15 موقعاً مقدساً: جبل النور، جبل ثور، عرفات، منى، مزدلفة وأكثر.',
        distance: 'Various', time: '3-4 hours', price: 'From SAR 200',
        features: ['15 Sacred Sites', 'Flexible Timing', 'Private Vehicle'],
        featuresAr: ['15 موقعاً مقدساً', 'وقت مرن', 'سيارة خاصة'],
        link: '/services/ziarah-makkah',
        image: '/images/routes/makkah-ziyarat-hero.webp'
    },
    {
        id: 'jeddah-madinah',
        title: 'Jeddah Airport ⇄ Madinah',
        titleAr: 'من مطار جدة إلى المدينة',
        description: 'Direct transfer for those landing in Jeddah but starting their Umrah in Madinah. A comfortable ride in our VIP vehicles.',
        descriptionAr: 'توصيل مباشر من جدة إلى المدينة المنورة. استرخِ في سياراتنا الفاخرة طوال الطريق.',
        distance: '400 km', time: '4 - 4.5 hours', price: 'From SAR 400',
        features: ['Direct Route', 'Maximum Comfort', 'Refreshments'],
        featuresAr: ['طريق مباشر', 'راحة قصوى', 'مشروبات ضيافة'],
        link: '/services/intercity-transfer',
        image: '/images/fleet/intercity-hero.webp'
    },
    {
        id: 'madinah-ziyarat',
        title: 'Madinah Ziyarat Tours',
        titleAr: 'جولات مزارات المدينة',
        description: 'Explore 14 sacred sites: Masjid Quba, Mount Uhud, Seven Mosques, Jannat Al-Baqi, and companion mosques.',
        descriptionAr: 'زيارة 14 موقعاً: مسجد قباء، جبل أحد، المساجد السبعة، البقيع، ومساجد الصحابة.',
        distance: '40 km', time: '3-4 hours', price: 'From SAR 200',
        features: ['14 Sacred Sites', 'Date Market Stop', 'Flexible Timing'],
        featuresAr: ['14 موقعاً مقدساً', 'سوق التمور', 'وقت مرن'],
        link: '/services/ziarah-madinah',
        image: '/images/fleet/intercity-hero.webp'
    },
    {
        id: 'taif-trip',
        title: 'Makkah ⇄ Taif Day Trip',
        titleAr: 'رحلة يومية إلى الطائف',
        description: 'Escape the heat with a full-day mountain trip to Taif. Cable cars, rose gardens, traditional souqs, and mountain views.',
        descriptionAr: 'رحلة يومية إلى مدينة الورد. تلفريك الهدا، حدائق الورد، الأسواق التقليدية.',
        distance: '180 km', time: '8-10 hours', price: 'From SAR 400',
        features: ['Cable Car', 'Rose Gardens', 'Mountain Views'],
        featuresAr: ['تلفريك الهدا', 'حدائق الورد', 'مناظر جبلية'],
        link: '/services/ziyarat-tours',
        image: '/images/fleet/fleet-group-hero.webp'
    },
    {
        id: 'hourly-rental',
        title: 'Hourly Car Rental',
        titleAr: 'تأجير سيارة بالساعة',
        description: 'Need a car for shopping or a custom ziyarat? Rent by the hour with a professional driver in Makkah or Madinah.',
        descriptionAr: 'استئجار سيارة بالساعة مع سائق خاص. مثالي للتسوق أو الزيارات الشخصية.',
        distance: '-', time: '1 hour min', price: 'From SAR 80/hr',
        features: ['Flexible Duration', 'Multiple Stops', 'Any Purpose'],
        featuresAr: ['مدة مرنة', 'توقفات متعددة', 'لأي غرض'],
        link: '/booking',
        image: '/images/fleet/camry-hero-professional.webp'
    }
];

export default function RoutesPage() {
    return (
        <main className="bg-bg min-h-screen pb-20 relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.02] mix-blend-multiply pointer-events-none fixed" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="Our Transport Network"
                subtitle="8 routes connecting Jeddah, Makkah, Madinah & Taif. Premium VIP transfers for Umrah pilgrims. شبكة مواصلات شاملة لخدمة ضيوف الرحمن."
                bgImage="/images/hero/desert-highway-makkah-tower.jpg"
                ctaText="Book Now"
                ctaLink="/booking"
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            <section className="w-full -mt-20 relative z-10">
                <div className={styles.stack}>
                    {ROUTES.map((route, index) => {
                        return (
                        <div
                            key={route.id}
                            className={styles.card}
                            style={{ ["--index" as string]: index }}
                        >
                            <div className={styles.cardInner}>
                                <FadeIn delay={index * 0.08}>
                                    <div className="relative group block overflow-hidden transition-all duration-500 shadow-sm hover:shadow-gold w-full h-[60vh] lg:h-[75vh] min-h-[400px] max-h-[550px] lg:max-h-[700px]">
                                        <Link href={route.link} className="absolute inset-0 z-30">
                                            <span className="sr-only">View {route.title}</span>
                                        </Link>
                                        
                                        {/* Full Card Image */}
                                        <Image 
                                            src={route.image} 
                                            alt={route.title} 
                                            fill 
                                            className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" 
                                            sizes="100vw" 
                                        />
                                        
                                        {/* Dark Overlay - Initial subtle gradient, intensifies on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-70 group-hover:opacity-100 transition-opacity duration-[800ms] z-10" />

                                        {/* Content Overlay */}
                                        <div className="absolute inset-0 z-20 flex flex-col justify-end pb-6 lg:pb-10">
                                            <div className="container mx-auto px-4 lg:px-8">
                                                {/* Top section: Route badge */}
                                                <div className="mb-auto mt-4 transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-100">
                                                    <span className="inline-block px-4 py-1.5 bg-black/40 backdrop-blur-md text-gold text-[12px] uppercase tracking-widest font-semibold rounded-full border border-gold/30">
                                                        Route {index + 1}
                                                    </span>
                                                </div>

                                                <div className="relative w-full">
                                                    <h3 className="text-3xl lg:text-4xl font-semibold font-display text-white mb-1 leading-tight drop-shadow-md">{route.title}</h3>
                                                    <h4 className="text-xl lg:text-2xl text-gold-strong font-reem-kufi drop-shadow-md mb-2">{route.titleAr}</h4>
                                                    
                                                    {/* Hidden detailed content that expands on hover */}
                                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]">
                                                        <div className="overflow-hidden">
                                                            <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-[800ms] delay-150">
                                                                <p className="text-white/90 text-sm lg:text-base leading-relaxed font-normal mb-4 max-w-2xl line-clamp-2">
                                                                    {route.description}
                                                                </p>
                                                                
                                                                {/* Bottom Bar: Price & CTA */}
                                                                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 mt-2 relative z-20">
                                                                    <div className="flex items-center gap-6">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[10px] text-white/60 uppercase tracking-widest mb-0.5">Starting Price</span>
                                                                            <span className="text-xl lg:text-2xl font-semibold font-display text-gold drop-shadow-md">{route.price}</span>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <span className="inline-flex items-center justify-center h-[40px] px-6 bg-gold hover:bg-gold-soft text-ink text-sm font-semibold rounded-btn transition-all pointer-events-none group-hover:pointer-events-auto">
                                                                        Book <ArrowRight size={16} className="ml-2" />
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                        );
                    })}
                </div>
                <div className="mt-20 text-center max-w-2xl mx-auto">
                    <SeasonalPricingNote />
                </div>
            </section>

            {/* Stats Counter */}
            <section className="py-24 mt-24 bg-surface-alt border-y border-border relative">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-border">
                        {[
                            { value: '8', label: 'Dedicated Routes', labelAr: 'مسارات مخصصة' },
                            { value: '4', label: 'Holy Cities', labelAr: 'مدن مقدسة' },
                            { value: '6', label: 'Vehicle Classes', labelAr: 'فئات سيارات' },
                            { value: '24/7', label: 'Availability', labelAr: 'متاح دائماً' },
                        ].map((s, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="text-gold text-5xl lg:text-7xl font-semibold font-display mb-4 tracking-tighter">{s.value}</div>
                                <div className="text-ink font-semibold text-sm tracking-[0.08em] uppercase mb-2">{s.label}</div>
                                <div className="text-muted text-sm font-arabic">{s.labelAr}</div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-32 bg-bg relative">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <FadeIn>
                            <div className="text-gold uppercase tracking-[0.14em] font-semibold text-[13px] mb-4">The Al Kiswah Standard</div>
                            <h2 className="text-4xl lg:text-[44px] font-semibold font-display text-ink max-w-xl leading-[1.1]">Why Choose Our Chauffeurs</h2>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <p className="text-body font-normal text-lg lg:text-[19px] max-w-md leading-[1.65] border-l-[1.5px] border-gold-line pl-6">More than transport, we provide a seamless bridge between your spiritual destinations with unmatched hospitality.</p>
                        </FadeIn>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12 lg:gap-20">
                        {[
                            { icon: ShieldCheck, title: "Licensed & Secure", titleAr: "أمان وموثوقية", desc: "Fully licensed by the Ministry of Transport. Every journey is tracked and insured for total peace of mind.", descAr: "مرخصون من وزارة النقل وتغطية تأمينية شاملة لراحتكم." },
                            { icon: Star, title: "Five-Star Hospitality", titleAr: "ضيافة خمس نجوم", desc: "Experience a service designed around the needs of the Guests of Allah, from chilled water to pristine interiors.", descAr: "ضيافة تليق بضيوف الرحمن وعناية بأدق التفاصيل." },
                            { icon: Clock, title: "Impeccable Timing", titleAr: "دقة متناهية", desc: "Flight tracking and early arrival guarantees ensure your schedule is never compromised.", descAr: "نحترم وقتكم الثمين مع متابعة مستمرة للرحلات." }
                        ].map((feature, idx) => (
                            <FadeIn key={idx} delay={0.2 + (idx * 0.1)}>
                                <div className="p-8 border-t border-border hover:border-gold-strong transition-colors duration-500 group">
                                    <div className="mb-8 text-gold group-hover:text-gold-strong transition-colors duration-500">
                                        <feature.icon size={36} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-[22px] font-semibold mb-2 text-ink font-display">{feature.title}</h3>
                                    <h4 className="text-[19px] font-bold text-gold-strong font-reem-kufi mb-5">{feature.titleAr}</h4>
                                    <p className="text-body text-base leading-[1.65] font-normal">{feature.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial / SEO Guide */}
            <section className="py-24 lg:py-32 bg-bg border-t border-border relative">
                <div className="container mx-auto px-4 max-w-5xl">
                    <FadeIn>
                        <div className="mb-16 text-center max-w-2xl mx-auto">
                            <span className="text-gold font-semibold tracking-[0.14em] uppercase text-[13px] mb-4 block">Travel Information</span>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-semibold text-ink font-display leading-[1.15]">Your Complete Guide to Umrah Transport</h2>
                        </div>
                        
                        <div className="columns-1 md:columns-2 gap-10 lg:gap-16 text-body leading-[1.7] font-normal text-base lg:text-[17px]">
                            <p className="mb-6 md:mb-8">
                                <span className="float-left text-6xl lg:text-7xl font-display text-gold-strong leading-[0.8] pr-3 pt-2">P</span>
                                lanning your Umrah journey requires reliable transport between Saudi Arabia&apos;s holy cities. <strong className="text-ink font-semibold">Al Kiswah Umrah Transport</strong> operates <strong className="text-ink font-semibold">8 dedicated routes</strong> connecting Jeddah Airport, Makkah, Madinah, and Taif — serving over 10,000 pilgrims annually with our fleet of <Link href="/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline transition-colors">Toyota Camry sedans</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-gold-strong hover:text-gold hover:underline transition-colors">GMC Yukon AT4 SUVs</Link>, <Link href="/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline transition-colors">Hyundai Staria vans</Link>, and <Link href="/fleet/toyota-hiace" className="text-gold-strong hover:text-gold hover:underline transition-colors">Toyota Hiace buses</Link>.
                            </p>
                            
                            <p className="mb-6 md:mb-8">
                                Our most popular route — <Link href="/services/jeddah-airport-transfer" className="text-gold-strong hover:text-gold hover:underline font-medium transition-colors">Jeddah Airport to Makkah</Link> — features meet &amp; greet service, flight monitoring, and luggage assistance from SAR 200. For the journey between the two holy cities, our <Link href="/services/makkah-madinah-taxi" className="text-gold-strong hover:text-gold hover:underline font-medium transition-colors">Makkah to Madinah transfer</Link> includes optional Miqat stops for Ihram.
                            </p>
                            
                            <p className="mb-0">
                                Explore Islamic history with our <Link href="/services/ziyarat-tours" className="text-gold-strong hover:text-gold hover:underline font-medium transition-colors">Ziyarat Tours</Link> covering <strong className="text-ink font-semibold">43+ sacred sites</strong> across all four cities. Visit <Link href="/services/ziarah-makkah" className="text-gold-strong hover:text-gold hover:underline font-medium transition-colors">15 sites in Makkah</Link> including Cave Hira and Arafat, or explore <Link href="/services/ziarah-madinah" className="text-gold-strong hover:text-gold hover:underline font-medium transition-colors">14 sites in Madinah</Link> from Masjid Quba to the Date Market. All prices are fixed per vehicle with no hidden charges.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <HotelsAndDistricts />
        </main>
    );
}
