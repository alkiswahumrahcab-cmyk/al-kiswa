# Al Kiswah Umrah Transport - Premium Typography System

## Roles and Pairing

The typographic foundation is built on a high-contrast serif and a highly legible, warm geometric sans, creating an atmosphere of luxury, trust, and clarity.

- **Display & Headings (`font-display`)**: Cormorant Garamond. Elegant, high-contrast serif used for all `h1`-`h6` headings to ensure the brand feels premium.
- **Body & UI (`font-sans`)**: Manrope. A modern, warm sans-serif used for body text, UI elements, buttons, and labels.
- **Arabic (`font-tajawal`)**: Tajawal. Ensures elegant scaling and legibility for Arabic translations and RTL layouts.

## Type Scale

| Role | Font | Size (desktop) | Weight | Leading | Tracking |
|---|---|---|---|---|---|
| Display (hero) | Cormorant | 56–72px | 600 | 1.05 | tight (-0.01em) |
| H1 (page title) | Cormorant | 40–48px | 600 | 1.1 | tight |
| H2 (section title) | Cormorant | 30–36px | 600 | 1.15 | normal |
| H3 (card/sub-section) | Cormorant | 22–26px | 500 | 1.2 | normal |
| Eyebrow / label | Manrope | 12–13px | 600 | 1.2 | wide (0.18em) UPPERCASE |
| Body large | Manrope | 18px | 400 | 1.6 | normal |
| Body | Manrope | 15–16px | 400 | 1.6 | normal |
| Small / caption | Manrope | 13px | 400/500 | 1.5 | normal |
| Tagline / subhead | Cormorant italic | 14–16px | 500 | 1.35 | normal |

## Guardrails

1. **Never use sans-serif for major headings**: `h1`-`h6` are set to `font-display` globally in `@layer base`.
2. **Avoid bold weights on serifs below 22px**: Cormorant Garamond should be used at `font-medium` (500) for small sizes, and `font-semibold` (600) for large sizes. It should rarely be `font-bold` (700) unless intentionally designed.
3. **Eyebrow elements**: Always use `font-sans uppercase tracking-widest text-xs` (or `text-sm`) paired with the brand's gold color.
