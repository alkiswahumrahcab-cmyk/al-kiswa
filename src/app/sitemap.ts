import { MetadataRoute } from 'next';
import { blogService } from '@/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkiswahumrahtransport.com';

    const routes = [
        '',
        '/about',
        '/services',
        '/booking',
        '/contact',
        '/blog',
        '/gallery',
        '/safety',
        '/privacy',
        '/terms',
        '/cookie-preferences',
        '/pricing',
        '/ramadan-2026',
        // Services
        '/services/airport-transfers',
        '/services/hotel-transfers',
        '/services/intercity-transfer',
        '/services/jeddah-airport-transfer',
        '/services/madinah-airport-transfer',
        '/services/makkah-madinah-taxi',
        '/services/ziarah-madinah',
        '/services/ziarah-makkah',
        '/services/ziyarat-tours',
        // Fleet
        '/fleet/gmc-yukon-at4',
        '/fleet/hyundai-starex',
        '/fleet/hyundai-staria',
        '/fleet/toyota-camry',
        '/fleet/toyota-coaster',
        '/fleet/toyota-hiace',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const posts = await blogService.getPosts();
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...routes, ...blogRoutes];
}
