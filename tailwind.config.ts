import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        foreground: "#fafafa",
        accent: {
          DEFAULT: "#22d3ee",
          emerald: "#10b981",
          amber: "#f59e0b"
        },
        card: "#0f0f12",
        border: "#27272a"
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"]
      },
      boxShadow: {
        glow: "0 0 20px rgba(34, 211, 238, 0.2)"
      },
      keyframes: {
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.2)", opacity: "0" }
        }
      },
      animation: {
        pulseRing: "pulseRing 1.6s ease-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
