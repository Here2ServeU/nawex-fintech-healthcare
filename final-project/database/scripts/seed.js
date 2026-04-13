const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env")
});

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();

  const seedSql = fs.readFileSync(path.resolve(__dirname, "../seeds/001_seed.sql"), "utf8");
  await client.query(seedSql);
  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
