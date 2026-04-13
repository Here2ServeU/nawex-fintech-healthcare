import React from "react";
import FintechDashboard from "./pages/FintechDashboard";
import HealthcareDashboard from "./pages/HealthcareDashboard";
import ReliabilityDashboard from "./pages/ReliabilityDashboard";
import LogAnomalyDashboard from "./pages/LogAnomalyDashboard";

export default function App() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 10% 0%, rgba(180, 83, 9, 0.16), transparent 24%), radial-gradient(circle at 100% 10%, rgba(3, 105, 161, 0.16), transparent 26%), linear-gradient(180deg, #f6f3ee 0%, #f2f7fb 52%, #eef3f1 100%)",
        padding: "2rem 1.2rem 3rem",
        color: "#111827",
        fontFamily: "\"Avenir Next\", \"Segoe UI\", sans-serif"
      }}
    >
      <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
        <section
          style={{
            padding: "2rem",
            borderRadius: "30px",
            background:
              "linear-gradient(145deg, rgba(14, 23, 43, 0.98), rgba(19, 78, 74, 0.92) 54%, rgba(154, 52, 18, 0.92) 100%)",
            color: "#f8fafc",
            boxShadow: "0 24px 60px rgba(17, 24, 39, 0.18)",
            marginBottom: "1.5rem"
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "0.42rem 0.82rem",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              fontWeight: 700,
              marginBottom: "1rem"
            }}
          >
            NERP Lite · AI-Powered DevOps Reliability Platform
          </div>
          <h1 style={{ margin: "0 0 0.75rem", fontSize: "clamp(2.2rem, 5vw, 4.2rem)", lineHeight: 0.95 }}>
            Predict failures, detect anomalies, and operate cloud systems with AI
          </h1>
          <p style={{ margin: 0, maxWidth: "74ch", lineHeight: 1.7, color: "rgba(241,245,249,0.88)" }}>
            This flagship project combines Web UI, Node.js APIs, Python AI services, Terraform, Kubernetes,
            observability, and CI/CD into a portfolio-grade reliability platform, with FinTech fraud detection and
            Healthcare risk prediction layered in as domain packs.
          </p>
        </section>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "0.9rem",
            marginBottom: "1.5rem"
          }}
        >
          {[
            ["Outcome", "AI + DevOps + Cloud + Terraform"],
            ["Core stack", "React · Node · FastAPI · Prometheus · Grafana"],
            ["AI capabilities", "Incident · Logs · Fraud · Patient Risk"],
            ["Delivery", "Docker · Terraform · Kubernetes · GitHub Actions"]
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.78)",
                border: "1px solid rgba(148,163,184,0.2)",
                borderRadius: "20px",
                padding: "1rem 1.05rem",
                backdropFilter: "blur(10px)"
              }}
            >
              <div style={{ fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#64748b" }}>
                {label}
              </div>
              <div style={{ marginTop: "0.3rem", fontSize: "1.02rem", fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>

        <ReliabilityDashboard />
        <LogAnomalyDashboard />
        <FintechDashboard />
        <HealthcareDashboard />
      </div>
    </main>
  );
}
