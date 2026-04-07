const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/health");
const fintechRoutes = require("./routes/fintech");
const healthcareRoutes = require("./routes/healthcare");
const analyticsRoutes = require("./routes/analytics");
const config = require("./config");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/fintech", fintechRoutes);
app.use("/api/healthcare", healthcareRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(config.port, () => {
  console.log(`NERP API listening on port ${config.port}`);
});
