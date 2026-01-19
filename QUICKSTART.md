# Quick Start Guide

## 🚀 Get Up and Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Database (Docker)
```bash
npm run db:up
```

### 3. Configure Environment

**Backend:**
```bash
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env if needed (defaults work with Docker)
```

**Frontend:**
```bash
# Create apps/frontend/.env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > apps/frontend/.env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:4000" >> apps/frontend/.env.local
```

### 4. Setup Database Schema
```bash
cd apps/backend
npm run db:generate
npm run db:migrate
```

### 5. Start Development Servers
```bash
# From root directory
npm run dev
```

This starts:
- Frontend: http://localhost:4000
- Backend: http://localhost:5000

## 📚 Additional Resources

- **Database Setup Details**: See [DATABASE_SETUP.md](./DATABASE_SETUP.md)
- **Full Setup Guide**: See [SETUP.md](./SETUP.md)
- **Authentication Strategy**: See [AUTHENTICATION.md](./AUTHENTICATION.md)

## 🐳 Docker Commands

```bash
# Start database
npm run db:up

# Stop database
npm run db:down

# View logs
npm run db:logs

# Open Prisma Studio (database GUI)
npm run db:studio
```

## ✅ Verify Setup

1. **Database**: Check if PostgreSQL is running
   ```bash
   docker ps
   # Should see: open-sparkle-db
   ```

2. **Backend**: Visit http://localhost:5000/health
   ```json
   {"status":"ok","message":"Open Sparkle ERP API"}
   ```

3. **Frontend**: Visit http://localhost:4000
   - Should see "Open Sparkle ERP" homepage

## 🔧 Troubleshooting

**Port 5432 already in use?**
- Stop local PostgreSQL: `sudo service postgresql stop`
- Or change port in `docker-compose.yml`

**docker-compose not found?**
- Use `docker compose` (space, not hyphen) - this is the newer Docker CLI syntax
- Or install docker-compose standalone: `sudo apt-get install docker-compose`

**Database connection errors?**
- Ensure Docker container is running: `docker ps`
- Check `.env` file has correct DATABASE_URL
- Verify credentials match docker-compose.yml

**Module not found errors?**
- Run `npm install` from root directory
- Ensure workspaces are properly linked
