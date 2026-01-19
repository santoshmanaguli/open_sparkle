# Database Setup Guide

## Option 1: Using Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed

### Steps

1. **Start PostgreSQL container:**
```bash
docker compose up -d postgres
# or use npm script: npm run db:up
```

2. **Verify container is running:**
```bash
docker ps
```

3. **Check logs if needed:**
```bash
docker compose logs postgres
# or use npm script: npm run db:logs
```

4. **Configure backend `.env` file:**
   - Copy `apps/backend/.env.example` to `apps/backend/.env`
   - The DATABASE_URL is configured for Docker (using port 5433 to avoid conflicts):
   ```env
   DATABASE_URL="postgresql://sparkle_user:sparkle_password@localhost:5433/open_sparkle?schema=public"
   ```
   - **Note:** Port 5433 is used if port 5432 is already in use. See [DOCKER_PORT.md](./DOCKER_PORT.md) for details.

5. **Run Prisma migrations:**
```bash
cd apps/backend
npm run db:generate
npm run db:migrate
```

6. **Optional: Open Prisma Studio to view data:**
```bash
npm run db:studio
```

### Stop Database
```bash
docker compose down
# or use npm script: npm run db:down
```

### Remove Database (WARNING: Deletes all data)
```bash
docker compose down -v
```

---

## Option 2: Local PostgreSQL Installation

### Prerequisites
- PostgreSQL installed locally (version 14+)

### Steps

1. **Create database:**
```bash
createdb open_sparkle
```

Or using psql:
```bash
psql -U postgres
CREATE DATABASE open_sparkle;
\q
```

2. **Configure backend `.env` file:**
   - Copy `apps/backend/.env.example` to `apps/backend/.env`
   - Update DATABASE_URL with your credentials:
   ```env
   DATABASE_URL="postgresql://your_username:your_password@localhost:5432/open_sparkle?schema=public"
   ```

3. **Run Prisma migrations:**
```bash
cd apps/backend
npm run db:generate
npm run db:migrate
```

---

## Connection Testing

### Using psql
```bash
psql -U sparkle_user -d open_sparkle -h localhost
# Password: sparkle_password
```

### Using Prisma Studio
```bash
cd apps/backend
npm run db:studio
```
Opens at http://localhost:5555

---

## Troubleshooting

### Docker Issues
- **Port 5432 already in use:** Stop local PostgreSQL or change port in docker-compose.yml
- **Container won't start:** Check logs with `docker compose logs postgres` or `npm run db:logs`
- **Connection refused:** Ensure container is running with `docker ps`
- **docker-compose not found:** Use `docker compose` (space, not hyphen) or install docker-compose standalone

### Local PostgreSQL Issues
- **Authentication failed:** Check username/password in DATABASE_URL
- **Database doesn't exist:** Create it with `createdb open_sparkle`
- **Connection refused:** Ensure PostgreSQL service is running
