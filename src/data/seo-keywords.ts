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

// Removed spam generator per manual action review.
