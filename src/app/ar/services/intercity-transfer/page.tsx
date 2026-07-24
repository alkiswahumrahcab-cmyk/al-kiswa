import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FadeIn from '@/components/common/FadeIn';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import InteractiveMapSection from '@/components/services/intercity/InteractiveMapSection';
import AnimatedMapBackground from '@/components/ui/AnimatedMapBackground';
import { routeService } from '@/services/routeService';
import { ShieldCheck, Star, UserCheck, Timer, ChevronDown } from 'lucide-react';
import { RouteWithPrices } from '@/services/routeService';
import GlassCard from '@/components/ui/GlassCard';

export const metadata = {
    title: "نقل بين المدن مكة المدينة جدة | الكسوة",
    description: "انتقالات مريحة بين مكة والمدينة. خدمات تاكسي موثوقة للتنقل بين جدة، مكة، والمدينة. استمتع بتجربة سفر سلسة وروحانية.",
    keywords: ["تاكسي من مكة للمدينة", "مواصلات من المدينة لمكة", "مواصلات الحرمين", "تاكسي VIP بين المدن", "تاكسي جدة للمدينة", "نقل بين مدن السعودية"],
    alternates: {
    ...generateMetadataAlternates("/services/intercity-transfer"),
    canonical: "https://kiswahumrahcab.com/ar/services/intercity-transfer",
  },
    openGraph: {
        title: "تاكسي مكة المدينة والتنقل بين المدن | اسطول VIP | الكسوة",
        description: "سافر براحة تامة بين جدة، مكة، والمدينة. خدمة سيارات أجرة خاصة متميزة مع سائقين ذوي خبرة.",
        images: [{ url: '/images/routes/routes-network-hero.webp', width: 1200, height: 630, alt: 'شبكة النقل بين المدن في المملكة العربية السعودية' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "خدمة النقل بين المدن",
    "provider": {
        "@type": "LocalBusiness",
        "name": "الكسوة للنقل"
    },
    "serviceType": "نقل بري",
    "areaServed": {
        "@type": "Country",
        "name": "المملكة العربية السعودية"
    },
    "description": "انتقالات فاخرة بين المدن مكة، المدينة، وجدة."
};

// Fallback data
const MOCK_ROUTES = [
    {
        id: 'mock-1',
        origin: 'فندق في مكة',
        destination: 'فندق في المدينة',
        distance: '450 km',
        duration: '4 hrs 30 min',
        category: 'Intercity',
        isActive: true,
        prices: []
    },
    {
        id: 'mock-2',
        origin: 'مطار جدة',
        destination: 'فندق في المدينة',
        distance: '400 km',
        duration: '4 hrs',
        category: 'Intercity',
        isActive: true,
        prices: []
    },
    {
        id: 'mock-3',
        origin: 'مطار المدينة',
        destination: 'فندق في مكة',
        distance: '460 km',
        duration: '4 hrs 45 min',
        category: 'Intercity',
        isActive: true,
        prices: []
    },
    {
        id: 'mock-4',
        origin: 'مدينة جدة',
        destination: 'فندق في مكة',
        distance: '85 km',
        duration: '1 hr 15 min',
        category: 'Intercity',
        isActive: true,
        prices: []
    }
];

export const revalidate = 3600;

export default async function IntercityTransferPage() {
    let routes: RouteWithPrices[] = [];

    try {
        routes = await routeService.getActiveRoutes();
    } catch (error) {
        console.error("Failed to fetch routes:", error);
    }

    const effectiveRoutes = routes.length > 0 ? routes : (process.env.NODE_ENV === 'development' || routes.length === 0 ? MOCK_ROUTES : []) as unknown as RouteWithPrices[];

    return (
        <main className="bg-charcoal text-white relative" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Background Texture */}
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="النقل بين المدن VIP"
                subtitle="سافر بين المدن المقدسة براحة تامة. أسطولنا المتميز يضمن لك رحلة مريحة على طريق الهجرة."
                bgImage="/images/routes/routes-network-hero.webp"
                ctaText="عرض خريطة المسارات"
                ctaLink="#interactive-map"
                backgroundChildren={<AnimatedMapBackground />}
                breadcrumbs={<Breadcrumbs />}
            />

            <section className="py-16 md:py-24 relative overflow-hidden z-10">
                <div className="container relative z-10 mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
                        <FadeIn>
                            <div className="prose prose-invert max-w-none">
                                <span className="text-gold font-bold tracking-[0.2em] text-sm uppercase mb-3 block border-r-4 border-gold pr-4">المسار المقدس</span>
                                <h2 className="text-4xl md:text-5xl font-semibold font-display mb-8 text-white leading-tight">
                                    رحلة بسلام <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">بين الحرمين</span>
                                </h2>
                                <p className="text-lg text-n-300 leading-relaxed mb-6 font-light">
                                    الرحلة بين مكة والمدينة هي أكثر من مجرد سفر؛ إنها انتقال بين حرمين مقدسين. نحن نكرم هذه الرحلة بتقديم خدمة تضع راحتك ووقارك في المقام الأول.
                                </p>
                                <p className="text-lg text-n-300 leading-relaxed mb-10 font-light">
                                    انسَ عناء الحافلات المشتركة. تتيح لك <strong>سيارات الأجرة الخاصة بين المدن</strong> السفر وفقاً لجدولك الزمني، والتوقف عند المواقيت (مثل ذي الحليفة) للإحرام، والاستمتاع بمسار الهجرة في خصوصية تامة بسيارة فاخرة.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                                    {[
                                        { icon: ShieldCheck, title: "السلامة أولاً", desc: "سائقون خبراء على طريق الهجرة." },
                                        { icon: Star, title: "أسطول VIP", desc: "أحدث طرازات جي إم سي يوكن وفانات H1." },
                                        { icon: UserCheck, title: "من الباب للباب", desc: "تشمل التوصيل من وإلى الفندق." },
                                        { icon: Timer, title: "وفق جدولك الزمني", desc: "انطلق في الوقت الذي يناسبك تماماً." }
                                    ].map((item, idx) => (
                                        <GlassCard key={idx} className="flex gap-4 items-start p-6 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-gold/30 transition-all duration-300 group hover:-translate-y-1">
                                            <div className="p-3 rounded-lg bg-black border border-white/5 text-gold shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                                <item.icon size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-lg text-white mb-1 group-hover:text-gold transition-colors font-display">{item.title}</h4>
                                                <p className="text-sm text-n-400 font-light leading-relaxed">{item.desc}</p>
                                            </div>
                                        </GlassCard>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        <div className="relative sticky top-32 lg:pr-10">
                            <div className="absolute inset-0 bg-gold/10 rounded-full blur-[100px] opacity-20 transform translate-y-10 pointer-events-none" />
                            <div className="relative z-10 border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                                <BookingFormWrapper title="احجز رحلتك" subtitle="أفضل الأسعار وتأكيد فوري" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Interactive Map Section - FULL WIDTH */}
            <section id="interactive-map" className="py-0 relative z-10 border-y border-white/10 shadow-2xl">
                <div className="w-full bg-neutral-900/50 backdrop-blur-sm">
                    {/* Ensure InteractiveMapSection uses transparent background internally */}
                    <InteractiveMapSection routes={effectiveRoutes} />
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative z-10 bg-neutral-900/30">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-16 font-display text-white">
                            الأسئلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">الشائعة</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "كم تستغرق الرحلة؟", a: "تستغرق الرحلة من مكة إلى المدينة حوالي 4 ساعات ونصف على طريق الهجرة السريع. نقوم بتعديل السرعة لضمان راحتك وسلامتك." },
                                { q: "هل التوقف عند الميقات مشمول؟", a: "نعم! إذا كنت مسافراً من المدينة إلى مكة، سنتوقف عند ميقات ذي الحليفة (آبار علي) لمدة 15-20 دقيقة لتتمكن من الإحرام، وذلك بدون أي تكلفة إضافية." },
                                { q: "هل هناك رسوم خفية؟", a: "لا. السعر المعروض هو للسيارة بالكامل، ويشمل الوقود والسائق والضرائب. لا توجد رسوم لكل شخص." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300">
                                    <h3 className="font-semibold text-lg mb-3 text-white flex items-start gap-4 font-display">
                                        <span className="text-gold mt-1 p-1 bg-gold/10 rounded-full flex items-center justify-center"><ChevronDown size={16} /></span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-n-400 font-light leading-relaxed pr-10">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
