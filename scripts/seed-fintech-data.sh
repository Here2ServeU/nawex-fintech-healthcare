#!/usr/bin/env bash
set -euo pipefail

curl -sS -X POST http://localhost:5000/api/fintech/ingest \
  -H "Content-Type: application/json" \
  -d '{
    "transaction_id": "txn-1001",
    "user_id": "user-22",
    "amount": 149.50,
    "currency": "USD",
    "merchant": "CarePay Pharmacy",
    "location": "Chicago"
  }'

echo
