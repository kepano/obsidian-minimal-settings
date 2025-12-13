import MinimalTheme from '../main';

export function registerLightSchemeCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-minimal-atom-light',
    name: 'Switch light color scheme to Atom (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-atom-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-ayu-light',
    name: 'Switch light color scheme to Ayu (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-ayu-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-catppuccin-light',
    name: 'Switch light color scheme to Catppuccin (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-catppuccin-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-default-light',
    name: 'Switch light color scheme to default (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-default-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-gruvbox-light',
    name: 'Switch light color scheme to Gruvbox (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-gruvbox-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-eink-light',
    name: 'Switch light color scheme to E-ink (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-eink-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-everforest-light',
    name: 'Switch light color scheme to Everforest (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-everforest-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-flexoki-light',
    name: 'Switch light color scheme to Flexoki (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-flexoki-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-macos-light',
    name: 'Switch light color scheme to macOS (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-macos-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-notion-light',
    name: 'Switch light color scheme to Sky (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-notion-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-nord-light',
    name: 'Switch light color scheme to Nord (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-nord-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-rose-pine-light',
    name: 'Switch light color scheme to Rosé Pine (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-rose-pine-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-solarized-light',
    name: 'Switch light color scheme to Solarized (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-solarized-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-things-light',
    name: 'Switch light color scheme to Things (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-things-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });
}

