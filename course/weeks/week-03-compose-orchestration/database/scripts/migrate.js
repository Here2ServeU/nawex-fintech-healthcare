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

  const migrationsDir = path.resolve(__dirname, "../migrations");
  const files = fs.readdirSync(migrationsDir).filter((file) => file.endsWith(".sql")).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Running migration: ${file}`);
    await client.query(sql);
  }

  await client.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
