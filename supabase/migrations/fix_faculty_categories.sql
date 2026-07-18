-- Fix faculty categories from department / role (run in Supabase SQL Editor)

-- OP Kids Pre School teachers
UPDATE faculty
SET category = 'preschool'
WHERE department ILIKE '%kids%'
   OR department ILIKE '%pre school%'
   OR department ILIKE '%preschool%'
   OR subject ILIKE '%pre primary%'
   OR subject ILIKE '%preschool%'
   OR subject ILIKE '%nursery%'
   OR subject ILIKE '%lkg%'
   OR subject ILIKE '%ukg%';

-- OP Institute of Studies teachers (wins over a wrong preschool tag)
UPDATE faculty
SET category = 'institute'
WHERE department ILIKE '%institute%';

-- Explicit: Amit is Institute, not Kids
UPDATE faculty
SET category = 'institute'
WHERE name ILIKE '%amit%';
