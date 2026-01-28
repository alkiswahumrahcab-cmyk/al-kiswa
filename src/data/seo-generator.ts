// This utility generates a massive list of SEO keywords programmatically
// Strategy: Permutation of relevant terms to capture long-tail traffic

const bases = [
    "Umrah Taxi", "Umrah Transport", "Umrah Cab", "Jeddah Airport Taxi",
    "Makkah Taxi", "Madinah Taxi", "Hajj Transport", "Pilgrim Transfer",
    "Private Car Service", "VIP Transport", "Luxury Ride"
];

const adjectives = [
    "Cheap", "Affordable", "Luxury", "VIP", "Private", "Best", "Reliable",
    "Trusted", "Professional", "Safe", "Secure", "Comfortable", "Premium",
    "Exclusive", "Fast", "Direct", "24/7", "Fixed Price"
];

const locations = [
    "from Jeddah Airport to Makkah",
    "from Makkah to Madinah",
    "from Madinah to Jeddah Airport",
    "in Makkah",
    "in Madinah",
    "from Jeddah to Makkah Hotel",
    "to Clock Tower Makkah",
    "to Haram Makkah",
    "from Madinah Airport to Masjid Nabawi"
];

const vehicles = [
    "GMC Yukon", "Chevy Tahoe", "Hyundai Staria", "Toyota Hiace",
    "Toyota Coaster", "Ford Taurus", "Lexus ES", "Mercedes Sprinter",
    "Family Van", "Mini Bus", "SUV", "MPV"
];

const audiences = [
    "for UK Pilgrims", "for USA Pilgrims", "for Canadian Pilgrims",
    "for Families", "for Groups", "for Elderly", "with Wheelchair",
    "with Child Seat", "for Ladies", "for VIPs", "from London",
    "from Manchester", "from New York", "from Toronto", "from Paris"
];

// Helper to create permutations
const permute = (arr1: string[], arr2: string[]) => {
    const result: string[] = [];
    arr1.forEach(i1 => {
        arr2.forEach(i2 => {
            result.push(`${i1} ${i2}`);
        });
    });
    return result;
};

// Generate Categories
export const generateKeywords = () => {

    // 1. Service + Location (Core)
    const serviceLocation = permute(bases, locations);

    // 2. Adjective + Service + Location (Long tail)
    const adjServiceLocation = permute(adjectives, bases).map(s => {
        // Pick a random location to append, or generate all? All might be too many.
        // Let's take top 5 locations to keep it sane but dense.
        return locations.slice(0, 5).map(l => `${s} ${l}`);
    }).flat();

    // 3. Vehicle + Service (Specific intent)
    const vehicleService = permute(vehicles, bases);
    const vehicleLocation = permute(vehicles, locations);

    // 4. Service + Audience (Targeted)
    const serviceAudience = permute(bases, audiences);

    // 5. Questions / Phrases
    const questions = [
        "How to book taxi from Jeddah to Makkah",
        "Cost of taxi from Jeddah to Makkah",
        "Uber vs Taxi in Makkah",
        "Careem Makkah rates",
        "Train or Taxi Makkah to Madinah",
        "Best transport company for Umrah",
        "Al Kiswah Umrah Transport contact",
        "Umrah taxi prices 2025",
        "Umrah taxi prices 2026",
        "Ziarah taxi Makkah price",
        "Madinah airport to hotel taxi cost"
    ];

    return {
        all: [
            ...serviceLocation,
            ...adjServiceLocation,
            ...vehicleService,
            ...vehicleLocation,
            ...serviceAudience,
            ...questions
        ],
        categories: {
            routes: serviceLocation,
            international: serviceAudience.filter(k => k.includes("UK") || k.includes("USA") || k.includes("Canada") || k.includes("London") || k.includes("New York") || k.includes("Toronto") || k.includes("Paris")),
            vehicles: [...vehicleService, ...vehicleLocation],
            budget_luxury: adjServiceLocation
        }
    };
};

export const generatedData = generateKeywords();
