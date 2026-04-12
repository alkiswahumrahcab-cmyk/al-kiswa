const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, 'src', 'app');
const PUBLIC_DIR = path.join(BASE, '(public)');
const AR_DIR = path.join(BASE, 'ar');
const IMPORT_LINE = `import { generateMetadataAlternates } from "@/lib/hreflang";\n`;

// Map of page file path → { routePath, isAr, arabicTitle, arabicDesc }
// routePath = the English url path used in generateMetadataAlternates
const PAGES = [
  // English pages
  { file: path.join(PUBLIC_DIR, 'page.tsx'), routePath: '/', isAr: false },
  { file: path.join(PUBLIC_DIR, 'about', 'page.tsx'), routePath: '/about', isAr: false },
  { file: path.join(PUBLIC_DIR, 'blog', 'page.tsx'), routePath: '/blog', isAr: false },
  { file: path.join(PUBLIC_DIR, 'contact', 'page.tsx'), routePath: '/contact', isAr: false },
  { file: path.join(PUBLIC_DIR, 'pricing', 'page.tsx'), routePath: '/pricing', isAr: false },
  { file: path.join(PUBLIC_DIR, 'safety', 'page.tsx'), routePath: '/safety', isAr: false },
  { file: path.join(PUBLIC_DIR, 'routes', 'page.tsx'), routePath: '/routes', isAr: false },
  { file: path.join(PUBLIC_DIR, 'ramadan-2026', 'page.tsx'), routePath: '/ramadan-2026', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'page.tsx'), routePath: '/fleet', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'gmc-yukon-at4', 'page.tsx'), routePath: '/fleet/gmc-yukon-at4', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'hyundai-staria', 'page.tsx'), routePath: '/fleet/hyundai-staria', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'hyundai-starex', 'page.tsx'), routePath: '/fleet/hyundai-starex', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'toyota-hiace', 'page.tsx'), routePath: '/fleet/toyota-hiace', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'toyota-camry', 'page.tsx'), routePath: '/fleet/toyota-camry', isAr: false },
  { file: path.join(PUBLIC_DIR, 'fleet', 'toyota-coaster', 'page.tsx'), routePath: '/fleet/toyota-coaster', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'page.tsx'), routePath: '/services', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'jeddah-airport-transfer', 'page.tsx'), routePath: '/services/jeddah-airport-transfer', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'makkah-madinah-taxi', 'page.tsx'), routePath: '/services/makkah-madinah-taxi', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'madinah-airport-transfer', 'page.tsx'), routePath: '/services/madinah-airport-transfer', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'intercity-transfer', 'page.tsx'), routePath: '/services/intercity-transfer', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'ziyarat-tours', 'page.tsx'), routePath: '/services/ziyarat-tours', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'airport-transfers', 'page.tsx'), routePath: '/services/airport-transfers', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'hotel-transfers', 'page.tsx'), routePath: '/services/hotel-transfers', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'ziarah-makkah', 'page.tsx'), routePath: '/services/ziarah-makkah', isAr: false },
  { file: path.join(PUBLIC_DIR, 'services', 'ziarah-madinah', 'page.tsx'), routePath: '/services/ziarah-madinah', isAr: false },
  // Arabic mirror pages
  { file: path.join(AR_DIR, 'page.tsx'), routePath: '/', isAr: true },
  { file: path.join(AR_DIR, 'about', 'page.tsx'), routePath: '/about', isAr: true },
  { file: path.join(AR_DIR, 'blog', 'page.tsx'), routePath: '/blog', isAr: true },
  { file: path.join(AR_DIR, 'contact', 'page.tsx'), routePath: '/contact', isAr: true },
  { file: path.join(AR_DIR, 'pricing', 'page.tsx'), routePath: '/pricing', isAr: true },
  { file: path.join(AR_DIR, 'safety', 'page.tsx'), routePath: '/safety', isAr: true },
  { file: path.join(AR_DIR, 'routes', 'page.tsx'), routePath: '/routes', isAr: true },
  { file: path.join(AR_DIR, 'ramadan-2026', 'page.tsx'), routePath: '/ramadan-2026', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'page.tsx'), routePath: '/fleet', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'gmc-yukon-at4', 'page.tsx'), routePath: '/fleet/gmc-yukon-at4', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'hyundai-staria', 'page.tsx'), routePath: '/fleet/hyundai-staria', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'hyundai-starex', 'page.tsx'), routePath: '/fleet/hyundai-starex', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'toyota-hiace', 'page.tsx'), routePath: '/fleet/toyota-hiace', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'toyota-camry', 'page.tsx'), routePath: '/fleet/toyota-camry', isAr: true },
  { file: path.join(AR_DIR, 'fleet', 'toyota-coaster', 'page.tsx'), routePath: '/fleet/toyota-coaster', isAr: true },
  { file: path.join(AR_DIR, 'services', 'page.tsx'), routePath: '/services', isAr: true },
  { file: path.join(AR_DIR, 'services', 'jeddah-airport-transfer', 'page.tsx'), routePath: '/services/jeddah-airport-transfer', isAr: true },
  { file: path.join(AR_DIR, 'services', 'makkah-madinah-taxi', 'page.tsx'), routePath: '/services/makkah-madinah-taxi', isAr: true },
  { file: path.join(AR_DIR, 'services', 'madinah-airport-transfer', 'page.tsx'), routePath: '/services/madinah-airport-transfer', isAr: true },
  { file: path.join(AR_DIR, 'services', 'intercity-transfer', 'page.tsx'), routePath: '/services/intercity-transfer', isAr: true },
  { file: path.join(AR_DIR, 'services', 'ziyarat-tours', 'page.tsx'), routePath: '/services/ziyarat-tours', isAr: true },
  { file: path.join(AR_DIR, 'services', 'airport-transfers', 'page.tsx'), routePath: '/services/airport-transfers', isAr: true },
  { file: path.join(AR_DIR, 'services', 'hotel-transfers', 'page.tsx'), routePath: '/services/hotel-transfers', isAr: true },
  { file: path.join(AR_DIR, 'services', 'ziarah-makkah', 'page.tsx'), routePath: '/services/ziarah-makkah', isAr: true },
  { file: path.join(AR_DIR, 'services', 'ziarah-madinah', 'page.tsx'), routePath: '/services/ziarah-madinah', isAr: true },
];

let updated = 0;
let skipped = 0;
let missing = 0;

for (const { file, routePath, isAr } of PAGES) {
  if (!fs.existsSync(file)) {
    console.log(`[MISSING] ${file}`);
    missing++;
    continue;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Add import if not already present
  const needsImport = !content.includes('generateMetadataAlternates');
  if (needsImport) {
    // Insert after the last import line
    content = IMPORT_LINE + content;
  }

  // Replace or add alternates inside the metadata object
  // Strategy: replace existing `alternates: { canonical: '...' }` block OR simple `alternates: {...}`
  // We match alternates: { ... } (single-line or multiline) and replace with our generator call.

  const arSuffix = routePath === '/' ? '/' : routePath;
  const canonicalAr = `https://kiswahumrahcab.com/ar${arSuffix}`;

  let newAlternates;
  if (isAr) {
    newAlternates = `alternates: {
    ...generateMetadataAlternates("${routePath}"),
    canonical: "${canonicalAr}",
  },`;
  } else {
    newAlternates = `alternates: generateMetadataAlternates("${routePath}"),`;
  }

  // Check if there's already an alternates block
  if (content.includes('alternates:')) {
    // Replace multi-line alternates block: alternates: { ... },
    // Use a regex that matches `alternates: {` until the matching closing `},`
    // Simple approach: find alternates: { and remove until we hit },
    const altRegex = /alternates:\s*\{[^}]*\},?/gs;
    const altMatch = content.match(altRegex);
    if (altMatch) {
      content = content.replace(altRegex, newAlternates);
      console.log(`[UPDATED] Replaced existing alternates in ${path.relative(__dirname, file)}`);
    } else {
      // Could not find clean match — skip
      console.log(`[SKIPPED] Could not replace complex alternates in ${path.relative(__dirname, file)}`);
      skipped++;
      continue;
    }
  } else if (content.includes('export const metadata') || content.includes('export async function generateMetadata')) {
    // Insert alternates at start of metadata object
    content = content.replace(
      /(export (?:const metadata(?:: Metadata)? = |async function generateMetadata[^{]*\{[^r]*return )\{)/s,
      (match) => {
        // Can't easily do this with regex for function form — just handle const form
        if (match.includes('function')) return match; // skip function form
        return match + `\n  ${newAlternates}`;
      }
    );
    console.log(`[INSERTED] Added alternates to ${path.relative(__dirname, file)}`);
  } else {
    console.log(`[NO-META] No metadata block found in ${path.relative(__dirname, file)}`);
    skipped++;
    continue;
  }

  fs.writeFileSync(file, content, 'utf8');
  updated++;
}

console.log(`\n✅ Done: ${updated} updated, ${skipped} skipped, ${missing} missing files.`);
