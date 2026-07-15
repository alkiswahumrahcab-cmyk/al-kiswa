# Al Kiswah — Professional Redesign Execution Plan

> **Companion to `design.md`.** `design.md` is *what* the site should be (the contract). This file is *how* to get there — a sequenced, phase-by-phase build plan with acceptance criteria and paste-ready Claude Code prompts.
>
> **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind v3 · MongoDB.
> **Engine:** Claude Code (runs in your environment with your git auth).
> **Current state:** a partial bright build already exists (ivory theme + booking widget landed). So the early phases are **audit-and-correct**, not build-from-scratch.

---

## Guiding rules for the whole project

1. **One phase = one branch = one reviewable PR.** Never mix phases. Merge only when that phase's *Done when* criteria all pass.
2. **`design.md` wins every disagreement.** If code and spec differ, fix the code.
3. **Tokens only — zero hardcoded hex in components.** If a value is missing, add it to the token layer.
4. **Commit convention:** `type(scope): summary` (e.g. `feat(hero): …`, `fix(buttons): …`, `perf(images): …`, `chore(security): …`).
5. **Test at 4 widths every time:** `375px (mobile) · 1280 · 1536 · 1920`. The 1920 check is non-negotiable (that's where the old float bug lived).
6. **Screenshot before/after each phase.** Bright themes hide nothing — you want a visual record.

---

## Phase map (do them in this order)

| # | Phase | Type | Why it's here |
|---|---|---|---|
| 0 | Safety net + security | Critical | Never redesign on exposed credentials |
| 1 | Foundation (tokens, fonts, theme, container) | Build/verify | Everything downstream depends on it |
| 2 | Core component kit | Build/correct | Build primitives once, reuse everywhere |
| 3 | Hero (flagship) | Build/correct | Highest-impact, most-seen section |
| 4 | Homepage sections | Build | The conversion rhythm |
| 5 | Interior pages | Build | Services, routes, fleet, blog, booking |
| 6 | Literal sweep + consistency audit | Cleanup | Kills the ~2,633 hex literals + drift |
| 7 | Performance (LCP/CLS/TBT) | Harden | Your known pain point |
| 8 | Accessibility + RTL | Harden | AA, focus, reduced-motion, AR/UR mirror |
| 9 | QA + launch | Ship | Cross-browser, staging, deploy, monitor |

---

## Phase 0 — Safety net & security (do this FIRST)

**Objective:** never build a beautiful UI on top of an unlocked back door. Lock the repo, take a baseline, fix the exposed security issues before touching design.

**Steps**
1. **Backup & branch:** confirm `main` is clean and pushed. Create `redesign/` branches off it per phase.
2. **Rotate every exposed secret NOW** (DB connection string, API keys, admin credentials) — assume anything committed to a public repo is compromised.
3. **Remove hardcoded credentials** from source → move to `.env` / environment variables. Add `.env*` to `.gitignore`.
4. **Purge secrets from git history** (they persist in old commits even after deletion) — use `git filter-repo` or BFG, then force-push and re-rotate.
5. **Fix the unauthenticated admin-reset endpoint** — require auth/authorization; no privileged action reachable without a valid session.
6. **Baseline audit:** run Lighthouse (mobile) on homepage + booking page, save the scores (LCP/CLS/TBT). Screenshot every page. Inventory pages and shared components.

**Claude Code prompt**
```
Security hardening pass before the redesign. In this repo:
1. Find all hardcoded secrets (DB URIs, API keys, admin credentials, tokens). List them,
   then move each to environment variables (.env.local) and reference via process.env.
   Add .env* to .gitignore. DO NOT print secret values in output.
2. Find the admin/reset endpoint(s). Add authentication + authorization so no privileged
   action (reset, delete, admin mutation) is reachable without a valid authenticated session.
3. Output a checklist of secrets found and endpoints fixed so I can rotate and verify.
Commit as: chore(security): remove hardcoded secrets, auth-protect admin endpoints
(Note: I will rotate the secrets and purge git history separately — flag if history rewrite is needed.)
```

**Done when:** no secrets in source or history · admin actions require auth · baseline Lighthouse + screenshots saved.

---

## Phase 1 — Foundation

**Objective:** put the design-system plumbing in place so every later phase just consumes tokens. Verify what already exists, fill what's missing.

**Steps (per `design.md` §3.4, §4, §5.4, §12)**
1. **CSS variables:** ensure the full `:root` block (surfaces, text, gold, dark-anchor, semantic, radius incl. `--radius-btn: 8px`, shadows) is in `globals.css`.
2. **Fonts:** load **Cormorant Garamond** + **Manrope** via `next/font` (weights per §4), `display: swap`, preload. Wire `--font-display` / `--font-body`.
3. **Tailwind config:** extend `colors`, `fontFamily`, `borderRadius` (incl. `btn`), `boxShadow`, `maxWidth.container` per §12.
4. **Theme:** confirm `forcedTheme="dark"` is fully removed and the app is light-only (no dark overrides lingering).
5. **Container fix:** add the `.container` utility (§5.4) and apply to **Navbar + Footer** — full-bleed background, `1280px` centered content. This kills the 1920px float bug.

**Claude Code prompt**
```
Verify + complete the design-system foundation from design.md:
1. globals.css :root — ensure ALL tokens present (§3.4), including --radius-btn: 8px. Add any missing.
2. Fonts — Cormorant Garamond + Manrope via next/font, display swap + preload, wired to
   --font-display / --font-body. Weights per §4.
3. tailwind.config — extend colors/fontFamily/borderRadius(incl btn)/boxShadow/maxWidth.container per §12.
4. Remove any remaining forcedTheme="dark"; app is light-only.
5. Add the .container utility (§5.4) and apply to Navbar + Footer.
Verify at 1280/1536/1920: navbar + footer content centered, background full-bleed, no float/misalignment.
Commit as: feat(foundation): design tokens, fonts, container fix, light-only theme
```

**Done when:** all tokens live · both fonts render · light-only · navbar/footer perfect at 1920.

---

## Phase 2 — Core component kit

**Objective:** build/correct the reusable primitives once so pages inherit consistency. This is where your current pill-button and contrast issues get fixed at the source.

**Components (per `design.md` §7)**
- **Buttons (§7.1):** rectangular **8px** (`--radius-btn`), **charcoal text on gold**, all variants identical shape. Retire every pill.
- **Inputs (§7.6):** 12px radius, gold focus ring, 48px tall, 16px font.
- **Cards (§7.3):** 16–20px radius, hairline or soft shadow, ≤`-2px` hover.
- **Booking widget (§7.2):** verify it matches spec (icons, trust line, rectangular Get Prices, charcoal-on-gold).
- **Navbar (§7.4):** active link = gold text/underline (**not a pill**); CTA rectangular; scroll state solid ivory + hairline.
- **Footer (§7.5):** dark anchor, `.container` inner.
- **Badges/tags:** the only place `--radius-pill` is allowed.

**Claude Code prompt**
```
Build/correct the core component kit to design.md §7. Reusable components only, tokens only.
1. Buttons (§7.1): rectangular 8px (rounded-btn), charcoal text (--color-ink) on gold, ALL
   variants identical shape. Remove every pill/rounded-full from buttons sitewide (navbar
   "Book Now", widget "Get Prices", CTA buttons, icon buttons).
2. Inputs (§7.6), Cards (§7.3) to spec.
3. Navbar (§7.4): active nav = gold text + underline, NOT a pill. Scroll → solid ivory + hairline.
4. Footer (§7.5): dark anchor, .container inner.
5. Reserve rounded-pill for tags/badges/avatars ONLY.
Verify at all widths: every button a crisp 8px rectangle, identical, charcoal-on-gold. No pills except badges.
Commit as: feat(components): rectangular buttons, inputs, cards, navbar/footer to spec
```

**Done when:** every button identical 8px charcoal-on-gold · no stray pills · inputs/cards/nav/footer on spec.

---

## Phase 3 — Hero (flagship)

**Objective:** make the first screen fully on-spec. Right now it needs: **serif H1**, **trust row**, **rectangular CTA**, and confirmed widget-on-fold.

**Spec:** `design.md` §7.11 (+ §7.2). Asymmetric 7/5 split · Cormorant H1 · eyebrow · subhead · trust row (stars + "10,000+ pilgrims" · "Nusuk-approved") · warm image right · booking widget spanning below, overlapping the fold · single `<h1>`.

**Claude Code prompt** — (use the detailed hero prompt already prepared; condensed here)
```
Bring the homepage hero fully to design.md §7.11:
1. H1 → Cormorant Garamond 600, 68px/40px, --color-ink. (It's currently sans-serif — fix.)
   Ensure it's inside .container and scales cleanly; no overflow at any width.
2. Add trust microcopy row under the subhead: 5 gold stars + rating · "10,000+ pilgrims served"
   · "Nusuk-approved" (Manrope 14, muted).
3. Confirm the booking widget sits on the fold, overlapping the hero's bottom edge (§7.2),
   Get Prices = rectangular 8px, charcoal-on-gold.
4. Keep all copy on ivory (never over the image). One <h1> on the page.
Verify 375/1280/1536/1920 + LCP/CLS. No entrance animation.
Commit as: fix(hero): Cormorant H1, trust row, on-fold widget, rectangular CTA
```

**Done when:** serif H1 · trust row present · widget on fold · CTA rectangular · clean at 1920 + mobile.

---

## Phase 4 — Homepage sections

**Objective:** build the full conversion rhythm below the hero, in order, with Cormorant headings and alternating bands.

**Section order (per `design.md` §8):**
`Trust bar → How it works → Fleet → Popular routes → Why Al Kiswah → Testimonials → FAQ → CTA band → Footer.`

**Rules**
- Every section heading in **Cormorant** with a gold **eyebrow** above it.
- Alternate `bg` (ivory) / `surface-alt` (sand) bands (§5.3).
- Section vertical padding `120px` desktop / `64px` mobile (§5.2).
- Fleet capacities exact: **Staria 5–7 · HiAce 11 · Coaster 19.**
- FAQ includes FAQ schema markup.

**Claude Code prompt**
```
Build homepage sections below the hero, in this order, per design.md §8 + component specs:
Trust bar (§7.7) → How it works (§7.8, numbered steps) → Fleet (§7.3, Staria 5-7/HiAce 11/
Coaster 19, from-price in gold) → Popular routes (§7.3) → Why Al Kiswah (4 feature cards §7.3)
→ Testimonials (§7.3, stars + country) → FAQ (§7.9 accordion + FAQ schema) → CTA band (§7.10,
dark anchor) → Footer.
Rules: every section heading in Cormorant + gold eyebrow; alternate ivory/sand bands (§5.3);
section padding 120/64 (§5.2); tokens only; near-zero motion (§10).
Verify all widths. Commit per section, e.g. feat(home): fleet section
```

**Done when:** all sections built, correct order, Cormorant headings, alternating bands, FAQ schema present.

---

## Phase 5 — Interior pages

**Objective:** carry the system into every remaining page so the site is consistent end to end.

**Pages:** service pages (Jeddah Airport Transfer, Ziyarat Tours, etc.) · route pages · fleet detail pages · blog index + post template · contact · the full **booking flow** (this one is performance-sensitive).

**Steps**
- Reuse Phase 2 components — do **not** build new one-off styles.
- Apply the same section rhythm, Cormorant headings, eyebrows, bands.
- Booking flow: keep it fast and low-CLS (it was a Core Web Vitals pain point).
- Interior page hero pattern: smaller than homepage hero, same tokens.

**Claude Code prompt**
```
Apply the design system to interior pages using existing Phase-2 components (no new one-off styles):
service pages, route pages, fleet detail, blog index + post template, contact, and the booking flow.
Same section rhythm (§5.2/§5.3), Cormorant headings + gold eyebrows, tokens only, near-zero motion.
Booking flow: prioritize speed + zero layout shift (reserve field/summary space).
Verify each page at 375/1280/1536/1920. Commit per page group.
```

**Done when:** every page uses shared components · consistent headings/bands · booking flow fast + stable.

---

## Phase 6 — Literal sweep & consistency audit

**Objective:** eliminate the ~2,633 hardcoded color literals and any remaining drift so the system is airtight.

**Audits**
1. **Hex sweep:** replace every remaining raw hex with a token; if a needed value is absent, add it to the token layer (don't inline).
2. **Heading audit:** every heading is **Cormorant** (catch the "Premium Transport for Your Spiritual Journey"-type sans headings).
3. **Button audit:** every button 8px rectangular, charcoal-on-gold, identical.
4. **Gold-contrast audit:** no white-on-gold anywhere.
5. **Pill audit:** pills only on tags/badges/avatars.

**Claude Code prompt**
```
Final consistency sweep:
1. Find EVERY remaining hardcoded hex/rgb color literal in components. Replace with the matching
   design.md token. If a value has no token, add it to :root + tailwind, then use it. Report the count
   before/after (target: ~0 literals in components).
2. Heading audit: every <h1..h4> renders in Cormorant Garamond. Fix any sans headings.
3. Button audit: all buttons rounded-btn (8px), charcoal-on-gold, identical. Fix strays.
4. Contrast audit: no white text on gold anywhere.
5. Pill audit: rounded-full/pill only on tags/badges/avatars.
Output a short report of what was changed per audit.
Commit as: refactor(tokens): eliminate hardcoded literals + consistency audit
```

**Done when:** ~0 hex literals in components · all headings serif · all buttons uniform · no white-on-gold · pills scoped.

---

## Phase 7 — Performance (LCP / CLS / TBT)

**Objective:** hit green Core Web Vitals on mobile — directly targeting your booking-page history.

**Steps (per `design.md` §10a)**
- **Images:** `next/image`, `priority` on hero only, explicit dimensions, AVIF/WebP, responsive `sizes`, lazy-load below fold.
- **Fonts:** `next/font` swap + preload; subset to used glyphs; only listed weights.
- **JS/TBT:** server components by default; interactive islands only (widget, accordion, drawer, language switcher); no animation libraries.
- **CLS:** reserve space for hero image, widget, navbar, and any async content.
- **Re-measure** vs the Phase-0 baseline.

**Claude Code prompt**
```
Performance hardening to design.md §10a. Target: green mobile Core Web Vitals.
1. Images: next/image everywhere; priority on hero only; explicit width/height; AVIF/WebP;
   responsive sizes; lazy-load below the fold.
2. Fonts: next/font swap + preload; subset; only weights used.
3. Reduce client JS: convert to server components where possible; keep client only for widget,
   accordion, drawer, language switcher. Remove any animation library (CSS-only micro-motion, §10).
4. CLS: reserve space for hero image, booking widget, navbar, async content.
Re-run Lighthouse mobile on homepage + booking page; report LCP/CLS/TBT vs baseline.
Commit as: perf(cwv): image/font/JS optimization, reserve layout space
```

**Done when:** LCP/CLS/TBT green on mobile for homepage + booking page, improved vs baseline.

---

## Phase 8 — Accessibility & RTL

**Objective:** meet the AA floor and make Arabic/Urdu mirror cleanly.

**Steps (per `design.md` §11)**
- Contrast AA (charcoal-on-ivory, charcoal-on-gold pass; never white-on-gold).
- Visible `:focus-visible` (gold ring) on every interactive element.
- Tap targets ≥ 44px.
- Semantic HTML + ARIA on widget, accordion, drawer.
- Full keyboard operability.
- `prefers-reduced-motion` removes even micro-transitions.
- **RTL:** logical properties throughout (`margin/padding-inline`, `start/end`); the hero 7/5 split, trust row, nav, and widget all mirror for AR/UR.

**Claude Code prompt**
```
Accessibility + RTL pass to design.md §11:
1. Contrast AA sitewide; confirm no white-on-gold.
2. Visible focus-visible (gold ring) on all interactive elements; tab order logical.
3. Tap targets >= 44px. ARIA on booking widget, accordion, mobile drawer.
4. prefers-reduced-motion removes all micro-transitions.
5. RTL: convert directional CSS to logical properties; verify AR/UR mirror the hero split,
   nav, trust row, widget, footer with no clipping/overlap.
Test with keyboard only + an AR locale. Commit as: a11y(rtl): AA contrast, focus, reduced-motion, mirroring
```

**Done when:** AA passes · keyboard-complete · reduced-motion respected · AR/UR mirror clean.

---

## Phase 9 — QA & launch

**Objective:** verify the whole thing, then ship safely.

**QA matrix**
- **Breakpoints:** 375 · 768 · 1024 · 1280 · 1536 · **1920** (+ 2560 if you can).
- **Browsers:** Chrome, Safari, Firefox, Edge; iOS Safari + Android Chrome.
- **Regression:** every page against Phase-0 screenshots.
- **Lighthouse:** homepage + booking, mobile + desktop, vs baseline.
- **Functional:** booking flow end to end, all forms, language switch, WhatsApp/CTA links.

**Launch**
1. Deploy to a **staging/preview** URL; review the full matrix there.
2. Fix blockers; re-verify.
3. Merge to `main`, deploy production.
4. **Post-launch (first 48h):** watch real-user Core Web Vitals, error logs, and booking conversions. Keep the previous build ready to roll back.

**Done when:** matrix green · staging approved · production deployed · monitoring live · rollback ready.
