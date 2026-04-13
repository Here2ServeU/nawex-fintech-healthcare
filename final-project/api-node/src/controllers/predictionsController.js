const {
  predictFraud,
  predictCredit,
  predictReadmission,
  analyzeDischargeNote,
  predictIncident,
  analyzeLogs
} = require("../services/aiService");

async function fraud(req, res) {
  try {
    res.json(await predictFraud(req.body));
  } catch (error) {
    res.status(502).json({ error: "Fraud service unavailable" });
  }
}

async function credit(req, res) {
  try {
    res.json(await predictCredit(req.body));
  } catch (error) {
    res.status(502).json({ error: "Credit service unavailable" });
  }
}

async function readmission(req, res) {
  try {
    res.json(await predictReadmission(req.body));
  } catch (error) {
    res.status(502).json({ error: "Readmission service unavailable" });
  }
}

async function dischargeNote(req, res) {
  try {
    res.json(await analyzeDischargeNote(req.body));
  } catch (error) {
    res.status(502).json({ error: "Discharge note analysis unavailable" });
  }
}

async function incident(req, res) {
  try {
    res.json(await predictIncident(req.body));
  } catch (error) {
    res.status(502).json({ error: "Incident prediction unavailable" });
  }
}

async function logs(req, res) {
  try {
    res.json(await analyzeLogs(req.body));
  } catch (error) {
    res.status(502).json({ error: "Log anomaly analysis unavailable" });
  }
}

module.exports = {
  fraud,
  credit,
  readmission,
  dischargeNote,
  incident,
  logs
};
