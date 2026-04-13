const db = require("../db");
const { predictFraud, predictCredit } = require("../services/aiService");

async function getAll(req, res) {
  const result = await db.query(
    `SELECT t.id, t.user_id, t.amount, t.currency, t.transaction_type, t.status, t.merchant_name,
            t.fraud_score, t.fraud_flagged, t.created_at, u.full_name
       FROM transactions t
       JOIN users u ON u.id = t.user_id
      ORDER BY t.created_at DESC
      LIMIT 100`
  );

  res.json(result.rows);
}

async function getById(req, res) {
  const result = await db.query(
    `SELECT id, user_id, amount, currency, transaction_type, status, merchant_name,
            fraud_score, fraud_flagged, created_at
       FROM transactions
      WHERE id = $1`,
    [req.params.id]
  );

  if (result.rowCount === 0) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  return res.json(result.rows[0]);
}

async function create(req, res) {
  const { amount, currency, transaction_type, user_id, merchant_name, is_online } = req.body;

  if (!amount || !transaction_type || !user_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const insertResult = await db.query(
    `INSERT INTO transactions (amount, currency, transaction_type, user_id, merchant_name, status)
     VALUES ($1, $2, $3, $4, $5, 'pending')
     RETURNING id, user_id, amount, currency, transaction_type, status, merchant_name, created_at`,
    [amount, currency || "USD", transaction_type, user_id, merchant_name || null]
  );

  const transaction = insertResult.rows[0];
  const createdAt = new Date(transaction.created_at);

  let fraud = {
    fraud_probability: 0.32,
    risk_level: "medium",
    requires_review: false,
    explanation: {}
  };

  try {
    fraud = await predictFraud({
      amount: Number(amount),
      hour_of_day: createdAt.getUTCHours(),
      day_of_week: createdAt.getUTCDay(),
      user_account_age_days: 90,
      merchant_category: merchant_name || "general",
      is_online: Boolean(is_online)
    });
  } catch (error) {
    console.error("Fraud service unavailable, using fallback score", error.message);
  }

  await db.query(
    `UPDATE transactions
        SET fraud_score = $1, fraud_flagged = $2, status = $3
      WHERE id = $4`,
    [
      fraud.fraud_probability,
      fraud.requires_review,
      fraud.requires_review ? "under_review" : "approved",
      transaction.id
    ]
  );

  const updated = await db.query(
    `SELECT id, user_id, amount, currency, transaction_type, status, merchant_name,
            fraud_score, fraud_flagged, created_at
       FROM transactions
      WHERE id = $1`,
    [transaction.id]
  );

  res.status(201).json({
    transaction: updated.rows[0],
    fraud
  });
}

async function scoreCredit(req, res) {
  try {
    const result = await predictCredit(req.body);
    res.json(result);
  } catch (error) {
    res.status(502).json({ error: "Credit scoring service unavailable" });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  scoreCredit
};
