const { predictIncident, analyzeLogs } = require("../services/aiService");

const telemetryFeed = [
  {
    id: "telemetry-1",
    service: "payments-worker",
    cpu_percent: 81,
    memory_percent: 76,
    error_rate: 0.04,
    latency_ms: 420,
    status: "warning",
    created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString()
  },
  {
    id: "telemetry-2",
    service: "patient-risk-api",
    cpu_percent: 63,
    memory_percent: 54,
    error_rate: 0.01,
    latency_ms: 210,
    status: "healthy",
    created_at: new Date(Date.now() - 1000 * 60 * 9).toISOString()
  },
  {
    id: "telemetry-3",
    service: "log-ingestor",
    cpu_percent: 92,
    memory_percent: 88,
    error_rate: 0.11,
    latency_ms: 870,
    status: "critical",
    created_at: new Date(Date.now() - 1000 * 60 * 4).toISOString()
  }
];

async function listTelemetry(req, res) {
  res.json(telemetryFeed);
}

async function incidentPrediction(req, res) {
  try {
    const result = await predictIncident(req.body);
    const record = {
      id: `telemetry-${telemetryFeed.length + 1}`,
      service: req.body.service || "uploaded-service",
      cpu_percent: req.body.cpu_percent,
      memory_percent: req.body.memory_percent,
      error_rate: req.body.error_rate,
      latency_ms: req.body.latency_ms,
      status: result.failure_risk === "critical" ? "critical" : result.failure_risk,
      created_at: new Date().toISOString()
    };
    telemetryFeed.unshift(record);
    res.json(result);
  } catch (error) {
    res.status(502).json({ error: "Incident prediction service unavailable" });
  }
}

async function logAnomaly(req, res) {
  try {
    const result = await analyzeLogs(req.body);
    res.json(result);
  } catch (error) {
    res.status(502).json({ error: "Log anomaly service unavailable" });
  }
}

module.exports = {
  listTelemetry,
  incidentPrediction,
  logAnomaly
};
