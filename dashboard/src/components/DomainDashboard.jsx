import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import RiskCard from "./RiskCard";
import SearchPanel from "./SearchPanel";
import EventTable from "./EventTable";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || `http://localhost:${process.env.REACT_APP_API_PORT || "5001"}`;

export default function DomainDashboard({
  title,
  description,
  accent,
  recordPath,
  searchPath,
  searchPlaceholder,
  summaryBuilder
}) {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRows, setSearchRows] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadRecords() {
      try {
        setLoadingRecords(true);
        setError("");

        const response = await axios.get(`${apiBaseUrl}${recordPath}`);

        if (!cancelled) {
          setRecords(Array.isArray(response.data) ? response.data : []);
        }
      } catch (requestError) {
        if (!cancelled) {
          setError("Unable to load records from the API.");
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

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      setSearchRows([]);
      return;
    }

    try {
      setSearching(true);
      setError("");

      const response = await axios.get(`${apiBaseUrl}${searchPath}`, {
        params: { q: trimmedQuery }
      });

      const hits = response.data?.hits?.hits || [];
      const normalizedResults = hits.map((hit, index) =>
        normalizeSearchRow(hit._source || {}, hit._id || `search-${index}`)
      );

      startTransition(() => {
        setSearchRows(normalizedResults);
      });
    } catch (requestError) {
      setError("Search failed. Check that OpenSearch indexing is working.");
    } finally {
      setSearching(false);
    }
  }

  const recentRows = records.slice(0, 5).map((record, index) => normalizeRecordRow(record, index));
  const summary = summaryBuilder(records);

  return (
    <section
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(244,247,251,0.96))",
        border: "1px solid #dbe3ef",
        borderRadius: "28px",
        padding: "1.4rem",
        marginBottom: "1.5rem"
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
            fontSize: "0.8rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            marginBottom: "0.8rem"
          }}
        >
          {title}
        </div>
        <h2 style={{ margin: "0 0 0.4rem", color: "#0f172a", fontSize: "1.8rem" }}>{title}</h2>
        <p style={{ margin: 0, color: "#475569", maxWidth: "62ch", lineHeight: 1.6 }}>{description}</p>
      </div>

      {error ? (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.9rem 1rem",
            background: "#fff1f2",
            border: "1px solid #fecdd3",
            borderRadius: "14px",
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
          <RiskCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            accent={accent}
          />
        ))}
      </div>

      <div
        style={{
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          padding: "1rem",
          marginBottom: "1rem"
        }}
      >
        <div style={{ marginBottom: "0.75rem", fontWeight: 700, color: "#0f172a" }}>OpenSearch query</div>
        <SearchPanel
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onSubmit={handleSearch}
          placeholder={searchPlaceholder}
          buttonLabel={searching ? "Searching..." : "Search"}
          disabled={searching}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1rem"
        }}
      >
        <EventTable
          title={loadingRecords ? "Recent records loading..." : "Recent records from the API"}
          rows={recentRows}
          emptyMessage="No records have been loaded into MongoDB yet."
        />
        <EventTable
          title="OpenSearch results"
          rows={searchRows}
          emptyMessage="Run a search to view indexed fintech or healthcare events."
        />
      </div>
    </section>
  );
}

function normalizeRecordRow(record, index) {
  return {
    id:
      record.transaction_id ||
      record.patient_id ||
      record.encounter_id ||
      record._id ||
      `record-${index}`,
    type: record.type || record.event_type || record.domain || "event",
    timestamp: formatTimestamp(record.timestamp),
    details: buildDetails(record)
  };
}

function normalizeSearchRow(source, fallbackId) {
  return {
    id: source.transaction_id || source.patient_id || source.encounter_id || fallbackId,
    type: source.type || source.event_type || source.domain || "search-hit",
    timestamp: formatTimestamp(source.timestamp),
    details: buildDetails(source)
  };
}

function buildDetails(record) {
  return [
    record.user_id && `user ${record.user_id}`,
    record.amount !== undefined && `amount ${record.amount} ${record.currency || ""}`.trim(),
    record.merchant && `merchant ${record.merchant}`,
    record.location && `location ${record.location}`,
    record.department && `department ${record.department}`,
    record.severity && `severity ${record.severity}`,
    record.event_type && `event ${record.event_type}`
  ]
    .filter(Boolean)
    .join(" | ");
}

function formatTimestamp(value) {
  if (!value) {
    return "n/a";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString();
}
