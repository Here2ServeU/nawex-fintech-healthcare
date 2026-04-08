import React from "react";

export default function EventTable({ title, rows = [], emptyMessage = "No data available yet." }) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #dbe3ef",
        borderRadius: "20px",
        padding: "1.1rem",
        boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)"
      }}
    >
      <div
        style={{
          fontWeight: 800,
          color: "#0f172a",
          fontSize: "1.05rem",
          marginBottom: "0.9rem"
        }}
      >
        {title}
      </div>

      {rows.length === 0 ? (
        <div style={{ color: "#64748b" }}>{emptyMessage}</div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={headerCellStyle}>Record</th>
                <th style={headerCellStyle}>Type</th>
                <th style={headerCellStyle}>Timestamp</th>
                <th style={headerCellStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.id || `${row.type}-${index}`}>
                  <td style={bodyCellStyle}>{row.id || "n/a"}</td>
                  <td style={bodyCellStyle}>{row.type || "n/a"}</td>
                  <td style={bodyCellStyle}>{row.timestamp || "n/a"}</td>
                  <td style={bodyCellStyle}>{row.details || "n/a"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

const headerCellStyle = {
  textAlign: "left",
  padding: "0.8rem 0.75rem",
  color: "#475569",
  fontSize: "0.78rem",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  borderBottom: "1px solid #e2e8f0"
};

const bodyCellStyle = {
  padding: "0.9rem 0.75rem",
  color: "#0f172a",
  borderBottom: "1px solid #eef2f7",
  verticalAlign: "top"
};
