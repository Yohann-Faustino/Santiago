/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js,jsx}',
    './components/**/*.{html,js,jsx}',
    './backend/**/*.{html,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#fff000',
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
    },
  },
  plugins: [],
}

