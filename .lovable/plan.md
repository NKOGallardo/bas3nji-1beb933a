# BAS3NJI WORLD — Luxury Streetwear Brand Site

Rebuild the current app as a black / white / deep-red luxury streetwear brand site with a lookbook, featured collections, and WhatsApp-based ordering. Keep the existing Supabase auth wiring so users can log in.

## Brand system

- **Colors**: Black `#000000`, White `#FFFFFF`, Accent Red `#B11226`. Red used only for active nav, CTAs, hover, links, badges, small accents.
- **Typography**: Bold luxury sans (display: a heavy modern sans e.g. `Archivo Black` / `Anton` pairing; body: `Inter` for cleanliness). Wide letter-spacing on headings and logo.
- **Logo**: Custom text mark `BAS3NJI` — clean bold sans, generous tracking, the `J` tilted ~10° to the right. Rendered inline as SVG so it scales everywhere. White on dark, black on light.
- **Favicon**: The tilted `J` alone as an SVG favicon (black mark on transparent + white version for dark UA).
- **Feel**: Editorial magazine layout, fullscreen sections, cinematic scroll, minimal chrome, premium micro-interactions (Framer Motion).

## Pages / routes

Top-level public routes (replace expense app routes):

- `/` — Home
  - Fullscreen hero (huge BAS3NJI wordmark, tilted J, background video/photo slot, red CTA "Shop the Drop" → jumps to collection)
  - 3D animated mark (lightweight — CSS/Framer 3D transform on the J, no Three.js) — subtle rotate/parallax on scroll
  - Featured collection strip
  - Brand story preview (short editorial block + link to `/about`)
  - Lookbook preview grid (link to `/lookbook`)
  - Featured products (3–6 cards, WhatsApp CTA per item)
  - Instagram preview grid (static tiles for now, easy to swap for real feed later)
  - Newsletter / CTA band
- `/collections` — All collections (editorial index)
- `/lookbook` — Fullscreen editorial gallery
- `/about` — Brand story, values, imagery
- `/contact` — Contact + socials + WhatsApp
- `/login` — Supabase email/password + Google login (keep existing auth); on success → `/account`
- `/account` — Simple protected page: user email, sign out. Foundation for future orders/wishlist.

Remove all expense-app routes and components (`/expenses`, `/reports`, `/trips`, `/admin/*`, `/finance/*`, `/approvals`, `/dashboard`, `/ask-ai`, `/policies`, `/profile`, `SubTabs`, `DarkVeil`, expense server fns, etc.).

## WhatsApp checkout

- Single env constant `VITE_WHATSAPP_NUMBER` (I'll add via `add_secret` if user wants it configurable, else hardcode a placeholder they can change).
- Every product card + CTA opens `https://wa.me/{number}?text=<url-encoded pre-filled message>` in a new tab, message includes product name, size selection, and price.
- No cart, no Stripe — pure WhatsApp funnel per user's ask.

## Login → Supabase

- Keep `src/integrations/supabase/client.ts` and auth-attacher — do not touch.
- Simplify `/login` to a luxury-styled email/password + Google button page.
- Successful login navigates to `/account`.
- `/account` is under a slim `_authenticated` layout (the existing one is preserved but its children are deleted; add only `_authenticated/account.tsx`).

## Components

- `<Logo />` — SVG wordmark with tilted J, size + color props.
- `<Nav />` — fixed top, minimal (logo left, links right, red dot on active). Mobile: fullscreen overlay menu.
- `<Hero />`, `<FeaturedCollection />`, `<BrandStory />`, `<LookbookPreview />`, `<FeaturedProducts />`, `<InstagramPreview />`, `<Footer />`.
- `<ProductCard />` with WhatsApp CTA.
- `<TiltedJ3D />` — animated 3D-feeling J using CSS transforms + Framer Motion (parallax on scroll, subtle rotate on hover).

## Assets

- Generate a handful of high-fashion editorial placeholder images (streetwear model shots, product flats, lookbook stills) with `imagegen` (standard quality) — moody, high-contrast, black/white/red aesthetic. Upload via `lovable-assets`.
- Generate custom favicon SVG (tilted J).

## Metadata / SEO

- Update `__root.tsx` head: title "BAS3NJI WORLD — Luxury Streetwear", matching description, OG image = hero shot, theme-color `#000000`.
- Replace PWA manifest name/icons.

## Cleanup

- Delete unused expense routes + `src/lib/*expenses*`, `*reports*`, `*policy*`, `xlsx-export`, admin fns, DarkVeil, SubTabs, PhoneInput, DepartmentSelect, InstallHint.
- Keep: supabase integration, `_authenticated` layout shell, `use-auth`, `cn`, sonner Toaster.
- Do NOT touch the database — existing tables can stay unused for now (future: `products`, `collections` when the user is ready).

## Technical notes

- All motion via `framer-motion` (already installed).
- All routing via TanStack Start file-based routes in `src/routes/`.
- Styling in `src/styles.css` — swap emerald tokens to red, background to pure black, foreground white.
- No Three.js — 3D feel comes from layered SVG + CSS `transform: perspective()` + scroll-linked motion.
- WhatsApp number: I'll ship with a placeholder `+1 555 000 0000` and ask the user to provide the real one after — no secret needed since the number is public.

## Deliverable order

1. Update design tokens + fonts + head metadata + favicon
2. Build `<Logo />`, `<Nav />`, `<Footer />`
3. Home page with all sections + generated imagery
4. Collections, Lookbook, About, Contact
5. Login + Account
6. Delete old expense code
7. Verify build + screenshot the home page
