-- ============================================================
--  O.P. Institute / OP Kids  —  Admin Panel Database Schema
--  Run this ONCE in Supabase → SQL Editor → New query → Run
-- ============================================================

-- ---------- 1. QUERIES (contact + admission form submissions) ----------
create table if not exists public.queries (
  id          uuid primary key default gen_random_uuid(),
  type        text not null default 'contact',      -- 'contact' | 'admission'
  name        text not null,                        -- contact: name | admission: student name
  parent_name text,          -- admission: parent name
  email       text,
  phone       text,
  subject     text,          -- contact: subject
  program     text,          -- admission: selected program
  age         text,          -- admission: age/class
  message     text,
  brand       text,          -- preschool | institute (which world the enquiry belongs to)
  status      text not null default 'new',          -- 'new' | 'read' | 'done'
  created_at  timestamptz not null default now()
);

-- ---------- 2. COURSES ----------
create table if not exists public.courses (
  id           uuid primary key default gen_random_uuid(),
  name         text not null,
  description  text,
  duration     text,
  eligibility  text,
  features     text[] default '{}',
  category     text default 'professional',          -- professional | degree | school
  popular      boolean default false,
  sort_order   int default 0,
  created_at   timestamptz not null default now()
);

-- ---------- 3. FACULTY ----------
create table if not exists public.faculty (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  qualification text,
  experience    text,
  subject       text,
  image_url     text,
  linkedin      text,
  category      text default 'institute',            -- preschool | institute
  sort_order    int default 0,
  created_at    timestamptz not null default now()
);

-- ---------- 4. TESTIMONIALS ----------
create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text,
  content     text not null,
  rating      int default 5,
  image_url   text,
  category    text default 'preschool',              -- preschool | institute
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

-- ---------- 5. EVENTS ----------
create table if not exists public.events (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  event_date   text,
  description  text,
  image_url    text,
  type         text default 'academic',              -- academic | cultural | sports | preschool
  brand        text default 'institute',             -- preschool | institute
  sort_order   int default 0,
  created_at   timestamptz not null default now()
);

-- ---------- 6. GALLERY ----------
create table if not exists public.gallery (
  id          uuid primary key default gen_random_uuid(),
  image_url   text not null,
  alt         text,
  category    text default 'campus',                 -- campus | classroom | preschool | events | achievements
  brand       text default 'institute',              -- preschool | institute
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

-- ---------- 7. SITE SETTINGS (single editable row of key values) ----------
create table if not exists public.site_settings (
  id            int primary key default 1,
  phone         text,
  phone2        text,
  kids_phone    text,
  email         text,
  kids_email    text,
  whatsapp      text,
  kids_whatsapp text,
  address       text,
  branch_address text,
  kids_address  text,
  facebook      text,
  instagram     text,
  youtube       text,
  linkedin      text,
  kids_facebook text,
  kids_instagram text,
  kids_youtube  text,
  weekday_hours text,
  sunday_hours  text,
  preschool_hours text,
  updated_at    timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- Safe upgrades if site_settings already exists
alter table public.site_settings add column if not exists kids_email text;
alter table public.site_settings add column if not exists kids_whatsapp text;
alter table public.site_settings add column if not exists kids_facebook text;
alter table public.site_settings add column if not exists kids_instagram text;
alter table public.site_settings add column if not exists kids_youtube text;

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ============================================================
--  ROW LEVEL SECURITY
--  Public site can: submit queries + read content
--  Only logged-in admin can: read queries + change any content
-- ============================================================
alter table public.queries       enable row level security;
alter table public.courses       enable row level security;
alter table public.faculty       enable row level security;
alter table public.testimonials  enable row level security;
alter table public.events        enable row level security;
alter table public.gallery       enable row level security;
alter table public.site_settings enable row level security;

-- QUERIES: anyone can submit; only admins can view/update/delete
create policy "anyone can submit query"   on public.queries for insert to anon, authenticated with check (true);
create policy "admin can read queries"    on public.queries for select to authenticated using (true);
create policy "admin can update queries"  on public.queries for update to authenticated using (true);
create policy "admin can delete queries"  on public.queries for delete to authenticated using (true);

-- CONTENT TABLES: public can read; admins can do everything
do $$
declare t text;
begin
  foreach t in array array['courses','faculty','testimonials','events','gallery','site_settings']
  loop
    execute format('create policy "public can read %1$s" on public.%1$s for select to anon, authenticated using (true);', t);
    execute format('create policy "admin can insert %1$s" on public.%1$s for insert to authenticated with check (true);', t);
    execute format('create policy "admin can update %1$s" on public.%1$s for update to authenticated using (true);', t);
    execute format('create policy "admin can delete %1$s" on public.%1$s for delete to authenticated using (true);', t);
  end loop;
end $$;

-- ============================================================
--  STORAGE BUCKET for uploaded images (faculty, gallery, events)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "public can view media"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'media');

create policy "admin can upload media"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'media');

create policy "admin can update media"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'media');

create policy "admin can delete media"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'media');
