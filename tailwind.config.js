/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // لوحة دافئة بيج/كريمي/بني (شكل تطبيق القهوة)
        cream: {
          50: '#fdfaf5',
          100: '#faf4ec',
          200: '#f3e9da',
          300: '#e8d8c3',
          400: '#dcc4a6',
        },
        latte: {
          300: '#cbb294',
          400: '#b9966f',
          500: '#a87e54',
        },
        coffee: {
          400: '#9c7a5b',
          500: '#7d5a3c',
          600: '#6f4e37',
          700: '#5a3e2b',
          800: '#46301f',
          900: '#3d2b1f',
        },
        accent: '#c98a3c', // كراميل/ذهبي للتمييز
      },
      fontFamily: {
        sans: ['Almarai', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Almarai', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(111, 78, 55, 0.25)',
        card: '0 6px 20px -8px rgba(111, 78, 55, 0.20)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
    },
  },
  plugins: [],
}
