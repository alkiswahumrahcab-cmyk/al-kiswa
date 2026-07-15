# Al Kiswah Umrah Transport — Design System (`design.md`)

> **Purpose of this file.** This is the single source of truth for the Al Kiswah UI redesign. It is written to be consumed by Claude Code (and any human implementer) to generate a consistent, premium, bright interface. Every token, component, and layout rule below is normative — when in doubt, this file wins over any existing hardcoded value.
>
> **Stack it targets:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v3 · MongoDB.

---

## 1. North Star

Al Kiswah moves pilgrims to and from the two holiest cities on earth. The interface must feel **calm, trustworthy, and quietly luxurious** — never loud, never cheap, never cluttered. A visitor who has never booked private transport before should be able to get a price in under 15 seconds without feeling lost.

**The redesign thesis:** take the *bookable clarity and airy spatial rhythm* of a best-in-class airport-transfer product (Welcome Pickups) and dress it in Al Kiswah's *sacred-luxury identity* (warm ivory, editorial serif, restrained gold).

Three words to hold every decision against: **Serene. Premium. Effortless.**

### Migration context (read before touching code)
- The current site is **dark-themed** with `forcedTheme="dark"` hardcoded and ~2,633 hardcoded color literals. This design is a **full migration to a bright/ivory light theme**. Remove `forcedTheme="dark"`; there is one theme — light.
- **Never reintroduce raw hex literals in components.** All color must resolve through the CSS variables / Tailwind tokens in §3. If a value you need doesn't exist as a token, add it to the token layer, don't inline it.

---

## 2. Design Principles

1. **Whitespace is the luxury.** Generous breathing room between and inside sections is the single most important trait carried over from the reference. Cramped = cheap. When unsure, add space.
2. **One idea per section.** Each full-width band does exactly one job (book, prove trust, explain steps, show fleet…). No section fights another for attention.
3. **The booking widget is the hero.** The primary conversion action lives in the first viewport, always reachable, never buried.
4. **Gold is a seasoning, not a sauce.** Gold marks the single most important thing in any view (primary CTA, active state, key accent). Over-using gold destroys the premium feel. Most of the page is ivory + charcoal.
5. **Serif for soul, sans for function.** Cormorant Garamond carries emotion and hierarchy (headings, hero, quotes). Manrope carries everything you interact with or read at length (body, UI, buttons, forms).
6. **Near-zero motion.** Animation is negligible by default — only instant micro-feedback on interaction (hover/press/focus). **No scroll-triggered reveals, no staggered entrances, no ambient motion.** Stillness reads as premium *and* keeps the page fast. When in doubt, don't animate.
7. **Fast is a feature.** Performance is a first-class design constraint, not an afterthought. Every decision is weighed against load speed and Core Web Vitals (LCP, CLS, TBT). A calm, still, instantly-usable page beats a decorated slow one every time.
8. **Accessible by default.** WCAG AA contrast, visible keyboard focus, 44px minimum tap targets. Non-negotiable.

---

## 3. Color System

Warm, bright, sand-and-gold. No pure `#FFFFFF` backgrounds at page level — everything is warm ivory so the page feels soft and premium rather than clinical.

### 3.1 Core tokens

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#FDFCF8` | Page background (warm ivory) — the default surface |
| `--color-surface` | `#FFFEFB` | Elevated cards / booking widget (a hair brighter than bg) |
| `--color-surface-alt` | `#F5F0E6` | Alternating section band (warm sand) for the striped rhythm |
| `--color-surface-sunken` | `#F1EADB` | Insets, wells, disabled fields |
| `--color-border` | `#EAE2D1` | Hairlines, card borders, dividers |
| `--color-border-strong` | `#D9CEB6` | Input borders, stronger separation |
| `--color-ink` | `#15140F` | Headings — warm charcoal (brand base) |
| `--color-body` | `#413D35` | Body text (softer than ink for long-form reading) |
| `--color-muted` | `#726C60` | Secondary/caption text, placeholders |
| `--color-gold` | `#E2A336` | **Brand gold** — primary accent & CTA |
| `--color-gold-strong` | `#C4881F` | Gold hover/pressed, text-on-ivory when gold text is needed |
| `--color-gold-soft` | `#F7E7C4` | Gold tint backgrounds (badges, highlights, hover fills) |
| `--color-gold-line` | `#EBD8AD` | Gold hairlines / subtle gold borders |

> **Gold contrast rule:** `#E2A336` is a light-mid gold. **White text on gold fails WCAG.** Primary buttons therefore use **charcoal text on gold** (passes AA and reads more premium). Only use `--color-gold-strong` when gold must sit as *text on ivory*.

### 3.2 Anchor dark (for CTA bands & footer)

The design is bright, but a few bands need a dark anchor for contrast and drama (final CTA, footer). Use the brand charcoal, not black.

| Token | Hex | Role |
|---|---|---|
| `--color-ink-bg` | `#15140F` | Dark band background (CTA / footer) |
| `--color-ink-surface` | `#211F17` | Cards on dark bands |
| `--color-on-ink` | `#F3EEE2` | Text on dark bands |
| `--color-on-ink-muted` | `#A79F8C` | Muted text on dark bands |

### 3.3 Semantic / state

| Token | Hex | Role |
|---|---|---|
| `--color-success` | `#2E7D5B` | Confirmations, "booking confirmed", positive |
| `--color-success-soft` | `#E2F0E8` | Success background tint |
| `--color-warning` | `#B8791E` | Warnings (kept in the gold family, deeper) |
| `--color-error` | `#B4442F` | Errors — warm brick, never a harsh red |
| `--color-error-soft` | `#F6E3DD` | Error background tint |
| `--color-info` | `#2A6F7A` | Neutral info, deep teal |

### 3.4 CSS variable block (drop into `globals.css` `:root`)

```css
:root {
  /* surfaces */
  --color-bg: #FDFCF8;
  --color-surface: #FFFEFB;
  --color-surface-alt: #F5F0E6;
  --color-surface-sunken: #F1EADB;
  --color-border: #EAE2D1;
  --color-border-strong: #D9CEB6;

  /* text */
  --color-ink: #15140F;
  --color-body: #413D35;
  --color-muted: #726C60;

  /* gold */
  --color-gold: #E2A336;
  --color-gold-strong: #C4881F;
  --color-gold-soft: #F7E7C4;
  --color-gold-line: #EBD8AD;

  /* dark anchor */
  --color-ink-bg: #15140F;
  --color-ink-surface: #211F17;
  --color-on-ink: #F3EEE2;
  --color-on-ink-muted: #A79F8C;

  /* semantic */
  --color-success: #2E7D5B;
  --color-success-soft: #E2F0E8;
  --color-warning: #B8791E;
  --color-error: #B4442F;
  --color-error-soft: #F6E3DD;
  --color-info: #2A6F7A;

  /* radius */
  --radius-btn: 8px;   /* buttons: rectangular with a small radius — corporate/premium, NOT pill */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 9999px; /* reserved for tags/badges/avatars only — never buttons */

  /* elevation (warm, low-spread) */
  --shadow-xs: 0 1px 2px rgba(21,20,15,0.04);
  --shadow-sm: 0 2px 8px rgba(21,20,15,0.05);
  --shadow-md: 0 8px 24px rgba(21,20,15,0.07);
  --shadow-lg: 0 16px 48px rgba(21,20,15,0.10);
  --shadow-gold: 0 8px 24px rgba(226,163,54,0.22);

  /* motion */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur: 320ms;
}
```

---

## 4. Typography

Two families, deliberately paired. **Cormorant Garamond** = high-contrast editorial serif for personality and hierarchy. **Manrope** = clean geometric sans for readability and UI.

```css
--font-display: 'Cormorant Garamond', 'Times New Roman', serif;
--font-body: 'Manrope', system-ui, -apple-system, sans-serif;
```

**Loading:** self-host via `next/font` (do not FOUT). Weights needed: Cormorant Garamond 500 / 600 / 700; Manrope 400 / 500 / 600 / 700.

### 4.1 Type scale

Values are `desktop / mobile`. Line-heights tighten as size grows.

| Style | Font | Size (px) | Weight | Line-height | Tracking | Use |
|---|---|---|---|---|---|---|
| Display / Hero H1 | Cormorant | 68 / 40 | 600 | 1.04 | −0.01em | Hero headline only |
| H2 (section) | Cormorant | 44 / 30 | 600 | 1.1 | −0.005em | Section titles |
| H3 | Cormorant | 30 / 24 | 600 | 1.2 | 0 | Sub-sections, card titles (large) |
| H4 | Manrope | 22 / 19 | 700 | 1.3 | 0 | Card titles, feature headings |
| Eyebrow | Manrope | 13 / 12 | 600 | 1.4 | 0.14em UPPERCASE | Section labels, in gold |
| Lead / body-lg | Manrope | 19 / 17 | 400 | 1.65 | 0 | Hero subhead, intros |
| Body | Manrope | 16 / 16 | 400 | 1.65 | 0 | Default paragraph |
| Body-sm | Manrope | 14 / 14 | 400 | 1.6 | 0 | Captions, meta |
| Button | Manrope | 16 / 16 | 600 | 1 | 0.01em | All button labels |
| Overline data | Manrope | 12 / 12 | 600 | 1.4 | 0.08em | Stats labels, tags |

**Rules**
- Hero H1 and quotes are the only places Cormorant should feel *large and dramatic*. Elsewhere keep serif disciplined.
- Never set body copy in Cormorant — it's a display face; long paragraphs in it hurt readability.
- Eyebrows are always gold, uppercase, letter-spaced — they open most sections (`EYEBROW → H2 → lead`).
- Max reading width for body copy: `65ch`.

---

## 5. Spacing & Layout

The reference site's defining trait is **air**. This is where we spend it.

### 5.1 Spacing scale (8px base)

`4 · 8 · 12 · 16 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160`

Map to Tailwind's default scale (it already aligns to 4px). Prefer the larger end for section rhythm.

### 5.2 Section vertical rhythm (the airy feel)

| Context | Desktop | Mobile |
|---|---|---|
| Section padding (top & bottom) | `120px` | `64px` |
| Gap between eyebrow → H2 | `16px` | `12px` |
| Gap between H2 → lead | `20px` | `16px` |
| Gap between heading block → content | `56px` | `36px` |
| Gap between cards in a grid | `24–32px` | `16px` |

> Rule of thumb: sections should feel like they can **breathe**. If two sections feel like they're touching, increase padding before anything else.

### 5.3 Alternating band pattern

To create the reference's calm scannable rhythm, alternate section backgrounds:

```
[ bg (ivory) ] → [ surface-alt (sand) ] → [ bg ] → [ surface-alt ] → … → [ ink-bg (dark CTA) ] → [ footer ]
```

Never two full-bleed white cards on the same white background with no separation — use the sand band or hairline dividers.

### 5.4 Container & grid (fixes the 1920px float bug)

The current Navbar/Footer cap at `1536px` causes float/misalignment on 1920px monitors. **Fix pattern:** section *backgrounds* go full-bleed (`100%` width), while *content* lives in a centered container.

```css
.container {
  width: 100%;
  max-width: 1280px;   /* content ceiling */
  margin-inline: auto; /* centers on any monitor width, incl. 1920/2560 */
  padding-inline: 24px;
}
@media (min-width: 1536px) { .container { padding-inline: 32px; } }
```

- **Content max-width:** `1280px` (wide, generous, but never edge-to-edge on huge monitors).
- Navbar and Footer inner content use the **same `.container`** — this alone kills the float issue, because the bar background spans the viewport while its contents stay centered.
- Grid columns: 12-col mental model. Common layouts: fleet/routes = 3-up desktop / 2-up tablet / 1-up mobile; features = 2-up or 4-up; testimonials = 3-up.

### 5.5 Breakpoints

| Name | Min-width | Notes |
|---|---|---|
| `sm` | 640px | Large phone |
| `md` | 768px | Tablet — grids go 2-up |
| `lg` | 1024px | Small laptop — grids go 3-up, nav horizontal |
| `xl` | 1280px | Container ceiling reached |
| `2xl` | 1536px | **Test here + at 1920px** — content stays centered, no stretch |

---

## 6. Elevation, Radius & Borders

- **Radius:** cards `--radius-xl` (20px) or `--radius-lg` (16px); inputs `--radius-md` (12px); **buttons `--radius-btn` (8px) — rectangular with a small corner radius, never pill/fully-rounded**; images `--radius-lg`. Pill (`--radius-pill`) is reserved for tags, badges, and avatars only.
- **Shadows:** always warm and low-spread (see tokens). The **booking widget** gets `--shadow-lg`; standard cards get `--shadow-sm` at rest → `--shadow-md` on hover. Never use black/blue-tinted shadows.
- **Borders:** `1px solid var(--color-border)` for hairlines. Cards may use border *or* shadow, rarely both heavily — pick one as the primary lift.

---

## 7. Components

### 7.1 Buttons

| Variant | Background | Text | Border | Radius | Use |
|---|---|---|---|---|---|
| **Primary** | `--color-gold` → hover `--color-gold-strong` | `--color-ink` (charcoal) | none | `--radius-btn` (8px) | The one main action per view (Book / Get Prices) |
| **Secondary** | transparent → hover `--color-gold-soft` | `--color-ink` | `1.5px --color-border-strong` | `--radius-btn` (8px) | Alternate action |
| **Ghost / text** | transparent | `--color-gold-strong` | none | — | Low-priority links, "Learn more →" |
| **On-dark** | `--color-gold` | `--color-ink` | none | `--radius-btn` (8px) | Primary inside dark CTA band |

- **Corner radius: `--radius-btn` (8px) — rectangular with a small radius. Never pill, never fully-rounded.** This is a deliberate corporate/premium choice; the soft rectangle reads more professional and B2B-appropriate than a rounded pill. Apply the same 8px to every button variant and size for consistency.
- Padding: `14px 28px` (default), `12px 20px` (compact).
- Hover: darken + gain `--shadow-gold` (primary only), `150ms`. No movement needed.
- Focus-visible: `2px` gold outline, `2px` offset — always visible.
- Min height 48px (44px absolute floor) for tap targets.
- Label in Manrope 600, sentence case, active-voice verbs ("Get prices", not "Submit").

### 7.2 Booking widget (signature component — the hero centerpiece)

The most important element on the site. A floating elevated card holding the whole quote flow.

- **Container:** `--color-surface`, `--radius-xl`, `--shadow-lg`, padding `24–28px`, sits overlapping the hero (partially over image/lower hero).
- **Fields (desktop = one horizontal row; mobile = stacked):**
  `From (pickup)` · `To (dropoff)` · `Date & time` · `Passengers/vehicle` · **[Get prices]** (primary, gold).
- Each field: label (Manrope 600, 13px, muted) + input, dividers between fields on desktop (`1px --color-border`).
- Inputs: `--radius-md`, `1px --color-border-strong`, focus ring gold, 48px tall.
- Include a location/pin icon in From/To and a calendar icon in Date — line icons, gold.
- Below the widget: a thin trust line ("Fixed prices · Free cancellation · Nusuk-approved drivers") in Manrope 14 muted.

### 7.3 Cards (fleet, routes, features, testimonials)

- Base: `--color-surface`, `--radius-xl`, `1px --color-border`, `--shadow-sm`. Hover: shadow steps to `--shadow-md` (optional `translateY(-2px)` max), `150ms`. Respect reduced-motion.
- **Fleet card:** vehicle image (rounded top), name (H4), capacity badge (e.g. "11 seats · Toyota HiAce"), one-line description, "from SAR ___" in gold, CTA.
  - Confirmed capacities: **Hyundai Staria 5–7 · Toyota HiAce 11 seats · Toyota Coaster 19 seats.**
- **Route card:** route line (Jeddah → Makkah) with an arrow/pin motif, distance/time, "from" price, book link.
- **Feature card:** gold line-icon in a `--color-gold-soft` circle, H4 title, body-sm description. Used for value props (fixed pricing, English-speaking drivers, 24/7, Nusuk-approved).
- **Testimonial card:** Standardized globally. 
  - **Container**: Minimal glass/flat `bg-ivory`, `rounded-[16px]`, `border border-hairline`, `shadow-sm`, relative flex layout.
  - **Stars**: 5 solid gold stars (`size={16}`), flush left, spaced with `mb-6`. No backgrounds behind stars.
  - **Quote text**: `text-charcoal-soft`, `italic`, `font-display`, `text-lg` with `leading-[1.7]`. No giant quote icons.
  - **Footer**: Pushed to bottom with `mt-auto`, separated by top `border-hairline` and `pt-4`. Left side holds the reviewer's name (`font-semibold text-charcoal`), right side holds their location/date (`text-muted text-sm`). NO avatar images.

### 7.4 Navbar

- Full-bleed background; inner content in `.container`.
- **Over hero:** transparent with `--color-on-ink` text (if hero image is dark enough) OR ivory-tinted glass. **On scroll:** solid `--color-surface` + hairline bottom border + `--shadow-sm`, text switches to `--color-ink`.
- Logo left; nav links center/right (Manrope 500); primary CTA far right (rectangular 8px gold "Book now"); language switcher (EN/AR/ID/UR — RTL aware).
- Mobile: hamburger → full-height ivory drawer, generous spacing, CTA pinned.
- Active link: gold underline or gold text.

### 7.5 Footer

- Background `--color-ink-bg` (dark anchor), text `--color-on-ink`, muted `--color-on-ink-muted`, gold for links-on-hover and headings-accents.
- Multi-column: brand + short blurb + trust badges | Services | Routes | Company | Contact/WhatsApp.
- Inner content in `.container` (same fix as navbar — no float on wide screens).
- Bottom bar: hairline `rgba(243,238,226,0.12)`, copyright + legal links, small.

### 7.6 Forms & inputs

- Field: label (Manrope 600, 13px), input `--color-surface`, `1px --color-border-strong`, `--radius-md`, 48px tall, `16px` font (prevents iOS zoom).
- Focus: gold ring (`2px`), border → gold.
- Error: border `--color-error`, message below in `--color-error`, `--color-error-soft` fill optional. Errors state what happened + how to fix, in the interface's voice — no apologies, no vagueness.
- Placeholders: `--color-muted`, never used as the only label.

### 7.7 Trust bar

Thin band directly under hero: star rating + review count, "10,000+ pilgrims served" style stat, and partner/authority logos (Nusuk etc.) desaturated to sit quietly. Establishes credibility immediately (reference-site pattern).

### 7.8 "How it works" steps

3–4 steps in a row (Book → Meet your driver → Ride in comfort → Arrive). Each: numbered gold badge (numbering is legitimate here — it's a real sequence), line-icon, H4, body-sm. On mobile, stack vertically with a connecting line.

### 7.9 FAQ accordion

Ivory cards or hairline-divided rows; question in Manrope 600, chevron (gold) rotates on open; answer in body with generous padding. One open at a time optional. Include FAQ schema markup in the page (SEO).

### 7.10 CTA band (dark anchor)

Full-bleed `--color-ink-bg`, centered: eyebrow (gold) → H2 (Cormorant, `--color-on-ink`) → lead → primary gold button + WhatsApp secondary. This is the one deliberately dramatic dark moment before the footer.

### 7.11 Hero section (detailed) — the flagship

The hero does three jobs at once: it makes the first impression, states the promise, and starts the booking. It is also the **LCP element**, so it must render fast and shift nothing. Treat it as the most carefully-built section on the site.

**Layout: Full-bleed, image-led structure.**
- **Structure:** A single full-bleed section. The hero image fills the entire width and height. Content and widget overlay the image. The **booking widget spans the full width**, overlapping the hero's bottom edge so it sits on the fold (the reference's signature "book immediately" pattern).
- **Height:** content-driven, not `100vh`. Aim `min-height ~620px` desktop / `~460px` mobile, with top padding that clears the fixed navbar. Never let the widget push below the fold on a standard laptop.
- **Scrim:** A two-layer gradient scrim over the image (dark-to-transparent left-to-right, and bottom-up darkening) ensures AA-readability for the ivory text against any photo.

**Overlaid content (left-aligned, max-width ~640px), top to bottom:**
1. **Eyebrow** — Gold, uppercase, tracked (`0.14em`): "PRIVATE UMRAH & HAJJ TRANSPORT".
2. **H1** — Cormorant Garamond 600, 58px desktop / 33px mobile, line-height 1.04, Ivory (`#fff` on image). One gold accented word is allowed.
3. **Subhead** — Manrope 400, light text, max-width `~44ch`. 
4. **Trust microcopy row** — inline: 5 gold stars + 4.9 · "10,000+ pilgrims served" · "Nusuk-approved". Light text.

**Booking widget:** the hero's functional anchor — see §7.2. A white card (`--surface`, `--radius-xl`, `--shadow-lg`) pulled up via negative margin (e.g. `-96px`) so it breaks the fold. 
- **Desktop:** One horizontal row [From · To · Date · Passengers · Get Prices].
- **Mobile:** Stacked fields, full-width button.
- **Get Prices Button:** Rectangular 8px, gold background, charcoal text (`text-ink`).

**Performance rules (this section is the LCP):**
- The hero image is the LCP candidate: `next/image` with `priority`, explicit `width`/`height` or `fill`, AVIF/WebP, and a preload hint. Serve a correctly-sized image per breakpoint.
- H1 text must paint immediately: fonts via `next/font` with `display: swap`, preloaded, so the headline is never invisible.
- **Reserve space** for the image and the booking widget so nothing shifts after load (protects CLS).
- **No entrance animation** on the hero (per §10) — content is simply present on first paint.

**Accessibility & RTL:**
- Exactly one `<h1>` on the page, and it lives here.
- Hero image needs a meaningful `alt` (or empty `alt` if purely decorative and the message is fully in text).
- RTL (Arabic/Urdu): the content mirrors cleanly via logical properties.

**Copy voice:** calm, reassuring, pilgrim-first. Speak to the worry it removes ("no haggling at the airport, no waiting, a driver who speaks your language"). Never salesy, never loud.

---

## 8. Homepage anatomy (section order)

The reference's proven conversion rhythm, filled with Al Kiswah content:

```
1.  Navbar (transparent → solid on scroll)
2.  Hero            — headline + subhead + BOOKING WIDGET + warm Makkah/driver imagery
3.  Trust bar       — rating, pilgrims-served stat, Nusuk & partner logos
4.  How it works    — 3–4 numbered steps
5.  Fleet           — Staria / HiAce / Coaster cards with capacity + from-price
6.  Popular routes  — Jeddah↔Makkah, Makkah↔Madinah, Jeddah Airport, Taif… grid
7.  Why Al Kiswah   — 4 feature cards (fixed price, Nusuk-approved, English drivers, 24/7)
8.  Testimonials    — pilgrim quotes with stars + country
9.  FAQ             — accordion (+ schema)
10. CTA band        — dark anchor, "Book your Umrah transport"
11. Footer          — dark, multi-column
```

Alternate `bg` / `surface-alt` between sections 3–9 for the striped calm rhythm.

---

## 9. Imagery & Iconography

- **Photography:** warm, real, human, golden-hour. Pilgrims, drivers greeting families, spotless vehicles, Makkah/Madinah at dawn. Avoid cold/blue stock and empty corporate imagery. Apply `--radius-lg` to image containers; a very subtle warm overlay is fine to unify tone.
- **Icons:** single line style, `1.5–2px` stroke, rounded caps, `24px` grid (Lucide recommended — pairs with the stack). Icons are gold or charcoal, never multicolor. Feature icons sit in a `--color-gold-soft` circle.
- **Sacred imagery:** treat with dignity — no gimmicks, no heavy filters over the Kaaba/Haramain. Restraint.

---

## 10. Motion — negligible by default

The site is **essentially static**. No scroll animations, no entrance reveals, no ambient effects. Motion exists only as instant feedback that something responded to the user, and nothing more.

**Allowed (micro-feedback only):**
- **Hover:** buttons/cards change color and/or shadow with a short `150ms` ease. Keep card lift to a subtle `-2px` max, or drop the transform entirely and change shadow only. No large movement.
- **Focus:** gold focus ring appears instantly (no animated ring).
- **Press:** brief color/opacity shift.
- **Accordion & mobile drawer:** a quick open/close (`≤200ms`) — these are functional, not decorative.

**Not allowed:**
- Scroll-triggered fade/rise reveals.
- Staggered sequences across grids.
- Parallax, ambient/looping motion, animated counters, decorative transitions.
- Anything that delays content becoming visible or interactive (protects LCP/TBT).

**Rules**
- Nothing animates on first paint — content is there immediately (no reveal-on-load that hurts LCP or causes CLS).
- Keep all transitions `≤200ms`, transform/opacity only (GPU-cheap), never animate layout properties.
- `@media (prefers-reduced-motion: reduce)` → remove even the micro-transitions. Mandatory.

## 10a. Performance mandate (design-level)

Speed is part of the design. Enforce alongside the visual spec:

- **LCP:** the hero heading/image and booking widget must render fast. Preload the hero image, set explicit `width`/`height`, use `next/image` with priority on the hero only. Self-host fonts via `next/font` with `display: swap` and preload — no render-blocking font requests, no layout shift from font swap.
- **CLS:** reserve space for every image, the booking widget, and the navbar. No content that pushes layout after load. Fixed dimensions on media; skeleton/placeholder sized to final content.
- **TBT/JS:** ship minimal client JS. Prefer server components; make interactive islands (booking widget, accordion, drawer, language switcher) the only client components. No heavy animation libraries — the near-zero motion above needs only CSS.
- **Images:** modern formats (AVIF/WebP), responsive `sizes`, lazy-load everything below the fold, eager-load only the hero.
- **Fonts:** subset to the glyphs used (Latin + Arabic where needed); load only the weights listed in §4.
- **Target:** green Core Web Vitals on mobile. Re-check LCP / CLS / TBT after the migration, since these were the booking-page pain points.

---

## 11. Accessibility floor (non-negotiable)

- Contrast AA: charcoal-on-ivory and charcoal-on-gold both pass; **never white-on-gold**.
- Visible `:focus-visible` on every interactive element (gold outline).
- Tap targets ≥ 44px.
- Semantic HTML + ARIA on accordion, drawer, widget.
- Full keyboard operability; logical tab order.
- **RTL:** Arabic/Urdu are supported languages — use logical properties (`margin-inline`, `padding-inline`, `start/end`) throughout so the layout mirrors cleanly. No hardcoded left/right.

---

## 12. Tailwind implementation

Extend `tailwind.config.js` so tokens are usable as classes (`bg-bg`, `text-ink`, `text-gold`, `bg-surface-alt`, etc.). This is what lets Claude Code replace the ~2,633 hardcoded literals with tokens.

```js
// tailwind.config.js
module.exports = {
  darkMode: 'class', // but ship light only; do NOT force dark
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        'surface-sunken': 'var(--color-surface-sunken)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        ink: 'var(--color-ink)',
        body: 'var(--color-body)',
        muted: 'var(--color-muted)',
        gold: 'var(--color-gold)',
        'gold-strong': 'var(--color-gold-strong)',
        'gold-soft': 'var(--color-gold-soft)',
        'gold-line': 'var(--color-gold-line)',
        'ink-bg': 'var(--color-ink-bg)',
        'ink-surface': 'var(--color-ink-surface)',
        'on-ink': 'var(--color-on-ink)',
        'on-ink-muted': 'var(--color-on-ink-muted)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      borderRadius: {
        btn: 'var(--radius-btn)',  // rectangular buttons (8px)
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        pill: 'var(--radius-pill)', // tags/badges/avatars only
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        gold: 'var(--shadow-gold)',
      },
      maxWidth: { container: '1280px' },
      transitionTimingFunction: { brand: 'cubic-bezier(0.22,1,0.36,1)' },
    },
  },
};
```

### 12.1 Migration order (for Claude Code)
1. Add the `:root` variable block (§3.4) to `globals.css`; wire `next/font` for Cormorant + Manrope.
2. Extend `tailwind.config.js` (§12).
3. Remove `forcedTheme="dark"`; set the app to light. Delete/neutralize dark-only overrides.
4. Introduce the `.container` fix (§5.4) and apply to Navbar + Footer first (kills the 1920px float bug immediately).
5. Sweep components: replace hardcoded hex literals with tokens, section by section, top of the homepage down.
6. Rebuild the booking widget, cards, and buttons to spec (§7).
7. Verify contrast, focus states, reduced-motion, and RTL at `1280 / 1536 / 1920` widths.

---

## 13. Do & Don't (quick reference)

**Do:** lean on whitespace · keep gold rare and intentional · charcoal text on gold · warm shadows · Cormorant for headings/quotes only · one primary CTA per view · alternate ivory/sand bands · center content on wide monitors · keep the page still and fast · CSS-only micro-feedback · reserve space for all media (no CLS).

**Don't:** pure `#FFFFFF` page backgrounds · white text on gold · cramped sections · body copy in Cormorant · harsh/cold shadows · more than one competing CTA · hardcoded hex in components · hardcoded left/right (breaks RTL) · reintroduce dark mode · scroll reveals / staggered / ambient animation · animation libraries · anything that delays or shifts first paint · **pill / fully-rounded buttons** (buttons are rectangular, 8px).

---

*End of `design.md` — v1. This file is the contract; extend the token layer rather than inlining new values.*
