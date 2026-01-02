import { defineConfig } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';
import neutral from '@park-ui/panda-preset/colors/neutral';

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Park UI preset with neutral gray palette
    presets: [
        '@pandacss/preset-base',
        createPreset({
            accentColor: neutral,
            grayColor: neutral,
            radius: 'md'
        })
    ],

    // Where to look for your css declarations
    include: ['./src/**/*.{js,jsx,ts,tsx}'],

    // Files to exclude
    exclude: [],

    // Use JSX factory for SolidJS
    jsxFramework: 'solid',

    // The output directory for your css system
    outdir: 'styled-system'
});