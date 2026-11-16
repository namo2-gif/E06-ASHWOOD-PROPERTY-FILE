/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        desk: {
          darkest: '#0e0b09',
          walnut: '#1c1511',
          surface: '#261e18',
          border: '#3b2f27',
          panel: '#1f1814',
          highlight: '#ad8951',
        },
        paper: {
          aged: '#f6f1e6',
          creamy: '#faf6ee',
          parchment: '#eee6d4',
          dark: '#dfd4bc',
          border: '#cfc1a5',
        },
        ink: {
          black: '#1f1c19',
          charcoal: '#2d2824',
          sepia: '#3f3126',
          faded: '#6a5a4d',
          blue: '#1e2c45',
          stampRed: '#8c2626',
          stampBlue: '#1d3b6f',
        },
        accent: {
          brass: '#b89355',
          gold: '#c9a463',
          leather: '#3a2417',
          cloth: '#2f3b39',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Courier Prime"', 'monospace'],
        display: ['"Cinzel"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'desk-lamp': '0 0 100px -20px rgba(220, 170, 90, 0.18)',
        'paper-elevation': '0 8px 24px -6px rgba(0, 0, 0, 0.45), 0 2px 6px -1px rgba(0, 0, 0, 0.25)',
        'deep-lift': '0 24px 48px -12px rgba(0, 0, 0, 0.65), 0 4px 12px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}
