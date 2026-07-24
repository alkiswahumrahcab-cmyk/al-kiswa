import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, Fuel } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetFeatureImage from '@/components/fleet/FleetFeatureImage';
import Interior360Viewer from '@/components/fleet/Interior360ViewerClient';

import { getVehicle, formatSeatsAr, formatLuggageAr } from '@/data/fleet';
import { SITE_URL } from '@/config/site';

const generateJsonLd = (vehicle: any) => ({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": `${SITE_URL}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Fleet",
                    "item": `${SITE_URL}/fleet`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Hyundai Staria",
                    "item": `${SITE_URL}/fleet/hyundai-staria`
                }
            ]
        },
        {
            "@type": "Product",
            "name": vehicle.name,
            "image": `${SITE_URL}/images/fleet/staria-hero-professional.webp`,
            "description": `استأجر سيارة ${vehicle.name} الفاخرة في مكة. سيارة فان تتسع لـ ${vehicle.seats} ركاب مع إطلالات بانورامية لعائلات كبار الشخصيات.`,
            "brand": { "@type": "Brand", "name": "Hyundai" },
            "offers": {
                "@type": "Offer",
                "price": "450",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": '2026-12-31',
                "url": `${SITE_URL}/fleet/hyundai-staria`
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Yusuf Al-Balushi" },
                "datePublished": "2025-02-10",
                "reviewBody": "The Staria was amazing. The panoramic windows made the journey from Jeddah to Makkah unforgettable.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    const vehicle = getVehicle('hyundai-staria')!;
    return {
        title: `${vehicle.name} تاجير السعودية | تاكسي عمرة عائلي`,
        description: `استأجر ${vehicle.name} في مكة. سيارة فان فاخرة واسعة لعائلات العمرة.`,
        keywords: [
            "Hyundai Staria Rental Makkah",
            "Family Van for Umrah",
            "Hyundai Staria Jeddah Airport",
            "7 Seater Taxi Makkah",
            "Luxury Van Rental Saudi Arabia",
            "هيونداي ستاريا مكة",
            "تاكسي عائلي جدة",
            "سيارة عائلية للعمرة"
        ],
        alternates: {
    ...generateMetadataAlternates("/fleet/hyundai-staria"),
    canonical: "https://kiswahumrahcab.com/ar/fleet/hyundai-staria",
  },
    };
}

const stariaFAQs = [
    {
        question: "هل هيونداي ستاريا مريحة للمسافات الطويلة؟",
        answer: "نعم، تم تصميم ستاريا كـ \"سفينة فضاء\" للطريق. فهي توفر نوافذ واسعة، ومساحة كبيرة للأرجل، وتعليقًا حديثًا، مما يجعل رحلة مكة-المدينة التي تستغرق 4-5 ساعات ممتعة للغاية."
    },
    {
        question: "كم مساحة الأمتعة في ستاريا؟",
        answer: "تتفوق ستاريا في مساحة الأمتعة. يمكن أن تستوعب بسهولة 6-7 حقائب كبيرة بالإضافة إلى 6-7 ركاب، مما يجعلها متفوقة على سيارات السيدان القياسية."
    },
    {
        question: "ما هو الفرق بين ستاريا و H1؟",
        answer: "ستاريا هي الخليفة الحديث لـ H1. وتتميز بتكنولوجيا أمان أفضل، ومقاعد أكثر راحة، وتصميم داخلي مستقبلي أكثر اتساعًا."
    },
];

export default async function HyundaiStariaPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Hyundai%20Staria%20for%20Umrah`;


    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    
    const stariaImage = '/images/fleet/staria-hero-professional.webp';

    const vehicle = getVehicle('hyundai-staria')!;
    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="هيونداي ستاريا | نقل عمرة متميز"
                subtitle="مستقبل السفر في المملكة العربية السعودية. سيارة فان واسعة وفاخرة للعائلات التي تزور مكة والمدينة."
                bgImage={stariaImage}
                badge="الخيار المستقبلي"
                ctaText="احجز عبر واتساب"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            

            {/* Vehicle Highlights */}
            <section className="py-16 bg-white dark:bg-n-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <FleetFeatureImage
                                src="/images/fleet/staria-feature.webp"
                                alt="Hyundai Staria Exterior"
                                fallbackSrc={stariaImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                فان الجيل القادم
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-n-800 dark:text-n-100">
                                جرب الرفاهية: هيونداي ستاريا في مكة
                            </h2>
                            <p className="text-n-600 dark:text-n-300 mb-8 leading-relaxed">
                                استمتع بمناظر بانورامية للأراضي المقدسة مع هيونداي ستاريا. المقاعد المريحة تجعل الرحلة بين جدة ومكة والمدينة مريحة للغاية للحجاج الذين يبحثون عن تجربة سفر متميزة.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Users className="text-blue-500" size={20} /> {formatSeatsAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مساحة واسعة للأرجل في جميع الصفوف</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Briefcase className="text-blue-500" size={20} /> {formatLuggageAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مساحة شحن عمودية واسعة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Wifi className="text-blue-500" size={20} /> شواحن USB
                                    </div>
                                    <p className="text-sm text-n-500">متوفرة في كل مقعد</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Shield className="text-blue-500" size={20} /> أمان ذكي
                                    </div>
                                    <p className="text-sm text-n-500">كشف تصادم متقدم 360 درجة</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/ar/booking" className="inline-flex items-center gap-2 bg-n-900 text-white hover:bg-n-800 dark:bg-white dark:text-n-900 px-8 py-3 rounded-btn font-bold transition-all border border-blue-500/20 shadow-lg shadow-blue-500/10">
                                    احجز هيونداي ستاريا <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Detailed Specifications */}
            <section className="py-12 bg-n-50 dark:bg-n-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10 font-playfair text-n-900 dark:text-white">المواصفات الفنية</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">المحرك والقوة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">محرك V6 سعة 3.5 لتر</p>
                            <p className="text-sm text-n-400">قوة 272 حصان</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">التحكم في المناخ</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">فتحات هواء منتشرة</p>
                            <p className="text-sm text-n-400">تكييف سقف</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">سعة الأمتعة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">مساحة مرنة</p>
                            <p className="text-sm text-n-400">مقاعد خلفية قابلة للطي</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">تقنية الأمان</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">استشعار ذكي</p>
                            <p className="text-sm text-n-400">يتضمن نظام ADAS</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 360 Interior Preview (Placeholder) */}
            <section className="py-16 bg-n-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-4 block">مستقبل السفر</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8">اكتشف المقصورة</h2>

                    <div className="max-w-6xl mx-auto">
                        {/* <Interior360Viewer
                            imageUrl="/images/fleet/camry-interior-360.webp"
                            title="Hyundai Staria Premium Interior"
                        /> */}
                        <div className="w-full h-[400px] flex items-center justify-center bg-n-800 rounded-2xl border border-n-700">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-white mb-2">عرض 360 درجة قريباً</h3>
                                <p className="text-n-400">سنقوم برفع عرض المقصورة الداخلية قريباً.</p>
                            </div>
                        </div>
                    </div>
                    <p className="text-n-400 mt-6 text-sm">العرض التفاعلي 360 درجة غير متوفر على الأجهزة المحمولة في وضع توفير البيانات.</p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-n-50 dark:bg-n-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">لماذا تحب العائلات ستاريا</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "إطلالات بانورامية",
                                desc: "نوافذ كبيرة تتيح لك الاستمتاع بمناظر الجبال والصحراء بين مكة والمدينة.",
                                icon: Star
                            },
                            {
                                title: "دخول وخروج سهل",
                                desc: "أبواب منزلقة إلكترونية مزدوجة وأرضية منخفضة تجعلها مثالية لكبار السن من الحجاج.",
                                icon: Users
                            },
                            {
                                title: "تصميم مستقبلي",
                                desc: "صل إلى فندقك بأناقة مع أكثر السيارات جاذبية على الطرق السريعة السعودية.",
                                icon: Shield
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-md border-t-4 border-blue-500 transition-transform hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-blue-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-n-800 dark:text-white">{item.title}</h3>
                                <p className="text-n-600 dark:text-n-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={stariaFAQs} title="هيونداي ستاريا - الأسئلة الشائعة" />
        </main>
    );
}

