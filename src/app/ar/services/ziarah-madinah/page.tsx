import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
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
        images: [{ url: '/images/routes/madinah-ziyarat-hero.png', width: 1200, height: 630, alt: 'Masjid Quba Madinah Ziyarat' }]
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
        <main className="min-h-screen bg-primary-black relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="جولات زيارة المدينة المنورة"
                subtitle="استكشف مدينة النبي ﷺ. قم بزيارة أول مسجد في الإسلام وعش الأيام الأولى لديننا الحنيف."
                bgImage="/images/routes/madinah-ziyarat-hero.png"
                ctaText="احجز زيارة المدينة"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="Masjid Quba Madinah Ziyarat Tour"
            />

            {/* Madinah Sites Detail */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans text-white border-r-4 border-gold-primary pr-4">
                                    المعالم المنورة
                                </h2>
                                <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">
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
                                        src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                        alt="Masjid Quba Madinah First Mosque in Islam Exterior"
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                        <div>
                                            <span className="text-gold-primary font-bold tracking-wider uppercase text-sm mb-2 block">أول مسجد</span>
                                            <h3 className="text-white text-3xl font-bold font-sans">مسجد قباء</h3>
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
                        <h2 className="text-3xl md:text-5xl font-bold mb-16 font-sans text-white">مدينة السلام</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">وقت كافٍ للدعاء</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">نضمن لك وقتاً كافياً في جبل أحد ومسجد قباء للدعاء والصلاة دون استعجال.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <Heart size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">سائقون مطلعون</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">يعرف سائقونا تاريخ وآداب زيارة هذه الأماكن المقدسة.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-black/40 border border-white/5 hover:border-gold-primary/30 transition-all group">
                                <div className="bg-gold-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold-primary border border-gold-primary/20 group-hover:bg-gold-primary group-hover:text-black transition-all">
                                    <ArrowLeft size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">من الباب للباب</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-light">نقوم باصطحابك من فندقك في المنطقة المركزية ونعيدك إلى بابه مرة أخرى.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/ar/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-full font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] tracking-wider text-sm text-black hover:scale-105">
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
