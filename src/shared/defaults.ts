import type { Settings } from './types';

export const DEFAULT_SETTINGS: Settings = {
  enabled: true,

  /* Feeds */
  hideShorts: true,
  redirectShorts: true,
  hideMixes: true,
  hideFilterChips: true,
  hideShelves: true,
  hideSearchClutter: true,
  hideAds: true,

  /* Header & sidebar */
  hideSidebar: true,
  hideVoiceSearch: true,
  hideSearchHistory: true,
  hideCreateButton: true,
  hideNotificationBell: false,

  /* Layout tweaks */
  cleanerLayout: true,

  /* Watch page */
  hideWatchClutter: true,
  hideEndCards: true,
  hideRelated: false,
  hideComments: false,
};
