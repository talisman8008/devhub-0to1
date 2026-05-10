import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        panel: '#080808',
        elevated: '#111111',
        divider: '#222222',
        primary: '#FFFFFF',
        secondary: '#8B8B98',
        muted: '#444444',
        accent: '#00FFC4',
        warm: '#FF6B35',
        success: '#00FFC4',
        error: '#FF4D6D'
      },
      fontFamily: {
        syne: ['var(--font-display)', 'sans-serif'],
        space: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
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
