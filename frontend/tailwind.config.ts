import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        panel: '#0D0D0D',
        elevated: '#171717',
        divider: '#222222',
        primary: '#F5F5F5',
        secondary: '#A1A1A1',
        muted: '#444444',
        accent: '#00ffc4',
        beige: '#00ffc4',
        success: '#B6FF5C',
        error: '#FF4D6D'
      },
      fontFamily: {
        syne: ['"Helvetica Suite"', 'system-ui', '-apple-system', 'sans-serif'],
        space: ['"Helvetica Suite"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Helvetica Suite"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Helvetica Suite"', 'monospace']
      },
      boxShadow: {
        card: '0 0 0 1px rgba(255,255,255,0.06)',
        elevated: '0 4px 24px rgba(0,0,0,0.4)',
        accent: '0 0 28px rgba(0,255,196,0.22)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 26s linear infinite'
      }
    }
  },
  plugins: []
}

export default config
