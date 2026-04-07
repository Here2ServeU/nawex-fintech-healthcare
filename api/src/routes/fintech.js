const router = require("express").Router();
const {
  ingestTransaction,
  getFintechRecords,
  searchFintech
} = require("../controllers/fintechController");

router.post("/ingest", ingestTransaction);
router.get("/records", getFintechRecords);
router.get("/search", searchFintech);

module.exports = router;
