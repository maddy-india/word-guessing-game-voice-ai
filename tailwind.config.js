/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'peppa-pink': '#FF6B9D',
        'peppa-pink-dark': '#C74C74',
        'daddy-blue': '#5BB1E8',
        'mummy-orange': '#FF8C42',
        'george-blue': '#4A90E2',
        'muddy-brown': '#8B7355',
        'sky-blue': '#B8E6F5',
        'sky-blue-light': '#E8F6FC',
        'grass-green': '#9FD356',
        'hill-green': '#7BC043',
        'sunshine-yellow': '#FFE66D',
        'success-green': '#7BC043',
        'error-red': '#FF6B6B',
        'warning-yellow': '#FFD93D',
      },
      fontFamily: {
        'peppa': ['Fredoka One', 'Comic Sans MS', 'Marker Felt', 'Bradley Hand', 'cursive'],
        'body': ['Quicksand', 'Comic Sans MS', 'Trebuchet MS', 'sans-serif'],
      },
      animation: {
        'bounce-in': 'bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shake': 'shake 0.4s ease-in-out',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'drift-slow': 'drift 60s linear infinite',
        'drift-slow-reverse': 'driftReverse 80s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.3s ease-in-out',
        'ripple': 'ripple 1s ease-out infinite',
        'confetti': 'confetti 1s ease-out forwards',
        'flash-green': 'flashGreen 0.3s ease-out',
        'flash-red': 'flashRed 0.3s ease-out',
        'pop-in': 'popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'sway': 'sway 4s ease-in-out infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' },
        },
        drift: {
          '0%': { transform: 'translateX(-200px)' },
          '100%': { transform: 'translateX(calc(100vw + 200px))' },
        },
        driftReverse: {
          '0%': { transform: 'translateX(calc(100vw + 200px))' },
          '100%': { transform: 'translateX(-200px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        confetti: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: '0' },
        },
        flashGreen: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(123, 192, 67, 0.3)' },
          '100%': { backgroundColor: 'transparent' },
        },
        flashRed: {
          '0%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(255, 107, 107, 0.3)' },
          '100%': { backgroundColor: 'transparent' },
        },
        popIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '80%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },
      boxShadow: {
        'button': '0 6px 0 #C74C74',
        'button-hover': '0 4px 0 #C74C74',
        'button-active': '0 2px 0 #C74C74',
        'button-blue': '0 6px 0 #3A8BC9',
        'button-blue-hover': '0 4px 0 #3A8BC9',
        'card': '0 8px 20px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 12px 28px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}
