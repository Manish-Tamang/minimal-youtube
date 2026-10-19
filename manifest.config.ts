import { version } from './package.json';

export const extensionManifest = {
  manifest_version: 3,
  name: 'Minimal YouTube',
  version,
  description: 'A visual customization layer for the YouTube web interface.',
  homepage_url: 'https://github.com/Manish-Tamang/minimal-youtube',
  icons: {
    16: 'icons/16.png',
    32: 'icons/32.png',
    48: 'icons/48.png',
    128: 'icons/128.png',
  },
  permissions: ['storage'],
  background: {
    service_worker: 'background/index.js',
    type: 'module',
  },
  action: {
    default_title: 'Minimal YouTube',
    default_popup: 'popup/index.html',
  },
  options_page: 'options/index.html',
  content_scripts: [
    {
      matches: ['https://www.youtube.com/*'],
      js: ['content/index.js'],
      css: ['content/index.css'],
      run_at: 'document_start',
    },
  ],
  commands: {
    'toggle-sidebar': {
      suggested_key: { default: 'Alt+Shift+S' },
      description: 'Show / hide the sidebar',
    },
    'toggle-minimal': {
      suggested_key: { default: 'Alt+Shift+M' },
      description: 'Turn Minimal YouTube on / off',
    },
  },
} as const;
