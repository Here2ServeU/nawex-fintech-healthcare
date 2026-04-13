const router = require("express").Router();
const { fraud, credit, readmission, dischargeNote, incident, logs } = require("../controllers/predictionsController");

router.post("/fraud", fraud);
router.post("/credit", credit);
router.post("/readmission", readmission);
router.post("/discharge-note", dischargeNote);
router.post("/incident", incident);
router.post("/logs", logs);

module.exports = router;
