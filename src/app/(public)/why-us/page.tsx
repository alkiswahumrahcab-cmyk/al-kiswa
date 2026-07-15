import { generateMetadataAlternates } from "@/lib/hreflang";
import React from 'react';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import SafetyPromise from '@/components/home/SafetyPromise';
import PassengerCare from '@/components/home/PassengerCare';
import Features from '@/components/home/Features';
import { JsonLdScript } from '@/components/seo/JsonLd';
import { generateServiceSchema } from '@/components/seo/schema-generator';

export async function generateMetadata() {
    return {
        title: "Why Choose Al Kiswah | Premium Umrah Transport",
        description: "Discover why 5,000+ pilgrims trust Al Kiswah for their Umrah and Hajj transport in Saudi Arabia. Our safety promise, passenger care, and features.",
        keywords: [
            "why al kiswah", 
            "umrah transport safety",
            "premium pilgrim care", 
            "reliable umrah taxi"
        ],
        openGraph: {
            title: "Why Choose Al Kiswah | Premium Umrah Transport",
            description: "Safety, comfort, and reliability. Read our safety promise and passenger care standards.",
            url: "https://kiswahumrahcab.com/why-us",
            siteName: "Al Kiswah",
            type: "website",
        },
        alternates: generateMetadataAlternates("/why-us"),
    };
}

export default function WhyUsPage() {
    return (
        <main className="min-h-screen bg-surface text-ink relative">
            <JsonLdScript schema={generateServiceSchema(
                "Premium Umrah Transport Guarantee",
                "Our safety promise and passenger care standards for Umrah transport.",
                "https://kiswahumrahcab.com/images/og-image.jpg"
            )} />
            
            <Hero
                title="Why Choose Al Kiswah"
                subtitle="Your safety, comfort, and peace of mind are our highest priorities."
                bgImage="/images/haram-hero.webp"
                breadcrumbs={<Breadcrumbs />}
            />

            <div className="relative z-10 space-y-12 pb-20 pt-10">
                <Features />
                <SafetyPromise />
                <PassengerCare />
            </div>
        </main>
    );
}
