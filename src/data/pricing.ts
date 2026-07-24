export interface RoutePrice {
    type: 'routePrice';
    originId: string;
    destinationId: string;
    vehicleId: string;
    price: number | null;
}

export interface TourPrice {
    type: 'tourPrice';
    tourId: string;
    vehicleId: string;
    price: number | null;
}

export interface PromoPrice {
    type: 'promoPrice';
    wasPrice: number;
    nowPrice: number;
    label: string;
    expiresAt: string; // ISO format
}

export type DisplayPrice = RoutePrice | TourPrice | PromoPrice;

/**
 * ROUTE PRICES (Baseline prices from pricing.json)
 * Note: Prices may vary during high seasons (Ramadan/Hajj). Always confirm on the booking page.
 */
export const ROUTE_PRICES: RoutePrice[] = [
    // Jeddah Airport -> Makkah
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'toyota-camry', price: 200 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'gmc-yukon-xl', price: 500 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'hyundai-staria', price: 300 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'toyota-hiace', price: 350 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'hyundai-starex', price: 300 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'toyota-coaster', price: 550 },
    { type: 'routePrice', originId: 'jeddah-airport', destinationId: 'makkah', vehicleId: 'mitsubishi-xpander', price: null }, // TODO: confirm price
];

/**
 * TOUR PRICES
 */
export const TOUR_PRICES: TourPrice[] = [
    // Makkah Ziyarat
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'toyota-camry', price: 200 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'gmc-yukon-xl', price: 400 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'hyundai-staria', price: 250 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'toyota-hiace', price: 300 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'hyundai-starex', price: 250 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'toyota-coaster', price: 500 },
    { type: 'tourPrice', tourId: 'makkah-ziyarat', vehicleId: 'mitsubishi-xpander', price: 200 }, // From ziarah-makkah page
];

/**
 * PROMO PRICES (For Deal Cards)
 */
export const PROMO_PRICES: Record<string, PromoPrice> = {
    'toyota-camry': { type: 'promoPrice', wasPrice: 250, nowPrice: 200, label: '20% OFF', expiresAt: '2026-08-01T00:00:00Z' },
    'gmc-yukon-xl': { type: 'promoPrice', wasPrice: 600, nowPrice: 450, label: 'Save 150 SAR', expiresAt: '2026-08-01T00:00:00Z' },
    'toyota-hiace': { type: 'promoPrice', wasPrice: 400, nowPrice: 350, label: 'Family Deal', expiresAt: '2026-08-01T00:00:00Z' },
    'hyundai-staria': { type: 'promoPrice', wasPrice: 550, nowPrice: 400, label: 'Limited Time', expiresAt: '2026-08-01T00:00:00Z' },
    'hyundai-starex': { type: 'promoPrice', wasPrice: 350, nowPrice: 300, label: 'Economy', expiresAt: '2026-08-01T00:00:00Z' },
    'toyota-coaster': { type: 'promoPrice', wasPrice: 800, nowPrice: 650, label: 'Group Special', expiresAt: '2026-08-01T00:00:00Z' },
    'mitsubishi-xpander': { type: 'promoPrice', wasPrice: 220, nowPrice: 180, label: 'New', expiresAt: '2026-08-01T00:00:00Z' }
};
