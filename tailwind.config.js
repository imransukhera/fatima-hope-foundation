/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F6A44',
          dark: '#0B4F33',
          light: '#15925E',
        },
        secondary: {
          DEFAULT: '#D4AF37',
          light: '#E6C965',
        },
        accent: '#10B981',
        bg: '#F8FAFC',
        ink: '#1F2937',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 4px 16px rgba(15, 106, 68, 0.08)',
        lifted: '0 12px 40px rgba(15, 106, 68, 0.12)',
      },
    },
  },
  plugins: [],
};
