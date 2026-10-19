/* Replacements for the hidden sidebar: popup buttons and "g <key>" shortcuts. */
export interface QuickLink {
  key: string;
  label: string;
  path: string;
}

export const QUICK_LINKS: QuickLink[] = [
  { key: 'h', label: 'Home', path: '/' },
  { key: 's', label: 'Subscriptions', path: '/feed/subscriptions' },
  { key: 'r', label: 'History', path: '/feed/history' },
  { key: 'w', label: 'Watch later', path: '/playlist?list=WL' },
  { key: 'l', label: 'Liked', path: '/playlist?list=LL' },
  { key: 'p', label: 'Playlists', path: '/feed/playlists' },
  { key: 'y', label: 'You', path: '/feed/you' },
];

export const SEQUENCE_KEY = 'g';
export const SIDEBAR_TOGGLE_KEY = 'b';
