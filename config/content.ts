export const CTA = {
  primary: "Request early access",
  secondary: "See how it works",
  tertiary: "Talk to founding team",
  signIn: "Sign in",
} as const;

export const HERO = {
  eyebrow: "MESHED PLATFORM",
  headline:
    "The human-verified coordination and value-routing layer for investment ecosystems.",
  subhead:
    "Meshed turns passive capital networks into active value networks. AI Doppelgängers discover the right people, surface the right opportunities, and execute the right actions — with verified humans accountable at every step.",
  trustEyebrow: "Trusted by ecosystems including",
  trustLogos: [
    { name: "Logo 1" },
    { name: "Logo 2" },
    { name: "Logo 3" },
    { name: "Logo 4" },
    { name: "Logo 5" },
  ],
} as const;

export const PROBLEM = {
  eyebrow: "THE PROBLEM",
  headline: "Most investment networks are warehouses, not engines.",
  subhead:
    "Capital sits. Relationships go cold. Founders solve problems other portfolio companies already solved last year. Talent leaks out when startups fail. The value is there — it just doesn't move.",
  pains: [
    {
      audience: "VC & LP",
      title: "Untapped network value",
      body: "Every portfolio has the answer to every problem in the portfolio. Almost no one finds it in time.",
    },
    {
      audience: "Founders",
      title: "Stuck on solved problems",
      body: "Your peers already navigated this. Without coordination, you re-discover lessons from scratch.",
    },
    {
      audience: "Individuals",
      title: "Job search on hard mode",
      body: "Job boards leave you to fend for yourself. Fit, feedback, and trajectory all left to chance.",
    },
  ],
} as const;

export const BREAK_PASSIVE_TO_ACTIVE = {
  prefix: "From",
  rotatingWords: ["passive", "static", "cold", "quiet"],
  suffix: "networks",
  arrow: "→",
  destination: "active value networks.",
} as const;

export const AGENTS = {
  eyebrow: "MESHED AGENTS",
  headline: "Your AI Doppelgänger inside the ecosystem.",
  subhead:
    "Aggregation. Intelligence. Execution. — A bespoke, human-verified agent that continuously discovers, coordinates, and executes high-value connections.",
  pillars: [
    {
      title: "Aggregation",
      body: "Connects your accounts and reads the context you've already created — so your agent knows what you know.",
    },
    {
      title: "Intelligence",
      body: "Never asks the obvious. Generates only the high-value question — the one that moves the network forward.",
    },
    {
      title: "Execution",
      body: "Drafts intros, sends invites, books calendar — humans stay accountable, agents do the work.",
    },
  ],
  exchanges: [
    {
      from: "agent",
      message:
        "I read on Slack that you closed your Series A. Want me to introduce you to three founders in the portfolio who navigated post-Series-A hiring?",
      actions: ["Yes — draft intros", "Skip"],
    },
    {
      from: "agent",
      message:
        "You and Priya both shipped infra rewrites last quarter. Priya wrote up her postmortem. Want a one-page summary?",
      actions: ["Send summary", "Schedule a call"],
    },
    {
      from: "agent",
      message:
        "Two LPs in your network mentor early-stage AI companies. You haven't introduced them to your latest portco. Send intro now?",
      actions: ["Send intros", "Edit first"],
    },
  ],
} as const;

export const INTEGRATIONS = {
  headline: "Aggregation + Intelligence + Execution",
  items: [
    { name: "LinkedIn", note: "connections, posts, messages, profile" },
    { name: "X", note: "followers, posts, messages, profile" },
    { name: "Instagram", note: "followers, posts, messages, profile" },
    { name: "GitHub", note: "orgs, code, contributions, profile" },
    { name: "Gmail", note: "contacts, mail, Docs, Sheets, Drive" },
  ],
} as const;

export const ROLES = {
  eyebrow: "BUILT FOR",
  headline: "One platform, three operator modes.",
  tabs: [
    {
      key: "vc-lp",
      label: "VC & LP",
      outcome: "Activate the people behind your capital.",
      features: [
        {
          title: "Portfolio Optimization",
          body: "Some companies in your portfolio have already solved the problems others are facing. Meshed agents read the data and route the solution.",
        },
        {
          title: "Contact Automation",
          body: "Your agent maintains warm context on every key contact. It drafts the message, books the calendar, and lets you stay in flow.",
        },
      ],
    },
    {
      key: "business",
      label: "Business",
      outcome: "Find the company that already solved your problem.",
      features: [
        {
          title: "Collaboration Optimization",
          body: "Match with companies who navigated the obstacle you're facing — across portfolios, across networks, in days, not quarters.",
        },
        {
          title: "Contact Automation",
          body: "Maintain warm context on partners, customers, advisors, and investors — without the ritual of manually keeping in touch.",
        },
      ],
    },
    {
      key: "individual",
      label: "Individual",
      outcome: "ChatGPT for finding work.",
      features: [
        {
          title: "Income Optimization",
          body: "Your agent identifies target employers where the fit is mutual, and shows you exactly how to get there — courses, intros, resume changes.",
        },
        {
          title: "Progressive Feedback",
          body: "As you apply, interview, and get responses, your agent tracks the signal and tells you what to change next.",
        },
      ],
    },
  ],
} as const;

export const BREAK_PRIVACY = {
  headline:
    "Sensitive data never leaves your hardware. Private data is never stored — only read in encrypted, ephemeral local environments.",
} as const;

export const UPCYCLED = {
  eyebrow: "MESHED UPCYCLED",
  headline: "When startups fail, value doesn't have to.",
  subhead:
    "Meshed Upcycled routes talent and knowledge from inactive startups back into the ecosystem — preserving years of learning and re-deploying skilled people where they create the most value.",
  flow: {
    source: "Inactive startup",
    rivers: ["Talent", "Knowledge"],
    destination: "Active ecosystem",
  },
  bullets: [
    {
      title: "Redeploy talent",
      body: "Skilled operators get routed to companies that need exactly their experience.",
    },
    {
      title: "Preserve knowledge",
      body: "Hard-won lessons are summarized and made discoverable across the network.",
    },
    {
      title: "Recirculate value",
      body: "Failure becomes fuel. Capital, relationships, and learning stay in the ecosystem.",
    },
  ],
} as const;

export const BREAK_PROOF = {
  headline: "Proof of useful action, not just proof of participation.",
} as const;

export const ACTIVATE = {
  eyebrow: "GET ACCESS",
  headline: "Activate the people behind your capital.",
  subhead:
    "Join the verified-human coordination layer. Your network, finally working.",
  form: {
    emailLabel: "Work email",
    emailPlaceholder: "you@firm.com",
    roleLabel: "I am a…",
    roles: ["VC", "Founder", "LP", "Operator", "Individual", "Other"],
    submit: "Request early access",
    successHeadline: "You're on the list.",
    successBody:
      "We'll be in touch as we open up early access. In the meantime, expect a short onboarding email from a real human.",
  },
} as const;

export const FOOTER = {
  blurb:
    "The human-verified coordination and value-routing layer for investment ecosystems.",
  madeWith: "Made with verified humans.",
} as const;

export const PRICING = {
  hero: {
    eyebrow: "PRICING",
    headline: "Pricing is taking shape with our early-access partners.",
    subhead:
      "Meshed is pre-launch. Plans below are scaffolds — final pricing is being calibrated with the first cohort. Talk to us about access.",
    cta: { label: "Request early access", href: "/#activate" },
  },
  plans: [
    {
      key: "operator",
      name: "Operator",
      audience: "For individuals using Meshed for finding work, income optimization, and progressive feedback.",
      price: "Talk to us",
      featured: false,
      features: [
        "Personal AI Doppelgänger",
        "Connect LinkedIn, X, Instagram, GitHub, Gmail",
        "Resume & cover-letter automation",
        "Targeted outreach to ideal employers",
        "Progressive interview feedback",
      ],
      cta: { label: "Request early access", href: "/#activate" },
    },
    {
      key: "studio",
      name: "Studio",
      audience: "For founders & teams using Meshed for collaboration matchmaking and contact automation.",
      price: "Talk to us",
      featured: true,
      features: [
        "Team AI Doppelgängers",
        "Cross-portfolio problem ↔ solution matching",
        "Automated intro drafting + scheduling",
        "Shared context across team members",
        "Priority human support",
      ],
      cta: { label: "Request early access", href: "/#activate" },
    },
    {
      key: "network",
      name: "Network",
      audience: "For VCs, LPs, family offices, and curated ecosystems for portfolio optimization and member activation.",
      price: "Talk to us",
      featured: false,
      features: [
        "Ecosystem-wide coordination layer",
        "Portfolio optimization analytics",
        "LP & advisor activation",
        "Meshed Upcycled (talent + knowledge recycling)",
        "Custom integrations & SSO",
        "Dedicated success engineering",
      ],
      cta: { label: "Talk to founding team", href: "/#activate" },
    },
  ],
  comparison: {
    headline: "Compare plans",
    rows: [
      { feature: "AI Doppelgänger", operator: true, studio: true, network: true },
      { feature: "Account integrations (LinkedIn, X, GitHub, Gmail, Instagram)", operator: true, studio: true, network: true },
      { feature: "Resume & outreach automation", operator: true, studio: true, network: true },
      { feature: "Cross-team shared context", operator: false, studio: true, network: true },
      { feature: "Cross-portfolio matching", operator: false, studio: true, network: true },
      { feature: "Ecosystem analytics", operator: false, studio: false, network: true },
      { feature: "LP & advisor activation", operator: false, studio: false, network: true },
      { feature: "Meshed Upcycled", operator: false, studio: false, network: true },
      { feature: "Custom integrations & SSO", operator: false, studio: "add-on", network: true },
      { feature: "Dedicated success engineering", operator: false, studio: false, network: true },
    ],
  },
  faq: [
    {
      q: "When does Meshed launch?",
      a: "Meshed is in pre-launch. We're onboarding partners gradually. Request early access to be considered for the first cohort.",
    },
    {
      q: "How does Meshed handle private data?",
      a: "Sensitive data never leaves your hardware. Private data — emails, messages, documents — is read only in encrypted, ephemeral local environments. None of it is persisted on Meshed servers.",
    },
    {
      q: "Which integrations are supported at launch?",
      a: "LinkedIn, X, Instagram, GitHub, and Gmail at launch. Slack, calendar, and additional sources follow shortly after.",
    },
    {
      q: "Is there enterprise pricing?",
      a: "The Network plan is built for ecosystems and includes enterprise features. We tailor commercials to fund size, portfolio scope, and integration depth.",
    },
    {
      q: "How is billing handled?",
      a: "Annual contracts with a transparent per-seat or per-ecosystem-member component. Final structure is being set with the first cohort.",
    },
    {
      q: "Refunds?",
      a: "Pro-rated refunds within the first 30 days of any annual term. We'd rather you stay because Meshed creates value, not because you're stuck.",
    },
  ],
} as const;
