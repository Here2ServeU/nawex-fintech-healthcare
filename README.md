# NERP FinTech & Healthcare Data Platform

A production-style course repository built on the NERP vision for FinTech and Healthcare systems.

Author: Emmanuel Naweji

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

## Services

- API: `http://localhost:5000`
- Dashboard: `http://localhost:3000`
- OpenSearch: `http://localhost:9200`
- MongoDB: `mongodb://localhost:27017`
- Kafka: `localhost:9092`

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
