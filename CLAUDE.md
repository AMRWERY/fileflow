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

Requires a `.env` with Supabase credentials (`SUPABASE_URL`, `SUPABASE_KEY`, and service-role key) — `@nuxtjs/supabase` reads these at startup.

## Stack

Nuxt 4 (Vue 3, `<script setup>` + TS), Pinia, Tailwind 3 (+ RTL), `@nuxtjs/supabase`, `@nuxt/icon` (Iconify), vee-validate. Supabase is the entire backend: Postgres, Auth, Storage, Realtime.

## Architecture

**`srcDir` is `app/`** (Nuxt 4 default). Nitro server routes live in `server/` at the repo root, *outside* `app/`.

### Supabase access — two distinct clients
This is the most important distinction in the codebase:
- **User/RLS client** — respects row-level security, scoped to the signed-in user. Client-side via `useSupabaseClient()`; server-side via `useServerSupabase(event)` (`app/utils/supabase.ts`), which also enforces auth and returns `{ client, user }`.
- **Service-role client** — *bypasses RLS*, server-only, for admin/privileged ops (e.g. creating buckets, cross-user writes). Via `serverSupabaseServiceRole()` / `useServerSupabaseAdmin(event)`.

Every protected API route must start with `requireAuth(event)` (or `useServerSupabase`), which throws a 401. Note `user.sub` (JWT) is the user id server-side, while the client uses `user.id`. `filesStore.resolveAuthUserId()` exists because `useSupabaseUser()` can lag hydration — reuse that pattern rather than reading `user.value.id` directly.

Route protection is declarative in `nuxt.config.ts` `supabase.redirectOptions`: unauthenticated users redirect to `/auth/login`; `['/auth/*', '/confirm', '/share/*']` are public. There is **no `app/middleware/`** — do not add per-page auth middleware; extend the config exclude list instead.

### Auth stores (domain-split)
Auth is split into three Pinia stores under `app/stores/auth/`, re-exported through the `app/composables/useAuth.ts` barrel:
- `session.ts` → `useAuthSessionStore` — login, signUp, Google OAuth, logout, `isAuthenticated`.
- `profile.ts` → `useAuthProfileStore` — hydrates the `profiles` row, `storagePercentage`.
- `password.ts` → `useAuthPasswordStore` — reset/change password flow (in active development on the `auth` branch).
- `_errors.ts` — `formatAuthError()` maps raw Supabase error strings to user-friendly copy. Route all auth errors through it.

Stores are setup-style (`defineStore(id, () => {...})`) and cross-call each other directly (e.g. session `login` calls `useAuthProfileStore().fetchProfile()`). Note they redeclare `useSupabaseClient`/`useSupabaseUser` with `declare function` at the top — this is a deliberate TS workaround for auto-imports; keep it when adding new stores here.

### Database
`docs/DATABASE.md` is the **source of truth** for schema, RLS policies, triggers, storage buckets, and migration order. TS interfaces in `app/types/database.types.ts` mirror it — keep the two in sync when schema changes. Key model: `profiles` (1:1 with `auth.users`, auto-created by trigger), `folders` (materialized `path` for subtree queries, soft-delete cascade), `files` (soft-delete to trash), plus versions/tags/shares/team-spaces/activity-logs.

> ⚠️ Known inconsistency: `docs/DATABASE.md` names the main storage bucket `files`, but `server/api/files/upload.post.ts` uses `user-files`. Verify the actual bucket before touching upload/download code.

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
