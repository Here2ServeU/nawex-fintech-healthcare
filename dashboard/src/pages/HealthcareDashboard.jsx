import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function HealthcareDashboard() {
  return (
    <DomainDashboard
      title="Healthcare Operations"
      description="Monitor patient event flow, inspect encounter activity, and search OpenSearch for departments, severity, and clinical event signals."
      accent="#9a3412"
      recordPath="/api/healthcare/records"
      searchPath="/api/healthcare/search"
      searchPlaceholder="Search patient events, departments, severities, or encounter IDs"
      summaryBuilder={(records) => {
        const criticalCount = records.filter((record) => String(record.severity || "").toLowerCase() === "high").length;
        const departments = new Set(records.map((record) => record.department).filter(Boolean)).size;
        const encounters = new Set(records.map((record) => record.encounter_id).filter(Boolean)).size;

        return [
          {
            title: "Patient Events",
            value: records.length,
            subtitle: "Records available in the access layer"
          },
          {
            title: "Critical Signals",
            value: criticalCount,
            subtitle: "Events marked with high severity"
          },
          {
            title: "Departments",
            value: departments,
            subtitle: "Distinct operational departments"
          },
          {
            title: "Encounters",
            value: encounters,
            subtitle: "Unique encounter IDs in current records"
          }
        ];
      }}
    />
  );
}
