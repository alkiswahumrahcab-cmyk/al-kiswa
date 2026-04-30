import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, MapPin, Clock, Camera, CheckCircle } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import MobileStickyBarWrapper from "@/components/booking/MobileStickyBarWrapper";

export const metadata: Metadata = {
    title: "زيارة مكة المكرمة | المواقع التاريخية | الكسوة",
    description: "احجز جولات الزيارة الخاصة في مكة. قم بزيارة جبل النور (غار حراء)، جبل ثور، عرفات، ومنى مع سائقين ذوي خبرة.",
    keywords: [
        "زيارة مكة",
        "جولة غار حراء",
        "زيارة جبل ثور",
        "الاماكن التاريخية في مكة",
        "تاكسي زيارة مكة",
        "زيارات العمرة"
    ],
    alternates: {
        ...generateMetadataAlternates("/services/ziarah-makkah"),
        canonical: "https://kiswahumrahcab.com/ar/services/ziarah-makkah",
    },
    openGraph: {
        title: "زيارة مكة | غار حراء وجبل عرفات | الكسوة",
        description: "جولات خاصة شاملة للمواقع التاريخية في مكة المكرمة. نقل مريح وسائقون ذوو خبرة.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'Jabal Al-Nour Makkah Ziyarat' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Makkah Ziyarat Tour",
    "description": "Private guided tour of historical Islamic sites in Makkah including Cave Hira, Thawr, and Arafat.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "Place",
            "name": "Jabal Al-Nour",
            "description": "Cave Hira - First Revelation"
        },
        {
            "@type": "Place",
            "name": "Jabal Thawr",
            "description": "Cave of Migration"
        },
        {
            "@type": "Place",
            "name": "Arafat",
            "description": "Mount of Mercy"
        }
    ],
    "offers": {
        "@type": "Offer",
        "price": "250",
        "priceCurrency": "SAR",
        "availability": "https://schema.org/InStock"
    }
};

const makkahFAQs = [
    {
        question: "كم تستغرق جولة زيارة مكة؟",
        answer: "تستغرق الجولة القياسية حوالي 2-3 ساعات، وتغطي المواقع التاريخية الرئيسية مثل جبل النور وجبل ثور وعرفات."
    },
    {
        question: "هل يمكننا صعود غار حراء؟",
        answer: "نعم، ولكن يرجى ملاحظة أن التسلق يستغرق من ساعة إلى ساعتين من المشي لمسافات طويلة. إذا كنت ترغب في التسلق، يرجى إبلاغنا عند الحجز حتى نتمكن من تعديل الجدول الزمني."
    },
    {
        question: "هل يشمل التوصيل من الفندق؟",
        answer: "نعم، نقوم باصطحابك من فندقك في مكة وإعادتك إليه بعد الجولة."
    },
];

export default async function ZiarahMakkahPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=أنا%20مهتم%20بزيارة%20مكة`;

    return (
        <main className="min-h-screen bg-primary-black relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="جولات زيارة مكة المكرمة"
                subtitle="امشِ حيث مشى النبي ﷺ. رحلة روحانية عبر تاريخ الإسلام في المدينة المقدسة."
                bgImage="/images/routes/makkah-ziyarat-hero.webp"
                ctaText="احجز زيارة مكة"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Jabal Al Nour Makkah Ziyarat Tour"
            />

            {/* Makkah Sites Detail */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-r-4 border-gold-primary pr-4">
                                    المواقع المقدسة التي نزورها
                                </h2>
                                <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
                                    تم تصميم جولاتنا الخاصة لمنحك الوقت للتأمل. نحن لا نستعجلك. قم بزيارة هذه المواقع المباركة بالسرعة التي تناسبك.
                                </p>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            name: "جبل النور (غار حراء)",
                                            desc: "جبل النور، حيث تلقى النبي ﷺ أول وحي من القرآن الكريم.",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "جبل ثور",
                                            desc: "الملاذ الذي لجأ إليه النبي ﷺ وأبو بكر الصديق (رضي الله عنه) أثناء الهجرة إلى المدينة المنورة.",
                                            icon: <CheckCircle size={24} />
                                        },
                                        {
                                            name: "صعيد عرفات (جبل الرحمة)",
                                            desc: "جبل الرحمة، حيث ألقى النبي ﷺ خطبة الوداع.",
                                            icon: <MapPin size={24} />
                                        },
                                        {
                                            name: "منى ومزدلفة",
                                            desc: "المرور بمدينة الخيام في منى وسهول مزدلفة المفتوحة، لمشاهدة مشاعر الحج.",
                                            icon: <Clock size={24} />
                                        },
                                        {
                                            name: "مقبرة المعلاة",
                                            desc: "مقبرة مكة القديمة حيث ترقد أم المؤمنين خديجة (رضي الله عنها).",
                                            icon: <MapPin size={24} />
                                        }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-6 rounded-xl flex gap-6 hover:border-gold-primary/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold-primary/10 p-4 rounded-full h-fit text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-colors">
                                                {site.icon}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-white text-xl mb-2">{site.name}</h3>
                                                <p className="text-gray-400 font-light leading-relaxed">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 sticky top-24">
                                <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1537181534458-7dc2614c9546?q=80&w=1000&auto=format&fit=crop"
                                        alt="Jabal Al-Nour (Cave of Hira) Mountain View Makkah"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                        <div>
                                            <span className="text-gold-primary font-bold tracking-wider uppercase text-sm mb-2 block">وجهة مميزة</span>
                                            <h3 className="text-white text-3xl font-bold font-sans">جبل النور</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Why Book With Us */}
            <section className="py-24 bg-white/5 relative z-10 border-y border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-sans text-white">جرب مكة براحة</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">توقيت مرن</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">ابدأ جولتك متى شئت. نوصي بالصباح الباكر (بعد الفجر) لتجنب الحرارة والزحام.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Camera size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">توقف للتصوير</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">خذ وقتك لالتقاط الذكريات في جبل النور وعرفات دون أي ضغط.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <ArrowLeft size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">سيارات فاخرة</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">سافر براحة مكيفة مع أسطولنا الحديث من جي إم سي يوكون أو هيونداي ستاريا.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/ar/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] tracking-wider text-sm text-black hover:scale-105">
                                احجز زيارتك لمكة <ArrowLeft size={20} className="mr-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={makkahFAQs} title="زيارة مكة - الأسئلة الشائعة" />
            </div>

            <MobileStickyBarWrapper />
        </main>
    );
}
