import MinimalTheme from '../main';

export function registerDarkSchemeCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-minimal-atom-dark',
    name: 'Switch dark color scheme to Atom (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-atom-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-ayu-dark',
    name: 'Switch dark color scheme to Ayu (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-ayu-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-catppuccin-dark',
    name: 'Switch dark color scheme to Catppuccin (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-catppuccin-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-dracula-dark',
    name: 'Switch dark color scheme to Dracula (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-dracula-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-default-dark',
    name: 'Switch dark color scheme to default (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-default-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-eink-dark',
    name: 'Switch dark color scheme to E-ink (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-eink-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-everforest-dark',
    name: 'Switch dark color scheme to Everforest (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-everforest-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-flexoki-dark',
    name: 'Switch dark color scheme to Flexoki (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-flexoki-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-gruvbox-dark',
    name: 'Switch dark color scheme to Gruvbox (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-gruvbox-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-macos-dark',
    name: 'Switch dark color scheme to macOS (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-macos-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-nord-dark',
    name: 'Switch dark color scheme to Nord (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-nord-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-notion-dark',
    name: 'Switch dark color scheme to Sky (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-notion-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-rose-pine-dark',
    name: 'Switch dark color scheme to Rosé Pine (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-rose-pine-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-solarized-dark',
    name: 'Switch dark color scheme to Solarized (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-solarized-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-things-dark',
    name: 'Switch dark color scheme to Things (dark)',
    callback: () => {
      plugin.settings.darkScheme = 'minimal-things-dark';
      plugin.saveData(plugin.settings);
      plugin.updateDarkScheme();
      plugin.updateDarkStyle();
    }
  });
}

