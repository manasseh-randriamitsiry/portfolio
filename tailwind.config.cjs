const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './App.tsx',
    './index.tsx',
    './components/**/*.{ts,tsx}',
    './views/**/*.{ts,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: withAlpha('--md-sys-color-primary-rgb-space'),
        'on-primary': 'var(--md-sys-color-on-primary)',
        'primary-container': 'var(--md-sys-color-primary-container)',
        'on-primary-container': 'var(--md-sys-color-on-primary-container)',
        secondary: 'var(--md-sys-color-secondary)',
        'on-secondary': 'var(--md-sys-color-on-secondary)',
        'secondary-container': withAlpha('--md-sys-color-secondary-container-rgb-space'),
        'on-secondary-container': 'var(--md-sys-color-on-secondary-container)',
        tertiary: withAlpha('--md-sys-color-tertiary-rgb-space'),
        'on-tertiary': 'var(--md-sys-color-on-tertiary)',
        'tertiary-container': 'var(--md-sys-color-tertiary-container)',
        'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',
        error: 'var(--md-sys-color-error)',
        'on-error': 'var(--md-sys-color-on-error)',
        'error-container': 'var(--md-sys-color-error-container)',
        'on-error-container': 'var(--md-sys-color-on-error-container)',
        background: 'var(--md-sys-color-background)',
        'on-background': 'var(--md-sys-color-on-background)',
        surface: withAlpha('--md-sys-color-surface-rgb-space'),
        'on-surface': 'var(--md-sys-color-on-surface)',
        'surface-variant': withAlpha('--md-sys-color-surface-variant-rgb-space'),
        'on-surface-variant': withAlpha('--md-sys-color-on-surface-variant-rgb-space'),
        'surface-container': 'var(--md-sys-color-surface-container)',
        'surface-container-high': 'var(--md-sys-color-surface-container-high)',
        outline: 'var(--md-sys-color-outline)',
        'outline-variant': withAlpha('--md-sys-color-outline-variant-rgb-space'),
        shadow: 'var(--md-sys-color-shadow)',
        'ios-glass': 'var(--ios-glass)',
        'ios-glass-dark': 'var(--ios-glass-dark)'
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      },
      borderRadius: {
        md3: '1.75rem',
        ios: '2rem',
        'ios-sm': '1rem',
        'ios-lg': '2.5rem'
      },
      boxShadow: {
        'ios-soft': '0 8px 32px rgba(0, 0, 0, 0.08)',
        'ios-heavy': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'ios-glow': '0 0 40px rgba(var(--md-sys-color-primary-rgb), 0.3)'
      },
      backdropBlur: {
        ios: '30px',
        'ios-heavy': '50px'
      }
    }
  }
};
