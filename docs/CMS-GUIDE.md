# CMS Guide (Admin Panel)

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**For:** Staff who update the website (non-developers)  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [HANDOVER.md](./HANDOVER.md) · [Memory.md](./Memory.md)

Admin URL: **`/admin/login`** on your live site  
(Example: `https://your-domain.com/admin/login`)

---

## 1. Login & logout

1. Open `/admin/login`.
2. Enter the staff **email** and **password** (given by the admin / developer).
3. Click **Sign in**.
4. To leave: click **Logout** in the sidebar.

**Tips**

- Do not share the password on WhatsApp in plain text long-term — use a password manager.
- If login fails after logout, hard-refresh the page (or try Incognito) and try again.
- New staff accounts are created only in **Supabase** by a technical owner — there is no “Sign up” on the website (by design).

---

## 2. Menu map

| Menu | What it controls | Shows on website |
|------|------------------|------------------|
| **Dashboard** | Quick overview | — |
| **Queries** | Contact + admission form leads | Not public (staff only) |
| **Announcements** | Top notice bar | Main / Kids / Institute (you choose) |
| **Courses** | Coaching programs | Courses page / Institute |
| **Leadership** | Founder & heads (+ photos) | About / home founder strip |
| **Faculty** | Teachers | Faculty page |
| **Testimonials** | Parent / student text reviews | Home & brand pages |
| **Events** | Events list | Events page |
| **Gallery** | Photos (front desk, Kids collage, etc.) | Gallery + home About photo |
| **Videos** | Founder / parent / student videos | About, OP Kids, Institute |
| **Settings** | Phones, emails, WhatsApp, address, hours, social links | Whole site |

After you save, the public site usually updates within **about 1 minute** (sometimes a refresh is needed).

---

## 3. Daily work: Queries (leads)

1. Open **Queries**.
2. New form submissions appear as status **new**.
3. Open a lead → call or WhatsApp the parent/student (buttons help).
4. Mark **read** when you have seen it, **done** when follow-up is finished.
5. Use filters if available (contact vs admission, Kids vs Institute).

**Important:** Leads are **not** emailed automatically today. Check Queries regularly (or ask the developer to add email alerts later).

---

## 4. Announcements

Use for admissions open, holidays, special notices.

| Field | Tip |
|-------|-----|
| Title / message | Keep short — it sits at the top of the site |
| Link | Optional (e.g. Admissions page) |
| Show on Main / Kids / Institute | Tick only the worlds that should see it |
| Active | Turn off instead of deleting if you may reuse it |
| Start / end dates | Use so old notices auto-stop |

---

## 5. Content tips (Courses, Faculty, Events, Gallery, Testimonials, Leadership)

### General

- Fill **name/title** clearly — this is what visitors read.
- Choose the correct **brand / category**:
  - **preschool** = OP Kids  
  - **institute** = OP Institute  
- Use **sort order** (if shown) so important items appear first.
- Prefer **real photos** of campus and teachers over stock images.

### Faculty photos

- Upload a clear face photo.
- Use the crop tool if offered so the face is centered.
- If there is no photo, the site may show initials — that is OK.

### Gallery

- Add alt text when possible (short description).
- Tag brand correctly so Kids gallery doesn’t mix with Institute.
- **Show as = Front desk / office** → home About Institute photo + About page story image.
- **Show as = Reception** → fallback front-office photo.
- **Kids brand + low Order** → home Kids collage / Kids world showcase (up to 4).
- Caption/alt is the label on the Kids world showcase.

### Videos (Admin → Videos)

| Type | Where it shows |
|------|----------------|
| **Founder message** | About page |
| **Parent review — OP Kids** | `/op-kids` |
| **Student experience — Institute** | `/institute` |

- Prefer a **YouTube link** (easy + fast). Or upload a small MP4.
- Turn **Show on website** on.
- Use Order so the best video appears first.

### Leadership photos

- Admin → **Leadership** → upload Founder / Mona / Meenakshi photos (square crop).
- These appear on About and the home founder strip.

### Courses

- Categories are typically: professional / degree / school.
- Keep descriptions short and scannable.

---

## 6. Settings (phones & social)

Open **Settings** when numbers, WhatsApp, email, address, hours, or social links change.

| Update this… | Effect |
|--------------|--------|
| Institute phone / WhatsApp | Call buttons, footer, floating buttons for Institute |
| Kids phone / WhatsApp | Same for OP Kids |
| Emails | Contact / mailto links |
| Addresses | Contact page |
| Hours | Contact / footer style info |
| Facebook / Instagram / YouTube | Footer & social icons (per brand) |

Double-check WhatsApp numbers include country code digits (e.g. `9192…`) as used on the site.

Save once, then open the public Contact page and tap Call / WhatsApp once to verify.

---

## 7. Brand worlds (quick reminder)

| Website path | Meaning |
|--------------|---------|
| `/` | Main — both brands |
| `/op-kids` | Kids-focused |
| `/institute` | Coaching-focused |

When adding gallery, events, announcements, or faculty, always ask: **Kids, Institute, or both?**

---

## 8. Do / Don’t

| Do | Don’t |
|----|--------|
| Keep Queries cleared regularly | Ignore “new” leads for days |
| Turn announcements off when expired | Leave old “Admissions open 2024” live |
| Use real campus photos | Upload blurry / unrelated stock forever |
| Logout on shared computers | Leave Admin open on a public PC |
| Ask tech owner to add a new staff login | Try to “register” a public account |

---

## 9. Who to call when stuck

| Issue | Who |
|-------|-----|
| Forgot password / can’t log in | Technical owner (Supabase Auth reset) |
| Form leads not appearing | Technical owner (API / Supabase) |
| Wrong number on floating button after Settings save | Wait ~1 min + hard refresh; if still wrong → tech |
| Need a new Admin user | Technical owner only |

Business contacts and defaults: see [Memory.md](./Memory.md).

---

## Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Staff CMS guide for handover |
