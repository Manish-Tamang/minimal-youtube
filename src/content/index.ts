import './content.css';
import { NAVIGATE_MESSAGE } from '../shared/constants';
import { DEFAULT_SETTINGS } from '../shared/defaults';
import { getSettings, onSettingsChanged, updateSettings } from '../shared/storage';
import type { Settings } from '../shared/types';
import { setRootFlags, showToast } from './dom';
import { onNavigation, redirectShortsToWatch } from './navigation';
import { installShortcuts } from './shortcuts';

let settings: Settings = { ...DEFAULT_SETTINGS };

function applySettings(): void {
  const { enabled, ...rest } = settings;
  setRootFlags({ on: enabled, ...rest });
}

function maybeRedirectShorts(): void {
  if (settings.enabled && settings.redirectShorts) redirectShortsToWatch();
}

// Apply defaults right away (we run at document_start) so clutter never flashes in,
// then swap in the saved settings.
applySettings();
getSettings().then((saved) => {
  settings = saved;
  applySettings();
  maybeRedirectShorts();
});

onSettingsChanged((changed) => {
  settings = { ...settings, ...changed };
  applySettings();
  if (changed.hideSidebar !== undefined) showToast(settings.hideSidebar ? 'Sidebar hidden' : 'Sidebar shown');
  if (changed.enabled !== undefined) showToast(settings.enabled ? 'Minimal YouTube on' : 'Minimal YouTube off');
});

onNavigation(maybeRedirectShorts);

installShortcuts({
  isEnabled: () => settings.enabled,
  toggleSidebar: () => updateSettings({ hideSidebar: !settings.hideSidebar }),
});

// Popup quick links navigate this tab (no "tabs" permission needed).
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.type !== NAVIGATE_MESSAGE) return;
  window.location.assign(message.path);
  sendResponse(true);
});
