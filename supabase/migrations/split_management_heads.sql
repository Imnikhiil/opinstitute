-- Split Academic & Management Heads: OP Kids (Mona) + OP Institute (Meenakshi)
-- Run in Supabase SQL Editor

-- 1) Mona → OP Kids Pre School only
UPDATE public.leadership
SET
  organization = 'OP Kids Pre School',
  accent = 'gold',
  credentials = '["NPTT", "B.Ed", "CTET qualified"]'::jsonb,
  message = 'At OP Kids Pre School, my focus is strong foundations in the early years — caring classrooms, joyful learning, and close parent coordination so every child feels safe, confident, and excited to grow.',
  sort_order = 2
WHERE name ILIKE 'mona'
   OR (name ILIKE 'meenakshi' AND organization ILIKE '%kids%');

-- If the only management row is still named Meenakshi with combined org, rename/scope to Mona / Kids
UPDATE public.leadership
SET
  name = 'Mona',
  organization = 'OP Kids Pre School',
  accent = 'gold',
  initials = 'M',
  credentials = '["NPTT", "B.Ed", "CTET qualified"]'::jsonb,
  message = 'At OP Kids Pre School, my focus is strong foundations in the early years — caring classrooms, joyful learning, and close parent coordination so every child feels safe, confident, and excited to grow.',
  sort_order = 2
WHERE name ILIKE 'meenakshi'
  AND (
    organization ILIKE '%kids%'
    OR organization ILIKE '%institute%kids%'
    OR organization ILIKE '%·%'
  )
  AND NOT EXISTS (
    SELECT 1 FROM public.leadership WHERE name ILIKE 'mona'
  );

-- 2) Add OP Institute Academic & Management Head (skip if already present)
INSERT INTO public.leadership (
  name, title, organization, initials, accent, credentials,
  experience, education, since_year, stats, message, sort_order
)
SELECT
  'Meenakshi',
  'Academic & Management Head',
  'O.P. Institute of Studies',
  'M',
  'brand',
  '["Academic leadership", "B.Ed"]'::jsonb,
  '8 years',
  'B.Ed',
  '2018',
  '[{"value":"500+","label":"students guided"},{"value":"2","label":"programs led"}]'::jsonb,
  'At O.P. Institute of Studies, I oversee academic quality and day-to-day management — from classroom standards and teacher coordination to student mentorship — so every learner gets structured guidance toward strong results.',
  3
WHERE NOT EXISTS (
  SELECT 1
  FROM public.leadership
  WHERE title ILIKE '%Academic & Management Head%'
    AND organization ILIKE '%Institute of Studies%'
    AND organization NOT ILIKE '%Kids%'
);
