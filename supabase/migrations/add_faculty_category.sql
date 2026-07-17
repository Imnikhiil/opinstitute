-- Run in Supabase SQL Editor to categorize faculty by brand

ALTER TABLE faculty ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'institute';

-- Backfill preschool teachers from subject/department hints
UPDATE faculty
SET category = 'preschool'
WHERE subject ILIKE '%kids%'
   OR subject ILIKE '%preschool%'
   OR department ILIKE '%kids%'
   OR department ILIKE '%preschool%';

UPDATE faculty
SET category = 'institute'
WHERE category IS NULL OR trim(category) = '';
