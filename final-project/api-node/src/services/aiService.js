const axios = require("axios");

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

async function postPrediction(path, payload) {
  const response = await axios.post(`${AI_SERVICE_URL}${path}`, payload, {
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": process.env.AI_SERVICE_API_KEY || "nerp-local-key"
    }
  });

  return response.data;
}

async function predictFraud(transaction) {
  return postPrediction("/predict/fraud", transaction);
}

async function predictCredit(application) {
  return postPrediction("/predict/credit", application);
}

async function predictReadmission(payload) {
  return postPrediction("/predict/readmission", payload);
}

async function analyzeDischargeNote(payload) {
  return postPrediction("/analyze/discharge-note", payload);
}

async function predictIncident(payload) {
  return postPrediction("/predict/incident", payload);
}

async function analyzeLogs(payload) {
  return postPrediction("/analyze/logs", payload);
}

module.exports = {
  predictFraud,
  predictCredit,
  predictReadmission,
  analyzeDischargeNote,
  predictIncident,
  analyzeLogs
};
