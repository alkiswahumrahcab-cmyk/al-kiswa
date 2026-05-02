require('dotenv').config();
const { MongoClient, ObjectId } = require('mongodb');

async function setGMCPrice() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db();
        
        const routeId = new ObjectId('69805f0f08dd90fe6802fcfc');
        const vehicles = await db.collection('vehicles').find({}).toArray();
        
        let insertedCount = 0;

        for (const v of vehicles) {
            const nameLower = v.name.toLowerCase();
            let priceToSet = null;

            if (nameLower.includes('gmc')) priceToSet = 900;
            
            if (priceToSet !== null) {
                const newDoc = {
                    route: routeId.toString(),
                    vehicle: v._id.toString(),
                    price: priceToSet,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    __v: 0
                };
                
                const existing = await db.collection('routeprices').findOne({ route: routeId.toString(), vehicle: v._id.toString() });
                if (!existing) {
                    await db.collection('routeprices').insertOne(newDoc);
                    console.log(`Inserted price for ${v.name}: ${priceToSet} SAR`);
                    insertedCount++;
                } else {
                    await db.collection('routeprices').updateOne({ _id: existing._id }, { $set: { price: priceToSet, updatedAt: new Date() }});
                    console.log(`Updated price for ${v.name}: ${priceToSet} SAR`);
                    insertedCount++;
                }
            }
        }
        
        console.log(`Finished setting GMC prices. Modified/Inserted: ${insertedCount}`);
        
    } finally {
        await client.close();
    }
}
setGMCPrice().catch(console.error);
