import { generateMetadataAlternates } from "@/lib/hreflang";
import React, { Suspense } from 'react';
import Link from 'next/link';
import { Bus, MapPin, Users, Headphones, ArrowRight, Calendar, CheckCircle, Car, Check } from 'lucide-react';
import FleetSectionLoader from '@/components/services/FleetSectionLoader';
import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import FAQSection from '@/components/services/FAQSection';
import TrustAmenities from '@/components/services/TrustAmenities';
import ReviewsSection from '@/components/reviews/ReviewsSection';
import dynamic from 'next/dynamic';

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export async function generateMetadata() {
    return {
        title: "خدمات تاكسي العمرة وجولات المزارات | جدة، مكة، المدينة",
        description: "خدمات نقل العمرة الشاملة: استقبال مطار جدة، تاكسي من مكة إلى المدينة، وجولات المزارات التاريخية. خدمة موثوقة على مدار الساعة.",
        keywأوds: [
            "Umrah Taxi Services", "Ziyarat Tours Makkah", "Intercity Transfers Saudi",
            "Jeddah Airpأوt Pickup", "Madinah Ziyarat", "Makkah to Madinah Taxi",
            "خدمات نقل المعتمرين", "زيارات المدينة المنورة", "توصيل مطار جدة"
        ],
        alternates: {
    ...generateMetadataAlternates("/services"),
    canonical: "https://kiswahumrahcab.com/ar/services",
  },
    };
}

const processSteps = [
    {
        title: "احجز عبر الإنترنت",
        description: "اختر سيارتك وحدد موعد الاستقبال ببضع نقرات فقط.",
        icon: <Calendar size={24} />
    },
    {
        title: "احصل على التأكيد",
        description: "احصل على تأكيد فوري مع تفاصيل السائق ورابط التتبع.",
        icon: <CheckCircle size={24} />
    },
    {
        title: "استمتع بالرحلة",
        description: "سافر براحة وأمان إلى وجهتك.",
        icon: <Car size={24} />
    }
];

export default function ServicesPage() {
    const services = [
        {
            title: 'تاكسي وسيارة خاصة من مكة إلى المدينة',
            description: 'نقل فاخر بين المدن المقدسة. استمتع برحلة مريحة لمسافة 450 كم في مجموعة واسعة من السيارات بما في ذلك جي إم سي يوكن وهيونداي H1.',
            image: '/images/routes/makkah-to-madinah-transfer.jpg',
            link: '/services/makkah-madinah-taxi',
            features: ['خدمة من الباب للباب', 'خيارات الأسطول الفاخر', 'متوسط الوقت 4.5 ساعة'],
            alt: 'Makkah to Madinah Intercity Private Taxi App Map'
        },
        {
            title: 'تاكسي مطار جدة إلى مكة',
            description: 'استقبال معتمد من سلطات المطار بدون متاعب. سيستقبلك سائقنا في صالة الوصول بمطار جدة لنقل سلس إلى فندقك في مكة أو الحرم.',
            image: '/images/hero/jeddah-airport-to-makkah.jpg',
            link: '/services/jeddah-airpأوt-transfer',
            features: ['تتبع الرحلات', 'استقبال وترحيب مجاني', 'مساعدة في الأمتعة'],
            alt: 'Jeddah Airpأوt (KAIA) to Makkah Hotel Transfer Driver Chauffeur'
        },
        {
            title: 'تأجير سيارة مع سائق بالساعة',
            description: 'استمتع بمرونة مطلقة مع خدمات السائق الخاص بالساعة. الخيار الأمثل للتسوق، والأعمال، والمزارات المخصصة.',
            image: '/images/routes/hourly-chauffeurs.jpg',
            link: '/services/hourly-chauffeur',
            features: ['مسار مرن', 'سائق خاص تحت تصرفك', 'الحد الأدنى 4 ساعات'],
            alt: 'Hourly Chauffeur Service VIP Car'
        },
        {
            title: 'جولات المزارات في مكة والمدينة',
            description: 'باقات مزارات شاملة للأماكن المقدسة. قم بزيارة مسجد قباء وجبل أحد وجبل النور وغيرها من المعالم الإسلامية التاريخية مع سائقين ذوي خبرة.',
            image: '/images/hero/pilgrims-walking-makkah-haram.jpg',
            link: '/services/ziyarat-tours',
            features: ['مسار مخصص', 'معرفة محلية خبيرة', 'ساعات مرنة'],
            alt: 'Makkah and Madinah Historical Ziyarat Tour Mountains and Mosques'
        }
    ];

    const serviceFAQs = [
        {
            question: "كيف أحجز تاكسي من مطار جدة إلى مكة؟",
            answer: <span>الحجز بسيط. يمكنك حجز <Link href="/ar/services/jeddah-airpأوt-transfer" className="text-gold hover:text-white transition-colors hover:underline">تاكسي مطار جدة إلى مكة</Link> عبر الإنترنت مسبقًا. نحن نراقب وصول رحلتك ويقابلك سائقنا في المبنى بلوحة اسم.</span>
        },
        {
            question: "ما هي أفضل وسيلة نقل لعائلات العمرة؟",
            answer: <span>للعائلات، نوصي بشدة بـ <Link href="/ar/fleet/gmc-yukon-xl" className="text-gold hover:text-white transition-colors hover:underline">جي إم سي يوكن XL</Link> أو <Link href="/ar/fleet/hyundai-staria" className="text-gold hover:text-white transition-colors hover:underline">هيونداي ستاريا</Link>. توفر هذه السيارات الواسعة مساحة كبيرة للأمتعة وراحة تكييف الهواء لرحلة الساعة الواحدة إلى مكة.</span>
        },
        {
            question: "هل تقدمون خدمات تاكسي مباشرة من مكة إلى المدينة؟",
            answer: <span>نعم، يعتبر <Link href="/ar/services/makkah-madinah-taxi" className="text-gold hover:text-white transition-colors hover:underline">التاكسي الخاص من مكة إلى المدينة</Link> service is the most convenient option. Unlike the train أو bus, we offer doأو-to-doأو service from your Makkah hotel lobby directly to your Madinah hotel.</span>
        },
        {
            question: "هل يمكنني التوقف في الميقات في الطريق إلى مكة؟",
            answer: "Absolutely. If you are travelling from Madinah أو Jeddah, our drivers are happy to stop at the designated Miqat (e.g., Bir Ali أو Juhfah) for you to assume Ihram and pray."
        },
        {
            question: "Is the taxi fare fixed أو metered?",
            answer: <span>أسعارنا ثابتة وشفافة. ستعرف التكلفة الدقيقة لـ <Link href="/ar/booking" className="text-gold hover:text-white transition-colors hover:underline">Umrah transport booking</Link> upfront, with no hidden fees أو toll charges.</span>
        },
        {
            question: "هل تقدمون جولات المزارات في مكة والمدينة؟",
            answer: <span>نعم، نحن نقدم <Link href="/ar/services/ziyarat-tours" className="text-gold hover:text-white transition-colors hover:underline">باقات المزارات الشاملة</Link>. Visit histأوical sites like Jabal Al-Nour, Masjid Quba, and Mount Uhud in the comfort of a private vehicle with a knowledgeable driver.</span>
        }
    ];

    return (
        <main className="min-h-screen bg-charcoal relative">
            <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none fixed" />

            {/* Hero Section */}
            <Hero
                title="Trusted Umrah Transpأوt Services in Saudi Arabia"
                subtitle="From Jeddah Airpأوt pickup to Ziyarat tours, we provide safe, affordable, and comfortable taxi services for pilgrims."
                bgImage="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2000&auto=format&fit=crop"
                ctaText="احجز رحلتك"
                ctaLink="/booking"
                secondaryCtaText="اتصل بنا"
                secondaryCtaLink="/contact"
                breadcrumbs={<Breadcrumbs />}
                alt="Jeddah Airpأوt to Makkah & Madinah Umrah Taxi Services Fleet"
            />

            {/* Trust Amenities Section */}
            <TrustAmenities />

            {/* Services Section */}
            <section className="py-24 relative z-10">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-center text-white mb-20">
                            خدماتنا <span className="text-gold">المتميزة</span>
                        </h2>
                    </FadeIn>
                    <div className="flex flex-col gap-24 px-4 max-w-7xl mx-auto">
                        {services.map((service, index) => {
                            const isImageRight = index % 2 !== 0;

                            return (
                                <FadeIn key={index} delay={index * 0.1}>
                                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 group">
                                        {/* Image Side */}
                                        <div className={`w-full lg:w-1/2 relative h-[400px] lg:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 z-10" />
                                            <img
                                                src={service.image}
                                                alt={service.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Content Side */}
                                        <div className={`w-full lg:w-1/2 flex flex-col justify-center ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
                                            <div className="mb-6">
                                                <h3 className="text-3xl lg:text-4xl font-display font-semibold text-white mb-6 leading-tight group-hover:text-gold transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <div className="h-1.5 w-24 bg-gold rounded-full shadow-[0_0_15px_hsl(var(--gold-glow) / 0.4)]" />
                                            </div>

                                            <p className="text-n-400 text-lg leading-relaxed mb-8 font-light">
                                                {service.description}
                                            </p>

                                            {/* Benefits List */}
                                            <ul className="mb-10 space-y-4">
                                                {service.features.map((feat, i) => (
                                                    <li key={i} className="flex items-center gap-4 text-n-300 font-medium text-lg">
                                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold flex items-center justify-center border border-gold/20">
                                                            <Check size={16} strokeWidth={3} />
                                                        </span>
                                                        {feat}
                                                    </li>
                                                ))}
                                            </ul>

                                            <Link
                                                href={service.link}
                                                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-white font-bold uppercase tracking-widest rounded-btn transition-all duration-300 group/link self-start"
                                            >
                                                Explأوe Details
                                                <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </div>
                                </FadeIn>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-24 relative bg-deep-black border-y border-white/5">
                <div className="container">
                    <FadeIn>
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-center text-white mb-20">How It Wأوks</h2>
                    </FadeIn>
                    <div className="grid md:grid-cols-3 gap-12 relative px-4">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent border-t border-dashed border-white/10" />

                        {processSteps.map((step, index) => (
                            <FadeIn key={index} delay={index * 0.2} direction="up">
                                <div className="flex flex-col items-center text-center relative z-10 group">
                                    <div className="w-32 h-32 rounded-btn bg-neutral-900 border border-white/10 flex items-center justify-center mb-8 relative group-hover:border-gold/50 transition-colors duration-300">
                                        <div className="absolute inset-2 rounded-btn border border-dashed border-white/10 group-hover:border-gold/30 animate-spin-slow" />
                                        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center text-gold shadow-[0_0_20px_hsl(var(--gold-glow) / 0.2)]">
                                            {step.icon}
                                        </div>
                                        <div className="absolute -top-3 -right-3 w-10 h-10 bg-gold text-black font-bold rounded-full flex items-center justify-center border-4 border-deep-black shadow-lg">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
                                    <p className="text-n-400 leading-relaxed max-w-xs">{step.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fleet Showcase */}
            <section className="py-24 relative">
                <FadeIn>
                    <div className="text-center mb-16">
                        <span className="text-gold font-bold tracking-[0.2em] uppercase text-sm">خدماتنا Fleet</span>
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-white mt-4">سافر بأناقة</h2>
                    </div>
                    <Suspense fallback={<div className="h-[400px] w-full bg-white/5 animate-pulse rounded-3xl" />}>
                        <FleetSectionLoader />
                    </Suspense>
                </FadeIn>
            </section>

            {/* Reviews Section */}
            <ReviewsSection />

            {/* FAQSection */}
            <FAQSection items={serviceFAQs} title="الأسئلة الشائعة" />

            {/* Hotels and Districts Covered */}
            <HotelsAndDistricts />

            {/* Booking CTA */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gold/80 z-0">
                    <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20 mix-blend-multiply" />
                </div>
                <div className="container relative z-10 text-center">
                    <FadeIn>
                        <blockquote className="text-3xl md:text-5xl font-serif text-black font-bold mb-12 max-w-4xl mx-auto leading-tight">
                            &ldquo;Your journey of faith deserves comfort and care.&rdquo;
                        </blockquote>
                        <Link
                            href="/ar/booking"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-black text-gold hover:bg-neutral-900 font-bold uppercase tracking-widest rounded-btn shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            احجز رحلتك الآن
                            <ArrowRight size={20} />
                        </Link>
                    </FadeIn>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.أوg",
                        "@type": "Service",
                        "serviceType": "Umrah Transpأوt",
                        "provider": {
                            "@type": "TranspأوtationService",
                            "name": "Al Kiswah Transpأوt"
                        },
                        "areaServed": {
                            "@type": "Place",
                            "name": "Saudi Arabia"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Transpأوt Services",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Pilgrim Transpأوt Makkah and Madinah"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Jeddah Airpأوt to Makkah Transpأوt"
                                    }
                                }
                            ]
                        }
                    })
                }}
            />
        </main>
    );
}
