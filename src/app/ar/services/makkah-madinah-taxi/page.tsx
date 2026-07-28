import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, MapPin, Clock } from 'lucide-react';
import RouteVisual from '@/components/services/RouteVisual';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";
import GlassCard from '@/components/ui/GlassCard';
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
    title: "تاكسي مكة إلى المدينة 2025 | سيارة خاصة | الكسوة",
    description: "احجز تاكسي خاص من مكة إلى المدينة. رحلة مريحة في سيارات فاخرة مثل جمس يوكون أو هيونداي ستاريا. خدمة من الباب للباب مع إمكانية التوقف في الميقات (للإحرام).",
    keywords: [
        "تاكسي مكة إلى المدينة",
        "سعر تاكسي مكة المدينة",
        "سيارة خاصة مكة المدينة",
        "مسافة ووقت التاكسي من مكة للمدينة",
        "نقل VIP مكة المدينة",
        "تاكسي مكة المدينة",
        "سعر التوصيل من مكة للمدينة",
        "حجز جمس من مكة الى المدينة",
        "نقل معتمرين بين المدن",
        "مشوار مكة المدينة"
    ],
    alternates: {
    ...generateMetadataAlternates("/services/makkah-madinah-taxi"),
    canonical: "https://kiswahumrahcab.com/ar/services/makkah-madinah-taxi",
  },
    openGraph: {
        title: "تاكسي مكة المدينة 2025 | نقل VIP خاص | الكسوة",
        description: "احجز خدمة التاكسي الأكثر راحة من مكة إلى المدينة. سيارات جمس يوكون خاصة، هيونداي ستاريا، وحافلات VIP.",
        images: [{ url: '/images/routes/makkah-madinah-route-hero.webp', width: 1200, height: 630, alt: 'منظر طريق مكة المدينة السريع' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "خدمة تاكسي مكة إلى المدينة",
    "alternateName": "تاكسي مكة المدينة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport",
        "image": `${SITE_URL}/logo.png`
    },
    "serviceType": "Intercity Transfer",
    "areaServed": {
        "@type": "Country",
        "name": "Saudi Arabia"
    },
    "description": "نقل خاص ممتاز بين مكة والمدينة في سيارات جمس يوكون أو ستاريا.",
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "الرئيسية",
                "item": `${SITE_URL}`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "الخدمات",
                "item": `${SITE_URL}/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "تاكسي مكة إلى المدينة",
                "item": `${SITE_URL}/services/makkah-madinah-taxi`
            }
        ]
    }
};

const makkahMadinahFAQs = [
    {
        question: "كم تستغرق الرحلة من مكة إلى المدينة؟",
        answer: <span>المسافة تقريباً 450 كم. بسيارة الأجرة الخاصة (<Link href="/ar/fleet/gmc-yukon-xl" className="text-gold hover:text-white hover:underline">جمس</Link>/<Link href="/ar/fleet/hyundai-staria" className="text-gold hover:text-white hover:underline">ستاريا</Link>)، تستغرق الرحلة عادةً من 4.5 إلى 5 ساعات. يمكننا التوقف في الميقات (أبيار علي) لمدة 15-30 دقيقة إذا كنت ترغب في الإحرام.</span>
    },
    {
        question: "ما هو سعر التاكسي من مكة إلى المدينة؟",
        answer: "أسعارنا ثابتة وتنافسية، تختلف حسب نوع السيارة والموسم. الأسعار شفافة ولا توجد رسوم خفية. قد تختلف الأسعار قليلاً خلال مواسم الذروة مثل رمضان أو الحج."
    },
    {
        question: "هل تقدمون خدمة النقل من مطار جدة إلى مكة؟",
        answer: <span>نعم، نحن متخصصون في <Link href="/ar/services/jeddah-airport-transfer" className="text-gold hover:text-white hover:underline">خدمات النقل من مطار جدة</Link>. سيستقبلك سائقنا في صالة الوصول ويأخذك مباشرة إلى فندقك أو إلى الحرم.</span>
    },
    {
        question: "هل هو أفضل من قطار الحرمين؟",
        answer: "بينما القطار سريع، فإن التاكسي الخاص يوفر راحة النقل من الباب للباب. لن تحتاج إلى ترتيب وسيلة نقل للوصول إلى محطة القطار، أو التعامل مع نقل الأمتعة، أو الالتزام بجدول زمني صارم. نحن نقلك من بهو فندقك ونوصلك إلى فندقك التالي مباشرة."
    },
    {
        question: "هل يمكننا التوقف للمزارات في الطريق؟",
        answer: "نعم! على عكس الحافلات أو القطارات، يوفر التاكسي الخاص مرونة كبيرة. يمكننا التوقف في المواقع التاريخية مثل بدر أو المزارات الرئيسية داخل المدينة عند الوصول (قد يتم تطبيق رسوم إضافية حسب الوقت المستغرق)."
    }
];

export default async function MakkahMadinahTaxiPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const content = {
        title: "خدمات تاكسي VIP من مكة إلى المدينة",
        subtitle: "استمتع برحلة روحانية براحة تامة. وقت السفر من 4 إلى 5 ساعات في سيارات فاخرة مثل جمس يوكون أو هيونداي ستاريا.",
        heroImage: "/images/routes/makkah-to-madinah-transfer.jpg"
    };

    return (
        <main className="min-h-screen bg-charcoal relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title={content.title}
                subtitle={<span className="sr-only md:not-sr-only md:block">{content.subtitle}</span>}
                bgImage={content.heroImage}
                ctaText="احجز الآن عبر واتساب"
                ctaLink={whatsappLink}
                layout="left"
                removeBlur={true}
            />

            {/* Trust/Benefits Section */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-semibold mb-8 font-display text-white">
                                    لماذا تختار خدمة النقل <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">مكة-المدينة</span> الخاصة بنا؟
                                </h2>
                                <p className="text-n-400 mb-8 leading-relaxed font-light text-lg">
                                    الرحلة بين المدينتين المقدستين (حوالي 450 كم) تتطلب سيارة تضمن لك الراحة والأمان.
                                    تجنب الحافلات المزدحمة والجداول الزمنية الصارمة للقطارات. تقدم خدمة التاكسي الخاص لدينا رحلات مميزة في سيارات <Link href="/ar/fleet/gmc-yukon-xl" className="text-gold font-bold hover:underline">جمس يوكون</Link> أو <Link href="/ar/fleet/hyundai-staria" className="text-gold font-bold hover:underline">هيونداي ستاريا</Link>:
                                </p>

                                <GlassCard className="mb-8 p-8 bg-neutral-900/50 rounded-2xl border border-white/5 border-r-4 border-r-[#D4AF37]">
                                    <p className="text-white italic font-medium text-center font-serif text-lg">
                                        "مرحباً بكم في مدينة رسول الله ﷺ — نسأل الله أن يبارك رحلتكم."
                                    </p>
                                </GlassCard>

                                <ul className="space-y-6">
                                    {[
                                        "خدمة من الباب للباب (من الفندق إلى الفندق)",
                                        "بدون قيود على الأمتعة (حسب سعة السيارة)",
                                        "التوقف في الميقات (أبيار علي) للإحرام",
                                        "أوقات مغادرة مرنة (على مدار 24 ساعة)",
                                        "سيارات موديل حديث (2024-2025)"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-4 group">
                                            <div className="bg-gold/10 rounded-btn p-1.5 border border-gold/20 group-hover:bg-gold transition-colors">
                                                <CheckCircle2 className="text-gold group-hover:text-black flex-shrink-0 transition-colors" size={18} />
                                            </div>
                                            <span className="text-n-300 font-light text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <GlassCard className="p-10 rounded-[2.5rem] bg-neutral-900/40 border border-gold/20 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-gold/40 transition-all duration-300">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-[50px] pointer-events-none" />

                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-white font-display">
                                    <Clock className="text-gold" size={24} /> متوسط وقت الرحلة
                                </h3>
                                <p className="mb-8 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold font-display">4 ساعات و 30 دقيقة</p>

                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-3 text-white font-display">
                                    <MapPin className="text-gold" size={24} /> أبرز معالم المسار
                                </h3>
                                <div className="space-y-4 text-base text-n-400 font-light">
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> الانطلاق من فندقك في مكة</p>
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> إمكانية التوقف لـ <Link href="/ar/services/ziyarat-tours" className="text-gold hover:underline underline-offset-4 decoration-dotted">المزارات</Link> (عند الطلب)</p>
                                    <p className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-gold"></span> الوصول إلى فندقك في المدينة أو المسجد النبوي</p>
                                </div>

                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-n-500 uppercase tracking-widest font-bold">الأسعار</span>
                                        <span className="text-lg font-bold text-white">أسعار تنافسية وثابتة</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </div>
                    </FadeIn>

                    {/* Route Visualization - NEW */}
                    <div className="mt-24 relative z-10">
                        <FadeIn delay={0.2}>
                            <h2 className="text-3xl font-semibold text-center mb-12 font-display text-white">خريطة الرحلة</h2>
                            <RouteVisual />
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Fleet Section Reuse */}
            <div className="relative z-10">
                <FleetCarouselWrapper />
            </div>

            <div className="relative z-10">
                <Features />
            </div>

            {/* FAQ Section - NEW */}
            <div className="relative z-10">
                <FAQSection items={makkahMadinahFAQs} title="الأسئلة الشائعة" />
            </div>

            <section className="py-24 bg-transparent border-t border-white/5 relative z-10 bg-gradient-to-b from-transparent to-black/80">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display text-white">مقارنة: التاكسي مقابل قطار الحرمين</h2>
                        <p className="text-n-400 mb-10 leading-relaxed font-light text-lg">
                            على الرغم من سرعة القطار، إلا أن التاكسي الخاص يوفر راحة لا مثيل لها للعائلات.
                            لا حاجة للذهاب إلى المحطة، أو حمل الأمتعة عدة مرات، أو القلق بشأن توفر التذاكر.
                            خدمتنا تأخذك مباشرة من بهو الفندق الخاص بك إلى وجهتك.
                        </p>
                        <Link href="/ar/booking" className="inline-flex items-center bg-gradient-to-r from-gold to-gold-dark px-12 py-5 rounded-btn font-bold transition-all shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] hover:shadow-[0_0_40px_hsl(var(--gold-glow) / 0.5)] uppercase tracking-[0.1em] text-sm text-black hover:scale-105 hover:bg-white hover:text-black border border-transparent hover:border-black/10">
                            تحقق من الأسعار واحجز الآن <ArrowRight size={20} className="mr-2 rotate-180" />
                        </Link>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
