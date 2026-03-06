/** @type {import('tailwindcss').Config} */
import theme from './src/theme.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:           theme.colors.primary,
        'primary-dark':    theme.colors.primaryDark,
        surface:           theme.colors.surface,
        'surface-hover':   theme.colors.surfaceHover,
        'surface-glass':   theme.colors.surfaceGlass,
        accent:            theme.colors.accent,
        'accent-light':    theme.colors.accentLight,
        'accent-dark':     theme.colors.accentDark,
        'accent-glow':     theme.colors.accentGlow,
        teal:              theme.colors.teal,
        'text-primary':    theme.colors.textPrimary,
        'text-secondary':  theme.colors.textSecondary,
        'text-muted':      theme.colors.textMuted,
        'text-dark':       theme.colors.textDark,
        border:            theme.colors.border,
        'border-light':    theme.colors.borderLight,
        gold:              theme.colors.gold,
        silver:            theme.colors.silver,
        bronze:            theme.colors.bronze,
      },
      fontFamily: {
        sans:     [theme.fonts.sans],
        display:  [theme.fonts.display],
        contrail: ['Contrail One', 'sans-serif'],  // legacy alias
      },
      borderRadius: {
        card: theme.radius.card,
        btn:  theme.radius.btn,
        lg:   theme.radius.lg,
        xl:   theme.radius.xl,
      },
      boxShadow: {
        card:  theme.shadow.card,
        hover: theme.shadow.hover,
        glow:  theme.shadow.glow,
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.4,0,0.2,1)',
      },
    },
  },
  plugins: [],
}
