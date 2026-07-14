import dynamic from 'next/dynamic';
import Link from 'next/link';

import FadeIn from '@/components/common/FadeIn';
import Hero from '@/components/common/Hero';
import { PremiumIcon } from '@/components/ui/PremiumIcon';
import { ArrowRight } from 'lucide-react';
import { getSectionContent, getSectionImage, getCustomField } from '@/lib/content-service';
import AnimatedBackground from '@/components/ui/AnimatedBackgroundClient';
import { generateMetadataAlternates } from '@/lib/hreflang';

// Lazy load heavy components
import {
  InstantPriceCalculator,
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
const BookingGuide = dynamic(() => import('@/components/home/BookingGuide'));
const MeetOurDrivers = dynamic(() => import('@/components/home/MeetOurDrivers'));
const ImpactStats = dynamic(() => import('@/components/about/ImpactStats'));
const FAQSection = dynamic(() => import('@/components/blog/FAQSection'));
import { arFaqs } from '@/data/faqs';
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateServiceSchema, generateFAQSchema } from "@/components/seo/schema-generator";

export async function generateMetadata() {
  return {
    title: "الكسوة لنقل المعتمرين | تاكسي من مطار جدة إلى مكة | موثوق من أكثر من ٥٠٠٠ حاج",
    description: "خدمة نقل معتمرين مرخصة وخاصة بين جدة ومكة المكرمة والمدينة المنورة. أسعار ثابتة. تقييم ٥ نجوم. مرخص من وزارة الحج والعمرة.",
    alternates: {
      ...generateMetadataAlternates("/"),
      canonical: "https://kiswahumrahcab.com/ar/",
    },
    openGraph: {
      title: "الكسوة لنقل المعتمرين — موثوق من أكثر من ٥٠٠٠ حاج",
      description: "تاكسي عمرة خاص. مطار جدة ← مكة ← المدينة. ١٠+ سنوات · ٥ نجوم · مرخص وزارياً.",
      url: "https://kiswahumrahcab.com/ar/",
      siteName: "الكسوة لنقل المعتمرين",
      images: [
        {
          url: "https://kiswahumrahcab.com/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "الكسوة لنقل المعتمرين — تاكسي من مطار جدة إلى مكة المكرمة",
        },
      ],
      locale: "ar_SA",
      alternateLocale: ["en_GB", "fr_FR", "de_DE"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "الكسوة لنقل المعتمرين | موثوق من أكثر من ٥٠٠٠ حاج",
      description: "تاكسي عمرة خاص من مطار جدة إلى مكة المكرمة. أسعار ثابتة. تقييم ٥ نجوم.",
      images: ["https://kiswahumrahcab.com/images/og-image.jpg"],
    }
  };
}

export default async function ArabicHomePage() {
  const heroSection = await getSectionContent('home-hero');
  const heroImage = getSectionImage(heroSection, 'desktop') || "/images/blog-hero-professional.png";

  return (
    <main className="overflow-x-hidden" dir="rtl" lang="ar">
      {/* JSON-LD Structured Data */}
      <JsonLdScript schema={generateServiceSchema(
        "خدمات تاكسي العمرة",
        "خدمة نقل فاخرة وموثوقة للمعتمرين بين جدة ومكة المكرمة والمدينة المنورة.",
        heroImage
      )} />
      <JsonLdScript schema={generateFAQSchema(arFaqs)} />

      {/* Hero Section - Arabic */}
      <Hero
        title="رفيقكم الأمين في رحلة العمرة المباركة"
        subtitle="ركزوا على عبادتكم ونحن نتكفل بالطريق. خدمة خاصة وموثوقة من مطار جدة إلى الحرم الشريف."
        bgImage={heroImage}
        layout="center"
        ctaText="احجز رحلتك الآن"
        ctaLink="/ar/booking"
        secondaryCtaText="شاهد أسطولنا"
        secondaryCtaLink="/ar/fleet"
        backgroundChildren={<AnimatedBackground />}
        trustBadge={{
          count: "+٥٠٠٠",
          label: "حاج سعيد"
        }}
        stats={[
          { label: "الأمان أولاً", value: "١٠٠٪", icon: <PremiumIcon name="safety" size="default" /> },
          { label: "دعم على مدار الساعة", value: "دائماً", icon: <PremiumIcon name="24-7-service" size="default" /> },
          { label: "خدمة موثوقة", value: "+١٠ سنوات", icon: <PremiumIcon name="reviews" size="default" /> }
        ]}
      />

      {/* Transport Services Section */}
      <TransportServices lang="ar" />

      {/* Fleet Gallery */}
      <FleetGallery />

      {/* Instant Price Calculator Section */}
      <InstantPriceCalculator />

      {/* Booking Guide Section */}
      <BookingGuide lang="ar" />

      {/* Features Section */}
      <Features lang="ar" />

      {/* Passenger Care Section */}
      <PassengerCare lang="ar" />

      {/* Fleet Carousel */}
      <HomeFleetCarousel />

      {/* Meet Our Drivers */}
      <MeetOurDrivers lang="ar" />

      {/* Real Fleet Showcase */}
      <RealFleetShowcase />

      {/* Impact Stats */}
      <ImpactStats lang="ar" />

      {/* Gallery Section */}
      <GallerySection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* SEO Content Section */}
      <SEOContentSectionFixed />

      {/* Latest Articles Section */}
      <LatestArticles lang="ar" />

      {/* FAQ Section */}
      <FAQSection lang="ar" />

      {/* Safety Promise Section */}
      <FadeIn>
        <SafetyPromise lang="ar" />
      </FadeIn>

      {/* Hotels and Districts Covered */}
      <HotelsAndDistricts />

      {/* CTA Section */}
      <section className="relative py-6 md:py-24 bg-charcoal border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('/pattern.png')] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gold-metallic/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-semibold font-display mb-6 drop-shadow-xl tracking-tight text-white">
              ابدأ <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold">رحلتك الروحانية</span> بسلام واطمئنان
            </h2>
            <p className="text-lg md:text-xl text-n-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
              لا تقلق من أمر اللوجستيات. احجز رحلتك الخاصة الآن ودعنا نخدمكم بالرعاية التي تستحقونها.
            </p>
            <Link
              href="/ar/booking"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-gold-dark text-black font-bold px-10 py-5 rounded-btn text-lg shadow-[0_0_20px_hsl(var(--gold-glow) / 0.3)] hover:shadow-[0_0_40px_hsl(var(--gold-glow) / 0.5)] hover:scale-105 transition-all duration-300 uppercase tracking-wider"
            >
              احجز الآن <ArrowRight size={22} className="rotate-180" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
