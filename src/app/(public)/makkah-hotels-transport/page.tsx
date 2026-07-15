import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import HotelsAndDistricts from '@/components/home/HotelsAndDistricts';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateServiceSchema } from '@/components/seo/schema-generator';

export async function generateMetadata() {
    return {
        title: "Makkah Hotels Transport | Al Kiswah Umrah Taxi",
        description: "Private transfers to all major Makkah hotels and districts. Reliable, fixed-price Umrah taxi service directly to your accommodation.",
        keywords: [
            "makkah hotels transport", 
            "taxi to makkah hotel",
            "umrah transport to accommodation", 
            "makkah districts taxi"
        ],
        openGraph: {
            title: "Makkah Hotels Transport | Al Kiswah Umrah Taxi",
            description: "Direct transport from Jeddah Airport to your Makkah hotel.",
            url: "https://kiswahumrahcab.com/makkah-hotels-transport",
            siteName: "Al Kiswah",
            type: "website",
        },
        alternates: generateMetadataAlternates("/makkah-hotels-transport"),
    };
}

export default function MakkahHotelsTransportPage() {
    return (
        <main className="min-h-screen bg-surface text-ink relative">
            <JsonLdScript schema={generateServiceSchema(
                "Makkah Hotels Transport",
                "Private transport to all major Makkah hotels and districts from Jeddah Airport.",
                "https://kiswahumrahcab.com/images/og-image.jpg"
            )} />
            
            <Hero
                title="Makkah Hotels Transport"
                subtitle="Direct, hassle-free transfers to your accommodation in the holy city."
                bgImage="/images/haram-hero.webp"
                breadcrumbs={<Breadcrumbs />}
            />

            <div className="relative z-10 space-y-12 pb-20 pt-10">
                <HotelsAndDistricts />
            </div>
        </main>
    );
}
