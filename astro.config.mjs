// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://kimsajaang.github.io',
  base: '/case-study-project-grp-4-csarch2',
  integrations: [react(), mdx(), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
