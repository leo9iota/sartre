import { createTheme } from '@vanilla-extract/css';

import { colorVars } from './vars.css';

/**
 * Light Theme - "Refined Utilitarian" Paper/Cream
 * Inspired by markdown documents and paper aesthetic
 */
export const lightTheme = createTheme(colorVars, {
    background: '#F5F3EF', // Warm cream paper
    backgroundAlt: '#EBE8E2', // Slightly darker for cards/sections
    foreground: '#1A1A1A', // Near-black for maximum readability
    foregroundMuted: '#6B6B6B', // Secondary text (metadata, dates)
    primary: '#2C2C2C', // Primary actions, links
    primaryHover: '#1A1A1A', // Darker on hover
    accent: '#8B4513', // Warm brown accent (subtle)
    border: '#D4D0C8', // Soft warm gray border
    borderStrong: '#B8B4AC' // Stronger emphasis border
});

/**
 * Dark Theme - "Refined Utilitarian" Charcoal
 * Comfortable night reading with warm undertones
 */
export const darkTheme = createTheme(colorVars, {
    background: '#1C1C1E', // Deep charcoal
    backgroundAlt: '#2C2C2E', // Elevated surfaces
    foreground: '#E5E5E7', // Off-white for comfort
    foregroundMuted: '#8E8E93', // Muted secondary text
    primary: '#E5E5E7', // Primary actions
    primaryHover: '#FFFFFF', // Brighter on hover
    accent: '#D4A574', // Warm gold accent
    border: '#3A3A3C', // Subtle dark border
    borderStrong: '#48484A' // Stronger border
});
