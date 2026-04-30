import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = 'mongodb+srv://alkiswahumrahcab_db_user:alqiswacab1234567@alkiswa.gmeajhv.mongodb.net/alkiswa_db?retryWrites=true&w=majority&appName=alkiswa';
const newPassword = 'AlKiswa@Admin2024!';

const client = new MongoClient(uri);
await client.connect();
const db = client.db('alkiswa_db');
const hash = await bcrypt.hash(newPassword, 12);

const users = await db.collection('users').find({}).toArray();
console.log('All users:', users.map(u => u.email + ' | ' + u.role));

const r = await db.collection('users').updateMany(
  { role: { $in: ['admin','manager','operational_manager'] } },
  { $set: { password: hash } }
);
console.log('Updated:', r.modifiedCount, 'user(s)');
console.log('');
console.log('=== LOGIN CREDENTIALS ===');
console.log('Password: ' + newPassword);
await client.close();
