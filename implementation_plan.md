# Remove TODO placeholders from production

The issue is critical as `TODO` placeholders are currently live on the site in the navigation and footers for Facebook and Instagram links. The placeholders stem from `src/config/site.ts`. 

## User Review Required
Please review the proposed approach below. We will fix the immediate bug, report on the missing test coverage, implement a build-breaking test script, and review all remaining placeholders in the codebase.

## 1. Immediate Fixes
### `src/config/site.ts`
We will replace the `TODO` placeholders in `SOCIAL_LINKS` with the provided correct values:
- Facebook: `https://www.facebook.com/profile.php?id=61586674295032`
- Instagram: `https://www.instagram.com/exploresaudia12`

(The existing values for TikTok, LinkedIn, WhatsApp, and Phone match your correct list).

## 2. Test Report
**Does the test exist?**
Yes, a Jest test checking `SOCIAL_LINKS` exists at `src/__tests__/social-links.test.ts`.

**Why did the build pass?**
The test is completely excluded from the CI/CD pipeline. The `package.json` contains no `"test"` script, and the deploy pipeline only runs `next build` followed by a custom Node script `node scripts/check-domains.js`. Jest is not installed, so the `.test.ts` file acts as dead code and is never executed when deploying.

## 3. Repairing the Test
To guarantee that a placeholder never leaks to production again, we will extend the existing `scripts/check-domains.js` (which we know **definitely runs on the deploy path** as `"postbuild"`) to also scan for placeholders.

We will add a new check that will **fail the build** (`process.exit(1)`) if:
1. `SOCIAL_LINKS` values are empty, null, contain `TODO`/`PLACEHOLDER`/`FIXME`/`XXX`/`CHANGEME`, or end in a bare domain.
2. The generated HTML output in `.next/server/app` contains any of these blacklisted placeholder strings, meaning they were accidentally rendered to the user.

## 4. Placeholder Grep Report
I have run a global regex search for `TODO`, `PLACEHOLDER`, `FIXME`, `XXX`, `Lorem ipsum`, and `Contact Us` across the codebase. 

Here are the results and whether they are currently rendered to users:

**Currently Rendered (User-Visible)**
- `src/config/site.ts:10` - `TODO` in Facebook URL (Rendered)
- `src/config/site.ts:12` - `TODO` in Instagram URL (Rendered)
- `src/config/site.ts:30` - `XXX` fallback for `TRUST_METRICS` formatMetric (Rendered if value is null, but all are currently hardcoded numbers).
- `src/app/(public)/services/ziarah-madinah/page.tsx:85, 118` - `'Contact Us'` used as a price fallback (Rendered)
- `src/app/(public)/services/ziarah-makkah/page.tsx:113` - `'Contact Us'` used as a price fallback (Rendered)
- `src/components/fleet/ComparisonTable.tsx:61` - `'Contact Us'` used as a price fallback (Rendered)
- `src/components/fleet/FleetOfferGallery.tsx:129` - `'Contact Us'` used as a price fallback (Rendered)
- `src/data/pricing.ts:38` - `mitsubishi-xpander` price is `null`, with comment `// TODO: confirm price` (Not rendered since we deleted the xpander page)

**Not Rendered (Comments & Attributes)**
- `src/__tests__/social-links.test.ts:4, 14, 15` - Test descriptions and logic.
- `src/app/(public)/fleet/toyota-coaster/page.tsx:99` - HTML comment for copywriter.
- `src/app/api/auth/login/route.ts:51` - Backend comment.
- `src/app/api/admin/seed-routes/route.ts:206` - Backend comment.
- `src/components/home/InteriorShowcase.tsx:19` - Comment.
- `src/components/seo/schema-generator.ts:76, 87` - Comment.
- Various files (`gmc-yukon-xl/page.tsx`, `toyota-camry/page.tsx`, `track-booking/page.tsx`, etc.) use the word `placeholder` inside JSX attributes (e.g. `placeholder="Search..."`) which is an HTML attribute, not a leaked TODO value.

*(Note: The prompt requires us to replace `SOCIAL_LINKS`, but does not explicitly instruct removing `'Contact Us'` fallbacks across the site or deleting comments, so those will remain unchanged unless instructed otherwise).*

## Proposed Changes

### `src/config/site.ts`
[MODIFY] `src/config/site.ts` to replace the `TODO` URLs and clean up comments.

### `scripts/check-domains.js`
[MODIFY] `scripts/check-domains.js` to:
1. Dynamically import and validate `SOCIAL_LINKS` from the compiled output (or parse the ts config). 
2. Scan all `.html` output files for the strings `TODO`, `PLACEHOLDER`, `FIXME`, and `XXX`.

### `package.json`
[MODIFY] `package.json` to rename the postbuild script to `node scripts/postbuild-checks.js` for clarity, or leave it as `check-domains.js` and just update the contents.

## Verification Plan
1. Run `npm run build` locally to verify that the build succeeds without the placeholders.
2. Manually inject a `TODO` into `SOCIAL_LINKS` and verify that the build *fails*.
3. Check the CLI output to confirm the script is executed by `next build`.
