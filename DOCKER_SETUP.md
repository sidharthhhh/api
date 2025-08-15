# Docker Configuration Setup Guide

This guide will help you set up and run the application with Docker and all monitoring services.

## Prerequisites

- Docker and Docker Compose installed
- Git (for cloning the repository)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api
   ```

2. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

3. **Build and start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the services**
   - API: http://localhost:3000
   - Prometheus: http://localhost:9090
   - Grafana: http://localhost:3001 (admin/admin123)
   - Loki: http://localhost:3100
   - cAdvisor: http://localhost:8080
   - Node Exporter: http://localhost:9100

## Service Overview

| Service | Port | Description |
|---------|------|-------------|
| API | 3000 | Node.js Express API |
| Prometheus | 9090 | Metrics collection |
| Grafana | 3001 | Monitoring dashboards |
| Loki | 3100 | Log aggregation |
| Promtail | - | Log collection agent |
| Node Exporter | 9100 | System metrics |
| cAdvisor | 8080 | Container metrics |

## Health Checks

All services include health checks:
- **API**: http://localhost:3000/health
- **Prometheus**: http://localhost:9090/-/healthy
- **Grafana**: http://localhost:3001/api/health

## Troubleshooting

### Common Issues and Solutions

1. **Port already in use**
   - Change ports in docker-compose.yml
   - Stop conflicting services

2. **Permission denied on logs directory**
   ```bash
   chmod -R 755 ./logs
   ```

3. **Docker build fails**
   - Ensure all files are present
   - Check Dockerfile syntax
   - Clear Docker cache: `docker system prune -a`

4. **Services not starting**
   - Check logs: `docker-compose logs [service-name]`
   - Verify .env file configuration

5. **Network conflicts**
   - Change subnet in docker-compose.yml networks section

### Useful Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Rebuild specific service
docker-compose build [service-name]

# Scale services
docker-compose up -d --scale api=3

# Clean up
docker-compose down -v
```

## Monitoring Setup

### Grafana Dashboards

1. Access Grafana at http://localhost:3001
2. Login with admin/admin123
3. Import dashboards:
   - Node.js Application Metrics
   - System Overview
   - Docker Container Metrics

### Log Aggregation

Logs are automatically collected by Promtail and sent to Loki. You can:
- View logs in Grafana Explore
- Create log-based alerts
- Search and filter logs by labels

## Development Mode

For development with hot reload:

```bash
# Use development compose file
docker-compose -f docker-compose.dev.yml up

# Or run locally
npm install
npm run dev
```

## Production Deployment

1. Update environment variables
2. Configure SSL certificates
3. Set up reverse proxy (nginx/traefik)
4. Configure backup strategies
5. Set up monitoring alerts
