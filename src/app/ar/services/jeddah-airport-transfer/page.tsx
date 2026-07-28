import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import Features from '@/components/home/Features';
import Link from 'next/link';
import { ArrowLeft, Plane, ShieldCheck, UserCheck } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import VehicleCapacityGuide from '@/components/services/VehicleCapacityGuide';
import RouteVisual from '@/components/services/RouteVisual';
import { getSettings } from '@/lib/settings-storage';
import FadeIn from "@/components/common/FadeIn";
import { SITE_URL } from '@/config/site';

export const metadata: Metadata = {
    title: "تاكسي مطار جدة إلى مكة | نقل خاص | الكسوة",
    description: "احجز تاكسي من مطار جدة إلى مكة. توصيل خاص بسيارات جي إم سي يوكون وهيونداي ستاريا مع خدمة الاستقبال والترحيب في المطار. أسعار ثابتة بدون رسوم خفية.",
    keywords: [
        "تاكسي من مطار جدة إلى مكة",
        "سعر تاكسي مطار جدة",
        "سائق خاص مطار جدة",
        "تاكسي الصالة 1 مطار الملك عبدالعزيز",
        "جي إم سي يوكون مطار جدة",
        "تاكسي مطار جدة",
        "توصيل من مطار جدة الى مكة",
        "سعر التوصيل من مطار جدة للكعبة",
        "استقبال مطار جدة",
        "حجز سيارة من مطار جدة"
    ],
    alternates: {
    ...generateMetadataAlternates("/services/jeddah-airport-transfer"),
    canonical: "https://kiswahumrahcab.com/ar/services/jeddah-airport-transfer",
  },
    openGraph: {
        title: "تاكسي مطار جدة إلى مكة | أسعار التوصيل الخاص | الكسوة",
        description: "نقل موثوق من مطار جدة إلى فنادق مكة. سائقنا ينتظرك في صالة الوصول.",
        images: [{ url: '/images/routes/jeddah-airport-route-hero.webp', width: 1200, height: 630, alt: 'نقل كبار الشخصيات من مطار جدة' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "توصيل من مطار جدة إلى مكة",
    "alternateName": "توصيل من مطار جدة الى مكة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "مواصلات الكسوة",
        "image": `${SITE_URL}/logo.png`
    },
    "serviceType": "توصيل المطار",
    "areaServed": {
        "@type": "Airport",
        "name": "مطار الملك عبدالعزيز الدولي بجدة"
    },
    "description": "خدمة توصيل كبار الشخصيات من مطار جدة إلى فنادق مكة. استقبال وترحيب على مدار الساعة.",
    "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "الرئيسية",
                "item": `${SITE_URL}/ar`
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "الخدمات",
                "item": `${SITE_URL}/ar/services`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "من مطار جدة إلى مكة",
                "item": `${SITE_URL}/ar/services/jeddah-airport-transfer`
            }
        ]
    }
};

const jeddahAirportFAQs = [
    {
        question: "أين سيقابلني السائق؟",
        answer: "سينتظرك سائقنا في صالة الوصول بعد الانتهاء من الجمارك واستلام الأمتعة. سيحمل لافتة باسمك أو باسم 'مواصلات الكسوة'. نقوم بتتبع رحلتك لضمان تواجدنا عند هبوطك."
    },
    {
        question: "ماذا لو تأخرت رحلتي؟",
        answer: "لا تقلق. نحن نراقب حالة الرحلات في الوقت الفعلي. إذا تأخرت رحلتك، نقوم بتعديل وقت الاستلام تلقائياً. لا توجد رسوم إضافية على تأخير الرحلات."
    },
    {
        question: "كم تستغرق الرحلة إلى مكة؟",
        answer: "تستغرق الرحلة من مطار الملك عبدالعزيز الدولي إلى مكة عادةً من 60 إلى 75 دقيقة، اعتماداً على حالة المرور في جدة."
    },
    {
        question: "هل يمكنني الدفع نقداً؟",
        answer: "نعم، يمكنك الدفع للسائق نقداً (بالريال السعودي) عند الوصول. ومع ذلك، نوصي بالحجز عبر الإنترنت لضمان توفر سيارتك."
    }
];

export default async function JeddahAirportTransferPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}`;

    const content = {
        title: "توصيل من مطار جدة إلى مكة",
        subtitle: "ابدأ عمرتك براحة بال. سائقون محترفون، خدمة استقبال خاص. توصيل مباشر إلى فندقك في مكة.",
        heroImage: "/images/hero/jeddah-airport-to-makkah.jpg"
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
                subtitle={content.subtitle}
                bgImage={content.heroImage}
                ctaText="احجز توصيل الوصول"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Arrival Guide Section */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-display text-white">
                                إجراءات الوصول: ماذا تتوقع
                            </h2>
                            <p className="text-n-300 text-lg font-light leading-relaxed">
                                نحن نعلم أن الوصول إلى بلد جديد قد يكون مرهقاً. إليك كيف نجعله سهلاً:
                            </p>
                            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 inline-block">
                                <p className="text-white font-medium italic font-sans text-lg">
                                    "نحن ننتظرك، حتى لو تأخرت رحلتك – لأن راحتك تهمنا."
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <UserCheck size={40} className="text-gold" />,
                                    title: "1. الاستقبال والترحيب",
                                    desc: "سينتظر سائقنا في صالة الوصول حاملاً لافتة باسمك. لا داعي للبحث عن تاكسي."
                                },
                                {
                                    icon: <ShieldCheck size={40} className="text-gold" />,
                                    title: "2. المساعدة في الأمتعة",
                                    desc: <span>سياراتنا واسعة ومناسبة للعائلات (<Link href="/ar/fleet/gmc-yukon-xl" className="text-gold hover:underline">جي إم سي</Link>/<Link href="/ar/fleet/hyundai-starex" className="text-gold hover:underline">إتش 1</Link>) لتتسع لجميع حقائبك. سيتولى السائق التعامل مع أمتعتك.</span>
                                },
                                {
                                    icon: <Plane size={40} className="text-gold" />,
                                    title: "3. مباشرة إلى الفندق",
                                    desc: <span>استرخِ في سيارة مكيفة بينما نأخذك مباشرة إلى <Link href="/ar/services/makkah-madinah-taxi" className="text-gold hover:underline">باب فندقك في مكة</Link> (حوالي 60-75 دقيقة).</span>
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-gold/30 transition-all text-center group hover:bg-black/60">
                                    <div className="flex justify-center mb-6 p-4 bg-gold/10 rounded-btn w-fit mx-auto border border-gold/20 group-hover:bg-gold/20 transition-colors">{item.icon}</div>
                                    <h3 className="text-xl font-semibold mb-3 text-white font-display">{item.title}</h3>
                                    <p className="text-n-400 text-sm leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Route Visual Section */}
            <section className="py-12 bg-neutral-900/30 border-y border-white/5 relative z-10 backdrop-blur-sm">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <h2 className="text-2xl font-semibold text-center mb-8 font-display text-white">رحلتك إلى مكة</h2>
                        <RouteVisual
                            from="مطار جدة"
                            fromLabel="صالة الوصول (استقبال وترحيب)"
                            to="فندق مكة"
                            toLabel="التوصيل لاستقبال الفندق"
                            duration="60-75 دقيقة"
                            distance="95 كم"
                            showMiqat={false}
                        />
                    </FadeIn>
                </div>
            </section>

            {/* Terminal Info */}
            <section className="py-16 bg-transparent relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.3}>
                        <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 shadow-2xl">
                            <h3 className="text-2xl font-semibold mb-4 text-white font-display">أي صالة؟</h3>
                            <p className="text-n-300 mb-6 font-light leading-relaxed">
                                تهبط معظم الرحلات الدولية في <strong className="font-bold text-gold">الصالة 1 (المطار الجديد)</strong>.
                                بعض الخطوط الإقليمية تستخدم الصالة الشمالية.
                                لا تقلق، نحن نتتبع رقم رحلتك ونقوم بتعديل موقع الاستلام تلقائياً.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <div className="relative z-10">
                <VehicleCapacityGuide />
            </div>

            <div className="relative z-10">
                <Features />
            </div>

            <div className="relative z-10">
                <FleetCarouselWrapper />
            </div>

            <div className="relative z-10">
                <FAQSection items={jeddahAirportFAQs} title="الأسئلة الشائعة حول التوصيل من مطار جدة" />
            </div>

            {/* CTA */}
            <section className="py-24 bg-transparent border-t border-white/10 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <Link href="/ar/booking" className="inline-flex items-center btn-gold px-12 py-5 rounded-btn font-bold text-lg transition-all shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] hover:shadow-[0_0_30px_hsl(var(--gold-glow) / 0.5)] text-black hover:scale-105">
                            تحقق من أسعار التاكسي <ArrowLeft size={20} className="mr-2" />
                        </Link>
                        <p className="mt-8 text-sm text-n-400 font-light">
                            هل أنت متجه إلى المدينة بعد ذلك؟ تحقق من أسعار <Link href="/ar/services/makkah-madinah-taxi" className="text-gold hover:text-white font-bold underline underline-offset-4 decoration-gold/50">تاكسي مكة إلى المدينة</Link>.
                        </p>
                    </FadeIn>
                </div>
            </section>
        </main >
    );
}

