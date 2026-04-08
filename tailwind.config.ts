import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'suu-bg':        '#0A0A0F',
        'suu-surface':   '#13131A',
        'suu-border':    'rgba(255,255,255,0.07)',
        'suu-muted':     '#7A7A8A',
        'suu-tienda':    '#E8FF47',
        'suu-productor': '#FF6B35',
        'suu-prod-light':'#FF9A73',
        'suu-text':      '#F0EFE8',
        'suu-ai':        '#F5C518',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      borderRadius: {
        card: '12px',
        pill: '100px',
      },
      transitionTimingFunction: {
        DEFAULT: 'ease',
      },
      transitionDuration: {
        DEFAULT: '200ms',
      },
    },
  },
  plugins: [],
}
export default config
