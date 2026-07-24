import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowRight, MapPin, Clock, Camera, Heart, BookOpen } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";

export const metadata: Metadata = {
    title: "جولات زيارة مكة والمدينة | المواقع الأثرية | الكسوة",
    description: "جولات زيارات خاصة في مكة (جبل النور، عرفات) والمدينة (مسجد قباء، أحد). سائقون ذوو خبرة يشاركونك التاريخ الإسلامي.",
    keywords: [
        "جولات زيارة مكة",
        "مواقع زيارة المدينة",
        "نقل مسجد قباء",
        "جولة الأماكن التاريخية بمكة",
        "تاكسي زيارات خاص",
        "رحلة يومية إلى الطائف من مكة",
        "رحلات زيارة مكة",
        "مزارات المدينة المنورة",
        "زيارة مسجد قباء",
        "جبل النور",
        "زيارة غار حراء"
    ],
    alternates: {
    ...generateMetadataAlternates("/services/ziyarat-tours"),
    canonical: "https://kiswahumrahcab.com/ar/services/ziyarat-tours",
  },
    openGraph: {
        title: "جولات زيارة مكة والمدينة | المواقع التاريخية | الكسوة",
        description: "جولات خاصة برفقة مرشد إلى جبل النور، مسجد قباء، جبل أحد، والمزيد. تجربة روحانية عميقة مع سائقين على دراية تامة.",
        images: [{ url: '/images/routes/makkah-ziyarat-hero.webp', width: 1200, height: 630, alt: 'جبل النور مكة زيارات' }]
    }
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "جولة زيارات مكة والمدينة",
    "description": "جولة خاصة برفقة مرشد للمواقع الإسلامية التاريخية في مكة والمدينة بما في ذلك غار حراء ومسجد قباء.",
    "provider": {
        "@type": "TransportationService",
        "name": "Al Kiswah Transport"
    },
    "itinerary": [
        {
            "@type": "City",
            "name": "Makkah",
            "description": "زيارة جبل النور وغار ثور وعرفات."
        },
        {
            "@type": "City",
            "name": "Madinah",
            "description": "زيارة مسجد قباء وجبل أحد ومسجد القبلتين."
        }
    ],
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock"
    }
};

const ziyaratFAQs = [
    {
        question: "ما هي مدة جولة الزيارة النموذجية؟",
        answer: "تستغرق جولة الزيارة العادية في مكة أو المدينة حوالي ساعتين إلى 3 ساعات. ومع ذلك، نقدم جولات ممتدة إذا كنت ترغب في زيارة مواقع بعيدة مثل بدر أو الطائف."
    },
    {
        question: "هل يتحدث السائقون اللغة الإنجليزية؟",
        answer: "نعم، يتم اختيار سائقي الزيارات بناءً على مهاراتهم اللغوية ومعرفتهم بالمواقع التاريخية. يمكنهم إرشادك إلى أفضل أماكن وقوف السيارات وشرح أهمية المواقع."
    },
    {
        question: "هل يمكننا تخصيص الأماكن التي نزورها؟",
        answer: "بالتأكيد. إنها جولة خاصة. يمكنك اختيار المواقع التي ترغب في زيارتها ومدة البقاء في كل منها. نحن هنا لخدمة جدولك الزمني."
    },
];

export default async function ZiyaratToursPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('أنا مهتم بحجز جولة زيارة')}`;

    return (
        <main dir="rtl" className="min-h-screen bg-charcoal relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Hero
                title="جولات الزيارات: استرجع التاريخ الإسلامي"
                subtitle="سر على خطى النبي (صلى الله عليه وسلم). جولات شاملة وجذابة للمواقع المقدسة في مكة والمدينة."
                bgImage="/images/routes/makkah-ziyarat-hero.webp"
                ctaText="احجز جولة زيارة"
                ctaLink={whatsappLink}
                layout="center"
                breadcrumbs={<Breadcrumbs />}
                alt="جولات الزيارات التاريخية في مكة والمدينة - جبل النور"
            />

            {/* Makkah Ziyarat */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display text-white border-r-4 border-gold pr-4">
                                    مواقع زيارات مكة
                                </h2>
                                <p className="text-n-300 mb-6 leading-relaxed font-light text-lg">
                                    اكتشف الأماكن التي بدأ فيها الوحي. تغطي جولتنا في مكة أهم المعالم البارزة خارج الحرم.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { name: "جبل النور (غار حراء)", desc: "مكان نزول الوحي الأول." },
                                        { name: "جبل ثور", desc: "الغار الذي اختبأ فيه النبي (صلى الله عليه وسلم) أثناء الهجرة." },
                                        { name: "منى، عرفات ومزدلفة", desc: "مواقع مشاعر الحج." },
                                        { name: "مقبرة المعلاة", desc: "المقبرة التي دُفنت فيها خديجة (رضي الله عنها)." }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 hover:border-gold/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold/10 p-3 rounded-btn h-fit text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors">
                                                <MapPin size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{site.name}</h4>
                                                <p className="text-sm text-n-400 font-light">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1537181534458-7dc2614c9546?q=80&w=1000&auto=format&fit=crop"
                                    alt="منظر جبل النور (غار حراء) في مكة"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                    <span className="text-white text-2xl font-semibold font-display">جبل النور</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Madinah Ziyarat */}
            <section className="py-24 bg-black/30 relative z-10 backdrop-blur-sm border-y border-white/5">
                <div className="container mx-auto px-4">
                    <FadeIn delay={0.2}>
                        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                            <div className="md:w-1/2">
                                <h2 className="text-3xl md:text-4xl font-semibold mb-6 font-display text-white border-r-4 border-gold pr-4">
                                    مواقع زيارات المدينة
                                </h2>
                                <p className="text-n-300 mb-6 leading-relaxed font-light text-lg">
                                    اشعر بطمأنينة مدينة النبي. قم بزيارة أول مسجد في الإسلام ومواقع المعارك المبكرة.
                                </p>
                                <ul className="space-y-4">
                                    {[
                                        { name: "مسجد قباء", desc: "أول مسجد في الإسلام. الصلاة فيه ركعتين تعدل عمرة." },
                                        { name: "جبل أحد", desc: "موقع غزوة أحد ومقبرة الشهداء." },
                                        { name: "مسجد القبلتين", desc: "المسجد الذي تم فيه تحويل القبلة." },
                                        { name: "المساجد السبعة", desc: "موقع غزوة الخندق." }
                                    ].map((site, idx) => (
                                        <li key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-4 hover:border-gold/30 transition-all hover:bg-white/10 group">
                                            <div className="bg-gold/10 p-3 rounded-btn h-fit text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-colors">
                                                <Heart size={24} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white text-lg">{site.name}</h4>
                                                <p className="text-sm text-n-400 font-light">{site.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                <img
                                    src="https://images.unsplash.com/photo-1551041777-ed02bed74fc4?q=80&w=1000&auto=format&fit=crop"
                                    alt="مسجد قباء في المدينة أول مسجد في الإسلام من الخارج"
                                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-8 z-20">
                                    <span className="text-white text-2xl font-semibold font-display">مسجد قباء</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Why Book Ziyarat With Us */}
            <section className="py-24 bg-transparent relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.4}>
                        <h2 className="text-3xl md:text-5xl font-semibold mb-16 font-display text-white">عزز رحلتك الروحانية</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">زيارات بدون عجلة</h3>
                                <p className="text-sm text-n-400 leading-relaxed font-light">على عكس حافلات المجموعات، نحن ننتظرك. سافر في سياراتنا الخاصة من نوع <Link href="/ar/fleet/gmc-yukon-xl" className="text-gold hover:text-white hover:underline decoration-gold/50">جي إم سي يوكون</Link> أو <Link href="/ar/fleet/hyundai-staria" className="text-gold hover:text-white hover:underline decoration-gold/50">هيونداي ستاريا</Link> وخذ وقتك للصلاة.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">السياق التاريخي</h3>
                                <p className="text-sm text-n-400 leading-relaxed font-light">يشاركك سائقونا تاريخ وأهمية المواقع التي تزورها.</p>
                            </div>
                            <div className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-gold/30 transition-all hover:bg-white/10 group">
                                <div className="bg-gold/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-gold border border-gold/20 group-hover:bg-gold group-hover:text-black transition-all">
                                    <Camera size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white">فرص التقاط الصور</h3>
                                <p className="text-sm text-n-400 leading-relaxed font-light">مرونة التوقف لالتقاط الصور في النقاط ذات المناظر الخلابة مثل الجبال المحيطة بمكة.</p>
                            </div>
                        </div>
                        <div className="mt-16">
                            <Link href="/ar/booking" className="inline-flex items-center btn-gold px-12 py-4 rounded-btn font-bold transition-all shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] hover:shadow-[0_0_30px_hsl(var(--gold-glow) / 0.5)] uppercase tracking-[0.2em] text-sm text-black hover:scale-105">
                                احجز جولة الزيارات الخاصة بك <ArrowRight size={20} className="mr-2 rotate-180" />
                            </Link>
                            <p className="mt-8 text-sm text-n-500 font-light">
                                هل تحتاج إلى السفر بين المدن؟ نحن نقدم أيضًا خدمات <Link href="/ar/services/makkah-madinah-taxi" className="text-gold hover:text-white transition-colors hover:underline decoration-gold/50">تاكسي من مكة إلى المدينة</Link>.
                            </p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={ziyaratFAQs} title="جولات الزيارات - الأسئلة الشائعة" />
            </div>
        </main>
    );
}
