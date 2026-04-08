import React from "react";

export default function RiskCard({
  title = "Metric",
  value = "N/A",
  subtitle = "",
  accent = "#0f172a"
}) {
  return (
    <article
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ef",
        borderTop: `4px solid ${accent}`,
        borderRadius: "18px",
        padding: "1rem 1.1rem",
        minHeight: "120px",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)"
      }}
    >
      <div
        style={{
          color: "#475569",
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "0.65rem"
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "#0f172a",
          marginBottom: "0.35rem"
        }}
      >
        {value}
      </div>
      <div style={{ color: "#64748b", fontSize: "0.95rem" }}>{subtitle}</div>
    </article>
  );
}
