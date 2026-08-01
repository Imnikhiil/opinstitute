-- Front Desk copy + Home Admissions CTA (editable from Admin → Settings)
alter table public.site_settings
  add column if not exists front_desk_name text,
  add column if not exists front_desk_title text,
  add column if not exists front_desk_message text,
  add column if not exists cta_badge text,
  add column if not exists cta_title text,
  add column if not exists cta_body text;
