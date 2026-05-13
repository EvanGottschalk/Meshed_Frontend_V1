export const THEME = {
  colors: {
    bg: {
      base: "#FFFFFF",
      elevated: "#FAFAFC",
      sunken: "#F4F5F8",
      alt: "#0B0D14",
      altElevated: "#13151D",
    },
    fg: {
      primary: "#0B0D14",
      secondary: "#5B6273",
      tertiary: "#8C92A2",
      onAlt: "#F4F5F8",
      onAltSecondary: "#A8AEBE",
      onAltTertiary: "#6B7180",
    },
    border: {
      subtle: "#ECEEF2",
      strong: "#D8DBE4",
      onAlt: "#1F2230",
      onAltStrong: "#2F3343",
    },
    accent: {
      cyan: "#3DC7E0",
      violet: "#7A5BFF",
      magenta: "#E45BC9",
      orange: "#F58A3C",
      gold: "#F5C84A",
    },
  },

  gradients: {
    brand:
      "linear-gradient(90deg, #3DC7E0 0%, #7A5BFF 28%, #E45BC9 55%, #F58A3C 80%, #F5C84A 100%)",
    brandSoft:
      "linear-gradient(90deg, rgba(61,199,224,0.18) 0%, rgba(122,91,255,0.18) 28%, rgba(228,91,201,0.18) 55%, rgba(245,138,60,0.18) 80%, rgba(245,200,74,0.18) 100%)",
    radialBrand:
      "radial-gradient(60% 50% at 50% 40%, rgba(122,91,255,0.22) 0%, rgba(228,91,201,0.10) 35%, rgba(255,255,255,0) 70%)",
    radialBrandOnAlt:
      "radial-gradient(60% 50% at 50% 40%, rgba(122,91,255,0.30) 0%, rgba(228,91,201,0.14) 35%, rgba(11,13,20,0) 70%)",
  },

  fonts: {
    display: "Inter",
    body: "Inter",
    mono: "JetBrains Mono",
  },

  motion: {
    duration: {
      fast: 180,
      base: 320,
      slow: 600,
    },
    ease: {
      out: "cubic-bezier(0.22, 1, 0.36, 1)",
      inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
    },
    stagger: {
      fine: 0.012,
      med: 0.06,
      coarse: 0.12,
    },
  },
} as const;
