-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Adds new faculty profile fields: department, subjects_taught, batch_handled, achievement, quote

ALTER TABLE faculty ADD COLUMN IF NOT EXISTS department TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS subjects_taught TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS batch_handled TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS achievement TEXT DEFAULT '';
ALTER TABLE faculty ADD COLUMN IF NOT EXISTS quote TEXT DEFAULT '';
