/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'
import scrollbarHide from 'tailwind-scrollbar-hide'

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      lineHeight: {
        '11': '2.8125rem',
        '6.5': '1.625rem',
      },
      container: {
        center: true,
        screens: {
          sm: '100%',
          md: '1060px',
        },
      },
      zIndex: {
        99: 99
      },
      keyframes: {
        shake: {
          '0%': { transform: 'translate(1px, 1px)' },
          '10%': { transform: 'translate(-1px, -2px)' },
          '20%': { transform: 'translate(-3px, 0px)' },
          '30%': { transform: 'translate(3px, 2px)' },
          '40%': { transform: 'translate(1px, -1px)' },
          '50%': { transform: 'translate(-1px, 2px)' },
          '60%': { transform: 'translate(-3px, 1px)' },
          '70%': { transform: 'translate(3px, 1px)' },
          '80%': { transform: 'translate(-1px, 1px)' },
          '90%': { transform: 'translate(1px, 2px)' },
          '100%': { transform: 'translate(1px, -2px)' },
        }
      },
      animation: {
        shake: 'shake 0.5s linear infinite',
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      indigo: colors.indigo,
      red: colors.rose,
      green: colors.green,
      yellow: colors.amber,
      gray: {
        ...colors.gray,
        'input-bg': '#F5F7FA',
        250: '#E8EDF3',
        350: '#575757',
        450: '#6B7280',
        550: '#8F8F8F',
        650: '#111624',
      },
      'primary-blue': '#3466F6',
      'primary-bg': '#FAFBFF',
    }
  },
  plugins: [
    scrollbarHide,
  ],
}
