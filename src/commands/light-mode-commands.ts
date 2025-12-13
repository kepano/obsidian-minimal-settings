import MinimalTheme from '../main';

export function registerLightModeCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-minimal-light-default',
    name: 'Use light mode (default)',
    callback: () => {
      plugin.settings.lightStyle = 'minimal-light';
      plugin.saveData(plugin.settings);
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-light-white',
    name: 'Use light mode (all white)',
    callback: () => {
      plugin.settings.lightStyle = 'minimal-light-white';
      plugin.saveData(plugin.settings);
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-light-tonal',
    name: 'Use light mode (low contrast)',
    callback: () => {
      plugin.settings.lightStyle = 'minimal-light-tonal';
      plugin.saveData(plugin.settings);
      plugin.updateLightStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-light-contrast',
    name: 'Use light mode (high contrast)',
    callback: () => {
      plugin.settings.lightStyle = 'minimal-light-contrast';
      plugin.saveData(plugin.settings);
      plugin.updateLightStyle();
    }
  });
}

