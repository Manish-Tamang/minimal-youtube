import type { SettingKey } from './types';

export interface SettingField {
  key: SettingKey;
  label: string;
  description?: string;
}

export interface SettingGroup {
  title: string;
  fields: SettingField[];
}

/* Labels for the popup and options page, in display order. */
export const SETTING_GROUPS: SettingGroup[] = [
  {
    title: 'Feeds',
    fields: [
      { key: 'hideShorts', label: 'Hide Shorts', description: 'Shelves, tiles, tabs and sidebar link' },
      { key: 'redirectShorts', label: 'Open Shorts as videos', description: '/shorts/… links play in the normal player' },
      { key: 'hideMixes', label: 'Hide mixes', description: 'Auto-generated mix / radio playlists' },
      { key: 'hideFilterChips', label: 'Hide topic chips', description: 'The “All · Music · Gaming…” bar' },
      { key: 'hideShelves', label: 'Hide non-video sections', description: 'News, posts, playables, banners' },
      { key: 'hideSearchClutter', label: 'Hide search shelves', description: '“People also watched”, related searches' },
      { key: 'hideAds', label: 'Hide sponsored cards', description: 'Ad slots and promos in the layout' },
    ],
  },
  {
    title: 'Header & sidebar',
    fields: [
      { key: 'hideSidebar', label: 'Hide sidebar', description: 'Alt+Shift+S or g b to toggle' },
      { key: 'hideVoiceSearch', label: 'Hide voice search' },
      { key: 'hideSearchHistory', label: 'Hide search history', description: 'Suggestions appear once you type' },
      { key: 'hideCreateButton', label: 'Hide Create button' },
      { key: 'hideNotificationBell', label: 'Hide notification bell' },
      { key: 'cleanerLayout', label: 'Cleaner layout', description: 'Trim sidebar extras and small noise' },
    ],
  },
  {
    title: 'Watch page',
    fields: [
      { key: 'hideWatchClutter', label: 'Hide watch-page clutter', description: 'Join, Download, merch, info panels' },
      { key: 'hideEndCards', label: 'Hide end-screen cards' },
      { key: 'hideRelated', label: 'Hide recommendations', description: 'Up-next column beside the video' },
      { key: 'hideComments', label: 'Hide comments' },
    ],
  },
];
