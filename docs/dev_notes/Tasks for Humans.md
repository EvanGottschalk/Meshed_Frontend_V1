# Tasks for Humans

Items that require human input — values to provide, accounts to set up, decisions to confirm — collected as the build progresses. AI cannot resolve these; a human must.

When you complete one of these, replace the placeholder in the relevant `config/*.ts` file (or environment variable) and remove the item from this list.

---

## Branding & Assets

- [ ] **Logo SVG variants** — provide:
  - SVG mark (mesh graph icon only, no wordmark)
  - SVG horizontal lockup (mesh + "Meshed" wordmark, dark-bg variant)
  - Favicon set: `favicon.ico`, `apple-touch-icon.png` (180×180), `icon.png` (512×512)
  - Drop into `public/brand/`
- [ ] **Real LP / VC trust-ribbon logos** for the Hero section's "Trusted by ecosystems including" strip. Until provided, the slot uses neutral placeholder shapes.
- [ ] **Real product screenshots** for the Roles section (`Body 3`). Three images: VC dashboard, Founder dashboard, Individual dashboard. Until provided, illustrated mocks are used.

## Copy & Content

- [ ] **Plan card names** — confirm or rename `Operator` / `Studio` / `Network` (see `app/pricing/page.tsx`).
- [ ] **Pricing values** — set real prices in `config/content.ts → PRICING.plans[].price`, or confirm pre-launch *"Talk to us"* posture is permanent.
- [ ] **Legal documents** — provide URLs or copy for Privacy Policy, Terms of Service, Security page. Currently `config/legal.ts` has placeholder URLs.
- [ ] **Business contact email** — set `SITE.email` in `config/site.ts`.
- [ ] **Social handles** — set `SITE.social.{linkedin, x, github}` in `config/site.ts`.

## Infrastructure

- [ ] **Production domain** — set `NEXT_PUBLIC_SITE_URL` in `.env`. Used for Open Graph, sitemap, canonical URLs.
- [ ] **Analytics provider** — pick one of Plausible / PostHog / Google Analytics, then provide tracking ID. Update `config/site.ts` `ANALYTICS` block and add the script tag in `app/layout.tsx`.
- [ ] **Early-access form endpoint** — replace the placeholder console-log handler with a real destination. Options:
  - Calendly inbound link
  - Formspree / Basin / similar form-to-email
  - Webhook to a backend / Zapier / Make
  - Direct integration (HubSpot, Notion, Airtable, etc.)
  - Set the resulting URL in `DEMO_FORM_ENDPOINT` (server-only env var).
- [ ] **Hosting / deployment** — Vercel project setup (recommended) or alternative.

## Open Decisions

- [ ] **Confirm or replace pre-launch "Request early access" CTA** — once product is live, this flips to "Request a demo" / "Start free" / etc. Single-source: `config/content.ts → CTA`.
