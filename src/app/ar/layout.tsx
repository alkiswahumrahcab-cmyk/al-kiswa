import type { Metadata } from "next";
import { Cairo, Noto_Sans_Arabic } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiswahumrahcab.com"),
  alternates: {
    canonical: "/ar",
    languages: {
      "en": "/",
      "ar": "/ar",
    },
  },
};

export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={cairo.variable}
    >
      <body className={`${cairo.className} rtl`}>
        {children}
      </body>
    </html>
  );
}
