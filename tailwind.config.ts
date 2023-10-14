import type { Config } from 'tailwindcss'
const konstaConfig = require('konsta/config')

module.exports = konstaConfig({
  content: [
    './pages/**/*.{js,ts,javascript,tsx}',
    './components/**/*.{js,ts,javascript,tsx}',
  ],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
})
