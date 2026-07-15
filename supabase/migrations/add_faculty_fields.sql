-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- 1) New faculty profile fields
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS department TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS subjects_taught TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS batch_handled TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS achievement TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS quote TEXT DEFAULT '';

-- 2) Leadership table (Founder & Management)
CREATE TABLE IF NOT EXISTS leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  organization TEXT DEFAULT '',
  initials TEXT DEFAULT '',
  accent TEXT DEFAULT 'brand',
  credentials JSONB DEFAULT '[]',
  experience TEXT DEFAULT '',
  education TEXT DEFAULT '',
  since_year TEXT DEFAULT '',
  stats JSONB DEFAULT '[]',
  message TEXT DEFAULT '',
  image_url TEXT DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE leadership ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read leadership" ON leadership
  FOR SELECT USING (true);

-- Allow authenticated users (admin) to manage
CREATE POLICY "Admin manage leadership" ON leadership
  FOR ALL USING (auth.role() = 'authenticated');
