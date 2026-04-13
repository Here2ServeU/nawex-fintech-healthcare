const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "nerp-api"
  });
});

module.exports = router;
