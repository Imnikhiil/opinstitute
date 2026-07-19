# OP Institute of Studies & OP Kids Pre School

Website for OP Institute of Studies and OP Kids Pre School — dual brand worlds, admin CMS, and enquiry forms.

## Tech stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS + Framer Motion
- Supabase (content, auth, forms)
- React Hook Form + Zod

## Setup

```bash
npm install
cp .env.example .env.local
# Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database

1. Supabase → SQL Editor → run `supabase/schema.sql` (fresh project)
2. Existing project: run any pending files under `supabase/migrations/` (see `supabase/README.md`)
3. Optional: `supabase/seed.sql` for starter content
4. Auth → disable public signups; create admin user manually

## Scripts

```bash
npm run dev      # local development
npm run build    # production build
npm start        # serve build
npm run lint     # ESLint
```

## Project structure

```
src/
├── app/                 # Routes (pages + admin + API)
│   ├── admin/           # CMS dashboard
│   ├── api/enquiry/     # Form submit (spam-guarded)
│   ├── institute/       # Institute world home
│   └── op-kids/         # Kids world home
├── components/
│   ├── admin/           # Admin UI
│   ├── forms/           # Admission & contact forms
│   ├── layout/          # Navbar, footer, announcements
│   ├── providers/       # Theme, site config, brand mode
│   ├── sections/        # Marketing sections
│   └── ui/              # Shared primitives
├── data/                # Static fallback content
└── lib/                 # Schemas, Supabase, spam-guard, brand helpers
public/logos/            # Brand logos
supabase/
├── schema.sql           # Full schema (greenfield)
├── seed.sql
└── migrations/          # Incremental upgrades for existing DBs
```

## Brand worlds

- `/` — main site (both brands)
- `/op-kids` — Kids world
- `/institute` — Institute world
- Admin → Announcements — notices with Main / Kids / Institute targeting

## Deploy

Deploy on Vercel (or any Node host). Set the same env vars as `.env.local`. Point your custom domain and update `siteConfig.url` in `src/data/site.ts` (or env-driven URL when you add it).
