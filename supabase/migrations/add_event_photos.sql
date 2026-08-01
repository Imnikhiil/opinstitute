-- Album photos for each event (click event → photo grid)
-- Run in Supabase SQL Editor

alter table public.events
  add column if not exists photos jsonb default '[]'::jsonb;
