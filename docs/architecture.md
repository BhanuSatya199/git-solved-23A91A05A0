# System Architecture

## Overview
DevOps Simulator follows a microservices architecture designed for high availability and scalability.  
This document describes the **production architecture** first, then the **development** setup, and finally a clearly labeled **experimental** section for research features.

---

## Production (Primary)

### Components

#### 1. Application Server
- **Technology**: Node.js + Express  
- **Port**: 8080  
- **Scaling**: Horizontal auto-scaling enabled (production only)

#### 2. Database Layer
- **Database**: PostgreSQL 14  
- **Configuration**: Master-slave replication  
- **Backup**: Daily automated backups

#### 3. Monitoring System
- **Tool**: Prometheus + Grafana  
- **Metrics**: CPU, Memory, Disk, Network  
- **Alerts**: Email notifications for critical issues

### Deployment Strategy
- **Method**: Rolling updates  
- **Zero-downtime**: Yes  
- **Rollback**: Automated on failure

### Security (Production)
- SSL/TLS encryption  
- Encrypted database connections  
- Regular security audits and strict access control

---

## Development (Separate – not production)

> Use these settings for local development, testing and debugging. These settings are intentionally relaxed and **must not** be used in production.

### Components

#### 1. Application Server
- **Technology**: Node.js + Express (with hot reload)  
- **Port**: 3000 (development)  
- **Scaling**: Manual — single instance for dev  
- **Debug**: Chrome DevTools on port 9229

#### 2. Database Layer
- **Database**: PostgreSQL 14 (local)  
- **Configuration**: Single instance (no replication)  
- **Backup**: Manual  
- **Seeding**: Auto-seed with test data on startup

#### 3. Monitoring System
- **Primary**: Console logging (lightweight)  
- **Optional**: Prometheus for integration tests  
- **Metrics**: CPU, Memory, Disk, Network, Build time

#### 4. Container Orchestration (local)
- **Tool**: Docker Compose  
- **Services**: App, Database, Redis  
- **Volume mounts**: Code directory for hot reload

#### 5. Authentication (Dev/Beta)
- **Method**: OAuth2 + JWT (testing)  
- **Providers**: Google, GitHub (test accounts)  
- **Sessions**: Redis session store (dev config)

### Dev Deployment
- **Method**: `docker-compose up` or `npm run dev` (hot reload)  
- **Rollback**: `git checkout` previous commit

### Security (Dev)
- SSL/TLS typically disabled locally  
- Credentials stored in `.env` locally (do not commit)  
- CORS may be permissive for testing

---

## Experimental / Research (CLEARLY LABELED)
> **WARNING:** Experimental features are research-stage and not production-ready.

### Examples of experimental features
- Multi-cloud orchestration prototypes  
- AI/ML-assisted log analysis and anomaly detection  
- Automatic rollback heuristics using ML signals  
- Event-driven microservices with advanced orchestration

**Note:** keep these features behind feature flags or in separate branches until fully validated.

---

## Observability & Metrics
- **Production**: Prometheus + Grafana + alerting rules  
- **Development**: Console logs and optional Prometheus for tests

---

## Guidance & Best Practices
- Keep **production** as the default in CI/CD and deploy pipelines.  
- Enable development features via `NODE_ENV=development` or explicit configuration profiles.  
- Document experimental features and guard them with flags.  
- Always test rollback and backup procedures before promoting changes from dev to production.
