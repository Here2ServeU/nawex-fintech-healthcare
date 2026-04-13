const db = require("../db");

async function listUsers(req, res) {
  const result = await db.query(
    "SELECT id, email, full_name, role, created_at FROM users ORDER BY created_at DESC LIMIT 100"
  );
  res.json(result.rows);
}

module.exports = {
  listUsers
};
