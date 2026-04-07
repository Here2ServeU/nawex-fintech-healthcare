import React from "react";

export default function RiskCard({ title = "Risk Card", value = "N/A" }) {
  return (
    <div>
      <strong>{title}</strong>
      <div>{value}</div>
    </div>
  );
}
