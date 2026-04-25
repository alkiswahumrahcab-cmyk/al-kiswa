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

  const tags: HreflangEntry[] = [
    // Default English — serves all English speakers globally
    { hreflang: "en", href: `${BASE_URL}${path || "/"}` },
    // UK-specific English — points to UK regional page
    { hreflang: "en-GB", href: `${BASE_URL}/umrah-transport-uk-pilgrims` },
    // US English
    { hreflang: "en-US", href: `${BASE_URL}${path || "/"}` },
    // Arabic — all Arabic speakers
    { hreflang: "ar", href: `${BASE_URL}/ar${path || "/"}` },
    { hreflang: "ar-SA", href: `${BASE_URL}/ar${path || "/"}` },
    { hreflang: "ar-AE", href: `${BASE_URL}/ar${path || "/"}` },
    { hreflang: "ar-KW", href: `${BASE_URL}/ar${path || "/"}` },
    { hreflang: "ar-QA", href: `${BASE_URL}/ar${path || "/"}` },
    // European regional pages — always cross-linked as alternates
    { hreflang: "fr", href: `${BASE_URL}/umrah-taxi-france` },
    { hreflang: "de", href: `${BASE_URL}/umrah-transport-germany` },
    { hreflang: "nl", href: `${BASE_URL}/umrah-taxi-nederland` },
    // x-default — fallback for all other languages/regions
    { hreflang: "x-default", href: `${BASE_URL}${path || "/"}` },
  ];

  return tags;
}

/**
 * Generates Next.js Metadata alternates object for use in
 * each page's metadata export
 */
export function generateMetadataAlternates(englishPath: string) {
  const path = englishPath === "/" ? "" : englishPath;
  
  const languages: Record<string, string> = {
    "en": `${BASE_URL}${path || "/"}`,
    // en-GB always points to UK regional page for proper hreflang
    "en-GB": `${BASE_URL}/umrah-transport-uk-pilgrims`,
    "en-US": `${BASE_URL}${path || "/"}`,
    "ar": `${BASE_URL}/ar${path || "/"}`,
    "ar-SA": `${BASE_URL}/ar${path || "/"}`,
    "ar-AE": `${BASE_URL}/ar${path || "/"}`,
    "ar-KW": `${BASE_URL}/ar${path || "/"}`,
    "ar-QA": `${BASE_URL}/ar${path || "/"}`,
    // European regional pages always cross-linked
    "fr": `${BASE_URL}/umrah-taxi-france`,
    "de": `${BASE_URL}/umrah-transport-germany`,
    "nl": `${BASE_URL}/umrah-taxi-nederland`,
    "x-default": `${BASE_URL}${path || "/"}`,
  };

  return {
    canonical: `${BASE_URL}${path || "/"}`,
    languages,
  };
}
