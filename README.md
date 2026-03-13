# Optimization — PISL Infra Backend

> Load testing and performance optimization suite for PISL Infra backend services, powered by **k6** and visualized with **Grafana** on cloud infrastructure.

---

## Overview

This repository contains the backend load testing framework for the PISL Infra platform. It simulates real-world traffic against API routes to identify bottlenecks, measure throughput, and validate system scalability under stress — with results streamed live to a Grafana cloud dashboard.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Load Testing | k6 |
| Monitoring & Visualization | Grafana (Cloud) |
| Backend Routes | Node.js / JavaScript |
| Test Runner Script | PowerShell (`run-all-k6.ps1`) |
| Languages | JavaScript · HTML · PowerShell |

---

## Repository Structure

```
Optimization-PISL-Infra-Backend/
├── public/             # Static assets / HTML reports
├── routes/             # Backend API route definitions
├── test/               # k6 load test scripts
├── run-all-k6.ps1      # PowerShell script to execute all k6 tests
└── .hintrc             # Linting configuration
```

---

## Getting Started

### Prerequisites

- [k6](https://k6.io/docs/getting-started/installation/) installed on your machine
- Node.js (for running backend routes locally)
- Grafana Cloud account with k6 output configured

### Run All Tests

```powershell
# Windows (PowerShell)
./run-all-k6.ps1
```

### Run a Single Test

```bash
k6 run test/<test-file>.js
```

### Stream Results to Grafana Cloud

```bash
k6 run --out cloud test/<test-file>.js
```

---

## What's Being Tested

- **API route load** — concurrent user simulation across backend endpoints
- **Throughput & latency** — requests/sec, response time percentiles (p90, p95, p99)
- **Error rates** — tracking 4xx/5xx responses under load
- **Scalability thresholds** — validating system behavior at peak traffic

---

## Grafana Dashboard

Test results are pushed to a Grafana Cloud dashboard for real-time visualization of:
- Virtual users (VUs) over time
- Request duration trends
- Pass/fail thresholds
- Error rate breakdown

---

## Author

**Gyana Prakash Khandual** — SDET  
[GitHub](https://github.com/GyanaprakashKhandual) · [Portfolio](https://gyanprakash.vercel.app)
