export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com';

export function constructUrl(path: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${SITE_URL}${cleanPath}`;
}
