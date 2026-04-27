import MinimalTheme from '../main';

export function registerLightSchemeCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-minimal-atom-light',
    name: 'Switch light color scheme to Atom (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-atom-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-ayu-light',
    name: 'Switch light color scheme to Ayu (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-ayu-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-catppuccin-light',
    name: 'Switch light color scheme to Catppuccin (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-catppuccin-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-default-light',
    name: 'Switch light color scheme to default (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-default-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-gruvbox-light',
    name: 'Switch light color scheme to Gruvbox (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-gruvbox-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-eink-light',
    name: 'Switch light color scheme to E-ink (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-eink-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-everforest-light',
    name: 'Switch light color scheme to Everforest (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-everforest-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-flexoki-light',
    name: 'Switch light color scheme to Flexoki (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-flexoki-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-macos-light',
    name: 'Switch light color scheme to macOS (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-macos-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-notion-light',
    name: 'Switch light color scheme to Sky (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-notion-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-nord-light',
    name: 'Switch light color scheme to Nord (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-nord-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-rose-pine-light',
    name: 'Switch light color scheme to Rosé Pine (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-rose-pine-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-solarized-light',
    name: 'Switch light color scheme to Solarized (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-solarized-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-things-light',
    name: 'Switch light color scheme to Things (light)',
    callback: () => {
      plugin.settings.lightScheme = 'minimal-things-light';
      void plugin.saveData(plugin.settings);
      plugin.updateLightScheme();
      plugin.updateLightStyle();
    }
  });
}

