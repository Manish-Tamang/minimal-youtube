export interface Settings {
  enabled: boolean;

  /* ── Feeds (home, subscriptions, search) ── */
  hideShorts: boolean;            // Shorts shelves, tiles, tabs, sidebar link
  redirectShorts: boolean;        // open /shorts/<id> in the normal player
  hideMixes: boolean;             // auto-generated mix / radio playlists
  hideFilterChips: boolean;       // "All", "Music", "Gaming" chip bar
  hideShelves: boolean;           // non-video sections: news, posts, banners
  hideSearchClutter: boolean;     // "People also watched", related searches
  hideAds: boolean;               // ad slots, promos, sponsored tiles

  /* ── Header & sidebar ── */
  hideSidebar: boolean;           // guide + mini-guide (toggle with shortcuts)
  hideVoiceSearch: boolean;       // voice search button in masthead
  hideSearchHistory: boolean;     // no dropdown until you start typing
  hideCreateButton: boolean;      // "Create" / upload button in masthead
  hideNotificationBell: boolean;  // notification bell in masthead

  /* ── Layout tweaks ── */
  cleanerLayout: boolean;         // trim sidebar sections, small visual noise

  /* ── Watch page ── */
  hideWatchClutter: boolean;      // Join, Download, merch, tickets, info panels
  hideEndCards: boolean;          // end-screen cards/overlays
  hideRelated: boolean;           // up-next recommendations column
  hideComments: boolean;          // comments section
}

export type SettingKey = Exclude<keyof Settings, 'enabled'>;
