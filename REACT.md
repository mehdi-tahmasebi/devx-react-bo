# React Backoffice Blueprint

**Purpose:** This document is a **product-agnostic** specification for scaffolding a modern admin/backoffice SPA. An agent (or developer) should be able to read **only this file** and generate a complete project: folder tree, routing, auth, layout shell, design-system components, and CRUD feature modules.

Replace placeholders such as `<app-name>`, `<Resource>`, `<resource>`, `<resources>` with project-specific names.

For a runnable sample that implements this blueprint, see [AGENTS.md](./AGENTS.md) in this repository.

---

## 1. Stack & tooling

| Tool | Version (reference) | Role |
|------|---------------------|------|
| **Node.js** | 22.x | Runtime — pin in `.nvmrc` + `.node-version` (required on every project) |
| **pnpm** | latest stable | Package manager — **only** pnpm (`packageManager` in `package.json`) |
| **React** | 19.x | UI |
| **TypeScript** | 5.9+ | Types (`strict`, `verbatimModuleSyntax`) |
| **Vite** | 8.x | Dev server & build |
| **MUI** | 7.x | Components + theme |
| **TanStack React Query** | 5.x | Server state / cache |
| **React Router** | 7.x | Client routing |
| **Axios** | 1.x | HTTP (via centralized clients) |
| **notistack** | 3.x | Toast notifications (MUI Snackbar) |

### Node version files (required)

Every project **must** ship both files at the repo root so local tools and CI pick the same Node major:

| File | Used by | Content |
|------|---------|---------|
| **`.nvmrc`** | nvm, many CI images | Node major (e.g. `22`) — one line, no `v` prefix |
| **`.node-version`** | fnm, asdf, nodenv, Volta-compatible flows | Same value as `.nvmrc` |

Keep the two files identical. When bumping Node, update both together (and the stack table above). Vite 8 needs Node `20.19+` or `22.12+`; prefer the current LTS major (`22`).

```text
# .nvmrc and .node-version (identical)
22
```

### Path alias

```json
// tsconfig.app.json
"paths": { "@/*": ["src/*"] }
```

### Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

### Environment

```env
# .env
VITE_API_BASE_URL=https://api.example.com
```

Read in `core/config/index.ts`:

```ts
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? "",
};
```

### Root config files

**`.nvmrc`** / **`.node-version`** — see [Node version files](#node-version-files-required) above. Do not scaffold a project without them.

**`package.json`** — key fields:

```json
{
  "type": "module",
  "packageManager": "pnpm@<version>",
  "dependencies": {
    "@emotion/react": "^11",
    "@emotion/styled": "^11",
    "@mui/material": "^7",
    "@tanstack/react-query": "^5",
    "axios": "^1",
    "notistack": "^3",
    "react": "^19",
    "react-dom": "^19",
    "react-router-dom": "^7"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^6",
    "babel-plugin-react-compiler": "^1",
    "@rolldown/plugin-babel": "^0.2",
    "typescript": "~5.9",
    "vite": "^8",
    "eslint": "^9",
    "typescript-eslint": "^8",
    "eslint-plugin-react-hooks": "^7",
    "eslint-plugin-react-refresh": "^0.5"
  }
}
```

**`vite.config.ts`** — alias + React Compiler:

```ts
import path from "node:path";
import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
```

**`eslint.config.js`** — flat config with `typescript-eslint`, `react-hooks`, `react-refresh` (Vite preset).

**`index.html`** — single `#root` div, module entry `src/main.tsx`.

**`src/index.css`** — minimal reset: `box-sizing: border-box`, `#root { min-height: 100vh }`, system font stack.

**`src/core/store/query-client.ts`:**

```ts
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30_000, retry: 1 },
  },
});
```

---

## 2. Architectural principles

1. **Feature slices** — Each domain (`users`, `orders`, …) is a self-contained folder under `features/`.
2. **Three-layer data fetching** — Component → feature React Query hook → shared axios hook → `apiClient`. Never mix React Query into shared hooks.
3. **Thin routes** — Route files only compose pages; no business logic.
4. **Cookie session auth** — `withCredentials: true`, HttpOnly cookies, no tokens in `localStorage`.
5. **Layout vs pages** — Authenticated UI uses `MainLayout` (sidebar + header + outlet). Login and public pages are full-screen.
6. **Fast Refresh safety** — Files that export React components must export **only** components. Hooks/context live in separate `.ts` files.
7. **No cross-feature imports** — Features share code via `shared/` or `core/`, never `features/a` → `features/b`.

---

## 3. Directory layout (complete tree)

```
src/
│
├── app/
│   ├── App.tsx
│   ├── auth.ts                          # LOGIN_PATH, AUTHENTICATED_ROOT
│   ├── auth-guard.tsx                   # RequireAuth, RedirectIfAuthenticated
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── HomePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── providers/
│   │   ├── app-providers.tsx            # composes all providers
│   │   ├── query-provider.tsx
│   │   ├── router-provider.tsx
│   │   └── theme-provider.tsx
│   └── routes/
│       ├── app-routes.tsx               # public login + protected /*
│       └── protected-routes.tsx         # MainLayout + features + 404
│
├── features/
│   └── <resource>/                      # one folder per domain (reference CRUD module)
│       ├── <Resource>Page.tsx           # list
│       ├── <Resource>View.tsx           # detail (optional)
│       ├── api.ts                       # endpoints, query keys, plain API calls
│       ├── hooks/                       # React Query hooks (useQuery / useMutation)
│       │   └── index.ts
│       ├── model.ts
│       ├── store.ts                     # local UI state only
│       ├── routes.ts
│       └── components/
│           ├── <Resource>Form.tsx
│           └── <Resource>Table.tsx
│
├── components/
│   ├── ui/
│   │   ├── buttons/                     # Button, ActionButtons
│   │   ├── dialog/                      # ConfirmDialog
│   │   ├── form/                        # FormWrapper, ResourceForm, fields/*
│   │   ├── page/                        # PageHeader, PageState, AuthPageShell
│   │   └── table/                       # DataTable
│   └── layout/
│       ├── main/                        # MainLayout
│       ├── sidebar/                     # Sidebar, SidebarLogout, sidebar.config.ts
│       ├── header/                      # Header
│       ├── layout.context.ts            # context + useLayout hook
│       ├── layout.store.tsx             # LayoutProvider component only
│       └── layout.tokens.ts             # shell spacing / radius constants
│
├── shared/
│   ├── hooks/
│   │   ├── useGet.ts                    # apiList, apiSingle, apiSelect
│   │   ├── useApiSelect.ts              # useApiSelect(endpoint) for /select APIs
│   │   ├── useSend.ts                   # apiPost, apiPut, apiPatch, apiClone
│   │   ├── useDelete.ts                 # apiDelete
│   │   ├── useDownload.ts
│   │   ├── useUpload.ts
│   │   └── index.ts
│   ├── routing/
│   │   └── create-resource-routes.tsx
│   ├── icons/
│   │   └── index.tsx                    # shared SvgIcon wrappers
│   ├── utils/
│   │   ├── object.ts                    # getByPath, setByPath
│   │   └── date.ts                      # formatDateTime, formatDate (it-IT, dayjs)
│   └── types/
│       ├── table.type.ts
│       ├── form.type.ts
│       └── index.ts
│
├── core/
│   ├── api/
│   │   ├── client.ts                    # apiClient, multipartClient, 401 interceptor
│   │   ├── auth.ts                      # signIn, signOut, getMe, hooks
│   │   └── api.type.ts                  # TApiListResponse, TApiSingleResponse
│   ├── config/
│   │   └── index.ts
│   ├── notifications/
│   │   ├── notification-provider.tsx    # SnackbarProvider (MUI-themed)
│   │   ├── notify.ts                    # notify.success / error / info / warning
│   │   ├── get-error-message.ts         # Axios → user-facing string
│   │   └── index.ts
│   ├── store/
│   │   └── query-client.ts
│   └── theme/
│       ├── brand.ts                     # palette tokens (project-specific)
│       └── index.ts                     # createTheme(...)
│
├── assets/                              # logos, static images
├── data/
│   └── mock.ts                          # optional fixtures for dev
├── index.css
├── main.tsx
└── vite-env.d.ts
```

---

## 4. Layer responsibilities

| Layer | Path | Owns |
|-------|------|------|
| **App shell** | `app/` | Providers, guards, top-level routes, login/home/404 pages |
| **Features** | `features/<name>/` | Domain pages, forms, tables, API hooks, DTOs, feature routes |
| **Components** | `components/` | Reusable UI + app chrome (layout) |
| **Shared** | `shared/` | Generic hooks, types, routing helpers, icons, date utils |
| **Core** | `core/` | HTTP clients, auth API, config, QueryClient, theme, notifications |

---

## 4.1 Date formatting (`shared/utils/date.ts`)

API timestamps (ISO 8601, e.g. `"2026-06-30T13:05:02.885392Z"`) are formatted in **Italian** with **dayjs** (locale `it`).

| Export | Output | Use |
|--------|--------|-----|
| `formatDateTime(value)` | `DD/MM/YYYY HH:mm` | `createdAt`, `lastUpdatedAt`, message timestamps |
| `formatDate(value)` | `DD/MM/YYYY` | date-only fields (e.g. `birthday`) |

`null`, `undefined`, and sentinel dates (`0001-01-01…`) return `—`.

**Do not** add per-feature date helpers (`formatTicketDate`, `formatUserDate`, etc.) — import from `@/shared/utils/date` everywhere.

---

## 4.2 Boolean display

Boolean API fields and form values are shown with **Switch** or **Checkbox** — **never** as Italian text (`Sì` / `No`).

| Export | Path | Use |
|--------|------|-----|
| `ReadonlyBooleanField` | `components/ui/form/fields/ReadonlyBooleanField.tsx` | Read-only detail sections (disabled switch + label) |
| `ReadonlyField` | `components/ui/form/fields/ReadonlyField.tsx` | Read-only text fields (`readOnly`, responsive via `getGridWrapperSx`) |
| `BooleanIndicator` | same | Table columns, compact read-only cells |
| `BooleanField` | `components/ui/form/fields/BooleanField.tsx` | Editable `ResourceForm` fields (`type: "boolean"`) |

Default variant is **switch** (`variant: "checkbox"` only when requested). Filters already use `Switch` (e.g. ticket/user table filters).

---

## 5. App shell — required files

### `app/App.tsx`

```tsx
export function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
```

### `app/auth.ts`

```ts
export const LOGIN_PATH = "/login";
export const AUTHENTICATED_ROOT = "/";
```

### `app/auth-guard.tsx`

- **`RequireAuth`** — `useAuthMe()` → loading spinner → redirect to `LOGIN_PATH` if null → render children.
- **`RedirectIfAuthenticated`** — inverse: redirect to `AUTHENTICATED_ROOT` if user exists.

### `app/routes/app-routes.tsx`

```tsx
<Routes>
  <Route path={LOGIN_PATH} element={
    <RedirectIfAuthenticated><LoginPage /></RedirectIfAuthenticated>
  } />
  <Route path="/*" element={
    <RequireAuth><ProtectedRoutes /></RequireAuth>
  } />
</Routes>
```

### `app/routes/protected-routes.tsx`

```tsx
export function ProtectedRoutes() {
  return useRoutes([
    {
      element: <MainLayout />,
      children: [
        { index: true, element: <HomePage /> },
        ...<resource>Routes,   // spread each feature's RouteObject[]
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ]);
}
```

### Shell pages

| Page | Layout | Responsibility |
|------|--------|----------------|
| `LoginPage` | Full-screen `AuthPageShell` | Sign-in form, `useSignIn()`, error display |
| `HomePage` | Inside `MainLayout` | Greeting (`useAuthMe`), quick-access cards from `sidebarNavItems` |
| `NotFoundPage` | Inside `MainLayout` | In-layout 404 card + link back to `AUTHENTICATED_ROOT` |

**Important:** API HTTP errors (e.g. `404` on `POST /api/auth/logout`) are **not** the in-app `NotFoundPage`. Route `NotFoundPage` is only for unknown **client paths** (`path: "*"`).

### Provider order

```tsx
<QueryProvider>
  <AppThemeProvider>
    <NotificationProvider>
      <AppRouterProvider>{children}</AppRouterProvider>
    </NotificationProvider>
  </AppThemeProvider>
</QueryProvider>
```

`NotificationProvider` lives in `core/notifications/` and must be **inside** `AppThemeProvider` so snackbars inherit the MUI theme.

### Notifications (`core/notifications/`)

Use **notistack** (MUI Snackbar) for all transient user feedback — mutation success/error, background actions, etc. Do **not** add a second toast library.

| File | Role |
|------|------|
| `notification-provider.tsx` | `SnackbarProvider` — global position, duration, MUI-styled variants |
| `notify.ts` | Imperative API: `notify.success()`, `notify.error()`, `notify.info()`, `notify.warning()` |
| `get-error-message.ts` | Extract message from Axios / `Error` with Italian fallback |

**API error body** — `TApiErrorResponse` may include `errorCode` and `errorMessage`. `getErrorMessage(error, fallback)` resolves in this order: (1) Italian map for known `errorCode` values, (2) `errorMessage` / legacy `message`, (3) HTTP 403 → a generic “no permission” Italian string, (4) the caller `fallback`. Do **not** add a global Axios 403 interceptor (mutation hooks already toast `onError`; a global toast would duplicate). Do **not** map generic codes such as `INVALID_FIELD_VALUE` if the API `errorMessage` is more specific.

**Position & defaults** — configure once in `NotificationProvider` only (e.g. `anchorOrigin={{ vertical: "top", horizontal: "center" }}`). Do **not** set `anchorOrigin` in `notify.ts` or per call unless overriding a single snackbar.

**Mutation pattern** — fire toasts from feature `hooks/` mutation hooks (same layer as cache invalidation):

```ts
import { getErrorMessage, notify } from "@/core/notifications";

export function useCreate<Resource>() {
  const { apiPost } = useSend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => apiPost(<RESOURCES>_ENDPOINT, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: <resources>Keys.all });
      notify.success("<Resource> creato con successo");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile creare il <resource>"));
    },
  });
}
```

Use Italian copy for toast messages; keep established English domain terms where applicable (e.g. "Building creato con successo").

---

## 6. Authentication

### API contract (cookie session)

| Action | Method | Endpoint | Notes |
|--------|--------|----------|-------|
| Sign in | `POST` | `/api/auth/signin` | Body: `{ username, password }` — sets HttpOnly cookie |
| Sign out | `POST` | `/api/auth/logout` | Clears session cookie |
| Current user | `GET` | `/api/auth/me` | Returns user DTO or `401` |

### `core/api/auth.ts` exports

```ts
// Functions
signIn(credentials)
signOut()
getMe(): Promise<AuthUser | null>

// React Query hooks
useAuthMe()      // query, key: ["auth", "me"]
useSignIn()      // mutation; on success refetch me
useSignOut()     // mutation; on success clear cache + navigate to LOGIN_PATH
```

### `core/api/client.ts`

- `apiClient` — JSON, `withCredentials: true`, `baseURL` from config.
- `multipartClient` — uploads (`Content-Type: multipart/form-data`).
- **Response interceptor:** on `401` for non-auth URLs → clear auth query cache → `window.location.assign(LOGIN_PATH)`.

---

## 7. Data fetching (four layers)

```
┌─────────────────────────────────────────┐
│  Feature component (Page, Table, Form)  │
│  imports from features/<resource>/hooks   │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│  features/<resource>/hooks/             │
│  useQuery / useMutation + toasts        │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│  features/<resource>/api.ts             │
│  endpoints, query keys, plain API calls   │
└──────────────────┬──────────────────────┘
                   ▼
┌─────────────────────────────────────────┐
│  shared/hooks/useGet | useSend | …      │
│  plain async functions → apiClient      │
│  NO React Query here                    │
└─────────────────────────────────────────┘
```

### Shared hook surface

| Module | Exports |
|--------|---------|
| `useGet` | `apiList<T>(endpoint, params?)`, `apiSingle<T>(endpoint, id?)`, `apiSelect(endpoint)` |
| `useApiSelect` | `useApiSelect(endpoint)` — React Query hook for `GET …/select` (`TApiSelectOptionResponse[]`) |
| `useSend` | `apiPost`, `apiPut`, `apiPatch`, `apiClone` |
| `useDelete` | `apiDelete` |
| `useUpload` | `apiUpload` |
| `useDownload` | `apiDownload`, `saveBlobAsFile` |

### API response shapes (`core/api/api.type.ts`)

```ts
type TApiListResponse<T> = { rows: T[]; totalRows: number };
type TApiSelectOptionResponse = { id: number; v: string };
```

Select endpoints (`GET …/select`) return `TApiSelectOptionResponse[]` (not paginated). Map to form options with `mapApiSelectOptions` from `core/api/select.utils.ts`, or use `useApiSelect(endpoint)` in feature hooks.

### Feature `api.ts` pattern

Plain API layer — **no React, no React Query**:

```ts
export const <RESOURCES>_ENDPOINT = "/api/bo/v1/<resources>";

export const <resources>Keys = {
  all: ["<resources>"] as const,
  list: (params?) => [...<resources>Keys.all, "list", params] as const,
  detail: (id) => [...<resources>Keys.all, "detail", id] as const,
};

// Optional: nested path builders and apiClient calls for non-CRUD endpoints
// export function patch<Resource>Status(id, body) { … }
```

### Feature `hooks/index.ts` pattern

```ts
import { getErrorMessage, notify } from "@/core/notifications";
import { useGet, useSend } from "@/shared/hooks";
import { <RESOURCES>_ENDPOINT, <resources>Keys } from "../api";

export function use<Resources>List(params?) {
  const { apiList } = useGet();
  return useQuery({
    queryKey: <resources>Keys.list(params),
    queryFn: () => apiList<<Resource>ListDto>>(<RESOURCES>_ENDPOINT, params),
  });
}

export function use<Resource>Detail(id) {
  const { apiSingle } = useGet();
  return useQuery({
    queryKey: <resources>Keys.detail(id),
    queryFn: () => apiSingle<<Resource>SingleDto>>(<RESOURCES>_ENDPOINT, id),
    enabled: Boolean(id),
  });
}

export function useCreate<Resource>() {
  const { apiPost } = useSend();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => apiPost(<RESOURCES>_ENDPOINT, body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: <resources>Keys.all });
      notify.success("<Resource> creato con successo");
    },
    onError: (error) => {
      notify.error(getErrorMessage(error, "Impossibile creare il <resource>"));
    },
  });
}

// Similarly: useUpdate<Resource>, useDelete<Resource> — each with success + error toasts
// Select options: useApiSelect(`${<RESOURCES>_ENDPOINT}/…/select`) or a named wrapper hook
```

Components import hooks from `../hooks` (or `./hooks`), never from `api.ts`.

---

## 8. Feature module blueprint (CRUD reference)

Each resource module under `features/<resource>/` must include:

| File | Role |
|------|------|
| `<Resource>Page.tsx` | List: `PageHeader` + primary action button + `<Resource>Table` |
| `<Resource>View.tsx` | Detail view (optional if no read-only page needed) |
| `components/<Resource>Form.tsx` | Create/edit: `ResourceForm` + `buildingFormFields` from model |
| `components/<Resource>Table.tsx` | `DataTable` with columns + edit/delete actions |
| `model.ts` | DTOs, `FormValues` type aliases, backend enums + label maps — **no** formatters, **no** DTO↔form mappers |
| `api.ts` | Endpoint constants, query keys, path builders, plain `apiClient` calls |
| `hooks/index.ts` | All React Query hooks (`useQuery`, `useMutation`, toasts, cache invalidation) |
| `store.ts` | Zustand-like local UI state (modals, filters) — **never** server cache |
| `routes.ts` | Path helpers + `createResourceRoutes(...)` |

### `model.ts` contents

```ts
// DTOs — use only ListDto, SingleDto, RequestDto for resource shapes (see §13).
export interface <Resource>ListDto {
  id: number;
  /* fields returned in list rows */
}

export interface <Resource>SingleDto extends <Resource>ListDto {
  /* extra detail-only fields; omit `extends` and use a type alias when identical */
}

export interface <Resource>RequestDto {
  /* POST / PUT body — no `id` unless the API requires it */
}

export type <Resource>FormValues = <Resource>RequestDto;

// Backend enums — only when the API documents numeric codes (never invent values).
export const <Resource>Status = {
  Active: 1,
  /* … */
} as const;

export type <Resource>Status = (typeof <Resource>Status)[keyof typeof <Resource>Status];

export const <RESOURCE>_STATUS_LABELS: Record<<Resource>Status, string> = {
  [<Resource>Status.Active]: "Attivo",
  /* … */
};
```

**Do not** add `map*SingleToFormValues`, `map*FormToDto`, or similar conversion helpers in `model.ts`. Map DTOs to form state (and back to request payloads) **inline in the form component** — see §10 form template and `features/building/components/BuildingForm.tsx`.

**Do not** add per-feature formatters (`format*Status`, `format*Date`, `*FullName`, etc.) unless explicitly requested. Use `TICKET_STATUS_LABELS`-style maps for enums and `@/shared/utils/date` for dates.

### `routes.ts` contents

```ts
export const <RESOURCE>_ROUTE_BASE = "<resources>";

export const <resource>Paths = {
  list: `/${<RESOURCE>_ROUTE_BASE}`,
  new: `/${<RESOURCE>_ROUTE_BASE}/new`,
  detail: (id) => `/${<RESOURCE>_ROUTE_BASE}/${id}`,
  edit: (id) => `/${<RESOURCE>_ROUTE_BASE}/${id}/edit`,
} as const;

export const <resource>Routes = createResourceRoutes(<RESOURCE>_ROUTE_BASE, {
  list: <Resource>Page,
  form: <Resource>Form,
  detail: <Resource>View,   // omit if no detail page
});
```

### `createResourceRoutes` generates

| Path | Component |
|------|-----------|
| `/<base>` | list |
| `/<base>/new` | form (create) |
| `/<base>/:id/edit` | form (edit) |
| `/<base>/:id` | detail (optional) |

Route order is fixed: `new` and `:id/edit` before `:id`.

### Registering a new feature (checklist)

1. Create `features/<resource>/` with all files above.
2. Define DTOs in `model.ts`; define `TFormFieldConfig[]` and initial values in the form component.
3. Define endpoints + query keys in `api.ts`; implement React Query hooks in `hooks/index.ts`.
4. Build table + form components; keep pages thin.
5. Export `<resource>Routes` from `routes.ts`.
6. Spread into `app/routes/protected-routes.tsx`.
7. Add entry to `components/layout/sidebar/sidebar.config.ts`.

### `store.ts` — local UI state only

Use a custom hook with `useState` / `useCallback` — **not** Zustand unless the project already uses it. Example: modal open/close, panel filters, wizard step.

```ts
export function use<Resource>Store() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);
  return { isModalOpen, openModal, closeModal };
}
```

### List page template (`<Resource>Page.tsx`)

> **Placeholder rule:** `<Resource>` = PascalCase (`Order`); `<resource>` = camelCase (`order`); `<resources>` = URL segment (`orders`).

```tsx
export function <Resource>Page() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        title="<Resources>"
        description="…"
        action={
          <Button variant="contained" startIcon={<AddIcon />}
            onClick={() => navigate(<resource>Paths.new)}>
            Add <resource>
          </Button>
        }
      />
      {/* e.g. <OrderTable /> when Resource = Order */}
      <OrderTable />
    </>
  );
}
```

### Form component template (`components/<Resource>Form.tsx`)

- Read `id` from `useParams()` → `isEdit = Boolean(id)`.
- Edit mode: `use<Resource>Detail(id)` wrapped in `PageState`.
- `key={isEdit ? id : "new"}` on `ResourceForm` to reset state.
- Map `SingleDto` → form `initialValues` and form values → `RequestDto` **inline** in the component (`useMemo` + `onSubmit` payload). Do **not** add mapper functions in `model.ts`.
- Edit forms may split fields into multiple `ResourceForm` sections (`Dettagli`, `Configurazione`, feature-specific sections, `Indirizzo`).
- Below the main form, use `FormRelatedSection` + `FormRelatedCard` (grid) or `FormRelatedRow` (stack) for linked resources — see §10.
- On success: `navigate(<resource>Paths.list)` (unless UX requires staying on edit for follow-up config).

### Table component template (`components/<Resource>Table.tsx`)

```tsx
const columns: TTableColumn<<Resource>ListDto>[] = [
  { id: "name", label: "Name", render: (row) => (
      <Link to={<resource>Paths.detail(row.id)}>{row.name}</Link>
    )},
  // …more columns
];

export function <Resource>Table() {
  const { data, isLoading, isError, error } = use<Resources>List();
  const { mutateAsync: delete<Resource> } = useDelete<Resource>();

  return (
    <DataTable
      columns={columns}
      rows={data?.rows ?? []}
      rowKey="id"
      loading={isLoading}
      error={isError ? (error as Error) : null}
      totalRows={data?.totalRows}
      actions={{
        edit: { getPath: (row) => <resource>Paths.edit(row.id) },
        delete: {
          confirmTitle: "Delete …",
          confirmMessage: (row) => `Delete "${row.name}"?`,
          onConfirm: async (row) => { await delete<Resource>(row.id); },
        },
      }}
    />
  );
}
```

### Detail view template (`<Resource>View.tsx`)

- `useParams().id` + `use<Resource>Detail(id)`.
- `PageState` for loading/error.
- `PageHeader` with edit action linking to `<resource>Paths.edit(id)`.
- Read-only field grid or summary cards.

### Backend API conventions (REST)

| Operation | HTTP | URL pattern |
|-----------|------|-------------|
| List | `GET` | `/api/bo/v1/<resources>?page=&pageSize=&sort=` |
| Detail | `GET` | `/api/bo/v1/<resources>/:id` |
| Create | `POST` | `/api/bo/v1/<resources>` |
| Update | `PUT` or `PATCH` | `/api/bo/v1/<resources>/:id` |
| Delete | `DELETE` | `/api/bo/v1/<resources>/:id` |
| Clone (optional) | `POST` | `/api/bo/v1/<resources>/:id/clone` |

Adjust prefix/version to match backend OpenAPI.

---

## 9. Layout shell

### Structure

```
┌──────────────────────────────────────────────────────┐
│  MainLayout (ambient backdrop, padded shell)         │
│  ┌──────────┬───────────────────────────────────────┐ │
│  │ Sidebar  │  Header (title, menu, user chip)    │ │
│  │          ├───────────────────────────────────────┤ │
│  │  nav     │  Main canvas (Outlet)               │ │
│  │  items   │  feature pages render here          │ │
│  │          │                                       │ │
│  │  logout  │                                       │ │
│  └──────────┴───────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### Files

| File | Exports | Notes |
|------|---------|-------|
| `layout.context.ts` | `LayoutContext`, `useLayout`, types | Hook + context only |
| `layout.store.tsx` | `LayoutProvider` | Component only (Fast Refresh) |
| `layout.tokens.ts` | `SHELL_RADIUS`, `SHELL_GAP`, `SHELL_HEADER_HEIGHT` | |
| `sidebar/sidebar.config.ts` | `sidebarNavItems`, width constants | |
| `sidebar/Sidebar.tsx` | `Sidebar` | Collapsible; mobile drawer |
| `sidebar/SidebarLogout.tsx` | `SidebarLogout` | Calls `useSignOut()` |
| `header/Header.tsx` | `Header` | Title from route / sidebar config |
| `main/MainLayout.tsx` | `MainLayout` | Wraps with `LayoutProvider` |

### `sidebar.config.ts` shape

```ts
export type SidebarNavItem = {
  label: string;
  to: string;
  icon: NavIcon;
  description?: string;   // used by HomePage quick-access cards
};

export const sidebarNavItems: SidebarNavItem[] = [ /* … */ ];
export const SIDEBAR_WIDTH = 252;
export const SIDEBAR_COLLAPSED_WIDTH = 88;
```

### `useLayout` state

```ts
{
  isCollapsed: boolean;
  isMobileOpen: boolean;
  isDesktop: boolean;
  toggleSidebar: () => void;
  closeMobileSidebar: () => void;
}
```

Desktop breakpoint: `theme.breakpoints.up("lg")`.

### Visual design system (layout shell)

Apply these rules in `MainLayout`, `Sidebar`, `Header`, and auth pages. Use tokens from `core/theme/brand.ts` — never hardcode product colors in feature code.

| Element | Treatment |
|---------|-----------|
| **Page backdrop** | Fixed full-viewport ambient gradients + subtle dot grid (`pointerEvents: "none"`) |
| **Shell padding** | Desktop (`lg+`): outer padding ~18px, gap between panels = `SHELL_GAP` (14px) |
| **Sidebar** | Glass panel: semi-transparent white, soft border, large radius (`SHELL_RADIUS` ≈ 28px); collapsible rail on desktop, drawer on mobile |
| **Header** | Frosted bar (`SHELL_HEADER_HEIGHT` ≈ 72px); page title derived from current route / sidebar config; user chip with `displayName` from `useAuthMe()` |
| **Main canvas** | Glass content area with `Outlet`; mobile: edge-to-edge, desktop: rounded card with blur + inset highlight |
| **Active nav item** | Gradient pill background; icons fixed size (22px); avoid `translateX` / extra `backdropFilter` on icon containers (causes blur) |
| **Logout** | Bottom of sidebar; dashed border button; calls `useSignOut()`; show loading + inline error on API failure |
| **Auth page** | Split layout via `AuthPageShell`: brand panel (gradient headline accent) + form card |

**`layout.tokens.ts`:**

```ts
export const SHELL_HEADER_HEIGHT = 72;
export const SHELL_RADIUS = 28;
export const SHELL_GAP = 14;
```

---

## 10. UI component catalog (`components/ui/`)

All exported from `@/components/ui`. **No domain knowledge** inside these components.

### `page/`

| Component | Props | Use |
|-----------|-------|-----|
| `PageHeader` | `title`, `description?`, `action?` | Top of list/detail pages |
| `PageState` | `isLoading?`, `isError?`, `error?`, `children` | Loading spinner / error alert wrapper |
| `AuthPageShell` | `brandHeadline`, `brandSubheadline?`, `brandFooterLabel?`, `children` | Login full-screen split layout |
| `AuthPageMobileBrand` | — | Logo row on small screens |
| `AuthPageGradientText` | `children` | Gradient headline accent |

### `buttons/`

| Component | Notes |
|-----------|-------|
| `Button` | Extends MUI; supports `loading` prop |
| `ActionButtons` | Primary + optional secondary (form footers) |

### `form/`

| Component | Notes |
|-----------|-------|
| `FormWrapper` | Card/title around a form |
| `FormSection` | Titled field group inside `ResourceForm` |
| `FormRelatedSection` | Below-form area for linked resources (FAQ, contacts, …); optional `layout="grid"` |
| `FormRelatedRow` | Stack layout row: title, description, action (default `layout="stack"`) |
| `FormRelatedCard` | Glass card for grid layout: icon, title, description, action; optional `disabled` for muted state |
| `ResourceForm` | Renders `TFormFieldConfig[]` by section + submit/cancel; supports `renderSectionFooter`, `onValuesChange` |
| `fields/*` | `TextField`, `NumberField`, `TextAreaField`, `SelectField`, `MultiSelectField`, `TagsField`, `BooleanField`, `ColorField`, `ReadonlyField`, `ReadonlyBooleanField` |

### `table/`

| Component | Notes |
|-----------|-------|
| `DataTable` | Generic typed table; edit link + delete confirm; pagination optional |

### `dialog/`

| Component | Notes |
|-----------|-------|
| `ConfirmDialog` | Title, message, confirm/cancel, `isPending` |
| `AppDialog` | Generic modal shell: title, description, optional toolbar/footer, close button |

### Shared types

```ts
// shared/types/table.type.ts
type TTableColumn<T> = { id; label; align?; width?; minWidth?; render?(row: T) => ReactNode };
type TTableRowAction<T> = { edit?: { getPath, label? }; delete?: { confirmTitle, confirmMessage, onConfirm } };

// shared/types/form.type.ts
type TFormFieldConfig = { type; name; label; required?; section?; layout?; grid?; options?; min?; max?; helperText?; maxLength?; searchable?; variant? };
// field types: "text" | "number" | "textarea" | "select" | "multiselect" | "tags" | "boolean" | "color"
```

### Related management on edit forms

On **edit** pages, secondary resources (FAQ categories, contacts, integrations) often live **outside** the main `ResourceForm` in a `FormRelatedSection` below the submit buttons.

| Layout | Component | Use |
|--------|-----------|-----|
| `layout="stack"` (default) | `FormRelatedRow` | Simple title + description + action button |
| `layout="grid"` | `FormRelatedCard` | Responsive card grid (`auto-fit`, min 240px); glass styling aligned with `HomePage` quick-access cards |

Each card: gradient icon badge, title, status description, full-width action button. Use `disabled` on the card when the feature is off server-side (muted icon, no hover lift, outlined button).

**Gated configuration:** when a toggle on the main form enables a sub-resource (e.g. smart locks), gate the config dialog on the **saved** server flag — not the unsaved form draft. If the user clicks configure while disabled, show an **info dialog** (Italian copy) explaining: enable the toggle in its dedicated form section → click the main form **Aggiorna** → return to configure. Reference: `features/building/components/BuildingForm.tsx`, `BuildingSmartLocksInfoDialog.tsx`.

Put feature toggles that control sub-resources in a **dedicated `ResourceForm` section** (not mixed into generic “Configurazione”), with `helperText` on the boolean field.

### Sub-resource PATCH endpoints

When create/update payloads differ from nested config, use **separate endpoints** and request DTOs:

| Pattern | Example |
|---------|---------|
| Main update | `PUT /api/bo/v1/<resources>/:id` with `<Resource>UpdateRequestDto` |
| Nested config | `PATCH /api/bo/v1/<resources>/:id/<sub-resource>` with `<SubResource>RequestDto` |

Implement plain calls in `api.ts`, mutations + toasts in `hooks/index.ts`, config UI in a **dialog** with its own submit (not the main form). Invalidate `detail` + list keys on success.

Conditional fields in the config dialog: derive visible fields from a provider/type select; mutually exclusive options send empty strings for the inactive provider's fields.

---

## 11. Theme & branding

### `core/theme/brand.ts`

Export a `const` object with semantic color tokens (primary, surface, border, text variants). **No MUI imports** — pure values.

### `core/theme/index.ts`

```ts
import { createTheme } from "@mui/material/styles";
import { brand } from "./brand";

export const theme = createTheme({
  palette: { primary: { main: brand.primary }, /* … */ },
  shape: { borderRadius: 10 },
  typography: { fontFamily: "…", h5: { fontWeight: 600 } },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
  },
});
```

Use `brand` tokens in layout shell pages for consistency.

---

## 12. Icons (`shared/icons/index.tsx`)

- Export `NavIcon = ComponentType<SvgIconProps>`.
- Wrap MUI `SvgIcon` with inline `<path>` — no `@mui/icons-material` required (smaller bundle control).
- Minimum set: `MenuIcon`, `AddIcon`, `EditIcon`, `DeleteIcon`, `LogoutOutlinedIcon`, plus one icon per sidebar item.

---

## 13. Naming conventions

### DTOs (`model.ts`)

Every resource exposes **exactly three** API-facing DTO names:

| Suffix | Role | API usage |
|--------|------|-----------|
| `ListDto` | One item inside `rows` | `GET /…` list → `TApiListResponse<<Resource>ListDto>` |
| `SingleDto` | Detail resource | `GET /…/:id` response body |
| `RequestDto` | Write payload | `POST` / `PUT` (and `PATCH` when used) body |

**Rules**

- Do **not** add `ListResponseDto`, `CreateDto`, `UpdateDto`, or other `*Dto` variants for the same resource.
- List envelopes (`{ rows, totalRows }`) are typed once in `core/api/api.type.ts` as `TApiListResponse<T>` — pass `<Resource>ListDto` as `T`.
- When list row and detail share the same shape, alias: `export type <Resource>SingleDto = <Resource>ListDto`.
- When detail adds fields, extend: `export interface <Resource>SingleDto extends <Resource>ListDto { … }`.
- Nested/value objects (e.g. localized `{ en, it }`) may use a shared helper type such as `LocalizedTextDto`; they are **not** `ListDto` / `SingleDto` / `RequestDto`.
- Form state mirrors writes: `export type <Resource>FormValues = <Resource>RequestDto`.
- When **PUT/PATCH body differs from POST** (extra fields, omitted fields), add `<Resource>UpdateRequestDto` and `<Resource>UpdateFormValues` — still no mappers in `model.ts`. Read-only single fields (e.g. `code`) stay on `SingleDto` only; show with `ReadonlyField`, exclude from update payload.
- Nested read objects on `SingleDto` (e.g. `smartLocks`) may have their own `<Nested>RequestDto` for a dedicated PATCH — see **Sub-resource PATCH** in §10.
- Do **not** add DTO↔form mapper functions in `model.ts` — map inline in form components (§10).
- Backend numeric enums: define `enum` + `Record<Enum, string>` label map in `model.ts` **only when the user or API spec provides the values** — never guess labels or codes.
- Do **not** add per-feature formatters (`format*Status`, `format*Date`, `*FullName`, etc.) — use enum label maps and `@/shared/utils/date`.

**Example (`faq-category`)**

```ts
export interface FaqCategoryListDto {
  id: number;
  name: { en: string; it: string };
}

export type FaqCategorySingleDto = FaqCategoryListDto;

export interface FaqCategoryRequestDto {
  name: { en: string; it: string };
}
```

### General naming

| Item | Pattern | Example |
|------|---------|---------|
| Feature folder | lowercase singular/plural | `order/`, `users/` |
| List page | `<Resource>Page.tsx` | `OrderPage.tsx` |
| Detail page | `<Resource>View.tsx` | `OrderView.tsx` |
| API file | `api.ts` | endpoints, keys, plain calls |
| Hooks file | `hooks/index.ts` | `use<Resources>List`, `useCreate<Resource>`, … |
| Model file | `model.ts` | |
| Local UI store | `store.ts` | |
| Routes file | `routes.ts` | `orderPaths`, `orderRoutes` |
| List DTO | `<Resource>ListDto` | `FaqCategoryListDto` |
| Detail DTO | `<Resource>SingleDto` | `FaqCategorySingleDto` |
| Write DTO | `<Resource>RequestDto` | `FaqCategoryRequestDto` |
| Update DTO (when PUT body ≠ POST) | `<Resource>UpdateRequestDto` | `BuildingUpdateRequestDto` |
| Sub-resource write DTO | `<SubResource>RequestDto` | `BuildingSmartLocksRequestDto` |
| Form values | `<Resource>FormValues` | `FaqCategoryFormValues` |
| Query keys | `<resources>Keys` | `ordersKeys` |
| List hook | `use<Resources>List` | `useOrdersList` |
| Detail hook | `use<Resource>Detail` | `useOrderDetail` |
| Create hook | `useCreate<Resource>` | `useCreateOrder` |
| Endpoint const | `<RESOURCES>_ENDPOINT` | `ORDERS_ENDPOINT` |
| Route base | `<RESOURCE>_ROUTE_BASE` | `"orders"` |

---

## 14. TypeScript & React rules

### Event types (React 19 — do not use deprecated types)

| Handler | Use | Avoid |
|---------|-----|-------|
| Form `onSubmit` | `SubmitEvent<HTMLFormElement>` | `FormEvent`, `FormEventHandler` |
| Input `onChange` | `ChangeEvent<HTMLInputElement>` | — |

```tsx
import { type SubmitEvent, type ChangeEvent } from "react";

const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault();
};
```

### Imports

- `import { type Foo } from "…"` for type-only imports (`verbatimModuleSyntax`).
- Barrel exports: `@/components/ui`, `@/shared/hooks`, `@/shared/icons`.

### ESLint

- `react-refresh/only-export-components` — component files export components only.
- Split context/hooks into `.ts` files when needed.

---

## 15. UI copy guidelines

Configure per project in a single place (document in README or `app` constants):

- Choose **one UI language** for labels, buttons, errors, empty states.
- Keep **product/domain terms** consistent (some teams keep resource names in English, UI chrome in another language).
- Sidebar `label` + optional `description` drive both navigation and home quick-access cards.

---

## 16. Routing summary

| Path | Page | Layout |
|------|------|--------|
| `/login` | `LoginPage` | Full-screen |
| `/` | `HomePage` | `MainLayout` |
| `/<resources>` … | feature pages | `MainLayout` |
| unknown authenticated path | `NotFoundPage` | `MainLayout` (`*`) |

Unauthenticated access to protected paths → redirect `/login`.

---

## 17. Agent bootstrap order

When generating a **new** backoffice from this spec, create files in this order:

### Phase A — Scaffold

1. `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `index.html`
2. `core/config`, `core/store/query-client.ts`, `core/api/api.type.ts`, `core/api/client.ts`
3. `core/theme/brand.ts`, `core/theme/index.ts`
4. `core/notifications/*` + wire `NotificationProvider` in `app/providers/app-providers.tsx`
5. `shared/types`, `shared/utils/object.ts`, `shared/hooks/*`, `shared/routing/create-resource-routes.tsx`
6. `shared/icons/index.tsx`

### Phase B — UI kit

7. `components/ui/buttons`, `form`, `dialog`, `table`, `page` (including `AuthPageShell`)
8. Barrel `components/ui/index.ts`

### Phase C — Auth & app shell

9. `core/api/auth.ts`
10. `app/auth.ts`, `auth-guard.tsx`, `providers/*`, `App.tsx`, `main.tsx`
11. `app/pages/LoginPage.tsx`, `HomePage.tsx`, `NotFoundPage.tsx`
12. `app/routes/app-routes.tsx`, `protected-routes.tsx`

### Phase D — Layout

13. `components/layout/layout.context.ts`, `layout.store.tsx`, `layout.tokens.ts`
14. `components/layout/sidebar/sidebar.config.ts`, `Sidebar.tsx`, `SidebarLogout.tsx`
15. `components/layout/header/Header.tsx`, `main/MainLayout.tsx`

### Phase E — Reference feature

16. `features/<resource>/model.ts`, `api.ts`, `hooks/index.ts`, `store.ts`, `routes.ts`
17. `features/<resource>/components/*`, `<Resource>Page.tsx`, `<Resource>View.tsx`
18. Register routes + sidebar entry

### Phase F — Verify

```bash
pnpm install
pnpm build
pnpm lint
```

---

## 18. Do / do not

### Do

- Keep pages thin; put server logic in hooks; map DTOs to form state in form components.
- Invalidate query keys after mutations.
- Show success/error toasts from feature `hooks/` mutation hooks via `notify` + `getErrorMessage`.
- Use `PageState` for loading/error wrappers on data pages.
- Use `multipartClient` for file uploads.
- Centralize 401 handling in `apiClient` interceptor.
- Gate create/sort (or other admin-only actions) in the page with `useAuthMe()` and a numeric role constant from the users/auth contract; hide the controls rather than leaving them clickable toward a guaranteed 403.
- Prefer `getErrorMessage` for 403 and `errorCode` copy; keep 401 handling in the Axios interceptor only.
- Use path helpers (`<resource>Paths.edit(id)`) in tables and links — never hardcode URL strings in components.
- Format dates with `formatDateTime` / `formatDate` from `@/shared/utils/date`.
- Show boolean values with `ReadonlyBooleanField` (forms/detail) or `BooleanIndicator` (tables) — default **switch**.
- Use shared `ReadonlyField` for read-only text in detail views — responsive grid via `getGridWrapperSx` (`xs: 12`, `sm/md: 6` by default).
- Use `FormRelatedSection` + `FormRelatedCard` (grid) or `FormRelatedRow` (stack) for linked resources on edit forms; gate sub-resource config dialogs on saved server state.

### Do not

- Put React Query in `shared/hooks`.
- Call `apiClient` directly from feature components (use `hooks/` instead; exception: auth page using auth hooks).
- Store server data in `features/*/store.ts`.
- Import one feature from another feature's internals.
- Export hooks from `.tsx` files that also export components.
- Use deprecated React 19 event types.
- Confuse API HTTP errors with route-level `NotFoundPage`.
- Set global `anchorOrigin` in `notify.ts` — it overrides `NotificationProvider` defaults.
- Add toast calls scattered in form/table components when the mutation hook can own them.
- Add a global Axios interceptor that toasts on 403 (duplicates hook `onError`).
- Open sub-resource config dialogs when the parent feature toggle is off on the server — show an info dialog with Italian instructions instead.
- Add `map*SingleToFormValues`, `map*FormToDto`, or other DTO↔form conversion helpers in `model.ts` — map inline in the form component instead.
- Invent enums, status labels, or display/format helpers without explicit user or backend specification.
- Add per-feature date or status formatters — use `shared/utils/date.ts` and enum label maps in `model.ts`.
- Render boolean values as `Sì` / `No` text — use Switch or Checkbox (`ReadonlyBooleanField`, `BooleanIndicator`, `BooleanField`).

---

## 19. Optional extensions

| Need | Where to add |
|------|----------------|
| i18n | `shared/i18n/` + wrap app; replace hardcoded strings |
| Role-based nav | Filter `sidebarNavItems` by permissions from `useAuthMe()` |
| Breadcrumbs | `components/layout/header/` or `components/ui/page/` |
| Second API base URL | Additional axios instance in `core/api/client.ts` |
| E2E tests | `e2e/` at repo root (Playwright/Cypress) — out of scope for initial scaffold |

---

## 20. Minimal `main.tsx`

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/app/App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

---

---

## 21. Agent prompt template

When starting a new project, give the agent:

```
Read REACT.md in full. Scaffold a complete backoffice SPA following every section:
- Stack: Node 22 (.nvmrc + .node-version), React 19, TS, Vite 8, MUI 7, TanStack Query 5, React Router 7, Axios, notistack, pnpm
- Implement all layers: app shell, auth, layout (glass sidebar/header), UI kit, notifications, one reference CRUD feature
- UI language: <locale>
- Product name: <Product>
- Brand colors: <primary>, <surface>, …
- First resource: <Resource> at /<resources> with fields: <field list>
- API base: VITE_API_BASE_URL=<url>
- Auth endpoints: POST /api/auth/signin, POST /api/auth/logout, GET /api/auth/me
Do not skip files. Include .nvmrc and .node-version. Run pnpm build && pnpm lint when done.
```

---

## 22. File inventory checklist

Use this to verify nothing is missing after scaffold:

- [ ] `.nvmrc`, `.node-version` (identical Node major, e.g. `22`)
- [ ] `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- [ ] `eslint.config.js`, `index.html`, `.env.example`
- [ ] `src/main.tsx`, `src/App.tsx` (or `src/app/App.tsx`), `src/index.css`, `src/vite-env.d.ts`
- [ ] `src/app/auth.ts`, `auth-guard.tsx`, `providers/*`, `routes/*`, `pages/*`
- [ ] `src/core/api/client.ts`, `auth.ts`, `api.type.ts`, `config/index.ts`, `store/query-client.ts`, `theme/*`, `notifications/*`
- [ ] `src/shared/hooks/*`, `shared/types/*`, `shared/utils/object.ts`, `shared/routing/*`, `shared/icons/*`
- [ ] `src/components/ui/**` (buttons, dialog, form/fields, page, table) + barrel `index.ts`
- [ ] `src/components/layout/**` (context, store, tokens, main, sidebar, header)
- [ ] `src/features/<resource>/**` (page, view, api, model, store, routes, components)
- [ ] `src/assets/` (logo SVG/PNG referenced by sidebar + auth shell)

---

*This blueprint describes structure and behavior, not a specific product. Substitute placeholders, apply project branding in `core/theme/brand.ts`, and implement domain DTOs to match your backend OpenAPI.*
