# CLAUDE.md — Backend (NestJS)

## Overview

API REST NestJS pour la plateforme AALMA. Gere l'authentification, les utilisateurs, les entreprises, les equipes, les formulaires/questionnaires, les reponses, et les plans d'action.

## Commands

```bash
npm run start:dev          # Dev server with watch (port 3000)
npm run build              # Compile TypeScript (nest build)
npm run start:prod         # Production start (node dist/main)
npm run test               # Run Jest unit tests
npm run test:watch         # Tests in watch mode
npm run test:cov           # Tests with coverage
npm run test:e2e           # End-to-end tests
npm run lint               # ESLint fix
npm run format             # Prettier format
```

## Architecture

### Module Structure

NestJS module-per-feature pattern. Each module has its own controller, service, and DTOs:

```
src/
├── auth/              # Authentication (signin, signup, signout, OAuth)
├── user/              # User CRUD
├── role/              # Role management
├── company/           # Company/organization CRUD
├── team/              # Team management
├── form/              # Form instances (assigned to companies)
├── form-template/     # Form templates
├── question/          # Questions
├── proposition/       # Question options/choices
├── answer/            # User responses to forms
├── kpi/               # KPI tracking
├── notification/      # Scheduled notifications (daily cron at 8 AM)
├── activity-log/      # Activity logging (tracks all mutations)
└── utils/
    └── auth.ts        # Better Auth configuration
```

Root module: `src/app.module.ts` imports all feature modules + `ScheduleModule` + `ConfigModule`.

### Database

- **PostgreSQL** via TypeORM
- **DataSource config**: `DataSource.ts` (root) — uses `DATABASE_URL` env var
- **Entities** (16): `typeorm/entities/` — User, Role, Company, Team, Form, FormTemplate, FormTemplateQuestion, Question, QuestionType, Proposition, Answer, ActivityLog, Color, Account, Session, Verification
- **Migrations**: `typeorm/migrations/`
- **Synchronize**: disabled (use migrations)

Key relationships:
- User → Role (ManyToOne), User → Team (ManyToOne)
- Team → Company (ManyToOne)
- Company → Color (ManyToOne), Company → Form (OneToMany)
- Form → FormTemplate (ManyToOne), Form → Answer (OneToMany)
- FormTemplate → FormTemplateQuestion → Question
- Question → Proposition (OneToMany), Question → Answer (OneToMany)

### Authentication

- **Better Auth** library with TypeORM adapter (`@hedystia/better-auth-typeorm`)
- **Cookie-based sessions**: `better-auth.session_token`
- **OAuth providers**: Google, Microsoft (validates email domain against company config)
- **AuthGuard**: validates session, injects user into request. Exported via `AuthGuardModule`
- **Config**: `src/utils/auth.ts`

### Authorization

- `@Roles()` decorator + `RolesGuard`
- 7 predefined roles: 1=SUPER_ADMIN, 2=ADMIN, 3=CEO, 4=HR, 5=MANAGER, 6=EMPLOYEE, 7=HEALTH_REFEREE

### Activity Logging

`ActivityLogService.log(userId, action, status, details?)` — Status constants:
- `ACTIVITY_SUCCESS = 1`
- `ACTIVITY_FAIL = 2`
- `ACTIVITY_PENDING = 3`

### Entry Point

`src/main.ts`: initializes TypeORM DataSource, creates NestJS app, configures Swagger (`/api`), cookie-parser, CORS.

## Environment Variables

See `.env.exemple`:
- `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — Auth config
- `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, `DATABASE_HOST`, `DATABASE_PORT` — DB connection
- `DATABASE_URL` — Full PostgreSQL connection string (used by DataSource)
- `PORT` — API server port (default 3000)
- `APP_URL` — Base URL for OAuth callbacks
- `CORS_ORIGIN` — Allowed CORS origin (default `http://localhost:3001`)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth
- `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_TENANT_ID` — Microsoft OAuth

## Code Style

- **Biome** (primary): double quotes, organize imports, no explicit any allowed
- **ESLint** + **Prettier** (additional): TypeScript ESLint recommended, floating promises warning, unsafe argument warning
- TypeScript strict mode with experimental decorators
- Target: ES2023, Module: nodenext

## Docker

Multi-stage Dockerfile: Node 20 Alpine, builds with `nest build`, runs `dist/src/main.js`, exposes port 3000.
