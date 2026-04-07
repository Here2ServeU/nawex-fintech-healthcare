const { publishEvent } = require("../services/kafkaProducer");
const { listDocuments } = require("../services/mongoService");
const { searchDocuments } = require("../services/opensearchService");
const config = require("../config");

async function ingestTransaction(req, res) {
  try {
    const payload = {
      domain: "fintech",
      type: "transaction",
      timestamp: new Date().toISOString(),
      ...req.body
    };

    await publishEvent(config.fintechTopic, payload);

    res.status(202).json({
      message: "FinTech transaction event published to Kafka",
      payload
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getFintechRecords(req, res) {
  try {
    const docs = await listDocuments("fintech_transactions");
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchFintech(req, res) {
  try {
    const q = req.query.q || "";
    const results = await searchDocuments("fintech-transactions", q);
    res.json(results.body || results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  ingestTransaction,
  getFintechRecords,
  searchFintech
};
