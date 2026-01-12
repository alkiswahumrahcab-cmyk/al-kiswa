import dynamic from 'next/dynamic';
import Link from 'next/link';

import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import BookingFormWrapper from '@/components/home/BookingFormWrapper';
import { ArrowRight, Clock, ShieldCheck, Users, Star } from 'lucide-react';

import { getSectionContent, getSectionImage, getCustomField } from '@/lib/content-service';

import AnimatedBackground from '@/components/ui/AnimatedBackground';

// Lazy load heavy components
const InstantPriceCalculator = dynamic(() => import('@/components/home/InstantPriceCalculator'));
const Features = dynamic(() => import('@/components/home/Features'));
const SafetyPromise = dynamic(() => import('@/components/home/SafetyPromise'));
const PassengerCare = dynamic(() => import('@/components/home/PassengerCare'));
const FleetCarouselWrapper = dynamic(() => import('@/components/home/FleetCarouselWrapper'));
const ReviewsSection = dynamic(() => import('@/components/reviews/ReviewsSection'));
const CustomerGallery = dynamic(() => import('@/components/home/CustomerGallery'));
const LatestArticles = dynamic(() => import('@/components/home/LatestArticles'));
const SEOContentSection = dynamic(() => import('@/components/home/SEOContentSection'));
const TransportServices = dynamic(() => import('@/components/home/TransportServices'));
const Testimonials = dynamic(() => import('@/components/home/Testimonials'));
const FleetGallery = dynamic(() => import('@/components/home/FleetGallery'));
const BookingGuide = dynamic(() => import('@/components/home/BookingGuide'));

export async function generateMetadata() {
  return {
    title: "Umrah Transport Services Saudi Arabia | Taxi Jeddah to Makkah",
    description: "Book trusted Umrah taxi services. Private GMC Yukon & Hyundai Staria transfers from Jeddah Airport to Makkah & Madinah. Official licensed transport company.",
    alternates: {
      canonical: 'https://alkiswahumrahtransport.com',
    },
    keywords: [
      "Umrah Transport Services", "Taxi Jeddah Airport to Makkah",
      "Taxi Makkah to Madinah", "VIP Umrah Taxi", "Jeddah Airport Transfer",
      "GMC Yukon Booking Makkah", "Saudi Transport Company",
      "تاكسي مطار جدة", "نقل معتمرين", "توصيل من مكة للمدينة", "حجز جمس يوكن"
    ],
    openGraph: {
      title: "Umrah Transport Services Saudi Arabia | VIP Taxi Jeddah to Makkah",
      description: "Book trusted private taxi from Jeddah Airport to Makkah. Luxury GMC Yukon & Hyundai Staria fleet. Official licensed service.",
    }
  };
}

export default async function Home() {
  const heroSection = await getSectionContent('home-hero');
  // SEO Optimized Fallbacks
  const heroTitle = heroSection?.title || "Seamless Umrah Transport, Rooted in Trust";
  // Styled Subtitle with Arabic
  const heroSubtitleText = heroSection?.subtitle || "Premium journeys designed for comfort, care, and spiritual alignment.";
  const heroSubtitleContent = (
    <>
      <span className="block opacity-90">{heroSubtitleText}</span>
    </>
  );

  const heroBadge = (
    <div className="flex flex-col items-center">
      <div className="w-12 h-[1px] bg-gold/50 mb-4" />
      <h2
        className="block text-2xl md:text-4xl text-gold font-bold tracking-[0.2em] mb-4"
        style={{ fontFamily: 'var(--font-reem-kufi)' }}
        lang="ar"
        dir="rtl"
      >
        خدمة نقل المعتمرين VIP
      </h2>
    </div>
  );

  const heroImage = getSectionImage(heroSection, 'desktop') || "/images/blog-hero-professional.png";
  const ctaText = getCustomField(heroSection, 'cta_text') || "Book Your Journey";
  const ctaLink = getCustomField(heroSection, 'cta_link') || "/booking";
  const secondaryCtaText = "Explore Services";
  const secondaryCtaLink = "/services";

  return (
    <main className="overflow-x-hidden">
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
          count: "30K+",
          label: "Happy Pilgrims"
        }}
        fleetImages={[
          "/images/fleet/gmc-yukon-hero-professional.png", // Center Hero
          "/images/fleet/hiace-hero-professional.png",     // Left
          "/images/fleet/staria-hero-professional.png",    // Right
          "/images/fleet/camry-hero-professional.png"      // Extra (maybe unused/hidden for now)
        ]}
        stats={[
          { label: "Punctual & Safe", value: "100%", icon: <ShieldCheck size={20} /> },
          { label: "Direct Support", value: "24/7", icon: <Clock size={20} /> },
          { label: "Years Experience", value: "7+", icon: <Star size={20} /> }
        ]}
      />

      {/* Transport Services Section - NEW */}
      <TransportServices />

      {/* Instant Price Calculator Section */}
      <InstantPriceCalculator />

      {/* Booking Guide Section - NEW */}
      <BookingGuide />

      {/* Features Section */}
      <Features />

      {/* Passenger Care Section */}
      <PassengerCare />

      {/* Fleet Gallery - NEW */}
      <FleetGallery />

      {/* Fleet Section */}
      <FadeIn>
        <FleetCarouselWrapper />
      </FadeIn>

      {/* Gallery Section */}
      <CustomerGallery />

      {/* Testimonials Section */}
      <Testimonials />
      {/* Reviews Section */}
      <ReviewsSection />

      {/* SEO Content Section */}
      <SEOContentSection />

      {/* Latest Articles Section */}
      <LatestArticles />

      {/* Safety Promise Section - Moved to Bottom */}
      <FadeIn>
        <SafetyPromise />
      </FadeIn>

      {/* CTA Section */}
      {/* CTA Section */}
      <section className="relative py-24 bg-primary-black border-t border-white/10 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.png')] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-bold font-sans mb-6 drop-shadow-xl tracking-tight text-white">
              Ready for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F3D383] to-[#D4AF37]">Spiritual Journey?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              Book your VIP transport now and let us take care of the logistics while you focus on your worship.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[#D4AF37] to-[#B4932F] text-black font-bold px-10 py-5 rounded-full text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] hover:scale-105 transition-all duration-300 uppercase tracking-wider"
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
