import { PluginSettingTab, Setting } from 'obsidian';

export interface MinimalSettings {
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
  folding: boolean;
  lineNumbers: boolean;
  readableLineLength: boolean;
}

export const DEFAULT_SETTINGS: MinimalSettings = {
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
  folding: true,
  lineNumbers: false,
  readableLineLength: false,
  devBlockWidth: false,
}

export class MinimalSettingsTab extends PluginSettingTab {


  plugin: MinimalTheme;
  constructor(app: App, plugin: MinimalTheme) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let {containerEl} = this;

    containerEl.empty();

    const colorSection = containerEl.createEl('div', {cls: 'setting-item setting-item-heading'});

    const colorSectionInfo =  colorSection.createEl('div', {cls: 'setting-item-info'});

    colorSectionInfo.createEl('div', {text: 'Color scheme', cls: 'setting-item-name'});

    const colorDesc = colorSectionInfo.createEl('div', {cls: 'setting-item-description'});

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
      colorDesc.appendText(' plugin. See ');

      colorDesc.appendChild(
        createEl('a', {
          text: "documentation",
          href: "https://minimal.guide/features/color-schemes",
        })
      );
      colorDesc.appendText(' for details.');

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
          .addOption('minimal-flexoki-light','Flexoki')
          .addOption('minimal-gruvbox-light','Gruvbox')
          .addOption('minimal-macos-light','macOS')
          .addOption('minimal-nord-light','Nord')
          .addOption('minimal-rose-pine-light','Rosé Pine')
          .addOption('minimal-notion-light','Sky')
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
          .addOption('minimal-flexoki-dark','Flexoki')
          .addOption('minimal-gruvbox-dark','Gruvbox')
          .addOption('minimal-macos-dark','macOS')
          .addOption('minimal-nord-dark','Nord')
          .addOption('minimal-rose-pine-dark','Rosé Pine')
          .addOption('minimal-notion-dark','Sky')
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

    const featuresSection = containerEl.createEl('div', {cls: 'setting-item setting-item-heading'});

    const featuresSectionInfo =  featuresSection.createEl('div', {cls: 'setting-item-info'});

    featuresSectionInfo.createEl('div', {text: 'Features', cls: 'setting-item-name'});

    const featuresSectionDesc = featuresSectionInfo.createEl('div', {cls: 'setting-item-description'});

      featuresSectionDesc.appendChild(
        createEl('span', {
          text: 'See '
          })
        );

      featuresSectionDesc.appendChild(
        createEl('a', {
          text: "documentation",
          href: "https://minimal.guide",
        })
      );
      featuresSectionDesc.appendText(' for details.');

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

    const layoutSection = containerEl.createEl('div', {cls: 'setting-item setting-item-heading'});

    const layoutSectionInfo =  layoutSection.createEl('div', {cls: 'setting-item-info'});

    layoutSectionInfo.createEl('div', {text: 'Layout', cls: 'setting-item-name'});

    const layoutSectionDesc = layoutSectionInfo.createEl('div', {cls: 'setting-item-description'});

      layoutSectionDesc.appendChild(
        createEl('span', {
          text: 'These options can also be defined on a per-file basis, see '
          })
        );
      layoutSectionDesc.appendChild(
        createEl('a', {
          text: "documentation",
          href: "https://minimal.guide/features/block-width",
        })
      );
      layoutSectionDesc.appendText(' for details.');

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
    containerEl.createEl('div', {text: 'Typography', cls: 'setting-item setting-item-heading'});

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