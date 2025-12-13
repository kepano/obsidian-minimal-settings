import MinimalTheme from '../main';

export function registerFontCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'increase-body-font-size',
    name: 'Increase body font size',
    callback: () => {
      plugin.settings.textNormal = plugin.settings.textNormal + 0.5;
      plugin.saveData(plugin.settings);
      plugin.setFontSize();
    }
  });

  plugin.addCommand({
    id: 'decrease-body-font-size',
    name: 'Decrease body font size',
    callback: () => {
      plugin.settings.textNormal = plugin.settings.textNormal - 0.5;
      plugin.saveData(plugin.settings);
      plugin.setFontSize();
    }
  });
}

