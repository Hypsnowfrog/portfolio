import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import svelte from '@astrojs/svelte';

const siteUrl = process.env.SITE_URL ?? 'https://example.github.io';
const { hostname, pathname } = new URL(siteUrl);
const base = hostname.endsWith('.github.io') && pathname !== '/' ? `/${pathname.replace(/^\/+|\/+$/g, '')}/` : '/';

export default defineConfig({
  site: siteUrl,
  base,
  integrations: [svelte(), sitemap()],
});
