import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Montserrat, Tajawal } from "next/font/google"; // Elegant & Light + Arabic
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MenuProvider } from "@/context/MenuContext";
import { PricingProvider } from '@/context/PricingContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import Preloader from "@/components/common/Preloader";
import NextTopLoader from 'nextjs-toploader';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { getSettings } from "@/lib/settings-storage";

import ScrollToTop from "@/components/common/ScrollToTop";
import { JsonLdScript } from "@/components/seo/JsonLd";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: 'swap',
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D4AF37',
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.general.siteName || "Al Kiswah Umrah Transport";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: settings.seo.defaultTitle || "Umrah Transport Services Saudi Arabia",
      template: `%s | ${siteName}`
    },
    description: settings.seo.defaultDescription || "Reliable Umrah taxi service in Makkah and Madinah.",
    keywords: settings.seo.keywords ? settings.seo.keywords.split(',').map(k => k.trim()) : ["Umrah Taxi", "Makkah Transport", "Jeddah Airport Transfer"],
    authors: [{ name: "Al Kiswah Umrah Transport" }],
    creator: "Al Kiswah Umrah Transport",
    publisher: "Al Kiswah Umrah Transport",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: {
        default: settings.seo.defaultTitle || "Umrah Transport Services Saudi Arabia",
        template: `%s | ${siteName}`
      },
      description: settings.seo.defaultDescription || "Reliable Umrah taxi service in Makkah and Madinah.",
      siteName: siteName,
      locale: 'en_US',
      type: 'website',
      url: siteUrl,
      images: [
        {
          url: '/images/fleet/gmc-yukon-studio.webp', // Default OG Image
          width: 1200,
          height: 630,
          alt: siteName,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo.defaultTitle || "Umrah Transport Services Saudi Arabia",
      description: settings.seo.defaultDescription || "Reliable Umrah taxi service in Makkah and Madinah.",
      images: ['/images/fleet/gmc-yukon-studio.webp'],
      creator: settings.contact.social.twitter ? `@${settings.contact.social.twitter.split('/').pop()}` : undefined // extract handle if available
    },
    icons: {
      icon: [
        { url: '/favicon.png?v=2', sizes: '32x32' },
      ],
      shortcut: '/favicon.png?v=2',
      apple: '/apple-touch-icon.png?v=2',
    },
    verification: {
      google: 'inByUir4mwvGJCnd8ZM3EmfalkjtJSAgvU91',
    },
    alternates: {
      languages: {
        'en': 'https://kiswahumrahcab.com/',
        'ar': 'https://kiswahumrahcab.com/ar/',
        'en-GB': 'https://kiswahumrahcab.com/umrah-transport-uk-pilgrims',
        'fr': 'https://kiswahumrahcab.com/umrah-taxi-france',
        'de': 'https://kiswahumrahcab.com/umrah-transport-germany',
        'nl': 'https://kiswahumrahcab.com/umrah-taxi-nederland',
        'x-default': 'https://kiswahumrahcab.com/',
      },
    },
  };
}



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSettings();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style dangerouslySetInnerHTML={{ __html: `
            .counter-animated::before {
              content: attr(data-fallback);
            }
          ` }} />
        </noscript>
        <link rel="llms-txt" href="/llms.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TransportationCompany",
              "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com'}/#organization`,
              "name": settings.general.siteName || "Al Kiswah Umrah Transport",
              "alternateName": "Al Kiswa Umrah Transport",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://kiswahumrahcab.com",
              "logo": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com'}/logo.webp`,
              "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com'}/images/og-image.jpg`,
              "description": settings.seo.defaultDescription || "Licensed private Umrah taxi service in Saudi Arabia. Transfers between Jeddah Airport, Makkah and Madinah.",
              "foundingDate": "2014",
              "areaServed": [
                { "@type": "City", "name": "Jeddah" },
                { "@type": "City", "name": "Makkah" },
                { "@type": "City", "name": "Madinah" }
              ],
              "telephone": settings.contact.phone || "+966548707332",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "telephone": settings.contact.phone || "+966548707332",
                "availableLanguage": ["English", "Arabic", "Urdu"],
                "hoursAvailable": "Mo-Su 00:00-24:00"
              },
              "sameAs": [
                "https://www.google.com/search?q=Al+Kiswah+Umrah+Transport",
                "https://wa.me/966548707332"
              ]
            })
          }}
        />
      </head>
      <body className={`${montserrat.variable} ${tajawal.variable}`}>
        {settings.general.googleAnalyticsId && (
          <GoogleAnalytics gaId={settings.general.googleAnalyticsId} />
        )}


        <MenuProvider>
          <SettingsProvider>
            <CurrencyProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                forcedTheme="dark"
                enableSystem={false}
                disableTransitionOnChange
              >
                <PricingProvider>
                  <Suspense fallback={null}>
                    <NextTopLoader
                      color="#D4AF37"
                      initialPosition={0.08}
                      crawlSpeed={200}
                      height={4}
                      crawl={true}
                      showSpinner={false}
                      easing="ease"
                      speed={200}
                      shadow="0 0 15px #D4AF37,0 0 5px #D4AF37"
                    />
                  </Suspense>

                  {/* Main Content Area - Layouts downstream will inject Nav/Footer */}
                  {children}

                  {/* Global Widgets */}
                  {/* FloatingAssistanceButton removed to avoid overlap */}

                </PricingProvider>
              </ThemeProvider>
            </CurrencyProvider>
          </SettingsProvider>
        </MenuProvider>

        <div id="datepicker-portal" />
      </body>
    </html>
  );
}
