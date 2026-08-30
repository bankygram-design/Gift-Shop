import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EF",
        "ivory-dim": "#F1EBDF",
        charcoal: "#211F1C",
        "charcoal-soft": "#3A362F",
        forest: "#2C4A3B",
        "forest-dark": "#1D3229",
        brass: "#B08D57",
        "brass-light": "#D8C39D",
        rose: "#E7C9C2",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "1.25rem",
      },
      boxShadow: {
        card: "0 2px 24px -8px rgba(33, 31, 28, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
