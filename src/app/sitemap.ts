import { MetadataRoute } from 'next';
import { blogService } from '@/services/blogService';
import { vehicleService } from '@/services/vehicleService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alkiswahumrahtransport.com';

    const staticRoutes = [
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
        // Common Services Paths
        '/services/airport-transfers',
        '/services/hotel-transfers',
        '/services/intercity-transfer',
        '/services/jeddah-airport-transfer',
        '/services/madinah-airport-transfer',
        '/services/makkah-madinah-taxi',
        '/services/ziarah-madinah',
        '/services/ziarah-makkah',
        '/services/ziyarat-tours',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic Fleet
    const vehicles = await vehicleService.getActiveVehicles();
    const fleetRoutes = vehicles.map((v: any) => ({
        url: `${baseUrl}/fleet/${v.slug || v.name.toLowerCase().replace(/\\s+/g, '-')}`,
        lastModified: new Date(), // Could be v.updatedAt if available
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Dynamic Blog Posts
    const posts = await blogService.getPosts();
    const blogRoutes = posts.map((post: any) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...fleetRoutes, ...blogRoutes];
}
