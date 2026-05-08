# 📊 Professional Schema Audit — Week 1 (Pre-Optimization)

**Project:** Al Kiswah Umrah Cab
**Date:** May 2026

*Note: This audit was generated via direct codebase analysis to ensure 100% accuracy of injected JSON-LD scripts. Please perform the manual Rich Results Tests and GSC checks to capture screenshots for your visual records into the folders provided.*

---

## **1. URL-by-URL Schema Audit**

### **1. Homepage** (`https://kiswahumrahcab.com/`)
**Detected:**
- Organization (Global)
- LocalBusiness (Global implementation)
- Review (Nested within LocalBusiness graph)
- Service

**Missing:**
- BreadcrumbList
- FAQPage
- WebPage
- Sitelinks Searchbox

**Notes/Warnings:** 
The Review schema is properly split out in the `@graph` on this page to avoid the "multiple aggregate ratings" error, but we should verify in GSC if it still flags any warnings for missing fields.

---

### **2. Jeddah Airport Transfer** (`https://kiswahumrahcab.com/services/jeddah-airport-transfer`)
**Detected:**
- Organization (Global)
- Service
- LocalBusiness (Nested as `provider` inside Service)
- FAQPage
- BreadcrumbList

**Missing:**
- Review
- WebPage

**Notes/Warnings:**
FAQ schema is properly implemented and valid. DO NOT remove it.

---

### **3. Makkah Madinah Taxi** (`https://kiswahumrahcab.com/services/makkah-madinah-taxi`)
**Detected:**
- Organization (Global)
- Service
- LocalBusiness (Nested as `provider` inside Service)
- FAQPage
- BreadcrumbList

**Missing:**
- Review
- WebPage

**Notes/Warnings:**
FAQ schema is present. Some answers are dynamically generated based on conditions, which might cause parsing warnings if not rendered purely as strings.

---

### **4. Madinah Airport Transfer** (`https://kiswahumrahcab.com/services/madinah-airport-transfer`)
**Detected:**
- Organization (Global)
- Service
- LocalBusiness (Nested as `provider` inside Service)

**Missing:**
- BreadcrumbList
- FAQPage (FAQs exist on the page but are missing the JSON-LD FAQPage markup)
- Review
- WebPage

**Notes/Warnings:**
Missing the `image` property in the Service schema, which will trigger a warning in the Rich Results Test.

---

### **5. Intercity Transfer** (`https://kiswahumrahcab.com/services/intercity-transfer`)
**Detected:**
- Organization (Global)
- Service
- LocalBusiness (Nested as `provider` inside Service)

**Missing:**
- BreadcrumbList
- FAQPage
- Review
- WebPage

**Notes/Warnings:**
Missing `image` in the Service schema.

---

### **6. Ziyarat Tours** (`https://kiswahumrahcab.com/services/ziyarat-tours`)
**Detected:**
- Organization (Global)
- TouristTrip
- LocalBusiness (Nested as `provider` inside TouristTrip)

**Missing:**
- Service
- BreadcrumbList
- FAQPage
- Review
- WebPage

**Notes/Warnings:**
Uses `TouristTrip` instead of `Service`. While valid, ensuring it aligns with Google's expected guidelines for rich results is important. Missing `image` in the TouristTrip schema.

---

## **2. Existing Schema Summary**
The following schema types are currently active across the site:
- **Organization:** Present globally on all pages.
- **LocalBusiness:** Implemented directly on the homepage, and nested as a `provider` on service pages.
- **Service:** Active on most service pages and homepage.
- **TouristTrip:** Active on the Ziyarat Tours page.
- **Review:** Active on the homepage only.
- **FAQPage:** Active on Jeddah Airport and Makkah-Madinah routes.
- **BreadcrumbList:** Active on Jeddah Airport and Makkah-Madinah routes.

---

## **3. Missing Schema Summary**
The following schema types are missing and should be implemented:
- **BreadcrumbList:** Missing on Homepage, Madinah Airport, Intercity, and Ziyarat Tours.
- **FAQPage:** Missing on Madinah Airport, Intercity, and Ziyarat Tours (even though FAQ content exists on these pages).
- **Review:** Missing on all individual service pages. We need a valid `AggregateRating` and/or `Review` on service pages to get rich stars in SERPs.
- **WebPage:** Missing globally.
- **Sitelinks Searchbox (WebSite):** Missing globally.

---

## **4. List of Expected Errors/Warnings (Rich Results Test)**
*Based on code analysis:*
- **Service/TouristTrip Image Warning:** Madinah Airport, Intercity, and Ziyarat Tours schemas do not include the `image` property, which Google expects for Service rich results.
- **AggregateRating Errors:** The site recently had an issue with "Review has multiple aggregate ratings". While it appears fixed on the homepage, testing via GSC is required to confirm full resolution.

---

## **5. GSC Enhancement Status**
*Action Required: Please log into Google Search Console > Enhancements to manually capture this data.*

- **FAQ:** [Pending Manual Check]
- **Breadcrumbs:** [Pending Manual Check]
- **Logo:** [Pending Manual Check]
- **Sitelinks Searchbox:** Missing (Needs Implementation)
- **Mobile Usability:** [Pending Manual Check]
- **Core Web Vitals:** [Pending Manual Check]
- **Unparsable structured data:** [Pending Manual Check]

---

## **6. Recommendations for Next Steps (Week 1 Action Plan)**
1. **Global Schema Enhancements:** Implement `WebPage` and `WebSite` (Sitelinks Searchbox) schemas globally via `layout.tsx`.
2. **Standardize Service Pages:** Ensure *every* service page includes `BreadcrumbList`, `FAQPage`, and `Service` (with an `image` property to avoid warnings).
3. **LocalBusiness & Reviews:** Ensure `AggregateRating` and `Review` schemas are properly mapped on service pages without violating the "single aggregate rating per page" rule.
4. **Rich Results Screenshots:** Proceed to `search.google.com/test/rich-results` and execute the tests for the 6 URLs to capture the required screenshots into the prepared folders.
