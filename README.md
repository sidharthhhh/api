# Docker Monitoring Stack Setup

This repository contains a complete Docker monitoring stack with Node.js API, Prometheus, Grafana, Loki, and Promtail.

## Quick Start

### Prerequisites
- Docker and Docker Compose installed
- System IP: 10.88.208.38

### 1. Clone and Setup
```bash
# Clone repository
git clone <your-repo-url>
cd api

# Copy environment variables
cp .env.example .env

# Make setup script executable
chmod +x setup-network.sh
```

### 2. Start Services
```bash
# Start all services
docker-compose up -d

# Or start with build
docker-compose up -d --build
```

### 3. Access Services
- **API**: http://10.88.208.38:3000
- **Grafana**: http://10.88.208.38:3001 (admin/admin123)
- **Prometheus**: http://10.88.208.38:9090
- **Node Exporter**: http://10.88.208.38:9100
- **cAdvisor**: http://10.88.208.38:8080

### 4. Stop Services
```bash
docker-compose down
```

## Service Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Node.js API   │    │   Prometheus    │    │     Grafana     │
│   Port: 3000    │◄───┤   Port: 9090    │◄───┤   Port: 3001    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Node Exporter │    │    cAdvisor     │    │      Loki       │
│   Port: 9100    │    │   Port: 8080    │    │   Port: 3100    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Network Configuration

The stack uses a custom Docker network `monitoring-network` with subnet `172.20.0.0/16`:
- API: 172.20.0.2
- Prometheus: 172.20.0.3
- Grafana: 172.20.0.4
- Node Exporter: 172.20.0.5
- cAdvisor: 172.20.0.6
- Loki: 172.20.0.7
- Promtail: 172.20.0.8

## File Structure

```
api/
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── prometheus.yml
├── promtail-config.yml
├── loki-config.yml
├── grafana/
│   └── provisioning/
│       ├── datasources/
│       │   └── datasources.yml
│       └── dashboards/
│           └── dashboards.yml
├── setup-network.sh
└── README.md
```

## Monitoring Endpoints

### API Health Check
```bash
curl http://10.88.208.38:3000/health
```

### Prometheus Metrics
```bash
curl http://10.88.208.38:9090/metrics
```

### Node Exporter Metrics
```bash
curl http://10.88.208.38:9100/metrics
```

## Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 3000, 3001, 9090, 9100, 8080 are available
2. **Permission issues**: Run `chmod +x setup-network.sh` on Unix systems
3. **Docker network issues**: Run `docker network prune` to clean up networks

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f grafana
```

### Reset Everything
```bash
docker-compose down -v
docker system prune -f
./setup-network.sh
docker-compose up -d
```

## Customization

### Adding New Services
Edit `docker-compose.yml` and add new services under the `services` section.

### Environment Variables
Modify `.env` file to change configuration:
- Database connections
- API settings
- Grafana admin password
- Prometheus retention settings

## Security Notes

- Change default Grafana admin password
- Use HTTPS in production
- Configure proper firewall rules
- Use secrets management for sensitive data
