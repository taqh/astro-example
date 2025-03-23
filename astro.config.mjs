// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://coconutsinwinter.vercel.app',
  experimental: {
    svg: true,
  },
  image: {
    domains: ["images.marblecms.com"],
  },
  adapter: vercel({
    webAnalytics: { enabled: true },
    isr: {
      expiration: 60,
    },
  }),
});
