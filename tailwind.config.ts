import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        haze: "#0A0A0A",
        surface: "#171717",
        mist: "#A3A3A3",
        foreground: "#FAFAFA",
        line: "rgba(255,255,255,0.08)",
        glow: "#FFFFFF",
      },
      boxShadow: {
        glow: "0 0 80px rgba(255, 255, 255, 0.12)",
        card: "0 30px 80px rgba(0, 0, 0, 0.28)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 35%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.06), transparent 28%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        marquee: "marquee var(--duration,40s) linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.08)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap, 1rem)))" },
        },
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
