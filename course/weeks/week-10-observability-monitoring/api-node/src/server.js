const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

const healthRoutes = require("./routes/health");
const usersRoutes = require("./routes/users");
const transactionsRoutes = require("./routes/transactions");
const patientsRoutes = require("./routes/patients");
const predictionsRoutes = require("./routes/predictions");
const reliabilityRoutes = require("./routes/reliability");

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 250
  })
);

app.use("/api/health", healthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/patients", patientsRoutes);
app.use("/api/predictions", predictionsRoutes);
app.use("/api/reliability", reliabilityRoutes);
app.get("/metrics", (req, res) => {
  res.type("text/plain").send(
    [
      "# HELP nerp_api_up API process availability",
      "# TYPE nerp_api_up gauge",
      "nerp_api_up 1",
      "# HELP nerp_reliability_samples_total Sample telemetry records in memory",
      "# TYPE nerp_reliability_samples_total gauge",
      "nerp_reliability_samples_total 3"
    ].join("\n")
  );
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal server error"
  });
});

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`NERP API listening on port ${port}`);
});
