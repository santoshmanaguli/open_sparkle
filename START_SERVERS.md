# Starting the Development Servers

## Quick Start

From the root directory:

```bash
npm run dev
```

This starts both frontend and backend using Turborepo.

## Individual Servers

### Backend (Port 5000)
```bash
cd apps/backend
npm run dev
```

### Frontend (Port 4000)
```bash
cd apps/frontend
npm run dev
```

## Verify Servers

- **Backend**: http://localhost:5000/health
- **Frontend**: http://localhost:4000

## Troubleshooting

### Backend not starting
- Check if port 5000 is available: `lsof -i :5000`
- Verify `.env` file exists in `apps/backend/`
- Check database is running: `npm run db:up`

### Frontend Internal Server Error
- Ensure backend is running on port 5000
- Check browser console for API errors
- Verify CORS_ORIGIN in backend `.env` matches frontend port (4000)

### Database Connection Issues
- Start database: `npm run db:up`
- Check connection: `npm run db:studio`
