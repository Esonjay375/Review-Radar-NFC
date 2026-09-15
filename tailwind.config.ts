import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070d",
        card: "#101019",
        line: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(139, 92, 246, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
