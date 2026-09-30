# Feature modules (sample)

Ogni dominio vive in `features/<nome>/` ed è **autosufficiente**: pagine, `api.ts`, `hooks/`, `model.ts`, `routes.ts`, `components/`.

## Moduli in questo repo

| Cartella | Route | Cosa mostra |
|----------|-------|-------------|
| `demo-record/` | `/demo-records` | CRUD completo (`createResourceRoutes`: lista, `new`, `:id`, `:id/edit`) |
| `demo-record/demo-label/` | `/demo-labels` | Sottomodulo: lista + dialog, `store.ts` solo UI |

## File standard (copia da `demo-record`)

```
demo-record/
├── DemoRecordPage.tsx      # lista — PageHeader + Table
├── DemoRecordView.tsx      # dettaglio read-only (opzionale)
├── api.ts                  # endpoint, query keys, chiamate HTTP (no React Query)
├── hooks/index.ts          # useQuery / useMutation + toast
├── model.ts                # DTO, enum, label map (no mapper helpers)
├── routes.ts               # path helpers + createResourceRoutes
├── store.ts                # stato UI locale (modali, filtri)
└── components/
    ├── DemoRecordForm.tsx
    └── DemoRecordTable.tsx
```

## Data flow

```
Page/Table/Form → hooks/ → api.ts → shared/hooks → apiClient
```

## Aggiungere un modulo

1. Duplica `demo-record/` e rinomina.
2. Aggiorna `app/routes/protected-routes.tsx` (`...yourRoutes`).
3. Aggiorna `components/layout/sidebar/sidebar.config.ts`.

Vedi anche [REACT.md](../REACT.md) §§8–14.
