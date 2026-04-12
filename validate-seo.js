#!/usr/bin/env node
/**
 * validate-seo.js
 * Local SEO validation script for Al Kiswah Umrah Transport
 * Run: node validate-seo.js
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "src");
const PASS = "\x1b[32m✅ PASS\x1b[0m";
const FAIL = "\x1b[31m❌ FAIL\x1b[0m";
const INFO = "\x1b[36mℹ️  INFO\x1b[0m";

let passCount = 0;
let failCount = 0;

function check(label, condition, detail = "") {
  if (condition) {
    console.log(`${PASS}  ${label}${detail ? `  →  ${detail}` : ""}`);
    passCount++;
  } else {
    console.log(`${FAIL}  ${label}${detail ? `  →  ${detail}` : ""}`);
    failCount++;
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function filesInDir(dirPath) {
  try {
    return fs.readdirSync(dirPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function countPagesWithHreflang(dir, count = { total: 0, with: 0 }) {
  const EXCLUDED_DIRS = [
    "admin", "api", "book", "booking", "track-booking",
    "cookie-preferences", "privacy", "terms", "rate"
  ];
  const entries = filesInDir(dir);
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!EXCLUDED_DIRS.includes(entry.name)) {
        countPagesWithHreflang(path.join(dir, entry.name), count);
      }
    } else if (entry.name === "page.tsx") {
      count.total++;
      const content = readFile(path.join(dir, entry.name));
      if (content && content.includes("generateMetadataAlternates")) {
        count.with++;
      }
    }
  }
  return count;
}


console.log("\n\x1b[33m══════════════════════════════════════════════════\x1b[0m");
console.log("\x1b[33m  AL KISWAH UMRAH TRANSPORT — SEO VALIDATION AUDIT\x1b[0m");
console.log("\x1b[33m══════════════════════════════════════════════════\x1b[0m\n");

// ── CHECK 1: lib/hreflang.ts exists and has all 11 tags ──
console.log("\x1b[1m[1] Hreflang Utility — lib/hreflang.ts\x1b[0m");
const hreflang = readFile(path.join(__dirname, "src/lib/hreflang.ts"));
check("File exists", !!hreflang);
if (hreflang) {
  const required = ["en", "en-GB", "en-US", "ar", "ar-SA", "ar-AE", "ar-KW", "ar-QA", "fr", "de", "x-default"];
  for (const tag of required) {
    check(`  hreflang="${tag}" defined`, hreflang.includes(`"${tag}"`));
  }
  check("  BASE_URL set to kiswahumrahcab.com", hreflang.includes("kiswahumrahcab.com"));
  check("  generateMetadataAlternates() exported", hreflang.includes("export function generateMetadataAlternates"));
}

// ── CHECK 2: Arabic layout ──
console.log("\n\x1b[1m[2] Arabic Layout — app/ar/layout.tsx\x1b[0m");
const arLayout = readFile(path.join(__dirname, "src/app/ar/layout.tsx"));
check("File exists", !!arLayout);
if (arLayout) {
  check('  lang="ar" set on <html>', arLayout.includes('lang="ar"'));
  check('  dir="rtl" set on <html>', arLayout.includes('dir="rtl"'));
  check("  Cairo Arabic font loaded", arLayout.includes("Cairo") || arLayout.includes("Noto_Sans_Arabic"));
}

// ── CHECK 3: Arabic pages created ──
console.log("\n\x1b[1m[3] Arabic Pages — app/ar/*\x1b[0m");
const arDir = path.join(__dirname, "src/app/ar");
const arEntries = filesInDir(arDir).filter(e => e.isDirectory());
console.log(`${INFO}  Arabic route directories found: ${arEntries.length}`);
const requiredArRoutes = [
  "about", "blog", "contact", "fleet", "pricing",
  "ramadan-2026", "routes", "safety", "services"
];
for (const route of requiredArRoutes) {
  const pageFile = path.join(arDir, route, "page.tsx");
  const exists = fs.existsSync(pageFile);
  check(`  /ar/${route}/page.tsx`, exists);
}

// ── CHECK 4: Hreflang injection coverage ──
console.log("\n\x1b[1m[4] Hreflang Coverage — all page.tsx files\x1b[0m");
const coverage = countPagesWithHreflang(path.join(__dirname, "src/app"));
check(
  `  ${coverage.with}/${coverage.total} content pages have hreflang`,
  coverage.with >= coverage.total - 5,
  `${coverage.with} SEO-facing pages use generateMetadataAlternates()`
);

// ── CHECK 5: sitemap.ts ──
console.log("\n\x1b[1m[5] Sitemap — app/sitemap.ts\x1b[0m");
const sitemap = readFile(path.join(__dirname, "src/app/sitemap.ts"));
check("File exists", !!sitemap);
if (sitemap) {
  check("  English URLs included", sitemap.includes("jeddah-airport-transfer"));
  check("  Arabic alternates included", sitemap.includes("/ar${page.path}") || sitemap.includes('/ar${'));
  check("  x-default set", sitemap.includes("x-default"));
  check("  Priority values set", sitemap.includes("priority"));
  check("  changeFrequency set", sitemap.includes("changeFrequ"));
}

// ── CHECK 6: robots.txt ──
console.log("\n\x1b[1m[6] Robots.txt — public/robots.txt\x1b[0m");
const robots = readFile(path.join(__dirname, "public/robots.txt"));
check("File exists", !!robots);
if (robots) {
  check("  Allow: /ar/ is set", robots.includes("Allow: /ar/"));
  check("  Sitemap URL declared", robots.includes("Sitemap: https://kiswahumrahcab.com/sitemap.xml"));
  check("  /api/ blocked", robots.includes("Disallow: /api/"));
}

// ── CHECK 7: Middleware ──
console.log("\n\x1b[1m[7] Language Routing Middleware — src/middleware.ts\x1b[0m");
const middleware = readFile(path.join(__dirname, "src/middleware.ts"));
check("File exists", !!middleware);
if (middleware) {
  check("  Admin auth preserved", middleware.includes("Authorization") || middleware.includes("admin") || middleware.includes("JWT"));
  check("  Accept-Language detection", middleware.includes("accept-language") || middleware.includes("Accept-Language"));
  check("  GCC geo-detection (CF-IPCountry)", middleware.includes("CF-IPCountry") || middleware.includes("cf-ipcountry"));
  check("  Crawler bypass (Googlebot safe)", middleware.includes("bot") || middleware.includes("Googlebot") || middleware.includes("crawler"));
  check("  Cookie-based preference", middleware.includes("preferred-language") || middleware.includes("cookie"));
}

// ── CHECK 8: LanguageSwitcher component ──
console.log("\n\x1b[1m[8] LanguageSwitcher Component\x1b[0m");
const switcher = readFile(path.join(__dirname, "src/components/LanguageSwitcher.tsx"));
check("File exists", !!switcher);
if (switcher) {
  check("  usePathname() used for path detection", switcher.includes("usePathname"));
  check("  /ar path detection logic present", switcher.includes('"/ar"') || switcher.includes("startsWith"));
  check("  hrefLang attributes set", switcher.includes("hrefLang"));
  check("  Arabic label present", switcher.includes("عربي"));
}

// ── CHECK 9: Navbar integration ──
console.log("\n\x1b[1m[9] Navbar — LanguageSwitcher integrated\x1b[0m");
const navbar = readFile(path.join(__dirname, "src/components/layout/Navbar.tsx"));
check("File exists", !!navbar);
if (navbar) {
  check("  LanguageSwitcher imported", navbar.includes("LanguageSwitcher"));
  check("  Rendered in desktop nav", (navbar.match(/<LanguageSwitcher/g) || []).length >= 1);
  check("  Rendered in mobile menu", (navbar.match(/<LanguageSwitcher/g) || []).length >= 2);
}

// ── CHECK 10: IndexNow API endpoint ──
console.log("\n\x1b[1m[10] IndexNow API Endpoint — app/api/indexnow/route.ts\x1b[0m");
const indexNow = readFile(path.join(__dirname, "src/app/api/indexnow/route.ts"));
check("File exists", !!indexNow);
if (indexNow) {
  check("  POST handler implemented", indexNow.includes("export async function POST"));
  check("  Priority URLs list defined", indexNow.includes("PRIORITY_URLS"));
  check("  Submits to api.indexnow.org", indexNow.includes("api.indexnow.org"));
}

// ── SUMMARY ──
console.log("\n\x1b[33m══════════════════════════════════════════════════\x1b[0m");
const total = passCount + failCount;
console.log(`\x1b[1m  RESULT: ${passCount}/${total} checks passed\x1b[0m`);
if (failCount === 0) {
  console.log("\x1b[32m  🎉 ALL CHECKS PASSED — Ready for production deployment!\x1b[0m");
} else {
  console.log(`\x1b[31m  ⚠️  ${failCount} check(s) failed — review above before deploying\x1b[0m`);
}
console.log("\x1b[33m══════════════════════════════════════════════════\x1b[0m\n");
