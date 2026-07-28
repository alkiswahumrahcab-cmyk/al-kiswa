import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Link from 'next/link';
import { ArrowRight, Shield, Star, Briefcase, Users, Wifi, LayoutGrid } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FleetFeatureImage from '@/components/fleet/FleetFeatureImage';
import Interior360Viewer from '@/components/fleet/Interior360ViewerClient';

import { getVehicle, formatSeatsAr, formatLuggageAr } from '@/data/fleet';
import { SITE_URL } from '@/config/site';

const generateJsonLd = (vehicle: any) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": vehicle.name,
    "image": `${SITE_URL}/images/fleet/hyundai-h1.webp`,
    "description": `استأجر سيارة ${vehicle.name} الفاخرة في مكة والمدينة. سيارة تتسع لـ ${vehicle.seats} ركاب لتنقلات العمرة.`,
    "brand": { "@type": "Brand", "name": "Hyundai" },
    "offers": { 
        "@type": "Offer", 
        "price": "250", 
        "priceCurrency": "SAR", 
        "availability": "https://schema.org/InStock",
        "priceValidUntil": '2026-12-31'
    }
});

export async function generateMetadata(): Promise<Metadata> {
    const vehicle = getVehicle('hyundai-starex')!;
    return {
        title: `${vehicle.name} تاجير مكة | تاكسي عائلي للعمرة`,
        description: `استأجر ${vehicle.name} في مكة والمدينة. سيارة فان عائلية مريحة.`,
        keywords: [
            "Hyundai Starex Rental Makkah",
            "H1 Van Rental Saudi Arabia",
            "7 Seater Taxi Makkah",
            "Jeddah Airport Family Taxi",
            "??? ??? ??????? ???"
        ],
        alternates: {
    ...generateMetadataAlternates("/fleet/hyundai-starex"),
    canonical: "https://kiswahumrahcab.com/ar/fleet/hyundai-starex",
  },
    };
}

const starexFAQs = [
    {
        question: "كم عدد الركاب الذين تتسع لهم هيونداي H1 ستاريكس؟",
        answer: "سيارة هيونداي H1 ستاريكس واسعة وتتسع لما يصل إلى 7 ركاب براحة، مما يجعلها خياراً ممتازاً للعائلات أو المجموعات المتوسطة."
    },
    {
        question: "هل هناك مساحة كافية للأمتعة؟",
        answer: "نعم، تحتوي H1 على منطقة شحن كبيرة يمكن أن تستوعب بسهولة 5-6 حقائب قياسية إلى جانب الركاب."
    },
    {
        question: "هل هذه السيارة مناسبة للسفر لمسافات طويلة في المملكة؟",
        answer: "بالتأكيد. تم تصميم H1 للرحلات الطويلة، وتوفر مساحة جيدة للأرجل، وتكييف هواء مزدوج، وركوب مستقر على الطرق السريعة بين جدة ومكة والمدينة."
    },
];

export default async function HyundaiStarexPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=I%20am%20interested%20in%20booking%20Hyundai%20H1%20Starex%20for%20Umrah`;


    // Try to get dynamic ID, fallback to old hardcoded Mongoose ID if not found
    
    const starexImage = '/images/fleet/hyundai-h1.webp';

    const vehicle = getVehicle('hyundai-starex')!;
    const jsonLd = generateJsonLd(vehicle);

    return (
        <main className="overflow-x-hidden">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <Hero
                title="هيونداي ستاريكس | أفضل سيارة فان عائلية للعمرة"
                subtitle="الخيار العملي للسفر العائلي بين جدة ومكة والمدينة. موثوقة، واسعة، ومثالية للمجموعات."
                bgImage={starexImage}
                badge="المفضلة للعائلات"
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
                                src="/images/fleet/starex-feature.webp"
                                alt="Hyundai H1 Starex Interior"
                                fallbackSrc={starexImage}
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-gold text-black px-4 py-1 rounded-full text-sm font-bold">
                                القيمة الأفضل
                            </div>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-playfair text-n-800 dark:text-n-100">
                                لماذا تحجز هيونداي ستاريكس للسفر إلى مكة؟
                            </h2>
                            <p className="text-n-600 dark:text-n-300 mb-8 leading-relaxed">
                                هيونداي H1 (ستاريكس) هي الخيار الأفضل للعائلات التي تؤدي العمرة. توفر قيمة ممتازة لرحلات من مطار جدة إلى مكة وتوفر قيادة مريحة لجولات المزارات في المدن المقدسة.
                            </p>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Users className="text-teal-500" size={20} /> {formatSeatsAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">مساحة كافية لعائلات كاملة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Briefcase className="text-teal-500" size={20} /> {formatLuggageAr(vehicle)}
                                    </div>
                                    <p className="text-sm text-n-500">سعة تخزين خلفية كبيرة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <LayoutGrid className="text-teal-500" size={20} /> سقف مرتفع
                                    </div>
                                    <p className="text-sm text-n-500">حركة سهلة داخل المقصورة</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2 font-bold text-n-800 dark:text-white">
                                        <Wifi className="text-teal-500" size={20} /> تكييف مزدوج
                                    </div>
                                    <p className="text-sm text-n-500">فتحات مخصصة للمقاعد الخلفية</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link href="/ar/booking" className="inline-flex items-center gap-2 bg-n-900 text-white hover:bg-n-800 dark:bg-white dark:text-n-900 px-8 py-3 rounded-btn font-bold transition-all shadow-lg hover:shadow-teal-500/20">
                                    احجز هيونداي H1 الآن <ArrowRight size={20} />
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
                            <p className="font-bold text-xl text-n-900 dark:text-white">محرك 2.4 لتر</p>
                            <p className="text-sm text-n-400">أداء موثوق</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">التحكم في المناخ</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">تكييف مزدوج System</p>
                            <p className="text-sm text-n-400">تحكم أمامي وخلفي</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">تصميم المساحة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">مقاعد دوارة</p>
                            <p className="text-sm text-n-400">تكوين مرن</p>
                        </div>
                        <div className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-sm border border-n-100 dark:border-n-800">
                            <h3 className="font-bold text-n-500 uppercase text-xs tracking-wider mb-2">الراحة</h3>
                            <p className="font-bold text-xl text-n-900 dark:text-white">أبواب منزلقة مزدوجة</p>
                            <p className="text-sm text-n-400">دخول سهل</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 360 Interior Preview (Placeholder) */}
            <section className="py-16 bg-n-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <span className="text-teal-500 font-bold tracking-widest uppercase text-sm mb-4 block">راحة تناسب ميزانيتك</span>
                    <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-8">اكتشف المقصورة</h2>

                    <div className="max-w-6xl mx-auto">
                        {/* <Interior360Viewer
                            imageUrl="/images/fleet/camry-interior-360.webp"
                            title="Hyundai H1 Starex Interior"
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
                    <h2 className="text-3xl font-bold text-center mb-12 font-playfair">موثوقية في كل رحلة</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "نقل المطار",
                                desc: "الحجم المثالي للعائلة وجميع أمتعتهم القادمة إلى جدة أو المدينة.",
                                icon: Briefcase
                            },
                            {
                                title: "مزارات يوم كامل",
                                desc: "خاصة، مكيفة، ومرنة لزيارة الأماكن المقدسة بالوتيرة التي تناسبك.",
                                icon: Star
                            },
                            {
                                title: "طريق المدن السريع",
                                desc: "مستقرة ومريحة للطريق السريع الطويل بين مكة والمدينة.",
                                icon: Shield
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white dark:bg-n-900 p-6 rounded-xl shadow-md border-t-4 border-teal-500 transition-all hover:-translate-y-1">
                                <item.icon className="w-10 h-10 text-teal-500 mb-4" />
                                <h3 className="text-xl font-bold mb-2 text-n-800 dark:text-white">{item.title}</h3>
                                <p className="text-n-600 dark:text-n-400">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <FAQSection items={starexFAQs} title="هيونداي ستاريكس - الأسئلة الشائعة" />
        </main>
    );
}

