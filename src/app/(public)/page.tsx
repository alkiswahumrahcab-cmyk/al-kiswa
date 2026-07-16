import dynamic from 'next/dynamic';
import HomeHero from '@/components/home/HomeHero';
import HeroBookingWidget from '@/components/home/HeroBookingWidget';
import TrustBar from '@/components/trust/TrustBar';
import { getSectionContent, getCustomField } from '@/lib/content-service';
import { generateMetadataAlternates } from '@/lib/hreflang';

// Lazy load heavy components
import {
  HomeFleetCarousel,
  ReviewsSection
} from '@/components/home/LazyHomeSections';

const BookingGuide = dynamic(() => import('@/components/home/BookingGuide'));
const TransportServices = dynamic(() => import('@/components/home/TransportServices'));
const Features = dynamic(() => import('@/components/home/Features'));
const FAQSection = dynamic(() => import('@/components/blog/FAQSection'));
const SEOContentSectionFixed = dynamic(() => import('@/components/home/SEOContentSectionV3'));
const LatestArticles = dynamic(() => import('@/components/home/LatestArticles'));
const CtaBand = dynamic(() => import('@/components/home/CtaBand'));

import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema, generateLocalBusinessSchema } from "@/components/seo/schema-generator";

export async function generateMetadata() {
  return {
    title: "Umrah & Hajj Taxi Jeddah–Makkah–Madinah 2026 | Al Kiswah",
    description: "Book a private Umrah and Hajj taxi in Saudi Arabia. Trusted by 5,000+ pilgrims since 2014. Fixed prices, 24/7 support, GMC Yukon & Staria fleet. No prepayment required.",
    alternates: generateMetadataAlternates("/"),
    keywords: [
      "umrah taxi jeddah makkah madinah",
      "private umrah transport saudi arabia",
      "umrah cab service 2026",
      "trusted umrah transport company",
      "Jeddah Airport to Makkah taxi",
      "Mecca transport services",
      "Madinah airport taxi"
    ],
    openGraph: {
      title: "Umrah Taxi Jeddah–Makkah–Madinah | Al Kiswah",
      description: "Book a private Umrah taxi in Saudi Arabia. Trusted by 5,000+ pilgrims since 2014. Fixed prices, 24/7 support. GMC Yukon & Staria available.",
      url: "https://kiswahumrahcab.com",
      siteName: "Al Kiswah Umrah Transport",
      images: [
        {
          url: "https://kiswahumrahcab.com/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Al Kiswah Umrah Transport — Umrah Taxi Jeddah Makkah Madinah",
        },
      ],
      locale: "en_GB",
      alternateLocale: ["ar_SA"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Umrah Taxi Jeddah–Makkah–Madinah | Al Kiswah",
      description: "Private Umrah taxi from Jeddah Airport to Makkah. Ministry licensed. Fixed prices. 5★ rated.",
      images: ["https://kiswahumrahcab.com/images/og-image.jpg"],
    }
  };
}

export default async function Home() {
  const heroTitle = "Premium Umrah Chauffeur & Luxury Pilgrim Transport";
  const heroSubtitleText = "";
  const heroSubtitleContent = null;

  const heroImage = "/images/hero/homehero.jpeg";

  return (
    <main className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <JsonLdScript schema={generateLocalBusinessSchema()} />
      <JsonLdScript schema={generateServiceSchema(
        "Umrah Taxi Services",
        "Premium and reliable private umrah transport for pilgrims between Jeddah Airport, Makkah, and Madinah.",
        heroImage
      )} />

      {/* 1. Hero Section */}
      <HomeHero
        title={heroTitle}
        subtitle={heroSubtitleContent}
        imageSrc={heroImage}
      >
        <HeroBookingWidget />
      </HomeHero>

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. How it works */}
      <BookingGuide />

      {/* 4. Fleet */}
      <HomeFleetCarousel />

      {/* 5. Popular Routes */}
      <TransportServices />

      {/* 6. Why Al Kiswah */}
      <Features />

      {/* 7. Testimonials */}
      <ReviewsSection />

      {/* 8. FAQ */}
      <FAQSection />

      {/* 9. SEO Content Section */}
      <SEOContentSectionFixed />

      {/* 10. Latest Articles */}
      <LatestArticles />

      {/* 11. CTA Band */}
      <CtaBand />

    </main>
  );
}
