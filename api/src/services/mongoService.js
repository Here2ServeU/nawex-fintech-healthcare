const { MongoClient } = require("mongodb");
const config = require("../config");

let client;
let db;

async function connectMongo() {
  if (!db) {
    client = new MongoClient(config.mongoUri);
    await client.connect();
    db = client.db("nerp");
  }

  return db;
}

async function insertDocument(collection, document) {
  const database = await connectMongo();
  return database.collection(collection).insertOne(document);
}

async function listDocuments(collection, limit = 20) {
  const database = await connectMongo();
  return database.collection(collection).find().limit(limit).toArray();
}

module.exports = {
  connectMongo,
  insertDocument,
  listDocuments
};
