-- Brand category on enquiry queries (run in Supabase SQL Editor)

ALTER TABLE queries ADD COLUMN IF NOT EXISTS brand TEXT DEFAULT NULL;
-- preschool | institute | null (legacy / mixed)

-- Backfill from program name when possible
UPDATE queries
SET brand = 'preschool'
WHERE brand IS NULL
  AND (
    program ILIKE '%kids%'
    OR program ILIKE '%preschool%'
    OR program ILIKE '%play group%'
    OR program ILIKE '%nursery%'
    OR program ILIKE '%lkg%'
    OR program ILIKE '%ukg%'
  );

UPDATE queries
SET brand = 'institute'
WHERE brand IS NULL
  AND type = 'admission'
  AND program IS NOT NULL
  AND trim(program) <> '';
