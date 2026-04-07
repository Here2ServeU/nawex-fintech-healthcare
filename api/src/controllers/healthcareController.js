const { publishEvent } = require("../services/kafkaProducer");
const { listDocuments } = require("../services/mongoService");
const { searchDocuments } = require("../services/opensearchService");
const config = require("../config");

async function ingestHealthcareEvent(req, res) {
  try {
    const payload = {
      domain: "healthcare",
      type: "patient_event",
      timestamp: new Date().toISOString(),
      ...req.body
    };

    await publishEvent(config.healthcareTopic, payload);

    res.status(202).json({
      message: "Healthcare event published to Kafka",
      payload
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getHealthcareRecords(req, res) {
  try {
    const docs = await listDocuments("healthcare_events");
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function searchHealthcare(req, res) {
  try {
    const q = req.query.q || "";
    const results = await searchDocuments("healthcare-events", q);
    res.json(results.body || results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  ingestHealthcareEvent,
  getHealthcareRecords,
  searchHealthcare
};
