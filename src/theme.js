/**
 * KTVN Design Token File — Premium Edition
 * -----------------------------------------
 * Single source of truth for all visual design decisions.
 * Inspired by top-tier institution branding (Oxford, IIM, etc.):
 *   Deep Navy + Rich Gold + Clean off-white typography.
 *
 * tailwind.config.js reads this and exposes utility classes:
 *   bg-primary, text-accent, text-gold, font-display, rounded-card, etc.
 */

const theme = {
  colors: {
    // ── Core backgrounds
    primary:        '#0C1A2E',   // Rich deep navy — main bg
    primaryDark:    '#080F1C',   // Darker navy — footer
    surface:        '#132236',   // Card surface
    surfaceHover:   '#1a2f47',   // Card hover
    surfaceGlass:   'rgba(19,34,54,0.8)', // Glass card bg

    // ── Brand accent — Rich Gold
    accent:         '#C9A84C',   // Primary gold
    accentLight:    '#E8C96B',   // Lighter gold (hover, highlights)
    accentDark:     '#A07830',   // Darker gold (active states)
    accentGlow:     'rgba(201,168,76,0.18)', // Glow for shadows

    // ── Teal (kept for legacy slider dots only — prefer gold)
    teal:           '#52D3D8',

    // ── Text hierarchy
    textPrimary:    '#F0EDE6',   // Warm off-white — premium feel
    textSecondary:  '#B8B0A0',   // Warm muted text
    textMuted:      '#7A7060',   // Subdued labels
    textDark:       '#0C1A2E',   // Text on light surfaces

    // ── Borders
    border:         'rgba(201,168,76,0.15)', // Gold-tinted subtle border
    borderLight:    'rgba(255,255,255,0.08)',

    // ── Medal colours
    gold:           '#D4A017',
    silver:         '#A8A9AD',
    bronze:         '#CD7F32',

    // ── Feedback
    success:        '#22c55e',
    error:          '#ef4444',
    info:           '#3b82f6',

    // ── Gradient helpers
    gradientFrom:   '#0C1A2E',
    gradientMid:    '#1a2f47',
    gradientTo:     '#C9A84C',
  },

  fonts: {
    sans:    '"Inter", "Segoe UI", system-ui, sans-serif',
    display: '"Playfair Display", "Georgia", serif',   // Premium serif for headings
    mono:    '"JetBrains Mono", "Fira Code", monospace',
  },

  radius: {
    sm:   '0.375rem',
    card: '1rem',
    btn:  '0.625rem',
    lg:   '1.5rem',
    xl:   '2rem',
    full: '9999px',
  },

  spacing: {
    navH:    '4.5rem',
    section: '5rem',
  },

  transition: {
    fast:    '150ms cubic-bezier(0.4,0,0.2,1)',
    default: '250ms cubic-bezier(0.4,0,0.2,1)',
    slow:    '600ms cubic-bezier(0.4,0,0.2,1)',
  },

  shadow: {
    card:   '0 2px 20px rgba(0,0,0,0.4)',
    hover:  '0 8px 40px rgba(201,168,76,0.2)',
    glow:   '0 0 30px rgba(201,168,76,0.3)',
  },
};

export default theme;
