import type { Config } from "tailwindcss";
import { THEME } from "./config/theme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: THEME.colors.bg,
        fg: THEME.colors.fg,
        border: THEME.colors.border,
        accent: THEME.colors.accent,
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-brand": THEME.gradients.brand,
        "gradient-brand-soft": THEME.gradients.brandSoft,
      },
      transitionTimingFunction: {
        "out-expo": THEME.motion.ease.out,
        "in-out-quint": THEME.motion.ease.inOut,
      },
      transitionDuration: {
        fast: `${THEME.motion.duration.fast}ms`,
        base: `${THEME.motion.duration.base}ms`,
        slow: `${THEME.motion.duration.slow}ms`,
      },
    },
  },
  plugins: [],
};

export default config;
