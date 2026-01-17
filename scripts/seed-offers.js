
const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
const envLocal = path.resolve(process.cwd(), '.env.local');
const env = path.resolve(process.cwd(), '.env');

// Try loading .env.local, then .env
dotenv.config({ path: envLocal });
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: env });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Please define the MONGODB_URI environment variable');
    process.exit(1);
}

const vehiclesUpdate = [
    {
        nameLike: 'Staria',
        update: {
            isOfferActive: true,
            offerPrice: '400 SAR',
            discountLabel: 'Limited Time',
            image: '/images/fleet/hyundai-staria-2025.png'
        }
    },
    {
        nameLike: 'Hiace',
        update: {
            isOfferActive: true,
            offerPrice: '350 SAR',
            discountLabel: 'Family Deal',
            image: '/images/fleet/toyota-hiace-2025.png'
        }
    },
    {
        nameLike: 'Camry',
        update: {
            isOfferActive: true,
            offerPrice: '200 SAR',
            discountLabel: '20% OFF',
            image: '/images/fleet/camry-2025.png'
        }
    },
    {
        nameLike: 'Coaster',
        update: {
            isOfferActive: true,
            offerPrice: '650 SAR',
            discountLabel: 'Group Special',
            image: '/images/fleet/toyota-coaster-studio.png' // Keeping this as valid per list
        }
    },
    {
        nameLike: 'Starex',
        update: {
            isOfferActive: true,
            offerPrice: '300 SAR',
            discountLabel: 'Economy',
            image: '/images/fleet/hyundai-h1.png'
        }
    },
    {
        nameLike: 'Yukon',
        update: {
            isOfferActive: true,
            offerPrice: '450 SAR',
            discountLabel: 'Save 150 SAR',
            image: '/images/fleet/gmc-yukon-2025.png'
        }
    }
];

async function seedOffers() {
    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('vehicles');

        for (const item of vehiclesUpdate) {
            const regex = new RegExp(item.nameLike, 'i');
            const result = await collection.updateMany(
                { name: { $regex: regex } },
                { $set: item.update }
            );
            console.log(`Updated ${item.nameLike}: ${result.modifiedCount} matches`);
        }

        console.log('Seeding complete!');

    } catch (error) {
        console.error('Error seeding offers:', error);
    } finally {
        await client.close();
    }
}

seedOffers();
