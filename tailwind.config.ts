import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "drift-1": "drift1 120s linear infinite",
        "drift-2": "drift2 90s linear infinite",
        "drift-3": "drift3 150s linear infinite",
        "smoke-1": "smoke1 4s ease-in-out infinite",
        "smoke-2": "smoke2 5s ease-in-out infinite",
        "smoke-3": "smoke3 6s ease-in-out infinite",
        "smoke-4": "smoke4 3.5s ease-in-out infinite",
        "smoke-5": "smoke5 7s ease-in-out infinite",
        "sparkle-float": "sparkleFloat 3s ease-in-out infinite",
        "gradient-spin": "gradientSpin 3s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "toast-in": "toastIn 0.3s ease-out",
        "toast-out": "toastOut 0.3s ease-in forwards",
        "shooting-star": "shootingStar 1.2s ease-in forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "glow-shift": "glowShift 4s ease-in-out infinite",
        "hue-rotate": "hueRotate 6s linear infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift1: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(80px, -50px)" },
          "50%": { transform: "translate(-30px, -90px)" },
          "75%": { transform: "translate(-70px, -20px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        drift2: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-60px, 40px)" },
          "50%": { transform: "translate(70px, -30px)" },
          "75%": { transform: "translate(25px, 60px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        drift3: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(40px, 70px)" },
          "50%": { transform: "translate(-55px, 25px)" },
          "75%": { transform: "translate(-15px, -65px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        smoke1: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1) rotate(0deg)", opacity: "0.3" },
          "50%": { transform: "translateY(-35px) translateX(15px) scale(1.4) rotate(200deg)", opacity: "0.7" },
        },
        smoke2: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(1.1) rotate(0deg)", opacity: "0.2" },
          "50%": { transform: "translateY(-25px) translateX(-20px) scale(0.8) rotate(-200deg)", opacity: "0.6" },
        },
        smoke3: {
          "0%, 100%": { transform: "translateY(0) translateX(0) scale(0.9) rotate(0deg)", opacity: "0.25" },
          "50%": { transform: "translateY(-40px) translateX(10px) scale(1.5) rotate(150deg)", opacity: "0.55" },
        },
        smoke4: {
          "0%, 100%": { transform: "translateY(5px) translateX(-10px) scale(0.8) rotate(0deg)", opacity: "0.15" },
          "33%": { transform: "translateY(-30px) translateX(20px) scale(1.3) rotate(120deg)", opacity: "0.5" },
          "66%": { transform: "translateY(-15px) translateX(-15px) scale(1.1) rotate(240deg)", opacity: "0.35" },
        },
        smoke5: {
          "0%, 100%": { transform: "translateY(0) scale(1) rotate(0deg)", opacity: "0.1" },
          "25%": { transform: "translateY(-20px) scale(1.2) rotate(90deg)", opacity: "0.4" },
          "50%": { transform: "translateY(-35px) scale(0.9) rotate(180deg)", opacity: "0.2" },
          "75%": { transform: "translateY(-10px) scale(1.3) rotate(270deg)", opacity: "0.45" },
        },
        sparkleFloat: {
          "0%, 100%": { transform: "translateY(0) scale(0.5)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "50%": { transform: "translateY(-20px) scale(1)", opacity: "0.6" },
          "80%": { opacity: "0.3" },
        },
        gradientSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(236, 72, 153, 0.2)" },
          "50%": { boxShadow: "0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)" },
        },
        toastIn: {
          "0%": { transform: "translateY(-20px) scale(0.95)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        toastOut: {
          "0%": { transform: "translateY(0) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-20px) scale(0.95)", opacity: "0" },
        },
        shootingStar: {
          "0%": { transform: "translateX(0) translateY(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { transform: "translateX(300px) translateY(200px)", opacity: "0" },
        },
        hueRotate: {
          "0%": { filter: "hue-rotate(0deg)" },
          "100%": { filter: "hue-rotate(360deg)" },
        },
        glowShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
