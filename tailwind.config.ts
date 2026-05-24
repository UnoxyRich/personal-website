import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#000000',
          50: '#050505',
          100: '#0a0a0a',
          200: '#111111',
          300: '#1a1a1a',
          400: '#222222',
          500: '#333333',
          600: '#555555',
          700: '#888888',
          800: '#cccccc',
          900: '#f5f5f5',
          950: '#ffffff',
        },
      },
      fontFamily: {
        display: ['Roboto', 'system-ui', 'sans-serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['"Roboto Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
} satisfies Config
