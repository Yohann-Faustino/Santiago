/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // pour activer le mode sombre via une classe
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./backend/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#fff000",
      },
      fontSize: {
        base: "16px",
        h1: "20px",
        h2: "20px",
        h3: "18px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [],
};
