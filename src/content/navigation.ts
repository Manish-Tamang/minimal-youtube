import { getCurrentPath } from './dom';

export type PageType =
  | 'home'
  | 'watch'
  | 'search'
  | 'channel'
  | 'subscriptions'
  | 'library'
  | 'shorts'
  | 'unknown';

export function onNavigation(callback: () => void): () => void {
  const events = ['yt-navigate-finish', 'yt-page-data-updated'];
  events.forEach((eventName) => {
    window.addEventListener(eventName, callback);
  });

  return () => {
    events.forEach((eventName) => {
      window.removeEventListener(eventName, callback);
    });
  };
}

/* /shorts/<id> → /watch?v=<id>, so Shorts play in the regular player. */
export function redirectShortsToWatch(): void {
  const match = getCurrentPath().match(/^\/shorts\/([\w-]+)/);
  if (match) window.location.replace(`/watch?v=${match[1]}`);
}
