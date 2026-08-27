// @ts-check
import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
	image: {
		dangerouslyProcessSVG: true,
	},
	integrations: [
		sanity({
			projectId: 'nooi1cuu',
			dataset: 'production',
			// Set to false since the site builds statically (no server adapter) —
			// a stale CDN response cached at build time would otherwise ship to
			// every visitor until the next deploy.
			useCdn: false,
			// No studioBasePath here on purpose: embedding Studio in this project
			// pulls its React app through Astro's own Vite/Rolldown pipeline,
			// which currently fails to bundle sanity/structure's exports. Studio
			// runs standalone instead (`npx sanity dev` / `npx sanity deploy`).
		}),
	],
});
