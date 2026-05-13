export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  heading: string;
  items: NavItem[];
}

export const NAV_PRIMARY: ReadonlyArray<NavItem> = [
  { label: "Platform", href: "/#platform" },
  { label: "Agents", href: "/agents" },
  { label: "Roles", href: "/roles" },
  { label: "Upcycled", href: "/upcycled" },
  { label: "Pricing", href: "/pricing" },
];

export const NAV_CTA = {
  primary: { label: "Request early access", href: "/#activate" },
  secondary: { label: "Sign in", href: "#" },
} as const;

export const NAV_FOOTER_GROUPS: ReadonlyArray<NavGroup> = [
  {
    heading: "Product",
    items: [
      { label: "Platform", href: "/#platform" },
      { label: "Agents", href: "/agents" },
      { label: "Upcycled", href: "/upcycled" },
      { label: "Roles", href: "/roles" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About", href: "#" },
      { label: "Customers", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    heading: "Legal",
    items: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/legal/security" },
      { label: "Status", href: "#" },
    ],
  },
];
