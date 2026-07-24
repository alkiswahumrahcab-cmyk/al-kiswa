import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { Plane, Clock, ShieldCheck, MapPin, UserCheck, Smartphone, CheckCircle2, Star, ChevronDown, Award } from 'lucide-react';
import Link from 'next/link';
import { routeService } from '@/services/routeService';
import AirportInteractiveMap from '@/components/services/airport/AirportInteractiveMap';
import { Metadata } from 'next';
import GlassCard from '@/components/ui/GlassCard';

export const metadata: Metadata = {
    title: "توصيل مطارات جدة والمدينة | تاكسي العمرة | الكسوة",
    description: "خدمات استقبال موثوقة في مطار جدة والمدينة المنورة. توصيل دقيق ومريح على مدار الساعة. توصيل من مطار جدة إلى مكة. استقبال في مطار المدينة المنورة.",
    keywords: [
        "تاكسي من مطار جدة إلى مكة", "نقل مطار الملك عبدالعزيز", "استقبال مطار العمرة", "تاكسي مطار المدينة",
        "نقل عمرة لكبار الشخصيات", "توصيل مطار جدة", "تاكسي مكة الخاص",
        "توصيل مطار جدة", "تاكسي مطار المدينة", "استقبال المعتمرين",
        "نقل من مطار الملك عبدالعزيز", "حجز تاكسي الحرم", "خدمات المعتمرين"
    ],
    alternates: {
    ...generateMetadataAlternates("/services/airport-transfers"),
    canonical: "https://kiswahumrahcab.com/ar/services/airport-transfers",
  },
    openGraph: {
        title: "توصيل مطارات جدة والمدينة | مواصلات الكسوة",
        description: "استقبال آمن ومريح من مطارات جدة والمدينة.",
        images: ["/images/fleet/gmc.webp"],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "نقل مطارات جدة والمدينة | تاكسي عمرة | الكسوة",
        description: "خدمات استقبال موثوقة من مطار جدة ومطار المدينة المنورة.",
        images: ["/images/fleet/gmc.webp"],
    }
};

export default async function AirportTransfersPage() {
    const allRoutes = await routeService.getActiveRoutes();
    const airportRoutes = allRoutes.filter(r =>
        r.origin.toLowerCase().includes('airport') ||
        r.destination.toLowerCase().includes('airport') ||
        r.origin.toLowerCase().includes('jeddah')
    );

    // Schema.org Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "توصيل من مطار جدة إلى مكة",
        "alternateName": "توصيل من مطار جدة الى مكة",
        "provider": {
            "@type": "TransportationService",
            "name": "Al Kiswah Umrah Transport"
        },
        "description": "خدمة نقل فاخرة من مطار الملك عبدالعزيز إلى مكة.",
        "areaServed": {
            "@type": "City",
            "name": "Makkah"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "خدمات نقل المطار",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "نقل سيارة سيدان قياسية"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "نقل جمس يوكون لكبار الشخصيات"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "نقل سيارة عائلية هايس"
                    }
                }
            ]
        }
    };

    return (
        <main className="bg-charcoal text-white relative" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Background Texture*/}
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title="استقبال كبار الشخصيات من مطار جدة"
                subtitle="استمتع بوصول سلس مع خدمة السائق الخاص المميزة. نتابع رحلتك وننتظرك في المطار لنضمن لك رحلة خالية من التوتر إلى مكة."
                bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
                ctaText="احجز نقلك الآن"
                ctaLink="/booking?service=airport"
                alt="نقل بسائق خاص وصالة استقبال في مطار جدة"
            />

            {/* Interactive Map Section */}
            <section className="relative z-10 -mt-20 mb-24 px-4">
                <div className="container mx-auto">
                    <div className="bg-neutral-900/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10">
                        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-end gap-6 bg-white/5">
                            <div>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold font-bold tracking-[0.2em] uppercase text-xs mb-3 block">اتصالات في الوقت الفعلي</span>
                                <h1 className="text-3xl md:text-4xl font-semibold font-display text-white">
                                    شبكة اتصال المطار
                                </h1>
                                <p className="text-n-400 mt-3 max-w-xl font-light leading-relaxed">
                                    تصور رحلتك من مطار الملك عبدالعزيز الدولي.
                                    اختر وجهتك لرؤية تفاصيل المسار والوقت المقدر.
                                </p>
                            </div>
                            <div className="flex items-center gap-6 text-xs font-bold text-n-300 uppercase tracking-wider">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_#D4AF37]" />
                                    تتبع الرحلات مباشرة
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]" />
                                    متاح على مدار الساعة
                                </div>
                            </div>
                        </div>

                        {/* The Map Component */}
                        <AirportInteractiveMap />
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Enhanced */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm border-b border-gold/30 pb-2">التزامنا</span>
                            <h2 className="text-4xl md:text-5xl font-semibold mt-6 mb-6 font-display text-white">
                                لماذا تحجز <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">خدمة نقل المطار معنا؟</span>
                            </h2>
                            <p className="text-n-400 max-w-2xl mx-auto font-light text-lg leading-relaxed">
                                نحن نقدم ما هو أكثر من مجرد وسيلة نقل. نقدم خدمة شاملة تضمن راحة بالك منذ لحظة هبوطك.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { icon: Clock, title: "تتبع الرحلات", desc: "نراقب حالة رحلتك. في حال التأخير، ننتظر مجاناً." },
                            { icon: UserCheck, title: "استقبال وترحيب", desc: "سائق محترف ينتظرك بلوحة تحمل اسمك في صالة الوصول." },
                            { icon: ShieldCheck, title: "آمن وموثوق", desc: "مركبات مرخصة وسائقون محترفون معتمدون." },
                            { icon: Award, title: "أسعار ثابتة", desc: "لا توجد رسوم خفية. خطوات واضحة وأسعار شاملة." }
                        ].map((item, idx) => (
                            <GlassCard key={idx} delay={idx * 0.1} className="text-center p-10 bg-neutral-900/50 border-white/10 hover:border-gold/50 hover:bg-neutral-900 transition-all duration-500 group">
                                <div className="w-20 h-20 mx-auto bg-black/40 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 border border-white/10 shadow-inner group-hover:border-gold/30">
                                    <item.icon size={36} className="text-gold group-hover:text-gold-light transition-colors" />
                                </div>
                                <h3 className="font-semibold text-xl mb-4 text-white font-display">{item.title}</h3>
                                <p className="text-sm text-n-400 leading-relaxed font-light group-hover:text-n-300 transition-colors">
                                    {item.desc}
                                </p>
                            </GlassCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative overflow-hidden bg-neutral-900/30 border-y border-white/5 backdrop-blur-sm">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
                <div className="container mx-auto px-4 relative z-10">
                    <FadeIn>
                        <h2 className="text-4xl md:text-5xl font-semibold text-center mb-24 font-display text-white">
                            رحلة سلسة في <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">٤ خطوات</span>
                        </h2>
                        <div className="grid md:grid-cols-4 gap-12 md:gap-8 relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent border-t border-dashed border-white/10 -z-10" />

                            {[
                                { icon: Smartphone, title: "١. احجز عبر الإنترنت", desc: "اختر رحلتك وأدخل تفاصيل الطيران." },
                                { icon: CheckCircle2, title: "٢. التأكيد", desc: "احصل على تفاصيل التأكيد الفورية." },
                                { icon: Plane, title: "٣. نتابع رحلتك", desc: "نراقب أوقات الرحلات ونتابع الوصول." },
                                { icon: UserCheck, title: "٤. الاستقبال والنقل", desc: "يستقبلك السائق في صالة الوصول لرحلة مريحة." }
                            ].map((step, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 bg-neutral-900 border border-white/10 p-1.5 rounded-full relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:-translate-y-2">
                                        <div className="w-full h-full rounded-btn border border-dashed border-white/20 flex items-center justify-center bg-black/40 group-hover:border-gold/50 transition-colors duration-500">
                                            <step.icon size={36} className="text-gold" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-black font-bold text-sm shadow-lg border border-white/10">
                                            {idx + 1}
                                        </div>
                                    </div>
                                    <h3 className="font-semibold text-xl mt-8 mb-2 text-white group-hover:text-gold transition-colors font-display">{step.title}</h3>
                                    <p className="text-sm text-n-400 font-light max-w-[200px]">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Vehicle Options */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-semibold font-display mb-6 text-white">اختر <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">مركبتك</span></h2>
                            <p className="text-n-400 text-lg font-light">اختر المركبة المثالية لحجم مجموعتك وتفضيلات راحتك.</p>
                        </div>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-8">
                        <FadeIn delay={0.1}>
                            <div className="bg-neutral-900/50 rounded-[2rem] overflow-hidden shadow-lg border border-white/10 h-full flex flex-col group hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/camry-2025.webp"
                                        alt="سيارة تويوتا كامري سيدان قياسية لنقل مطار مكة"
                                        className="w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/5 bg-black/20 backdrop-blur-sm">
                                    <h3 className="text-2xl font-semibold mb-2 text-white font-display">سيارة سيدان قياسية</h3>
                                    <p className="text-n-400 text-sm mb-6 font-light">مثالية للأزواج أو المسافرين الأفراد مع أمتعة خفيفة.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-n-300">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> مريحة للركاب</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> مساحة للأمتعة القياسية</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="bg-black/60 rounded-[2rem] overflow-hidden shadow-[0_0_40px_-10px_hsl(var(--gold-glow) / 0.15)] border border-gold/50 relative h-full flex flex-col transform md:-translate-y-6 scale-[1.02] z-20">
                                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold via-[#F3D383] to-gold" />
                                <div className="absolute top-6 right-6 bg-gradient-to-r from-gold to-gold-dark text-black text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest z-10 shadow-lg">الأكثر طلباً</div>
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-gold/5 to-transparent flex items-center justify-center p-6">
                                    <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full" />
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/gmc.webp"
                                        alt="سيارة جمس يوكون فاخرة لاستقبال مطار جدة"
                                        className="relative z-10 w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/10 bg-black/80 backdrop-blur-md">
                                    <h3 className="text-2xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold font-display">جمس يوكون لكبار الشخصيات</h3>
                                    <p className="text-n-300 text-sm mb-6 font-light">فخامة ومساحة للعائلات. سافر ككبار الشخصيات.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-white">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> مقاعد فاخرة للركاب</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> صندوق واسع للأمتعة</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="bg-neutral-900/50 rounded-[2rem] overflow-hidden shadow-lg border border-white/10 h-full flex flex-col group hover:border-gold/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.3)]">
                                <div className="h-72 relative overflow-hidden group bg-gradient-to-br from-white/5 to-transparent flex items-center justify-center p-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/fleet/toyota-hiace-2025.webp"
                                        alt="سيارة تويوتا هايس عائلية لنقل المجموعات من المطار"
                                        className="w-auto h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-2xl"
                                    />
                                </div>
                                <div className="p-8 flex-1 flex flex-col border-t border-white/5 bg-black/20 backdrop-blur-sm">
                                    <h3 className="text-2xl font-semibold mb-2 text-white font-display">سيارة عائلية (هايس)</h3>
                                    <p className="text-n-400 text-sm mb-6 font-light">مثالية للمجموعات الكبيرة أو العائلات مع أمتعة إضافية.</p>
                                    <ul className="text-sm space-y-4 mb-8 mt-auto text-n-300">
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> مساحة واسعة للركاب</li>
                                        <li className="flex items-center gap-3"><MapPin size={16} className="text-gold" /> سعة استيعاب للأمتعة</li>
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 relative z-10 bg-neutral-900/40 border-t border-white/5">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-16 font-display text-white">
                            الأسئلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">الشائعة</span>
                        </h2>
                        <div className="space-y-6">
                            {[
                                { q: "أين سأقابل السائق؟", a: "سيكون سائقنا في انتظارك في صالة الوصول حاملاً لوحة باسمك. سنقوم أيضاً بمشاركة تفاصيل التواصل مع السائق عبر الواتساب قبل وصولك." },
                                { q: "ماذا لو تأخرت رحلتي؟", a: "نحن نراقب جداول الرحلات في الوقت الفعلي. إذا تأخرت رحلتك، سيقوم سائقنا بتعديل وقت الاستقبال وفقاً لذلك، دون أي تكلفة إضافية." },
                                { q: "هل توفرون مقاعد للأطفال؟", a: "نعم، تتوفر مقاعد الأطفال عند الطلب. يرجى ذكر هذا المتطلب في ملاحظات الحجز حتى نتمكن من ترتيب ذلك لك." },
                                { q: "كم تستغرق الرحلة؟", a: "تستغرق الرحلة من مطار جدة إلى مكة عادةً حوالي ساعة إلى ساعة ونصف، بناءً على ظروف المرور." },
                                { q: "هل يمكنني الدفع نقداً؟", a: "نعم، يمكنك الدفع للسائق نقداً عند الوصول. نقبل أيضاً المدفوعات عبر الإنترنت إذا كنت تفضل الدفع المسبق." },
                                { q: "هل السعر للشخص الواحد أم للمركبة؟", a: "أسعارنا تحسب لكل مركبة، وليس لكل شخص. السعر الذي يظهر لك يشمل السيارة بالكامل مع مساحات الأمتعة." }
                            ].map((faq, i) => (
                                <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-8 hover:border-gold/30 transition-all duration-300 group">
                                    <h3 className="font-semibold text-lg mb-3 text-white flex items-start gap-4 font-display">
                                        <span className="text-gold mt-1 p-1 bg-gold/10 rounded-full"><ChevronDown size={16} /></span>
                                        {faq.q}
                                    </h3>
                                    <p className="text-n-400 font-light leading-relaxed pl-10 group-hover:text-n-300 transition-colors">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 relative overflow-hidden bg-gradient-to-r from-gold via-[#E5B842] to-gold">
                <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20 pointer-events-none mix-blend-multiply" />
                <div className="container relative z-10 text-center">
                    <h2 className="text-3xl md:text-5xl font-semibold mb-6 font-display text-black drop-shadow-sm">
                        هل أنت مستعد <span className="text-white drop-shadow-md">لرحلة مريحة؟</span>
                    </h2>
                    <p className="text-lg md:text-xl mb-12 text-black/80 max-w-2xl mx-auto font-medium">
                        احجز وسيلة نقلك الموثوقة إلى مكة اليوم ودعنا نتعامل مع التفاصيل اللوجستية بينما تركز أنت على عبادتك.
                    </p>
                    <Link
                        href="/booking?service=airport"
                        className="inline-flex items-center gap-3 bg-black text-gold hover:bg-white hover:text-black px-12 py-5 rounded-btn font-bold uppercase tracking-[0.15em] text-sm shadow-2xl transition-all transform hover:-translate-y-1 border border-black/20"
                    >
                        احجز رحلتك الآن
                        <Plane className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}

