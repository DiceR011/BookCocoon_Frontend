/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1.0s ease-in",
        fadeInDelayed: "fadeIn 1.5s ease-in",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0},
          "50%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInDelayed: {
        },
      },
    },
  },
  plugins: [],
  important: true,
}

