/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bee: {
          yellow: '#FFC91F',
          yellowDeep: '#FFC91F',
          black: '#1c1e21',
          charcoal: '#222222',
          white: '#FFFFFF',
          orange: '#FF9800',
          gray: '#f5f6f7',
          grayLight: '#ebedf0',
          grayMuted: '#969faf',
          border: '#e0e3e8',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'Poppins', 'Lineto Circular Pro Book', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 