/**
 * ServiceSchema — Reusable JSON-LD structured data component for service pages.
 *
 * Outputs a consolidated @graph containing:
 *   1. Service (or TouristTrip) schema
 *   2. BreadcrumbList schema
 *   3. Optional FAQPage schema
 *
 * Usage:
 *   <ServiceSchema
 *     serviceName="Jeddah Airport to Makkah Taxi"
 *     serviceType="Airport Transfer"
 *     description="Private taxi from KAIA to Makkah..."
 *     pageUrl="https://kiswahumrahcab.com/services/jeddah-airport-transfer"
 *     citiesServed={["Jeddah", "Makkah"]}
 *     ratingValue="4.9"
 *     ratingCount={245}
 *     breadcrumbs={[
 *       { name: "Home", url: "https://kiswahumrahcab.com" },
 *       { name: "Services", url: "https://kiswahumrahcab.com/services" },
 *       { name: "Jeddah Airport Transfer", url: "https://kiswahumrahcab.com/services/jeddah-airport-transfer" }
 *     ]}
 *   />
 */

const SITE_URL = 'https://kiswahumrahcab.com';
const ORG_NAME = 'Al Kiswah Umrah Transport';
const ORG_PHONE = '+966-548-707-332';

// ─── Props ────────────────────────────────────────────────────────────────────

interface BreadcrumbItem {
    name: string;
    url: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

interface ServiceSchemaProps {
    /** Display name of the service */
    serviceName: string;
    /** e.g. "Airport Transfer", "Intercity Transfer", "Ziyarat Tour" */
    serviceType: string;
    /** SEO description for the service */
    description: string;
    /** Full canonical URL of this page */
    pageUrl: string;
    /** Cities this service covers */
    citiesServed: string[];
    /** Aggregate star rating, e.g. "4.9" */
    ratingValue: string;
    /** Total number of reviews */
    ratingCount: number;
    /** Lowest advertised price in SAR (optional) */
    priceFrom?: number;
    /** Highest advertised price in SAR (optional) */
    priceTo?: number;
    /** Ordered breadcrumb trail */
    breadcrumbs: BreadcrumbItem[];
    /** Optional FAQ data — will generate FAQPage schema if provided */
    faqs?: FAQItem[];
    /** Optional hero / featured image URL */
    image?: string;
}

// ─── TouristTrip-specific props ───────────────────────────────────────────────

interface TouristTripSchemaProps {
    /** "TouristTrip" — triggers the alternative schema type */
    schemaType: 'TouristTrip';
    /** Display name of the trip */
    tripName: string;
    /** SEO description */
    description: string;
    /** Full canonical URL */
    pageUrl: string;
    /** Target tourist types */
    touristType: string[];
    /** Itinerary items */
    itinerary: { position: number; name: string }[];
    /** Aggregate star rating */
    ratingValue: string;
    /** Total number of reviews */
    ratingCount: number;
    /** Breadcrumb trail */
    breadcrumbs: BreadcrumbItem[];
    /** Optional FAQ data */
    faqs?: FAQItem[];
    /** Optional image URL */
    image?: string;
}

// ─── Build Service @graph ─────────────────────────────────────────────────────

function buildServiceGraph(props: ServiceSchemaProps) {
    const graph: any[] = [];

    // 1. Service node
    const serviceNode: any = {
        '@type': 'Service',
        '@id': `${props.pageUrl}/#service`,
        name: props.serviceName,
        serviceType: props.serviceType,
        description: props.description,
        url: props.pageUrl,
        provider: {
            '@type': 'LocalBusiness',
            '@id': `${SITE_URL}/#organization`,
            name: ORG_NAME,
            telephone: ORG_PHONE,
        },
        areaServed: props.citiesServed.map((city) => ({
            '@type': 'City',
            name: city,
        })),
        availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: `${SITE_URL}/booking`,
            availableLanguage: ['English', 'Arabic', 'Urdu'],
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: props.ratingValue,
            bestRating: '5',
            worstRating: '1',
            ratingCount: String(props.ratingCount),
        },
    };

    if (props.image) {
        serviceNode.image = props.image;
    }

    if (props.priceFrom != null) {
        serviceNode.offers = {
            '@type': 'AggregateOffer',
            priceCurrency: 'SAR',
            lowPrice: String(props.priceFrom),
            ...(props.priceTo != null && { highPrice: String(props.priceTo) }),
            availability: 'https://schema.org/InStock',
        };
    }

    graph.push(serviceNode);

    // 2. BreadcrumbList node
    graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${props.pageUrl}/#breadcrumb`,
        itemListElement: props.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    });

    // 3. FAQPage node (optional)
    if (props.faqs && props.faqs.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${props.pageUrl}/#faq`,
            mainEntity: props.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    return graph;
}

// ─── Build TouristTrip @graph ─────────────────────────────────────────────────

function buildTouristTripGraph(props: TouristTripSchemaProps) {
    const graph: any[] = [];

    // 1. TouristTrip node
    const tripNode: any = {
        '@type': 'TouristTrip',
        '@id': `${props.pageUrl}/#tourist-trip`,
        name: props.tripName,
        description: props.description,
        url: props.pageUrl,
        provider: {
            '@type': 'TransportationCompany',
            '@id': `${SITE_URL}/#organization`,
        },
        touristType: props.touristType,
        itinerary: {
            '@type': 'ItemList',
            itemListElement: props.itinerary.map((item) => ({
                '@type': 'ListItem',
                position: item.position,
                name: item.name,
            })),
        },
        offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            priceCurrency: 'SAR',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: props.ratingValue,
            bestRating: '5',
            ratingCount: String(props.ratingCount),
        },
    };

    if (props.image) {
        tripNode.image = props.image;
    }

    graph.push(tripNode);

    // 2. BreadcrumbList node
    graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${props.pageUrl}/#breadcrumb`,
        itemListElement: props.breadcrumbs.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    });

    // 3. FAQPage node (optional)
    if (props.faqs && props.faqs.length > 0) {
        graph.push({
            '@type': 'FAQPage',
            '@id': `${props.pageUrl}/#faq`,
            mainEntity: props.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        });
    }

    return graph;
}

// ─── Exported Components ──────────────────────────────────────────────────────

/**
 * Renders a `<script type="application/ld+json">` block for a Service page.
 * Produces a consolidated @graph with Service, BreadcrumbList, and optional FAQPage.
 */
export function ServiceSchema(props: ServiceSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': buildServiceGraph(props),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}

/**
 * Renders a `<script type="application/ld+json">` block for a TouristTrip page.
 * Produces a consolidated @graph with TouristTrip, BreadcrumbList, and optional FAQPage.
 */
export function TouristTripSchema(props: TouristTripSchemaProps) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': buildTouristTripGraph(props),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
