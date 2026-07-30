# Architecture

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [HANDOVER.md](./HANDOVER.md) · [PRD.md](./PRD.md) · [Rules.md](./Rules.md) · [Phases.md](./Phases.md) · [Design.md](./Design.md) · [Memory.md](./Memory.md) · [SETUP.md](./SETUP.md) · [DATABASE.md](./DATABASE.md)

---

## 1. Overview

This is a **Next.js App Router** marketing site with a **Supabase-backed CMS**. The same codebase serves three brand surfaces (Main, Kids, Institute) and a staff admin panel.

```
┌─────────────┐     ┌──────────────────────┐     ┌─────────────────┐
│   Browser   │────▶│  Next.js (Vercel)    │────▶│    Supabase     │
│  (public /  │◀────│  App Router + API    │◀────│  Auth · DB ·    │
│   admin)    │     │  RSC + Client UI     │     │  Storage        │
└─────────────┘     └──────────────────────┘     └─────────────────┘
                              │
                              ▼
                    WhatsApp (wa.me) · Maps embeds
```

**Design principles**

| Principle | How it shows up |
|-----------|-----------------|
| Dual brand, one deploy | `/`, `/op-kids`, `/institute` + brand mode provider |
| CMS without deploys | Admin CRUD → Supabase tables / `media` bucket |
| Survive DB outages | `src/data/*` static fallbacks via `public-data.ts` |
| Convert to chat | Forms save to `queries`, then open WhatsApp |
| Admin is separate chrome | `SiteChrome` skips Navbar/Footer on `/admin` |

---

## 2. System context

| Actor | Talks to | Purpose |
|-------|----------|---------|
| Parent / student | Public pages + forms | Discover brands, enquire |
| Staff | `/admin/*` | Manage content & leads |
| Next.js server | Supabase (anon key + user session) | Read/write via RLS |
| Middleware | Supabase Auth cookies | Gate `/admin` routes |

**Not in the system today:** transactional email, analytics SDKs, payment gateways, Maps API keys (embeds only).

---

## 3. Tech stack

| Layer | Technology |
|-------|------------|
| Runtime / UI | Next.js 16, React 19, TypeScript |
| Styling / motion | Tailwind CSS 3.4, Framer Motion, Lucide |
| Forms | React Hook Form, Zod, `@hookform/resolvers` |
| Data / auth / files | Supabase JS + `@supabase/ssr` |
| Theme | `next-themes` |
| Images | `next/image` + `sharp`; remotes: Unsplash, `*.supabase.co` |
| Hosting (intended) | Vercel |

---

## 4. Repository layout

```
src/
├── app/                    # Routes (App Router)
│   ├── page.tsx            # Main dual-brand home
│   ├── about|courses|faculty|gallery|events|admissions|contact/
│   ├── op-kids/            # Kids world
│   ├── institute/          # Institute world
│   ├── admin/              # CMS (login, CRUD pages)
│   ├── api/enquiry/        # POST enquiry API
│   ├── layout.tsx          # Root: fonts, providers, SiteChrome
│   ├── sitemap.ts / robots.ts
│   └── globals.css
├── components/
│   ├── admin/              # Sidebar, CrudManager, forms, cropper
│   ├── forms/              # Contact + Admission + honeypot
│   ├── layout/             # Navbar, Footer, announcements, floating CTAs
│   ├── providers/          # Theme, SiteConfig, SiteBrand
│   ├── sections/           # Marketing sections
│   └── ui/                 # Primitives, motion helpers
├── data/                   # Static fallback content + siteConfig
└── lib/
    ├── supabase/           # client, server, middleware, public-data, admin-data
    ├── schemas.ts          # Zod form schemas
    ├── spam-guard.ts       # Honeypot, timing, IP rate limit
    ├── site-brand.ts       # Brand mode + nav link sets
    ├── submit-enquiry.ts   # Client helper → /api/enquiry
    └── whatsapp.ts         # wa.me URL builders

supabase/
├── schema.sql              # Full greenfield schema
├── seed.sql
├── migrations/             # Incremental upgrades
└── README.md

docs/
├── PRD.md
└── Architecture.md         # this file

public/logos/               # Brand logos
```

---

## 5. Request & rendering model

### 5.1 Public pages

1. **Root layout** (`src/app/layout.tsx`) loads `getSiteConfig()` + `getAnnouncements()` on the server.
2. Wraps the tree in `ThemeProvider` → `SiteConfigProvider` → `SiteBrandProvider` → `SiteChrome`.
3. **SiteChrome** renders marketing chrome (announcements, nav, footer, floating buttons) unless path starts with `/admin`.
4. Page components are mostly **Server Components** that fetch via `public-data.ts`, then pass props to **Client** pieces for filters/animation.
5. **`revalidate = 60`** on root layout and key content pages (ISR-style cache ~1 minute).

### 5.2 Admin pages

1. **Middleware** (`src/middleware.ts` → `lib/supabase/middleware.ts`) runs only on `/admin/:path*`.
2. Unauthenticated users hitting protected admin routes → redirect `/admin/login`.
3. Authenticated users on login → redirect `/admin`.
4. **Admin layout** re-checks `getUser()`; if email present, wraps children in `AdminShell` (sidebar).
5. Admin CRUD uses browser Supabase client (authenticated session) and shared `CrudManager`.

### 5.3 Caching & images

- Content: time-based revalidation (~60s).
- `next.config`: AVIF/WebP, long `minimumCacheTTL` for remote images, `optimizePackageImports` for lucide/framer-motion.

---

## 6. Brand architecture

Three **surfaces**, one codebase:

| Mode | Routes / behavior |
|------|-------------------|
| `all` | Main site `/` — both brands |
| `preschool` | `/op-kids` and Kids-filtered nav/content |
| `institute` | `/institute` and Institute-filtered nav/content |

**State:** `SiteBrandProvider` persists mode in `localStorage` + cookie (`site-brand`).  
**Nav:** `getNavLinksForBrand(mode)` in `lib/site-brand.ts`.  
**Announcements:** filtered by `show_on_main` / `show_on_kids` / `show_on_institute`.  
**Content rows:** many tables carry a `brand` or `category` (`preschool` | `institute`).

Faculty category resolution also uses department/subject heuristics in `public-data.ts` when DB values are inconsistent.

---

## 7. Data architecture

### 7.1 Supabase clients (three roles)

| Module | Used where | Auth |
|--------|------------|------|
| `lib/supabase/client.ts` | Browser (login, logout, admin CRUD) | User session cookies |
| `lib/supabase/server.ts` | Server Components, Route Handlers | Cookie-backed SSR client |
| `lib/supabase/public-client.ts` | Public reads in `public-data.ts` | Anon key (no user cookie required) |
| `lib/supabase/middleware.ts` | Edge middleware | Refreshes session; copies cookies on redirects |

### 7.2 Read path (public)

```
Page / Layout
    → getX() in public-data.ts
        → createPublicClient()
        → SELECT from Supabase
        → map rows → app types
        → if empty / error → src/data/* static fallback
```

### 7.3 Write path (admin)

```
Admin UI (CrudManager / SettingsForm / …)
    → browser createClient()
    → INSERT / UPDATE / DELETE (RLS: authenticated)
    → optional upload to Storage bucket `media`
```

### 7.4 Core tables

| Table | Role |
|-------|------|
| `queries` | Contact + admission leads |
| `courses` | Institute programs |
| `faculty` | Teachers |
| `testimonials` | Reviews |
| `events` | Events |
| `gallery` | Images |
| `leadership` | Founder / heads |
| `announcements` | Banner notices |
| `site_settings` | Single-row phones, emails, hours, social |

**Storage:** bucket `media` (public read, authenticated write).

Schema source of truth: `supabase/schema.sql` + `supabase/migrations/`.

---

## 8. Auth architecture

```
Login page
  → signInWithPassword (browser client)
  → hard redirect /admin

Middleware (every /admin/* request)
  → getUser()
  → redirect rules + cookie sync on redirect responses

Logout
  → signOut()
  → hard redirect /admin/login
```

**Rules**

- Public signup should stay **disabled** in Supabase.
- Admin users are created manually in Auth → Users.
- Any authenticated user is treated as full admin (no roles table).
- Admin routes send `robots: noindex`.

Session bugs historically came from soft `router.push` after login/logout and redirects that dropped refreshed cookies — prefer **hard navigations** and **copy cookies onto redirect responses** in middleware.

---

## 9. Enquiry flow

```
ContactForm / AdmissionForm (client)
  → Zod validation
  → POST /api/enquiry  (submit-enquiry helper)
       → honeypot check (fake 200 if tripped)
       → too-fast submit check
       → IP rate limit (in-memory spam-guard)
       → Zod again on server
       → INSERT into queries
  → on success: open WhatsApp with prefilled text
```

Spam logic lives in `lib/spam-guard.ts`. Rate limits are **process-local** (fine for single-instance; not a distributed store).

There is **no email notification** on new leads — staff use `/admin/queries`.

---

## 10. Provider & UI composition

```
<html>
  ThemeProvider                 # light / dark
    SiteConfigProvider          # phones, social, hours from DB/fallback
      SiteBrandProvider         # all | preschool | institute
        SiteChrome
          [public] announcements + Navbar + main + Footer + floating CTAs
          [admin]  children only → AdminLayout → AdminShell
```

Marketing sections under `components/sections/` are composed by page files. Shared admin UX is centered on `CrudManager` + `ImageCropper`.

---

## 11. SEO & crawl surface

| Piece | Behavior |
|-------|----------|
| Metadata | Root layout + per-page titles; OG/Twitter from `siteConfig` |
| `sitemap.ts` | Public marketing URLs (nav + brand homes) |
| `robots.ts` | Allow `/`; disallow `/admin`, `/api/` |
| Canonical URL | `siteConfig.url` (update when custom domain is live) |

---

## 12. Environment & deploy

**Required env**

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

**Deploy shape**

1. Build on Vercel (or Node host): `npm run build` → `npm start`.
2. Set the same env vars in the host.
3. Point custom domain; update `siteConfig.url` in `src/data/site.ts`.
4. Supabase project: run `schema.sql` (or migrations), create admin user, disable public signup.

**Local**

```bash
npm install
cp .env.example .env.local
npm run dev
```

---

## 13. Key flows (quick reference)

### Public content page

Browser → Next.js RSC → `public-data` → Supabase (or static fallback) → HTML + client islands.

### Staff edits a course

Browser (authed) → Supabase REST (RLS) → table update → public pages pick up within ~60s revalidate (or hard refresh).

### Parent submits admission form

Browser → `/api/enquiry` → spam checks → `queries` insert → WhatsApp open → staff sees lead in Admin → Queries.

---

## 14. Extension points

When adding features, prefer these seams:

| Change | Where to plug in |
|--------|------------------|
| New marketing section | `components/sections/` + compose in page |
| New CMS entity | `schema.sql` + migration + admin page + `public-data` mapper + optional `src/data` fallback |
| New form type | `schemas.ts` + `/api/enquiry` branch + admin queries UI |
| New brand surface | `site-brand.ts` + provider + announcement flags |
| Email on enquiry | After successful insert in `api/enquiry/route.ts` |
| Analytics | Root layout (script) — keep admin out of tracking if desired |

---

## 15. Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial architecture from current codebase |
