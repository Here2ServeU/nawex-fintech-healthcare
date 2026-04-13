import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import RiskCard from "./RiskCard";
import SearchPanel from "./SearchPanel";
import EventTable from "./EventTable";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function DomainDashboard({
  title,
  subtitle,
  description,
  accent,
  recordPath,
  scorePath,
  scoreLabel,
  samplePayload,
  summaryBuilder
}) {
  const [records, setRecords] = useState([]);
  const [scoreInput, setScoreInput] = useState(JSON.stringify(samplePayload, null, 2));
  const [scoreResult, setScoreResult] = useState(null);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [scoring, setScoring] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRecords() {
      try {
        setLoadingRecords(true);
        const response = await axios.get(`${apiBaseUrl}${recordPath}`);
        if (!cancelled) {
          setRecords(Array.isArray(response.data) ? response.data : []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError("Unable to load records from the Express API.");
        }
      } finally {
        if (!cancelled) {
          setLoadingRecords(false);
        }
      }
    }

    loadRecords();

    return () => {
      cancelled = true;
    };
  }, [recordPath]);

  async function handleScore(event) {
    event.preventDefault();
    try {
      setScoring(true);
      setError("");
      const payload = JSON.parse(scoreInput);
      const response = await axios.post(`${apiBaseUrl}${scorePath}`, payload);
      startTransition(() => {
        setScoreResult(response.data);
      });
    } catch (requestError) {
      setError("Prediction request failed. Validate the JSON payload and confirm the AI service is running.");
    } finally {
      setScoring(false);
    }
  }

  const summary = summaryBuilder(records);

  return (
    <section
      style={{
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(203,213,225,0.9)",
        borderRadius: "30px",
        padding: "1.35rem",
        marginBottom: "1.5rem",
        boxShadow: "0 18px 50px rgba(148,163,184,0.14)"
      }}
    >
      <div style={{ marginBottom: "1rem" }}>
        <div
          style={{
            display: "inline-block",
            background: accent,
            color: "#fff",
            borderRadius: "999px",
            padding: "0.35rem 0.75rem",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "0.7rem"
          }}
        >
          {subtitle}
        </div>
        <h2 style={{ margin: "0 0 0.35rem", fontSize: "2rem" }}>{title}</h2>
        <p style={{ margin: 0, color: "#475569", lineHeight: 1.7, maxWidth: "66ch" }}>{description}</p>
      </div>

      {error ? (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.9rem 1rem",
            borderRadius: "16px",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            color: "#9f1239"
          }}
        >
          {error}
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "0.9rem",
          marginBottom: "1rem"
        }}
      >
        {summary.map((item) => (
          <RiskCard key={item.title} title={item.title} value={item.value} subtitle={item.subtitle} accent={accent} />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "1rem",
          marginBottom: "1rem"
        }}
      >
        <div
          style={{
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "22px",
            padding: "1rem"
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>Sample AI request</div>
          <SearchPanel
            asEditor
            value={scoreInput}
            onChange={(event) => setScoreInput(event.target.value)}
            onSubmit={handleScore}
            placeholder="Paste JSON payload"
            buttonLabel={scoring ? "Scoring..." : `Run ${scoreLabel}`}
            disabled={scoring}
          />
        </div>

        <div
          style={{
            borderRadius: "22px",
            padding: "1rem",
            border: "1px solid rgba(203,213,225,0.9)",
            background: "linear-gradient(180deg, rgba(255,255,255,0.96), rgba(248,250,252,0.96))"
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: "0.75rem" }}>{scoreLabel} response</div>
          <pre
            style={{
              margin: 0,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: "0.86rem",
              lineHeight: 1.6,
              color: "#1e293b"
            }}
          >
            {scoreResult ? JSON.stringify(scoreResult, null, 2) : "Run a sample prediction to see the AI microservice output."}
          </pre>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
        <EventTable
          title={loadingRecords ? "Loading records..." : "Latest records from PostgreSQL"}
          rows={records.slice(0, 8).map((record, index) => normalizeRecordRow(record, index))}
          emptyMessage="No records loaded yet."
        />
      </div>
    </section>
  );
}

function normalizeRecordRow(record, index) {
  return {
    id: record.id || record.encounter_id || `record-${index}`,
    type: record.transaction_type || record.encounter_type || record.primary_diagnosis || "record",
    timestamp: formatTimestamp(record.created_at || record.admission_date || record.discharge_date),
    details: Object.entries(record)
      .filter(([key, value]) => !["id", "created_at"].includes(key) && value !== null && value !== undefined && value !== "")
      .slice(0, 5)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(" | ")
  };
}

function formatTimestamp(value) {
  if (!value) {
    return "n/a";
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}
