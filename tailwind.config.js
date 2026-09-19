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
          darker: '#06080D',
          dark: '#0B0F19',
          light: '#1A2235',
          border: '#2A3441',
          text: '#94A3B8',
          textTitle: '#F8FAFC',
          accent: '#00F0FF', // Cyber cyan
          danger: '#FF3B30', // Crimson alert
          warning: '#FF9500', 
          success: '#00FF66',
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
