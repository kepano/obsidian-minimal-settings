import MinimalTheme from '../main';

export function registerToggleCommands(plugin: MinimalTheme) {
  plugin.addCommand({
    id: 'toggle-hidden-borders',
    name: 'Toggle sidebar borders',
    callback: () => {
      plugin.settings.bordersToggle = !plugin.settings.bordersToggle;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });

  plugin.addCommand({
    id: 'toggle-colorful-headings',
    name: 'Toggle colorful headings',
    callback: () => {
      plugin.settings.colorfulHeadings = !plugin.settings.colorfulHeadings;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-focus-mode',
    name: 'Toggle focus mode',
    callback: () => {
      plugin.settings.focusMode = !plugin.settings.focusMode;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-colorful-frame',
    name: 'Toggle colorful window frame',
    callback: () => {
      plugin.settings.colorfulFrame = !plugin.settings.colorfulFrame;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-img-grid',
    name: 'Toggle image grids',
    callback: () => {
      plugin.settings.imgGrid = !plugin.settings.imgGrid;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-switch',
    name: 'Switch between light and dark mode',
    callback: () => {
      plugin.updateTheme();
    }
  });

  plugin.addCommand({
    id: 'toggle-minimal-dev-block-width',
    name: 'Dev — Show block widths',
    callback: () => {
      plugin.settings.devBlockWidth = !plugin.settings.devBlockWidth;
      plugin.saveData(plugin.settings);
      plugin.refresh();
    }
  });
}

