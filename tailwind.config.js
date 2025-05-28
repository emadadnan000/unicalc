/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0a0a1a',
        'midnight-blue': '#121330',
        'electric-blue': '#00b4ff',
        'soft-cyan': '#7eeaff',
        'muted-purple': '#6e6ea3',
        'success': '#22c55e',
        'warning': '#f59e0b',
        'danger': '#ef4444'
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(0, 180, 255, 0.3)',
        'glow-lg': '0 0 25px rgba(0, 180, 255, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 3s infinite ease-in-out',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};