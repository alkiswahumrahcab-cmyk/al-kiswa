import { MetadataRoute } from "next";
import { regions } from "@/data/regions";

const BASE_URL = "https://kiswahumrahcab.com";

const englishPages = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/booking", priority: 0.95, changeFreq: "weekly" },
  { path: "/services/jeddah-airport-transfer", priority: 0.9, changeFreq: "monthly" },
  { path: "/services/makkah-madinah-taxi", priority: 0.9, changeFreq: "monthly" },
  { path: "/services/madinah-airport-transfer", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/intercity-transfer", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/ziyarat-tours", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/ziarah-makkah", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/ziarah-madinah", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/airport-transfers", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/hotel-transfers", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/gmc-yukon-at4", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/hyundai-staria", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/hyundai-starex", priority: 0.6, changeFreq: "monthly" },
  { path: "/fleet/toyota-hiace", priority: 0.6, changeFreq: "monthly" },
  { path: "/fleet/toyota-camry", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/toyota-coaster", priority: 0.7, changeFreq: "monthly" },
  { path: "/ramadan-2026", priority: 0.9, changeFreq: "weekly" },
  { path: "/about", priority: 0.7, changeFreq: "monthly" },
  { path: "/blog", priority: 0.7, changeFreq: "weekly" },
  { path: "/contact", priority: 0.7, changeFreq: "monthly" },
  { path: "/pricing", priority: 0.95, changeFreq: "weekly" },
  { path: "/pricing/compare", priority: 0.90, changeFreq: "monthly" },
  { path: "/safety", priority: 0.5, changeFreq: "yearly" },
  { path: "/umrah-transport-uk-pilgrims", priority: 0.85, changeFreq: "monthly", lang: "en-GB" },
  { path: "/umrah-taxi-france", priority: 0.80, changeFreq: "monthly", lang: "fr" },
  { path: "/umrah-transport-germany", priority: 0.80, changeFreq: "monthly", lang: "de" },
  { path: "/umrah-taxi-nederland", priority: 0.80, changeFreq: "monthly", lang: "nl" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of englishPages) {
    const isRegional = "lang" in page;
    const lang = isRegional ? (page as { path: string; priority: number; changeFreq: string; lang: string }).lang : null;

    const languages: Record<string, string> = {
      en: `${BASE_URL}${page.path}`,
      ar: `${BASE_URL}/ar${page.path}`,
      "x-default": `${BASE_URL}${page.path}`,
    };

    // For regional pages, add the specific language self-reference + cross-references
    if (lang === "en-GB") {
      languages["en-GB"] = `${BASE_URL}${page.path}`;
    } else if (lang === "fr") {
      languages["fr"] = `${BASE_URL}${page.path}`;
      languages["en-GB"] = `${BASE_URL}/umrah-transport-uk-pilgrims`;
      languages["de"] = `${BASE_URL}/umrah-transport-germany`;
      languages["nl"] = `${BASE_URL}/umrah-taxi-nederland`;
    } else if (lang === "de") {
      languages["de"] = `${BASE_URL}${page.path}`;
      languages["en-GB"] = `${BASE_URL}/umrah-transport-uk-pilgrims`;
      languages["fr"] = `${BASE_URL}/umrah-taxi-france`;
      languages["nl"] = `${BASE_URL}/umrah-taxi-nederland`;
    } else if (lang === "nl") {
      languages["nl"] = `${BASE_URL}${page.path}`;
      languages["en-GB"] = `${BASE_URL}/umrah-transport-uk-pilgrims`;
      languages["fr"] = `${BASE_URL}/umrah-taxi-france`;
      languages["de"] = `${BASE_URL}/umrah-transport-germany`;
    } else {
      // Regular English pages: cross-link all regional alternates
      languages["en-GB"] = `${BASE_URL}/umrah-transport-uk-pilgrims`;
      languages["fr"] = `${BASE_URL}/umrah-taxi-france`;
      languages["de"] = `${BASE_URL}/umrah-transport-germany`;
      languages["nl"] = `${BASE_URL}/umrah-taxi-nederland`;
    }

    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq as MetadataRoute.Sitemap[0]["changeFrequency"],
      priority: page.priority,
      alternates: { languages },
    });

    // Add Arabic version for non-regional pages
    if (!isRegional) {
      entries.push({
        url: `${BASE_URL}/ar${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFreq as MetadataRoute.Sitemap[0]["changeFrequency"],
        priority: page.priority - 0.05,
        alternates: {
          languages: {
            en: `${BASE_URL}${page.path}`,
            ar: `${BASE_URL}/ar${page.path}`,
            "x-default": `${BASE_URL}${page.path}`,
          },
        },
      });
    }
  }

  // Add dynamic regional landing pages
  for (const region of regions) {
    entries.push({
      url: `${BASE_URL}/pilgrims/${region.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          en: `${BASE_URL}/pilgrims/${region.id}`,
          ar: `${BASE_URL}/ar/pilgrims/${region.id}`,
          "x-default": `${BASE_URL}/pilgrims/${region.id}`,
        },
      },
    });

    entries.push({
      url: `${BASE_URL}/ar/pilgrims/${region.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
      alternates: {
        languages: {
          en: `${BASE_URL}/pilgrims/${region.id}`,
          ar: `${BASE_URL}/ar/pilgrims/${region.id}`,
          "x-default": `${BASE_URL}/pilgrims/${region.id}`,
        },
      },
    });
  }

  return entries;
}
