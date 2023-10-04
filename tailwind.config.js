/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'blue': '#1fb6ff',
      'soft-blue': 'rgba(31,182,255,0.6)',
      'hardBlue': '#1f66ff',
      'purple': '#7e5bef',
      'red': '#ff2626',
      'soft-red': 'rgba(255,38,38,0.3)',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'soft-yellow': 'rgba(255,200,44,0.35)',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white-dark': '#faf8f8',
      'white': '#ffffff',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

