# Docker Setup Guide

This guide explains how to run the Saudi Permit application using Docker Compose.

## Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose v2.0 or higher

## Quick Start

1. **Start all services:**
   ```bash
   docker-compose up -d
   ```

2. **View logs:**
   ```bash
   # All services
   docker-compose logs -f
   
   # Specific service
   docker-compose logs -f backend
   docker-compose logs -f frontend
   docker-compose logs -f db
   ```

3. **Stop all services:**
   ```bash
   docker-compose down
   ```

4. **Stop and remove volumes (clean slate):**
   ```bash
   docker-compose down -v
   ```

## Services

The application consists of three services:

### Database (PostgreSQL with PostGIS)
- **Container Name:** saudi_permit.db
- **Port:** 15433 (host) → 5432 (container)
- **Credentials:**
  - User: root
  - Password: click123
  - Database: saudi_permit

### Backend (NestJS)
- **Container Name:** saudi_permit.backend
- **Port:** 3001
- **API Docs:** http://localhost:3001/api (Swagger UI)
- **Features:**
  - Automatic database migration on startup
  - JWT authentication
  - RESTful API

### Frontend (Nuxt 3)
- **Container Name:** saudi_permit.frontend
- **Port:** 3000
- **URL:** http://localhost:3000
- **Features:**
  - Modern Vue 3 application
  - Server-side rendering
  - Connects to backend API

## Development Workflow

### Rebuild after code changes:
```bash
# Rebuild specific service
docker-compose up -d --build backend

# Rebuild all services
docker-compose up -d --build
```

### Access container shell:
```bash
# Backend
docker exec -it saudi_permit.backend sh

# Frontend
docker exec -it saudi_permit.frontend sh

# Database
docker exec -it saudi_permit.db bash
```

### Database operations:
```bash
# Run Prisma migrations
docker exec -it saudi_permit.backend sh -c "pnpm exec prisma migrate deploy"

# Generate Prisma client
docker exec -it saudi_permit.backend sh -c "pnpm exec prisma generate"

# Access PostgreSQL
docker exec -it saudi_permit.db psql -U root -d saudi_permit
```

## Environment Variables

### Backend
- `PORT`: API server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `JWT_EXPIRES_IN`: JWT expiration time in seconds

### Frontend
- `NUXT_PUBLIC_BACKEND_URL`: Backend API URL
- `NODE_ENV`: Node environment (production/development)

## Troubleshooting

### Port conflicts
If ports 3000, 3001, or 15433 are already in use, update the port mappings in `docker-compose.yaml`:
```yaml
ports:
  - "<new-host-port>:<container-port>"
```

### Database connection issues
Ensure the database is healthy before the backend starts:
```bash
docker-compose ps
```
All services should show "healthy" or "running" status.

### Container logs
Check logs for specific errors:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

### Reset everything
To start fresh:
```bash
# Stop all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images (optional)
docker rmi saudi_permit-backend saudi_permit-frontend

# Rebuild and start
docker-compose up -d --build
```

## Production Considerations

For production deployment:

1. Update environment variables in docker-compose.yaml or use a `.env` file
2. Use secure passwords and JWT secrets
3. Enable SSL/TLS for database connections
4. Consider using a reverse proxy (nginx) for SSL termination
5. Set up proper backup strategies for the database volume
6. Implement container monitoring and logging solutions

## Network Architecture

All services communicate through a custom bridge network (`saudi_permit_network`):
- Frontend → Backend: `http://backend:3001`
- Backend → Database: `postgresql://root:click123@db:5432/saudi_permit`

This allows services to communicate using container names as hostnames.

