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

-- Pre-populate with existing leadership data
INSERT INTO leadership (name, title, organization, initials, accent, credentials, experience, education, since_year, stats, message, sort_order)
VALUES
  (
    'Om Prakash',
    'Founder & Director',
    'O.P. Institute of Studies',
    'OP',
    'brand',
    '["Founder", "Since 2003"]',
    '20+ years',
    'M.Com, B.Ed',
    '',
    '[{"value":"500+","label":"students mentored"},{"value":"2","label":"institutes led"}]',
    'Education is the most powerful tool we can use to change the world. Our team works tirelessly to create an environment where learning is joyful and transformative.',
    1
  ),
  (
    'Meenakshi',
    'Academic & Management Head',
    'O.P. Institute · OP Kids',
    'M',
    'gold',
    '["NPTT", "B.Ed", "CTET qualified"]',
    '8 years',
    'B.Ed',
    '2018',
    '[{"value":"200+","label":"early learners guided"},{"value":"3","label":"certifications"}]',
    'Alongside our founder, I oversee day-to-day management — from classroom quality to parent coordination and campus operations.',
    2
  )
ON CONFLICT DO NOTHING;
