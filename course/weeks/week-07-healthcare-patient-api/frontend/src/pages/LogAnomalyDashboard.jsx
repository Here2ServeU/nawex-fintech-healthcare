import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function LogAnomalyDashboard() {
  return (
    <DomainDashboard
      title="Log Anomaly Detection"
      subtitle="AIOps log analysis"
      description="Submit raw operational log lines, detect abnormal patterns, and turn log review into an AI-assisted workflow for incident triage."
      accent="#7c3aed"
      recordPath="/api/reliability/telemetry"
      scorePath="/api/reliability/logs/analyze"
      scoreLabel="Log anomaly scan"
      samplePayload={{
        service: "orders-api",
        entries: [
          "ERROR 5xx spike detected for /checkout",
          "Exception while processing payment intent",
          "Connection refused to upstream inventory service"
        ]
      }}
      summaryBuilder={(records) => {
        const hotServices = new Set(records.filter((record) => Number(record.error_rate || 0) >= 0.05).map((record) => record.service)).size;
        const peakMemory = records.reduce((max, record) => Math.max(max, Number(record.memory_percent || 0)), 0);
        const warnings = records.filter((record) => String(record.status).toLowerCase() !== "healthy").length;

        return [
          { title: "Services", value: records.length, subtitle: "Operational services in the sample feed" },
          { title: "Warnings", value: warnings, subtitle: "Services with elevated operational risk" },
          { title: "Hot Services", value: hotServices, subtitle: "Services with high error rates" },
          { title: "Peak Memory", value: `${peakMemory.toFixed(0)}%`, subtitle: "Highest memory saturation" }
        ];
      }}
    />
  );
}
