# CLAUDE.md — Frontend (Next.js)

## Overview

Application dashboard Next.js 16 pour la plateforme AALMA. Interface de gestion des questionnaires, analyses, plans d'action, et parametres d'organisation. Authentification via cookie session vers le backend NestJS.

## Commands

```bash
npm run dev                # Dev server (port 3001)
npm run build              # Next.js production build
npm run lint               # Biome linter
npm run format             # Biome formatter
```

## Architecture

### App Router Structure

```
app/
├── layout.tsx                          # Root layout (Montserrat font, globals.css)
├── page.tsx                            # Welcome page (redirects based on auth)
├── globals.css                         # Design tokens + Tailwind v4 @theme
├── auth/
│   ├── login/
│   │   ├── page.tsx                    # Login page (email/password + OAuth)
│   │   └── __components__/authVisual.tsx
│   └── callback/                       # OAuth callback route
├── forbidden/page.tsx                  # 403 error page
└── (authenticated)/
    ├── layout.tsx                      # Header wrapper
    ├── (main)/
    │   ├── layout.tsx                  # Sidebar wrapper
    │   ├── home/page.tsx
    │   ├── questionnaire/page.tsx
    │   ├── analysis/page.tsx
    │   ├── action-plan/page.tsx
    │   ├── impact/page.tsx
    │   └── library/page.tsx
    └── (settings)/
        ├── layout.tsx                  # SettingsSidebar wrapper
        └── settings/
            ├── companies/
            │   ├── page.tsx
            │   └── __components__/CompanyCard.tsx
            └── roles/
                ├── page.tsx
                └── __components__/
                    ├── RoleCard.tsx
                    └── ActivityHistory.tsx
```

### Route Groups

- **`(authenticated)/`** — Protected routes, wrapped with Header
- **`(main)/`** — Dashboard pages with left Sidebar navigation
- **`(settings)/`** — Settings pages with SettingsSidebar navigation

### Component Organization

```
components/
├── ui/                    # Reusable UI components (Button, TextField, Select, DateRangePicker, Field)
├── layout/                # Layout components (Header, Sidebar, SettingsSidebar)
├── icon/                  # Custom SVG icons (Google, Apple)
└── utils.ts               # composeTailwindRenderProps, focusRing
```

Page-specific components go in `__components__/` directories next to their page.

### Features Directory

Server-side data fetching actions, organized by domain:

```
features/
├── activity-log/actions/fetch-activity-logs.ts
├── roles/actions/fetch-roles.ts
└── teams/actions/fetch-teams.ts
```

### Auth & API

- **Middleware** (`middleware.ts`): checks `better-auth.session_token` cookie. Redirects to `/auth/login` if missing, redirects to `/home` if authenticated on public routes
- **Server-side API client** (`lib/api.ts`): `apiFetch<T>(path, options)` — forwards session cookie, auto-redirects on 401 → `/auth/login`, 403 → `/forbidden`
- **Client-side auth** (`lib/auth-api.ts`): `signIn({ email, password })` — POST to backend

## UI Stack

- **React Aria Components** — headless accessible UI primitives (Button, TextField, Select, DateRangePicker, Popover, Calendar, etc.)
- **Tailwind CSS v4** — utility-first CSS with `@theme` design tokens in `globals.css`
- **Tailwind Variants** (`tv()`) — type-safe variant composition for components
- **tailwind-merge** — resolves conflicting Tailwind classes
- **Lucide React** — icon library
- **React Hook Form** — form state management with `Controller` pattern

### Design Tokens (globals.css)

- Primary: orange `#F26700` with shades 40–800
- Gray: `#1F1F1F` to `#FCFCFC` (900–40)
- Alert: red `#F82D0C`, green `#4BD426`
- Font: Montserrat
- Shadow: `shadow-card` for card elevation

### Component Pattern

```tsx
import { tv } from "tailwind-variants";
import { Button as AriaButton } from "react-aria-components";
import { composeTailwindRenderProps } from "./utils";

const styles = tv({
  base: "...",
  variants: { color: { Primary: "...", White: "..." }, size: { md: "..." } },
  defaultVariants: { color: "Primary", size: "md" },
});

export function Button({ className, ...props }) {
  return (
    <AriaButton
      className={composeTailwindRenderProps(className, styles(...))}
      {...props}
    />
  );
}
```

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API URL (default `http://localhost:3000`)

## Code Style

- **Biome**: double quotes, organize imports, React + Next.js recommended rules
- **ESLint**: Next.js + TypeScript presets (additional)
- Path alias: `@/*` → `front/*`
- TypeScript strict mode, `react-jsx` JSX transform
