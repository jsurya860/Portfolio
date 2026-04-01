/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundColor: {
        primary:   'var(--bg-primary)',
        secondary: 'var(--bg-secondary)',
        tertiary:  'var(--bg-tertiary)',
        card:      'var(--card-bg)',
        surface:   'var(--bg-surface)',
      },
      textColor: {
        primary:   'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        tertiary:  'var(--text-tertiary)',
      },
      borderColor: {
        DEFAULT: 'var(--border-color)',
        card:    'var(--card-border)',
        subtle:  'var(--border-subtle)',
      },
      colors: {
        accent: {
          primary:   'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          indigo:    'var(--accent-indigo)',
          error:     'var(--accent-error)',
          warning:   'var(--accent-warning)',
          glow:      'var(--accent-glow)',
        },
      },
      boxShadow: {
        'glow-green': '0 0 0 1px rgba(34,197,94,0.4), 0 0 24px rgba(34,197,94,0.22)',
        'glow-blue':  '0 0 0 1px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.22)',
        'glow-red':   '0 0 0 1px rgba(239,68,68,0.4),  0 0 24px rgba(239,68,68,0.22)',
        'card':       'var(--card-shadow)',
      },
      transitionDuration: {
        '350': '350ms',
        '400': '400ms',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
};
