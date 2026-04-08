import React from "react";
import FintechDashboard from "./pages/FintechDashboard";
import HealthcareDashboard from "./pages/HealthcareDashboard";

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(15,118,110,0.18), transparent 28%), radial-gradient(circle at top right, rgba(154,52,18,0.18), transparent 30%), linear-gradient(180deg, #f8fbff 0%, #eef4f8 100%)",
        padding: "2rem 1.25rem 3rem",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#0f172a"
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <section
          style={{
            background: "#0f172a",
            color: "#f8fafc",
            borderRadius: "32px",
            padding: "2rem",
            marginBottom: "1.5rem",
            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.2)"
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.4rem 0.8rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              fontSize: "0.82rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginBottom: "1rem"
            }}
          >
            NERP Analytics Surface
          </div>
          <h1 style={{ margin: "0 0 0.75rem", fontSize: "clamp(2rem, 4vw, 3.4rem)" }}>
            FinTech and healthcare visibility in one integrated dashboard
          </h1>
          <p style={{ margin: 0, maxWidth: "70ch", lineHeight: 1.7, color: "#cbd5e1" }}>
            This view combines the API access layer with OpenSearch-backed querying so you can inspect recent
            domain records and run live searches without switching into the OpenSearch Dashboards UI.
          </p>
        </section>

        <FintechDashboard />
        <HealthcareDashboard />
      </div>
    </main>
  );
}
