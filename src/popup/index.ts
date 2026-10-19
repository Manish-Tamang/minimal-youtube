import '../shared/ui.css';
import './popup.css';
import { NAVIGATE_MESSAGE, YOUTUBE_ORIGIN } from '../shared/constants';
import { QUICK_LINKS, SEQUENCE_KEY, SIDEBAR_TOGGLE_KEY } from '../shared/links';
import { mountSettingsForm } from '../shared/settings-form';

mountSettingsForm(
  document.getElementById('settings')!,
  document.getElementById('enabled') as HTMLInputElement,
);

/* ── Quick links: navigate the current YouTube tab, or open a new one ── */

async function openPath(path: string): Promise<void> {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    // Only YouTube tabs run our content script, so this throws anywhere else.
    await chrome.tabs.sendMessage(tab.id!, { type: NAVIGATE_MESSAGE, path });
  } catch {
    await chrome.tabs.create({ url: YOUTUBE_ORIGIN + path });
  }
  window.close();
}

document.getElementById('quick-links')!.append(
  ...QUICK_LINKS.map((link) => {
    const button = document.createElement('button');
    button.textContent = link.label;
    button.addEventListener('click', () => openPath(link.path));
    return button;
  }),
);

/* ── Shortcut reference ── */

function addShortcut(keys: string, description: string): void {
  const term = document.createElement('dt');
  term.textContent = keys;
  const detail = document.createElement('dd');
  detail.textContent = description;
  document.getElementById('shortcuts')!.append(term, detail);
}

chrome.commands.getAll().then((commands) => {
  for (const command of commands) {
    if (command.description) addShortcut(command.shortcut || 'not set', command.description);
  }
  addShortcut(`${SEQUENCE_KEY} ${SIDEBAR_TOGGLE_KEY}`, 'Show / hide the sidebar');
  for (const link of QUICK_LINKS) addShortcut(`${SEQUENCE_KEY} ${link.key}`, link.label);
});

document.getElementById('edit-shortcuts')!.addEventListener('click', () => {
  chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
  window.close();
});
