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
      fontSize: {
        'base': '16px',
        'h1': '28px',
        'h2': '24px',
        'h3': '20px',
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

