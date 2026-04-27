import { App } from 'obsidian';
import { MinimalSettings } from '../settings';
import { removeDarkScheme, removeLightScheme } from './styles';

export function updateDarkStyle(app: App, settings: MinimalSettings) {
  activeDocument.body.removeClass(
    'theme-light',
    'minimal-dark',
    'minimal-dark-tonal',
    'minimal-dark-black'
  );
  activeDocument.body.addClass(
    'theme-dark',
    settings.darkStyle
  );
  // @ts-ignore
  if (app.vault.getConfig('theme') !== 'system') {
    // @ts-ignore
    app.setTheme('obsidian');
    // @ts-ignore
    app.vault.setConfig('theme', 'obsidian');
  }
  app.workspace.trigger('css-change');
}

export function updateLightStyle(app: App, settings: MinimalSettings) {
  activeDocument.body.removeClass(
    'theme-dark',
    'minimal-light',
    'minimal-light-tonal',
    'minimal-light-contrast',
    'minimal-light-white'
  );
  activeDocument.body.addClass(
    'theme-light',
    settings.lightStyle
  );
  // @ts-ignore
  if (app.vault.getConfig('theme') !== 'system') {
    // @ts-ignore
    app.setTheme('moonstone');
    // @ts-ignore
    app.vault.setConfig('theme', 'moonstone');
  }
  app.workspace.trigger('css-change');
}

export function updateDarkScheme(settings: MinimalSettings) {
  removeDarkScheme();
  activeDocument.body.addClass(settings.darkScheme);
}

export function updateLightScheme(settings: MinimalSettings) {
  removeLightScheme();
  activeDocument.body.addClass(settings.lightScheme);
}

export function updateTheme(app: App) {
  // @ts-ignore
  if (app.vault.getConfig('theme') === 'system') {
    if (activeDocument.body.classList.contains('theme-light')) {
      activeDocument.body.removeClass('theme-light');
      activeDocument.body.addClass('theme-dark');
    } else {
      activeDocument.body.removeClass('theme-dark');
      activeDocument.body.addClass('theme-light');
    }
  } else {
    if (activeDocument.body.classList.contains('theme-light')) {
      activeDocument.body.removeClass('theme-light');
      activeDocument.body.addClass('theme-dark');
    } else {
      activeDocument.body.removeClass('theme-dark');
      activeDocument.body.addClass('theme-light');
    }

    // @ts-ignore
    const currentTheme = app.vault.getConfig('theme');
    const newTheme = currentTheme === 'moonstone' ? 'obsidian' : 'moonstone';

    // @ts-ignore
    app.setTheme(newTheme);
    // @ts-ignore
    app.vault.setConfig('theme', newTheme);
  }
  app.workspace.trigger('css-change');
}

export function updateSidebar(settings: MinimalSettings) {
  const sidebarEl = activeDocument.getElementsByClassName('mod-left-split')[0];
  const ribbonEl = activeDocument.getElementsByClassName('side-dock-ribbon')[0];
  if (sidebarEl && ribbonEl && activeDocument.body.classList.contains('theme-light') && settings.lightStyle == 'minimal-light-contrast') {
    sidebarEl.addClass('theme-dark');
    ribbonEl.addClass('theme-dark');
  } else if (sidebarEl && ribbonEl) {
    sidebarEl.removeClass('theme-dark');
    ribbonEl.removeClass('theme-dark');
  }
}

