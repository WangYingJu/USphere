/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      gray: {
        ...colors.gray,
        'input-bg': '#F5F7FA',
        250: '#E8EDF3'
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
