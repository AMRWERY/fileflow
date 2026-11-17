# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # dev server on http://localhost:3000
npm run build      # production build
npm run generate   # static generation
npm run preview     # preview production build
npm install        # also runs `nuxt prepare` (postinstall) to regenerate .nuxt types
```

There is **no lint, test, or typecheck script** configured. After changing types or module config, run `npm install` (or `nuxt prepare`) to regenerate `.nuxt/`.

The app is currently **fully static — there is no backend**. No `.env` is needed.

## Stack

Nuxt 4 (Vue 3, `<script setup>` + TS), Pinia, Tailwind 3 (+ RTL), `@nuxt/icon` (Iconify), vee-validate. All data is static mock data (`app/data/mock.ts`).

## Architecture

**`srcDir` is `app/`** (Nuxt 4 default). Nitro server routes live in `server/` at the repo root, *outside* `app/`.

### Static data (no backend)
There is no `server/` directory, no API routes and no route-guard. All data comes from `app/data/mock.ts` (`MOCK_USER`, `MOCK_PROFILE`, `MOCK_FOLDERS`, `MOCK_FILES`).
- `useFilesStore` keeps an in-memory copy of the mock tree; create/upload/delete mutate it until reload.
- Auth stores never call a server: a mock user is always signed in, and `login`/`signUp`/`logout` just toggle local state and navigate.
- To reintroduce a backend, swap the store internals; component-facing store APIs were kept stable.

### Auth stores (domain-split)
Three Pinia stores under `app/stores/auth/`, re-exported through the `app/composables/useAuth.ts` barrel:
- `session.ts` → `useAuthSessionStore` — mock `user`, login, signUp, Google (stubbed), logout, `isAuthenticated`.
- `profile.ts` → `useAuthProfileStore` — mock `profiles` row, `updateFullName`, `storagePercentage`.
- `password.ts` → `useAuthPasswordStore` — stubbed reset-password.

Stores are setup-style (`defineStore(id, () => {...})`) and cross-call each other directly.

### Types
`app/types/database.types.ts` holds the TS interfaces for the data model (`Profile`, `Folder`, `FileRecord`, …). There is no database or schema file.

### Components
`nuxt.config.ts` sets `components: [{ pathPrefix: false }]`, so components are referenced by filename regardless of directory (`<FileCard>`, not `<DashboardFileCard>`). Keep filenames unique across `app/components/`.

Reusable primitives live in `app/components/dynamic-components/` prefixed `V*` (`VButton`, `VInput`, `VDialog`, `VForm`, `VToast`, …) — prefer these over raw elements. Feature components are grouped by feature folder (`all-files/`, `team-space/`, `settings/`, `skeleton-loaders/`, etc.).

### Forms & validation
vee-validate is auto-imported (`veeValidate.autoImports`) and configured globally in `app/plugins/vee-validate.ts`. Rules are registered there and messages come from a single `generateMessage` generator that is **i18n-ready** (looks up `auth.*` keys via `$t`, falls back to English). No i18n module is installed yet, so it currently uses the English fallbacks — register new rules and their messages in that plugin.

### Conventions
- Pages set their layout via `definePageMeta({ layout: 'dashboard' })`; layouts are `dashboard.vue` and `default.vue`. Most authenticated pages use `dashboard`.
- Toasts: global singleton `useToast()` (`success`/`error`/`info`/`warning`) — the `<VToast>` list is driven by module-level shared state.
- Dark mode is class-based (`darkMode: 'class'`) and the UI is dark-themed by default; RTL is supported via `tailwindcss-rtl` (use `ms-*`/`me-*` logical utilities).
- Types live in `app/types/`, organized by feature; shared component prop types under `app/types/shared-components/`.
