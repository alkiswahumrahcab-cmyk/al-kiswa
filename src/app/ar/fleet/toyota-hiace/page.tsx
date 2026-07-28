import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Fuel, MapPin, Wifi } from 'lucide-react';
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
                    "name": "Toyota Hiace",
                    "item": `${SITE_URL}/fleet/toyota-hiace`
                }
            ]
        },
        {
            "@type": "Product",
            "name": vehicle.name,
            "image": `${SITE_URL}/images/fleet/toyota-hiace-2025.webp`,
            "description": `Rent ${vehicle.name} bus in Makkah. Reliable ${vehicle.seats}-seater transport for Umrah groups and large families.`,
            "brand": { "@type": "Brand", "name": "Toyota" },
            "offers": {
                "@type": "Offer",
                "price": "350",
                "priceCurrency": "SAR",
                "availability": "https://schema.org/InStock",
                "priceValidUntil": '2026-12-31',
                "url": `${SITE_URL}/fleet/toyota-hiace`
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.7",
                "reviewCount": "210",
                "bestRating": "5",
                "worstRating": "1"
            },
            "review": {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Ibrahim Siddiqui" },
                "datePublished": "2025-03-05",
                "reviewBody": "Affordable and reliable for our large family. The Hiace fit all 10 of us comfortably with all our luggage.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        }
    ]
});

export async function generateMetadata(): Promise<Metadata> {
    const vehicle = getVehicle('toyota-hiace')!;
    return {
        title: `${vehicle.name} تاجير مكة | نقل جماعي رخيص`,
        description: `احجز باص ${vehicle.name} يتسع لـ ${vehicle.seats} ركاب لمجموعات العمرة. وسيلة نقل بأسعار معقولة.`,
        keywords: [
            "Toyota Hiace Rental Makkah",
            "10 Seater Bus Makkah",
            "Cheap Umrah Transport",
            "Group Taxi Jeddah to Makkah",
            "Toyota Hiace Bus Price",
            "??? ??? ????",
            "??? ????? ???",
            "??? 10 ???? ???"
        ],
        alternates: {
    ...generateMetadataAlternates("/fleet/toyota-hiace"),
    canonical: "https://kiswahumrahcab.com/ar/fleet/toyota-hiace",
  },
    };
}

const hiaceFAQs = [
    {
        question: "كم عدد الحقائب التي تتسع لها تويوتا هايس؟",
        answer: "إذا كانت مشغولة بـ 10 ركاب، يمكن أن تتسع هايس لحوالي 10-12 حقيبة متوسطة. للحصول على السعة الكاملة، مساحة الأمتعة محدودة، لذا نوصي بمركبة مخصصة للأمتعة أو الترقية إلى كوستر."
    },
    {
        question: "هل هايس مناسبة للحجاج كبار السن؟",
        answer: "تعتبر هايس موثوقة، ولكن للحجاج كبار السن الذين يحتاجون إلى أقصى درجات الراحة، نوصي باستخدام هيونداي ستاريا أو جي إم سي يوكن بسبب نظام التعليق الأكثر نعومة. ومع ذلك، فإن طرازات هايس لدينا حديثة وتتم صيانتها جيدًا."
    },
    {
        question: "هل تقدمون حافلة تويوتا كوستر الأكبر؟",
        answer: "نعم، للمجموعات من 18 إلى 30 شخصًا، نقدم تويوتا كوستر. توفر مساحة أكبر للأمتعة ورحلة أكثر سلاسة من هايس. اتصل بنا لمعرفة أسعار الكوستر."
    },
];

export default async function ToyotaHiacePage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Toyota%20Hiace%20for%20Group%20Umrah`;


    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    
    const hiaceImage = '/images/fleet/toyota-hiace-2025.webp';

    const vehicle = getVehicle('toyota-hiace')!;
    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="تويوتا هايس | نقل مجموعات العمرة"
                subtitle="الخيار الموثوق للعائلات الكبيرة والمجموعات التي تسافر بين جدة ومكة والمدينة. موثوقة وواسعة."
                bgImage={hiaceImage}
                badge="خيار المجموعات"
                ctaText="احجز عبر واتساب"
                ctaLink={whatsappLink}
                layout="center"
            />

            

            {/* Vehicle Highlights */}
            <section className="py-16 bg-white dark:bg-n-900">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                            <FleetFeatureImage
                                src="/images/fleet/hiace-feature.webp"
                                alt="Toyota Hiace Bus"
                                fallbackSrc={hiaceImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                                الرائدة في السعة
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-n-800 dark:text-n-100">
                                لماذا تختار تويوتا هايس لمجموعة العمرة؟
                            </h2>
                            <p className="text-n-600 dark:text-n-300 mb-8 leading-relaxed">
                                حافظ على مجموعتك معًا. تويوتا هايس مثالية للعائلات التي تسافر من <Link href="/ar/services/jeddah-airport-transfer" className="text-gold-dark font-medium hover:underline">مطار جدة إلى مكة</Link>. تشتهر بموثوقيتها وتكييفها القوي، وتضمن رحلة مريحة عبر المملكة العربية السعودية لما يصل إلى 12 راكبًا.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Users className="text-gold" size={20} /> {formatSeatsAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مثالية لـ 2-3 عائلات</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Briefcase className="text-gold" size={20} /> {formatLuggageAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">منطقة مخصصة للأمتعة الخلفية</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Shield className="text-gold" size={20} /> موثوقية قصوى
                                    </div>
                                    <p className="text-sm text-n-500">محرك تويوتا المتين الأسطوري</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Fuel className="text-gold" size={20} /> كفاءة في استهلاك الوقود
                                    </div>
                                    <p className="text-sm text-n-500">كفاءة عالية لمسافات طويلة</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/ar/booking" className="inline-flex items-center gap-2 bg-n-900 text-white hover:bg-n-800 dark:bg-white dark:text-n-900 px-8 py-3 rounded-btn font-bold transition-all shadow-lg hover:shadow-gold/20">
                                    احجز تويوتا هايس <ArrowRight size={20} />
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
                            <p className="font-bold text-xl text-n-900 dark:text-white">ديزل تيربو 2.8 لتر</p>
                            <p className="text-sm text-n-400">محرك عالي العزم</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">نظام التبريد</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">تكييف للخدمة الشاقة</p>
                            <p className="text-sm text-n-400">فتحات سقف فردية</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">السعة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">10-13 مقعدًا</p>
                            <p className="text-sm text-n-400">تصميم قابل للتكوين</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">الأمان</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">فرامل ABS ووسائد هوائية</p>
                            <p className="text-sm text-n-400">Standard الأمان Pack</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 360 Interior Preview (Placeholder) */}
            <section className="py-16 bg-n-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-gold font-bold tracking-widest uppercase text-sm mb-4 block">سفر جماعي واسع</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8">اكتشف المقصورة</h2>

                    <div className="max-w-6xl mx-auto">
                        <Interior360Viewer
                            imageUrl="/images/fleet/hiace-interior-360.webp"
                            title="مقصورة تويوتا هايس"
                        />
                    </div>
                    <p className="text-n-400 mt-6 text-sm">العرض التفاعلي 360 درجة غير متوفر على الأجهزة المحمولة في وضع توفير البيانات.</p>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-n-50 dark:bg-n-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">أثبتت كفاءتها للمجموعات الكبيرة</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "عائلات ممتدة",
                                desc: "لا حاجة للتنسيق بين سيارات متعددة. حافظ على الأجداد والأطفال معًا.",
                                icon: Users
                            },
                            {
                                title: "مناسبة للميزانية",
                                desc: "وفورات كبيرة في التكلفة لكل شخص مقارنة بحجز عدة سيارات صغيرة.",
                                icon: Briefcase
                            },
                            {
                                title: "الموثوقية",
                                desc: "السيارة التي لا تتوقف أبدًا. مثالية للجداول الزمنية الضيقة والمسافات الطويلة.",
                                icon: Shield
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-md border-t-4 border-gold transition-all hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-gold mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-n-800 dark:text-white">{item.title}</h3>
                                <p className="text-n-600 dark:text-n-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={hiaceFAQs} title="تأجير تويوتا هايس - الأسئلة الشائعة" />
        </main>
    );
}


