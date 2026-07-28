import { generateMetadataAlternates } from "@/lib/hreflang";
import type { Metadata } from "next";
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Map, Briefcase, Stethoscope, ShieldCheck, Clock, UserCheck, Car } from 'lucide-react';
import FAQSection from '@/components/services/FAQSection';
import { getSettings } from '@/lib/settings-storage';
import FleetCarouselWrapper from '@/components/home/FleetCarouselWrapper';
import FadeIn from "@/components/common/FadeIn";
import SeasonalPricingNote from '@/components/common/SeasonalPricingNote';
import { FLEET, formatSeats } from '@/data/fleet';

const HOURLY_PRICE_MAP: Record<string, string> = {
    'toyota-camry': '٨٠ ريال/ساعة',
    'hyundai-starex': '١٠٠ ريال/ساعة',
    'hyundai-staria': '١٠٠ ريال/ساعة',
    'toyota-hiace': '١٥٠ ريال/ساعة',
    'gmc-yukon-xl': '١٥٠ ريال/ساعة',
    'toyota-coaster': '٣٠٠ ريال/ساعة',
    'mitsubishi-xpander': '٨٠ ريال/ساعة'
};

export const metadata: Metadata = {
    title: "تأجير سيارة مع سائق بالساعة في مكة والمدينة | الكسوة",
    description: "استأجر سيارة خاصة VIP مع سائق محترف بالساعة. مثالية للتسوق، الأعمال، المواعيد الطبية، أو المزارات المخصصة. الحد الأدنى ٤ ساعات.",
    keywords: [
        "سائق بالساعة مكة", "تأجير سيارة مع سائق المدينة", "تأجير سيارات بالساعة السعودية",
        "سائق خاص VIP مكة", "سيارة بالساعة المدينة", "توصيل تسوق مكة",
        "مزارات مخصصة مكة", "سائق لرجال الأعمال السعودية"
    ],
    alternates: generateMetadataAlternates("/services/hourly-chauffeur"),
    openGraph: {
        title: "تأجير سيارة مع سائق بالساعة في مكة والمدينة | الكسوة",
        description: "استأجر سيارة خاصة VIP مع سائق محترف بالساعة. مثالية للتسوق والأعمال.",
        images: [{ url: '/images/routes/hourly-chauffeurs.jpg', width: 1200, height: 630, alt: 'تأجير سيارة مع سائق بالساعة' }]
    }
};

const siteUrl = "https://www.kiswahumrahcab.com";
const pageUrl = `${siteUrl}/ar/services/hourly-chauffeur`;

const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Service", "@id": `${pageUrl}#service`,
            "name": "خدمة السائق الخاص بالساعة",
            "description": "خدمة تأجير سيارات VIP مع سائق محترف بالساعة في مكة والمدينة للتسوق والأعمال والمزارات. الحد الأدنى للطلب هو 4 ساعات.",
            "provider": { "@type": "LocalBusiness", "@id": `${siteUrl}/#business`, "name": "Al Kiswah Umrah Transport", "telephone": "+966548707332" },
            "areaServed": ["Makkah", "Madinah", "Jeddah"],
            "offers": { "@type": "Offer", "priceCurrency": "SAR", "price": "80", "priceSpecification": { "@type": "UnitPriceSpecification", "referenceQuantity": { "@type": "QuantitativeValue", "value": "1", "unitCode": "HUR" } } },
        },
        {
            "@type": "FAQPage", "@id": `${pageUrl}#faq`,
            "mainEntity": [
                { "@type": "Question", "name": "ما هو الحد الأدنى لوقت الحجز؟", "acceptedAnswer": { "@type": "Answer", "text": "الحد الأدنى لمدة الحجز هو ٤ ساعات لجميع خدمات السائق الخاص بالساعة." } },
                { "@type": "Question", "name": "هل يمكن للسائق انتظاري أثناء التسوق؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم! هذا هو الغرض الأساسي من الخدمة. سيقوم السائق بتوصيلك، والانتظار في موقف السيارات، وسيكون جاهزاً متى ما انتهيت." } },
                { "@type": "Question", "name": "هل يمكنني استخدام الخدمة بالساعة للسفر بين المدن؟", "acceptedAnswer": { "@type": "Answer", "text": "تم تصميم الخدمة بالساعة للتنقل داخل نفس المدينة (مثلاً داخل مكة أو داخل المدينة). يتم احتساب السفر بين المدن كمسار نقل قياسي في اتجاه واحد." } },
                { "@type": "Question", "name": "هل يتحدث السائقون الإنجليزية أو الأوردو؟", "acceptedAnswer": { "@type": "Answer", "text": "نعم، نوفر سائقين محترفين يجيدون التحدث بالإنجليزية والعربية والأوردو لضمان تواصل سلس خلال فترة حجزك." } },
            ],
        },
        {
            "@type": "BreadcrumbList", "@id": `${pageUrl}#breadcrumb`,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": `${siteUrl}/ar` },
                { "@type": "ListItem", "position": 2, "name": "الخدمات", "item": `${siteUrl}/ar/services` },
                { "@type": "ListItem", "position": 3, "name": "سائق بالساعة", "item": pageUrl },
            ],
        },
    ],
};

const hourlyFAQs = [
    { question: "ما هو الحد الأدنى لوقت الحجز؟", answer: "الحد الأدنى لمدة الحجز هو ٤ ساعات لجميع خدمات السائق الخاص بالساعة." },
    { question: "هل يمكن للسائق انتظاري أثناء التسوق؟", answer: "نعم! هذا هو الغرض الأساسي من الخدمة. سيقوم السائق بتوصيلك، والانتظار في موقف السيارات، وسيكون جاهزاً فور انتهائك للذهاب إلى وجهتك التالية." },
    { question: "هل يمكنني استخدام الخدمة بالساعة للسفر بين المدن؟", answer: "تم تصميم الخدمة بالساعة للتنقل داخل نفس المدينة (مثل داخل مكة أو جدة أو المدينة). للسفر بين المدن، يرجى حجز مسارات النقل بين المدن القياسية لدينا." },
    { question: "هل يتحدث السائقون لغات أخرى؟", answer: "نعم، سائقونا مهذبون ومحترفون ويجيدون التحدث باللغة الإنجليزية والعربية والأوردو لضمان تواصل سلس وتجربة مريحة." },
    { question: "هل يشمل السعر رسوم الوقود والمواقف؟", answer: "الوقود مشمول بالكامل في السعر بالساعة. ومع ذلك، فإن رسوم المواقف المدفوعة (مثل مواقف المراكز التجارية) تقع على عاتق الراكب إذا طلب من السائق الوقوف بالداخل." },
];

export default async function HourlyChauffeurPage() {
    const settings = await getSettings();
    const phoneNumber = settings.contact.phone;
    const whatsappLink = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=أنا%20مهتم%20بحجز%20سائق%20خاص%20بالساعة`;

    return (
        <main className="min-h-screen bg-bg relative" dir="rtl">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <Hero
                title="تأجير سيارة مع سائق بالساعة"
                subtitle="استمتع بمرونة مطلقة مع خدمات السائق الخاص بالساعة. الخيار الأمثل للتسوق، والأعمال، والمزارات المخصصة."
                bgImage="/images/routes/hourly-chauffeurs.jpg"
                ctaText="احجز سائقك الآن"
                ctaLink={whatsappLink}
                layout="center"
                removeBlur={true}
                breadcrumbs={<Breadcrumbs />}
            />

            {/* ── Pricing Overview ── */}
            <section className="py-12 bg-surface-alt border-b border-border relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-display text-ink font-semibold">أسعار التأجير بالساعة حسب السيارة</h2>
                            <p className="text-muted text-sm mt-2">الحد الأدنى لمدة الحجز: <span className="font-semibold text-gold-strong">٤ ساعات</span></p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                            {FLEET.filter(v => v.bookable).map((v, i) => (
                                <div key={v.id} className="bg-surface border border-border shadow-sm rounded-xl p-4 hover:shadow-md transition-all">
                                    <div className="text-gold-strong font-bold text-lg" dir="ltr">{HOURLY_PRICE_MAP[v.id] || 'تواصل معنا'}</div>
                                    <div className="text-ink font-semibold text-sm mt-1">{v.name}</div>
                                    <div className="text-muted text-xs">{formatSeats(v)}</div>
                                </div>
                            ))}
                        </div>
                        <SeasonalPricingNote className="mt-6" />
                    </FadeIn>
                </div>
            </section>

            {/* ── Perfect For (Use Cases) ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <h2 className="text-3xl md:text-4xl font-semibold text-ink font-display text-center mb-16">الخيار الأمثل لاحتياجاتك</h2>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { icon: <ShoppingBag size={32} />, title: "جولات التسوق", desc: "تسوق براحة في أسواق مكة أو جدة. سيقوم سائقك بالانتظار في سيارة مكيفة ومريحة حتى تنتهي." },
                                { icon: <Map size={32} />, title: "مزارات مخصصة", desc: "اذهب حيث تريد واقضِ ما تشاء من الوقت في مساجد محددة أو مواقع تاريخية دون أي استعجال." },
                                { icon: <Briefcase size={32} />, title: "اجتماعات الأعمال", desc: "صل إلى اجتماعاتك بأناقة واحترافية. سينتظرك السائق ليكون جاهزاً لنقلك إلى موعدك التالي." },
                                { icon: <Stethoscope size={32} />, title: "المواعيد الطبية", desc: "نقل مريح وخالٍ من التوتر لزيارات المستشفى. نضمن رحلة سلسة ومريحة للمرضى وعائلاتهم." },
                            ].map((item, i) => (
                                <div key={i} className="bg-surface border border-border p-8 rounded-2xl hover:border-gold/40 hover:shadow-gold transition-all duration-300 group">
                                    <div className="text-gold mb-6 transform group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-ink mb-3">{item.title}</h3>
                                    <p className="text-body font-light leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Why Choose Us ── */}
            <section className="py-20 bg-surface-alt border-y border-border relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <FadeIn delay={0.2}>
                        <h2 className="text-3xl md:text-4xl font-semibold mb-12 font-display text-ink">معايير الكسوة</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                            {[
                                { icon: <UserCheck size={26} />, title: "سائقون محترفون", desc: "مهذبون، ملتزمون بالمواعيد، وعلى دراية تامة بطرق المدينة." },
                                { icon: <Car size={26} />, title: "أسطول نقي", desc: "سيارات نظيفة جداً، خالية من التدخين، ومكيفة بشكل مثالي." },
                                { icon: <Clock size={26} />, title: "مرونة في الانتظار", desc: "خذ وقتك بالكامل. السيارة تحت تصرفك طوال المدة المحجوزة." },
                                { icon: <ShieldCheck size={26} />, title: "من الباب للباب", desc: "استقبال مباشر من بهو فندقك وتوصيل دقيق إلى وجهتك." },
                            ].map((f, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-bg border border-border hover:border-gold/30 hover:shadow-gold transition-all group">
                                    <div className="bg-surface w-14 h-14 rounded-btn flex items-center justify-center mx-auto mb-4 text-gold-strong border border-border group-hover:bg-gold group-hover:text-ink transition-all">
                                        {f.icon}
                                    </div>
                                    <h3 className="text-base font-bold mb-2 text-ink">{f.title}</h3>
                                    <p className="text-xs text-body leading-relaxed font-light">{f.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12">
                            <Link href="/ar/booking" className="inline-flex items-center bg-gold text-ink px-10 py-4 rounded-btn font-bold transition-all shadow-sm hover:shadow-md hover:bg-gold-light uppercase tracking-wider text-sm hover:scale-105">
                                احجز سائقك الآن <ArrowLeft size={18} className="mr-2" />
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── SEO Content ── */}
            <section className="py-20 bg-bg relative z-10">
                <div className="container mx-auto px-4">
                    <FadeIn>
                        <div className="max-w-4xl mx-auto space-y-6 text-body leading-relaxed font-light">
                            <h2 className="text-2xl md:text-3xl font-semibold text-ink font-display text-center mb-6">خدمة السائق الخاص VIP في السعودية</h2>
                            <p>للذين يبحثون عن الخصوصية المطلقة والمرونة التامة، تقدم <strong className="text-ink">شركة الكسوة لنقل المعتمرين</strong> خدمة حصرية لتأجير السيارات مع سائق بالساعة في جميع أنحاء مكة المكرمة والمدينة المنورة وجدة. بخلاف تأجير السيارات التقليدي، نوفر لك سيارة فاخرة وسائقاً محترفاً ومخصصاً لك، مما يعفيك من عناء القيادة أو البحث عن مواقف.</p>
                            <p>تُعد خدمة التأجير بالساعة الحل الأمثل <strong className="text-ink">لجولات التسوق</strong>، حيث تتيح لك ترك مشترياتك بأمان في السيارة بينما تواصل جولتك. كما أنها شائعة جداً بين <strong className="text-ink">رجال الأعمال</strong> الذين يحتاجون لتنقل موثوق بين الاجتماعات، وللعائلات التي تفضل <strong className="text-ink">مزارات مخصصة</strong> بعيداً عن الاستعجال.</p>
                            <p>بحد أدنى للحجز يبلغ ٤ ساعات فقط، يمكنك حجز <Link href="/ar/fleet/toyota-camry" className="text-gold-strong hover:text-gold hover:underline">سيارة سيدان مريحة</Link> أو <Link href="/ar/fleet/hyundai-staria" className="text-gold-strong hover:text-gold hover:underline">سيارة عائلية واسعة</Link> تناسب حجم مجموعتك. اختبر قمة الضيافة السعودية مع سائقينا الملتزمين بالمواعيد وأسطولنا النقي.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <FleetCarouselWrapper />

            <div className="relative z-10">
                <FAQSection items={hourlyFAQs} title="تأجير سيارة مع سائق - الأسئلة الشائعة" />
            </div>
        </main>
    );
}
