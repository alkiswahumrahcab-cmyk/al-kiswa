import { WithContext, Organization, LocalBusiness, Service, BreadcrumbList, Offer } from 'schema-dts';
import settings from '@/data/settings.json';

const siteUrl = 'https://alkiswahumrahtransport.com';

export const generateOrganizationSchema = (): WithContext<Organization> => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.general.siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`, // Ensure logo exists or use a fallback
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: settings.contact.phone,
        contactType: 'customer service',
        areaServed: 'SA',
        availableLanguage: ['en', 'ar'],
    },
    sameAs: [
        settings.contact.social.facebook,
        settings.contact.social.instagram,
        settings.contact.social.twitter,
        // Add other social links if available
    ].filter(Boolean),
});

export const generateLocalBusinessSchema = (): WithContext<LocalBusiness> => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // or TaxiService if more specific
    name: settings.general.siteName,
    image: `${siteUrl}/images/hero-bg.jpg`, // Representative image
    '@id': siteUrl,
    url: siteUrl,
    telephone: settings.contact.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: settings.contact.address, // Update with more specific street if available
        addressLocality: 'Makkah',
        addressRegion: 'Makkah Region',
        postalCode: '24231', // Example default, update if known
        addressCountry: 'SA',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.3891, // Makkah coordinates
        longitude: 39.8579,
    },
    openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
    },
    priceRange: '$$',
});

export const generateServiceSchema = (
    name: string,
    description: string,
    image?: string
): WithContext<Service> => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
        '@type': 'LocalBusiness',
        name: settings.general.siteName,
        image: `${siteUrl}/logo.png`,
    },
    areaServed: {
        '@type': 'State',
        name: 'Makkah Region',
    },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Transport Services',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Jeddah Airport to Makkah Taxi',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Makkah to Madinah Taxi',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Madinah to Jeddah Airport Transfer',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'VIP GMC Yukon Umrah Transport',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Family Umrah Bus Rental',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Ziarah Tours in Makkah & Madinah',
                },
            },
        ],
    },
    ...(image && { image }),
});
