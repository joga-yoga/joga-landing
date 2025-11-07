import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "var(--accent)",
        "accent-dark": "var(--accent-dark)",
        border: "var(--border)",
        foreground: "var(--fg)",
        muted: "var(--muted)",
        surface: "var(--bg)",
      },
    },
  },
  plugins: [],
};

export default config;
