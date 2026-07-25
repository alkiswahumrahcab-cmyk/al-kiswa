export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com';

export function constructUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
}

export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/profile.php?id=61586674295032",
    instagram: "https://www.instagram.com/exploresaudia12",
    tiktok: "https://www.tiktok.com/@alkiswah_cab?_r=1&_t=ZS-97UXEVIhQeL",
    linkedin: "https://www.linkedin.com/in/al-kiswah-umrah-cab/",
    whatsapp: "https://wa.me/966548707332",
    phone: "+966548707332",
    googleBusiness: "https://share.google/ARbbVaAackyOs8N7G",
    googleReview: "https://share.google/ARbbVaAackyOs8N7G"
};

export const TRUST_METRICS = {
    googleRating: 4.9 as number | null,        // TODO: confirm from Google Business Profile
    googleReviewCount: 500 as number | null,   // TODO: confirm from Google Business Profile
    pilgrimsServed: 10000 as number | null,      // TODO: confirm from Google Business Profile
    operatingSince: 2014 as number | null,      // TODO: confirm from Google Business Profile
    lastVerified: "2026-07-25" as string | null         // TODO: confirm from Google Business Profile (ISO date)
};

export function formatMetric(value: number | null): string {
    if (value === null) return "XXX";
    return new Intl.NumberFormat('en-US').format(value) + "+";
}
