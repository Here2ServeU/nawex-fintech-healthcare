import React from "react";

export default function RiskCard({ title, value, subtitle, accent }) {
  return (
    <article
      style={{
        borderRadius: "22px",
        padding: "1rem",
        background: "#fff",
        border: "1px solid rgba(203,213,225,0.8)"
      }}
    >
      <div style={{ width: "40px", height: "5px", borderRadius: "999px", background: accent, marginBottom: "0.85rem" }} />
      <div style={{ color: "#64748b", fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase" }}>{title}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: 800, margin: "0.4rem 0 0.3rem" }}>{value}</div>
      <div style={{ color: "#475569", lineHeight: 1.5, fontSize: "0.92rem" }}>{subtitle}</div>
    </article>
  );
}
