/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
          glow: 'rgba(124, 58, 237, 0.3)',
        },
        dark: {
          DEFAULT: '#0F0F0F',
          card: '#161616',
          border: '#1E1E1E',
          hover: '#1A1A2E',
          muted: '#1A1A1A',
        },
        text: {
          primary: '#F8F8F8',
          secondary: '#A0A0A0',
          muted: '#6B6B6B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-violet': 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F0F0F 0%, #1A1A2E 100%)',
        'card-gradient': 'linear-gradient(135deg, #161616 0%, #1E1E2E 100%)',
      },
      boxShadow: {
        'violet': '0 0 30px rgba(124,58,237,0.3)',
        'violet-lg': '0 0 60px rgba(124,58,237,0.4)',
        'card': '0 8px 32px rgba(0,0,0,0.5)',
        'card-hover': '0 8px 40px rgba(124, 58, 237, 0.2)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-violet': 'pulseViolet 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        pulseViolet: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(124, 58, 237, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
