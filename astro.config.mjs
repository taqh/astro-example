// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://coconutsinwinter.vercel.app',

  // image: {
  //   remotePatterns: [{ protocol: 'https' }],
  // },
  experimental: {
    svg: true,
  },

  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});
