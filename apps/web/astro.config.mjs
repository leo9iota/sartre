import solidJs from '@astrojs/solid-js';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { defineConfig } from 'astro/config';

export default defineConfig({
    integrations: [solidJs()],
    vite: {
        plugins: [vanillaExtractPlugin()],
        optimizeDeps: {
            include: ['@vanilla-extract/css', '@vanilla-extract/recipes']
        }
    }
});
