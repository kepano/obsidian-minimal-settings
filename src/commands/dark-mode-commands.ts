import MinimalTheme from '../main';

export function registerDarkModeCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-minimal-dark-default',
    name: 'Use dark mode (default)',
    callback: () => {
      plugin.settings.darkStyle = 'minimal-dark';
      void plugin.saveData(plugin.settings);
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-dark-tonal',
    name: 'Use dark mode (low contrast)',
    callback: () => {
      plugin.settings.darkStyle = 'minimal-dark-tonal';
      void plugin.saveData(plugin.settings);
      plugin.updateDarkStyle();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-dark-black',
    name: 'Use dark mode (true black)',
    callback: () => {
      plugin.settings.darkStyle = 'minimal-dark-black';
      void plugin.saveData(plugin.settings);
      plugin.updateDarkStyle();
    }
  });
}

