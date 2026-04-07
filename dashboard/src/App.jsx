import React from "react";
import FintechDashboard from "./pages/FintechDashboard";
import HealthcareDashboard from "./pages/HealthcareDashboard";

export default function App() {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>NERP FinTech & Healthcare Platform</h1>
      <p>Search, analytics, event monitoring, and dashboard access layer.</p>

      <hr />

      <FintechDashboard />

      <hr />

      <HealthcareDashboard />
    </div>
  );
}
