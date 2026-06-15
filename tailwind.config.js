/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // لوحة ألوان دافئة لمقهى مع لمسة "Steel"
        coffee: {
          50: '#faf6f1',
          100: '#f1e7da',
          200: '#e2cbb0',
          300: '#d0aa82',
          400: '#bd885a',
          500: '#a86d40',
          600: '#8a5533',
          700: '#6f432c',
          800: '#5c3828',
          900: '#4e3124',
        },
        steel: {
          50: '#f4f6f7',
          100: '#e3e8ea',
          200: '#cad3d7',
          300: '#a4b4bb',
          400: '#778d97',
          500: '#5c727c',
          600: '#4f6069',
          700: '#445158',
          800: '#3d464c',
          900: '#363d42',
        },
        gold: '#c9a14a',
      },
      fontFamily: {
        sans: ['Tajawal', 'system-ui', 'sans-serif'],
        display: ['Tajawal', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
