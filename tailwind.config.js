/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    extend: {    
      colors: {
        'jays-orange': '#AE3905',
        'jays-gray': '#F3F4F8',
        'jays-text': '#5F687B',
      }
    },
  },
  plugins: [],
}