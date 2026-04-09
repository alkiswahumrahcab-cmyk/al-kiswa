import { WithContext, Organization, LocalBusiness, Service, BreadcrumbList, Offer, AboutPage, ContactPage, Article } from 'schema-dts';
import settings from '@/data/settings.json';

const siteUrl = 'https://alkiswahumrahtransport.com';

export const generateOrganizationSchema = (): WithContext<Organization> => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.general.siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
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
    ].filter(Boolean) as string[],
});

export const generateLocalBusinessSchema = (): WithContext<LocalBusiness> => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness', // or TaxiService if more specific
    name: settings.general.siteName,
    image: `${siteUrl}/images/fleet/gmc-yukon-studio.png`, // Valid high-quality image
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
    currenciesAccepted: 'SAR, USD, GBP, EUR',
    paymentAccepted: 'Cash, Credit Card, Online Payment',
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
        image: `${siteUrl}/opengraph-image.png`,
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

export const generateAboutPageSchema = (): WithContext<AboutPage> => ({
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: "About Al Kiswah Umrah Transport",
    description: "Information about Al Kiswah Umrah Transport, a leading provider of pilgrim transport services in Saudi Arabia.",
    url: `${siteUrl}/about`,
    mainEntity: {
        '@type': 'LocalBusiness',
        name: settings.general.siteName,
        sameAs: siteUrl
    }
});

export const generateContactPageSchema = (): WithContext<ContactPage> => ({
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: "Contact Al Kiswah Umrah Transport",
    description: "Contact details and booking support for Al Kiswah Umrah Transport.",
    url: `${siteUrl}/contact`,
    mainEntity: {
        '@type': 'LocalBusiness',
        name: settings.general.siteName,
        telephone: settings.contact.phone,
        address: {
            '@type': 'PostalAddress',
            streetAddress: settings.contact.address,
            addressLocality: 'Makkah',
            addressRegion: 'Makkah Region',
        }
    }
});

export const generateArticleSchema = (post: any): WithContext<Article> => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: [post.image.startsWith('http') ? post.image : `${siteUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`],
    datePublished: post.date,
    author: {
        '@type': 'Person',
        name: post.author
    },
    publisher: {
        '@type': 'Organization',
        name: "Al Kiswah Umrah Transport",
        logo: {
            '@type': 'ImageObject',
            url: `${siteUrl}/logo.png`
        }
    },
    description: post.excerpt,
    articleBody: post.content.replace(/<[^>]*>?/gm, '') // Strip HTML
});
