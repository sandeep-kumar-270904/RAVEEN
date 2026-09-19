/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raven: {
          'bg-base': '#0A0E14',
          'bg-surface': '#10151D',
          'bg-surface-2': '#161C26',
          'bg-surface-3': '#1D2430',
          'border-subtle': '#232B38',
          'border-strong': '#2E3847',
          'text-primary': '#E6EAF0',
          'text-secondary': '#9AA5B4',
          'text-tertiary': '#626E7F',
          'text-inverse': '#0A0E14',
          accent: '#3DDC97',
          'accent-hover': '#4EE8A6',
          'accent-muted': '#1C3A2E',
          'severity-critical': '#E5484D',
          'severity-high': '#F0883E',
          'severity-medium': '#E8C547',
          'severity-low': '#5B9EE8',
          'severity-info': '#7C8AA0',
          'status-success': '#3DDC97',
          'status-pending': '#E8C547',
          'status-error': '#E5484D',
          'status-neutral': '#626E7F',
          'observed-bg': '#142A24',
          'observed-border': '#2A5C4A',
          'observed-text': '#3DDC97',
          'derived-bg': '#1F1A2E',
          'derived-border': '#453A66',
          'derived-text': '#B4A0F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
