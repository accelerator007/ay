/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // لوحة صناعية داكنة: أسود مطفي + فولاذ/فحمي + لمسات معدنية
        ink: {
          950: '#060607',
          900: '#0a0a0b',
          850: '#0f0f11',
          800: '#141417',
          700: '#1b1b1f',
        },
        charcoal: {
          900: '#17181b',
          800: '#1f2024',
          700: '#2a2c31',
          600: '#3a3d44',
          500: '#4d5158',
          400: '#6b7079',
          300: '#8b9099',
        },
        copper: {
          DEFAULT: '#b87333',
          light: '#d08a45',
          dark: '#8f5827',
        },
        rust: '#c2502a',
        silver: '#c9ccd1',
      },
      fontFamily: {
        sans: ['Almarai', 'Cairo', 'system-ui', 'sans-serif'],
        display: ['Cairo', 'Almarai', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'steel-sheen':
          'linear-gradient(135deg, #2a2c31 0%, #3a3d44 25%, #1f2024 50%, #3a3d44 75%, #2a2c31 100%)',
      },
    },
  },
  plugins: [],
}
