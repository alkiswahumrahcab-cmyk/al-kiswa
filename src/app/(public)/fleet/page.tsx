import FleetOfferGallery from '@/components/fleet/FleetOfferGallery';
import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Suspense } from 'react';
import ComparisonTable from '@/components/fleet/ComparisonTable';
import FeatureHighlights from '@/components/fleet/FeatureHighlights';
import QuickBookingForm from '@/components/home/QuickBookingForm';
import FadeIn from '@/components/common/FadeIn';
import { getSectionContent, getSectionImage, getCustomField } from '@/lib/content-service';

export async function generateMetadata() {
    return {
        title: "Umrah Taxi Fleet 2025 | Book GMC Yukon & Hyundai Staria",
        description: "Explore our premium Umrah taxi fleet. Book a luxury GMC Yukon XL, family Hyundai Staria, or Toyota Hiace for your journey in Saudi Arabia.",
        keywords: [
            "Umrah Taxi Fleet", "GMC Yukon Booking", "Hyundai Staria Rental",
            "Toyota Hiace Bus Makkah", "Luxury Car Rental Saudi Arabia", "Family Umrah Transport",
            "أسطول نقل المعتمرين", "حجز جمس يوكن", "تأجير باص هيونداي"
        ],
        alternates: {
            canonical: 'https://alkiswahumrahtransport.com/fleet',
        },
        openGraph: {
            title: "Premium Umrah Taxi Fleet 2025 | GMC, Toyota, Hyundai",
            description: "Browse our luxury fleet for Umrah transport. From GMC Yukon XL for VIPs to Toyota Coaster for groups. Book reliable transport in Makkah & Madinah.",
            url: 'https://alkiswahumrahtransport.com/fleet',
            siteName: 'Al Kiswah Umrah Transport',
            images: [
                {
                    url: '/images/fleet/fleet-group-hero.png',
                    width: 1200,
                    height: 630,
                    alt: 'Al Kiswah Fleet Collection',
                },
            ],
            type: 'website',
        },
    };
}

const fleetJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "GMC Yukon XL",
            "url": "https://alkiswahumrahtransport.com/fleet/gmc-yukon-at4"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Toyota Hiace",
            "url": "https://alkiswahumrahtransport.com/fleet/toyota-hiace"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Hyundai Staria",
            "url": "https://alkiswahumrahtransport.com/fleet/hyundai-staria"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "Toyota Coaster",
            "url": "https://alkiswahumrahtransport.com/fleet/toyota-coaster"
        },
        {
            "@type": "ListItem",
            "position": 5,
            "name": "Toyota Camry",
            "url": "https://alkiswahumrahtransport.com/fleet/toyota-camry"
        }
    ]
};

export default async function FleetPage() {
    const section = await getSectionContent('fleet-hero');

    const title = section?.title || "Our Premium Fleet";
    const subtitle = section?.subtitle || "Experience luxury and comfort with our diverse range of vehicles, tailored for your spiritual journey.";
    const bgImage = getSectionImage(section, 'desktop') || "/images/fleet/fleet-group-hero.png";
    const badge = getCustomField(section, 'badge_text') || "Premium Collection 2025";

    return (
        <main className="min-h-screen bg-primary-black relative text-white">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(fleetJsonLd) }}
            />
            <div className="fixed inset-0 bg-[url('/pattern.png')] opacity-5 mix-blend-overlay pointer-events-none z-0" />

            <div className="relative z-10">
                <Hero
                    title={title}
                    subtitle={subtitle}
                    bgImage={bgImage}
                    ctaText="Book Your Ride"
                    ctaLink="/booking"
                    badge={badge}
                    breadcrumbs={<Breadcrumbs />}
                    fleetImages={[
                        '/images/fleet/gmc-yukon-studio.png',     // Center
                        '/images/fleet/toyota-hiace-studio.png',  // Left
                        '/images/fleet/hyundai-staria-studio.png' // Right
                    ]}
                />

                {/* New Fleet Offer Gallery */}
                <FadeIn>
                    <FleetOfferGallery />
                </FadeIn>

                <FadeIn>
                    <FeatureHighlights />
                </FadeIn>
                <FadeIn>
                    <ComparisonTable />
                </FadeIn>

                <section className="py-20 bg-gradient-to-t from-black to-transparent">
                    <div className="container mx-auto px-4">
                        <FadeIn direction="up">
                            <div className="max-w-4xl mx-auto">
                                <QuickBookingForm
                                    title="Book Your Luxury Ride"
                                    subtitle="Reserve your premium vehicle for a comfortable spiritual journey"
                                    variant="default" // Using default as fleet variant might look different? or stick to what they had. Default looks good in black.
                                />
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </main>
    );
}
