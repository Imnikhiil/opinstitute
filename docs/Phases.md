# Phases

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [PRD.md](./PRD.md) · [Architecture.md](./Architecture.md) · [Rules.md](./Rules.md) · [Design.md](./Design.md) · [Memory.md](./Memory.md)

Use this roadmap to decide **what to build next**. Status reflects the product as of July 2026.

| Status | Meaning |
|--------|---------|
| Done | Shipped and in use |
| Now | Current focus / finish before calling “launch complete” |
| Next | Near-term after Now |
| Later | Valuable but not blocking |
| Parked | Out of scope until PRD explicitly changes |

---

## Phase overview

```
Phase 0  Foundation          ████████████  Done
Phase 1  Dual-brand + CMS    ████████████  Done
Phase 2  Launch hardening    ████████░░░░  Now
Phase 3  Growth & trust      ░░░░░░░░░░░░  Next
Phase 4  Ops maturity        ░░░░░░░░░░░░  Later
Phase 5+ Expansion           ░░░░░░░░░░░░  Parked
```

---

## Phase 0 — Foundation *(Done)*

**Goal:** Runnable Next.js site with branding, routing shell, and deploy path.

| Deliverable | Status |
|-------------|--------|
| Next.js App Router + TypeScript + Tailwind | Done |
| Dual brand identity (Institute + Kids) | Done |
| Core public routes (home, about, courses, faculty, gallery, events, admissions, contact) | Done |
| Brand worlds `/op-kids`, `/institute` | Done |
| Vercel-ready build + env pattern | Done |
| SEO basics (metadata, sitemap, robots) | Done |

**Exit criteria:** Site builds and public pages render with static/fallback content.

---

## Phase 1 — Dual-brand CMS & enquiries *(Done)*

**Goal:** Staff can manage content and leads without code deploys; visitors can enquire.

| Deliverable | Status |
|-------------|--------|
| Supabase schema, RLS, `media` bucket | Done |
| Public data layer + static fallbacks | Done |
| Admin auth (email/password) + middleware gate | Done |
| CMS: courses, faculty, leadership, testimonials, events, gallery | Done |
| Announcements (Main / Kids / Institute targeting) | Done |
| Site settings (phones, emails, WhatsApp, hours, social) | Done |
| Contact + admission forms → `queries` | Done |
| Spam guard (honeypot, timing, rate limit) | Done |
| WhatsApp handoff after form submit | Done |
| Admin queries inbox | Done |

**Exit criteria:** Staff login works; CMS CRUD works; forms create leads; WhatsApp opens. *(Met — see PRD §14.)*

---

## Phase 2 — Launch hardening *(Now)*

**Goal:** Production-ready for daily parent traffic and staff use — trust, stability, docs.

### 2.1 Must finish

| Item | Why | Owner hint |
|------|-----|------------|
| Real campus / class photos replace Unsplash placeholders | Trust | Content + Admin Gallery |
| Seed real faculty (and static fallback if desired) | Faculty page empty without DB | Content |
| Custom domain + update `siteConfig.url` | Branding & SEO | Deploy |
| Confirm Supabase: signup OFF, admin user exists, backups understood | Security | Ops |
| Auth login ↔ logout ↔ login verified on production | Session bugs already fixed in code | QA |
| Staff knows how to use Admin (short guide) | Ops | Docs → `CMS-GUIDE.md` |

### 2.2 Should finish

| Item | Why |
|------|-----|
| `SETUP.md` + `DATABASE.md` + `CMS-GUIDE.md` + `HANDOVER.md` | Onboarding / disaster recovery / staff |
| Follow `Design.md` for UI changes | Consistent visual system |
| Wire or remove unused `linkedin` fields | Schema hygiene |
| Review announcement + admissions year copy for current session | Accuracy |

### 2.3 Exit criteria

- [ ] Live domain serves the site with correct canonical URL  
- [ ] Gallery / key heroes use real photos for both brands  
- [ ] Faculty shows real teachers from CMS  
- [ ] Staff can update content and clear a test enquiry end-to-end  
- [ ] Core docs present: see `docs/HANDOVER.md` (full pack)

---

## Phase 3 — Growth & trust *(Next)*

**Goal:** Measure what works and never miss a lead.

| Item | Priority | Notes |
|------|----------|-------|
| Google Analytics 4 (or equivalent) | High | Exclude `/admin` if possible |
| Google Search Console | High | Sitemap submit, domain verify |
| Email (or WhatsApp) alert on new enquiry | High | e.g. Resend → staff inbox; don’t replace Admin |
| Conversion tracking on Call / WhatsApp / form success | Medium | Prove Phase 0–2 ROI |
| Performance pass (LCP on mobile home + admissions) | Medium | Real images make this urgent |
| Prefer CMS content over Unsplash everywhere remaining | Medium | Ongoing content |

**Exit criteria:** You can answer “how many enquiries this week?” and “which page sent them?” without guessing; staff get notified of new leads.

---

## Phase 4 — Ops maturity *(Later)*

**Goal:** Safer multi-staff use and cleaner product edges.

| Item | Priority | Notes |
|------|----------|-------|
| Admin roles (viewer vs editor vs super-admin) | Medium | Only if more than 1–2 staff need access |
| Enquiry status workflows / notes / assignment | Medium | Beyond new / read / done |
| Distributed rate limiting (vs in-memory) | Low | If traffic or multi-instance matters |
| Fees / brochure pages as CMS content (display only) | Low | Still no payments |
| A/B or simpler landing experiments for admissions | Low | Needs analytics first |
| Accessibility audit pass | Medium | Forms + contrast + focus |

**Exit criteria:** Two staff can work without sharing one login; lead handling is auditable.

---

## Phase 5+ — Expansion *(Parked)*

Do **not** start these unless [PRD.md](./PRD.md) is updated and Phase 2–3 goals are largely met.

| Idea | Why parked |
|------|------------|
| Online fee payment / gateway | Ops + compliance; not needed for current conversion model |
| Student / parent login portal | Different product |
| Full LMS / attendance / homework | Different product |
| Native mobile apps | Web + WhatsApp sufficient |
| Multi-campus complex product | Single campus model today |
| Live chat widgets (Tawk, etc.) | WhatsApp is the channel — avoid overlap |

---

## Suggested sequence (practical)

1. **This week (Phase 2):** real photos, faculty seed, domain + `siteConfig.url`, production auth smoke test.  
2. **Next (Phase 2 docs):** CMS guide for Mona / Meenakshi / whoever runs Admin.  
3. **Then (Phase 3):** GA4 + Search Console + enquiry email alert.  
4. **Only if needed (Phase 4):** roles and richer query workflows.  
5. **Never by accident (Phase 5+):** payments / LMS without a new PRD.

---

## Phase checklist template

Copy when starting a phase slice:

```text
Phase: _
Goal: _
In scope:
- 
Out of scope:
- 
Done when:
- [ ]
Risks:
- 
```

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial roadmap from shipped product + PRD gaps |
