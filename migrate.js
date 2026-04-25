const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://alkiswahumrahcab_db_user:alqiswacab1234567@alkiswa.gmeajhv.mongodb.net/alkiswa_db?retryWrites=true&w=majority&appName=alkiswa";

async function run() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(uri);
        console.log("Connected successfully!");

        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const users = await usersCollection.find({}).toArray();
        console.log(`Found ${users.length} total users.`);

        let migratedCount = 0;

        for (const user of users) {
            if (user.password) {
                // If password does not start with $2a$ or $2b$, it's plain text (or another format we don't support)
                if (!user.password.startsWith('$2a$') && !user.password.startsWith('$2b$')) {
                    console.log(`Migrating password for user: ${user.email} ...`);
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(user.password, salt);
                    
                    await usersCollection.updateOne(
                        { _id: user._id },
                        { $set: { password: hashedPassword } }
                    );
                    migratedCount++;
                }
            }
        }

        console.log(`Migration complete. Successfully hashed ${migratedCount} passwords.`);
    } catch (error) {
        console.error("Migration failed:", error);
    } finally {
        await mongoose.disconnect();
    }
}

run();
