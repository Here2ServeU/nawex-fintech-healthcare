# Course Syllabus

This syllabus maps each week to a separate teaching repo, a core objective, and the code surface students should use.

## 12-Week Map

| Week | Repo directory | Objective | Code surface for the week | Student outcome |
|---|---|---|---|---|
| 1 | `weeks/week-01-system-setup/` | Understand system thinking and local service architecture | `frontend/`, `api-node/`, `ai-service-python/` | Student can explain how the services connect and run health endpoints locally |
| 2 | `weeks/week-02-docker-basics/` | Learn Docker and container lifecycle | `frontend/`, `api-node/`, `ai-service-python/` | Student can build and run service containers |
| 3 | `weeks/week-03-compose-orchestration/` | Orchestrate a full local stack | `frontend/`, `api-node/`, `ai-service-python/`, `database/`, `docker-compose.yml` | Student can run the full stack with one command and explain service communication |
| 4 | `weeks/week-04-terraform-foundations/` | Learn infrastructure as code | `terraform/` | Student can explain Terraform basics and run a plan for VPC and EC2 |
| 5 | `weeks/week-05-fintech-transactions/` | Build the FinTech system layer | `api-node/`, `frontend/`, `database/` | Student can explain transaction flow and build a transaction endpoint |
| 6 | `weeks/week-06-fraud-detection-ai/` | Add FinTech AI | `api-node/`, `ai-service-python/`, `frontend/`, `database/` | Student can connect fraud detection logic to the application flow |
| 7 | `weeks/week-07-healthcare-patient-api/` | Build the Healthcare system layer | `api-node/`, `frontend/`, `database/` | Student can implement and explain a patient workflow API |
| 8 | `weeks/week-08-healthcare-risk-ai/` | Add Healthcare AI | `api-node/`, `ai-service-python/`, `frontend/`, `database/` | Student can connect healthcare risk prediction to the application flow |
| 9 | `weeks/week-09-terraform-eks-kubernetes/` | Deploy infrastructure and workloads | `terraform/`, `kubernetes/` | Student can explain the difference between infrastructure provisioning and workload deployment |
| 10 | `weeks/week-10-observability-monitoring/` | Add production visibility | `monitoring/`, `api-node/`, `ai-service-python/` | Student can show metrics, alerts, and dashboard flow |
| 11 | `weeks/week-11-cicd-security/` | Add CI/CD and secure delivery practices | `.github/`, `terraform/`, `api-node/`, `ai-service-python/`, `frontend/` | Student can explain automated delivery and basic secure deployment flow |
| 12 | `weeks/week-12-capstone-demo/` | Integrate the full system | Full repo contents in that week folder | Student can demo and explain the full AI + DevOps + Cloud platform |

## Phase Breakdown

### Phase 1: Foundation

- Weeks 1-4
- Focus: architecture, containers, orchestration, Terraform basics

### Phase 2: Domain AI

- Weeks 5-8
- Focus: FinTech workflows, fraud AI, Healthcare workflows, healthcare risk AI

### Phase 3: Production

- Weeks 9-12
- Focus: Kubernetes, observability, CI/CD, security, capstone integration

## Why This Syllabus Is Relevant

This course aligns with current AI engineering demand because it teaches students how to:

- build AI-enabled systems, not just isolated models
- integrate backend and AI services
- use Terraform for cloud automation
- deploy with Kubernetes
- operate systems with observability and CI/CD

That combination maps well to roles such as:

- AI engineer
- ML engineer
- applied AI engineer
- MLOps engineer
- cloud engineer
- platform engineer

## Final Project

The final integrated employer-facing project is:

- [../final-project](../final-project/README.md)
