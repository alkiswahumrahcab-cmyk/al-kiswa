import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import WelcomeSection from '@/components/about/WelcomeSection';
import CompanyStory from '@/components/about/CompanyStory';
import MissionVision from '@/components/about/MissionVision';
import CoreValues from '@/components/about/CoreValues';
import TrustSection from '@/components/about/TrustSection';
import CredentialsSection from '@/components/about/CredentialsSection';
import SEOContent from '@/components/about/SEOContent';
import ImpactStats from '@/components/about/ImpactStats';
import TeamTeaser from '@/components/about/TeamTeaser';
import PilgrimVoices from '@/components/about/PilgrimVoices';
import { getSectionContent, getSectionImage } from '@/lib/content-service';
import dynamic from 'next/dynamic';
import NusukTrustStrip from '@/components/trust/NusukTrustStrip';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateAboutPageSchema } from '@/components/seo/schema-generator';

const HotelsAndDistricts = dynamic(() => import('@/components/home/HotelsAndDistricts'));

export async function generateMetadata() {
    return {
        title: "About Us: Premier VIP Umrah Transport | Al Kiswah",
        description: "Learn about Al Kiswah Umrah Transport. We provide VIP Jeddah Airport transfers, Makkah to Madinah transport, and a reliable fleet for 5,000+ pilgrims.",
        keywords: [
            "about al kiswah transport", 
            "umrah transport company",
            "makkah to madinah transfer", 
            "vip umrah transfers", 
            "pilgrim transport services",
            "من نحن", 
            "مؤسسة الكسوة لنقل المعتمرين"
        ],
        openGraph: {
            title: "About Us: Premier VIP Umrah Transport | Al Kiswah",
            description: "Trusted by thousands for safe and comfortable Umrah transport. From Jeddah Airport to Makkah hotels and Ziyarat tours.",
            url: "https://kiswahumrahcab.com/about",
            siteName: "Al Kiswah",
            images: [{ url: "/images/about-og.jpg", width: 1200, height: 630, alt: "Al Kiswah Transport Fleet" }],
            type: "website",
        },
        alternates: generateMetadataAlternates("/about"),
    };
}

export default async function AboutPage() {
    const section = await getSectionContent('about-hero');
    const title = section?.title || "About Al Kiswah Transport";
    const subtitle = section?.subtitle || "Serving Guests of Allah with VIP Transport & Reliable Airport Transfers";
    const bgImage = getSectionImage(section, 'desktop') || "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=2000&auto=format&fit=crop";

    return (
        <main className="min-h-screen bg-primary-black relative">
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />
            <JsonLdScript schema={generateAboutPageSchema()} />
            <div className="contents relative z-10">
                <Hero
                    title={title}
                    subtitle={subtitle}
                    bgImage={bgImage}
                    breadcrumbs={<Breadcrumbs />}
                />

                {/* Wrap content in a relative div to ensure it sits above the background pattern */}
                <div className="relative z-10 space-y-12 pb-20">
                    <WelcomeSection />
                    <NusukTrustStrip />
                    <ImpactStats />
                    <CompanyStory />
                    <MissionVision />
                    <CoreValues />
                    <TrustSection />
                    <CredentialsSection />
                    <HotelsAndDistricts />
                    <TeamTeaser />
                    <PilgrimVoices />
                    <SEOContent />
                </div>
            </div>
        </main>
    );
}