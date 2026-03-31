export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A5F',
        secondary: '#4F46E5',
        accent: '#14B8A6',
        highlight: '#F97316',
        background: '#F5F7FB',
        surface: '#FFFFFF',
        'text-primary': '#1F2937',
        'text-secondary': '#6B7280',
        border: '#E5E7EB',
      },
      boxShadow: {
        soft: '0 24px 60px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        extra: '1.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
