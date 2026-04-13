const router = require("express").Router();
const { getAll, getById, create, scoreCredit } = require("../controllers/transactionsController");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.post("/credit-score", scoreCredit);

module.exports = router;
