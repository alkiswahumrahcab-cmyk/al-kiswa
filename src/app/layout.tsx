import type { Metadata, Viewport } from "next";
import { Montserrat, Tajawal } from "next/font/google"; // Elegant & Light + Arabic
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { MenuProvider } from "@/context/MenuContext";
import { PricingProvider } from '@/context/PricingContext';
import { SettingsProvider } from '@/context/SettingsContext';
import Preloader from "@/components/common/Preloader";
import NextTopLoader from 'nextjs-toploader';
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { getSettings } from "@/lib/settings-storage";
import FloatingAssistanceButton from "@/components/common/FloatingAssistanceButton";
import ScrollToTop from "@/components/common/ScrollToTop";
import { JsonLdScript } from "@/components/seo/JsonLd";
import { generateOrganizationSchema, generateLocalBusinessSchema } from "@/components/seo/schema-generator";
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
  maximumScale: 1,
  themeColor: '#D4AF37',
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  const siteName = settings.general.siteName || "Al Kiswah Umrah Transport";

  return {
    metadataBase: new URL('https://alkiswahumrahtransport.com'),
    title: {
      default: settings.seo.defaultTitle || "Umrah Transport Services Saudi Arabia",
      template: `%s | ${siteName}`
    },
    // Global Manifest (Optional, or handled by sub-layouts)
    // We remove the global manifest link to enforce sub-route manifests
    // manifest: '/manifest.json', 
    openGraph: {
      title: {
        default: settings.seo.defaultTitle || "Umrah Transport Services Saudi Arabia",
        template: `%s | ${siteName}`
      },
      description: settings.seo.defaultDescription || "Reliable Umrah taxi service in Makkah and Madinah.",
      siteName: siteName,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/fleet/gmc-yukon-studio.png', // Default OG Image
          width: 1200,
          height: 630,
          alt: siteName,
        }
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.png?v=2', sizes: '32x32' },
      ],
      shortcut: '/favicon.png?v=2',
      apple: '/apple-touch-icon.png?v=2',
    },
    verification: {
      google: '0JYg8N3CPUFhzseUIrbhKiLIShx1ltrIF0XoXVsO7-I',
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
      <body className={`${montserrat.variable} ${tajawal.variable}`}>
        {settings.general.googleAnalyticsId && (
          <GoogleAnalytics gaId={settings.general.googleAnalyticsId} />
        )}

        {/* JSON-LD Structured Data */}
        <JsonLdScript schema={generateOrganizationSchema()} />
        <JsonLdScript schema={generateLocalBusinessSchema()} />

        <MenuProvider>
          <SettingsProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              forcedTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
            >
              <PricingProvider>
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

                {/* Main Content Area - Layouts downstream will inject Nav/Footer */}
                {children}

                {/* Accessibility: Floating Assistance for Elders */}
                <FloatingAssistanceButton />

                {/* Admin Session Guard - keep global for admin routes */}
                {/* <AdminSessionGuard />  Moved to specific layouts if needed or kept here if it only triggers on /admin */}

              </PricingProvider>
            </ThemeProvider>
          </SettingsProvider>
        </MenuProvider>

        <div id="datepicker-portal" />
      </body>
    </html>
  );
}
