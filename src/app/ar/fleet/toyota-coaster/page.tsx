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
export async function generateMetadata(): Promise<Metadata> {
    const vehicle = getVehicle('toyota-coaster')!;
    return {
        title: "تأجير باص تويوتا كوستر مكة | نقل جماعي للعمرة | الكسوة",
        description: "احجز باص تويوتا كوستر لمجموعات العمرة. نقل مريح من مطار جدة إلى مكة والمدينة. سعة أمتعة كبيرة.",
        keywords: ["تأجير كوستر مكة","باص للعمرة","نقل مجموعات مكة"],
        alternates: {
            ...generateMetadataAlternates(`/fleet/${vehicle.slug}`),
            canonical: `https://kiswahumrahcab.com/ar/fleet/${vehicle.slug}`,
        },
        openGraph: {
            title: "تأجير باص تويوتا كوستر مكة | نقل جماعي للعمرة | الكسوة",
            description: "احجز باص تويوتا كوستر لمجموعات العمرة. نقل مريح من مطار جدة إلى مكة والمدينة. سعة أمتعة كبيرة.",
            images: [
                {
                    url: vehicle.image.hero,
                    width: 1200,
                    height: 630,
                    alt: vehicle.image.alt,
                },
            ],
            type: 'website',
        },
    };
}

const generateJsonLd = (vehicle: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": vehicle.name,
    "image": `${SITE_URL}/images/fleet/toyota-coaster-2025.webp`,
    "description": `Rent ${vehicle.name} bus in Makkah. Premium ${vehicle.seats}-seater transport for Umrah groups. Spacious, comfortable, and reliable.`,
    "brand": { "@type": "Brand", "name": "Toyota" },
    "offers": {
        "@type": "Offer",
        "price": "700",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": '2026-12-31',
        "url": `${SITE_URL}/fleet/toyota-coaster`
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
        "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5",
            "worstRating": "1"
        },
        "author": {
            "@type": "Person",
            "name": "Ahmed Al-Sayed"
        },
        "datePublished": "2025-01-10",
        "reviewBody": "Excellent bus for our large family group. Very spacious and the AC was perfect for the heat."
    }
});

const coasterFAQs = [
    {
        question: "كم عدد الركاب الذين يمكن أن تتسع لهم كوستر براحة؟",
        answer: "The Toyota Coaster comfortably seats {formatSeatsAr(vehicle)} with ample legroom. It is designed for medium-sized groups."
    },
    {
        question: "هل توجد مساحة كافية للأمتعة لـ 20 شخصاً فأكثر؟",
        answer: "نعم، تحتوي كوستر على منطقة مخصصة للأمتعة ومقصورات علوية. يمكن أن تستوعب بسهولة 15-20 حقيبة قياسية."
    },
    {
        question: "هل كوستر مناسبة للرحلات الطويلة إلى المدينة؟",
        answer: "بالتأكيد. تتميز كوستر بتصميم داخلي عالي السقف، ومقاعد مريحة، وتكييف هواء قوي، مما يجعلها مثالية لخط جدة-مكة-المدينة."
    },
];

export default async function ToyotaCoasterPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Toyota%20Coaster%20for%20Group%20Umrah`;


    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    
    const coasterImage = '/images/fleet/toyota-coaster-2025.webp';

    const vehicle = getVehicle('toyota-coaster')!;
    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="تويوتا كوستر | نقل جماعي متميز"
                subtitle="الخيار الأمثل لمجموعات العمرة المتوسطة الحجم. سفر واسع وموثوق ومريح عبر المملكة العربية السعودية."
                bgImage={coasterImage}
                badge="الأفضل للمجموعات"
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
                                src="/images/fleet/toyota-coaster-2025.webp"
                                alt="Toyota Coaster Bus"
                                fallbackSrc={coasterImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                                المفضل للمجموعات
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-n-800 dark:text-n-100">
                                لماذا تختار تويوتا كوستر؟
                            </h2>
                            <p className="text-n-600 dark:text-n-300 mb-8 leading-relaxed">
                                جرب السفر الجماعي السلس مع تويوتا كوستر. مصممة للراحة والمتانة، وتوفر رحلة سلسة لما يصل إلى 19 راكباً.
                                سواء كنت مسافرًا من <Link href="/ar/services/jeddah-airport-transfer" className="text-gold-dark font-medium hover:underline">مطار جدة</Link> أو تزور مواقع المزارات، تضمن كوستر سفر الجميع معًا براحة.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Users className="text-gold" size={20} /> {formatSeatsAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مثالية لـ 3-5 عائلات</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Briefcase className="text-gold" size={20} /> {formatLuggageAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مساحة تخزين واسعة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Shield className="text-gold" size={20} /> الأمان أولاً
                                    </div>
                                    <p className="text-sm text-n-500">مجهزة بنظام ABS وأحزمة أمان</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Fuel className="text-gold" size={20} /> رحلة سلسة
                                    </div>
                                    <p className="text-sm text-n-500">نظام تعليق مستقر</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/ar/booking" className="inline-flex items-center gap-2 bg-n-900 text-white hover:bg-n-800 dark:bg-white dark:text-n-900 px-8 py-3 rounded-btn font-bold transition-all shadow-lg hover:shadow-gold/20">
                                    احجز تويوتا كوستر <ArrowRight size={20} />
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
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">المحرك</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">ديزل 4.0 لتر</p>
                            <p className="text-sm text-n-400">أداء موثوق</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">التحكم في المناخ</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">تكييف مركزي</p>
                            <p className="text-sm text-n-400">فتحات لكل مقعد</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">المقاعد</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">19 مقعدًا</p>
                            <p className="text-sm text-n-400">مقاعد قماشية بظهر عالي</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">الميزات</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">ميكروفون وصوت</p>
                            <p className="text-sm text-n-400">يشمل مقعد المرشد</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-16 bg-n-50 dark:bg-n-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">مثالية لـ</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "مجموعات العمرة",
                                desc: "حافظ على مجموعتك بأكملها معًا في سيارة واحدة مريحة.",
                                icon: Users
                            },
                            {
                                title: "سفر الشركات",
                                desc: "نقل احترافي لوفود الأعمال ونقل الموظفين.",
                                icon: Briefcase
                            },
                            {
                                title: "جولات سياحية",
                                desc: "نوافذ عالية ونظام ميكروفون يجعلها مثالية للجولات المصحوبة بمرشدين.",
                                icon: MapPin
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

            <FAQSection items={coasterFAQs} title="تأجير تويوتا كوستر - الأسئلة الشائعة" />
        </main>
    );
}

