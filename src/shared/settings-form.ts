import { SETTING_GROUPS } from './fields';
import { getSettings, onSettingsChanged, updateSettings } from './storage';
import type { Settings } from './types';

function createSwitch(checked: boolean, onChange: (checked: boolean) => void): HTMLElement {
  const wrapper = document.createElement('span');
  wrapper.className = 'switch';

  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = checked;
  input.addEventListener('change', () => onChange(input.checked));

  wrapper.append(input, document.createElement('span'));
  return wrapper;
}

function render(container: HTMLElement, masterSwitch: HTMLInputElement | null, settings: Settings): void {
  document.body.classList.toggle('is-off', !settings.enabled);
  if (masterSwitch) masterSwitch.checked = settings.enabled;

  container.replaceChildren(
    ...SETTING_GROUPS.map((group) => {
      const section = document.createElement('section');
      const heading = document.createElement('h2');
      heading.textContent = group.title;
      section.append(heading);

      for (const field of group.fields) {
        const row = document.createElement('label');
        row.className = 'setting';

        const text = document.createElement('span');
        text.className = 'setting-text';
        const label = document.createElement('span');
        label.textContent = field.label;
        text.append(label);
        if (field.description) {
          const description = document.createElement('span');
          description.className = 'setting-description';
          description.textContent = field.description;
          text.append(description);
        }

        row.append(
          text,
          createSwitch(settings[field.key], (checked) => updateSettings({ [field.key]: checked })),
        );
        section.append(row);
      }
      return section;
    }),
  );
}

/* Renders every setting as a switch and keeps it in sync with storage
   (so keyboard shortcuts flipping a setting show up immediately). */
export async function mountSettingsForm(container: HTMLElement, masterSwitch: HTMLInputElement | null): Promise<void> {
  masterSwitch?.addEventListener('change', () => updateSettings({ enabled: masterSwitch.checked }));

  const refresh = async () => render(container, masterSwitch, await getSettings());
  onSettingsChanged(refresh);
  await refresh();
}
