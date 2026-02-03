import dynamic from 'next/dynamic';
import Link from 'next/link';

import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import { ArrowRight, Clock, ShieldCheck, Users, Star } from 'lucide-react';

import { getSectionContent, getSectionImage, getCustomField } from '@/lib/content-service';

import AnimatedBackground from '@/components/ui/AnimatedBackground';

// Lazy load heavy components
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
const ServiceDirectory = dynamic(() => import('@/components/home/ServiceDirectory'));
const MeetOurDrivers = dynamic(() => import('@/components/home/MeetOurDrivers'));
const ImpactStats = dynamic(() => import('@/components/about/ImpactStats'));
const FAQSection = dynamic(() => import('@/components/blog/FAQSection'));
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema } from "@/components/seo/schema-generator";

import { metaKeywords } from '@/data/seo-keywords';

export async function generateMetadata() {
  return {
    title: "Umrah Taxi Service Jeddah to Makkah | Trusted & Stress-Free",
    description: "Start your blessed journey with peace of mind. Al Kiswah provides reliable, VIP Umrah transport from Jeddah Airport to Makkah. Trusted by 50,000+ pilgrims.",
    alternates: {
      canonical: 'https://alkiswahumrahtransport.com',
    },
    keywords: [
      ...metaKeywords,
      "Jeddah to Makkah taxi price",
      "Haramain high speed railway transfer",
      "Mecca transport services",
      "Madinah airport taxi",
      "Al Kiswah Umrah Transport"
    ],
    openGraph: {
      title: "Umrah Taxi Service Jeddah to Makkah | Trusted & Stress-Free",
      description: "Start your blessed journey with peace of mind. Al Kiswah provides reliable, VIP Umrah transport from Jeddah Airport to Makkah. Trusted by 50,000+ pilgrims.",
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/fleet/gmc-yukon-studio.png',
          width: 1200,
          height: 630,
          alt: "Al Kiswah Umrah Transport Fleet",
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: "Umrah Taxi Service Jeddah to Makkah | Trusted & Stress-Free",
      description: "Start your blessed journey with peace of mind. Al Kiswah provides reliable, VIP Umrah transport from Jeddah Airport to Makkah. Trusted by 50,000+ pilgrims.",
      images: ['/images/fleet/gmc-yukon-studio.png'],
    }
  };
}

export default async function Home() {
  const heroSection = await getSectionContent('home-hero');
  // SEO Optimized Fallbacks - Humanized
  const heroTitle = heroSection?.title || "Your Trusted Companion for a Blessed Umrah Journey";
  // Styled Subtitle with Arabic
  const heroSubtitleText = heroSection?.subtitle || "Focus on your Ibadah, while we handle the road. Reliable, comfortable, and always on time—from Jeddah Airport to the Haram.";
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

  const heroImage = getSectionImage(heroSection, 'desktop') || "/images/blog-hero-professional.png";
  const ctaText = getCustomField(heroSection, 'cta_text') || "Book Your Ride";
  const ctaLink = getCustomField(heroSection, 'cta_link') || "/booking";
  const secondaryCtaText = "See Our Fleet";
  const secondaryCtaLink = "/fleet";

  return (
    <main className="overflow-x-hidden">
      {/* JSON-LD Structured Data */}
      <JsonLdScript schema={generateServiceSchema(
        "Umrah Taxi Services",
        "Premium and reliable taxi services for pilgrims between Jeddah, Makkah, and Madinah.",
        heroImage
      )} />

      {/* Hero Section */}
      <Hero
        title={heroTitle}
        subtitle={heroSubtitleContent}
        badge={heroBadge as any}
        bgImage={heroImage}
        layout="center"
        ctaText={ctaText}
        ctaLink={ctaLink}
        secondaryCtaText={secondaryCtaText}
        secondaryCtaLink={secondaryCtaLink}
        backgroundChildren={<AnimatedBackground />}
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

      {/* Transport Services Section - NEW */}
      <TransportServices />

      {/* Fleet Gallery - List View */}
      <FleetGallery />

      {/* Instant Price Calculator Section */}
      <InstantPriceCalculator />

      {/* Booking Guide Section - NEW */}
      <BookingGuide />

      {/* Features Section */}
      <Features />

      {/* Passenger Care Section */}
      <PassengerCare />

      {/* Fleet Carousel - NEW */}
      <HomeFleetCarousel />

      {/* Meet Our Drivers - NEW */}
      <MeetOurDrivers />

      {/* Real Fleet Showcase - NEW */}
      <RealFleetShowcase />

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

      {/* Safety Promise Section - Moved to Bottom */}
      <FadeIn>
        <SafetyPromise />
      </FadeIn>

      {/* SEO Service Directory - 600+ Keywords */}
      <ServiceDirectory />

      {/* Hotels and Districts Covered - NEW */}
      <HotelsAndDistricts />

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="relative py-6 md:py-24 bg-primary-black border-t border-white/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.png')] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-metallic/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6 drop-shadow-xl tracking-tight text-white">
              Start Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-primary via-gold-light to-gold-primary">Spiritual Journey</span> with Peace of Mind
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Don't worry about logistics. Book your private transfer now and let us serve you with the care you deserve.
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
      {/* Force Rebuild */}
    </main>
  );
}
