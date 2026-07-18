-- Announcements / notices (admissions open, new offers, alerts)
-- Run in Supabase → SQL Editor

create table if not exists public.announcements (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  message           text,
  link_url          text,
  link_label        text,
  show_on_main      boolean not null default true,
  show_on_kids      boolean not null default false,
  show_on_institute boolean not null default false,
  active            boolean not null default true,
  sort_order        int not null default 0,
  starts_on         text,   -- optional YYYY-MM-DD
  ends_on           text,   -- optional YYYY-MM-DD
  created_at        timestamptz not null default now()
);

alter table public.announcements enable row level security;

drop policy if exists "public can read announcements" on public.announcements;
drop policy if exists "admin can insert announcements" on public.announcements;
drop policy if exists "admin can update announcements" on public.announcements;
drop policy if exists "admin can delete announcements" on public.announcements;

create policy "public can read announcements"
  on public.announcements for select to anon, authenticated using (true);

create policy "admin can insert announcements"
  on public.announcements for insert to authenticated with check (true);

create policy "admin can update announcements"
  on public.announcements for update to authenticated using (true);

create policy "admin can delete announcements"
  on public.announcements for delete to authenticated using (true);

-- Example starter (optional — edit/delete in Admin)
insert into public.announcements (
  title, message, link_url, link_label,
  show_on_main, show_on_kids, show_on_institute, active, sort_order
)
select
  'Admissions Open 2026–27',
  'Enquire now for OP Kids Pre School and OP Institute of Studies.',
  '/admissions',
  'Apply now',
  true, true, true, true, 0
where not exists (select 1 from public.announcements limit 1);
