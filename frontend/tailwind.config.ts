import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(179, 20, 20, 0.06)'
      }
    },
  },
  plugins: [],
} satisfies Config