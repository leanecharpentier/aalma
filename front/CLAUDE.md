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

## CSS & Tailwind — Conventions Responsive

### Approche : Desktop-first

Cette webapp est destinée aux ordinateurs et tablettes uniquement. Ne pas optimiser pour mobile.

Les classes Tailwind de base (sans préfixe) définissent le comportement sur **grand écran (≥ 1280px)**. On adapte ensuite vers le bas avec les breakpoints :

| Breakpoint | Largeur     | Cible                  |
|------------|-------------|------------------------|
| base       | ≥ 1280px    | Desktop large (défaut) |
| `lg:`      | ≥ 1024px    | Desktop standard       |
| `md:`      | ≥ 768px     | Tablette               |

En dessous de 768px : non prioritaire, mais l'interface ne doit pas être visuellement cassée.

### Sizing — Règles strictes

**INTERDIT** — Ne jamais utiliser de tailles px fixes pour les conteneurs de layout :
```
❌ w-[350px]  h-[200px]  min-w-[600px]
```

**AUTORISÉ** — Toujours utiliser des unités relatives ou les échelles Tailwind :
```
✅ Largeurs   → w-full, max-w-*, w-1/2, w-2/3, grid cols
✅ Hauteurs   → min-h-*, h-screen, h-full, ou hauteur définie par le contenu
✅ Padding / margin / gap → échelles Tailwind (p-4, gap-6, mx-8…)
```

**Exception autorisée** : les éléments UI atomiques (icônes, avatars, badges) peuvent avoir des tailles fixes en px.

### Layout

- Utiliser `flex` ou `grid` pour tous les conteneurs de mise en page
- Pas de positionnement `absolute` pour les éléments de flux
- Conteneur principal des pages : `w-full max-w-7xl mx-auto px-6`
- Colonnes responsives : préférer `grid grid-cols-3 lg:grid-cols-2 md:grid-cols-1` aux widths fixes

### Typographie

- Toujours définir des tailles responsives : `text-base lg:text-sm`
- Ne jamais fixer une taille de police en px arbitraire

### Objectif

Chaque composant doit s'afficher correctement de **768px à 1920px+** sans overflow ni layout cassé.

## Environment Variables

- `NEXT_PUBLIC_API_URL` — Backend API URL (default `http://localhost:3000`)

## Code Style

- **Biome**: double quotes, organize imports, React + Next.js recommended rules
- **ESLint**: Next.js + TypeScript presets (additional)
- Path alias: `@/*` → `front/*`
- TypeScript strict mode, `react-jsx` JSX transform