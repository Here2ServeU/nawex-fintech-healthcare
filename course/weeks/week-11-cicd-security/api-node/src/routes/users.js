const router = require("express").Router();
const { listUsers } = require("../controllers/usersController");

router.get("/", listUsers);

module.exports = router;
