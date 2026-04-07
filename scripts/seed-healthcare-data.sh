#!/usr/bin/env bash
set -euo pipefail

curl -sS -X POST http://localhost:5000/api/healthcare/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "patient_id": "patient-2001",
    "encounter_id": "enc-88",
    "event_type": "admission",
    "severity": "medium",
    "department": "cardiology"
  }'

echo
