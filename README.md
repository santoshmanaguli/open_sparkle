# Open Sparkle ERP

A modern ERP system built with Next.js, TypeScript, Express, and PostgreSQL.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Shadcn UI
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT
- **Monorepo**: Turborepo

## Project Structure

```
open-sparkle/
├── apps/
│   ├── frontend/     # Next.js application
│   └── backend/      # Express API server
├── packages/
│   └── shared/       # Shared types and utilities
└── package.json
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- PostgreSQL
- npm or yarn

### Installation

```bash
npm install
```

### Environment Setup

1. Copy `.env.example` files in both `apps/frontend` and `apps/backend`
2. Configure your database connection and JWT secret

### Development

```bash
# Run all apps in development mode
npm run dev

# Run specific app
npm run dev --workspace=apps/frontend
npm run dev --workspace=apps/backend
```

### Build

```bash
npm run build
```

## Modules

The application will be developed module by module, following the business flow of SparkleERP:

1. Authentication & User Management
2. Client Onboarding
3. Product Master
4. Inventory Management
5. Purchase Management
6. Invoice Management
7. Order Management
8. Transaction Management
9. Reports
10. Settings & Configuration
