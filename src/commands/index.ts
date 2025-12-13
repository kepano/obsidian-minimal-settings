import MinimalTheme from '../main';
import { registerFontCommands } from './font-commands';
import { registerToggleCommands } from './toggle-commands';
import { registerCycleCommands } from './cycle-commands';
import { registerLightModeCommands } from './light-mode-commands';
import { registerDarkModeCommands } from './dark-mode-commands';
import { registerLightSchemeCommands } from './light-scheme-commands';
import { registerDarkSchemeCommands } from './dark-scheme-commands';

export function registerAllCommands(plugin: MinimalTheme) {
  registerFontCommands(plugin);
  registerCycleCommands(plugin);
  registerToggleCommands(plugin);
  registerLightModeCommands(plugin);
  registerDarkModeCommands(plugin);
  registerLightSchemeCommands(plugin);
  registerDarkSchemeCommands(plugin);
}

