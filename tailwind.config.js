/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3E1801',
          light: '#BF8762',
          dark: '#2a1000',
        },
        secondary: {
          DEFAULT: '#F4BD62',
          light: '#f8d18f',
          dark: '#d9a53d',
        },
        tertiary: {
          DEFAULT: '#FEF1E1',
          dark: '#E6D5B8',
        },
        quaternary: '#95603D',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive'],
        inter: ['Inter', 'sans-serif'],
        lora: ['Lora', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke"),
    require("@designbycode/tailwindcss-text-shadow"),
  ],
}