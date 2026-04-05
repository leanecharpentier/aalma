# CLAUDE.md — Landing Page

@AGENTS.md

## Overview

Site marketing statique Next.js 16 pour AALMA — entierement en francais. Presente le produit (gestion de la sante mentale au travail), ses fonctionnalites, et propose un formulaire de demande de demo. Aucun appel API, aucune donnee dynamique.

## Commands

```bash
npm run dev                # Dev server
npm run build              # Next.js production build
npm run lint               # Biome linter
npm run format             # Biome formatter
```

## Architecture

### Pages

- **`/`** (Home) — Sections marketing : Hero, ChatWidget, Stats, Features, HowItWorks, Impact, Roles, Team, Trust, CTA
- **`/contact`** — Formulaire de demande de demo (nom, email, telephone, entreprise, taille, message)

### Component Structure

```
components/
├── layout/
│   ├── Header.tsx         # Navbar sticky avec blur, logo, liens nav, CTAs
│   └── Footer.tsx         # Liens, logo, mentions legales
├── sections/              # Sections de la page d'accueil
│   ├── Hero.tsx           # Headline, tags, CTAs, formes decoratives orange
│   ├── ChatWidget.tsx     # Widget IA flottant (bottom-right)
│   ├── Stats.tsx          # Chiffres cles absenteisme
│   ├── Features.tsx       # 3 cartes : Plan d'action, Collaboration, IA
│   ├── HowItWorks.tsx     # 3 etapes : Collectez, Analysez, Agissez
│   ├── Impact.tsx         # Statistiques en sections colorees
│   ├── Roles.tsx          # Cartes RH / Manager / PDG
│   ├── Team.tsx           # Photo equipe + description
│   ├── Trust.tsx          # Logos clients
│   ├── CTA.tsx            # Call-to-action final
│   └── ContactForm.tsx    # Formulaire complet avec validation
└── ui/                    # Composants reutilisables
    ├── Button.tsx         # Variants: primary/outline/ghost/white, tailles sm/md/lg
    ├── TextField.tsx      # Input avec label, description, erreur
    ├── TextArea.tsx       # Textarea (3 lignes par defaut)
    ├── Select.tsx         # Dropdown avec popover
    ├── Field.tsx          # Label, Description, FieldError
    └── utils.ts           # composeTailwindRenderProps, focusRing
```

### UI Stack

Meme stack que `front/` :
- **React Aria Components** — primitives UI accessibles
- **Tailwind CSS v4** — tokens dans `globals.css` via `@theme`
- **Tailwind Variants** (`tv()`) — variants typees
- **tailwind-merge** — resolution de conflits de classes
- **Lucide React** — icones
- **Montserrat** — police principale

### Design Tokens

- Primary: orange `#F26700` (shades 40–800)
- Gray: `#1F1F1F` to `#FCFCFC` (900–40)
- Alert: red, green
- Shadow: `shadow-card`

## Environment Variables

- `NEXT_PUBLIC_PLATFORM_URL` — URL de l'app dashboard (default `http://localhost:3001`), utilise pour le bouton "Connexion" du Header

## Code Style

- **Biome**: double quotes, organize imports, React + Next.js recommended rules, Tailwind directives enabled
- Path alias: `@/*` → `landing-page/*`
- Tout le contenu est en **francais**
- Donnees statiques hardcodees dans les composants (pas de CMS)

## Notes

- Pas d'appels API — site purement statique
- Pas de dark mode
- Pas d'analytics
- Formulaire de contact : UI complete mais pas encore connecte a un backend
- Responsive mobile-first avec breakpoints `md:` et `lg:`
