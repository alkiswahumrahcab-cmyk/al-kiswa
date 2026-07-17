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
    <main className="overflow-x-hidden bg-bg" dir="rtl" lang="ar">
      {/* JSON-LD Structured Data */}
      <JsonLdScript schema={generateServiceSchema(
        "خدمات تاكسي العمرة",
        "خدمة نقل فاخرة وموثوقة للمعتمرين بين جدة ومكة المكرمة والمدينة المنورة.",
        heroImage
      )} />
      <JsonLdScript schema={generateFAQSchema(arFaqs)} />

      {/* 2. Hero Section - Arabic */}
      {/* Hero incorporates the Trust Bar internally or directly below. We'll pass the InstantPriceCalculator as children if supported, or place it right after with negative margin. */}
      <Hero
        title="رفيقكم الأمين في رحلة العمرة المباركة"
        subtitle="ركزوا على عبادتكم ونحن نتكفل بالطريق. خدمة خاصة وموثوقة من مطار جدة إلى الحرم الشريف."
        bgImage={heroImage}
        layout="center"
        backgroundChildren={<AnimatedBackground />}
      />

      {/* Booking Widget (Overlapping Hero) */}
      <div className="-mt-16 md:-mt-24 relative z-20 container px-4 mb-12">
        <InstantPriceCalculator />
      </div>

      {/* 3. Trust Bar */}
      <div className="container px-4 mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted font-ar-body">
        <div className="flex items-center gap-2">
          <div className="flex text-gold">
            {[...Array(5)].map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
          </div>
          <span className="font-semibold text-ink">٤.٩/٥</span>
        </div>
        <div className="hidden md:block w-1 h-1 rounded-full bg-border-strong"></div>
        <span>موثوق من أكثر من ١٠,٠٠٠ معتمر</span>
        <div className="hidden md:block w-1 h-1 rounded-full bg-border-strong"></div>
        <span>معتمدون من منصة نسك ووزارة الحج</span>
      </div>

      {/* 4. How it Works */}
      <section className="py-16 md:py-32 bg-surface-alt">
        <BookingGuide lang="ar" />
      </section>

      {/* 5. Fleet */}
      <section className="py-16 md:py-32 bg-bg">
        <HomeFleetCarousel lang="ar" />
      </section>

      {/* 6. Popular Routes */}
      <section className="py-16 md:py-32 bg-surface-alt">
        <TransportServices lang="ar" />
      </section>

      {/* 7. Why Al Kiswah (Consolidated Features) */}
      <section className="py-16 md:py-32 bg-bg">
        <Features lang="ar" />
        {/* Note: PassengerCare and SafetyPromise are consolidated or removed to prevent bloat */}
      </section>

      {/* 8. Testimonials */}
      <section className="py-16 md:py-32 bg-surface-alt">
        <ReviewsSection lang="ar" />
      </section>

      {/* 9. FAQ */}
      <section className="py-16 md:py-32 bg-bg">
        <FAQSection lang="ar" />
      </section>

      {/* 10. CTA Band (Dark Anchor) */}
      <section className="relative py-16 md:py-32 bg-ink-bg border-t border-border/10 overflow-hidden">
        <div className="container relative z-10 text-center px-4">
          <FadeIn>
            <span className="block text-gold uppercase tracking-[0.14em] font-semibold text-sm md:text-base mb-4 font-ar-body">
              خدمة خاصة وموثوقة
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold font-ar-head mb-6 text-on-ink leading-[1.4]">
              ابدأ رحلتك الروحانية بسلام واطمئنان
            </h2>
            <p className="text-lg md:text-xl text-on-ink-muted max-w-2xl mx-auto mb-10 leading-[1.9] font-ar-body font-light">
              لا تقلق من أمر اللوجستيات. احجز رحلتك الخاصة الآن ودعنا نخدمكم بالرعاية التي تستحقونها.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/ar/booking"
                className="btn-on-dark font-ar-body w-full sm:w-auto"
              >
                احجز الآن
              </Link>
              <Link
                href="/ar/fleet"
                className="btn-ghost text-on-ink font-ar-body w-full sm:w-auto hover:text-gold transition-colors"
              >
                تصفح الأسطول <ArrowRight size={18} className="rotate-180 inline-block ms-2" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
