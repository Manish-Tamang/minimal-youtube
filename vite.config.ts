import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import { extensionManifest } from './manifest.config.ts';

const projectRoot = dirname(fileURLToPath(import.meta.url));

function emitManifest(): Plugin {
  return {
    name: 'emit-extension-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.json',
        source: JSON.stringify(extensionManifest, null, 2),
      });
    },
  };
}

export default defineConfig({
  root: resolve(projectRoot, 'src'),
  publicDir: resolve(projectRoot, 'public'),
  plugins: [emitManifest()],
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      // The content script is built separately by vite.content.config.ts:
      // content scripts can't load the shared ES chunks this build splits out.
      input: {
        'background/index': resolve(projectRoot, 'src/background/index.ts'),
        'popup/index': resolve(projectRoot, 'src/popup/index.html'),
        'options/index': resolve(projectRoot, 'src/options/index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
  },
});