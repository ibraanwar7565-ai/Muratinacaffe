/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef1f8',
          100: '#d4dbec',
          200: '#a9b6d8',
          300: '#7e91c5',
          400: '#536cb1',
          500: '#34497f',
          600: '#28395f',
          700: '#1c2a4a',
          800: '#121d35',
          900: '#0a1228',
          950: '#050a18',
        },
        gold: {
          50: '#fdf9ee',
          100: '#f8eecb',
          200: '#f1dd97',
          300: '#e9c75e',
          400: '#e2b53a',
          500: '#c99a23',
          600: '#a87a1c',
          700: '#865c1a',
          800: '#6f4a1d',
          900: '#5e3e1d',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
        'fade-up': 'fade-up 0.8s ease forwards',
        marquee: 'marquee 40s linear infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    // Enables `light:` utilities that apply when an ancestor has the `.light`
    // class — the mirror of Tailwind's built-in class-based `dark:` variant.
    function ({ addVariant }) {
      addVariant('light', '.light &');
    },
  ],
}
