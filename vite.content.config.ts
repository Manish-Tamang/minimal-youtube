import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const projectRoot = dirname(fileURLToPath(import.meta.url));

// Content scripts run as classic scripts, so this one is bundled into a single
// self-contained IIFE (plus its CSS) instead of sharing chunks with the main build.
// Runs after vite.config.ts, so it must not empty dist/.
export default defineConfig({
  root: resolve(projectRoot, 'src'),
  publicDir: false,
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: false,
    lib: {
      entry: resolve(projectRoot, 'src/content/index.ts'),
      formats: ['iife'],
      name: 'MinimalYouTube',
      fileName: () => 'content/index.js',
      cssFileName: 'content/index',
    },
  },
});
