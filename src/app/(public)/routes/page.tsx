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
        <main className="bg-primary-black min-h-screen pb-20 relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />
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

            <section className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {ROUTES.map((route, index) => (
                        <FadeIn key={route.id} delay={index * 0.08}>
                            <div className="block h-full group relative">
                                <GlassCard className="h-full bg-neutral-900/80 border-white/10 hover:border-gold-primary/30 transition-all duration-300 overflow-hidden relative shadow-2xl backdrop-blur-md">
                                    <Link href={route.link} className="absolute inset-0 z-10">
                                        <span className="sr-only">View {route.title}</span>
                                    </Link>
                                    <div className="flex flex-col md:flex-row h-full">
                                        <div className="md:w-2/5 relative min-h-[220px] md:min-h-full overflow-hidden">
                                            <Image src={route.image} alt={route.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 50vw" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r md:from-black/60 md:to-transparent" />
                                            <div className="absolute bottom-4 left-4 text-white md:hidden relative z-10">
                                                <div className="flex items-center gap-2 text-sm font-medium mb-1"><Clock size={14} className="text-gold-primary" />{route.time}</div>
                                                <div className="flex items-center gap-2 text-sm font-medium"><MapPin size={14} className="text-gold-primary" />{route.distance}</div>
                                            </div>
                                        </div>
                                        <div className="p-8 md:w-3/5 flex flex-col">
                                            <div className="mb-4">
                                                <h3 className="text-2xl font-bold font-sans text-white group-hover:text-gold-primary transition-colors">{route.title}</h3>
                                                <h4 className="text-lg font-bold text-gold-primary font-reem-kufi mt-1">{route.titleAr}</h4>
                                            </div>
                                            <div className="space-y-4 mb-8">
                                                <p className="text-gray-400 text-sm leading-relaxed font-light">{route.description}</p>
                                                <p className="text-gray-500 text-sm font-arabic leading-relaxed text-right border-t border-dashed border-white/10 pt-3">{route.descriptionAr}</p>
                                            </div>
                                            <div className="hidden md:grid grid-cols-2 gap-3 mb-8 text-sm text-gray-400">
                                                <div className="flex flex-wrap gap-2">
                                                    {route.features.map((f, i) => (<span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg text-xs border border-white/5"><CheckCircle size={10} className="text-gold-primary" /> {f}</span>))}
                                                </div>
                                                <div className="flex flex-wrap gap-2 justify-end" dir="rtl">
                                                    {route.featuresAr.map((f, i) => (<span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-lg text-xs font-arabic border border-white/5"><CheckCircle size={10} className="text-gold-primary" /> {f}</span>))}
                                                </div>
                                            </div>
                                            <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/10">
                                                <div className="flex flex-col">
                                                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Starting from</span>
                                                    <span className="text-xl font-bold text-gold-primary">{route.price}</span>
                                                </div>
                                                <div className="flex gap-4 relative z-20 items-center">
                                                    <Link href="/fleet" className="hidden md:flex items-center text-xs font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wider">View Fleet</Link>
                                                    <span className="flex items-center gap-2 text-sm font-bold text-black bg-gold-primary px-4 py-2 rounded-full hover:bg-white transition-colors shadow-lg shadow-gold-primary/20">Book Now <ArrowRight size={16} /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        </FadeIn>
                    ))}
                </div>
                <div className="mt-12 text-center max-w-2xl mx-auto">
                    <SeasonalPricingNote />
                </div>
            </section>

            {/* Stats Counter */}
            <section className="py-16 mt-16 bg-neutral-900/60 border-y border-white/5 relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: '8', label: 'Routes', labelAr: 'مسارات' },
                            { value: '4', label: 'Cities', labelAr: 'مدن' },
                            { value: '6', label: 'Vehicle Types', labelAr: 'أنواع سيارات' },
                            { value: '24/7', label: 'Availability', labelAr: 'متاح دائماً' },
                        ].map((s, i) => (
                            <FadeIn key={i} delay={i * 0.1}>
                                <div className="text-[#D4AF37] text-4xl md:text-5xl font-bold mb-2">{s.value}</div>
                                <div className="text-white font-semibold text-sm">{s.label}</div>
                                <div className="text-gray-500 text-xs font-arabic">{s.labelAr}</div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 bg-transparent relative">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <FadeIn>
                            <h2 className="text-3xl lg:text-5xl font-bold font-sans text-white mb-6">Why Travel With Al Kiswah?</h2>
                            <p className="text-gray-400 font-light text-lg">More than just transport, we provide a seamless bridge between your spiritual destinations.</p>
                        </FadeIn>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldCheck, title: "Licensed & Insured", titleAr: "مرخص ومؤمن", desc: "Fully licensed by the Ministry of Transport. Every vehicle is insured and monitored.", descAr: "مرخصون من وزارة النقل وتغطية تأمينية شاملة." },
                            { icon: Star, title: "Premium Experience", titleAr: "تجربة فاخرة", desc: "From the moment you step in, experience hospitality that honors the Guests of Allah.", descAr: "ضيافة تليق بضيوف الرحمن منذ لحظة الوصول." },
                            { icon: Clock, title: "Punctuality", titleAr: "دقة المواعيد", desc: "Our drivers arrive before schedule to ensure your journey is stress-free.", descAr: "نحترم وقتكم الثمين. وصول قبل الموعد لضمان راحتكم." }
                        ].map((feature, idx) => (
                            <FadeIn key={idx} delay={0.2 + (idx * 0.1)}>
                                <GlassCard className="text-center p-10 rounded-3xl bg-neutral-900/50 border-white/10 hover:border-gold-primary/30 transition-all duration-300 hover:-translate-y-2">
                                    <div className="w-20 h-20 bg-black/50 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8 text-gold-primary shadow-inner">
                                        <feature.icon size={36} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 text-white font-sans">{feature.title}</h3>
                                    <h4 className="text-xl font-bold text-gold-primary font-reem-kufi mb-4">{feature.titleAr}</h4>
                                    <p className="text-gray-400 text-sm mb-4 leading-relaxed font-light">{feature.desc}</p>
                                    <p className="text-gray-500 text-sm font-arabic border-t border-white/10 pt-3">{feature.descAr}</p>
                                </GlassCard>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-20 bg-neutral-900/50 border-y border-white/5 relative">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-5 text-gray-300 leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-bold text-white font-sans text-center mb-6">Umrah Transport Routes — Your Complete Guide</h2>
                            <p>Planning your Umrah journey requires reliable transport between Saudi Arabia&apos;s holy cities. <strong className="text-white">Al Kiswah Umrah Transport</strong> operates <strong className="text-white">8 dedicated routes</strong> connecting Jeddah Airport, Makkah, Madinah, and Taif — serving over 10,000 pilgrims annually with our fleet of <Link href="/fleet/toyota-camry" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Camry sedans</Link>, <Link href="/fleet/gmc-yukon-at4" className="text-[#D4AF37] hover:text-white hover:underline">GMC Yukon AT4 SUVs</Link>, <Link href="/fleet/hyundai-staria" className="text-[#D4AF37] hover:text-white hover:underline">Hyundai Staria vans</Link>, and <Link href="/fleet/toyota-hiace" className="text-[#D4AF37] hover:text-white hover:underline">Toyota Hiace buses</Link>.</p>
                            <p>Our most popular route — <Link href="/services/jeddah-airport-transfer" className="text-[#D4AF37] hover:text-white hover:underline">Jeddah Airport to Makkah</Link> — features meet &amp; greet service, flight monitoring, and luggage assistance from SAR 200. For the journey between the two holy cities, our <Link href="/services/makkah-madinah-taxi" className="text-[#D4AF37] hover:text-white hover:underline">Makkah to Madinah transfer</Link> includes optional Miqat stops for Ihram.</p>
                            <p>Explore Islamic history with our <Link href="/services/ziyarat-tours" className="text-[#D4AF37] hover:text-white hover:underline">Ziyarat Tours</Link> covering <strong className="text-white">43+ sacred sites</strong> across all four cities. Visit <Link href="/services/ziarah-makkah" className="text-[#D4AF37] hover:text-white hover:underline">15 sites in Makkah</Link> including Cave Hira and Arafat, or explore <Link href="/services/ziarah-madinah" className="text-[#D4AF37] hover:text-white hover:underline">14 sites in Madinah</Link> from Masjid Quba to the Date Market. All prices are fixed per vehicle with no hidden charges.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <HotelsAndDistricts />
        </main>
    );
}
