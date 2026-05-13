export const LEGAL = {
  privacyPolicyUrl: "/legal/privacy",
  termsUrl: "/legal/terms",
  securityUrl: "/legal/security",

  copyright: (year: number = new Date().getFullYear()) =>
    `© ${year} Meshed. All rights reserved.`,

  smallPrint:
    "Meshed reads private data only in encrypted, ephemeral local environments. Sensitive data is never stored on Meshed servers.",
} as const;
