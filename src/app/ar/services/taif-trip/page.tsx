import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, Mountain, Trees, ShoppingBag, Shield, Users } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { LocationGrid } from '@/components/ziyarat/LocationGrid';
import { taifSites } from '@/data/ziyarat-locations';
import { FLEET, formatSeats } from '@/data/fleet';

const PRICE_MAP: Record<string, string> = {
    'toyota-camry': '٤٠٠ ريال',
    'hyundai-starex': '٤٠٠ ريال',
    'hyundai-staria': '٤٠٠ ريال',
    'toyota-hiace': '٥٠٠ ريال',
    'gmc-yukon-xl': '٦٠٠ ريال',
    'toyota-coaster': '١٢٠٠ ريال',
    'mitsubishi-xpander': '٤٠٠ ريال'
};

export const metadata: Metadata = {
    title: "رحلة يومية إلى الطائف ٢٠٢٦ — جولة خاصة من مكة | الكسوة",
    description: "اهرب من الحر برحلة يومية خاصة إلى الطائف من مكة. زيارة تلفريك الهدا، حدائق الورد، الشفا، والأسواق التقليدية. تبدأ من ٤٠٠ ريال.",
    keywords: [
        "رحلة الطائف", "من مكة إلى الطائف", "جولة الطائف من مكة", "تلفريك الهدا",
        "مزارع الورد بالطائف", "تاكسي خاص الطائف", "السياحة في الطائف", "الشفا الطائف",
        "رحلة جبلية الطائف", "سعر جولة الطائف", "مزارات مكة إلى الطائف"
    ],
    alternates: generateMetadataAlternates("/services/taif-trip"),
    openGraph: {
        title: "رحلة يومية إلى الطائف ٢٠٢٦ — جولة خاصة من مكة | الكسوة",
        description: "هروب جبلي طوال اليوم إلى حدائق الورد والتلفريك في الطائف. نقل خاص VIP ابتداءً من ٤٠٠ ريال.",
        images: [{ url: '/images/routes/taif.jpg', width: 1200, height: 630, alt: 'رحلة يومية إلى الطائف من مكة' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/ar/services/taif-trip`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "TouristTrip", "@id": `${pageUrl}#trip`,
            "name": "رحلة الطائف الجبلية — جولة الطبيعة والتراث",
            "description": "جولة خاصة ليوم كامل من مكة إلى الطائف تغطي تلفريك الهدا، حدائق الورد، جبل الشفا، السوق التقليدي، ومتنزه الردف.",
            "touristType": ["Umrah Pilgrim", "Tourist"],
            "itinerary": { "@type": "ItemList", "numberOfItems": 6, "itemListElement": taifSites.map((s, i) => ({ "@type": "ListItem", "position": i + 1, "name": s.name, "description": s.significance })) },
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332" },
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "400", "availability": "https://schema.org/InStock" },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "كم تستغرق رحلة الطائف اليومية؟", "acceptedAnswer": { "@type": "Answer", "text": "تستغرق الرحلة الكاملة عادة من ٨ إلى ١٠ ساعات بما في ذلك وقت القيادة من مكة. يمكنك قضاء اليوم بأكمله في الاستكشاف." } },
                { "@type": "Question", "name": "هل تذكرة التلفريك مشمولة في السعر؟", "acceptedAnswer": { "@type": "Answer", "text": "لا، يغطي سعرنا وسائل النقل الخاصة VIP والسائق طوال اليوم. يتم شراء تذاكر الدخول إلى معالم الجذب مثل التلفريك بشكل منفصل." } },
                { "@type": "Question", "name": "ما هو أفضل وقت لرؤية حدائق الورد؟", "acceptedAnswer": { "@type": "Answer", "text": "موسم حصاد الورد الطائفي الشهير يكون في الربيع (مارس إلى أبريل)، لكن الحدائق والمصانع جميلة للزيارة على مدار العام." } },
                { "@type": "Question", "name": "هل نحتاج إلى الإحرام للعودة إلى مكة من الطائف؟", "acceptedAnswer": { "@type": "Answer", "text": "إذا كنت تنوي أداء العمرة عند عودتك إلى مكة، يجب عليك الإحرام من الميقات (قرن المنازل). أما إذا كنت عائداً إلى فندقك فقط، فلا يلزم الإحرام." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": `${siteUrl}/ar` },
                { "@type": "ListItem", "position": 2, "name": "الخدمات", "item": `${siteUrl}/ar/services` },
                { "@type": "ListItem", "position": 3, "name": "رحلة الطائف", "item": pageUrl },
            ],
        },
    ],
};

const taifFAQs = [
    { question: "كم تستغرق رحلة الطائف اليومية؟", answer: "تستغرق الرحلة الكاملة عادة من ٨ إلى ١٠ ساعات بما في ذلك وقت القيادة من مكة. يمكنك قضاء اليوم بأكمله في الاستكشاف دون الشعور بالاستعجال." },
    { question: "هل تذكرة التلفريك مشمولة في السعر؟", answer: "لا، السعر يغطي سيارة النقل الخاصة (VIP) والوقود والرسوم والسائق ليوم كامل. تُشترى تذاكر الدخول مثل التلفريك وحديقة الحيوان بشكل منفصل." },
    { question: "ما هو أفضل وقت لزيارة مزارع الورد؟", answer: "موسم قطف الورد الطائفي الشهير يكون في الربيع (من مارس إلى أبريل)، لكن المزارع والمصانع تبقى جميلة وعطرة ومتاحة للزيارة طوال العام." },
    { question: "ما هي السيارات المتاحة لرحلة الطائف؟", answer: "السيارات المتاحة تشمل: " + FLEET.filter(v => v.bookable).map(v => `${v.name} (${formatSeats(v)}, ${PRICE_MAP[v.id] || 'تواصل معنا'})`).join('، ') + "." },
    { question: "هل نحتاج إلى الإحرام للعودة إلى مكة من الطائف؟", answer: "إذا كنت تنوي أداء العمرة فور عودتك لمكة، فيجب الإحرام من ميقات السيل الكبير (قرن المنازل). أما إذا كنت ستعود للفندق، فلا يلزم الإحرام." },
];

export default async function TaifTripPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=أنا%20مهتم%20برحلة%20الطائف%20اليومية`;

    return (
        <main className="min-h-screen bg-bg relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="رحلة يومية إلى الطائف"
                subtitle="اهرب من حرارة مكة واستمتع بأجواء جبلية منعشة. تلفريك الهدا، حدائق الورد، ومناظر تخطف الأنفاس."
                bgImage="/images/routes/taif.jpg"
                ctaText="احجز رحلتك"
                ctaLink={whatsappLink}
                layout="center"
                removeBlur={true}
                breadcrumbs={<Breadcrumbs />}
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-surface-alt border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {FLEET.filter(v => v.bookable).map((v, i) => (
                                <div key={v.id} className="bg-surface border border-border shadow-sm rounded-xl p-4 hover:shadow-md transition-all">
                                    <div className="text-gold-strong font-bold text-lg">{PRICE_MAP[v.id] || 'تواصل معنا'}</div>
                                    <div className="text-ink font-semibold text-sm mt-1">{v.name}</div>
                                    <div className="text-muted text-xs">{formatSeats(v)}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-center text-xs text-muted mt-4">جميع الأسعار للسيارة بالكامل • تشمل الوقود والرسوم وانتظار طوال اليوم • المدة: ٨-١٠ ساعات</p>
                        <SeasonalPricingNote className="mt-4" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Taif Attractions ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display mb-3 border-r-4 border-gold pr-4">
                            اكتشف مدينة الورد
                        </h2>
                        <p className="text-body font-light mb-8 mr-6 max-w-2xl text-lg">
                            جولتنا الخاصة في الطائف تغطي أجمل وأشهر المعالم في جبال الحجاز. اضغط على أي موقع لمعرفة المزيد.
                        </p>
                        <LocationGrid sites={taifSites} />
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-surface border-y border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-12 font-display text-ink">ملاذ جبلي مثالي</h2>
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
                            {[
                                { icon: <Mountain size={26} />, title: "مناخ معتدل", desc: "استمتع بهواء الجبال المنعش، المعتدل والأبرد بكثير من مكة." },
                                { icon: <Trees size={26} />, title: "الطبيعة والمتنزهات", desc: "استكشف جبل الشفا ومنتزه الردف لرحلات ونزهات عائلية جميلة." },
                                { icon: <ShoppingBag size={26} />, title: "الأسواق المحلية", desc: "تسوق العسل الأصلي والفواكه الطازجة ودهن الورد الطائفي." },
                                { icon: <Shield size={26} />, title: "خبراء الجبال", desc: "سائقونا ذوو خبرة عالية في القيادة عبر الطرق الجبلية المتعرجة بأمان." },
                                { icon: <Users size={26} />, title: "لجميع المجموعات", desc: "من الأزواج (كامري) إلى العائلات الكبيرة (كوستر) — لدينا السيارة المناسبة." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                    <div className="bg-surface-alt w-14 h-14 rounded-btn flex items-center justify-center mx-auto mb-4 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-ink">{f.title}</h3>
                                    <p className="text-xs text-body leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/ar/booking" className="inline-flex items-center bg-gold text-ink px-10 py-4 rounded-btn font-bold transition-all shadow-sm hover:shadow-md hover:bg-gold-light uppercase tracking-wider text-sm hover:scale-105">
                                احجز رحلتك للطائف <ArrowLeft size={18} className="mr-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-20 bg-surface-alt border-y border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-6 text-body leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-semibold text-ink font-display text-center mb-6">رحلة يومية خاصة إلى الطائف من مكة</h2>
                            <p>تقع <strong className="text-ink">مدينة الطائف</strong> في جبال الحجاز على ارتفاع يقارب ١٩٠٠ متر، وتعتبر العاصمة الصيفية غير الرسمية للمملكة العربية السعودية. تُعرف الطائف بلقب "مدينة الورد"، وهي توفر للحجاج والسياح ملاذاً بارداً ومثالياً من حرارة مكة المكرمة. نحن في <strong className="text-ink">شركة الكسوة لنقل المعتمرين</strong> نقدم رحلة جبلية يومية مخصصة تبدأ من <strong className="text-ink">٤٠٠ ريال</strong> فقط.</p>
                            <p>الرحلة بحد ذاتها مذهلة حيث ستسافر عبر طريق <strong className="text-ink">جبل الهدا</strong> المتعرج، مروراً بمجموعات من القردة البرية وإطلالات خلابة على الوادي. بمجرد وصولك للطائف، يمكنك ركوب <strong className="text-ink">التلفريك</strong> الشهير، زيارة <strong className="text-ink">قصر شبرا</strong> التاريخي، والتجول في <strong className="text-ink">سوق الطائف المركزي</strong> لشراء العسل المحلي والفواكه الطازجة.</p>
                            <p>لا تكتمل أي رحلة إلى الطائف دون زيارة <strong className="text-ink">مزارع الورد</strong>. في كل ربيع، تزهر أكثر من ٩٠٠ مزرعة بالورد الدمشقي الشهير الذي يُحصد لإنتاج ماء وعطر الورد الثمين المستخدم في تعطير الكعبة المشرفة. سواء اخترت السفر في سيارة <Link href="/ar/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline">تويوتا كامري</Link> مريحة أو <Link href="/ar/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline">هيونداي ستاريا</Link> واسعة، فإن سائقينا المحترفين يضمنون لك رحلة آمنة وسلسة لا تُنسى تستغرق من ٨ إلى ١٠ ساعات.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={taifFAQs} title="رحلة الطائف - الأسئلة الشائعة" />
            </div>
        </main>
    );
}
