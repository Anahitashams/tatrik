/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F2ECE1",
        paper: "#FBF8F2",
        ink: "#37332C",
        "ink-soft": "#5C574C",
        dust: {
          DEFAULT: "#A7B7C3",
          light: "#CBD7DE",
          dark: "#7C93A2",
        },
        clay: {
          DEFAULT: "#BD7E56",
          light: "#D9AE85",
          dark: "#93613D",
        },
        sand: "#D9C6A3",
        sage: "#96A184",
        // A clearer, more saturated sky-blue than "dust" (which stays as a
        // muted neutral) - this is the colorful accent for interactive
        // moments: focus rings, the OTP flow, hover glows.
        sky: {
          DEFAULT: "#6FA3C7",
          light: "#A9CBE0",
          dark: "#3F7699",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        soft: "1.75rem",
        pot: "2.5rem 2.5rem 0.5rem 0.5rem",
      },
      keyframes: {
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.85)", opacity: "0.5" },
          "60%": { transform: "scale(1.06)", opacity: "1" },
          "100%": { transform: "scale(1)" },
        },
        shine: {
          "0%": { transform: "translateX(-130%) skewX(-12deg)" },
          "100%": { transform: "translateX(230%) skewX(-12deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(111, 163, 199, 0.0)" },
          "50%": { boxShadow: "0 0 0 10px rgba(111, 163, 199, 0.12)" },
        },
      },
      animation: {
        rise: "rise 0.7s ease-out both",
        float: "float 6.5s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        pop: "pop 0.25s ease-out both",
        shine: "shine 1.1s ease-in-out",
        "glow-pulse": "glow-pulse 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
