export interface RegionData {
    id: string; // The URL slug (e.g., 'uk')
    name: string; // The display name ('United Kingdom')
    nationality: string; // The adjective ('British')
    currency: string; // e.g., 'GBP'
    popularOrigin: string; // e.g., 'London (LHR)'
    heroBg: string; // Background image for the hero section
    trustCount: string; // "Trusted by over X pilgrims"
}

export const regions: RegionData[] = [
    {
        id: 'uk',
        name: 'United Kingdom',
        nationality: 'British',
        currency: 'GBP',
        popularOrigin: 'London/Manchester',
        heroBg: 'https://images.unsplash.com/photo-1579624513155-7bb88e99cd82?q=80&w=2000&auto=format&fit=crop', // Kaaba View
        trustCount: '5,000+'
    },
    {
        id: 'usa',
        name: 'United States',
        nationality: 'American',
        currency: 'USD',
        popularOrigin: 'New York (JFK)',
        heroBg: 'https://images.unsplash.com/photo-1542042220-305ad52c3c6f?q=80&w=2000&auto=format&fit=crop', // Pilgrims
        trustCount: '3,500+'
    },
    {
        id: 'canada',
        name: 'Canada',
        nationality: 'Canadian',
        currency: 'CAD',
        popularOrigin: 'Toronto (YYZ)',
        heroBg: 'https://images.unsplash.com/photo-1565552643950-8de63d41e7d2?q=80&w=2000&auto=format&fit=crop', 
        trustCount: '2,000+'
    },
    {
        id: 'australia',
        name: 'Australia',
        nationality: 'Australian',
        currency: 'AUD',
        popularOrigin: 'Sydney (SYD)',
        heroBg: 'https://images.unsplash.com/photo-1518548906969-952aeb51f332?q=80&w=2000&auto=format&fit=crop',
        trustCount: '1,500+'
    },
    {
        id: 'europe',
        name: 'Europe',
        nationality: 'European',
        currency: 'EUR',
        popularOrigin: 'Paris/Frankfurt',
        heroBg: 'https://images.unsplash.com/photo-1591878841793-605a468ed9aa?q=80&w=2000&auto=format&fit=crop',
        trustCount: '8,000+'
    },
    {
        id: 'malaysia',
        name: 'Malaysia',
        nationality: 'Malaysian',
        currency: 'MYR',
        popularOrigin: 'Kuala Lumpur (KUL)',
        heroBg: 'https://images.unsplash.com/photo-1616053350325-1e4fb44c8ed7?q=80&w=2000&auto=format&fit=crop',
        trustCount: '12,000+'
    },
    {
        id: 'south-africa',
        name: 'South Africa',
        nationality: 'South African',
        currency: 'ZAR',
        popularOrigin: 'Johannesburg/Cape Town',
        heroBg: 'https://images.unsplash.com/photo-1579624513155-7bb88e99cd82?q=80&w=2000&auto=format&fit=crop',
        trustCount: '3,000+'
    }
];

export function getRegionById(id: string): RegionData | undefined {
    return regions.find((r) => r.id === id);
}
