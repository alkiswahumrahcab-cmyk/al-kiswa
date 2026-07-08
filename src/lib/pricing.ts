import { LucideIcon } from 'lucide-react';
import pricingData from '@/data/pricing.json';

export interface Route {
    id: string;
    name: string;
    slug?: string;
    origin?: string;
    destination?: string;
    distance: string;
    time: string;
    baseRate: number;
    promotionalDiscount?: number; // Percentage discount
    category?: string; // e.g. 'Airport', 'Ziarat', 'Intercity'
    customRates?: { [vehicleId: string]: number };
    customRatesUSD?: { [vehicleId: string]: number };
    seo?: {
        title: string;
        description: string;
        keywords: string[];
    };
}

export const ROUTES: Route[] = pricingData.routes as unknown as Route[];

export interface Vehicle {
    id: string;
    name: string;
    capacity: string;
    multiplier: number;
    icon?: LucideIcon;
    features: string[];
    luggage: string;
    category?: string;
    isActive?: boolean;
    image?: string;
}

export const VEHICLES: Vehicle[] = pricingData.vehicles as unknown as Vehicle[];

export * from './pricing-calc';
// import { calculateFinalPrice } from './pricing-calc'; // Removed redundant import

// === CONFIGURABLE SURCHARGES ===
// Map of vehicle IDs to their SAR surcharge for the Madinah -> Makkah 'Via Badr' route detour.
// Owner can edit these amounts as needed.
export const BADR_DETOUR_SURCHARGE_SAR: Record<string, number> = {
    "camry": 150,     // Toyota Camry
    "kia-k5": 150,    // Kia K5
    "xpander": 170,   // Mitsubishi Xpander
    "staria": 180,    // Hyundai Staria
    "starex": 180,    // Hyundai Starex (H1)
    "hiace": 200,     // Toyota HiAce
    "coaster": 200,   // Toyota Coaster
    "gmc": 200,       // GMC Yukon XL Denali
};

// Fallback surcharge if a vehicle ID isn't found in the map above
export const DEFAULT_BADR_SURCHARGE_SAR = 180;

// Map of vehicle IDs to their SAR surcharge for the 'Madinah Ziyarat' route detour to Wadi Jinn.
// Owner can edit these amounts as needed.
export const WADI_JINN_SURCHARGE_SAR: Record<string, number> = {
    "camry": 100,     // Toyota Camry
    "kia-k5": 100,    // Kia K5
    "xpander": 150,   // Mitsubishi Xpander
    "staria": 180,    // Hyundai Staria
    "starex": 180,    // Hyundai Starex (H1)
    "hiace": 220,     // Toyota HiAce
    "coaster": 250,   // Toyota Coaster
    "gmc": 200,       // GMC Yukon XL Denali
};

// Fallback surcharge if a vehicle ID isn't found in the map above
export const DEFAULT_WADI_JINN_SURCHARGE_SAR = 180;

// Re-export specific types if they were used locally
export type { DiscountSettings, PricingResult } from './pricing-calc';


export const getPricingData = async () => {
    return {
        routes: [],
        vehicles: []
    };
};
