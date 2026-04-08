# NERP FinTech & Healthcare Data Platform

A production-style course repository built on the NERP vision for FinTech and Healthcare systems.

Author: Emmanuel Naweji

Bio: This platform is a combination of Emmanuel Naweji's PhD research and professional work experience, bringing together academic research depth and enterprise implementation patterns for FinTech and Healthcare systems.

This platform demonstrates a layered architecture for modern regulated workloads:

- Ingestion Layer -> Kafka
- Processing Layer -> Kafka Streams / Apache Flink
- Flexible Storage Layer -> MongoDB
- Analytics Layer -> OpenSearch
- Access Layer -> Node.js + Express APIs
- Visualization Layer -> React dashboards

## Core Use Cases

### FinTech

- Real-time transaction ingestion
- Fraud signal enrichment
- Searchable transaction analytics
- Risk dashboards

### Healthcare

- Patient event ingestion
- Clinical event stream processing
- Flexible encounter storage
- Search and analytics for operational insights

## Architecture

```text
Applications / Services
        ↓
      Kafka
        ↓
Kafka Streams / Flink
        ↓
MongoDB + OpenSearch
        ↓
 Express APIs
        ↓
 React Dashboards
```

## Tech Stack

- Node.js
- Express
- React
- Kafka
- Kafka Streams
- Apache Flink
- MongoDB
- OpenSearch
- Docker Compose
- Kubernetes
- Terraform
- GitHub Actions

## Quick Start

```bash
cp .env.example .env
docker-compose up --build
```

If you already have an older `.env`, update `KAFKA_BROKER` to `kafka:29092` so the API container uses the internal Kafka listener.
If port `5000` is already in use on your machine, set `HOST_API_PORT=5001` or another open port in `.env`.
OpenSearch 2.12 and later also requires `OPENSEARCH_INITIAL_ADMIN_PASSWORD` in `.env` for the container to start. Use a value with at least one uppercase letter, one lowercase letter, one digit, and one special character, and do not use a password similar to `admin`, or the container will exit during boot validation.

## Run The Integrated Dashboard

Use the steps below to get the React dashboard working with both FinTech and Healthcare data.

### 1. Create the environment file

```bash
cp .env.example .env
```

Confirm `.env` includes:

- `KAFKA_BROKER=kafka:29092`
- `OPENSEARCH_NODE=https://opensearch:9200`
- A valid `OPENSEARCH_INITIAL_ADMIN_PASSWORD`

### 2. Start the local platform

```bash
docker compose up --build
```

Wait until `api`, `dashboard`, `opensearch`, `dashboards`, `mongodb`, `kafka`, and `zookeeper` are running.

### 3. Verify the API is healthy

```bash
curl http://localhost:5001/api/health
```

Expected result:

```json
{"status":"ok","service":"nerp-api"}
```

### 4. Verify OpenSearch is reachable

```bash
source .env
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200
```

Expected result:

- JSON response containing OpenSearch cluster information

### 5. Seed FinTech and Healthcare sample events

```bash
./scripts/seed-fintech-data.sh
./scripts/seed-healthcare-data.sh
```

Expected result:

- Each script returns a `202` response with a published event payload

### 6. Open the integrated React dashboard

Open:

```text
http://localhost:3000
```

Expected result:

- A single page with both the `FinTech Intelligence` and `Healthcare Operations` sections
- Recent records loaded from the API
- Search boxes for OpenSearch-backed queries in each domain

### 7. Run domain searches from the UI

Try searches such as:

- FinTech: merchant names, user IDs, transaction IDs, locations
- Healthcare: patient IDs, encounter IDs, departments, severity values

The integrated dashboard uses:

- `GET /api/fintech/records`
- `GET /api/fintech/search?q=...`
- `GET /api/healthcare/records`
- `GET /api/healthcare/search?q=...`

### 8. Optional: open OpenSearch Dashboards separately

Open:

```text
http://localhost:5601
```

This is separate from the React dashboard. The React dashboard at `http://localhost:3000` is the integrated app view for both domains.

### 9. Optional: install the OpenSearch template demo

This project includes a composable OpenSearch index template demo for both domains. It installs shared component templates, domain index templates, and Dashboards index patterns automatically.

Run:

```bash
./scripts/setup-opensearch-dashboards.sh
```

This creates:

- component templates for common, fintech, and healthcare fields
- index templates for `fintech-transactions*` and `healthcare-events*`
- Dashboards index patterns for both indexes

See [storage/opensearch/dashboards.md](/Users/emmanuelnaweji/nerp-fintech-healthcare/storage/opensearch/dashboards.md) for the full demo details.

## Cleanup

```bash
make down
make clean
```

`make down` stops the local stack.

`make clean` stops the stack and removes local Docker volumes and orphaned containers. This deletes persisted MongoDB and OpenSearch data created by the project.

## Services

- API: `http://localhost:5001` by default, or `http://localhost:${HOST_API_PORT}`
- Dashboard: `http://localhost:3000`
- OpenSearch API: `https://localhost:9200`
- OpenSearch Dashboards: `http://localhost:5601`
- MongoDB: `mongodb://localhost:27017`
- Kafka from host: `localhost:9092`
- Kafka from containers: `kafka:29092`

## Validate The Platform

After the stack starts, validate each layer with the checks below.

### 1. Confirm containers are running

```bash
docker compose ps
```

Expected result:

- `api` is up
- `dashboard` is up
- `kafka` is up
- `mongodb` is up
- `opensearch` is up
- `dashboards` is up

### 2. Validate the API

```bash
curl http://localhost:5001/api/health
```

Expected result:

```json
{"status":"ok","service":"nerp-api"}
```

### 3. Validate the React dashboard

Open:

```text
http://localhost:3000
```

Expected result:

- The NERP dashboard loads in the browser

### 4. Validate OpenSearch

OpenSearch runs on HTTPS with authentication. Do not use `http://localhost:9200` in the browser.

```bash
source .env
curl -k -u "admin:$OPENSEARCH_INITIAL_ADMIN_PASSWORD" https://localhost:9200
```

Expected result:

- JSON response containing OpenSearch cluster information

### 5. Validate OpenSearch Dashboards

Open:

```text
http://localhost:5601
```

Expected result:

- OpenSearch Dashboards login or application screen loads

### 6. Validate sample ingestion

Seed both domains:

```bash
./scripts/seed-fintech-data.sh
./scripts/seed-healthcare-data.sh
```

Expected result:

- Each script returns a `202` response with a published event payload

You can also test the ingestion endpoints directly:

```bash
curl -X POST http://localhost:5001/api/fintech/ingest \
  -H "Content-Type: application/json" \
  -d '{"transaction_id":"txn-1002","user_id":"user-42","amount":210.75,"currency":"USD","merchant":"Northwind Health","location":"Dallas"}'
```

```bash
curl -X POST http://localhost:5001/api/healthcare/ingest \
  -H "Content-Type: application/json" \
  -d '{"patient_id":"patient-3002","encounter_id":"enc-144","event_type":"lab_result","severity":"low","department":"oncology"}'
```

### 7. Troubleshooting checks

If the API does not start:

- Confirm `HOST_API_PORT` is not already in use
- Confirm `.env` contains `KAFKA_BROKER=kafka:29092`

If OpenSearch does not start:

- Confirm `.env` contains `OPENSEARCH_INITIAL_ADMIN_PASSWORD`
- Confirm the password includes uppercase, lowercase, digit, and special characters, and is not similar to `admin`
- Use `https://localhost:9200`, not `http://localhost:9200`

If Dashboards logs show `getaddrinfo ENOTFOUND opensearch`:

- Check `docker compose logs opensearch --tail=100`
- If OpenSearch reports password validation failure, update `OPENSEARCH_INITIAL_ADMIN_PASSWORD` in `.env`
- Restart the affected services with `docker compose up -d opensearch dashboards`

If Dashboards cannot resolve OpenSearch:

- Run `docker compose ps` and confirm the `opensearch` service is up
- Check `docker compose logs opensearch --tail=100`

## Course Goal

This repository is designed to help students learn how to build enterprise-style systems for:

- FinTech
- Healthcare
- AI/ML integration
- Observability
- Compliance-minded engineering
- Platform thinking

## Future Enhancements

- Fraud detection microservice
- Patient readmission risk service
- OpenSearch dashboards
- Prometheus + Grafana
- MLflow integration
- ArgoCD deployment
