# Handover

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026

One-page pack for transferring ownership to another developer or agency.

---

## 1. What you are handing over

A **dual-brand marketing + admissions website** with a **staff CMS**:

- Public site: OP Institute of Studies + OP Kids Pre School  
- Admin: content, announcements, settings, enquiry inbox  
- Backend: Supabase (DB, Auth, Storage)  
- Host: typically Vercel  

Not included: student LMS, online payments, automated email (unless added later).

---

## 2. Document map (read in this order)

| # | Doc | Audience | Purpose |
|---|-----|----------|---------|
| 1 | [Memory.md](./Memory.md) | Everyone | Contacts, decisions, gotchas, incident log |
| 2 | [PRD.md](./PRD.md) | Product / dev | What the product must do |
| 3 | [Architecture.md](./Architecture.md) | Developers | How it is built |
| 4 | [SETUP.md](./SETUP.md) | Developers | Local run + Supabase + deploy |
| 5 | [DATABASE.md](./DATABASE.md) | Developers | Tables, RLS, migrations |
| 6 | [Rules.md](./Rules.md) | Developers / AI | Conventions while coding |
| 7 | [Design.md](./Design.md) | Design / frontend | Visual system |
| 8 | [Phases.md](./Phases.md) | Product | Done / now / next roadmap |
| 9 | [CMS-GUIDE.md](./CMS-GUIDE.md) | Staff | How to use Admin |

Also: root **`README.md`** (quick start) and **`supabase/README.md`** (SQL order).

---

## 3. Access checklist (transfer these)

| Access | Status | Notes |
|--------|--------|-------|
| Git repository | ☐ | Push rights |
| Vercel (or host) project | ☐ | Env vars + domains |
| Supabase project | ☐ | SQL, Auth, Storage |
| Domain DNS | ☐ | If custom domain |
| Admin login | ☐ | At least one Auth user; reset tested |
| Password manager entry | ☐ | Env keys + admin password (not in git) |

**Env vars to transfer (names only — values via secure channel):**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 4. Day-1 verification (receiver)

- [ ] `npm install` → `npm run dev` works with `.env.local`  
- [ ] Public pages load (`/`, `/op-kids`, `/institute`)  
- [ ] Submit a test contact/admission form → appears in **Admin → Queries**  
- [ ] Admin login → change a Setting → visible on site after refresh (~1 min)  
- [ ] Logout → login again succeeds  
- [ ] Supabase: **public signup OFF**  
- [ ] Confirm `siteConfig.url` matches the live domain  

---

## 5. Critical operational facts

1. **Any Auth user = full admin** → never enable open signup.  
2. **Leads live in `queries`** — staff must check Admin (no email alerts by default).  
3. **WhatsApp is the main conversion channel** after forms.  
4. Auth session bugs: use hard redirects after login/logout; see [Memory.md](./Memory.md) incident log.  
5. CMS edits: expect ~**60s** cache revalidation on public pages.  
6. Brand IDs in data: `preschool` | `institute`.  

---

## 6. Known follow-ups (don’t surprise the receiver)

From [Phases.md](./Phases.md) Phase 2–3:

- Real campus photos (replace Unsplash placeholders)  
- Seed real faculty in CMS  
- Custom domain + update `siteConfig.url`  
- Optional: GA4, Search Console, enquiry email alerts  

---

## 7. Support contacts (fill at handover)

| Role | Name | Contact |
|------|------|---------|
| Outgoing developer / agency | | |
| Incoming developer / agency | | |
| Business owner | | |
| Staff CMS users | | |

Business phones/emails: [Memory.md](./Memory.md) §2.

---

## 8. Sign-off

| Item | Outgoing | Incoming | Date |
|------|----------|----------|------|
| Repo + docs reviewed | ☐ | ☐ | |
| Access transferred | ☐ | ☐ | |
| Day-1 verification passed | ☐ | ☐ | |
| Staff trained on CMS guide | ☐ | ☐ | |

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Handover index + checklists |
