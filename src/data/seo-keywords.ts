export const seoKeywords = {
    primary: [
        "Umrah transportation 2026",
        "Umrah taxi service",
        "Makkah to Madinah transport",
        "Jeddah airport to Makkah taxi",
        "Umrah private car service",
        "Madinah to Makkah taxi",
        "Umrah car rental with driver",
        "Haramain train booking",
        "Intercity transport Saudi Arabia",
        "Umrah group transportation"
    ],
    regions: {
        uk: [
            "Umrah taxi for UK pilgrims",
            "Umrah transport from London",
            "British pilgrims Umrah taxi",
            "Manchester to Makkah transport",
            "Birmingham Umrah taxi service",
            "Umrah cab service for UK citizens",
            "Halal travel transport Saudi Arabia UK",
            "Best Umrah taxi for British Muslims"
        ],
        usa: [
            "Umrah taxi for US pilgrims",
            "Umrah transport from USA",
            "American pilgrims Umrah taxi",
            "New York to Jeddah Umrah transfer",
            "Chicago Umrah group transport",
            "Reliable Makkah taxi for US visitors",
            "US Dollar payment Umrah taxi"
        ],
        canada: [
            "Umrah taxi for Canadian pilgrims",
            "Umrah transport from Canada",
            "Toronto to Jeddah Umrah transfer",
            "Canadian pilgrims Makkah transport",
            "Safe Umrah transport for Canadian families"
        ],
        europe: [
            "Umrah taxi for European pilgrims",
            "Umrah transport from France",
            "Umrah transport from Germany",
            "English speaking driver Umrah taxi Europe"
        ]
    },
    location: [
        "Jeddah airport transfers",
        "Taxi from Jeddah to Makkah hotel",
        "Madinah airport to Madinah hotel taxi",
        "Makkah to Jeddah airport cab",
        "Transport from Makkah to Taif",
        "Madinah to Jeddah transport",
        "Ziyarat transport in Makkah",
        "Ziyarat transport in Madinah",
        "Makkah city taxi service",
        "Makkah to Badar transport",
        // Restored Specific Routes
        "Jeddah North Terminal to Makkah Taxi",
        "Jeddah Hajj Terminal to Makkah Taxi",
        "Makkah Hotel to Madinah Hotel Taxi",
        "Makkah to Madinah Train Alternative",
        "Madinah City to Jeddah Airport Cab"
    ],
    vehicles: [
        "GMC for Umrah",
        "7-seater car for Umrah",
        "Toyota Hiace for Umrah",
        "Luxury bus for Umrah",
        "VIP Umrah transport",
        "Hyundai Staria for Umrah",
        "Economy car for Umrah",
        "Coaster for Umrah groups",
        "SUV rental for Umrah",
        "Innova for Umrah taxi",
        // Restored Vehicle Specifics
        "GMC Yukon XL Umrah Taxi",
        "Chevy Tahoe Umrah Taxi",
        "Hyundai H1 Makkah Taxi",
        "Toyota Coaster Bus Rental Madinah",
        "Lexus Umrah Transfer",
        "Mercedes Sprinter Makkah Rental"
    ],
    intent: [
        "Book Umrah taxi online",
        "Cheap Umrah taxi prices",
        "Best Umrah transport company",
        "Umrah taxi WhatsApp number",
        "Umrah transport rates 1447",
        "Last minute Umrah taxi booking",
        "24/7 Umrah taxi service",
        "Affordable Makkah taxi",
        "Umrah transport packages",
        "Reliable Umrah driver"
    ],
    longTail: [
        "How to go from Jeddah to Makkah",
        "Cost of taxi from Jeddah to Makkah 2026",
        "Is there a bus from Makkah to Madinah?",
        "Best way to travel from Madinah to Makkah",
        "Haramain high-speed train vs taxi",
        "Can I book a taxi at Jeddah airport?",
        "Traveling with elderly in Umrah transport",
        "Luggage space in Umrah taxis",
        "Distance from Jeddah to Makkah by car",
        "How to book a private van for Umrah"
    ],
    ziyarat: [
        "Makkah Ziyarat taxi",
        "Madinah Ziyarat tour transport",
        "Ghar-e-Hira transport",
        "Jabal-e-Rehmat taxi",
        "Masjid Quba transport",
        "Battle of Uhud site visit",
        "Masjid-e-Qiblatain transport",
        "Seven Mosques Madinah tour",
        "Cave of Thawr transport",
        "Ziyarat package for families"
    ],
    features: [
        "English speaking Umrah driver",
        "Umrah transport with baby seat",
        "Female-friendly Umrah taxi",
        "Wheelchair accessible Umrah transport",
        "Umrah transport for large families",
        "Direct door-to-door Umrah service",
        "Umrah taxi with Wi-Fi",
        "Pre-booked Umrah transfers",
        "Umrah taxi receipt for reimbursement",
        "Professional Umrah chauffeur"
    ],
    alternatives: [
        "SAPTCO Umrah bus booking",
        "Uber in Makkah for Umrah",
        "Careem service in Madinah",
        "Haramain train ticket price",
        "Makkah to Madinah bus schedule",
        "North Network train Saudi Arabia",
        "Al-Haramain rail booking 2026",
        "Taxi near Masjid al-Haram",
        "Taxi near Masjid-an-Nabawi",
        "Bus vs Train for Umrah"
    ],
    seasonal: [
        "Ramadan Umrah transportation",
        "Umrah taxi during Hajj season",
        "Umrah transport January 2026",
        "Post-Umrah holiday transport",
        "Umrah transport for pilgrims from UK",
        "Umrah taxi for USA pilgrims",
        "Umrah transport for Pakistan pilgrims",
        "December Umrah taxi deals",
        "New year Umrah transport",
        "Saudi Vision 2030 Umrah transport"
    ],
    lsi: [
        "KSA transport rules",
        "Pilgrim ground services",
        "Makkah hotel transfers",
        "Madinah airport shuttle",
        "Saudi transport authority licensed",
        "Umrah logistics",
        "Hajj and Umrah ground handling",
        "Religious tourism Saudi Arabia",
        "Holy city transfers",
        "Saudi road trip for Umrah"
    ]
};

// Flattened list for meta tags (High Impact)
export const metaKeywords = [
    ...seoKeywords.primary,
    ...seoKeywords.location.slice(0, 5),
    ...seoKeywords.vehicles.slice(0, 5),
    ...seoKeywords.intent.slice(0, 5),
    "Umrah Taxi UK",
    "Umrah Taxi USA",
    "GMC Yukon Makkah",
    "Jeddah Airport Transfer"
].filter(Boolean);

// Function to get distinct keywords for sitemap or other programmatic uses
// --- Generator Logic for High Volume (Restoring 600+ keywords) ---
const generators = {
    bases: [
        "Umrah Taxi", "Umrah Transport", "Umrah Cab", "Jeddah Airport Taxi",
        "Makkah Taxi", "Madinah Taxi", "Hajj Transport", "Pilgrim Transfer",
        "Private Car Service", "VIP Transport", "Luxury Ride"
    ],
    adjectives: [
        "Cheap", "Affordable", "Luxury", "VIP", "Private", "Best", "Reliable",
        "Trusted", "Professional", "Safe", "Secure", "Comfortable", "Premium",
        "Exclusive", "Fast", "Direct", "24/7", "Fixed Price"
    ],
    locations: [
        "from Jeddah Airport to Makkah",
        "from Makkah to Madinah",
        "from Madinah to Jeddah Airport",
        "in Makkah",
        "in Madinah",
        "from Jeddah to Makkah Hotel",
        "to Clock Tower Makkah",
        "to Haram Makkah",
        "from Madinah Airport to Masjid Nabawi"
    ],
    vehicles: [
        "GMC Yukon", "Chevy Tahoe", "Hyundai Staria", "Toyota Hiace",
        "Toyota Coaster", "Ford Taurus", "Lexus ES", "Mercedes Sprinter",
        "Family Van", "Mini Bus", "SUV", "MPV"
    ]
};

const permute = (arr1: string[], arr2: string[]) => {
    const result: string[] = [];
    arr1.forEach(i1 => {
        arr2.forEach(i2 => {
            result.push(`${i1} ${i2}`);
        });
    });
    return result;
};

// Generate massive list on the fly
const generatedKeywords = [
    ...permute(generators.bases, generators.locations), // Service + Location
    ...permute(generators.adjectives, generators.bases).map(s => generators.locations.slice(0, 3).map(l => `${s} ${l}`)).flat(), // Adj + Service + Loc
    ...permute(generators.vehicles, generators.bases), // Vehicle + Service
    ...permute(generators.bases, generators.adjectives) // Service + Adj (e.g. "Umrah Taxi Cheap")
];



export const getAllKeywords = () => {
    // data keys that are arrays
    const standardLists = Object.entries(seoKeywords)
        .filter(([key]) => key !== 'regions')
        .map(([, val]) => val)
        .flat() as string[];

    const regionList = Object.values(seoKeywords.regions).flat();

    // Combine Manual Curated + Programmatically Generated
    return [...new Set([...standardLists, ...regionList, ...generatedKeywords])];
};

// Export specific generated lists if needed for UI categories
export const allServicePermutations = [
    ...new Set([
        ...seoKeywords.primary,
        ...seoKeywords.location,
        ...seoKeywords.vehicles,
        ...seoKeywords.intent,
        ...Object.values(seoKeywords.regions).flat(),
        ...generatedKeywords
    ])
];
