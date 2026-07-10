import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Montserrat, Tajawal, Cormorant_Garamond } from "next/font/google"; // Elegant & Light + Arabic + Display serif
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MenuProvider } from "@/context/MenuContext";
import { PricingProvider } from '@/context/PricingContext';
import { SettingsProvider } from '@/context/SettingsContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import NextTopLoader from 'nextjs-toploader';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import { getSettings } from "@/lib/settings-storage";

import { JsonLdScript } from "@/components/seo/JsonLd";
import HtmlLangUpdater from "@/components/seo/HtmlLangUpdater";
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

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E2A336',
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
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
      other: [
        {
          rel: 'mask-icon',
          url: '/favicon.svg',
          color: '#E2A336'
        }
      ]
    },
    manifest: '/site.webmanifest',
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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18307184724"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18307184724');
            `
          }}
        />
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

        <MetaPixel />
        {/* TikTok Pixel Code Start */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};

  ttq.load('D8U6E3JC77UER4V7P650');
  ttq.page();
}(window, document, 'ttq');
            `
          }}
        />
        {/* TikTok Pixel Code End */}
      </head>
      <body className={`${montserrat.variable} ${tajawal.variable} ${cormorant.variable}`}>
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
                      color="#E2A336"
                      initialPosition={0.08}
                      crawlSpeed={200}
                      height={4}
                      crawl={true}
                      showSpinner={false}
                      easing="ease"
                      speed={200}
                      shadow="0 0 15px #E2A336,0 0 5px #E2A336"
                    />
                  </Suspense>

                  {/* Client-side language updater for SEO */}
                  <HtmlLangUpdater />

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
