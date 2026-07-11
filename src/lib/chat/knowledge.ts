/**
 * src/lib/chat/knowledge.ts
 *
 * Assembles a token-efficient, plain-text knowledge base from real business data.
 * The result is memoized at module level so it stays stable between requests,
 * enabling Anthropic prompt caching (cache_control: ephemeral) to work effectively.
 */

import { getLivePricing, LiveRouteEntry } from './livePricing';
import settings from '@/data/settings.json';
import { enFaqs } from '@/data/faqs';
import { makkahSites, madinahSites, jeddahSites, taifSites } from '@/data/ziyarat-locations';
import { tourPackages, vehicleLabels } from '@/data/ziyarat-packages';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Note: per-request in-process caching is handled by livePricing.ts (5 min TTL)
// ---------------------------------------------------------------------------

export async function buildKnowledgeBase(): Promise<string> {
  const { routes: liveRoutes } = await getLivePricing();

  const sections: string[] = [];

  // ── 1. Company Overview ─────────────────────────────────────────────────
  sections.push(`
=== AL KISWAH UMRAH TRANSPORT — BUSINESS OVERVIEW ===
Company: Al Kiswah Umrah Transport
Speciality: Premium Umrah taxi & transport service across Saudi Arabia
Coverage: Jeddah ↔ Makkah ↔ Madinah ↔ Taif and all inter-city routes
USP: Owner-operated fleet (no middlemen) — lowest wholesale rates
Payment: Book now, pay cash (SAR) to driver on arrival. No credit card needed.
Flight tracking: Drivers track flights in real-time. Free wait even if delayed.
Meet & Greet: Driver holds name-sign at arrival hall. Driver photo + WhatsApp shared before landing.
All prices are FIXED — no hidden fees, parking charges, or VAT surprises.
`.trim());

  // ── 2. Contact Info ──────────────────────────────────────────────────────
  sections.push(`
=== CONTACT INFORMATION ===
WhatsApp / Phone : ${settings.contact.whatsapp || settings.contact.phone}
Email            : ${settings.contact.email}
Location         : ${settings.contact.address}
`.trim());

  // ── 3. Fleet Guide ──────────────────────────────────────────────────────
  sections.push(`
=== FLEET & VEHICLE GUIDE ===
Choose based on group size and luggage. All vehicles are 2024/2025 models, deep-cleaned before every trip.

| Vehicle            | Capacity | Luggage            | Best For                                  |
|--------------------|----------|--------------------|-------------------------------------------|
| Toyota Camry       | 4 pax    | 2 large suitcases  | Couples, small families (1-4 pax)         |
| Kia K5             | 4 pax    | 2 large suitcases  | Couples, professionals                    |
| Mitsubishi Xpander | 6 pax    | 3 large suitcases  | Small families with moderate luggage      |
| Hyundai Staria     | 7 pax    | 4 large suitcases  | Families wanting modern/premium comfort   |
| Hyundai H1 (Starex)| 7 pax    | 4 large suitcases  | Budget-friendly family van                |
| GMC Yukon XL Denali| 7 pax    | 5 large suitcases  | VIP families — maximum luxury & space     |
| Toyota HiAce       | 10 pax   | 8 large suitcases  | Groups of 8-12, small tours               |
| Toyota Coaster     | 19 pax   | 19 large suitcases | Large groups, tour parties (13-21 pax)    |

VEHICLE RECOMMENDATION GUIDE:
• 1–4 passengers          → Toyota Camry or Kia K5
• 5–6 passengers          → Mitsubishi Xpander
• 5–7 passengers (luxury) → GMC Yukon XL Denali or Hyundai Staria
• 5–7 passengers (budget) → Hyundai H1 / Starex
• 8–12 passengers         → Toyota HiAce
• 13–21 passengers        → Toyota Coaster (multiple units for larger groups)

Features common to all: Air conditioning, USB charging, professional driver.
Premium (GMC, Staria): Leather seats, dual AC, panoramic windows, extra legroom.
`.trim());

  // ── 4. Pricing Table (live from MongoDB — matches admin panel) ──────────
  const vehicleHeaders = ['camry', 'gmc', 'staria', 'starex', 'hiace', 'coaster'];
  const vehicleDisplayNames: Record<string, string> = {
    camry:   'Camry',
    gmc:     'GMC',
    staria:  'Staria',
    starex:  'H1/Starex',
    hiace:   'HiAce',
    coaster: 'Coaster',
  };

  const pricingRows = (liveRoutes as LiveRouteEntry[]).map((r) => {
    const rates = vehicleHeaders
      .map((v) => {
        const rate = r.customRates?.[v];
        return rate != null ? `${rate}` : '—';
      })
      .join(' | ');
    return `| ${r.name} (${r.distance}, ${r.duration}) | ${rates} |`;
  });

  const vehicleHeaderRow = vehicleHeaders.map((v) => vehicleDisplayNames[v]).join(' | ');

  sections.push(`
=== PRICING TABLE (all prices in SAR) ===
| Route (Distance, Est. Time)                       | ${vehicleHeaderRow} |
|---------------------------------------------------|${vehicleHeaders.map(() => '--------').join('|')}|
${pricingRows.join('\n')}

NOTE: Hourly rental is per hour; minimum 1 hour. All other prices are fixed per trip.
Multiple legs/transfers: 5% discount applies automatically when booking 3+ legs.
`.trim());

  // ── 5. Ziyarat Tours ────────────────────────────────────────────────────
  const packageSummaries = tourPackages.map((pkg) => {
    const priceStr = Object.entries(pkg.prices)
      .filter(([k]) => vehicleLabels[k])
      .map(([k, v]) => `${vehicleLabels[k].name} (${vehicleLabels[k].capacity}): ${v} SAR`)
      .join(', ');
    return `
${pkg.name} — ${pkg.city} | Duration: ${pkg.duration} | Distance: ${pkg.distance}
Description: ${pkg.description}
Sites: ${pkg.locations.join(', ')}
Family Notes: ${pkg.familyNotes}
What to Expect: ${pkg.whatToExpect}
Prices: ${priceStr}`.trim();
  });

  sections.push(`
=== ZIYARAT TOUR PACKAGES ===
${packageSummaries.join('\n\n')}
`.trim());

  // ── 6. Makkah Ziyarat Sites ─────────────────────────────────────────────
  const makkahSummary = makkahSites.map(
    (s) => `• ${s.name}: ${s.significance}. Best time: ${s.bestTime}. Accessibility: ${s.accessibility}.`
  );

  sections.push(`
=== MAKKAH ZIYARAT SITES ===
${makkahSummary.join('\n')}
`.trim());

  // ── 7. Madinah Ziyarat Sites ────────────────────────────────────────────
  const madinahSummary = madinahSites.map(
    (s) => `• ${s.name}: ${s.significance}. Best time: ${s.bestTime}. Accessibility: ${s.accessibility}.`
  );

  sections.push(`
=== MADINAH ZIYARAT SITES ===
${madinahSummary.join('\n')}
`.trim());

  // ── 8. Jeddah & Taif Sites ──────────────────────────────────────────────
  const jeddahSummary = jeddahSites.map((s) => `• ${s.name}: ${s.significance}.`);
  const taifSummary   = taifSites.map((s)   => `• ${s.name}: ${s.significance}.`);

  sections.push(`
=== JEDDAH SITES ===
${jeddahSummary.join('\n')}

=== TAIF SITES ===
${taifSummary.join('\n')}
`.trim());

  // ── 9. FAQs ─────────────────────────────────────────────────────────────
  const faqText = enFaqs
    .map((faq, i) => `Q${i + 1}: ${faq.question}\nA: ${faq.answer}`)
    .join('\n\n');

  sections.push(`
=== FREQUENTLY ASKED QUESTIONS ===
${faqText}
`.trim());

  // ── 10. Booking Policies ────────────────────────────────────────────────
  sections.push(`
=== BOOKING POLICIES ===
• Payment: Cash (SAR) to driver on arrival. No upfront payment needed.
• Cancellation: Contact us via WhatsApp. We are flexible for genuine emergencies.
• Waiting time: Included for airport pickups. Driver tracks your flight.
• Child seats: Available on request. Mention in booking notes.
• Advance booking: Recommended 2-3 months ahead during Ramadan season.
• Multiple vehicles: Available for large groups — request in notes.
• Miqat stop (Madinah to Makkah): Can be arranged. Mention in notes.
`.trim());

  return sections.join('\n\n' + '─'.repeat(70) + '\n\n');
}
