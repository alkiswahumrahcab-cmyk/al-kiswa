export const BASE_URL = "https://kiswahumrahcab.com";

export type HreflangEntry = {
  hreflang: string;
  href: string;
};

/**
 * Generates the complete hreflang set for any given page path.
 * Pass the English path (e.g. "/services/jeddah-airport-transfer")
 * and this returns all alternate language URLs for that page.
 */
export function generateHreflangTags(englishPath: string): HreflangEntry[] {
  // Normalize path
  const path = englishPath === "/" ? "" : englishPath;

  return [
    // Default English — serves all English speakers globally
    {
      hreflang: "en",
      href: `${BASE_URL}${path || "/"}`,
    },
    // UK-specific English
    {
      hreflang: "en-GB",
      href: `${BASE_URL}${path || "/"}`,
    },
    // US English
    {
      hreflang: "en-US",
      href: `${BASE_URL}${path || "/"}`,
    },
    // Arabic — serves all Arabic speakers (Gulf: SA, AE, KW, QA, BH, OM)
    {
      hreflang: "ar",
      href: `${BASE_URL}/ar${path || "/"}`,
    },
    // Saudi Arabia specifically
    {
      hreflang: "ar-SA",
      href: `${BASE_URL}/ar${path || "/"}`,
    },
    // UAE
    {
      hreflang: "ar-AE",
      href: `${BASE_URL}/ar${path || "/"}`,
    },
    // Kuwait
    {
      hreflang: "ar-KW",
      href: `${BASE_URL}/ar${path || "/"}`,
    },
    // Qatar
    {
      hreflang: "ar-QA",
      href: `${BASE_URL}/ar${path || "/"}`,
    },
    // French — for French pilgrims (France, Belgium, Morocco, Algeria, Tunisia)
    {
      hreflang: "fr",
      href: `${BASE_URL}/umrah-taxi-france`,
    },
    // German
    {
      hreflang: "de",
      href: `${BASE_URL}/umrah-transport-germany`,
    },
    // x-default — fallback for all other languages/regions
    {
      hreflang: "x-default",
      href: `${BASE_URL}/`,
    },
  ];
}

/**
 * Generates Next.js Metadata alternates object for use in
 * each page's metadata export
 */
export function generateMetadataAlternates(englishPath: string) {
  const path = englishPath === "/" ? "" : englishPath;

  return {
    canonical: `${BASE_URL}${path || "/"}`,
    languages: {
      "en": `${BASE_URL}${path || "/"}`,
      "en-GB": `${BASE_URL}${path || "/"}`,
      "en-US": `${BASE_URL}${path || "/"}`,
      "ar": `${BASE_URL}/ar${path || "/"}`,
      "ar-SA": `${BASE_URL}/ar${path || "/"}`,
      "ar-AE": `${BASE_URL}/ar${path || "/"}`,
      "ar-KW": `${BASE_URL}/ar${path || "/"}`,
      "ar-QA": `${BASE_URL}/ar${path || "/"}`,
      "fr": `${BASE_URL}/umrah-taxi-france`,
      "de": `${BASE_URL}/umrah-transport-germany`,
      "x-default": `${BASE_URL}/`,
    },
  };
}
