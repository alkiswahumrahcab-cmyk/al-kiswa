require('dotenv').config();
const { MongoClient } = require('mongodb');

async function check() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        
        // Let's get vehicle names first to map them
        const vehicles = await db.collection('vehicles').find({}).toArray();
        const vMap = {};
        vehicles.forEach(v => vMap[v._id.toString()] = v.name);

        const routes = await db.collection('routes').find({}).toArray();

        for (const route of routes) {
            if ((route.origin.toLowerCase().includes('madinah') && route.destination.toLowerCase().includes('jeddah')) ||
                (route.origin.toLowerCase().includes('jeddah') && route.destination.toLowerCase().includes('madinah'))) {
                
                const prices = await db.collection('routeprices').find({ route: route._id.toString() }).toArray();
                console.log(`\nRoute: ${route.origin} to ${route.destination} (ID: ${route._id})`);
                if (prices.length === 0) {
                    console.log('NO PRICES DEFINED');
                }
                for (const p of prices) {
                    console.log(`  Vehicle: ${vMap[p.vehicle] || p.vehicle} => Price: ${p.price}`);
                    if (p.price === 0) {
                        console.log('    ---> THIS PRICE IS 0!');
                    }
                }
            }
        }
        
    } finally {
        await client.close();
    }
}
check().catch(console.error);
