import { style } from '@vanilla-extract/css';

import { vars } from '../../../styles/vars.css';

export const switchRoot = style({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    selectors: {
        '&[data-disabled]': {
            cursor: 'not-allowed',
            opacity: 0.5
        }
    }
});

export const switchInput = style({
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    borderWidth: 0
});

export const switchControl = style({
    display: 'inline-flex',
    alignItems: 'center',
    height: '1.5rem',
    width: '2.75rem',
    borderRadius: vars.radii.full,
    backgroundColor: vars.colors.border,
    border: '2px solid transparent',
    transition: 'background-color 0.2s ease',
    outline: 'none',
    selectors: {
        '&[data-checked]': {
            backgroundColor: vars.colors.primary
        },
        [`${switchRoot}[data-focus-visible] &`]: {
            outline: '2px solid',
            outlineColor: vars.colors.primary,
            outlineOffset: '2px'
        }
    }
});

export const switchThumb = style({
    display: 'block',
    width: '1.25rem',
    height: '1.25rem',
    backgroundColor: vars.colors.background,
    borderRadius: vars.radii.full,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
    transition:
        'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), width 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)',
    transform: 'translateX(0)',
    pointerEvents: 'none',

    selectors: {
        [`${switchControl}[data-checked] &`]: {
            transform: 'translateX(1.25rem)'
        },
        [`${switchRoot}[data-pressed] &`]: {
            width: '1.5rem'
        },
        [`${switchRoot}[data-pressed] ${switchControl}[data-checked] &`]: {
            transform: 'translateX(1rem)'
        }
    }
});

export const switchLabel = style({
    marginLeft: vars.space[2],
    fontSize: vars.fontSizes.sm,
    fontWeight: vars.fontWeights.medium,
    color: vars.colors.foreground,
    userSelect: 'none'
});
