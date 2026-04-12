#!/usr/bin/env node
/**
 * fix-ar-links.js
 * Fixes internal links in /app/ar pages — replaces /booking, /fleet, /services etc.
 * with /ar/booking, /ar/fleet, /ar/services etc.
 */

const fs = require("fs");
const path = require("path");

const AR_DIR = path.join(__dirname, "src", "app", "ar");

// Internal paths that need /ar/ prefix
const INTERNAL_PATHS = [
  "/booking",
  "/services",
  "/fleet",
  "/routes",
  "/about",
  "/contact",
  "/pricing",
  "/safety",
  "/blog",
  "/ramadan-2026",
];

let totalFiles = 0;
let totalFixes = 0;

function fixLinksInFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let original = content;
  let fileFixes = 0;

  for (const prefix of INTERNAL_PATHS) {
    // Match href="/booking", href="/services/...", href='/fleet/...' etc.
    // But NOT href="/ar/..." (already fixed) and NOT href="https://..." or "#"
    const regex = new RegExp(
      `href=["'](${prefix.replace("/", "\\/")}(?:[/"'][^"']*|["']))`,
      "g"
    );

    content = content.replace(regex, (match, captured) => {
      fileFixes++;
      // Replace /X with /ar/X
      return match.replace(`"${prefix}`, `"/ar${prefix}`).replace(`'${prefix}`, `'/ar${prefix}`);
    });
  }

  if (fileFixes > 0) {
    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✅  Fixed ${fileFixes} link(s) in: ${filePath.replace(__dirname, ".")}`);
    totalFixes += fileFixes;
  }

  return fileFixes;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) {
      totalFiles++;
      fixLinksInFile(fullPath);
    }
  }
}

console.log("\n🔗  Fixing internal links in /app/ar pages...\n");
walkDir(AR_DIR);
console.log(`\n✅  Done. Scanned ${totalFiles} files, fixed ${totalFixes} broken links.\n`);
