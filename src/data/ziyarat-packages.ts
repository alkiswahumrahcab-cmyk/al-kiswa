import pricing from './pricing.json';

export interface TourPackage {
  id: string;
  name: string;
  city: string;
  duration: string;
  distance: string;
  description: string;
  locations: string[];
  familyNotes: string;
  whatToExpect: string;
  prices: { camry: number; hiace: number; gmc: number; starex: number; staria: number; coaster: number };
}

// Pull real prices from pricing.json
function getRoutePrice(slug: string) {
  const route = pricing.routes.find(r => r.slug === slug);
  return route?.customRates || { camry: 0, hiace: 0, gmc: 0, starex: 0, staria: 0, coaster: 0 };
}

export const tourPackages: TourPackage[] = [
  {
    id: "makkah-ziyarat",
    name: "Makkah Half-Day Ziyarat",
    city: "Makkah",
    duration: "3–4 hours",
    distance: "40 km",
    description: "Visit the most significant Islamic historical sites outside the Haram including Jabal Al-Nour, Jabal Thawr, Arafat, Mina, Muzdalifah, and Jannat Al-Mu'alla.",
    locations: ["Jabal Al-Nour (Cave Hira)", "Jabal Thawr", "Mina & Jamarat", "Arafat (Jabal Al-Rahmah)", "Muzdalifah", "Jannat Al-Mu'alla Cemetery"],
    familyNotes: "Suitable for families. Some sites require climbing — elderly can view from vehicle.",
    whatToExpect: "Hotel pickup → scenic drive through Makkah's valleys → stops at each site with time to pray and photograph → return to hotel.",
    prices: getRoutePrice("makkah-ziyarat-taxi"),
  },
  {
    id: "madinah-ziyarat",
    name: "Madinah Half-Day Ziyarat",
    city: "Madinah",
    duration: "3–4 hours",
    distance: "40 km",
    description: "Explore the sacred sites of the Prophet's city including Masjid Quba, Mount Uhud, the Seven Mosques, and Jannat Al-Baqi.",
    locations: ["Masjid Quba", "Mount Uhud & Martyrs Cemetery", "Masjid Al-Qiblatayn", "Seven Mosques", "Jannat Al-Baqi", "Date Market"],
    familyNotes: "Family-friendly route. All sites are accessible. Children will enjoy the Date Market.",
    whatToExpect: "Hotel pickup → Masjid Quba (pray 2 Rakaats) → Mount Uhud → Seven Mosques → Qiblatayn → Date Market → return.",
    prices: getRoutePrice("madinah-ziyarat-taxi"),
  },
  {
    id: "taif-tour",
    name: "Taif Mountain Day Trip",
    city: "Taif",
    duration: "8–10 hours",
    distance: "180 km (from Makkah)",
    description: "Escape the heat with a full-day trip to the mountain city of Taif. Visit rose gardens, cable cars, traditional markets, and scenic viewpoints.",
    locations: ["Al Hada Mountain & Cable Car", "Taif Rose Gardens", "Al Shafa Mountain", "Taif Traditional Souq", "Al Rudaf Park"],
    familyNotes: "Excellent for families and children. Cooler temperatures. Cable car is a highlight for kids.",
    whatToExpect: "Early morning departure → scenic mountain drive → cable car → rose factory → souq shopping → park visit → return to Makkah.",
    prices: getRoutePrice("makkah-to-taif-taxi"),
  },
];

export const vehicleLabels: Record<string, { name: string; capacity: string }> = {
  camry: { name: "Toyota Camry", capacity: "4 pax" },
  gmc: { name: "GMC Yukon", capacity: "7 pax" },
  staria: { name: "Hyundai Staria", capacity: "7 pax" },
  starex: { name: "Hyundai H1", capacity: "7 pax" },
  hiace: { name: "Toyota Hiace", capacity: "10 pax" },
  coaster: { name: "Toyota Coaster", capacity: "21 pax" },
};
