import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, Clock, CheckCircle, Heart } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import MobileStickyBarWrapper from "@/components/booking/MobileStickyBarWrapper";

export const metadata: Metadata = {
    title: "زيارة المدينة المنورة | مسجد قباء وأُحد | الكسوة",
    description: "احجز جولات الزيارة الخاصة في المدينة المنورة. قم بزيارة مسجد قباء، جبل أحد، المساجد السبعة والقبلتين مع سائقين ذوي خبرة.",
    keywords: [
        "زيارة المدينة",
        "جولة مسجد قباء",
        "زيارة جبل أحد",
        "الاماكن التاريخية في المدينة",
        "تاكسي زيارة المدينة",
        "زيارات العمرة"
    ],
    alternates: {
        ...generateMetadataAlternates("/services/ziarah-madinah"),
        canonical: "https://kiswahumrahcab.com/ar/services/ziarah-madinah",
    },
    openGraph: {
        title: "جولات المدينة المنورة | مسجد قباء وغزوة أُحد | الكسوة",
        description: "جولات خاصة شاملة للمواقع التاريخية في المدينة المنورة. اتبع خطى النبي ﷺ.",
        images: [{ url: '/images/routes/madinah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Masjid Quba Madinah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Madinah Ziyarat Tour",
    "description": "Private guided tour of historical Islamic sites in Madinah including Masjid Quba, Uhud, and Qiblatayn.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "Place",
            "name": "Masjid Quba",
            "description": "First Mosque in Islam"
        },
        {
            "@type": "Place",
            "name": "Mount Uhud",
            "description": "Site of Battle of Uhud"
        },
        {
            "@type": "Place",
            "name": "Masjid Al-Qiblatayn",
            "description": "Mosque of Two Qiblas"
        }
    ],
    "offers": {
        "@type": "Offer",
        "price": "200",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const madinahFAQs = [
    {
        question: "كم تستغرق جولة زيارة المدينة المنورة؟",
        answer: "تستغرق الجولة عادة 3 ساعات، وتغطي جميع المساجد والمواقع التاريخية الرئيسية."
    },
    {
        question: "هل تشمل الجولة مطبعة القرآن الكريم؟",
        answer: "مجمع الملك فهد لطباعة المصحف الشريف له ساعات عمل محددة (عادة في الصباح). يمكننا إدراجه في خط سير الرحلة إذا كان مفتوحاً."
    },
    {
        question: "هل مسجد قباء مشمول في الجولة؟",
        answer: "نعم، مسجد قباء محطة رئيسية. نتيح لك وقتاً كافياً للوضوء وصلاة ركعتين."
    },
];

export default async function ZiarahMadinahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=أنا%20مهتم%20بزيارة%20المدينة`;

    return (
        <main className="min-h-screen bg-bg relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* 1. HERO SECTION (Dark Theme Professional) */}
            <section className="relative pt-[220px] pb-20 md:pt-[260px] lg:pt-[280px] md:pb-32 overflow-hidden border-b border-border bg-charcoal">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/routes/madinah-ziyarat.jpg" 
                        alt="جولات زيارة المدينة المنورة - مسجد قباء وجبل أحد" 
                        fill
                        priority
                        className="object-cover object-[center_60%]"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                <div className="container relative z-10 flex-1 flex flex-col justify-center">
                    <div className="max-w-4xl">
                        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg">
                            جولات مزارات المدينة
                        </h1>

                        <p className="sr-only md:not-sr-only md:block font-body text-lg md:text-xl text-white/95 leading-relaxed md:mb-6 max-w-2xl font-light drop-shadow-md">
                            استكشف مدينة النبي ﷺ. قم بزيارة مسجد قباء، جبل أحد، المساجد السبعة، البقيع، ومساجد الصحابة.
                        </p>

                        <div className="grid grid-cols-2 md:flex md:flex-wrap items-stretch gap-3 md:gap-4 w-full md:w-auto max-w-[400px] md:max-w-none mb-10">
                            <Link 
                                href={whatsappLink}
                                className="flex items-center justify-center text-center bg-gold text-ink px-2 py-3 md:px-8 md:py-4 rounded-btn font-body font-bold text-[12px] md:text-[15px] uppercase tracking-wider md:tracking-[0.08em] hover:bg-gold-light transition-colors shadow-sm min-h-[48px] md:min-h-0"
                            >
                                احجز زيارة المدينة
                            </Link>
                            <Link 
                                href="/ar/booking"
                                className="flex items-center justify-center text-center bg-transparent text-white border-2 border-white/20 px-2 py-3 md:px-8 md:py-4 rounded-btn font-body font-bold text-[12px] md:text-[15px] uppercase tracking-wider md:tracking-[0.08em] hover:border-gold hover:text-gold transition-colors shadow-sm min-h-[48px] md:min-h-0"
                            >
                                احصل على الأسعار
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Madinah Sites Detail */}
            <section className="py-24 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display text-ink border-r-4 border-gold pr-4">
                                    المعالم المنورة
                                </h2>
                                <p className="text-body mb-8 leading-relaxed font-light text-lg">
                                    المدينة المنورة مليئة بالتاريخ في كل زاوية. سيأخذك سائقونا إلى أكثر المواقع روحانية.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            name: "مسجد قباء",
                                            desc: "أول مسجد بناه النبي ﷺ. صلاة ركعتين فيه تعادل أجر عمرة.",
                                            icon: <Heart size={24} />
                                        },
                                        {
                                            name: "جبل أحد ومقبرة الشهداء",
                                            desc: "موقع الغزوة الثانية الكبرى في الإسلام ومثوى سيد الشهداء حمزة بن عبد المطلب (رضي الله عنه).",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "مسجد القبلتين",
                                            desc: "المسجد الذي نزل فيه الوحي بتغيير القبلة نحو الكعبة المشرفة.",
                                            icon: <Clock size={24} />
                                        },
                                        {
                                            name: "المساجد السبعة",
                                            desc: "مجموعة من المساجد التاريخية الصغيرة في موقع غزوة الخندق.",
                                            icon: <CheckCircle size={24} />
                                        },
                                        {
                                            name: "مسجد الغمامة",
                                            desc: "المكان الذي صلى فيه النبي ﷺ صلاة الاستسقاء والعيدين.",
                                            icon: <MapPin size={24} />
                                        }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-surface border border-border p-6 rounded-xl flex gap-6 hover:border-gold/30 hover:shadow-gold transition-all group">
                                            <div className="bg-surface-alt p-4 rounded-btn h-fit text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-colors">
                                                {site.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-ink text-xl mb-2">{site.name}</h3>
                                                <p className="text-body font-light leading-relaxed">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 sticky top-24">
                                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-md border border-border group">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                        alt="Masjid Quba Madinah First Mosque in Islam Exterior"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                        <div>
                                            <span className="text-gold font-bold tracking-wider uppercase text-sm mb-2 block">أول مسجد</span>
                                            <h3 className="text-white text-3xl font-semibold font-display">مسجد قباء</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Why Book With Us */}
            <section className="py-24 bg-surface relative z-10 border-y border-border">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-16 font-display text-ink">مدينة السلام</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                <div className="bg-surface-alt w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-ink">وقت كافٍ للدعاء</h3>
                                <p className="text-sm text-body leading-relaxed font-light">نضمن لك وقتاً كافياً في جبل أحد ومسجد قباء للدعاء والصلاة دون استعجال.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                <div className="bg-surface-alt w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-ink">سائقون مطلعون</h3>
                                <p className="text-sm text-body leading-relaxed font-light">يعرف سائقونا تاريخ وآداب زيارة هذه الأماكن المقدسة.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                <div className="bg-surface-alt w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                    <ArrowLeft size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-ink">من الباب للباب</h3>
                                <p className="text-sm text-body leading-relaxed font-light">نقوم باصطحابك من فندقك في المنطقة المركزية ونعيدك إلى بابه مرة أخرى.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/ar/booking" className="inline-flex items-center bg-gold px-12 py-4 rounded-btn font-bold transition-all shadow-sm hover:shadow-md hover:bg-gold-light tracking-wider text-sm text-ink hover:scale-105">
                                احجز زيارتك للمدينة <ArrowLeft size={20} className="mr-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={madinahFAQs} title="زيارة المدينة - الأسئلة الشائعة" />
            </div>

            <MobileStickyBarWrapper />
        </main>
    );
}
