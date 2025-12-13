import { Plugin } from 'obsidian';
import { MinimalSettings, MinimalSettingsTab, DEFAULT_SETTINGS } from './settings';
import { registerAllCommands } from './commands';
import { 
  loadRules, 
  unloadRules, 
  updateStyle, 
  removeStyle, 
  removeSettings, 
  removeLightScheme, 
  removeDarkScheme,
  setFontSize 
} from './utils/styles';
import { 
  updateDarkStyle, 
  updateLightStyle, 
  updateDarkScheme, 
  updateLightScheme, 
  updateTheme,
  updateSidebar 
} from './utils/theme';

export default class MinimalTheme extends Plugin {
  settings: MinimalSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new MinimalSettingsTab(this.app, this));
    
    loadRules();
    this.setupListeners();
    this.refresh();
    
    registerAllCommands(this);
  }

  onunload() {
    console.log('Unloading Minimal Theme Settings plugin');
    const sidebarEl = document.getElementsByClassName('mod-left-split')[0];
    if (sidebarEl) {
      sidebarEl.removeClass('theme-dark');
    }
    const ribbonEl = document.getElementsByClassName('side-dock-ribbon')[0];
    if (ribbonEl) {
      ribbonEl.removeClass('theme-dark');
    }

    unloadRules();
    removeStyle();
    removeSettings();
    removeLightScheme();
    removeDarkScheme();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  setupListeners() {
    const settingsUpdate = () => {
      // @ts-ignore
      const fontSize = this.app.vault.getConfig('baseFontSize');
      this.settings.textNormal = fontSize;

      let folding = false;
      let lineNumbers = false;
      let readableLineLength = false;

      // @ts-ignore
      if (this.app.vault.getConfig('foldHeading')) {
        this.settings.folding = true;
        console.log('Folding is on');
        folding = true;
      } else {
        this.settings.folding = false;
        console.log('Folding is off');
      }

      // @ts-ignore
      if (this.app.vault.getConfig('showLineNumber')) {
        this.settings.lineNumbers = true;
        console.log('Line numbers are on');
        lineNumbers = true;
      } else {
        this.settings.lineNumbers = false;
        console.log('Line numbers are off');
      }

      // @ts-ignore
      if (this.app.vault.getConfig('readableLineLength')) {
        this.settings.readableLineLength = true;
        console.log('Readable line length is on');
        readableLineLength = true;
      } else {
        this.settings.readableLineLength = false;
        console.log('Readable line length is off');
      }

      const bodyClassList = document.body.classList;
      bodyClassList.toggle('minimal-folding', folding);
      bodyClassList.toggle('minimal-line-nums', lineNumbers);
      bodyClassList.toggle('minimal-readable', readableLineLength);
      bodyClassList.toggle('minimal-readable-off', !readableLineLength);

      this.saveData(this.settings);
    };

    const sidebarUpdateCallback = () => {
      updateSidebar(this.settings);
    };

    // @ts-ignore
    this.registerEvent(this.app.vault.on('config-changed', settingsUpdate));
    // @ts-ignore
    this.registerEvent(this.app.workspace.on('css-change', sidebarUpdateCallback));

    settingsUpdate();

    // @ts-ignore
    this.app.workspace.onLayoutReady(() => {
      updateSidebar(this.settings);
    });
  }

  refresh() {
    updateStyle(this.settings);
  }

  setFontSize() {
    setFontSize(this.app, this.settings.textNormal);
  }

  updateDarkStyle() {
    updateDarkStyle(this.app, this.settings);
  }

  updateLightStyle() {
    updateLightStyle(this.app, this.settings);
  }

  updateDarkScheme() {
    updateDarkScheme(this.settings);
  }

  updateLightScheme() {
    updateLightScheme(this.settings);
  }

  updateTheme() {
    updateTheme(this.app);
  }
}
