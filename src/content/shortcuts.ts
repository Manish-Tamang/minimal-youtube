import { QUICK_LINKS, SEQUENCE_KEY, SIDEBAR_TOGGLE_KEY } from '../shared/links';

const SEQUENCE_TIMEOUT_MS = 1200;

interface ShortcutHandlers {
  isEnabled: () => boolean;
  toggleSidebar: () => void;
}

function isTyping(event: KeyboardEvent): boolean {
  const target = event.composedPath()[0];
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

/* Gmail-style "g <key>" sequences: g s → Subscriptions, g b → toggle sidebar, etc. */
export function installShortcuts({ isEnabled, toggleSidebar }: ShortcutHandlers): void {
  let sequenceStartedAt = 0;

  window.addEventListener(
    'keydown',
    (event) => {
      if (!isEnabled() || event.ctrlKey || event.metaKey || event.altKey || isTyping(event)) return;

      const inSequence = Date.now() - sequenceStartedAt < SEQUENCE_TIMEOUT_MS;
      sequenceStartedAt = 0;

      if (inSequence) {
        const link = QUICK_LINKS.find((l) => l.key === event.key);
        if (link || event.key === SIDEBAR_TOGGLE_KEY) {
          // Keep YouTube's own handlers (e.g. "l" = seek forward) from also firing.
          event.preventDefault();
          event.stopImmediatePropagation();
          if (link) window.location.assign(link.path);
          else toggleSidebar();
          return;
        }
      }

      if (event.key === SEQUENCE_KEY && !event.shiftKey) sequenceStartedAt = Date.now();
    },
    true,
  );
}
