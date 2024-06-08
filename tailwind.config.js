/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/presentation/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        white: '#FFF',
        black: '#000',
        'bg-light': '#F2F2F2',
        primary: '#880E4F',
        'primary-dark': '#560027',
        'primary-light': '#BC477B',
        'disabled-bg': '#CCC',
        'disabled-color': '#666',
      },
      animation: {
        'bounce-&-pulse':
          'bounce 1s infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
