/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'blue': '#4D4C7D',
      'soft-blue': 'rgba(77,76,125,0.38)',
      'hardBlue': '#363062',
      'purple': '#5D12D2',
      'bright-red': '#FE0000',
      'red': '#BB2525',
      'soft-red': 'rgba(255,38,38,0.3)',
      'pink': '#ff49db',
      'orange': '#F99417',
      'green': '#13ce66',
      'yellow': '#FFCD4B',
      'soft-yellow': 'rgba(255,205,75,0.31)',
      'gray-dark': '#273444',
      'gray': '#F5F5F5',
      'gray-light': '#d3dce6',
      'white-dark': '#faf8f8',
      'white': '#ffffff',
      'back-white': '#F0F0F0'
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
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

