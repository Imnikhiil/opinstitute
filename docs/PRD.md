# Project Requirements Document (PRD)

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Document type:** Product Requirements Document  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Status:** Living document (reflects current live product + known gaps)

---

## 1. Purpose

This PRD defines what the website is for, who it serves, what it must do, and what is intentionally out of scope. Use it as the source of truth when adding features, fixing bugs, or onboarding someone new to the project.

---

## 2. Product summary

### 2.1 One-liner

A dual-brand marketing and admissions website for **OP Institute of Studies** (coaching since 2003) and **OP Kids Pre School**, with a staff CMS to manage content and enquiry leads.

### 2.2 Problem it solves

| Stakeholder | Problem | How the site helps |
|-------------|---------|-------------------|
| Parents (Kids) | Need a trustworthy preschool nearby | Brand story, programs, gallery, contact, WhatsApp |
| Students / parents (Institute) | Need CMA / B.Com / school tuition info | Courses, faculty, admissions enquiry |
| Staff | Hard to update site or track leads | Admin panel + queries inbox |
| Business | Two brands, one campus story | Shared site with Kids / Institute / Main worlds |

### 2.3 Brands

| Brand | Full name | Focus | Tagline (site) |
|-------|-----------|--------|----------------|
| Institute | OP Institute of Studies | CMA, B.Com, Class I–XII tuition | Excellence in Education Since 2003 |
| Kids | OP Kids Pre School | Ages ~2–6 early childhood | Where Kids Love to Learn |

**Leadership (content):** Om Prakash (Founder & Director); Mona (OP Kids Academic & Management Head); Meenakshi (Institute Academic & Management Head).

---

## 3. Goals & success metrics

### 3.1 Business goals

1. Convert visitors into **WhatsApp / phone / form enquiries**.
2. Present both brands clearly without confusing parents vs coaching seekers.
3. Let staff update courses, gallery, events, announcements, and settings **without code deploys**.
4. Capture and manage admission / contact leads in one place.

### 3.2 Success metrics (suggested)

| Metric | How to measure | Target (define with owners) |
|--------|----------------|----------------------------|
| Enquiry volume | Rows in `queries` table | Baseline → growth MoM |
| Enquiry → response time | Admin “new → done” | Same day preferred |
| Organic discovery | Search Console / Analytics (not yet wired) | — |
| Content freshness | Last CMS update dates | Gallery / events updated regularly |
| Uptime | Host (Vercel) status | High availability |

> **Note:** Analytics is not implemented yet. Add Google Analytics / Search Console when ready and update this section.

---

## 4. Users & personas

### 4.1 Primary — Parent (OP Kids)

- Looking for Play Group / Nursery / LKG / UKG near Mahavir Enclave.
- Needs trust signals (photos, leadership, ratings, easy call/WhatsApp).
- Prefers mobile; will often abandon long forms.

### 4.2 Primary — Student / parent (Institute)

- Interested in CMA, B.Com, or school tuition (I–XII).
- Compares courses, faculty, and admission process.
- May enquire via form then continue on WhatsApp.

### 4.3 Secondary — Staff admin

- Updates announcements, gallery, events, courses, faculty, testimonials.
- Reviews and follows up on new queries.
- Changes phones, emails, hours, social links in Settings.

### 4.4 Out of scope users

- Online fee payers / student LMS users (no student portal).
- Public self-signup accounts (admin signup must stay closed).

---

## 5. Brand worlds & information architecture

### 5.1 Worlds

| Path | World | Intent |
|------|--------|--------|
| `/` | Main (both brands) | Combined landing |
| `/op-kids` | Kids | Preschool-first journey |
| `/institute` | Institute | Coaching-first journey |

Brand mode can also be remembered via cookie / `localStorage` for nav filtering.

### 5.2 Public routes (required)

| Route | Requirement |
|-------|-------------|
| `/` | Dual-brand home with hero, journey, about both brands, why us, testimonials, admissions teaser, FAQs, CTA, contact |
| `/about` | History, vision / mission / values, leadership |
| `/courses` | Institute courses with category filter |
| `/faculty` | Faculty list; support `?category=preschool\|institute` |
| `/gallery` | Image gallery; support brand filter |
| `/events` | Events list; support brand filter |
| `/admissions` | 4-step process + admission enquiry form |
| `/contact` | Campuses, maps, contact form |
| `/op-kids` | Kids brand home |
| `/institute` | Institute brand home |

### 5.3 Admin routes (staff only)

| Route | Requirement |
|-------|-------------|
| `/admin/login` | Email + password (Supabase Auth) |
| `/admin` | Dashboard overview |
| `/admin/queries` | Contact + admission leads; filters; WhatsApp / call actions |
| `/admin/announcements` | Site notices with Main / Kids / Institute targeting |
| `/admin/courses` | Courses CRUD |
| `/admin/leadership` | Leadership CRUD |
| `/admin/faculty` | Faculty CRUD + photo crop |
| `/admin/testimonials` | Testimonials CRUD |
| `/admin/events` | Events CRUD |
| `/admin/gallery` | Gallery CRUD |
| `/admin/settings` | Phones, emails, WhatsApp, addresses, hours, social |

### 5.4 API

| Endpoint | Requirement |
|----------|-------------|
| `POST /api/enquiry` | Accept contact / admission enquiries; spam-guarded; persist to `queries`; support WhatsApp handoff |

---

## 6. Functional requirements

### 6.1 Public website

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | Site must present both brands with clear visual identity (Institute indigo/blue; Kids orange accents) | Must |
| FR-02 | Visitors can switch between Main / Kids / Institute contexts without losing core CTAs | Must |
| FR-03 | Primary CTAs: Call, WhatsApp, Admissions, Contact | Must |
| FR-04 | Floating WhatsApp + Call buttons on public pages | Must |
| FR-05 | Contact and admission forms validate input (Zod / RHF) and store leads in Supabase | Must |
| FR-06 | After successful form submit, open WhatsApp with a prefilled message (existing UX) | Must |
| FR-07 | Announcement bar shows active notices filtered by world (Main / Kids / Institute) and date window | Must |
| FR-08 | Content pages fall back to static `src/data/*` when DB is empty or unavailable | Should |
| FR-09 | Light / dark theme toggle | Should |
| FR-10 | Responsive layout: usable on mobile and desktop | Must |
| FR-11 | SEO: unique titles/descriptions, sitemap, robots disallow `/admin` and `/api/` | Must |
| FR-12 | Admin routes must be `noindex` | Must |

### 6.2 Enquiry & spam protection

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-20 | Enquiry types: `contact`, `admission` | Must |
| FR-21 | Brand tagging: `preschool`, `institute` (and main where applicable) | Must |
| FR-22 | Spam guard on `/api/enquiry` (honeypot / rate / heuristics as implemented) | Must |
| FR-23 | Lead statuses in admin: `new`, `read`, `done` | Must |

### 6.3 Admin CMS

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-30 | Only authenticated Supabase users can access `/admin/*` (except login) | Must |
| FR-31 | Public signup disabled; admin users created manually in Supabase | Must |
| FR-32 | Logout must clear session so re-login works reliably | Must |
| FR-33 | CRUD for courses, faculty, leadership, testimonials, events, gallery, announcements | Must |
| FR-34 | Media uploads to Supabase Storage bucket `media` | Must |
| FR-35 | Settings page updates single `site_settings` row used site-wide | Must |
| FR-36 | Queries inbox supports brand/type filters and quick WhatsApp / call | Must |

### 6.4 Content domains (what CMS must support)

| Domain | Key fields / notes |
|--------|-------------------|
| Courses | Name, description, category (`professional` / `degree` / `school`), etc. |
| Faculty | Name, role, category (`preschool` / `institute`), photo, department, subjects, batch, achievement, quote |
| Leadership | Founder / heads with photos and bios |
| Testimonials | Quote, name, category |
| Events | Title, date, type, brand |
| Gallery | Image, category, brand |
| Announcements | Message, link, active flag, date window, show on Main/Kids/Institute |
| Site settings | Phones, emails, WhatsApp numbers, addresses, hours, social URLs |

---

## 7. Business content requirements (baseline)

### 7.1 Location

Both brands share campus context around:

**A-374 / A Block Part-2 374, Street No. 11, Mahavir Enclave Part 2, New Delhi 110059**

### 7.2 Contact (defaults; editable in Settings)

| | Institute | Kids |
|--|-----------|------|
| Phone | +91 92136 10182 | +91 92208 25187 |
| WhatsApp | 919213610182 | 919220825187 |
| Email | opinstituteofstudies@gmail.com | opkidspreschool@gmail.com |

### 7.3 Hours (defaults)

- **Institute:** Mon–Sat (closes ~9:00 PM); Sunday closed  
- **Kids:** closes ~6:00 PM  

### 7.4 Programs (must remain discoverable)

**OP Kids:** Play Group (2–3), Nursery (3–4), LKG (4–5), UKG (5–6)

**OP Institute:** CMA; B.Com Pass / Hons; Class I–VIII; IX–X CBSE; XI–XII Commerce

### 7.5 Admissions

Admissions messaging should stay year-aware (e.g. session **2026–27**). Update copy each academic cycle via CMS or page content.

---

## 8. Non-functional requirements

| ID | Area | Requirement |
|----|------|-------------|
| NFR-01 | Performance | Fast mobile LCP; use Next.js Image / ISR (`revalidate` ~60s on content pages) |
| NFR-02 | Accessibility | Semantic HTML, readable contrast, usable forms on mobile |
| NFR-03 | Security | Admin behind auth; RLS so public can read published content / insert queries only as designed; no public signup |
| NFR-04 | Reliability | Site remains browsable if Supabase is down (static fallbacks where present) |
| NFR-05 | Maintainability | Env-based Supabase URL/keys; schema + migrations documented |
| NFR-06 | Hosting | Deploy on Vercel (or equivalent Node host); custom domain when ready |
| NFR-07 | Locale | Primary language English (India); `en_IN` metadata |

---

## 9. Technical constraints (current stack)

| Layer | Choice |
|-------|--------|
| Framework | Next.js (App Router) + React + TypeScript |
| UI | Tailwind CSS + Framer Motion + Lucide icons |
| Forms | React Hook Form + Zod |
| Backend data | Supabase (Postgres + Auth + Storage) |
| Auth | Supabase email/password; SSR cookies via `@supabase/ssr` |
| Theme | `next-themes` |

**Environment variables (required):**

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Canonical production URL (update when custom domain is live):** `https://opinstitute.vercel.app` — also set in `siteConfig.url`.

---

## 10. Data model (high level)

| Table | Purpose |
|-------|---------|
| `queries` | Form leads (`type`, `status`, `brand`) |
| `courses` | Institute programs |
| `faculty` | Teachers |
| `testimonials` | Reviews |
| `events` | Events |
| `gallery` | Images |
| `leadership` | Founder / heads |
| `announcements` | Banner notices |
| `site_settings` | Single-row contact & social config |

**Storage:** public-read bucket `media` (authenticated write).

Full SQL: `supabase/schema.sql` + `supabase/migrations/`.

---

## 11. Integrations

| Integration | Status | Notes |
|-------------|--------|-------|
| Supabase | Required | Content, auth, storage, queries |
| WhatsApp (`wa.me`) | Required | CTAs + post-form open |
| Google Maps embeds | Required | Contact page; no Maps API key |
| Social links | Required | Facebook, Instagram, YouTube per brand |
| Transactional email | Not built | Forms do not send email today |
| Analytics (GA / GTM) | Not built | Add later |
| Payments | Out of scope | — |
| Student LMS | Out of scope | — |

---

## 12. Out of scope (v1 / current product)

Do **not** treat these as existing requirements unless a new PRD version adds them:

1. Online fee payment or fee structure CMS  
2. Student / parent login portal  
3. Multi-role admin (teacher vs super-admin) — today any Auth user is full admin  
4. Automated email / SMS notifications on new enquiry  
5. Live chat widget (WhatsApp is the channel)  
6. Multi-campus complex routing beyond current settings fields  
7. Native mobile apps  

---

## 13. Known gaps & follow-ups

Track these as future work (not bugs unless they regress current Musts):

| Gap | Impact | Suggested follow-up |
|-----|--------|---------------------|
| No analytics | Hard to prove conversion | Add GA4 + Search Console |
| No email on enquiry | Staff may miss leads if they don’t open admin | Optional Resend / email alert |
| Any Auth user = admin | Security risk if signup ever enabled | Keep signup off; later add roles |
| Placeholder Unsplash imagery | Trust / authenticity | Replace with real campus photos |
| Custom domain / `siteConfig.url` | SEO / branding | Point domain and update URL |
| `linkedin` columns unused in UI | Dead schema | Wire UI or remove |
| Empty static faculty fallback | Faculty blank if DB empty | Seed real faculty |

---

## 14. Acceptance criteria (definition of done for core product)

The product is considered meeting this PRD when:

1. Public pages listed in §5.2 load on mobile and desktop.  
2. Kids and Institute worlds are distinguishable and navigable.  
3. Contact + admission forms create rows in `queries` and open WhatsApp.  
4. Staff can log in, manage all CMS entities in §5.3, and log out / log back in reliably.  
5. Announcements respect world targeting and active date windows.  
6. `/robots.txt` blocks `/admin` and `/api/`; `/sitemap.xml` lists public marketing URLs.  
7. Env-configured Supabase project powers content without code changes for routine updates.

---

## 15. Document history

| Version | Date | Author | Notes |
|---------|------|--------|-------|
| 1.0 | 30 Jul 2026 | Project team | Initial PRD from current codebase & business context |

---

## 16. Related docs

| Doc | Purpose |
|-----|---------|
| [HANDOVER.md](./HANDOVER.md) | Start here to transfer the project |
| [Architecture.md](./Architecture.md) | System design, folder map, auth, data & enquiry flows |
| [Rules.md](./Rules.md) | Coding & product conventions for contributors / AI |
| [Phases.md](./Phases.md) | Roadmap: done / now / next / later / parked |
| [Design.md](./Design.md) | Colors, type, logos, UI patterns, do/don’t |
| [Memory.md](./Memory.md) | Decisions, contacts, gotchas, incident log |
| [SETUP.md](./SETUP.md) | Local + Supabase + Vercel setup |
| [DATABASE.md](./DATABASE.md) | Tables, RLS, migrations |
| [CMS-GUIDE.md](./CMS-GUIDE.md) | Staff admin panel guide |
