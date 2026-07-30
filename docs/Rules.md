# Rules

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [PRD.md](./PRD.md) · [Architecture.md](./Architecture.md) · [Phases.md](./Phases.md) · [Design.md](./Design.md) · [Memory.md](./Memory.md)

These rules are for anyone changing this codebase (humans or AI). Follow them so the dual-brand site, CMS, and auth stay consistent.

---

## 1. Product north star

1. This site’s job is **trust + enquiries** (call / WhatsApp / forms) — not a student LMS or payments portal.
2. Two brands share one deploy: **OP Institute of Studies** and **OP Kids Pre School**. Never collapse them into one generic “school” voice on brand-specific pages.
3. Staff must be able to update routine content in **Admin** without a code deploy.
4. Prefer fixing flows that already exist (forms → `queries` → WhatsApp) over inventing parallel channels.

If a change fights the [PRD](./PRD.md), update the PRD (or reject the change).

---

## 2. Scope discipline

| Do | Don’t |
|----|--------|
| Small, focused PRs / edits | Drive-by refactors unrelated to the task |
| Match existing patterns in nearby files | New libraries “just because” |
| Add migrations for schema changes | Edit production DB only by hand with no SQL in repo |
| Keep public signup **off** in Supabase | Build public registration / multi-tenant auth |
| Document intentional gaps in PRD | Silently ship half-features |

**Out of scope unless PRD is updated:** payments, student login, roles/RBAC beyond “any Auth user = admin”, transactional email (unless explicitly requested), analytics (unless explicitly requested).

---

## 3. Brand & content rules

1. Brand IDs in code/DB are exactly:
   - `preschool` → OP Kids Pre School  
   - `institute` → OP Institute of Studies  
   - Surface mode `all` → Main (both brands)
2. Use shared helpers: `ContentBrand` / `parseBrandFilter` (`src/data/brands.ts`), `SiteBrandMode` / nav helpers (`src/lib/site-brand.ts`).
3. Announcements must respect `show_on_main` / `show_on_kids` / `show_on_institute` and active date windows.
4. Contact numbers, emails, WhatsApp, hours, social URLs → **Settings / `site_settings`**, not hard-coded in random components (defaults may live in `src/data/site.ts` as fallback only).
5. Prefer real campus imagery over new Unsplash placeholders when adding content.
6. Admissions year copy (e.g. 2026–27) must stay easy to update — don’t bury it in five places without a single source.

---

## 4. Design system (existing site)

This project already has a visual language. **Preserve it** — do not restyle the whole site to a new AI-generic look.

| Token / area | Rule |
|--------------|------|
| Institute | Indigo / blue `brand-*` |
| Kids | Orange `kids-*` (+ existing pink/purple accents where already used) |
| Fonts | Inter (body), Poppins (display) via CSS variables — don’t swap to Inter-only or system defaults |
| Chrome | Public pages use `SiteChrome` (nav, footer, floating CTAs). Admin skips that chrome |
| Motion | Use existing Framer Motion / `ScrollReveal` / `PageTransition` patterns; don’t add noisy animation everywhere |
| Cards | Don’t wrap every block in new card chrome; follow section patterns already on home / brand pages |
| Dark mode | Support both themes when touching shared UI (`next-themes` is already wired) |

**Responsive:** every public UI change must work on mobile first (primary audience is on phones).

---

## 5. Code structure

### 5.1 Where things go

| Kind | Location |
|------|----------|
| Routes / pages | `src/app/...` |
| Marketing sections | `src/components/sections/` |
| Layout chrome | `src/components/layout/` |
| Admin UI | `src/components/admin/` |
| Forms | `src/components/forms/` |
| Providers | `src/components/providers/` |
| Static fallbacks | `src/data/` |
| Supabase helpers | `src/lib/supabase/` |
| Zod schemas | `src/lib/schemas.ts` |
| SQL | `supabase/schema.sql` + `supabase/migrations/` |

### 5.2 Server vs client

1. Default to **Server Components**.
2. Add `"use client"` only for interactivity (forms, filters, theme, brand switcher, motion that needs hooks).
3. Pattern for data pages: server `page.tsx` fetches → client `*PageClient.tsx` for UI state.
4. Keep `"use client"` files free of secrets and heavy data fetching when a server parent can do it.

### 5.3 Naming & style

1. Match the file’s existing style (quotes, imports, Tailwind class order).
2. Use `@/` path aliases.
3. Prefer shared `cn()` / existing UI primitives over one-off class soup.
4. No unused imports, no commented-out dead code blocks.
5. Don’t add `useMemo` / `useCallback` by default unless the surrounding code already relies on them for a clear reason.

---

## 6. Data & Supabase

1. **Public reads** go through `lib/supabase/public-data.ts` (map rows → app types + static fallback).
2. **Admin writes** use the browser client under RLS (`authenticated`).
3. **Never** put service-role keys in the Next.js frontend or commit `.env.local`.
4. Env vars allowed in client: only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Schema change checklist:
   - Update `supabase/schema.sql` (greenfield truth)
   - Add a file under `supabase/migrations/` for live projects
   - Update mappers in `public-data.ts` / admin forms
   - Update static fallback in `src/data/` if the entity has one
   - Note order in `supabase/README.md` if needed
6. New content types need RLS consistent with existing tables (public read of published content; authenticated write; `queries` insert rules as designed).
7. Storage uploads use bucket `media`. Keep public-read / auth-write unless a deliberate security change is approved.
8. After CMS edits, public pages refresh on ~`revalidate = 60`. Don’t assume instant ISR without a refresh strategy.

---

## 7. Auth & admin security

1. Middleware must continue to protect `/admin/:path*` (except login behavior already defined).
2. Login / logout: prefer **hard redirects** (`window.location.assign`) so auth cookies apply cleanly.
3. Middleware redirects that follow `getUser()` must **copy session cookies** onto the redirect response (don’t return a bare `NextResponse.redirect` that drops cookie updates).
4. Keep Supabase **“Allow new users to sign up” = OFF**.
5. Admin pages: `robots: { index: false, follow: false }`.
6. Do not expose admin emails, query PII, or internal errors on public pages.
7. Until roles exist, treat every Auth user as full admin — never enable open signup as a shortcut.

---

## 8. Forms, spam & WhatsApp

1. Validate with Zod in `lib/schemas.ts` on the client **and** again in `POST /api/enquiry`.
2. Keep honeypot + timing + rate-limit checks in `lib/spam-guard.ts` — don’t remove them for convenience.
3. Honeypot tripped → fake success (don’t teach bots).
4. Enquiry types are only `contact` | `admission`; brand tag `preschool` | `institute` when known.
5. After successful save, keep WhatsApp handoff via existing helpers (`lib/whatsapp.ts` / form flow) — don’t replace it with “email us” only.
6. Trim emails/phones before auth or insert where user input is involved.

---

## 9. SEO & routes

1. New **public** marketing routes → add to `sitemap.ts` and sensible metadata.
2. Keep `/admin` and `/api/` disallowed in `robots.ts`.
3. Update `siteConfig.url` when the production domain changes.
4. Don’t add `noindex` to public money pages (home, admissions, courses, kids, institute).

---

## 10. Performance

1. Use `next/image` for photos; stick to allowed remote hosts in `next.config`.
2. Prefer existing `revalidate = 60` on content pages unless there’s a measured reason to change.
3. Avoid huge client bundles on marketing pages (don’t pull admin cropper / CRUD into public routes).
4. Don’t add heavy third-party scripts without an explicit product decision (analytics, chat widgets, etc.).

---

## 11. UX copy & errors

1. User-facing strings are primarily **English (India)**.
2. Don’t map every Supabase failure to “Incorrect email or password” — reserve that for real credential errors; show a clearer message (or log the real one) for other Auth failures.
3. Form errors should be specific enough to fix (“enter a valid phone”) without leaking stack traces.

---

## 12. Git & secrets

1. Never commit `.env`, `.env.local`, service-role keys, or private credentials.
2. Don’t commit large binary dumps or one-off brochure experiments into `src/` without a clear home.
3. Prefer clear commit messages that say **why** (not just “Change”).
4. Only commit / push when the human asks.

---

## 13. Docs hygiene

When behavior changes in a lasting way, update the matching doc:

| Change | Update |
|--------|--------|
| Requirements / scope | `docs/PRD.md` |
| Structure, flows, clients | `docs/Architecture.md` |
| Conventions | `docs/Rules.md` |
| Visual system | `docs/Design.md` |
| Decisions / gotchas | `docs/Memory.md` |
| SQL / auth setup | `docs/DATABASE.md`, `supabase/README.md` |
| Local / deploy | `docs/SETUP.md` |
| Staff CMS | `docs/CMS-GUIDE.md` |
| Handover | `docs/HANDOVER.md` |
| Day-to-day npm / deploy | root `README.md` |

Keep docs short and accurate — delete stale claims instead of leaving contradictions.

---

## 14. Definition of done (every change)

Before considering work finished:

1. [ ] Matches PRD scope (or PRD updated).  
2. [ ] Mobile layout checked for touched UI.  
3. [ ] Brand filters / worlds still correct if content is brand-scoped.  
4. [ ] Admin auth still works (login → use → logout → login) if auth/middleware touched.  
5. [ ] Forms still save + WhatsApp path works if enquiry path touched.  
6. [ ] Schema/migration/fallback updated together if DB shape changed.  
7. [ ] No secrets in the diff.  
8. [ ] `npm run lint` / build not knowingly broken for the change.

---

## 15. Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial project rules |
