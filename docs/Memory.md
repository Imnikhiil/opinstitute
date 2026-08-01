# Memory

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [PRD.md](./PRD.md) · [Architecture.md](./Architecture.md) · [Rules.md](./Rules.md) · [Phases.md](./Phases.md) · [Design.md](./Design.md)

Short-term project brain: facts, decisions, and gotchas that are easy to forget. Update this when something bites you twice.

---

## 1. What this project is (one glance)

- Dual-brand **marketing + admissions** site, not an LMS or fee portal.
- Brands: **OP Institute of Studies** (coaching since 2003) + **OP Kids Pre School**.
- Stack: **Next.js App Router + Supabase** (content, auth, storage, leads).
- Conversion path: **Call / WhatsApp / forms** → Admin **Queries**.
- Hosting target: **Vercel**; current canonical in code: `https://opinstitute.vercel.app` (`siteConfig.url` — change when custom domain is live).

---

## 2. People & contacts (business)

| Role | Name | Notes |
|------|------|--------|
| Founder & Director | Om Prakash | Leadership content |
| OP Kids Academic & Management Head | Mona | Leadership CMS |
| Institute Academic & Management Head | Meenakshi | Leadership CMS |

| Channel | Institute | Kids |
|---------|-----------|------|
| Phone | +91 92136 10182 | +91 92208 25187 |
| WhatsApp | 919213610182 | 919220825187 |
| Email | opinstituteofstudies@gmail.com | opkidspreschool@gmail.com |
| Campus | Mahavir Enclave Part 2, New Delhi 110059 (A-374 / Street No. 11) | Same campus area (Kids Google listing wording differs slightly) |

Defaults live in `src/data/site.ts`; live overrides in Admin → **Settings** (`site_settings`).

**Admin Auth user (typical):** created manually in Supabase — often `admin@opinstitute.com` (not stored in repo; password only in Supabase / password manager).

---

## 3. Decisions we already made

| Decision | Why |
|----------|-----|
| One deploy, three surfaces (`/`, `/op-kids`, `/institute`) | Shared campus, separate journeys |
| Brand IDs `preschool` / `institute` (+ mode `all`) | Stable in DB/filters — don’t rename casually |
| WhatsApp after form submit | Parents already chat there; no email product yet |
| Any authenticated Supabase user = full admin | Keep **public signup OFF** |
| Static `src/data/*` fallbacks | Site still readable if Supabase is down / empty |
| ISR `revalidate ≈ 60` | CMS edits appear within about a minute |
| Docs in `docs/` (HANDOVER, PRD, Architecture, Rules, Phases, Design, Memory, SETUP, DATABASE, CMS-GUIDE) | Future onboarding without digging chat history |

---

## 4. Gotchas (read before changing auth / forms / brand)

### Auth / logout

- Soft `router.push` after login/logout caused **“can’t log in after logout”** / cookie desync.
- **Fix pattern:** `signOut` / `signIn` then **`window.location.assign(...)`**; middleware redirects must **copy Supabase cookies** onto the redirect response.
- Login UI used to map **all** Auth errors to “Incorrect email or password” — check real `error.message` when debugging.
- Trim email on login; trailing spaces fail Auth.

### Brand / content

- Faculty `category` in DB can be wrong; `public-data.ts` also uses **department/subject heuristics**.
- Empty faculty static fallback → faculty page depends on CMS data.
- Lots of gallery/events imagery may still be **Unsplash placeholders** — replace with real photos (Phase 2).
- Announcements: must set which surfaces they show on (Main / Kids / Institute) + date window.
- Home About Kids collage + `/op-kids` showcase = first **4** Admin Gallery rows with brand **`preschool`** (`getKidsShowcaseImages`).
- Front desk / reception photos: Gallery **Show as** `front_desk` or `reception` → home About + About page (`getFrontDeskPhoto`). Local fallbacks in `public/images/campus/`.
- Receptionist section: `FrontDeskHighlight` on Home (after Admissions process), About, and Admissions — copy in `frontDeskStaff` (`src/data/site.ts`). Update `displayName` when her personal name should show.
- Videos: Admin → Videos (`kind`: founder | parent_review | student_experience). Run `supabase/migrations/add_videos.sql` once on Supabase.
- Event albums: `events.photos` jsonb — run `supabase/migrations/add_event_photos.sql`. Admin → Events → Cover + Album photos; public Events page opens modal on click.
- ScrollReveal must **not** use CSS `filter: blur()` — it made photos look soft on screen.

### Forms / spam

- Honeypot field must stay empty; tripped bots get **fake success**.
- Rate limit is **in-memory** in the Node process — not shared across multiple instances.
- Enquiry types only: `contact` | `admission`.

### Schema

- Prefer `schema.sql` + a new file in `migrations/` for live DBs (see `supabase/README.md` order).
- Some SQL columns (e.g. `linkedin`) exist but may be **unused in Admin UI**.

### Deploy / env

- Only public env vars: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never commit `.env.local` or service-role keys.
- After domain change: update **Vercel domain** + `siteConfig.url` (metadata/OG/sitemap base).

---

## 5. Where important things live

| Need | Look here |
|------|-----------|
| Handover pack | `docs/HANDOVER.md` |
| Requirements | `docs/PRD.md` |
| How the system is built | `docs/Architecture.md` |
| Coding conventions | `docs/Rules.md` |
| What to build next | `docs/Phases.md` |
| Colors / type / UI | `docs/Design.md` |
| This file | `docs/Memory.md` |
| Setup / deploy | `docs/SETUP.md` |
| Schema / RLS | `docs/DATABASE.md` |
| Staff Admin how-to | `docs/CMS-GUIDE.md` |
| DB setup (short) | `supabase/README.md`, `supabase/schema.sql` |
| Quick start | root `README.md` |
| Site defaults | `src/data/site.ts` |
| Public fetches | `src/lib/supabase/public-data.ts` |
| Enquiry API | `src/app/api/enquiry/route.ts` |
| Admin gate | `src/lib/supabase/middleware.ts` |

---

## 6. Programs (baseline — update when curriculum changes)

**Kids:** Play Group (2–3), Nursery (3–4), LKG (4–5), UKG (5–6)

**Institute:** CMA; B.Com Pass/Hons; Class I–VIII; IX–X CBSE; XI–XII Commerce

Admissions messaging should track the current session year (e.g. 2026–27).

---

## 7. Incident log

| When | Symptom | Cause / fix |
|------|---------|-------------|
| Jul 2026 | After logout, login showed wrong password | Soft navigation + middleware redirects dropping cookie updates → hard redirects + cookie copy on redirects |

Add new rows when something breaks in production.

---

## 8. Open loops (don’t forget)

- [ ] Custom domain + `siteConfig.url`
- [ ] Real photos replace Unsplash
- [ ] Seed real faculty (+ optional static fallback)
- [x] CMS / Setup / Database / Handover docs
- [ ] Analytics (GA4) + Search Console
- [ ] Email alert on new enquiry
- [ ] Confirm Kids logo file present in `public/logos/` on every deploy machine

---

## 9. How to update this file

Add a bullet or table row when you learn something that:

1. Isn’t obvious from code in under 2 minutes, or  
2. Took more than one debugging session, or  
3. A new person will need on day one.

Don’t duplicate full PRD/Architecture here — link out.

---

## 10. Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial memory bank from product + auth incident + docs set |
