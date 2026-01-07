import { createGlobalTheme, createThemeContract } from '@vanilla-extract/css';

/**
 * Static tokens that don't change with theme
 */
export const staticVars = createGlobalTheme(':root', {
    space: {
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem'
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem'
    },
    fontWeights: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
    },
    radii: {
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        full: '9999px'
    },
    fonts: {
        // Monospaced headings for that "spec document" feel
        heading: "'Space Mono', monospace",
        body: "'Inter', system-ui, sans-serif",
        mono: "'Space Mono', monospace"
    }
});

/**
 * Color tokens that change with theme (light/dark)
 * These are defined as a contract and filled by theme classes
 */
export const colorVars = createThemeContract({
    background: null,
    backgroundAlt: null,
    foreground: null,
    foregroundMuted: null,
    primary: null,
    primaryHover: null,
    accent: null,
    border: null,
    borderStrong: null
});

/**
 * Convenience export combining static and themeable tokens
 * Use this throughout the app for consistent access
 */
export const vars = {
    ...staticVars,
    colors: colorVars
};
