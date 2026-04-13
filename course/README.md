# AI + DevOps + Cloud + Terraform Course

This folder is the teaching container for the full program.

The course is organized around separate weekly repos so mentees only touch the code surface needed for that week. That reduces confusion, keeps the learning path focused, and makes each week feel like a manageable project instead of one giant monorepo.

This README is the teaching entry point.

## Mentor Background

By way of background, I currently operate in DevOps and cloud engineering, and I am also a PhD researcher focused on AI, machine learning, and robotics applied to highly regulated environments. In addition, I have worked with clients for over 10 years on technology and transformation initiatives. This mentorship combines that perspective with practical, real-world execution.

## Why This Course Matters

This course is designed around the skills that are in demand for modern AI engineering roles:

- building AI-enabled products, not just notebooks
- connecting frontend, backend, and AI services
- containerizing applications with Docker
- orchestrating systems with Docker Compose and Kubernetes
- provisioning infrastructure with Terraform
- adding observability, CI/CD, and secure delivery practices

The market increasingly rewards engineers who can ship AI into real systems. This course is built for that outcome.

## What Students Learn

By the end of the course, students should be able to:

- explain a multi-service AI system end to end
- build and run local application stacks
- connect Node.js and Python services
- add domain AI workflows for FinTech and Healthcare
- provision AWS infrastructure with Terraform
- deploy workloads with Kubernetes
- add monitoring and CI/CD
- present a flagship portfolio project credibly

## Teaching Model

Use one weekly repo at a time.

Do not teach from the entire repository at once.

Each week folder under `weeks/` contains only the code needed for that week’s learning objective.

## Course Structure

- `weeks/`
  One repo-sized directory per teaching week
- `SYLLABUS.md`
  Week-by-week learning map

The final employer-facing project lives outside this folder at:

- [../final-project](../final-project/README.md)

## Weekly Repo Sequence

1. `week-01-system-setup`
2. `week-02-docker-basics`
3. `week-03-compose-orchestration`
4. `week-04-terraform-foundations`
5. `week-05-fintech-transactions`
6. `week-06-fraud-detection-ai`
7. `week-07-healthcare-patient-api`
8. `week-08-healthcare-risk-ai`
9. `week-09-terraform-eks-kubernetes`
10. `week-10-observability-monitoring`
11. `week-11-cicd-security`
12. `week-12-capstone-demo`

## Recommended Delivery

For each week:

- teach one core concept
- build one feature
- run one demo
- require one Git commit
- ask the student to explain the system back to you

## Best Use Of The Final Project

Use the weekly repos for instruction.

Use [../final-project](../final-project/README.md) for:

- capstone integration
- portfolio packaging
- final demos
- interview storytelling
