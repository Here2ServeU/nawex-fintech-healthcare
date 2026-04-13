const router = require("express").Router();
const { getAll, getById, scoreReadmission, runDischargeNlp } = require("../controllers/patientsController");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/readmission-score", scoreReadmission);
router.post("/discharge-analysis", runDischargeNlp);

module.exports = router;
