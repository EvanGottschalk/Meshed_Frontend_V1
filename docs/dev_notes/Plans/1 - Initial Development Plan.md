# 1 — Initial Development Plan: Meshed Landing Page

This is the v1 plan for the Meshed marketing site. It defines the brand direction, section-by-section structure, the config surface, the animation system, and a phased build order. It is intended to be read top-to-bottom before any code is written.

---

## 1. Product Positioning (single source of truth for copy)

**What Meshed is**
The human-verified coordination and value-routing layer for investment ecosystems. AI agents (per-user "Doppelgängers") read context from a user's connected accounts (LinkedIn, X, Instagram, GitHub, Gmail) and use that context to discover, coordinate, and execute high-value connections between verified humans — investors, founders, employees, advisors, LPs.

**What Meshed replaces**
Passive networks where capital sits and relationships go cold. Job boards that leave individuals to fend for themselves. Manual investor-to-portfolio matchmaking.

**Three audiences (LOCKED priority order for the site)**
1. **VC & LP** — portfolio optimization + LP/advisor activation
2. **Business / Founders** — collaboration matchmaking + contact automation
3. **Individuals** — "ChatGPT for finding work" + income optimization + progressive feedback

**Three feature pillars**
1. **Meshed Agents** — AI Doppelgängers that aggregate context, understand it, and execute
2. **Informed Context System** — efficient non-redundant questions; locally stored sensitive data; encrypted-temp-only access to private data
3. **Meshed Upcycled** — when startups fail, talent + knowledge get re-routed into the ecosystem

**Hero tagline (LOCKED)**
> *The human-verified coordination and value-routing layer for investment ecosystems.*

**Hero subheading (recommended)**
> Meshed turns passive capital networks into active value networks. AI Doppelgängers discover the right people, surface the right opportunities, and execute the right actions — with verified humans accountable at every step.

(Alternates pulled from `Site Content Files/Meshed Content Summary.md` are preserved in `config/content.ts` so we can A/B without code changes.)

---

## 2. Brand & Visual Direction

**Inspiration anchors** — Stripe (animated gradient + density without clutter), Linear (precision spacing, dark mode polish, scroll-triggered live UI previews), Vercel (terminal-grade minimalism, the page is itself the proof), Notion (warm character + bold headline), Figma (interactive moment above the fold). Meshed sits closest to **Linear × Stripe**: technical, premium, but with a vivid living network metaphor borrowed from the logo.

**Logo system**
The Meshed logo is a multicolor mesh graph: a head-shaped network of nodes connected by edges, colored across a full spectrum (cyan → blue → purple → magenta → red → orange → yellow). This graph is the brand. It informs:
- The hero centerpiece (an animated, force-directed mesh of verified-human nodes)
- The accent gradient used across CTAs, hover states, divider rules
- The icon language (small node clusters used to mark feature blocks)

**Color tokens (LOCKED — full-spectrum logo accents over a dark Linear-style base)**

| Token | Value | Use |
|---|---|---|
| `bg.base` | `#07080C` (near-black) | Primary surface (dark mode default, matches Linear/Vercel) |
| `bg.elevated` | `#0F1117` | Cards, agent panels |
| `bg.alt` | `#FFFFFF` | Inverted sections (Upcycled, Final CTA — break the dark monotony) |
| `fg.primary` | `#F2F4F8` | Body text on dark |
| `fg.secondary` | `#9AA0AC` | Muted text |
| `border.subtle` | `#1B1F2A` | Hairlines |
| `accent.cyan` | `#3DC7E0` | Logo-spectrum left |
| `accent.violet` | `#7A5BFF` | Logo-spectrum mid-left |
| `accent.magenta` | `#E45BC9` | Logo-spectrum mid |
| `accent.orange` | `#F58A3C` | Logo-spectrum mid-right |
| `accent.gold` | `#F5C84A` | Logo-spectrum right |
| `gradient.brand` | `linear-gradient(90deg, cyan → violet → magenta → orange → gold)` | Hero glyph, CTAs, dividers |

**Typography**
- **Display:** *Inter Display* or *Geist* (next/font, variable weights). Tight tracking on hero, generous on body.
- **Body:** *Inter* variable.
- **Mono:** *JetBrains Mono* or *Geist Mono* — for agent-question UI, integration tags, code-flavored UI.
- All loaded via `next/font` with `display: 'swap'` and stored in `config/theme.ts`.

**Voice**
Confident, technical, outcome-driven. Short verb-led sentences. Avoid "revolutionary," "seamless," or hype-marketing tropes. Lead with what Meshed *does*, not what it *is*. Reference patterns: Linear ("The product development system for teams and agents"), Stripe ("Financial infrastructure to grow your revenue").

---

## 3. Tech Stack & Project Setup

Already specified in `Site Software Architecture.md` — recapping the operating contract:

- **Framework:** Next.js 14+ (App Router), TypeScript strict mode
- **Styling:** Tailwind CSS, theme tokens flow `config/theme.ts` → `tailwind.config.ts` → utility classes
- **Animation:** Framer Motion (scroll-triggered reveals, hero interactions); CSS for hover micro-interactions; `@react-three/fiber` + `three` *only* for the hero mesh visualization (gated, lazy-loaded)
- **Icons:** Lucide React
- **Deployment target:** Vercel
- **Lint/format:** ESLint (Next config) + Prettier + Tailwind plugin

**Phase-0 setup tasks** (before any sections are built):

1. `npx create-next-app@latest` with TS + Tailwind + ESLint + App Router
2. Create directory structure exactly as defined in `Site Software Architecture.md` §Directory Structure
3. Wire up `next/font` for Inter/Geist + JetBrains Mono in `app/layout.tsx`
4. Stub all six config files (`site.ts`, `nav.ts`, `sections.ts`, `content.ts`, `theme.ts`, `legal.ts`) — even if values are placeholders, the file must exist so the import surface is stable from day one
5. Wire `theme.ts` tokens into `tailwind.config.ts` via `extend.colors` and `extend.fontFamily`
6. Implement `lib/types.ts` with `SectionProps` interface
7. Implement `lib/utils.ts` with `cn()` (clsx + twMerge) and any formatters needed
8. Build the **dynamic section route** (`app/[section-slug]/page.tsx`) before any section component exists, so each section is "standalone-ready" the moment it lands
9. Create a placeholder `app/page.tsx` that maps over `SECTIONS` and renders the corresponding component, also reading from the registry
10. Add `.env - Example` (currently zero entries — see §10) and `.gitignore` it real-`.env`-style
11. Configure `next.config.js` for image domains (none external yet)

---

## 4. Site Map & Section Sequence

Following the Hero → Body → Break alternation (no two consecutive Breaks per the CLAUDE.md rule):

```
[Top Menu]   (sticky, blurred, narrows on scroll)
   │
[Hero]                                        — Animated mesh graph + primary tagline + dual CTA
   │
[Body 1: The Problem]                         — Why static networks fail; morph diagram
   │
[Break 1: From passive → active]              — Big rotating-word headline strip
   │
[Body 2: Meshed Agents — Your Doppelgänger]   — Live agent panel mock + integration sources
   │
[Break 2: Integrations strip]                 — Logo wall (LinkedIn, X, Instagram, GitHub, Gmail)
   │
[Body 3: Built for Three Roles]               — Tabbed view: VC & LP / Business / Individual
   │
[Break 3: Privacy promise]                    — One-line: "Sensitive data never leaves your hardware."
   │
[Body 4: Meshed Upcycled]                     — Flow diagram: failed startup → talent + knowledge → ecosystem
   │
[Break 4: Proof of useful action]             — Tagline-only break ("Proof of useful action, not just participation.")
   │
[Body 5: Activate Your Network]               — Final CTA section (waitlist / demo / contact sales)
   │
[Footer]
```

Five Body sections (`/problem`, `/agents`, `/roles`, `/upcycled`, `/activate`) are each **routable as standalone pages** via `app/[section-slug]/page.tsx`. Slugs are registered in `config/sections.ts` and each section's `standalone` prop adjusts top-padding and shows a redundancy-suppressed heading.

---

## 5. Per-Section Specifications

### 5.0  Top Menu  (`components/layout/TopMenu.tsx`)

- **Layout:** logo-left, primary nav-center (Platform / Agents / Upcycled / Roles / Pricing*), CTA-right (`Sign in` ghost + `Request demo` filled gradient)
- **Behavior:** sticky, transparent at top, transitions to backdrop-blurred translucent dark on scroll past 64px (Framer Motion `useScroll` hook)
- **Mobile:** logo + hamburger; opens a full-screen sheet with the same items; closes on route change
- **Active link state:** subtle gradient-underline reflecting which section is currently in viewport (`useInView` per section, lifted to a context)
- **Source of truth:** `config/nav.ts` exports `NAV_PRIMARY`, `NAV_CTA`

\* Pricing is its own page at `/pricing` (see §5.12), not a homepage section. It is registered in `nav.ts` and `Additional Pages.md`.

### 5.1  Hero Section  (`components/hero/HeroSection.tsx`)

**Goal:** convey "active, intelligent network of verified humans" in three seconds.

- **Centerpiece:** an interactive force-directed mesh graph rendered with `react-force-graph` (or a custom Canvas/three.js fallback). 60–80 nodes representing verified humans (subtle avatar dots), 100–140 edges. Spectrum-colored edges that shimmer when a "value flow" pulse traverses them. On hover, a node lights up its 1-hop neighborhood; on idle, the graph slowly drifts. On mobile, the graph is a static SVG snapshot animated via masked gradient sweeps (60fps target on a mid-tier phone).
- **Copy block (left of mesh on desktop, above on mobile):**
  - Eyebrow: `MESHED PLATFORM` (mono, gradient text)
  - H1: *The human-verified coordination and value-routing layer for investment ecosystems.*
  - Subhead: 2 lines (see §1)
  - CTA pair: `Request early access` (gradient fill) + `See how it works` (ghost, scrolls to Body 1) — pre-launch tone, copy lives in `config/content.ts` so it can flip to `Request a demo` post-launch
  - Trust ribbon below: 5–7 placeholder LP/VC firm logos behind a subtle "Trusted by ecosystems including" eyebrow (real logos = Human Task)
- **Animation choreography:**
  - Mesh fades in node-by-node over 800ms on first paint
  - Headline letters fade-up with 12ms stagger
  - On scroll-out: mesh parallaxes slightly faster than text
- **Performance budget:** hero JS ≤ 80 KB gzipped; force-graph lazy-loaded behind a `<Suspense>` with a static SVG fallback.

### 5.2  Body 1 — The Problem  (`components/body/ProblemSection.tsx`, slug `problem`)

**Headline:** "Most investment networks are warehouses, not engines."
**Subhead:** "Capital sits. Relationships go cold. Founders solve problems other portfolio companies already solved last year. Talent leaks out when startups fail. The value is there — it just doesn't move."

- **Visual:** a two-state diagram. Left state: scattered grey nodes, no edges (passive). Right state: same nodes, now richly connected with spectrum-colored edges (active). A scroll-triggered Framer Motion sequence morphs left → right as the section enters the viewport.
- **Three pain bullets** below the diagram, one per audience (VC, Business, Individual), each with an icon.

### 5.3  Break 1 — From passive → active  (`components/break/PassiveToActiveBreak.tsx`)

- Single-line headline, full-bleed: `"From passive networks → to active value networks."`
- Word **"passive"** crossfades through alternates ("static," "cold," "quiet") on a 4s loop using Framer's `<AnimatePresence>`. **"active value networks"** stays put with a subtle gradient sweep.
- Height: ~32vh. No CTA.

### 5.4  Body 2 — Meshed Agents (Your Doppelgänger)  (`components/body/AgentsSection.tsx`, slug `agents`)

**Headline:** "Meshed Agents are your AI Doppelgänger inside the ecosystem."
**Subhead:** "Aggregation. Intelligence. Execution. — A bespoke, human-verified agent that continuously discovers, coordinates, and executes high-value connections."

- **Visual (right column on desktop, below copy on mobile):** a mocked product panel showing:
  - An agent message bubble: *"I read on Slack that you closed the Series A. Want me to introduce you to three founders in the portfolio who navigated post-Series-A hiring?"*
  - A second bubble with two action chips: `[ Yes — draft intros ]` `[ Skip ]`
  - A subtle integration footer showing animated logos (LinkedIn, X, Instagram, GitHub, Gmail) feeding into the agent
- **Copy (left column):** three short feature points, each with a node-cluster icon:
  - *Aggregation* — connects your accounts, reads context
  - *Intelligence* — never asks the obvious; only the high-value question
  - *Execution* — drafts intros, sends invites, books calendar
- Section interactions: panel auto-cycles three example exchanges, pauses on hover.

### 5.5  Break 2 — Integrations  (`components/break/IntegrationsBreak.tsx`)

- Headline: `"Aggregation + Intelligence + Execution"`
- Below: a horizontally scrolling (auto, slow, pauses on hover) strip of integration logos: **LinkedIn, X, Instagram, GitHub, Gmail** (extensible via `config/content.ts`)
- Subtle gradient mask on horizontal edges
- Height: ~28vh

### 5.6  Body 3 — Built for Three Roles  (`components/body/RolesSection.tsx`, slug `roles`)

**Headline:** "One platform, three operator modes."

- **Tabbed UI** with three tabs: `VC & LP`, `Business`, `Individual` (defaults to VC & LP).
- Each tab renders:
  - A short outcome statement
  - Two feature blocks (e.g., for VC: *Portfolio Optimization* + *Contact Automation*)
  - A mocked screenshot of the relevant product surface (illustration in v1, real product screenshot in v2)
- Tab switching: Framer Motion `layoutId` for the active tab indicator and crossfaded content.
- On mobile: tabs collapse to a vertical accordion.

### 5.7  Break 3 — Privacy Promise  (`components/break/PrivacyBreak.tsx`)

- Single-line: `"Sensitive data never leaves your hardware. Private data is never stored — only read in encrypted, ephemeral local environments."`
- Lock-glyph icon with a subtle pulsing gradient halo
- Height: ~28vh

### 5.8  Body 4 — Meshed Upcycled  (`components/body/UpcycledSection.tsx`, slug `upcycled`)

**Headline:** "When startups fail, value doesn't have to."
**Subhead:** "Meshed Upcycled routes talent and knowledge from inactive startups back into the ecosystem — preserving years of learning and re-deploying skilled people where they create the most value."

- **Visual:** a directional flow diagram — node cluster labeled *Inactive Startup* on the left, fanning into two rivers of nodes labeled *Talent* and *Knowledge*, then re-converging into the broader ecosystem mesh on the right. Animated with `framer-motion` SVG path drawing on scroll-in.
- **This section uses the inverted (light) palette** (`bg.alt`) to give the page a visual exhale before the final CTA. Spectrum accents stay; everything else flips.

### 5.9  Break 4 — Proof of Useful Action  (`components/break/ProofBreak.tsx`)

- Single-line: `"Proof of useful action, not just proof of participation."`
- A subtle "checkmark-sprouting-from-node" animation when the section enters viewport
- Height: ~24vh
- Inherits the inverted palette transition out, returning to dark for the final CTA

### 5.10  Body 5 — Activate Your Network  (`components/body/ActivateSection.tsx`, slug `activate`)

**Headline:** "Activate the people behind your capital."
**Subhead:** "Join the verified-human coordination layer. Your network, finally working."

- Dual CTA: `Request early access` (primary, gradient) + `Talk to founding team` (ghost)
- Below CTA: a small form (email + role dropdown: VC / Founder / LP / Operator / Individual / Other) — POSTs to a placeholder endpoint that logs to console + shows a success state (real endpoint is a Human Task)
- A faint full-bleed mesh graph in the background, denser than the hero, breathing slowly

### 5.11  Footer  (`components/layout/Footer.tsx`)

- 4-column on desktop, stacked on mobile:
  1. Logo + one-line description + social icons
  2. Product (Platform, Agents, Upcycled, Roles, Pricing)
  3. Company (About, Customers, Careers, Press)
  4. Legal (Privacy, Terms, Security, Status)
- Bottom rule: copyright + small "Made with verified humans" tag
- No animations; subtle hover underlines on links
- Source: `config/nav.ts` (footer link groups), `config/site.ts` (business identity), `config/legal.ts` (legal URLs)

### 5.12  Pricing Page  (`app/pricing/page.tsx`)

A **separate top-level page**, not a homepage section. Linked from Top Menu and Footer. Registered in `docs/dev_notes/Additional Pages.md`. Pre-launch, so values are placeholders and CTAs route to the early-access form.

- **Page layout:** Top Menu + Pricing hero + 3 plan cards + comparison table + FAQ + Footer
- **Pricing hero:** *"Pricing is taking shape with our early-access partners."* — short subhead explaining pre-launch posture and pointing to the early-access form
- **Plan cards (scaffold names; final names + prices are Human Tasks):**
  1. **Operator** — Individuals using Meshed for finding work, income optimization, progressive feedback
  2. **Studio** — Founders & teams using Meshed for collaboration matchmaking and contact automation
  3. **Network** — VCs, LPs, family offices, and curated ecosystems for portfolio optimization and member activation
- Each card: tier name, one-line audience, 5–7 feature bullets, `Request early access` CTA. Price field shows `Talk to us` until pricing is set.
- **Comparison table** below cards: features as rows × plans as columns, with check / dash / "add-on" cells. Driven entirely by `config/content.ts`.
- **FAQ:** 6–8 short Q&A items (pre-launch timing, data privacy, integrations, custom enterprise pricing, billing cadence, refund posture).
- All copy lives in `config/content.ts` under a `PRICING` namespace.

---

## 6. Config File Inventory

Every literal lives in one of these. No exceptions.

| File | Owns |
|---|---|
| `config/site.ts` | `SITE.businessName`, `SITE.tagline`, `SITE.taglineCandidates[]`, `SITE.email`, `SITE.social.{linkedin,x,etc}` |
| `config/nav.ts` | `NAV_PRIMARY`, `NAV_CTA`, `NAV_FOOTER_GROUPS`, `NAV_MOBILE_BEHAVIOR` |
| `config/sections.ts` | `SECTIONS` registry: each has `slug`, `title`, `enabled`, `componentKey`, `inverted?: boolean` |
| `config/content.ts` | All UI strings, headlines, subheads, bullet copy, agent example exchanges, role tab content, integration list, footer copy |
| `config/theme.ts` | `THEME.colors`, `THEME.fonts`, `THEME.gradients`, `THEME.spacing`, `THEME.motion` (durations, easings, stagger constants) |
| `config/legal.ts` | `LEGAL.privacyPolicyUrl`, `LEGAL.termsUrl`, `LEGAL.securityUrl`, copy snippets |

---

## 7. Animation System

**Layered model** (per Architecture doc):

| Layer | Tool | Used for |
|---|---|---|
| 1. Hero centerpiece | `react-force-graph` / Canvas | Live mesh interaction |
| 2. Scroll reveals | Framer Motion `whileInView` | Body & Break section entrances |
| 3. Sequencing/state | Framer Motion `<AnimatePresence>` | Tab switches, rotating words, agent panel cycling |
| 4. Hover micro | Tailwind + CSS transitions | Buttons, links, cards |
| 5. Background ambient | CSS `@keyframes` + `mask-image` | Gradient sweeps on dividers, mesh strips |

**Motion tokens** (in `config/theme.ts`):
- `duration.fast` = 180ms, `duration.base` = 320ms, `duration.slow` = 600ms
- `ease.out` = `[0.22, 1, 0.36, 1]` (cubic-bezier), `ease.in-out` = `[0.65, 0, 0.35, 1]`
- `stagger.fine` = 12ms (letter), `stagger.med` = 60ms (item), `stagger.coarse` = 120ms (block)

**Reduced motion**: every Framer Motion variant respects `useReducedMotion()`. Hero mesh swaps to static SVG when `prefers-reduced-motion: reduce`.

---

## 8. Responsive Strategy

Mobile-first. Breakpoints used: `sm` (640), `md` (768), `lg` (1024), `xl` (1280). No custom media queries.

Per-section mobile collapse rules:
- Hero: copy stacks above mesh, mesh becomes static SVG
- Body 2 (Agents): two-column → stacked, agent panel becomes full-width
- Body 3 (Roles): tabs → vertical accordion at `<md`
- Footer: 4 cols → 2 cols at `md` → 1 col at `<sm`
- Top Menu: collapses to hamburger at `<md`

---

## 9. Build Phases (recommended PR sequence)

| Phase | Scope | Acceptance |
|---|---|---|
| **0. Foundation** | Phase-0 setup tasks from §3, all config files stubbed, dynamic route working with a hello-world section | `next dev` boots, `localhost:3000/test` serves a stubbed section |
| **1. Layout shell** | `TopMenu`, `Footer`, `app/layout.tsx`, theme tokens wired | Logo+nav render, footer renders, dark mode tokens applied site-wide |
| **2. Hero (text-first)** | `HeroSection` with copy + CTA + static SVG mesh placeholder | Looks great on mobile + desktop without the live mesh yet |
| **3. Hero (live mesh)** | Drop in `react-force-graph`, lazy-loaded, with reduced-motion fallback | First-paint ≤ 1.5s on Vercel preview; LCP element is hero copy, not mesh |
| **4. Body 1 + Break 1** | The Problem + From passive → active | Scroll-triggered diagram morph works; rotating word loop runs |
| **5. Body 2 + Break 2** | Agents section + Integrations strip | Agent panel cycles correctly; integration logos scroll |
| **6. Body 3 + Break 3** | Roles tabs + Privacy break | Tabs work; mobile accordion works; privacy break renders |
| **7. Body 4 + Break 4** | Upcycled (light palette) + Proof break | Inverted palette transition is clean both directions |
| **8. Body 5 + Footer polish** | Activate CTA + final footer pass | Form submission stub works; all sections present |
| **9. Standalone routes** | Verify each Body section renders well at its own slug | All 5 slugs return a polished single-section page |
| **10. Pricing page** | `/pricing` with hero + 3 plan cards + comparison table + FAQ | Renders, all copy from `config/content.ts`, mobile clean |
| **11. Performance & a11y pass** | Lighthouse ≥ 95 across all four scores; axe clean; reduced-motion verified | Pre-launch checklist green |

Each phase is a single PR (or single deploy). Phases 4–8 can be parallelized once Phase 1 lands.

---

## 10. Locked Decisions (recap)

These were resolved before scaffolding and are baked into the plan:

- **Hero tagline:** *The human-verified coordination and value-routing layer for investment ecosystems.*
- **Audience priority:** VC & LP → Business → Individual
- **Palette:** dark Linear-style base + full logo spectrum as accents (cyan → violet → magenta → orange → gold)
- **Pricing:** standalone `/pricing` page (not a homepage section); registered in `Additional Pages.md`
- **CTA endpoint:** placeholder for now (logs to console + success toast)
- **Product status:** pre-launch; copy uses *"Request early access"* not *"Request a demo"*
- **Real assets:** none provided yet — placeholder mocks + illustrated product UI throughout
- **Domain / analytics:** none yet; not wired

## 11. Open Items & Human Tasks

Tracked in `docs/dev_notes/Tasks for Humans.md`. Summary of what still needs human input before/at launch:

1. Production domain → set `NEXT_PUBLIC_SITE_URL`
2. Analytics provider choice (Plausible / PostHog / GA) → snippet + env var
3. Demo/early-access endpoint (Calendly link, webhook, or email forward) → swap into `DEMO_FORM_ENDPOINT`
4. Real LP/VC trust-ribbon logos for the hero
5. Real product screenshots for Body 3 (Roles tabs)
6. Pricing values (or confirm pre-launch *"Talk to us"* posture indefinitely)
7. Legal documents: Privacy Policy, Terms, Security pages — URLs or copy
8. Logo asset variants: SVG mark, SVG horizontal lockup, dark-bg variant, favicon set (ICO/PNG/Apple touch)
9. Final plan card names: *Operator* / *Studio* / *Network* are scaffolds — confirm or replace
10. Business email + contact address for the footer + structured data

**Environment variables anticipated** (added to `.env - Example` as the build needs them):
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_ANALYTICS_ID` (provider TBD)
- `DEMO_FORM_ENDPOINT` (server-only)
- (more added as integrations land)

---

## 12. Out of Scope for v1

To keep v1 sharp:
- Customer case studies (placeholder slots only)
- Blog / Resources
- Authenticated app sections (the actual Meshed product UI)
- Internationalization (English only)
- A/B testing infrastructure (tagline candidates live in config but no runtime swap)

---

*End of Plan 1. Subsequent plans (`2 - …`, `3 - …`) will reference this document as the v1 baseline.*
