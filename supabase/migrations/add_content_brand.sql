-- Brand separation for Gallery & Events (run in Supabase SQL Editor)

ALTER TABLE gallery ADD COLUMN IF NOT EXISTS brand TEXT DEFAULT 'institute';
ALTER TABLE events ADD COLUMN IF NOT EXISTS brand TEXT DEFAULT 'institute';

-- Backfill from existing topic / type signals
UPDATE gallery
SET brand = 'preschool'
WHERE category = 'preschool'
   OR category ILIKE '%kids%'
   OR alt ILIKE '%kids%'
   OR alt ILIKE '%preschool%'
   OR alt ILIKE '%nursery%';

UPDATE gallery
SET brand = 'institute'
WHERE brand IS NULL OR trim(brand) = '';

UPDATE events
SET brand = 'preschool'
WHERE type = 'preschool'
   OR title ILIKE '%kids%'
   OR title ILIKE '%preschool%'
   OR description ILIKE '%preschool%';

UPDATE events
SET brand = 'institute'
WHERE brand IS NULL OR trim(brand) = '';
