# Design

**Project:** OP Institute of Studies & OP Kids Pre School Website  
**Version:** 1.0  
**Last updated:** 30 July 2026  
**Related:** [PRD.md](./PRD.md) · [Architecture.md](./Architecture.md) · [Rules.md](./Rules.md) · [Phases.md](./Phases.md) · [Memory.md](./Memory.md)

This is the visual source of truth for the live site. **Extend the existing system** — do not invent a new look (no generic purple SaaS, cream/serif terracotta, or newspaper layouts).

**Code sources:** `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ui/*`

---

## 1. Brand worlds

| World | Audience feel | Primary color family | Accent |
|-------|---------------|----------------------|--------|
| **Institute** | Serious, trustworthy coaching since 2003 | Indigo / blue `brand-*` | Soft gold for leadership accents |
| **Kids** | Warm, playful, safe preschool | Orange `kids-*` | Pink + purple (`accent-pink`, `accent-purple`) |
| **Main (`/`)** | Both brands together | Institute chrome by default; Kids sections use kids tokens | Don’t muddle both palettes in one component |

**Voice (UI copy)**

- Institute: clear, confident, education-focused (“Excellence…”, courses, faculty).
- Kids: warm and simple (“Where Kids Love to Learn”), avoid jargon.
- Never write as if both brands are one unnamed “academy” on brand-specific pages.

---

## 2. Logos & assets

| Asset | Path | Use |
|-------|------|-----|
| Institute logo | `/logos/op-institute-logo.png` | Nav, footer, admin login, OG contexts |
| Kids logo | `/logos/op-kids-logo.png` | Kids world, dual-brand lockups |
| OG image | `/og-image.jpg` | Social share (1200×630) |

**Rules**

1. Prefer official logo files over text-only brand marks in heroes/nav.
2. On white or light UI, use the full-color logos; on dark/brand gradients, keep logos in white rounded plates when contrast fails (admin login pattern).
3. Don’t stretch logos; keep square-ish mark containers consistent (`rounded-2xl` plates are fine for lockups).
4. Replace Unsplash placeholders with real campus photos over time (Phase 2).

---

## 3. Color system

### 3.1 Institute — `brand`

| Token | Hex | Typical use |
|-------|-----|-------------|
| `brand-50` | `#eef0ff` | Tints, page hero wash |
| `brand-100` | `#dde1ff` | Soft backgrounds |
| `brand-200` | `#c2c8ff` | Borders / hover edges |
| `brand-300` | `#9aa3ff` | — |
| `brand-400` | `#7e83ff` | Scrollbar, light accents |
| `brand-500` | `#4b52e1` | Mid accent, gradient end |
| `brand-600` | `#3f45e4` | **Primary CTA**, links, rings |
| `brand-700` | `#3539b8` | CTA hover |
| `brand-800` | `#2d3094` | Deep text accents |
| `brand-900` | `#1d2951` | Deep navy (heroes, dark chrome) |
| `brand-950` | `#141b3d` | Near-black navy |

### 3.2 Kids — `kids` + accents

| Token | Hex | Typical use |
|-------|-----|-------------|
| `kids-500` | `#f97316` | Kids primary |
| `kids-600` | `#ea580c` | Kids emphasis / eyebrows |
| `accent-pink` | `#ec4899` | Kids gradients |
| `accent-purple` | `#a855f7` | Kids gradients |
| `accent-teal` | `#14b8a6` | Occasional highlight |
| `accent-yellow` | `#facc15` | Occasional highlight |

Kids CTA / title treatment: `from-kids-500 via-accent-pink to-accent-purple` (see `Button` variant `kids`, `.kids-gradient-text`).

### 3.3 Gold — leadership / prestige

Use `gold-*` sparingly (founder / leadership highlights), not as the main site theme.

### 3.4 Semantic surfaces (CSS variables)

Light / dark via `next-themes` class strategy:

| Token | Light | Dark role |
|-------|-------|-----------|
| `--background` | Cool gray wash | Deep navy-black |
| `--foreground` | Navy-ish text | Near white |
| `--muted` / `--muted-foreground` | Secondary text & fills | Dimmed |
| `--border` | Hairline borders | Dark borders |
| `--ring` | Focus ring ≈ brand | Brand-tinted |

Prefer `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border` for shared chrome so dark mode keeps working.

---

## 4. Gradients (named)

Defined in `tailwind.config.ts`:

| Class | Intent |
|-------|--------|
| `bg-page-hero-gradient` | Inner page heroes (soft brand tint → gray) |
| `bg-accent-gradient` | Institute brand wash |
| `bg-kids-gradient` | Kids brand wash |
| `bg-hero-gradient` | Neutral light hero fallback |
| `.gradient-text` | Institute headline clip |
| `.kids-gradient-text` | Kids headline clip |

Admin login uses a custom deep navy → brand diagonal (keep that “secure staff” feel if restyling).

---

## 5. Typography

| Role | Family | Tailwind | Notes |
|------|--------|----------|-------|
| Body / UI | **Inter** | `font-sans` | Default on `body` |
| Display / titles | **Poppins** | `font-display` | Section titles, heroes, brand names |

Loaded in `src/app/layout.tsx` as `--font-inter` / `--font-poppins`.

### Scale patterns (existing)

| Element | Pattern |
|---------|---------|
| Section title (`SectionHeader`) | `font-display` bold; ~`1.6rem` → `text-5xl` across breakpoints; `tracking-tight`; `text-balance` |
| Eyebrow | `.eyebrow` — uppercase, wide tracking, small, brand/kids colored, with rule lines |
| Body | `text-sm` / `base` / `lg` with `leading-relaxed` for subtitles |
| Muted support | `text-muted-foreground` |

**Don’t** switch the site to a serif display or a different Google font stack without an explicit brand decision.

---

## 6. Layout & spacing

| Utility | Use |
|---------|-----|
| `.container-custom` | `max-w-7xl` + responsive horizontal padding |
| `.section-padding` | Vertical rhythm `py-14` → `md:py-28` |
| `.page-hero` | Top padding under fixed nav + page hero gradient |

**Composition rules (marketing pages)**

1. One job per section: one headline, one short support line, one primary action cluster.
2. Home first viewport: brand presence + one clear story + CTAs — don’t dump stats, schedules, and address blocks into the hero.
3. Prefer full-bleed / edge-to-edge hero treatments already used (`SplitHero` and brand homes) over new inset “card heroes.”
4. Mobile-first: primary audience is on phones; floating Call / WhatsApp must stay reachable (`safe-area-pb` where needed).

---

## 7. Components & patterns

### Buttons (`components/ui/Button.tsx`)

| Variant | When |
|---------|------|
| `primary` | Default Institute CTA |
| `secondary` / `outline` / `ghost` | Secondary actions |
| `kids` | Kids-world primary CTA (gradient) |

Sizes: `sm` | `md` | `lg`. Keep `rounded-lg`, focus ring on `brand-500`, `active:scale-[0.98]`.

### Section headers

Use `SectionHeader` with `variant`: `default` | `kids` | `light` instead of one-off title markup.

### Cards

| Class | When |
|-------|------|
| `.premium-card` | Interactive content tiles (hover lift + brand border) |
| `.glass` / `.glass-card` | Overlay / soft panel looks |
| `.tap-card` | Mobile press feedback |

Don’t wrap every paragraph in a card. Cards are for scannable items or interactive surfaces.

### Chrome

Public: announcements → Navbar → main (`PageTransition`) → Footer → FloatingButtons → BackToTop.  
Admin: no marketing chrome (`SiteChrome` early-return).

---

## 8. Motion

Existing tools: Framer Motion, `ScrollReveal`, `PageTransition`, Tailwind animations (`fade-in`, `slide-up`, `float`, `marquee`, `animate-gradient-x`).

**Rules**

1. Motion supports hierarchy (entrance, hover) — not decoration spam.
2. Honor `prefers-reduced-motion` (already reduced globally in `globals.css`).
3. Marquee pauses on hover — keep that affordance if you reuse it.
4. 2–3 intentional motions per major landing experience is enough.

---

## 9. Imagery

1. Use `next/image` with allowed remotes: Unsplash (legacy placeholders), `**.supabase.co` (CMS uploads).
2. Faculty without photo → initials UI (don’t force a stock male avatar).
3. Prefer sharp, real photos of classrooms, kids activities, campus — authenticity over stock.
4. Crop uploads via admin `ImageCropper` when adding people photos.

---

## 10. Iconography

- Library: **Lucide React**
- Keep stroke icons consistent in size within a row (`w-4 h-4` / `w-5 h-5`)
- Don’t mix emoji into primary UI chrome

---

## 11. Dark mode

- Strategy: `class` on `html` via `ThemeProvider` / `ThemeToggle`
- New shared components must include `dark:` variants for backgrounds, borders, and text
- Brand CTAs can stay saturated; ensure text on brand fills remains white

---

## 12. Do / Don’t

| Do | Don’t |
|----|--------|
| Use `brand-*` for Institute, `kids-*` + accents for Kids | Recolor the whole site purple/indigo SaaS |
| Use Poppins for display, Inter for body | Introduce Inter-only or system-ui-only branding |
| Reuse `SectionHeader`, `Button`, container/section utilities | Invent parallel header/button systems |
| Keep floating Call + WhatsApp | Hide primary contact paths behind long forms only |
| Match admin to functional clarity (still on-brand blues) | Make admin a second unrelated design language |
| Check mobile + dark mode on UI changes | Desktop-only layouts |

---

## 13. Quick reference — Tailwind starters

```tsx
/* Institute CTA */
className="bg-brand-600 hover:bg-brand-700 text-white"

/* Kids CTA */
className="bg-gradient-to-r from-kids-500 via-accent-pink to-accent-purple text-white"

/* Section title */
className="font-display font-bold tracking-tight text-foreground"

/* Eyebrow */
className="eyebrow" // or SectionHeader badge + variant="kids"

/* Page shell */
className="container-custom section-padding"
```

---

## 14. Document history

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 30 Jul 2026 | Initial design system from live tokens & components |
