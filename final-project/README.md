# AI-Powered DevOps Reliability Platform (NERP Lite)

A flagship, portfolio-grade project that combines AI, DevOps, cloud infrastructure, Terraform, Kubernetes, and domain AI extensions.

This README is the project entry point for capstone, portfolio, and employer-facing use.

## Mentor Background

By way of background, I currently operate in DevOps and cloud engineering, and I am also a PhD researcher focused on AI, machine learning, and robotics applied to highly regulated environments. In addition, I have worked with clients for over 10 years on technology and transformation initiatives. This mentorship combines that perspective with practical, real-world execution.

This project is designed to be:

- a mini SaaS
- a 12-week teaching vehicle
- a portfolio differentiator
- a consulting-ready demo system

## Product Vision

NERP Lite collects system data, predicts failures using AI, detects log anomalies, and provides a deployable cloud-native platform with Terraform, Kubernetes, and CI/CD.

Core flow:

```text
User -> Web UI -> Node API -> Python AI Service -> Model Prediction
                              ↓
                        Logs and Metrics
                              ↓
                      Monitoring Stack
                              ↓
                     Alerts and Dashboard
```

Infrastructure flow:

```text
Terraform -> AWS (VPC, EKS, ECR)
Kubernetes -> Deploy Services
GitHub Actions -> CI/CD
```

## Flagship Repo Structure

```text
frontend/
api-node/
ai-service-python/
monitoring/
infrastructure/
  terraform/
kubernetes/
  deployments/
  services/
.github/workflows/
README.md
```

## Core Components

### `frontend/`

React dashboard for:

- reliability telemetry
- AI incident predictions
- FinTech fraud simulation
- Healthcare risk simulation

### `api-node/`

Node.js application layer for:

- incoming requests
- reliability endpoints
- domain APIs
- communication with the AI service

### `ai-service-python/`

FastAPI AI service for:

- incident prediction
- log anomaly detection
- fraud detection
- patient risk prediction

### `monitoring/`

Prometheus and Grafana starter assets for:

- metrics scraping
- alerts
- operational dashboards

### `infrastructure/terraform/`

Terraform modules aligned to the teaching path:

- Week 4: VPC + EC2
- Weeks 9-10: VPC + EKS
- extension path for ECR and production delivery

### `kubernetes/`

Kubernetes manifests for workloads and services.

## 12-Week Mapping

### Weeks 1-4

Build the local system:

- frontend
- api-node
- ai-service-python
- Docker
- Docker Compose
- Terraform introduction

### Weeks 5-6

Add FinTech AI:

- transaction simulation
- fraud detection

### Weeks 7-8

Add Healthcare AI:

- patient simulation
- risk prediction

### Weeks 9-10

Cloud delivery:

- Terraform VPC
- Terraform EKS
- Kubernetes deployment

### Week 11

Production workflow:

- GitHub Actions
- secure pipeline patterns
- deployment automation

### Week 12

Capstone demo:

- upload metrics or logs
- receive AI risk insights
- show dashboard
- explain cloud deployment

## Local Run

```bash
cp .env.example .env
docker compose up --build
```

Initialize demo data:

```bash
cd api-node
npm install
npm run db:migrate
npm run db:seed
```

Open:

- Frontend: `http://localhost:3000`
- Node API: `http://localhost:5000/api/health`
- Python AI service: `http://localhost:8000/health`
- Prometheus: `http://localhost:9090`
- Grafana: `http://localhost:3001`

## Interview-Ready Statement

> I built an AI-powered DevOps platform that predicts system failures, detects anomalies, integrates domain AI for FinTech and Healthcare, and deploys to AWS using Terraform and Kubernetes with CI/CD automation.

## Notes

- The new top-level product path is the canonical path for students and employers.
- Older folders remain in the repository as transitional material but are no longer the primary project path.
