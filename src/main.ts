import { App, Workspace, Plugin } from 'obsidian';
import { MinimalSettings, MinimalSettingsTab, DEFAULT_SETTINGS } from './settings';

export default class MinimalTheme extends Plugin {

  settings: MinimalSettings;

  async onload() {

    await this.loadSettings();
    this.addSettingTab(new MinimalSettingsTab(this.app, this));
    this.loadRules();

    // Check state of Obsidian Settings
    let settingsUpdate = () => {
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

      // Save the updated settings once
      this.saveData(this.settings);
    };
  
    let sidebarUpdate = () => {
      const sidebarEl = document.getElementsByClassName('mod-left-split')[0];
      const ribbonEl = document.getElementsByClassName('side-dock-ribbon')[0];
      if (sidebarEl && ribbonEl && document.body.classList.contains('theme-light') && this.settings.lightStyle == 'minimal-light-contrast') {
        sidebarEl.addClass('theme-dark');
        ribbonEl.addClass('theme-dark');
      } else if (sidebarEl && ribbonEl) {
        sidebarEl.removeClass('theme-dark'); 
        ribbonEl.removeClass('theme-dark');
      }
    }

    // @ts-ignore
    this.registerEvent(app.vault.on('config-changed', settingsUpdate));
    // @ts-ignore
    this.registerEvent(app.workspace.on('css-change', sidebarUpdate));

    settingsUpdate();
    
    // @ts-ignore
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
      id: 'toggle-minimal-flexoki-light',
      name: 'Switch light color scheme to Flexoki (light)',
      callback: () => {
        this.settings.lightScheme = 'minimal-flexoki-light';
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
      name: 'Switch light color scheme to Sky (light)',
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
      id: 'toggle-minimal-everforest-dark',
      name: 'Switch dark color scheme to Everforest (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-everforest-dark';
        this.saveData(this.settings);
        this.updateDarkScheme();
        this.updateDarkStyle();
      }
    });

    this.addCommand({
      id: 'toggle-minimal-flexoki-dark',
      name: 'Switch dark color scheme to Flexoki (dark)',
      callback: () => {
        this.settings.darkScheme = 'minimal-flexoki-dark';
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
      name: 'Switch dark color scheme to Sky (dark)',
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
    const sidebarEl = document.getElementsByClassName('mod-left-split')[0];
    if (sidebarEl) {
      sidebarEl.removeClass('theme-dark');
    }
    const ribbonEl = document.getElementsByClassName('side-dock-ribbon')[0];
    if (ribbonEl) {
      ribbonEl.removeClass('theme-dark');
    }

    this.unloadRules();
    this.removeStyle();
    this.removeSettings();
    this.removeLightScheme();
    this.removeDarkScheme();
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
  loadRules() {
    // add a css block for our settings-dependent styles
    const css = document.createElement('style');
    css.id = 'minimal-theme';
    document.getElementsByTagName("head")[0].appendChild(css);

    // add the main class
    document.body.classList.add('minimal-theme');

    // update the style with the settings-dependent styles
    this.updateStyle();
  }
  unloadRules() {
    const styleElement = document.getElementById('minimal-theme');
    if (styleElement) {
      styleElement.parentNode.removeChild(styleElement);
    }
    document.body.classList.remove('minimal-theme');
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
    this.removeSettings();

    document.body.addClass(
      this.settings.lightStyle,
      this.settings.lightScheme,
      this.settings.darkStyle,
      this.settings.darkScheme
    );

    document.body.classList.toggle('borders-none', !this.settings.bordersToggle);
    document.body.classList.toggle('colorful-headings', this.settings.colorfulHeadings);
    document.body.classList.toggle('colorful-frame', this.settings.colorfulFrame);
    document.body.classList.toggle('colorful-active', this.settings.colorfulActiveStates);
    document.body.classList.toggle('minimal-focus-mode', this.settings.focusMode);
    document.body.classList.toggle('links-int-on', this.settings.underlineInternal);
    document.body.classList.toggle('links-ext-on', this.settings.underlineExternal);
    document.body.classList.toggle('full-width-media', this.settings.fullWidthMedia);
    document.body.classList.toggle('img-grid', this.settings.imgGrid);
    document.body.classList.toggle('minimal-dev-block-width', this.settings.devBlockWidth);
    document.body.classList.toggle('minimal-status-off', !this.settings.minimalStatus);
    document.body.classList.toggle('full-file-names', !this.settings.trimNames);
    document.body.classList.toggle('labeled-nav', this.settings.labeledNav);
    document.body.classList.toggle('minimal-folding', this.settings.folding);

    document.body.addClass(
      this.settings.chartWidth,
      this.settings.tableWidth,
      this.settings.imgWidth,
      this.settings.iframeWidth,
      this.settings.mapWidth
    );

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

  updateDarkStyle() {
    document.body.removeClass(
      'theme-light',
      'minimal-dark',
      'minimal-dark-tonal',
      'minimal-dark-black'
    );
    document.body.addClass(
      'theme-dark',
      this.settings.darkStyle
    );
    // @ts-ignore
    if (this.app.vault.getConfig('theme') !== 'system') {
      // @ts-ignore
      this.app.setTheme('obsidian');
      // @ts-ignore
      this.app.vault.setConfig('theme', 'obsidian');
    }
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
    document.body.addClass(
      'theme-light',
      this.settings.lightStyle
    );
    // @ts-ignore
    if (this.app.vault.getConfig('theme') !== 'system') {
      // @ts-ignore
      this.app.setTheme('moonstone');
      // @ts-ignore
      this.app.vault.setConfig('theme', 'moonstone');
    }
    this.app.workspace.trigger('css-change');
  }

  updateDarkScheme() {
    this.removeDarkScheme();
    document.body.addClass(this.settings.darkScheme);
  }

  updateLightScheme() {
    this.removeLightScheme();
    document.body.addClass(this.settings.lightScheme);
  }

  updateTheme() {
    // @ts-ignore
    if (this.app.vault.getConfig('theme') === 'system') {
        if (document.body.classList.contains('theme-light')) {
          document.body.removeClass('theme-light');
          document.body.addClass('theme-dark');
        } else {
          document.body.removeClass('theme-dark');
          document.body.addClass('theme-light');
        }
    } else {
        if (document.body.classList.contains('theme-light')) {
          document.body.removeClass('theme-light');
          document.body.addClass('theme-dark');
        } else {
          document.body.removeClass('theme-dark');
          document.body.addClass('theme-light');
        }

      // @ts-ignore
      const currentTheme = this.app.vault.getConfig('theme');
      const newTheme = currentTheme === 'moonstone' ? 'obsidian' : 'moonstone';

      // @ts-ignore
      this.app.setTheme(newTheme);
      // @ts-ignore
      this.app.vault.setConfig('theme', newTheme);
    }
    this.app.workspace.trigger('css-change');
  }

  removeSettings() {
    document.body.removeClass(
      'borders-none',
      'colorful-headings',
      'colorful-frame',
      'colorful-active',
      'minimal-focus-mode',
      'links-int-on',
      'links-ext-on',
      'full-width-media',
      'img-grid',
      'minimal-dev-block-width',
      'minimal-status-off',
      'full-file-names',
      'labeled-nav',
      'minimal-folding'
    );
    document.body.removeClass(
      'table-wide',
      'table-max',
      'table-100',
      'table-default-width',
      'iframe-wide',
      'iframe-max',
      'iframe-100',
      'iframe-default-width',
      'img-wide',
      'img-max',
      'img-100',
      'img-default-width',
      'chart-wide',
      'chart-max',
      'chart-100',
      'chart-default-width',
      'map-wide',
      'map-max',
      'map-100',
      'map-default-width'
      );
  }
  removeStyle() {
    document.body.removeClass(
      'minimal-light',
      'minimal-light-tonal',
      'minimal-light-contrast',
      'minimal-light-white',
      'minimal-dark',
      'minimal-dark-tonal',
      'minimal-dark-black');
  }
  removeDarkScheme() {
    document.body.removeClass(
      'minimal-atom-dark',
      'minimal-ayu-dark',
      'minimal-catppuccin-dark',
      'minimal-default-dark',
      'minimal-dracula-dark',
      'minimal-eink-dark',
      'minimal-everforest-dark',
      'minimal-flexoki-dark',
      'minimal-gruvbox-dark',
      'minimal-macos-dark',
      'minimal-nord-dark',
      'minimal-notion-dark',
      'minimal-rose-pine-dark',
      'minimal-solarized-dark',
      'minimal-things-dark'
    );
  }
  removeLightScheme() {
    document.body.removeClass(
      'minimal-atom-light',
      'minimal-ayu-light',
      'minimal-catppuccin-light',
      'minimal-default-light',
      'minimal-eink-light',
      'minimal-everforest-light',
      'minimal-flexoki-light',
      'minimal-gruvbox-light',
      'minimal-macos-light',
      'minimal-nord-light',
      'minimal-notion-light',
      'minimal-rose-pine-light',
      'minimal-solarized-light',
      'minimal-things-light'
    );
  }

}
