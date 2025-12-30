import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://pscl.lbssr.ch',
  integrations: [icon()],
  // Uncomment and set if deploying to a repository other than username.github.io:
  // base: '/2026-portfolio',
});
