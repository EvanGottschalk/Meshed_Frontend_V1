# Additional Pages

Pages on the site beyond the landing page (`/`). Each entry: route, purpose, frontend file, notes.

---

## `/pricing` — Pricing

**Purpose:** Standalone pricing page. Pre-launch posture: three plan-card scaffolds (`Operator` / `Studio` / `Network`) with placeholder values, a feature-comparison table, and an FAQ. Every CTA on this page routes to the early-access form on the homepage's Activate section (or its own form if visited directly).

**Frontend:** `app/pricing/page.tsx`

**Components used:**
- `components/layout/TopMenu.tsx`
- `components/pricing/PricingHero.tsx`
- `components/pricing/PlanCard.tsx`
- `components/pricing/ComparisonTable.tsx`
- `components/pricing/PricingFAQ.tsx`
- `components/layout/Footer.tsx`

**Config sources:**
- `config/content.ts` → `PRICING` namespace (hero copy, plan definitions, comparison rows, FAQ Q&A)
- `config/site.ts` → business name, contact email
- `config/nav.ts` → `/pricing` registered in `NAV_PRIMARY` and footer Product group

**Notes:**
- Per-plan pricing values are placeholders (`"Talk to us"`) until pricing is set — see `Tasks for Humans.md`.
- Plan card scaffold names (`Operator` / `Studio` / `Network`) are working names, not final.
- Page is not registered in `config/sections.ts` (that registry is for homepage Body sections only).
