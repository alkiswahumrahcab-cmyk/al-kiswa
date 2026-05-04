import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import WelcomeSection from '@/components/about/WelcomeSection';
import CompanyStory from '@/components/about/CompanyStory';
import MissionVision from '@/components/about/MissionVision';
import CoreValues from '@/components/about/CoreValues';
import TrustSection from '@/components/about/TrustSection';
import SEOContent from '@/components/about/SEOContent';
import ImpactStats from '@/components/about/ImpactStats';
import TeamTeaser from '@/components/about/TeamTeaser';
import PilgrimVoices from '@/components/about/PilgrimVoices';
import { getSectionContent, getSectionImage } from '@/lib/content-service';
import dynamic from 'next/dynamic';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateAboutPageSchema } from '@/components/seo/schema-generator';
import type { Metadata } from 'next';

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "من نحن | الكسوة لنقل المعتمرين | أفضل شركة نقل في مكة",
        description: "الكسوة لنقل المعتمرين — شركة نقل معتمرين موثوقة ومرخصة في مكة المكرمة. أكثر من ١٠ سنوات من الخدمة. نقل خاص من مطار جدة إلى مكة والمدينة المنورة بأسعار ثابتة.",
        keywords: [
            "من نحن الكسوة لنقل المعتمرين",
            "أفضل شركة نقل معتمرين في السعودية",
            "شركة تاكسي عمرة مرخصة مكة",
            "نقل خاص من جدة إلى مكة",
            "سيارات VIP للمعتمرين",
            "نقل مطار جدة مكة المكرمة",
            "رحلات العمرة والحج",
            "مؤسسة الكسوة مكة",
            "About Al Kiswah Umrah Transport",
            "Best Umrah taxi company Saudi Arabia",
        ],
        alternates: {
            ...generateMetadataAlternates("/about"),
            canonical: "https://kiswahumrahcab.com/ar/about",
        },
        openGraph: {
            title: "من نحن | الكسوة لنقل المعتمرين",
            description: "موثوق من آلاف الحجاج والمعتمرين. نقل خاص وآمن في مكة المكرمة والمدينة المنورة.",
            url: "https://kiswahumrahcab.com/ar/about",
            type: "website",
            locale: "ar_SA",
            images: [{ url: "https://kiswahumrahcab.com/images/og-image.jpg", width: 1200, height: 630 }],
        },
    };
}

export default async function ArabicAboutPage() {
    const section = await getSectionContent('about-hero');
    const bgImage = getSectionImage(section, 'desktop') || "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=2000&auto=format&fit=crop";

    return (
        <main className="min-h-screen bg-primary-black relative" dir="rtl" lang="ar">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <JsonLdScript schema={generateAboutPageSchema()} />
            <div className="contents relative z-10">
                <Hero
                    title="من نحن — الكسوة لنقل المعتمرين"
                    subtitle="نخدم ضيوف الرحمن منذ أكثر من عشر سنوات بنقل خاص وآمن وموثوق بين جدة ومكة المكرمة والمدينة المنورة"
                    bgImage={bgImage}
                />
                <div className="relative z-10 space-y-12 pb-20">
                    <WelcomeSection />
                    <ImpactStats />
                    <CompanyStory />
                    <MissionVision />
                    <CoreValues />
                    <TrustSection />
                    <HotelsAndDistricts />
                    <TeamTeaser />
                    <PilgrimVoices />
                    <SEOContent />
                </div>
            </div>
        </main>
    );
}