import { MongoClient } from "mongodb";

// Cache the client on globalThis so dev-mode hot reloads reuse one
// connection pool instead of opening a new one on every file change.
const globalWithMongo = globalThis as unknown as { mongoClient?: MongoClient };

export function getDb() {
  if (!globalWithMongo.mongoClient) {
    globalWithMongo.mongoClient = new MongoClient(
      process.env.MONGODB_URI as string,
    );
  }

  return globalWithMongo.mongoClient.db("better-together");
}
