import { WithContext, Organization, LocalBusiness, Service, BreadcrumbList, Offer, AboutPage, ContactPage, Article, FAQPage, Question, Answer } from 'schema-dts';
import settings from '@/data/settings.json';

const siteUrl = 'https://kiswahumrahcab.com';

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
    ].filter(Boolean) as string[],
});

export const generateLocalBusinessSchema = (): WithContext<LocalBusiness> => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: settings.general.siteName,
    image: `${siteUrl}/images/fleet/gmc-yukon-studio.png`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: settings.contact.phone,
    address: {
        '@type': 'PostalAddress',
        streetAddress: settings.contact.address,
        addressLocality: 'Makkah',
        addressRegion: 'Makkah Region',
        postalCode: '24231',
        addressCountry: 'SA',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.3891,
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

export const generateFAQSchema = (faqs: { question: string, answer: string }[]): WithContext<FAQPage> => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
        }
    })) as Question[]
});

export const generateBreadcrumbSchema = (items: { name: string, item: string }[]): WithContext<BreadcrumbList> => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.item.startsWith('http') ? item.item : `${siteUrl}${item.item}`
    }))
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
    name: `About ${settings.general.siteName}`,
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
    name: `Contact ${settings.general.siteName}`,
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
    articleBody: (post.content || '').replace(/<[^>]*>?/gm, '') // Strip HTML
});

