export type SectionKind = "hero" | "body" | "break";

export interface SectionDef {
  key: string;
  kind: SectionKind;
  slug: string | null;
  title: string;
  enabled: boolean;
  inverted?: boolean;
}

export const SECTIONS = {
  hero: {
    key: "hero",
    kind: "hero",
    slug: null,
    title: "Home",
    enabled: true,
  },
  problem: {
    key: "problem",
    kind: "body",
    slug: "problem",
    title: "The Problem",
    enabled: true,
  },
  passiveToActive: {
    key: "passiveToActive",
    kind: "break",
    slug: null,
    title: "From passive to active",
    enabled: true,
  },
  agents: {
    key: "agents",
    kind: "body",
    slug: "agents",
    title: "Meshed Agents",
    enabled: true,
  },
  integrations: {
    key: "integrations",
    kind: "break",
    slug: null,
    title: "Integrations",
    enabled: true,
  },
  roles: {
    key: "roles",
    kind: "body",
    slug: "roles",
    title: "Built for Three Roles",
    enabled: true,
  },
  privacy: {
    key: "privacy",
    kind: "break",
    slug: null,
    title: "Privacy promise",
    enabled: true,
  },
  upcycled: {
    key: "upcycled",
    kind: "body",
    slug: "upcycled",
    title: "Meshed Upcycled",
    enabled: true,
    inverted: true,
  },
  proof: {
    key: "proof",
    kind: "break",
    slug: null,
    title: "Proof of useful action",
    enabled: true,
    inverted: true,
  },
  activate: {
    key: "activate",
    kind: "body",
    slug: "activate",
    title: "Activate Your Network",
    enabled: true,
  },
} as const satisfies Record<string, SectionDef>;

export const SECTION_ORDER: ReadonlyArray<keyof typeof SECTIONS> = [
  "hero",
  "problem",
  "passiveToActive",
  "agents",
  "integrations",
  "roles",
  "privacy",
  "upcycled",
  "proof",
  "activate",
] as const;

export const ENABLED_SECTIONS = SECTION_ORDER.filter(
  (key) => SECTIONS[key].enabled,
);

export function getSectionBySlug(slug: string): SectionDef | null {
  for (const key of SECTION_ORDER) {
    const section = SECTIONS[key];
    if (section.slug === slug && section.enabled) {
      return section;
    }
  }
  return null;
}
