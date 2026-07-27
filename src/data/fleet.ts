export type VehicleCategory = 'sedan' | 'suv' | 'van' | 'minibus';

export interface Vehicle {
  id: string;              // stable slug, matches the route
  slug: string;            // /fleet/[slug]
  name: string;            // display name, used everywhere
  shortName: string;       // compact label for dropdowns/tables
  category: VehicleCategory;
  categoryLabel: string;   // ONE customer-facing label, used on every surface
  seats: number | 'TODO';
  luggage: number | 'TODO';         // hard-shell suitcases
  bestFor: string;
  image: { hero: string; card: string; alt: string };
  bookable: boolean;
  hasDetailPage: boolean;
}

export const FLEET: readonly Vehicle[] = Object.freeze([
  {
    id: 'toyota-camry',
    slug: 'toyota-camry',
    name: 'Toyota Camry',
    shortName: 'Camry',
    category: 'sedan',
    categoryLabel: 'Executive Sedan',
    seats: 4,
    luggage: 3,
    bestFor: 'Couples and solo travelers',
    image: { hero: '/images/fleet/camry-2025.webp', card: '/images/fleet/camry-2025.webp', alt: 'Toyota Camry' },
    bookable: true,
    hasDetailPage: true,
  },
  {
    id: 'mitsubishi-xpander',
    slug: 'mitsubishi-xpander',
    name: 'Mitsubishi Xpander',
    shortName: 'Xpander',
    category: 'sedan',
    categoryLabel: 'Value Sedan',
    seats: 4,
    luggage: 4,
    bestFor: 'Value family travel',
    image: { hero: '/images/fleet/camry-2025.webp', card: '/images/fleet/camry-2025.webp', alt: 'Mitsubishi Xpander' },
    bookable: true,
    hasDetailPage: false,
  },
  {
    id: 'gmc-yukon-xl',
    slug: 'gmc-yukon-xl',
    name: 'GMC Yukon XL',
    shortName: 'Yukon XL',
    category: 'suv',
    categoryLabel: 'VIP SUV',
    seats: 7,
    luggage: 5,
    bestFor: 'VIPs and luxury family travel',
    image: { hero: '/images/fleet/gmc-yukon-2025.webp', card: '/images/fleet/gmc-yukon-2025.webp', alt: 'GMC Yukon XL' },
    bookable: true,
    hasDetailPage: false, 
  },
  {
    id: 'hyundai-staria',
    slug: 'hyundai-staria',
    name: 'Hyundai Staria',
    shortName: 'Staria',
    category: 'van',
    categoryLabel: 'Premium Family Van',
    seats: 7,
    luggage: 7,
    bestFor: 'Families seeking comfort',
    image: { hero: '/images/fleet/hyundai-staria-2025.webp', card: '/images/fleet/hyundai-staria-2025.webp', alt: 'Hyundai Staria' },
    bookable: true,
    hasDetailPage: true,
  },
  {
    id: 'hyundai-starex',
    slug: 'hyundai-starex',
    name: 'Hyundai H1 Starex',
    shortName: 'H1 Starex',
    category: 'van',
    categoryLabel: 'Comfort Family Van',
    seats: 7,
    luggage: 7,
    bestFor: 'Economical family travel',
    image: { hero: '/images/fleet/hyundai-h1.webp', card: '/images/fleet/hyundai-h1.webp', alt: 'Hyundai H1 Starex' },
    bookable: true,
    hasDetailPage: true,
  },
  {
    id: 'toyota-hiace',
    slug: 'toyota-hiace',
    name: 'Toyota Hiace',
    shortName: 'Hiace',
    category: 'minibus',
    categoryLabel: 'Mini Bus',
    seats: 11,
    luggage: 10,
    bestFor: 'Large groups and lots of luggage',
    image: { hero: '/images/fleet/toyota-hiace-2025.webp', card: '/images/fleet/toyota-hiace-2025.webp', alt: 'Toyota Hiace' },
    bookable: true,
    hasDetailPage: true,
  },
  {
    id: 'toyota-coaster',
    slug: 'toyota-coaster',
    name: 'Toyota Coaster',
    shortName: 'Coaster',
    category: 'minibus',
    categoryLabel: 'Mini Bus',
    seats: 19,
    luggage: 15,
    bestFor: 'Very large groups and tours',
    image: { hero: '/images/fleet/toyota-coaster-2025.webp', card: '/images/fleet/toyota-coaster-2025.webp', alt: 'Toyota Coaster' },
    bookable: true,
    hasDetailPage: true,
  }
]);

export function getVehicle(id: string): Vehicle | undefined {
  return FLEET.find(v => v.id === id);
}

export function getVehiclesByCategory(category: VehicleCategory): Vehicle[] {
  return FLEET.filter(v => v.category === category);
}

export function getBookableVehicles(): Vehicle[] {
  return FLEET.filter(v => v.bookable);
}

export function formatSeats(vehicle: Vehicle): string {
  if (vehicle.seats === 1) return '1 seat';
  return `${vehicle.seats} seats`;
}

export function formatSeatsAr(vehicle: Vehicle): string {
  if (vehicle.seats === 1) return 'مقعـد واحد';
  if (vehicle.seats === 2) return 'مقعدان';
  if (typeof vehicle.seats === 'number' && vehicle.seats >= 3 && vehicle.seats <= 10) return `${vehicle.seats} مقاعد`;
  return `${vehicle.seats} راكباً`;
}

export function formatLuggage(vehicle: Vehicle): string {
  if (vehicle.luggage === 'TODO') return 'TBD bags';
  if (vehicle.luggage === 1) return '1 bag';
  return `${vehicle.luggage} bags`;
}

export function formatLuggageAr(vehicle: Vehicle): string {
  if (vehicle.luggage === 'TODO') return 'قريباً';
  if (vehicle.luggage === 1) return 'حقيبة واحدة';
  if (vehicle.luggage === 2) return 'حقيبتان';
  if (typeof vehicle.luggage === 'number' && vehicle.luggage >= 3 && vehicle.luggage <= 10) return `${vehicle.luggage} حقائب`;
  return `${vehicle.luggage} حقيبة`;
}
