# Setup

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [HANDOVER.md](./HANDOVER.md) · [DATABASE.md](./DATABASE.md) · [Architecture.md](./Architecture.md)

Step-by-step so a new developer can run the site locally and deploy it.

---

## 1. Prerequisites

| Tool | Notes |
|------|--------|
| Node.js | LTS recommended (18+ / 20+) |
| npm | Comes with Node |
| Git | Clone the repo |
| Supabase account | [supabase.com](https://supabase.com) |
| Vercel account (or similar) | Production hosting |

---

## 2. Clone & install

```bash
git clone <repo-url>
cd "OP Institute Website"
npm install
```

---

## 3. Environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

**Where to find keys:** Supabase → Project → **Settings → API**

| Value | Use |
|-------|-----|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| `anon` `public` key | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |

**Never** put the `service_role` key in the frontend or commit it to git.  
**Never** commit `.env.local`.

---

## 4. Database (Supabase)

### Fresh project

1. Create a new Supabase project.
2. SQL Editor → run **`supabase/schema.sql`** (tables, RLS, `media` bucket).
3. Optional: run **`supabase/seed.sql`** for starter content.
4. See [DATABASE.md](./DATABASE.md) for table details.

### Existing / already live project

Run only migrations you have **not** applied yet (order in [DATABASE.md](./DATABASE.md) / `supabase/README.md`).

### Auth (required)

1. **Authentication → Providers → Email**
2. Set **Allow new users to sign up: OFF**
3. **Authentication → Users → Add user** (email + password for staff)
4. Staff logs in at `/admin/login` with that email/password

Without an Auth user, Admin will not work.

---

## 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| URL | Purpose |
|-----|---------|
| `/` | Main dual-brand site |
| `/op-kids` | Kids world |
| `/institute` | Institute world |
| `/admin/login` | Staff CMS |

```bash
npm run build   # production build check
npm run lint    # ESLint
```

---

## 6. Deploy (Vercel)

1. Import the Git repo into Vercel.
2. Add the **same two env vars** as `.env.local`.
3. Deploy (framework: Next.js — auto-detected).
4. After custom domain is connected:
   - Point DNS as Vercel instructs
   - Update `siteConfig.url` in `src/data/site.ts` to the real domain
   - Redeploy so metadata / OG / sitemap use the new URL

**Smoke test after deploy**

- [ ] Home, Kids, Institute load  
- [ ] Contact or admission form creates a row in Admin → Queries  
- [ ] Admin login → edit one setting → logout → login again  

---

## 7. Common failures

| Problem | Check |
|---------|--------|
| Forms don’t save | Env vars on host; RLS; browser network tab on `/api/enquiry` |
| Admin login fails | User exists in Supabase Auth; signup is OFF; correct project URL/key |
| Images don’t show | Storage bucket `media` exists; policies from `schema.sql`; `next.config` allows `**.supabase.co` |
| Empty faculty/gallery | CMS empty and static fallback empty — add content in Admin or run seed |
| Wrong site URL in SEO | `siteConfig.url` still on `opinstitute.vercel.app` |

---

## 8. Handover checklist (setup)

- [ ] Repo access granted  
- [ ] Supabase project access (or transfer ownership)  
- [ ] Vercel project access  
- [ ] `.env` values shared via password manager (not chat/email plain text)  
- [ ] At least one admin Auth user; password reset tested  
- [ ] Public signup confirmed **OFF**  
- [ ] Custom domain + `siteConfig.url` plan documented  

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial setup guide for handover |
