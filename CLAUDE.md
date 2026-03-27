# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AALMA is a web application with a NestJS backend and Next.js frontend for managing organizational questionnaires, analysis, and action plans. It features role-based access control, OAuth authentication, and activity logging.

## Development Commands

### Backend (`back/`)
```bash
npm run start:dev          # Dev server with watch (port 3000)
npm run build              # Compile TypeScript
npm run test               # Run Jest unit tests
npm run test:watch         # Tests in watch mode
npm run test:e2e           # End-to-end tests
npm run lint               # ESLint fix
npm run format             # Prettier format
```

### Frontend (`front/`)
```bash
npm run dev                # Dev server (port 3001)
npm run build              # Next.js production build
npm run lint               # Biome linter
npm run format             # Biome formatter
```

### Database
```bash
docker compose up -d       # Start PostgreSQL 16 container
```
TypeORM migrations are in `back/typeorm/migrations/`. DataSource config is in `back/DataSource.ts`. Synchronize is enabled (auto-schema in dev).

## Architecture

### Backend (NestJS)
- **Module-per-feature**: each domain (user, role, company, team, form, question, answer, etc.) is a NestJS module with its own service, controller, and DTOs
- **Auth**: Better Auth library with TypeORM adapter. Cookie-based sessions (`better-auth.session_token`). OAuth providers: Google, Microsoft. Config in `back/src/utils/auth.ts`
- **Authorization**: `@Roles()` decorator + `RolesGuard`. Role IDs: 1=SUPER_ADMIN, 2=ADMIN, 3=CEO, 4=HR, 5=MANAGER, 6=EMPLOYEE
- **Database**: PostgreSQL via TypeORM. Entities in `back/typeorm/entities/`. Repositories injected via NestJS DI
- **Activity logging**: `ActivityLogService` tracks all mutations with success/fail status

### Frontend (Next.js App Router)
- **Route groups**: `(authenticated)` for protected routes, `(main)` for app pages with Sidebar, `(settings)` for settings pages with SettingsSidebar
- **UI**: React Aria Components + Tailwind CSS v4 + Tailwind Variants (`tv()`) for component variants
- **Forms**: React Hook Form with Controller pattern
- **Auth client**: `front/lib/auth-api.ts` wraps auth API calls
- **Component convention**: page-specific components go in `__components__/` directories next to their page
- **Path alias**: `@/*` maps to `front/*`

### Communication
- Frontend calls backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:3000`)
- Backend CORS configured via `CORS_ORIGIN` env var (default `http://localhost:3001`)

## Code Style
- Biome for linting and formatting across both projects (root `biome.json`)
- 2-space indentation, 80-char line width
- Backend additionally uses ESLint + Prettier
