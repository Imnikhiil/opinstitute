-- Videos for founder intro, Kids parent reviews, Institute student experiences
-- Run in Supabase SQL Editor (existing projects)

create table if not exists public.videos (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  description   text default '',
  video_url     text not null,
  thumbnail_url text default '',
  brand         text,              -- preschool | institute | null (shared / founder)
  kind          text not null default 'general',
  -- kind: founder | parent_review | student_experience | general
  active        boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

alter table public.videos enable row level security;

create policy "public can read videos"
  on public.videos for select to anon, authenticated using (true);

create policy "admin can insert videos"
  on public.videos for insert to authenticated with check (true);

create policy "admin can update videos"
  on public.videos for update to authenticated using (true);

create policy "admin can delete videos"
  on public.videos for delete to authenticated using (true);

-- Optional gallery topic for front desk / reception photos
alter table public.gallery add column if not exists category text default 'campus';
