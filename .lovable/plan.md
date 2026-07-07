# Migrate to React + Vite + Plain CSS

Rebuild the site on a vanilla Vite + React 18 SPA. Remove TanStack Start, TanStack Router, TanStack Query, Tailwind, and the Cloudflare/SSR wrapper. Keep every visual and every page identical — Hero, Featured Collection, Brand Story, Lookbook, Featured Products, Instagram, Collections, Lookbook page, About, Contact, Login, Account. Keep Supabase auth (client-side only).

## New stack

- **Build:** Vite 5 + `@vitejs/plugin-react` (SPA, no SSR)
- **Routing:** `react-router-dom` v6 (`BrowserRouter`)
- **Styling:** Plain CSS only. One global `src/styles/global.css` for tokens/reset/typography, plus one co-located `Component.css` per component/page. No Tailwind, no `@apply`, no utility classes.
- **Animation:** keep `framer-motion` (it's just a React lib, not framework-specific)
- **Auth:** existing `@supabase/supabase-js` client, called directly from React (no server functions, no auth middleware)
- **Icons:** keep `lucide-react`

## What gets deleted

- `@tanstack/*` packages, `@lovable.dev/vite-tanstack-config`, `@cloudflare/vite-plugin`, `wrangler`, `tailwindcss`, `@tailwindcss/vite`
- `src/routes/`, `src/routeTree.gen.ts`, `src/router.tsx`, `src/start.ts`, `src/server.ts`, `wrangler.jsonc`
- `src/integrations/supabase/{auth-attacher,auth-middleware,client.server}.ts` (server-only pieces)
- `src/lib/error-capture.ts`, `src/lib/error-page.ts`
- `src/styles.css` (Tailwind entry) → replaced by `src/styles/global.css`
- `components.json`, shadcn config (unused after migration)

## What gets created

```
index.html
src/
  main.tsx              # ReactDOM.createRoot + <BrowserRouter>
  App.tsx               # <Routes>: /, /collections, /lookbook, /about, /contact, /login, /account
  styles/
    global.css          # :root tokens (--color-blood, --font-display), reset, typography, utilities
    fonts.css           # Archivo Black + Inter via @fontsource
  components/
    Nav.tsx  + Nav.css
    Footer.tsx + Footer.css
    Logo.tsx + Logo.css
    ProductCard.tsx + ProductCard.css
    TiltedJ3D.tsx + TiltedJ3D.css
    ProtectedRoute.tsx  # redirects to /login if no session
  pages/
    Home.tsx + Home.css
    Collections.tsx + Collections.css
    Lookbook.tsx + Lookbook.css
    About.tsx + About.css
    Contact.tsx + Contact.css
    Login.tsx + Login.css
    Account.tsx + Account.css
  hooks/use-auth.ts      # thin wrapper around supabase.auth.onAuthStateChange
  lib/whatsapp.ts        # unchanged
  integrations/supabase/client.ts   # unchanged (client-side publishable key)
vite.config.ts           # plain @vitejs/plugin-react + path alias @
tsconfig.json            # keep strict TS, drop TanStack refs
```

## Styling conventions (plain CSS)

- Design tokens on `:root` in `global.css`:
  ```css
  :root {
    --color-bg: #000;
    --color-fg: #fff;
    --color-blood: #B11226;
    --font-display: "Archivo Black", system-ui, sans-serif;
    --font-body: "Inter", system-ui, sans-serif;
    --tracking-luxe: 0.3em;
    --tracking-brand: 0.05em;
  }
  ```
- Every component imports its own `.css` file. Class names are namespaced: `.nav`, `.nav__link`, `.nav__link--active` (BEM). No global class collisions.
- Responsive via CSS media queries inside each component's CSS.
- Head metadata set via a small `useDocumentHead(title, description)` hook (updates `document.title` and og tags on route change) — no `react-helmet` dependency.

## Auth flow

- `useAuth()` subscribes to `supabase.auth.onAuthStateChange` and exposes `{ user, loading, signIn, signUp, signInWithGoogle, signOut }`.
- `/login` calls `supabase.auth.signInWithPassword` / `signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/account' } })`.
- `/account` wrapped in `<ProtectedRoute>` — if `!user && !loading` → `<Navigate to="/login" replace />`.
- SPA-safe: `public/_redirects` with `/* /index.html 200` so deep links work on Lovable hosting.

## Config

- `vite.config.ts`: `defineConfig({ plugins: [react()], resolve: { alias: { '@': '/src' } }, server: { host: '::', port: 8080 } })`
- `index.html`: `<title>BAS3NJI WORLD — Luxury Streetwear</title>`, meta description, og tags, favicon, manifest link, `<div id="root">`, `<script type="module" src="/src/main.tsx">`.

## Verification

After the migration I'll run the dev server, screenshot `/`, `/lookbook`, `/login` in headless Chromium, and confirm the build passes and Supabase login still works end-to-end.

## Trade-offs (surfaced up-front)

- **No SSR** → slower first paint, weaker SEO for crawlers that don't run JS (Google is fine, most others aren't). Every page is client-rendered.
- **No server functions** → any future feature needing secrets (Stripe, admin operations) will have to be added back via Supabase Edge Functions or a separate backend.
- **Bigger initial JS bundle** → no route-level code splitting out of the box (I'll add `React.lazy` per page to compensate).

Reply "approve" to proceed, or tell me what to change.
