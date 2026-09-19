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
          'text-primary': '#F1F5F9', // Lightened slightly
          'text-secondary': '#AAB5C2', // Was 9AA5B4
          'text-tertiary': '#79889C', // Was 626E7F, now passes 4.5:1 against bg-base
          'text-inverse': '#0A0E14',
          signal: '#3DDC97',
          'signal-hover': '#4EE8A6',
          pulse: '#6E56F5',
          'pulse-hover': '#7D68F7',
          accent: '#3DDC97', // kept for backwards compatibility during migration
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
          'status-neutral': '#79889C', // Was 626E7F
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
      },
      backgroundImage: {
        'raven-gradient': 'linear-gradient(135deg, #6E56F5 0%, #3DDC97 100%)',
      },
      boxShadow: {
        'premium-float': '0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(35,43,56,0.5)',
      }
    },
  },
  plugins: [],
}
