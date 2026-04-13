const router = require("express").Router();
const { listTelemetry, incidentPrediction, logAnomaly } = require("../controllers/reliabilityController");

router.get("/telemetry", listTelemetry);
router.post("/predict", incidentPrediction);
router.post("/logs/analyze", logAnomaly);

module.exports = router;
