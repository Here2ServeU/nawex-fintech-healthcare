async function getAnalyticsSummary(req, res) {
  res.json({
    status: "ok",
    message: "Analytics summary placeholder",
    domains: ["fintech", "healthcare"]
  });
}

module.exports = {
  getAnalyticsSummary
};
