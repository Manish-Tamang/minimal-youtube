import { getSettings, updateSettings } from '../shared/storage';
import type { Settings } from '../shared/types';

const COMMAND_SETTINGS: Record<string, keyof Settings> = {
  'toggle-sidebar': 'hideSidebar',
  'toggle-minimal': 'enabled',
};

// Flip the setting; open YouTube tabs pick it up through storage.onChanged.
chrome.commands.onCommand.addListener(async (command) => {
  const key = COMMAND_SETTINGS[command];
  if (!key) return;

  const settings = await getSettings();
  const patch: Partial<Settings> = {};
  patch[key] = !settings[key];
  await updateSettings(patch);
});
