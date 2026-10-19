import { DEFAULT_SETTINGS } from './defaults';
import type { Settings } from './types';

export async function getSettings(): Promise<Settings> {
  const result = await chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS));

  return {
    ...DEFAULT_SETTINGS,
    ...result,
  } as Settings;
}

export async function updateSettings(
  settings: Partial<Settings>,
): Promise<void> {
  await chrome.storage.sync.set(settings);
}

export async function resetSettings(): Promise<void> {
  await chrome.storage.sync.set(DEFAULT_SETTINGS);
}

export function onSettingsChanged(
  callback: (changed: Partial<Settings>) => void,
): void {
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'sync') return;

    const changed: Partial<Settings> = {};
    for (const [key, { newValue }] of Object.entries(changes)) {
      if (key in DEFAULT_SETTINGS) {
        const settingKey = key as keyof Settings;
        changed[settingKey] = (newValue ?? DEFAULT_SETTINGS[settingKey]) as boolean;
      }
    }
    callback(changed);
  });
}
