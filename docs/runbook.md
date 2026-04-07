# Runbook

## Local Startup

1. Copy `.env.example` to `.env`
2. Run `docker-compose up --build`
3. Verify the API health endpoint at `http://localhost:5000/api/health`

## Seed Data

Run:

```bash
./scripts/seed-fintech-data.sh
./scripts/seed-healthcare-data.sh
```
