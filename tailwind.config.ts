import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          dark: "#0B1426",
          mid: "#131F35",
        },
        crimson: "#D41B69",
        "crimson-dark": "#8A0F3E",
        gold: "#F7A81B",
        "gold-dark": "#C87900",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        heading: ["General Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "glow-pink": "0 0 40px -5px rgba(212,27,105,0.35)",
        "glow-gold": "0 0 40px -5px rgba(247,168,27,0.35)",
        soft: "0 4px 24px rgba(0,0,0,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "drawer-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease both",
        "sheet-up": "sheet-up 0.35s cubic-bezier(0.32,0.72,0,1) both",
        "drawer-in": "drawer-in 0.35s cubic-bezier(0.32,0.72,0,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
