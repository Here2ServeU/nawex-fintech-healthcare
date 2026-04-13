import React from "react";
import DomainDashboard from "../components/DomainDashboard";

export default function HealthcareDashboard() {
  return (
    <DomainDashboard
      title="NerpHealth"
      subtitle="AI-powered healthcare platform"
      description="Use the same platform to simulate patient operations, score healthcare risk, and show how domain AI extends the reliability core into Healthcare."
      accent="#9a3412"
      recordPath="/api/patients"
      scorePath="/api/predictions/readmission"
      scoreLabel="Readmission risk"
      samplePayload={{
        age: 67,
        length_of_stay_days: 6,
        num_diagnoses: 4,
        num_medications: 8,
        prior_admissions_12mo: 2,
        discharge_disposition: "home_health",
        primary_diagnosis_category: "cardiovascular",
        has_diabetes: true,
        has_heart_failure: true,
        has_copd: false
      }}
      summaryBuilder={(records) => {
        const risks = records.map((record) => Number(record.readmission_risk || 0)).filter((value) => !Number.isNaN(value));
        const avgRisk = risks.length ? risks.reduce((sum, value) => sum + value, 0) / risks.length : 0;
        const highRisk = risks.filter((value) => value >= 0.6).length;
        const withNotes = records.filter((record) => record.discharge_notes).length;

        return [
          { title: "Patients", value: records.length, subtitle: "Latest patient rows" },
          { title: "Avg Risk", value: avgRisk.toFixed(3), subtitle: "Mean readmission probability" },
          { title: "High Risk", value: highRisk, subtitle: "Tier 3 or 4 style candidates" },
          { title: "Clinical Notes", value: withNotes, subtitle: "Encounters with discharge text" }
        ];
      }}
    />
  );
}
