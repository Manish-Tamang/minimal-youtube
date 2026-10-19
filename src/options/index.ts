import '../shared/ui.css';
import './options.css';
import { mountSettingsForm } from '../shared/settings-form';
import { resetSettings } from '../shared/storage';

mountSettingsForm(
  document.getElementById('settings')!,
  document.getElementById('enabled') as HTMLInputElement,
);

document.getElementById('reset')!.addEventListener('click', () => resetSettings());
