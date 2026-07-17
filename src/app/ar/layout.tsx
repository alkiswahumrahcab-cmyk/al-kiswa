import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import FooterAR from "@/components/layout/FooterAR";
import GlobalClientComponents from "@/components/common/GlobalClientComponents";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import { getSettings } from "@/lib/settings-storage";

export const metadata: Metadata = {
  metadataBase: new URL("https://kiswahumrahcab.com"),
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
};

export default async function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <div lang="ar" dir="rtl" className={`font-ar-body rtl bg-charcoal text-white`}>
      {/* Navbar — shared component, already handles RTL gracefully */}
      <ClientLayoutWrapper>
        <Navbar />
      </ClientLayoutWrapper>

      <main style={{ minHeight: "calc(100vh - 80px - 300px)" }}>
        {children}
      </main>

      {/* Footer + WhatsApp button */}
      <ClientLayoutWrapper>
        <FooterAR />
        <GlobalClientComponents contactSettings={settings.contact} />
      </ClientLayoutWrapper>
    </div>
  );
}
