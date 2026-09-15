import { defineConfig } from 'astro/config';
import process from 'node:process';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || undefined,
  base: process.env.SITE_BASE_PATH || '/',
  trailingSlash: 'always',
  server: { port: 3000 },
});
