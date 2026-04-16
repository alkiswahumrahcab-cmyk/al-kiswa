import { MetadataRoute } from "next";
import { regions } from "@/data/regions";

const BASE_URL = "https://kiswahumrahcab.com";

const englishPages = [
  { path: "/", priority: 1.0, changeFreq: "weekly" },
  { path: "/services/jeddah-airport-transfer", priority: 0.9, changeFreq: "monthly" },
  { path: "/services/makkah-madinah-taxi", priority: 0.9, changeFreq: "monthly" },
  { path: "/services/madinah-airport-transfer", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/intercity-transfer", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/ziyarat-tours", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/airport-transfers", priority: 0.8, changeFreq: "monthly" },
  { path: "/services/hotel-transfers", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/gmc-yukon-at4", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/hyundai-staria", priority: 0.7, changeFreq: "monthly" },
  { path: "/fleet/hyundai-starex", priority: 0.6, changeFreq: "monthly" },
  { path: "/fleet/toyota-hiace", priority: 0.6, changeFreq: "monthly" },
  { path: "/fleet/toyota-camry", priority: 0.6, changeFreq: "monthly" },
  { path: "/ramadan-2026", priority: 0.9, changeFreq: "weekly" },
  { path: "/about", priority: 0.6, changeFreq: "monthly" },
  { path: "/blog", priority: 0.7, changeFreq: "weekly" },
  { path: "/contact", priority: 0.5, changeFreq: "yearly" },
  { path: "/pricing", priority: 0.8, changeFreq: "monthly" },
  { path: "/safety", priority: 0.5, changeFreq: "yearly" },
  { path: "/umrah-transport-uk-pilgrims", priority: 0.8, changeFreq: "monthly" },
  { path: "/umrah-taxi-france", priority: 0.7, changeFreq: "monthly" },
  { path: "/umrah-transport-germany", priority: 0.7, changeFreq: "monthly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of englishPages) {
    entries.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFreq as MetadataRoute.Sitemap[0]["changeFrequency"],
      priority: page.priority,
      alternates: {
        languages: {
          en: `${BASE_URL}${page.path}`,
          ar: `${BASE_URL}/ar${page.path}`,
          "x-default": `${BASE_URL}${page.path}`,
        },
      },
    });

    // Add Arabic version of each page
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
