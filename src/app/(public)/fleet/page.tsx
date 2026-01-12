import Hero from '@/components/common/Hero';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Suspense } from 'react';
import FleetShowcaseLoader from '@/components/fleet/FleetShowcaseLoader';
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
    };
}

export default async function FleetPage() {
    const section = await getSectionContent('fleet-hero');

    const title = section?.title || "Our Premium Fleet";
    const subtitle = section?.subtitle || "Experience luxury and comfort with our diverse range of vehicles, tailored for your spiritual journey.";
    const bgImage = getSectionImage(section, 'desktop') || "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2000&auto=format&fit=crop";
    const badge = getCustomField(section, 'badge_text') || "Premium Collection 2025";

    return (
        <main className="min-h-screen bg-primary-black relative text-white">
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
                />
                <FadeIn>
                    <Suspense fallback={<div className="h-[800px] w-full bg-neutral-900 animate-pulse rounded-xl" />}>
                        <FleetShowcaseLoader />
                    </Suspense>
                </FadeIn>
                <FadeIn>
                    <ComparisonTable />
                </FadeIn>
                <FadeIn>
                    <FeatureHighlights />
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
