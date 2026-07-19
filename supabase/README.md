# Supabase setup

## Fresh project

Run once in SQL Editor:

1. `schema.sql` — tables, RLS, storage bucket
2. `seed.sql` — optional starter rows

## Existing project (already live)

Run any migrations you have **not** applied yet, in order:

| File | Purpose |
|------|---------|
| `migrations/add_faculty_fields.sql` | Faculty columns + leadership table |
| `migrations/add_faculty_category.sql` | Faculty category |
| `migrations/add_content_brand.sql` | Gallery/events brand |
| `migrations/add_queries_brand.sql` | Queries brand |
| `migrations/add_announcements.sql` | Announcements table |
| `migrations/fix_faculty_categories.sql` | One-shot data fix (optional) |
| `migrations/split_management_heads.sql` | One-shot leadership split (optional) |

Safe to re-run files that use `IF NOT EXISTS` / `ADD COLUMN IF NOT EXISTS`.

## Auth

1. Authentication → Providers → Email → **Allow new users to sign up: OFF**
2. Users → Add user for staff admin only
