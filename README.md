# DevX React Backoffice

Sample React backoffice for the team: **app shell + two demo feature modules** that show how to structure pages, API layer, hooks, and routes. No production domain code — fork and replace `demo-record` with your real resources.

## Prerequisites

- Node.js **22** (`.nvmrc` / `.node-version`)
- [pnpm](https://pnpm.io/) only

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Dev server |
| `pnpm build` | Type-check + production build |
| `pnpm lint` | ESLint |
| `pnpm preview` | Preview production build |

## Documentation

| File | Purpose |
|------|---------|
| [REACT.md](./REACT.md) | Product-agnostic blueprint (folder tree, CRUD scaffold, conventions) |
| [AGENTS.md](./AGENTS.md) | Context for this sample repo |
| [docs/idBuilding.md](./docs/idBuilding.md) | Building-scoped API header |

## Customization

1. **Branding** — `src/assets/app-logo.svg`, `app-mark.svg`, palette in `src/core/theme/brand.ts`, copy in `src/core/branding/`.
2. **Feature flags** — `src/core/branding/features.ts` (`productFeatures`) for optional UI toggles in white-label forks.
3. **New resource** — copy `features/demo-record/`, register routes + sidebar (see `src/features/README.md`).

Path alias: `@/*` → `src/*`.
