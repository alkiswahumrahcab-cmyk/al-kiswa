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
                    "name": "Toyota Camry",
                    "item": `${SITE_URL}/fleet/toyota-camry`
                }
            ]
        },
        {
            "@type": "Product",
            "name": vehicle.name,
            "image": `${SITE_URL}/images/fleet/camry-2025.webp`,
            "description": `تاكسي ${vehicle.name} بأسعار معقولة للعمرة. سيارة سيدان مريحة تتسع لـ ${vehicle.seats} ركاب للتنقل من جدة إلى مكة.`,
            "brand": { "@type": "Brand", "name": "Toyota" },
            "offers": {
                "@type": "Offer",
                "price": "200",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": '2026-12-31',
                "url": `${SITE_URL}/fleet/toyota-camry`
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "124",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Aisha Al-Farsi" },
                "datePublished": "2025-01-20",
                "reviewBody": "Clean, punctual, and affordable. The Camry was the perfect choice for our couple's Umrah trip from Jeddah Airport.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    const vehicle = getVehicle('toyota-camry')!;

    return {
        title: `${vehicle.name} تاكسي مكة | سيارة سيدان للعمرة`,
        description: `تاكسي ${vehicle.name} بأسعار معقولة للعمرة. سيارة سيدان موثوقة تتسع لـ ${vehicle.seats} ركاب.`,
        keywords: [
            "تاكسي كامري مكة",
            "خدمة تاكسي مكة",
            "سيارة من جدة الى مكة",
            "تاكسي عمرة رخيص",
            "توصيل المطار جدة",
            "تاكسي مكة كامري"
        ],
        alternates: {
    ...generateMetadataAlternates("/fleet/toyota-camry"),
    canonical: "https://kiswahumrahcab.com/ar/fleet/toyota-camry",
  },
    };
}

const camryFAQs = [
    {
        question: "كم عدد الركاب الذين تتسع لهم تويوتا كامري؟",
        answer: "تتسع كامري براحة تامة حتى 4 ركاب، مما يجعلها مثالية للمسافرين الأفراد، والأزواج، والعائلات الصغيرة."
    },
    {
        question: "هل يوجد مساحة كافية للأمتعة في كامري؟",
        answer: "نعم، تحتوي الكامري على صندوق واسع يستوعب حقيبتين كبيرتين أو 3-4 حقائب متوسطة. إذا كان لديك المزيد من الأمتعة، نوصي بخيارات SUV أو الفان."
    },
    {
        question: "هل توفرون مقاعد أطفال في الكامري؟",
        answer: "نعم، يمكننا توفير مقاعد للأطفال عند الطلب مقابل رسوم إضافية رمزية. يرجى ذكر ذلك في ملاحظات الحجز."
    },
];

export default async function ToyotaCamryPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Toyota%20Camry%20for%20Umrah`;

    const vehicle = getVehicle('toyota-camry')!;

    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    
    const camryImage = '/images/fleet/camry-2025.webp';

    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="Toyota Camry 2024 | Reliable Umrah Taxi Makkah"
                subtitle="The gold standard for private transfers. Affordable, comfortable, and efficient travel between Jeddah, Makkah, and Madinah."
                bgImage={camryImage}
                badge="الأكثر شعبية"
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
                                src="/images/fleet/camry-feature.webp"
                                alt="Toyota Camry Interior"
                                fallbackSrc={camryImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                                موديل حديث
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-n-800 dark:text-n-100">
                                تويوتا كامري موثوقة لرحلات العمرة
                            </h2>
                            <p className="text-n-600 dark:text-n-300 mb-8 leading-relaxed">
                                يوفر أسطول سيارات تويوتا كامري لدينا أسهل وأكثر الرحلات سلاسة لرحلة العمرة الخاصة بك. مثالية للعائلات الصغيرة أو الأزواج الذين يسافرون من مطار جدة إلى مكة، مما يضمن رحلة هادئة وفعالة إلى المدن المقدسة.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Users className="text-amber-500" size={20} /> {formatSeatsAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مثالية للأزواج والعائلات الصغيرة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Briefcase className="text-amber-500" size={20} /> {formatLuggageAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مساحة واسعة للأمتعة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Wifi className="text-amber-500" size={20} /> تقنيات حديثة
                                    </div>
                                    <p className="text-sm text-n-500">بلوتوث ومنافذ شحن</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Fuel className="text-amber-500" size={20} /> اقتصادية في استهلاك الوقود
                                    </div>
                                    <p className="text-sm text-n-500">صديقة للبيئة وقوية</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/ar/booking" className="inline-flex items-center gap-2 bg-n-900 text-white hover:bg-n-800 dark:bg-white dark:text-n-900 px-8 py-3 rounded-btn font-bold transition-all shadow-lg hover:shadow-amber-500/20">
                                    احجز تويوتا كامري <ArrowRight size={20} />
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
                            <p className="font-bold text-xl text-n-900 dark:text-white">سعة 2.5 لتر</p>
                            <p className="text-sm text-n-400">قوة 208 حصان</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">التحكم في المناخ</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">تكييف ثنائي المناطق</p>
                            <p className="text-sm text-n-400">فتحات تهوية خلفية</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">سعة الأمتعة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">{formatLuggageAr(vehicle)}</p>
                            <p className="text-sm text-n-400">مساحة كافية لحقائبك</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">هدوء المقصورة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">عزل صوتي</p>
                            <p className="text-sm text-n-400">زجاج مخفف للضوضاء</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 360 Interior Preview (Placeholder) */}
            <section className="py-16 bg-n-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4 block">درجة اقتصادية ممتازة</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8">اكتشف المقصورة</h2>

                    <div className="max-w-6xl mx-auto">
                        <Interior360Viewer
                            imageUrl="/images/fleet/camry-interior-360.webp"
                            title="مقصورة تويوتا كامري"
                        />
                    </div>
                    <p className="text-n-400 mt-6 text-sm">العرض التفاعلي 360 درجة غير متوفر على الأجهزة المحمولة في وضع توفير البيانات.</p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-n-50 dark:bg-n-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">مثالية لكل رحلة</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "نقل المطار",
                                desc: "سفر سريع ومريح من مطار جدة إلى فندقك في مكة أو المدينة.",
                                icon: Star
                            },
                            {
                                title: "السفر بين المدن",
                                desc: "تنقلات مريحة لمدة 4 ساعات بين مكة والمدينة مع سائقينا ذوي الخبرة.",
                                icon: Shield
                            },
                            {
                                title: "مزارات مكة",
                                desc: "زيارة الأماكن المقدسة في مكة (جبل النور، عرفات، وغيرها) براحتك.",
                                icon: Star
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-md border-t-4 border-amber-500 transition-all hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-amber-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-n-800 dark:text-white">{item.title}</h3>
                                <p className="text-n-600 dark:text-n-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={camryFAQs} title="تويوتا كامري للعمرة - الأسئلة الشائعة" />
        </main>
    );
}
