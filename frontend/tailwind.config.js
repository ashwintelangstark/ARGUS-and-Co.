/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#120e0a',
        night: '#0a0705',
        paper: '#d9c49b',
        'paper-bright': '#efe2c5',
        leather: '#4b2d1d',
        'leather-dark': '#29180f',
        gold: '#c69a50',
        'gold-bright': '#f0d39a',
        rust: '#8d4829',
        muted: '#bba77f',
        line: '#80613b',
      },
      fontFamily: {
        rye: ['Rye', 'serif'],
        elite: ['Special Elite', 'monospace'],
        cinzel: ['Cinzel', 'serif'],
        mono: ['Fira Code', 'monospace'],
        condensed: ['Roboto Condensed', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

