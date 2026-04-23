import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kiswahumrahcab.com';

    return {
        rules: [
            // Standard crawlers
            {
                userAgent: '*',
                allow: ['/', '/llms.txt'],
                disallow: ['/api/', '/admin/', '/track-booking'],
            },
            // OpenAI GPTBot
            {
                userAgent: 'GPTBot',
                allow: ['/', '/llms.txt', '/pricing', '/pricing/compare'],
            },
            // Google AI (Gemini training / AI Overviews)
            {
                userAgent: 'Google-Extended',
                allow: ['/', '/llms.txt', '/pricing', '/pricing/compare'],
            },
            // Perplexity AI
            {
                userAgent: 'PerplexityBot',
                allow: ['/', '/llms.txt', '/pricing', '/pricing/compare'],
            },
            // Anthropic Claude
            {
                userAgent: 'ClaudeBot',
                allow: ['/', '/llms.txt', '/pricing', '/pricing/compare'],
            },
            // Meta AI
            {
                userAgent: 'FacebookBot',
                allow: ['/', '/pricing'],
            },
            // Bytespider (TikTok AI)
            {
                userAgent: 'Bytespider',
                allow: ['/', '/llms.txt'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
