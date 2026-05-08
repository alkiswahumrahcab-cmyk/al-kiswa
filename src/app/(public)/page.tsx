import dynamic from 'next/dynamic';
import Link from 'next/link';

import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import { ArrowRight, Clock, ShieldCheck, Star } from 'lucide-react';
import { getSectionContent, getSectionImage, getCustomField } from '@/lib/content-service';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { generateMetadataAlternates } from '@/lib/hreflang';

// Lazy load heavy components
import {
  InstantPriceCalculator,
  FleetCarouselWrapper,
  ReviewsSection,
  GallerySection,
  HomeFleetCarousel,
  HotelsAndDistricts,
  RealFleetShowcase,
  FleetGallery
} from '@/components/home/LazyHomeSections';

const Features = dynamic(() => import('@/components/home/Features'));
const SafetyPromise = dynamic(() => import('@/components/home/SafetyPromise'));
const PassengerCare = dynamic(() => import('@/components/home/PassengerCare'));
const LatestArticles = dynamic(() => import('@/components/home/LatestArticles'));
const SEOContentSectionFixed = dynamic(() => import('@/components/home/SEOContentSectionV3'));
const TransportServices = dynamic(() => import('@/components/home/TransportServices'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const BookingGuide = dynamic(() => import('@/components/home/BookingGuide'));

const ImpactStats = dynamic(() => import('@/components/about/ImpactStats'));
const FAQSection = dynamic(() => import('@/components/blog/FAQSection'));
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema, generateLocalBusinessSchema } from "@/components/seo/schema-generator";
import { metaKeywords } from '@/data/seo-keywords';

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
  const heroSection = await getSectionContent('home-hero');
  const heroTitle = "Your Trusted Umrah Taxi in Jeddah, Makkah & Madinah";
  const heroSubtitleText = "Book your private umrah transport with our licensed drivers. Direct transfers from Jeddah Airport to your hotel in Makkah or Madinah at a guaranteed fixed price. We own our vehicles—meaning no middlemen, no hidden aggregator fees, just premium wholesale rates directly for you.";
  const heroSubtitleContent = (
    <>
      <span className="block opacity-90">{heroSubtitleText}</span>
    </>
  );

  const heroBadge = (
    <div className="flex flex-col items-center">
      <div className="w-12 h-[1px] bg-gold-primary/50 mb-4" />
      <h2
        className="block text-2xl md:text-3xl text-gold-primary font-bold tracking-[0.1em] mb-4"
        style={{ fontFamily: 'var(--font-reem-kufi)' }}
        lang="ar"
        dir="rtl"
      >
        رفيقكم الأمين في رحلة العمرة
      </h2>
    </div>
  );

  const heroImage = "/images/haram-hero.webp";
  const ctaText = getCustomField(heroSection, 'cta_text') || "Book Your Ride";
  const ctaLink = getCustomField(heroSection, 'cta_link') || "/booking";
  const secondaryCtaText = "See Our Fleet";
  const secondaryCtaLink = "/fleet";

  return (
    <main className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <JsonLdScript schema={generateLocalBusinessSchema()} />
      <JsonLdScript schema={generateServiceSchema(
        "Umrah Taxi Services",
        "Premium and reliable private umrah transport for pilgrims between Jeddah Airport, Makkah, and Madinah.",
        heroImage
      )} />

      {/* Hajj 2026 Banner */}
      <div className="bg-gold-primary text-black py-2.5 px-4 text-center z-40 relative">
        <p className="text-sm font-semibold flex items-center justify-center gap-2 flex-wrap">
          <span className="animate-pulse">🕋</span>
          Planning for Hajj 2026? 
          <Link href="/blog/hajj-2026-guidance-taxi-service-pilgrims" className="underline decoration-2 underline-offset-2 hover:text-white transition-colors">
            Read our complete transport & preparation guide here &rarr;
          </Link>
        </p>
      </div>

      {/* Hero Section */}
      <Hero
        title={heroTitle}
        subtitle={heroSubtitleContent}
        badge={heroBadge as any}
        bgImage={heroImage}
        layout="center"
        isSpiritual={true}
        ctaText={ctaText}
        ctaLink={ctaLink}
        secondaryCtaText={secondaryCtaText}
        secondaryCtaLink={secondaryCtaLink}
        trustBadge={{
          count: "50K+",
          label: "Happy Pilgrims"
        }}
        stats={[
          { label: "Safety First", value: "100%", icon: <ShieldCheck size={20} /> },
          { label: "24/7 Support", value: "Always", icon: <Clock size={20} /> },
          { label: "Trusted Service", value: "10+ Yrs", icon: <Star size={20} /> }
        ]}
      />

      {/* Transport Services Section */}
      <TransportServices />

      {/* Fleet Carousel */}
      <HomeFleetCarousel />

      {/* Instant Price Calculator Section */}
      <InstantPriceCalculator />

      {/* Booking Guide Section */}
      <BookingGuide />

      {/* Features Section */}
      <Features />

      {/* Passenger Care Section */}
      <PassengerCare />



      {/* Real Fleet Showcase */}
      <RealFleetShowcase />

      {/* Fleet Gallery - List View */}
      <FleetGallery />

      {/* Impact Stats - Authority */}
      <ImpactStats />

      {/* Gallery Section */}
      <GallerySection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* SEO Content Section */}
      <SEOContentSectionFixed />

      {/* Latest Articles Section */}
      <LatestArticles />

      {/* FAQ Section - Trust */}
      <FAQSection />

      {/* Safety Promise Section */}
      <FadeIn>
        <SafetyPromise />
      </FadeIn>

      {/* Hotels and Districts Covered */}
      <HotelsAndDistricts />

      {/* CTA Section */}
      <section className="relative py-6 md:py-24 bg-primary-black border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.png')] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-metallic/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6 drop-shadow-xl tracking-tight text-white">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary">Spiritual Journey</span> with Peace of Mind
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Don&apos;t worry about logistics. Book your private transfer now and let us serve you with the care you deserve.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold-primary to-gold-dark text-black font-bold px-10 py-5 rounded-full text-lg shadow-[0_0_20px_rgba(239,191,91,0.3)] hover:shadow-[0_0_40px_rgba(239,191,91,0.5)] hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              Book Your Ride Now <ArrowRight size={22} />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
