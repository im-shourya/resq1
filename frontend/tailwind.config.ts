import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      colors: {
        red: {
          DEFAULT: '#E8281E',
          dim: 'rgba(232, 40, 30, 0.10)',
          glow: 'rgba(232, 40, 30, 0.40)',
          border: 'rgba(232, 40, 30, 0.28)',
        },
        bg: {
          DEFAULT: '#070A10',
          2: '#0C1018',
          3: '#131A24',
          4: '#1A2230',
          5: '#212B3A',
        },
        text: {
          1: '#EDF2FF',
          2: '#8896AA',
          3: '#4A5568',
        },
        status: {
          green: '#1FCC71',
          orange: '#F59E0B',
          purple: '#A855F7',
          blue: '#3B82F6',
        },
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'pill': '9999px',
      },
      spacing: {
        's1': '4px',
        's2': '8px',
        's3': '12px',
        's4': '16px',
        's5': '24px',
        's6': '32px',
        's7': '48px',
        's8': '64px',
        's9': '96px',
        's10': '128px',
      },
      boxShadow: {
        'card': '0 4px 6px rgba(0,0,0,0.4), 0 1px 3px rgba(0,0,0,0.3)',
        'hover': '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(232, 40, 30, 0.28)',
        'red': '0 0 24px rgba(232, 40, 30, 0.40), 0 0 60px rgba(232,40,30,0.12)',
        'green': '0 0 20px rgba(31,204,113,0.30)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.1s ease-out infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'live-pulse': 'live-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 4s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.55s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fill-bar': 'fill-bar 1.2s ease-out forwards',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-1.2deg)' },
        },
        'live-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.55' },
        },
        'scanline': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(80px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fill-bar': {
          from: { width: '0%' },
          to: { width: 'var(--fill-width, 87%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
