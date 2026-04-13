import React from "react";

export default function EventTable({ title, rows, emptyMessage }) {
  return (
    <div
      style={{
        borderRadius: "22px",
        border: "1px solid #e2e8f0",
        background: "#fff",
        padding: "1rem"
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: "0.85rem" }}>{title}</div>
      {rows.length === 0 ? (
        <div style={{ color: "#64748b" }}>{emptyMessage}</div>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {rows.map((row) => (
            <div
              key={row.id}
              style={{
                padding: "0.85rem 0.9rem",
                borderRadius: "16px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", marginBottom: "0.35rem" }}>
                <strong>{row.type}</strong>
                <span style={{ color: "#64748b", fontSize: "0.88rem" }}>{row.timestamp}</span>
              </div>
              <div style={{ fontSize: "0.92rem", color: "#334155", lineHeight: 1.6 }}>{row.details}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
