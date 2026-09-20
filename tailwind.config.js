/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        tictactoe: ["Cherry Bomb One", "cursive"],
      },
      colors: {
        paper: {
          50: "#f7fbff",
          100: "#ecf4fc",
          200: "#dceaf7",
          300: "#c6dcef",
        },
        ink: {
          DEFAULT: "#173a5e",
          light: "#2b4f75",
          soft: "#52708f",
          faint: "#8aa3bd",
        },
        clay: {
          DEFAULT: "#c96f3f",
          dark: "#a8582f",
          light: "#e8a06f",
        },
      },
      boxShadow: {
        card: "0 2px 0 0 rgba(33,42,54,0.08), 0 12px 28px -12px rgba(33,42,54,0.18)",
        lift: "0 4px 0 0 rgba(33,42,54,0.1), 0 24px 48px -16px rgba(33,42,54,0.28)",
      },
      backgroundImage: {
        hero: "url('https://images.newscientist.com/wp-content/uploads/2023/03/21161436/SEI_149163371.jpg')",
      },
      backgroundSize: {
        large: "12rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--tw-rotate, 0deg))" },
          "50%": { transform: "translateY(-8px) rotate(var(--tw-rotate, 0deg))" },
        },
        squiggle: {
          "0%": { strokeDashoffset: "0" },
          "100%": { strokeDashoffset: "24" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        squiggle: "squiggle 8s linear infinite",
      },
    },
  },
  plugins: [],
};