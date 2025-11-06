import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'default';

let client: MongoClient;
let db: Db;

export async function connectToDatabase(): Promise<Db> {
  if (db) return db; // reuse existing connection

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  console.log(`✅ Connected to MongoDB: ${dbName}`);
  return db;
}

export function getDb(): Db {
  if (!db) {
    throw new Error('Database not connected. Call connectToDatabase() first.');
  }
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (client) {
    await client.close();
    console.log('🛑 MongoDB connection closed.');
  }
}
