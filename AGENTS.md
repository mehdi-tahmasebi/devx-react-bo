# DevX React Backoffice — Agent Context

Sample repo for the team: **shell + 2 demo modules** only. Full conventions in [REACT.md](./REACT.md). Feature layout explained in [src/features/README.md](./src/features/README.md).

## Demo modules

| Path | Routes | Pattern |
|------|--------|---------|
| `features/demo-record/` | `/demo-records/*` | Full CRUD via `createResourceRoutes` |
| `features/demo-record/demo-label/` | `/demo-labels` | Submodule: list + dialog + `store.ts` |

Fixtures: `src/data/demo-store.ts` when `VITE_USE_DEMO_API=true` (default).

## Tooling

`pnpm install` · `cp .env.example .env` · `pnpm dev` · Node 22 · `@/*` → `src/*`

## Wiring a new module

1. Copy `features/demo-record/`.
2. `protected-routes.tsx` → spread `...yourRoutes`.
3. `sidebar.config.ts` → add nav link.
