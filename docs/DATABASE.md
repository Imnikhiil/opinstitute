# Database

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [SETUP.md](./SETUP.md) · [Architecture.md](./Architecture.md) · `supabase/README.md`

Supabase (Postgres) holds CMS content, enquiry leads, auth users, and the `media` storage bucket.

---

## 1. How to apply SQL

### Greenfield (new project)

1. Run `supabase/schema.sql` once in **SQL Editor**.
2. Optional: `supabase/seed.sql`.

`schema.sql` is the **full** current shape (tables + RLS + storage policies). Prefer it for brand-new projects.

### Existing live project

Run only pending files under `supabase/migrations/` in this order:

| Order | File | Purpose |
|-------|------|---------|
| 1 | `migrations/add_faculty_fields.sql` | Extra faculty columns + leadership table |
| 2 | `migrations/add_faculty_category.sql` | Faculty `category` |
| 3 | `migrations/add_content_brand.sql` | Gallery / events `brand` |
| 4 | `migrations/add_queries_brand.sql` | Queries `brand` |
| 5 | `migrations/add_announcements.sql` | Announcements |
| 6 | `migrations/fix_faculty_categories.sql` | Optional one-shot data fix |
| 7 | `migrations/split_management_heads.sql` | Optional leadership split |
| 8 | `migrations/add_videos.sql` | Videos table |

Files using `IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS` are generally safe to re-run. One-shot data fixes: run once and skip if already applied.

---

## 2. Tables

### `queries` — form leads

| Column | Notes |
|--------|--------|
| `type` | `contact` \| `admission` |
| `name` | Contact name or student name |
| `parent_name` | Admission only |
| `email`, `phone` | — |
| `subject` | Contact |
| `program`, `age` | Admission |
| `message` | Optional |
| `brand` | `preschool` \| `institute` (nullable) |
| `status` | `new` \| `read` \| `done` |
| `created_at` | Timestamp |

### `courses`

Institute programs. `category`: `professional` \| `degree` \| `school`. Includes `features` (`text[]`), `popular`, `sort_order`.

### `faculty`

Teachers. `category`: `preschool` \| `institute`.  
Extra profile fields (via migrations / full schema usage): `department`, `subjects_taught`, `batch_handled`, `achievement`, `quote`, `image_url`.  
`linkedin` may exist in SQL but is unused in Admin UI.

### `testimonials`

Reviews. `category`: `preschool` \| `institute`. `rating` default 5.

### `events`

`type` (e.g. academic / cultural / sports / preschool), `brand` (`preschool` \| `institute`), `event_date` as text, `image_url`.

### `gallery`

`image_url`, `alt`, `category` (campus / classroom / …), `brand`.

### `leadership`

Founder / management heads: title, organization, credentials (jsonb), message, image, `sort_order`, etc.

### `announcements`

Banner notices: `title`, `message`, optional link, `show_on_main` / `show_on_kids` / `show_on_institute`, `active`, `starts_on` / `ends_on`, `sort_order`.

### `videos`

Founder / parent / student videos: `title`, `description`, `video_url`, `thumbnail_url`, `brand`, `kind` (`founder` | `parent_review` | `student_experience` | `general`), `active`, `sort_order`.

### `site_settings`

**Single row** (`id = 1` enforced). Phones, emails, WhatsApp, addresses, hours, social URLs for both brands. Edited via Admin → Settings.

---

## 3. Brand values

Use consistently everywhere:

| Value | Meaning |
|-------|---------|
| `preschool` | OP Kids Pre School |
| `institute` | OP Institute of Studies |

Surface mode `all` (Main site) is **app-only**, not a DB brand value on every row.

---

## 4. Row Level Security (RLS)

Intent:

| Table | Anon (public) | Authenticated (admin) |
|-------|---------------|------------------------|
| `queries` | **Insert** only | Select / update / delete |
| Content tables* | **Select** | Insert / update / delete |
| `site_settings` | **Select** | Insert / update / delete |

\* `courses`, `faculty`, `testimonials`, `events`, `gallery`, `leadership`, `announcements`, `videos`

Policies are created in `schema.sql`. If Admin can read but not write, check the user is actually logged in (Auth session) and policies exist.

**Security rule:** keep **Allow new users to sign up = OFF**. Any Auth user is treated as full admin by the app.

---

## 5. Storage

| Item | Value |
|------|--------|
| Bucket | `media` |
| Public | Yes (read) |
| Write | Authenticated only |

Used for faculty, gallery, events, leadership images, etc. Public site loads URLs from `*.supabase.co` (allowed in `next.config`).

---

## 6. App read/write paths

| Path | Module |
|------|--------|
| Public reads (+ static fallback) | `src/lib/supabase/public-data.ts` |
| Admin CRUD | Browser Supabase client under Auth |
| Enquiry insert | `POST /api/enquiry` → `queries` |
| Auth users | Supabase Auth (not a custom `users` table) |

Static fallbacks: `src/data/*.ts` when DB empty or unreachable.

---

## 7. Backup & access (handover)

- [ ] Supabase project ownership / team access transferred  
- [ ] Know how to export DB (Supabase backups / SQL dump)  
- [ ] `media` bucket contents considered in backup plan  
- [ ] Auth users listed; password reset path known  
- [ ] No `service_role` key in Vercel public env  

---

## 8. Changing the schema safely

1. Write a new file in `supabase/migrations/`.  
2. Update `supabase/schema.sql` so greenfield installs stay correct.  
3. Update TypeScript mappers (`public-data.ts`) and Admin forms.  
4. Update static fallback in `src/data/` if needed.  
5. Note the migration in `supabase/README.md` and this doc.  
6. Apply on staging/project SQL Editor before production.

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial DB guide for handover |
