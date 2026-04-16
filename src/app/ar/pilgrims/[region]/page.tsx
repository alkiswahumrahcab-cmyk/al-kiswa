import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Hero from '@/components/common/Hero';
import FadeIn from '@/components/common/FadeIn';
import { ShieldCheck, MapPin, UserCheck, Star, Plane } from 'lucide-react';
import Link from 'next/link';
import { regions, getRegionById } from '@/data/regions';
import { generateMetadataAlternates } from '@/lib/hreflang';

interface Params {
    params: {
        region: string;
    };
}

export async function generateStaticParams() {
    return regions.map((region) => ({
        region: region.id,
    }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const region = getRegionById(params.region);
    
    if (!region) {
        return {
            title: "توصيل المعتمرين | الكسوة"
        };
    }

    return {
        title: `تاكسي عمرة للمعتمرين من ${region.name} | الكسوة للنقل`,
        description: `وصولك إلى جدة؟ يثق بنا أكثر من ${region.trustCount} حاج ومعتمر من ${region.name}. احجز وسيلة نقل موثوقة الآن.`,
        keywords: [
            `تاكسي عمرة ${region.name}`,
            `استقبال في مطار جدة ${region.nationality}`,
        ],
        alternates: {
            ...generateMetadataAlternates(`/pilgrims/${region.id}`),
            canonical: `https://kiswahumrahcab.com/ar/pilgrims/${region.id}`
        },
        openGraph: {
            title: `نقل المعتمرين كبار الشخصيات من ${region.name}`,
            description: `يثق بنا أكثر من ${region.trustCount} معتمر. احجز نقلك المضمون السعر اليوم.`,
            images: [region.heroBg],
            type: "website",
        }
    };
}

export default function ArabicRegionalLandingPage({ params }: Params) {
    const region = getRegionById(params.region);

    if (!region) {
        notFound();
    }

    const { name, nationality, popularOrigin, heroBg, trustCount } = region;

    // JSON-LD Schema
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": `نقل المعتمرين للقادمين من ${name}`,
        "description": `خدمة نقل معتمرين فاخرة تخدم القادمين من ${name}.`,
        "publisher": {
            "@type": "Organization",
            "name": "Al Kiswah Umrah Transport"
        },
        "audience": {
            "@type": "Audience",
            "audienceType": "Pilgrims",
            "geographicArea": {
                "@type": "Country",
                "name": name
            }
        }
    };

    return (
        <main className="bg-primary-black text-white relative min-h-screen" dir="rtl">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <Hero
                title={`أهلاً بضيوف الرحمن من ${name}`}
                subtitle={`شريكك الموثوق لنقل العمرة. انضم إلى ${trustCount} معتمر آخر من ${name} اختاروا خدماتنا الفاخرة بأسعار ثابتة.`}
                bgImage={heroBg}
                ctaText="احجز النقل الآن"
                ctaLink="/ar/booking"
                alt={`Premium Umrah Transport for ${nationality} Pilgrims`}
            />

            <section className="relative z-10 -mt-12 mb-16 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <div className="bg-neutral-900/90 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gold-primary/30 flex flex-col md:flex-row justify-center items-center gap-8 text-right">
                        <div className="flex items-center gap-3">
                            <Plane className="text-gold-primary min-w-[24px]" />
                            <p className="text-sm font-medium">خدمة الرحلات القادمة من <span className="text-white font-bold">{popularOrigin}</span></p>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/20"></div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="text-green-500 min-w-[24px]" />
                            <p className="text-sm font-medium">نقل آمن ومرخص</p>
                        </div>
                        <div className="hidden md:block w-px h-8 bg-white/20"></div>
                        <div className="flex items-center gap-3">
                            <Star className="text-yellow-400 min-w-[24px]" />
                            <p className="text-sm font-medium">يثق بنا {trustCount}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
