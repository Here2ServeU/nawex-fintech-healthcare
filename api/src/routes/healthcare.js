const router = require("express").Router();
const {
  ingestHealthcareEvent,
  getHealthcareRecords,
  searchHealthcare
} = require("../controllers/healthcareController");

router.post("/ingest", ingestHealthcareEvent);
router.get("/records", getHealthcareRecords);
router.get("/search", searchHealthcare);

module.exports = router;
