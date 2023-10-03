import { App, Workspace, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MinimalTheme extends Plugin {

  settings: MinimalSettings;

  async onload() {

    await this.loadSettings();

    this.addSettingTab(new MinimalSettingTab(this.app, this));

    this.addStyle();

    // Watch for system changes to color theme 

    let media = window.matchMedia('(prefers-color-scheme: dark)');

    let updateSystemTheme = () => {
      if (media.matches && this.settings.useSystemTheme) {
        console.log('Dark mode active');
        this.updateDarkStyle()
      } else if (this.settings.useSystemTheme) {
        console.log('Light mode active');
        this.updateLightStyle()
      }
    }

    media.addEventListener('change', updateSystemTheme);

    // Remove system theme listener when we unload
    this.register(() => media.removeEventListener('change', updateSystemTheme));

    updateSystemTheme();

    // Check state of Obsidian Settings
    let settingsUpdate = () => {
      // @ts-ignore
      const fontSize = this.app.vault.getConfig('baseFontSize');
      this.settings.textNormal = fontSize;

      // @ts-ignore
      if (this.app.vault.getConfig('foldHeading')) {
        this.settings.folding = true;
        this.saveData(this.settings);
        console.log('Folding is on');
      } else {
        this.settings.folding = false;
        this.saveData(this.settings);
        console.log('Folding is off');
      }
      document.body.classList.toggle('minimal-folding', this.settings.folding);
      // @ts-ignore
      if (this.app.vault.getConfig('showLineNumber')) {
        this.settings.lineNumbers = true;
        this.saveData(this.settings);
        console.log('Line numbers are on');
      } else {
        this.settings.lineNumbers = false;
        this.saveData(this.settings);
        console.log('Line numbers are off');
      }
      document.body.classList.toggle('minimal-line-nums', this.settings.lineNumbers);
      // @ts-ignore
      if (this.app.vault.getConfig('readableLineLength')) {
        this.settings.readableLineLength = true;
        this.saveData(this.settings);
        console.log('Readable line length is on');
      } else {
        this.settings.readableLineLength = false;
        this.saveData(this.settings);
        console.log('Readable line length is off');
      }

      document.body.classList.toggle('minimal-readable', this.settings.readableLineLength);
      document.body.classList.toggle('minimal-readable-off', !this.settings.readableLineLength);
  
    }
  
    let sidebarUpdate = () => {
      const sidebarEl = document.getElementsByClassName('mod-left-split')[0];
      const ribbonEl = document.getElementsByClassName('side-dock-ribbon')[0];
      if (sidebarEl && ribbonEl && this.app.vault.getConfig('theme') == 'moonstone' && this.settings.lightStyle == 'minimal-light-contrast') {
        sidebarEl.addClass('theme-dark');
        ribbonEl.addClass('theme-dark');
      } else if (sidebarEl && ribbonEl) {
        sidebarEl.removeClass('theme-dark'); 
        ribbonEl.removeClass('theme-dark');
      }
    }

    // @ts-ignore
    this.registerEvent(app.vault.on('config-changed', settingsUpdate));
    this.registerEvent(app.workspace.on('css-change', sidebarUpdate));

    settingsUpdate();
    
    app.workspace.onLayoutReady(() => {
      sidebarUpdate();
    });

    const lightStyles = ['minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white'];
    const darkStyles = ['minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black'];
    const imgGridStyles = ['img-grid','img-grid-ratio','img-nogrid'];
    const tableWidthStyles = ['table-100','table-default-width','table-wide','table-max'];
    const iframeWidthStyles = ['iframe-100','iframe-default-width','iframe-wide','iframe-max'];
    const imgWidthStyles = ['img-100','img-default-width','img-wide','img-max'];
    const mapWidthStyles = ['map-100','map-default-width','map-wide','map-max'];
    const chartWidthStyles = ['chart-100','chart-default-width','chart-wide','chart-max'];
    const theme = ['moonstone', 'obsidian'];

    this.addCommand({
      id: 'increase-body-font-size',
      name: 'Increase body font size',
      callback: () => {
        this.settings.textNormal = this.settings.textNormal + 0.5;
        this.saveData(this.settings);
        this.setFontSize();
      }
    });

    this.addCommand({
      id: 'decrease-body-font-size',
      name: 'Decrease body font size',
      callback: () => {
        this.settings.textNormal = this.settings.textNormal - 0.5;
        this.saveData(this.settings);
        this.setFontSize();
      }
    }); 

    this.addCommand({
      id: 'toggle-minimal-dark-cycle',
      name: 'Cycle between dark mode styles',
      callback: () => {
        this.settings.darkStyle = darkStyles[(darkStyles.indexOf(this.settings.darkStyle) + 1) % darkStyles.length];
        this.saveData(this.settings);
        this.updateDarkStyle();
      }
    });  

    this.addCommand({
      id: 'toggle-minimal-light-cycle',
      name: 'Cycle between light mode styles',
      callback: () => {
        this.settings.lightStyle = lightStyles[(lightStyles.indexOf(this.settings.lightStyle) + 1) % lightStyles.length];
        this.saveData(this.settings);
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-hidden-borders',
      name: 'Toggle sidebar borders',
      callback: () => {
        this.settings.bordersToggle = !this.settings.bordersToggle;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'toggle-colorful-headings',
      name: 'Toggle colorful headings',
      callback: () => {
        this.settings.colorfulHeadings = !this.settings.colorfulHeadings;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-focus-mode',
      name: 'Toggle focus mode',
      callback: () => {
        this.settings.focusMode = !this.settings.focusMode;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-colorful-frame',
      name: 'Toggle colorful window frame',
      callback: () => {
        this.settings.colorfulFrame = !this.settings.colorfulFrame;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'cycle-minimal-table-width',
      name: 'Cycle between table width options',
      callback: () => {
        this.settings.tableWidth = tableWidthStyles[(tableWidthStyles.indexOf(this.settings.tableWidth) + 1) % tableWidthStyles.length];
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'cycle-minimal-image-width',
      name: 'Cycle between image width options',
      callback: () => {
        this.settings.imgWidth = imgWidthStyles[(imgWidthStyles.indexOf(this.settings.imgWidth) + 1) % imgWidthStyles.length];
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'cycle-minimal-iframe-width',
      name: 'Cycle between iframe width options',
      callback: () => {
        this.settings.iframeWidth = iframeWidthStyles[(iframeWidthStyles.indexOf(this.settings.iframeWidth) + 1) % iframeWidthStyles.length];
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'cycle-minimal-chart-width',
      name: 'Cycle between chart width options',
      callback: () => {
        this.settings.chartWidth = chartWidthStyles[(chartWidthStyles.indexOf(this.settings.chartWidth) + 1) % chartWidthStyles.length];
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'cycle-minimal-map-width',
      name: 'Cycle between map width options',
      callback: () => {
        this.settings.mapWidth = mapWidthStyles[(mapWidthStyles.indexOf(this.settings.mapWidth) + 1) % mapWidthStyles.length];
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-img-grid',
      name: 'Toggle image grids',
      callback: () => {
        this.settings.imgGrid = !this.settings.imgGrid;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-switch',
      name: 'Switch between light and dark mode',
      callback: () => {
        this.settings.theme = theme[(theme.indexOf(this.settings.theme) + 1) % theme.length];
        this.saveData(this.settings);
        this.updateTheme();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-light-default',
      name: 'Use light mode (default)',
      callback: () => {
        this.settings.lightStyle = 'minimal-light';
        this.saveData(this.settings);
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-light-white',
      name: 'Use light mode (all white)',
      callback: () => {
        this.settings.lightStyle = 'minimal-light-white';
        this.saveData(this.settings);
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-light-tonal',
      name: 'Use light mode (low contrast)',
      callback: () => {
        this.settings.lightStyle = 'minimal-light-tonal';
        this.saveData(this.settings);
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-light-contrast',
      name: 'Use light mode (high contrast)',
      callback: () => {
        this.settings.lightStyle = 'minimal-light-contrast';
        this.saveData(this.settings);
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-dark-default',
      name: 'Use dark mode (default)',
      callback: () => {
        this.settings.darkStyle = 'minimal-dark';
        this.saveData(this.settings);
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-dark-tonal',
      name: 'Use dark mode (low contrast)',
      callback: () => {
        this.settings.darkStyle = 'minimal-dark-tonal';
        this.saveData(this.settings);
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-dark-black',
      name: 'Use dark mode (true black)',
      callback: () => {
        this.settings.darkStyle = 'minimal-dark-black';
        this.saveData(this.settings);
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-atom-light',
      name: 'Switch light color scheme to Atom (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-atom-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-ayu-light',
      name: 'Switch light color scheme to Ayu (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-ayu-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-catppuccin-light',
      name: 'Switch light color scheme to Catppuccin (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-catppuccin-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-default-light',
      name: 'Switch light color scheme to default (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-default-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-gruvbox-light',
      name: 'Switch light color scheme to Gruvbox (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-gruvbox-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-eink-light',
      name: 'Switch light color scheme to E-ink (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-eink-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-everforest-light',
      name: 'Switch light color scheme to Everforest (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-everforest-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-macos-light',
      name: 'Switch light color scheme to macOS (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-macos-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-notion-light',
      name: 'Switch light color scheme to Notion (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-notion-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-nord-light',
      name: 'Switch light color scheme to Nord (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-nord-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-rose-pine-light',
      name: 'Switch light color scheme to Rosé Pine (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-rose-pine-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-solarized-light',
      name: 'Switch light color scheme to Solarized (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-solarized-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-things-light',
      name: 'Switch light color scheme to Things (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-things-light';
        this.saveData(this.settings);
        this.updateLightScheme();
        this.updateLightStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-atom-dark',
      name: 'Switch dark color scheme to Atom (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-atom-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-ayu-dark',
      name: 'Switch dark color scheme to Ayu (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-ayu-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-catppuccin-dark',
      name: 'Switch dark color scheme to Catppuccin (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-catppuccin-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-dracula-dark',
      name: 'Switch dark color scheme to Dracula (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-dracula-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-default-dark',
      name: 'Switch dark color scheme to default (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-default-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-gruvbox-dark',
      name: 'Switch dark color scheme to Gruvbox (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-gruvbox-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-eink-dark',
      name: 'Switch dark color scheme to E-ink (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-eink-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-macos-dark',
      name: 'Switch dark color scheme to macOS (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-macos-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-nord-dark',
      name: 'Switch dark color scheme to Nord (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-nord-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-notion-dark',
      name: 'Switch dark color scheme to Notion (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-notion-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-rose-pine-dark',
      name: 'Switch dark color scheme to Rosé Pine (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-rose-pine-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-solarized-dark',
      name: 'Switch dark color scheme to Solarized (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-solarized-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-things-dark',
      name: 'Switch dark color scheme to Things (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-things-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-dev-block-width',
      name: 'Dev — Show block widths',
      callback: () => {
        this.settings.devBlockWidth = !this.settings.devBlockWidth;
        this.saveData(this.settings);
        this.refresh();
      }
    });

    this.refresh()
  }

  onunload() {
    console.log('Unloading Minimal Theme Settings plugin');
  }

  async loadSettings() {
    this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  // refresh function for when we change settings
  refresh() {
    // re-load the style
    this.updateStyle()
  }

  // add the styling elements we need
  addStyle() {
    // add a css block for our settings-dependent styles
    const css = document.createElement('style');
    css.id = 'minimal-theme';
    document.getElementsByTagName("head")[0].appendChild(css);

    // add the main class
    document.body.classList.add('minimal-theme');

    // update the style with the settings-dependent styles
    this.updateStyle();
  }

  setFontSize() {
    // @ts-ignore
    this.app.vault.setConfig('baseFontSize', this.settings.textNormal);
    // @ts-ignore
    this.app.updateFontSize();
  }

  // update the styles (at the start, or as the result of a settings change)
  updateStyle() {
    this.removeStyle();

    document.body.addClass(this.settings.darkScheme);
    document.body.addClass(this.settings.lightScheme);

    document.body.classList.toggle('borders-none', !this.settings.bordersToggle);
    document.body.classList.toggle('colorful-headings', this.settings.colorfulHeadings);
    document.body.classList.toggle('colorful-frame', this.settings.colorfulFrame);
    document.body.classList.toggle('colorful-active', this.settings.colorfulActiveStates);
    document.body.classList.toggle('minimal-focus-mode', this.settings.focusMode);
    document.body.classList.toggle('links-int-on', this.settings.underlineInternal);
    document.body.classList.toggle('links-ext-on', this.settings.underlineExternal);
    document.body.classList.toggle('system-shade', this.settings.useSystemTheme);
    document.body.classList.toggle('full-width-media', this.settings.fullWidthMedia);
    document.body.classList.toggle('img-grid', this.settings.imgGrid);
    document.body.classList.toggle('minimal-dev-block-width', this.settings.devBlockWidth);
    document.body.classList.toggle('minimal-status-off', !this.settings.minimalStatus);
    document.body.classList.toggle('full-file-names', !this.settings.trimNames);
    document.body.classList.toggle('labeled-nav', this.settings.labeledNav);
    document.body.classList.toggle('minimal-folding', this.settings.folding);

    document.body.removeClass('table-wide','table-max','table-100','table-default-width',
      'iframe-wide','iframe-max','iframe-100','iframe-default-width',
      'img-wide','img-max','img-100','img-default-width',
      'chart-wide','chart-max','chart-100','chart-default-width',
      'map-wide','map-max','map-100','map-default-width');
    document.body.addClass(this.settings.chartWidth);
    document.body.addClass(this.settings.tableWidth);
    document.body.addClass(this.settings.imgWidth);
    document.body.addClass(this.settings.iframeWidth);
    document.body.addClass(this.settings.mapWidth);

    // get the custom css element
    const el = document.getElementById('minimal-theme');
    if (!el) throw "minimal-theme element not found!";
    else {
      // set the settings-dependent css
      el.innerText = 
        'body.minimal-theme{'
        + '--font-ui-small:' + this.settings.textSmall + 'px;'
        + '--line-height:' + this.settings.lineHeight + ';'
        + '--line-width:' + this.settings.lineWidth + 'rem;'
        + '--line-width-wide:' + this.settings.lineWidthWide + 'rem;'
        + '--max-width:' + this.settings.maxWidth + '%;'
        + '--font-editor-override:' + this.settings.editorFont + ';';
    }

  }

  refreshSystemTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    if (isDarkMode && this.settings.useSystemTheme) {
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else if (this.settings.useSystemTheme) {
        console.log('Light mode active');
        this.updateLightStyle()
      }
  }

  updateDarkStyle() {
    document.body.removeClass(
      'theme-light',
      'minimal-dark',
      'minimal-dark-tonal',
      'minimal-dark-black'
    );
    document.body.addClass(this.settings.darkStyle);

    // @ts-ignore
    this.app.setTheme('obsidian');
    // @ts-ignore
    this.app.vault.setConfig('theme', 'obsidian');
    this.app.workspace.trigger('css-change');
  }

  updateLightStyle() {
    document.body.removeClass(
      'theme-dark',
      'minimal-light',
      'minimal-light-tonal',
      'minimal-light-contrast',
      'minimal-light-white'
    );
    document.body.addClass(this.settings.lightStyle);

    // @ts-ignore
    this.app.setTheme('moonstone');
    // @ts-ignore
    this.app.vault.setConfig('theme', 'moonstone');
    this.app.workspace.trigger('css-change');
  }

  updateDarkScheme() {
    document.body.removeClass(
      'minimal-atom-dark',
      'minimal-ayu-dark',
      'minimal-catppuccin-dark',
      'minimal-default-dark',
      'minimal-dracula-dark',
      'minimal-eink-dark',
      'minimal-everforest-dark',
      'minimal-gruvbox-dark',
      'minimal-macos-dark',
      'minimal-nord-dark',
      'minimal-notion-dark',
      'minimal-rose-pine-dark',
      'minimal-solarized-dark',
      'minimal-things-dark'
    );
    document.body.addClass(this.settings.darkScheme);
  }

  updateLightScheme() {
    document.body.removeClass(
      'minimal-atom-light',
      'minimal-ayu-light',
      'minimal-catppuccin-light',
      'minimal-default-light',
      'minimal-eink-light',
      'minimal-everforest-light',
      'minimal-gruvbox-light',
      'minimal-macos-light',
      'minimal-nord-light',
      'minimal-notion-light',
      'minimal-rose-pine-light',
      'minimal-solarized-light',
      'minimal-things-light'
    );
    document.body.addClass(this.settings.lightScheme);
  }

  updateTheme() {
    // @ts-ignore
    this.app.setTheme(this.settings.theme);
    // @ts-ignore
    this.app.vault.setConfig('theme', this.settings.theme);
    this.app.workspace.trigger('css-change');
  }

  removeStyle() {
    document.body.removeClass('minimal-light','minimal-light-tonal','minimal-light-contrast','minimal-light-white','minimal-dark','minimal-dark-tonal','minimal-dark-black');
    document.body.addClass(this.settings.lightStyle,this.settings.darkStyle);
  }

}

interface MinimalSettings {
  theme: string;
  lightStyle: string;
  darkStyle: string;
  lightScheme: string;
  darkScheme: string;
  editorFont: string;
  colorfulHeadings: boolean;
  colorfulFrame: boolean;
  colorfulActiveStates: boolean,
  trimNames: boolean;
  labeledNav: boolean;
  bordersToggle: boolean;
  focusMode: boolean;
  lineHeight: number;
  lineWidth: number;
  lineWidthWide: number;
  maxWidth: number;
  imgGrid: boolean;
  devBlockWidth: boolean;
  tableWidth: string;
  iframeWidth: string;
  imgWidth: string;
  chartWidth: string;
  mapWidth: string;
  fullWidthMedia: boolean,
  minimalStatus: boolean,
  textNormal: number;
  textSmall: number;
  underlineInternal: boolean;
  underlineExternal: boolean;
  useSystemTheme: boolean;
  folding: boolean;
  lineNumbers: boolean;
  readableLineLength: boolean;
}

const DEFAULT_SETTINGS: MinimalSettings = {
  theme: 'moonstone',
  lightStyle: 'minimal-light',
  darkStyle: 'minimal-dark',
  lightScheme: 'minimal-default-light',
  darkScheme: 'minimal-default-dark',
  editorFont: '',
  lineHeight: 1.5,
  lineWidth: 40,
  lineWidthWide: 50,
  maxWidth: 88,
  textNormal: 16,
  textSmall: 13,
  imgGrid: false,
  imgWidth: 'img-default-width',
  tableWidth: 'table-default-width',
  iframeWidth: 'iframe-default-width',
  mapWidth: 'map-default-width',
  chartWidth: 'chart-default-width',
  colorfulHeadings: false,
  colorfulFrame: false,
  colorfulActiveStates: false,
  trimNames: true,
  labeledNav: false,
  fullWidthMedia: true,
  bordersToggle: true,
  minimalStatus: true,
  focusMode: false,
  underlineInternal: true,
  underlineExternal: true,
  useSystemTheme: false,
  folding: true,
  lineNumbers: false,
  readableLineLength: false,
  devBlockWidth: false,
}

class MinimalSettingTab extends PluginSettingTab {


  plugin: MinimalTheme;
  constructor(app: App, plugin: MinimalTheme) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let {containerEl} = this;

    containerEl.empty();

    const mainDesc = containerEl.createEl('p');

      mainDesc.appendText('For help ');
      mainDesc.appendChild(
        createEl('a', {
          text: "see documentation",
          href: "https://minimal.guide",
        })
      );
      mainDesc.appendText(' or join ');
      mainDesc.appendChild(
        createEl('strong', {
          text: "#minimal",
        })
      );
      mainDesc.appendText(' in the ');
      mainDesc.appendChild(
        createEl('a', {
          text: "Obsidian Discord",
          href: "https://obsidian.md/community",
        })
      );
      mainDesc.appendText(' community.');

    containerEl.createEl('br');
    containerEl.createEl('h3', {text: 'Color scheme'});

    const colorDesc = containerEl.createEl('p');

      colorDesc.appendChild(
        createEl('span', {
          text: 'To create a custom color scheme use the '
          })
        );
      colorDesc.appendChild(
        createEl('a', {
          text: "Style Settings",
          href: "obsidian://show-plugin?id=obsidian-style-settings",
        })
      );
      colorDesc.appendText(' plugin.');

      new Setting(containerEl)
        .setName('Light mode color scheme')
        .setDesc('Preset color options for light mode.')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-default-light','Default')
          .addOption('minimal-atom-light','Atom')
          .addOption('minimal-ayu-light','Ayu')
          .addOption('minimal-catppuccin-light','Catppuccin')
          .addOption('minimal-eink-light','E-ink (beta)')
          .addOption('minimal-everforest-light','Everforest')
          .addOption('minimal-gruvbox-light','Gruvbox')
          .addOption('minimal-macos-light','macOS')
          .addOption('minimal-nord-light','Nord')
          .addOption('minimal-notion-light','Notion')
          .addOption('minimal-rose-pine-light','Rosé Pine')
          .addOption('minimal-solarized-light','Solarized')
          .addOption('minimal-things-light','Things')
          .setValue(this.plugin.settings.lightScheme)
        .onChange((value) => {
          this.plugin.settings.lightScheme = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.updateLightScheme();
        }));

      new Setting(containerEl)
        .setName('Light mode background contrast')
        .setDesc('Level of contrast between sidebar and main content.')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-light','Default')
          .addOption('minimal-light-white','All white')
          .addOption('minimal-light-tonal','Low contrast')
          .addOption('minimal-light-contrast','High contrast')
          .setValue(this.plugin.settings.lightStyle)
        .onChange((value) => {
          this.plugin.settings.lightStyle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.updateLightStyle();
        }));

      new Setting(containerEl)
        .setName('Dark mode color scheme')
        .setDesc('Preset colors options for dark mode.')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-default-dark','Default')
          .addOption('minimal-atom-dark','Atom')
          .addOption('minimal-ayu-dark','Ayu')
          .addOption('minimal-catppuccin-dark','Catppuccin')
          .addOption('minimal-dracula-dark','Dracula')
          .addOption('minimal-eink-dark','E-ink (beta)')
          .addOption('minimal-everforest-dark','Everforest')
          .addOption('minimal-gruvbox-dark','Gruvbox')
          .addOption('minimal-macos-dark','macOS')
          .addOption('minimal-nord-dark','Nord')
          .addOption('minimal-notion-dark','Notion')
          .addOption('minimal-rose-pine-dark','Rosé Pine')
          .addOption('minimal-solarized-dark','Solarized')
          .addOption('minimal-things-dark','Things')
          .setValue(this.plugin.settings.darkScheme)
          .onChange((value) => {
            this.plugin.settings.darkScheme = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.updateDarkScheme();
          }));

      new Setting(containerEl)
        .setName('Dark mode background contrast')
        .setDesc('Level of contrast between sidebar and main content.')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-dark','Default')
          .addOption('minimal-dark-tonal','Low contrast')
          .addOption('minimal-dark-black','True black')
          .setValue(this.plugin.settings.darkStyle)
          .onChange((value) => {
            this.plugin.settings.darkStyle = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.updateDarkStyle();
          }));

    containerEl.createEl('br');
    containerEl.createEl('h3');
    containerEl.createEl('h3', {text: 'Features'});

    new Setting(containerEl)
      .setName('Match system setting for light or dark mode')
      .setDesc('Automatically switch based on your OS setting.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.useSystemTheme)
          .onChange((value) => {
            this.plugin.settings.useSystemTheme = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refreshSystemTheme();
            })
          );

    new Setting(containerEl)
      .setName('Text labels for primary navigation')
      .setDesc('Navigation items in the left sidebar uses text labels.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.labeledNav)
          .onChange((value) => {
            this.plugin.settings.labeledNav = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Colorful window frame')
      .setDesc('The top area of the app uses your accent color.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.colorfulFrame)
          .onChange((value) => {
            this.plugin.settings.colorfulFrame = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Colorful active states')
      .setDesc('Active file and menu items use your accent color.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.colorfulActiveStates)
          .onChange((value) => {
            this.plugin.settings.colorfulActiveStates = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Colorful headings')
      .setDesc('Headings use a different color for each size.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.colorfulHeadings)
          .onChange((value) => {
            this.plugin.settings.colorfulHeadings = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Minimal status bar')
      .setDesc('Turn off to use full-width status bar.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.minimalStatus)
          .onChange((value) => {
            this.plugin.settings.minimalStatus = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Trim file names in sidebars')
      .setDesc('Use ellipses to fit file names on a single line.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.trimNames)
          .onChange((value) => {
            this.plugin.settings.trimNames = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

      new Setting(containerEl)
        .setName('Workspace borders')
        .setDesc('Display divider lines between workspace elements.')
        .addToggle(toggle => toggle.setValue(this.plugin.settings.bordersToggle)
          .onChange((value) => {
            this.plugin.settings.bordersToggle = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Focus mode')
      .setDesc('Hide tab bar and status bar, hover to display. Can be toggled via hotkey.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.focusMode)
          .onChange((value) => {
            this.plugin.settings.focusMode = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Underline internal links')
      .setDesc('Show underlines on internal links.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.underlineInternal)
          .onChange((value) => {
            this.plugin.settings.underlineInternal = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Underline external links')
      .setDesc('Show underlines on external links.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.underlineExternal)
          .onChange((value) => {
            this.plugin.settings.underlineExternal = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Maximize media')
      .setDesc('Images and videos fill the width of the line.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.fullWidthMedia)
          .onChange((value) => {
            this.plugin.settings.fullWidthMedia = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    containerEl.createEl('br');
    containerEl.createEl('h3');
    containerEl.createEl('h3', {text: 'Layout'});

    const layoutDesc = containerEl.createEl('p');

      layoutDesc.appendChild(
        createEl('span', {
          text: 'These options can also be defined on a per-file basis, '
          })
        );
      layoutDesc.appendChild(
        createEl('a', {
          text: "see documentation",
          href: "https://minimal.guide/Features/Block+width",
        })
      );
      layoutDesc.appendText(' for details.');

    new Setting(containerEl)
      .setName('Image grids')
      .setDesc('Turn consecutive images into columns — to make a new row, add an extra line break between images.')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.imgGrid)
          .onChange((value) => {
            this.plugin.settings.imgGrid = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Chart width')
      .setDesc('Default width for chart blocks.')
      .addDropdown(dropdown => dropdown
        .addOption('chart-default-width','Default')
        .addOption('chart-wide','Wide line width')
        .addOption('chart-max','Maximum line width')
        .addOption('chart-100','100% pane width')
        .setValue(this.plugin.settings.chartWidth)
          .onChange((value) => {
            this.plugin.settings.chartWidth = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })
        );

    new Setting(containerEl)
      .setName('Iframe width')
      .setDesc('Default width for iframe blocks.')
      .addDropdown(dropdown => dropdown
        .addOption('iframe-default-width','Default')
        .addOption('iframe-wide','Wide line width')
        .addOption('iframe-max','Maximum line width')
        .addOption('iframe-100','100% pane width')
        .setValue(this.plugin.settings.iframeWidth)
          .onChange((value) => {
            this.plugin.settings.iframeWidth = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })
        );

    new Setting(containerEl)
      .setName('Image width')
      .setDesc('Default width for image blocks.')
      .addDropdown(dropdown => dropdown
        .addOption('img-default-width','Default')
        .addOption('img-wide','Wide line width')
        .addOption('img-max','Maximum line width')
        .addOption('img-100','100% pane width')
        .setValue(this.plugin.settings.imgWidth)
          .onChange((value) => {
            this.plugin.settings.imgWidth = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })
        );

    new Setting(containerEl)
      .setName('Map width')
      .setDesc('Default width for map blocks.')
      .addDropdown(dropdown => dropdown
        .addOption('map-default-width','Default')
        .addOption('map-wide','Wide line width')
        .addOption('map-max','Maximum line width')
        .addOption('map-100','100% pane width')
        .setValue(this.plugin.settings.mapWidth)
          .onChange((value) => {
            this.plugin.settings.mapWidth = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })
        );

    new Setting(containerEl)
      .setName('Table width')
      .setDesc('Default width for table and Dataview blocks.')
      .addDropdown(dropdown => dropdown
        .addOption('table-default-width','Default')
        .addOption('table-wide','Wide line width')
        .addOption('table-max','Maximum line width')
        .addOption('table-100','100% pane width')
        .setValue(this.plugin.settings.tableWidth)
          .onChange((value) => {
            this.plugin.settings.tableWidth = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          })
        );

    containerEl.createEl('br');
    containerEl.createEl('h3');
    containerEl.createEl('h3', {text: 'Typography'});

    new Setting(containerEl)
      .setName('Text font size')
      .setDesc('Used for the main text (default 16).')
      .addText(text => text.setPlaceholder('16')
        .setValue((this.plugin.settings.textNormal || '') + '')
        .onChange((value) => {
          this.plugin.settings.textNormal = parseFloat(value);
          this.plugin.saveData(this.plugin.settings);
          this.plugin.setFontSize();
        }));

    new Setting(containerEl)
      .setName('Small font size')
      .setDesc('Used for text in the sidebars and tabs (default 13).')
      .addText(text => text.setPlaceholder('13')
        .setValue((this.plugin.settings.textSmall || '') + '')
        .onChange((value) => {
          this.plugin.settings.textSmall = parseFloat(value);
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Line height')
      .setDesc('Line height of text (default 1.5).')
      .addText(text => text.setPlaceholder('1.5')
        .setValue((this.plugin.settings.lineHeight || '') + '')
        .onChange((value) => {
          this.plugin.settings.lineHeight = parseFloat(value);
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Normal line width')
      .setDesc('Number of characters per line (default 40).')
      .addText(text => text.setPlaceholder('40')
        .setValue((this.plugin.settings.lineWidth || '') + '')
        .onChange((value) => {
          this.plugin.settings.lineWidth = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Wide line width')
      .setDesc('Number of characters per line for wide elements (default 50).')
      .addText(text => text.setPlaceholder('50')
        .setValue((this.plugin.settings.lineWidthWide || '') + '')
        .onChange((value) => {
          this.plugin.settings.lineWidthWide = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Maximum line width %')
      .setDesc('Percentage of space inside a pane that a line can fill (default 88).')
      .addText(text => text.setPlaceholder('88')
        .setValue((this.plugin.settings.maxWidth || '') + '')
        .onChange((value) => {
          this.plugin.settings.maxWidth = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));
    new Setting(containerEl)
      .setName('Editor font')
      .setDesc('Overrides the text font defined in Obsidian Appearance settings when in edit mode.')
      .addText(text => text.setPlaceholder('')
        .setValue((this.plugin.settings.editorFont || '') + '')
        .onChange((value) => {
          this.plugin.settings.editorFont = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

  }
}
