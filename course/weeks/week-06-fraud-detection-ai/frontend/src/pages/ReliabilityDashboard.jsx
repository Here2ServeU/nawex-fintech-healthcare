import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function ReliabilityDashboard() {
  return (
    <DomainDashboard
      title="NERP Lite Reliability"
      subtitle="AI-powered DevOps platform"
      description="Upload metrics, score failure risk, inspect telemetry, and use the platform as the shared operational layer before branching into FinTech and Healthcare AI use cases."
      accent="#0369a1"
      recordPath="/api/reliability/telemetry"
      scorePath="/api/reliability/predict"
      scoreLabel="Incident prediction"
      samplePayload={{
        service: "checkout-api",
        cpu_percent: 87,
        memory_percent: 79,
        error_rate: 0.08,
        latency_ms: 650,
        logs_per_minute: 1800
      }}
      summaryBuilder={(records) => {
        const avgCpu = records.length
          ? records.reduce((sum, record) => sum + Number(record.cpu_percent || 0), 0) / records.length
          : 0;
        const critical = records.filter((record) => String(record.status).toLowerCase() === "critical").length;
        const avgLatency = records.length
          ? records.reduce((sum, record) => sum + Number(record.latency_ms || 0), 0) / records.length
          : 0;

        return [
          { title: "Telemetry", value: records.length, subtitle: "Operational samples ingested" },
          { title: "Avg CPU", value: `${avgCpu.toFixed(1)}%`, subtitle: "Mean compute saturation" },
          { title: "Critical", value: critical, subtitle: "Services needing intervention" },
          { title: "Avg Latency", value: `${avgLatency.toFixed(0)} ms`, subtitle: "Response-time trend" }
        ];
      }}
    />
  );
}
