import { CSS_PREFIX } from '../shared/constants';

export function getCurrentPath(): string {
  return window.location.pathname;
}

/* Each enabled setting becomes a class on <html>; the stylesheets key off these. */
export function setRootFlags(flags: Record<string, boolean>): void {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(flags)) {
    root.classList.toggle(`${CSS_PREFIX}-${name}`, value);
  }
}

let toastTimer: number | undefined;

export function showToast(text: string): void {
  if (!document.body) return;

  let toast = document.getElementById(`${CSS_PREFIX}-toast`);
  if (!toast) {
    toast = document.createElement('div');
    toast.id = `${CSS_PREFIX}-toast`;
    document.body.append(toast);
  }

  toast.textContent = text;
  toast.classList.add(`${CSS_PREFIX}-show`);
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove(`${CSS_PREFIX}-show`), 1400);
}
