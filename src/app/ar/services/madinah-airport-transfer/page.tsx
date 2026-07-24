import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, Plane, Clock, Hotel, MapPin, ChevronDown } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import RouteVisual from '@/components/services/RouteVisual';
import GlassCard from '@/components/ui/GlassCard';
import FadeIn from '@/components/common/FadeIn';

export const metadata: Metadata = {
    title: "تاكسي مطار المدينة المنورة | استقبال وتوصيل فندق | الكسوة",
    description: "تاكسي موثوق من مطار المدينة المنورة (MED) إلى فنادق المسجد النبوي. استقبال من المطار على مدار الساعة. حجز تاكسي مطار المدينة المنورة. توصيل الى فندق الحرم.",
    keywords: [
        "تاكسي مطار المدينة المنورة",
        "مطار المدينة إلى المسجد النبوي",
        "مطار الأمير محمد بن عبدالعزيز",
        "نقل مطار المدينة",
        "تاكسي من مطار المدينة إلى مكة",
        "توصيل فنادق المدينة",
        "تاكسي عمرة المدينة",
        "تاكسي مطار المدينة",
        "استقبال مطار الامير محمد بن عبدالعزيز",
        "توصيل من مطار المدينة للحرم",
        "سعر مشوار مطار المدينة"
    ],
    alternates: {
    ...generateMetadataAlternates("/services/madinah-airport-transfer"),
    canonical: "https://kiswahumrahcab.com/ar/services/madinah-airport-transfer",
  },
    openGraph: {
        title: "نقل مطار المدينة | مطار الأمير محمد بن عبدالعزيز | الكسوة",
        description: "تاكسي موثوق من مطار المدينة المنورة (MED) إلى فنادق المسجد النبوي. استقبال من المطار على مدار الساعة، خدمة استقبال وترحيب.",
        images: [{ url: '/images/routes/madinah-airport-hero.webp', width: 1200, height: 630, alt: 'خدمة النقل من مطار المدينة المنورة' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Madinah Airport Transfer",
    "alternateName": "توصيل مطار المدينة المنورة",
    "provider": {
        "@type": "LocalBusiness",
        "name": "Al Kiswah Transport"
    },
    "serviceType": "Airport Transfer",
    "areaServed": {
        "@type": "Airport",
        "name": "Prince Mohammad Bin Abdulaziz International Airport"
    },
    "description": "نقل خاص من مطار المدينة المنورة إلى فنادق المسجد النبوي."
};

const madinahAirportFAQs = [
    {
        question: "كم يبعد مطار المدينة المنورة عن المسجد النبوي؟",
        answer: "يبعد المطار حوالي 20-25 دقيقة (20 كم) عن المنطقة المركزية حيث يقع المسجد النبوي ومعظم الفنادق."
    },
    {
        question: "هل سينتظر السائق إذا تأخرت رحلتي؟",
        answer: "نعم، نحن نتتبع جميع الرحلات الجوية. سينتظركم سائقنا في صالة الوصول، بغض النظر عن التأخير، دون أي تكلفة إضافية."
    },
    {
        question: "هل يمكنني حجز تاكسي من مطار المدينة المنورة مباشرة إلى مكة؟",
        answer: "نعم، نقدم خدمات نقل مباشرة من مطار المدينة المنورة (MED) إلى فنادق مكة. تستغرق الرحلة حوالي 4.5 ساعات عبر طريق الهجرة."
    },
];

export default async function MadinahAirportPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=أحتاج%20إلى%20استقبال%20من%20مطار%20المدينة`;

    return (
        <main className="overflow-x-hidden bg-charcoal min-h-screen relative" dir="rtl">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="نقل مطار المدينة المنورة (MED)"
                subtitle="ابدأ زيارتك لمدينة رسول الله براحة بال. خدمة استقبال وترحيب موثوقة من مطار الأمير محمد بن عبدالعزيز."
                bgImage="/images/routes/madinah-airport-hero.webp"
                ctaText="احجز استقبال المطار"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
            />

            {/* Service Highlights */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeIn>
                            <div>
                                <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm border-b border-gold/30 pb-2 mb-4 block w-fit">استقبال خالي من المتاعب</span>
                                <h2 className="text-4xl md:text-5xl font-semibold mb-8 font-display text-white">
                                    وصول سلس إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">المدينة المنورة</span>
                                </h2>
                                <p className="text-n-400 mb-8 leading-relaxed font-light text-lg">
                                    يجب أن يكون وصولك للعمرة أو الزيارة خالياً من المتاعب. تجنب عناء التفاوض مع سيارات الأجرة المحلية.
                                    يستقبلكم سائقونا المحترفون في صالة الوصول مع لوحة باسمكم ويساعدونكم في نقل الأمتعة إلى سيارتكم الخاصة المريحة.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-gold group-hover:border-gold/50 transition-colors shadow-lg">
                                            <Plane size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-xl mb-2 text-white group-hover:text-gold transition-colors font-display">تتبع الرحلات</h4>
                                            <p className="text-sm text-n-400 font-light leading-relaxed">نقوم بمراقبة حالة رحلتكم لضمان تواجدنا عند هبوطكم، ونتكيف مع أي تأخير بشكل تلقائي.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-gold group-hover:border-gold/50 transition-colors shadow-lg">
                                            <Hotel size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-xl mb-2 text-white group-hover:text-gold transition-colors font-display">توصيل للفندق</h4>
                                            <p className="text-sm text-n-400 font-light leading-relaxed">نقل مباشر إلى بهو فندقكم في المنطقة المركزية (بالقرب من المسجد النبوي) أو أي موقع آخر.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 group">
                                        <div className="bg-neutral-900 border border-white/10 p-4 rounded-xl h-fit text-gold group-hover:border-gold/50 transition-colors shadow-lg">
                                            <Clock size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-xl mb-2 text-white group-hover:text-gold transition-colors font-display">متاحون على مدار الساعة</h4>
                                            <p className="text-sm text-n-400 font-light leading-relaxed">رحلة في وقت متأخر من الليل أو في الصباح الباكر؟ نحن دائماً متاحون لخدمتكم في أي وقت.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-12">
                                    <Link href="/ar/booking" className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-black hover:bg-white hover:text-black hover:from-white hover:to-white px-10 py-4 rounded-btn font-bold transition-all shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] uppercase tracking-wider text-sm transform hover:-translate-y-1">
                                        احجز نقلك الآن <ArrowRight size={20} className="rotate-180" />
                                    </Link>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Map / Route Visual Placeholder */}
                        <FadeIn delay={0.2}>
                            <div className="bg-neutral-900/50 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />

                                <h3 className="text-2xl font-semibold mb-8 text-center text-white font-display">الطرق الشائعة من مطار المدينة</h3>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gold/10 p-2 rounded-lg text-gold">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg">إلى المسجد النبوي</p>
                                                <p className="text-xs text-n-500 uppercase tracking-wider">فنادق المركزية</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-gold">25 دقيقة</p>
                                            <p className="text-xs text-n-500">20 كم</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gold/10 p-2 rounded-lg text-green-500">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg"><Link href="/ar/services/makkah-madinah-taxi" className="hover:text-green-400 transition-colors underline decoration-dotted underline-offset-4">إلى فنادق مكة</Link></p>
                                                <p className="text-xs text-n-500 uppercase tracking-wider">نقل مباشر</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-gold">4.5 ساعات</p>
                                            <p className="text-xs text-n-500">450 كم</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl hover:border-gold/30 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gold/10 p-2 rounded-lg text-blue-500">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white text-lg"><Link href="/ar/services/ziyarat-tours" className="hover:text-blue-400 transition-colors underline decoration-dotted underline-offset-4">إلى مسجد قباء</Link></p>
                                                <p className="text-xs text-n-500 uppercase tracking-wider">بداية الزيارات</p>
                                            </div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-bold text-gold">30 دقيقة</p>
                                            <p className="text-xs text-n-500">25 كم</p>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-center text-xs text-n-500 mt-8 italic font-light">
                                    *أوقات السفر قد تختلف بناءً على حالة المرور
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    <div className="mt-24">
                        <FadeIn>
                            <h3 className="text-3xl font-semibold mb-10 text-center font-display text-white">الرحلة إلى المركزية</h3>
                            <RouteVisual
                                from="مطار المدينة (MED)"
                                fromLabel="صالة الوصول"
                                to="فندق المسجد النبوي"
                                toLabel="فندقك / المركزية"
                                duration="25 دقيقة"
                                distance="20 كم"
                                showMiqat={false}
                            />
                        </FadeIn>
                    </div>
                </div>
            </section>

            <FleetCarouselWrapper />

            <section className="py-24 bg-neutral-900/30 border-t border-white/5">
                <div className="container max-w-4xl mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-semibold text-center mb-16 font-display text-white">
                            الأسئلة <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#F3D383] to-gold">الشائعة</span>
                        </h2>
                        <div className="space-y-4">
                            {madinahAirportFAQs.map((faq, i) => (
                                <div key={i} className="group">
                                    <details className="group [&_summary::-webkit-details-marker]:hidden">
                                        <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-2xl bg-neutral-900 border border-white/10 p-6 text-white hover:border-gold/50 transition-colors shadow-md">
                                            <h3 className="font-semibold font-display text-lg group-open:text-gold transition-colors">{faq.question}</h3>
                                            <span className="shrink-0 rounded-full bg-white/5 p-1.5 text-n-400 sm:p-3 group-open:bg-gold/10 group-open:text-gold transition-all">
                                                <ChevronDown size={20} className="group-open:rotate-180 transition-transform duration-300" />
                                            </span>
                                        </summary>
                                        <div className="mt-4 px-6 leading-relaxed text-n-400 font-light border-r-2 border-gold/30 mr-4">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>
    );
}
