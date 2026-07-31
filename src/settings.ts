import { App, PluginSettingTab, Setting, SettingDefinition, SettingDefinitionItem, SliderComponent } from 'obsidian';
import MinimalTheme from "./main";

type NumericSettingKey = 'textSmall' | 'lineHeight' | 'lineWidth' | 'lineWidthWide' | 'maxWidth';

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
}

export class MinimalSettingsTab extends PluginSettingTab {
  plugin: MinimalTheme;

  constructor(app: App, plugin: MinimalTheme) {
    super(app, plugin);
    this.plugin = plugin;
  }

  getSettingDefinitions(): SettingDefinitionItem[] {
    return [
      {
        name: 'Help',
        desc: 'Learn how to use Minimal and read the documentation.',
        render: (setting: Setting) => {
          setting.addButton(button => button
            .setButtonText('Open')
            .onClick(() => window.open('https://minimal.guide')));
        },
      },
      {
        name: 'More options',
        render: (setting: Setting) => {
          const id = 'obsidian-style-settings';
          // Internal APIs not exposed in the public typings.
          const app = this.app as App & {
            plugins: {
              manifests: Record<string, unknown>;
              plugins: Record<string, unknown>;
              enablePlugin(id: string): Promise<void>;
            };
            setting: { open(): void; openTabById(id: string): void };
          };
          const installed = id in app.plugins.manifests;
          const enabled = id in app.plugins.plugins;

          const openSettings = () => {
            app.setting.open();
            app.setting.openTabById(id);
          };

          setting.setDesc('Use the Style Settings plugin to fully customize Minimal.');
          if (enabled) {
            setting.addButton(button => button
              .setButtonText('Open')
              .onClick(openSettings));
          } else if (installed) {
            setting.addButton(button => button
              .setButtonText('Enable')
              .onClick(async () => {
                await app.plugins.enablePlugin(id);
                this.update();
              }));
          } else {
            setting.addButton(button => button
              .setButtonText('Install')
              .onClick(() => window.open(`obsidian://show-plugin?id=${id}`)));
          }
        },
      },
      {
        type: 'group',
        heading: 'Color scheme',
        items: [
          {
            name: 'Light mode color scheme',
            desc: 'Preset color options for light mode.',
            control: {
              type: 'dropdown',
              key: 'lightScheme',
              options: {
                'minimal-default-light': 'Default',
                'minimal-atom-light': 'Atom',
                'minimal-ayu-light': 'Ayu',
                'minimal-catppuccin-light': 'Catppuccin',
                'minimal-eink-light': 'E-ink (beta)',
                'minimal-everforest-light': 'Everforest',
                'minimal-flexoki-light': 'Flexoki',
                'minimal-gruvbox-light': 'Gruvbox',
                'minimal-macos-light': 'macOS',
                'minimal-nord-light': 'Nord',
                'minimal-rose-pine-light': 'Rosé Pine',
                'minimal-notion-light': 'Sky',
                'minimal-solarized-light': 'Solarized',
                'minimal-things-light': 'Things',
              },
            },
          },
          {
            name: 'Light mode background contrast',
            desc: 'Contrast between sidebar and main content.',
            control: {
              type: 'dropdown',
              key: 'lightStyle',
              options: {
                'minimal-light': 'Default',
                'minimal-light-white': 'All white',
                'minimal-light-tonal': 'Low contrast',
                'minimal-light-contrast': 'High contrast',
              },
            },
          },
          {
            name: 'Dark mode color scheme',
            desc: 'Preset colors options for dark mode.',
            control: {
              type: 'dropdown',
              key: 'darkScheme',
              options: {
                'minimal-default-dark': 'Default',
                'minimal-atom-dark': 'Atom',
                'minimal-ayu-dark': 'Ayu',
                'minimal-catppuccin-dark': 'Catppuccin',
                'minimal-dracula-dark': 'Dracula',
                'minimal-eink-dark': 'E-ink (beta)',
                'minimal-everforest-dark': 'Everforest',
                'minimal-flexoki-dark': 'Flexoki',
                'minimal-gruvbox-dark': 'Gruvbox',
                'minimal-macos-dark': 'macOS',
                'minimal-nord-dark': 'Nord',
                'minimal-rose-pine-dark': 'Rosé Pine',
                'minimal-notion-dark': 'Sky',
                'minimal-solarized-dark': 'Solarized',
                'minimal-things-dark': 'Things',
              },
            },
          },
          {
            name: 'Dark mode background contrast',
            desc: 'Contrast between sidebar and main content.',
            control: {
              type: 'dropdown',
              key: 'darkStyle',
              options: {
                'minimal-dark': 'Default',
                'minimal-dark-tonal': 'Low contrast',
                'minimal-dark-black': 'True black',
              },
            },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Features',
        items: [
          {
            name: 'Text labels for primary navigation',
            desc: 'Navigation items in the left sidebar uses text labels.',
            control: { type: 'toggle', key: 'labeledNav' },
          },
          {
            name: 'Colorful window frame',
            desc: 'The top area of the app uses your accent color.',
            control: { type: 'toggle', key: 'colorfulFrame' },
          },
          {
            name: 'Colorful active states',
            desc: 'Active file and menu items use your accent color.',
            control: { type: 'toggle', key: 'colorfulActiveStates' },
          },
          {
            name: 'Colorful headings',
            desc: 'Headings use a different color for each size.',
            control: { type: 'toggle', key: 'colorfulHeadings' },
          },
          {
            name: 'Minimal status bar',
            desc: 'Turn off to use full-width status bar.',
            control: { type: 'toggle', key: 'minimalStatus' },
          },
          {
            name: 'Trim file names in sidebars',
            desc: 'Use ellipses to fit file names on a single line.',
            control: { type: 'toggle', key: 'trimNames' },
          },
          {
            name: 'Workspace borders',
            desc: 'Display divider lines between workspace elements.',
            control: { type: 'toggle', key: 'bordersToggle' },
          },
          {
            name: 'Focus mode',
            desc: 'Hide tab bar and status bar, hover to display. Can be toggled via hotkey.',
            control: { type: 'toggle', key: 'focusMode' },
          },
          {
            name: 'Underline internal links',
            desc: 'Show underlines on internal links.',
            control: { type: 'toggle', key: 'underlineInternal' },
          },
          {
            name: 'Underline external links',
            desc: 'Show underlines on external links.',
            control: { type: 'toggle', key: 'underlineExternal' },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Media',
        items: [
          {
            name: 'Image grids',
            desc: 'Turn consecutive images into columns. To make a new row, add a line break between images.',
            control: { type: 'toggle', key: 'imgGrid' },
          },
          {
            name: 'Maximize media',
            desc: 'Images and videos fill the width of the line.',
            control: { type: 'toggle', key: 'fullWidthMedia' },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Layout',
        items: [
          {
            name: 'Table width',
            desc: 'Default width for tables.',
            control: {
              type: 'dropdown',
              key: 'tableWidth',
              options: {
                'table-default-width': 'Default',
                'table-wide': 'Wide line width',
                'table-max': 'Maximum line width',
                'table-100': '100% pane width',
              },
            },
          },
          {
            name: 'Image width',
            desc: 'Default width for image blocks.',
            control: {
              type: 'dropdown',
              key: 'imgWidth',
              options: {
                'img-default-width': 'Default',
                'img-wide': 'Wide line width',
                'img-max': 'Maximum line width',
                'img-100': '100% pane width',
              },
            },
          },
          {
            name: 'Iframe width',
            desc: 'Default width for iframe blocks.',
            control: {
              type: 'dropdown',
              key: 'iframeWidth',
              options: {
                'iframe-default-width': 'Default',
                'iframe-wide': 'Wide line width',
                'iframe-max': 'Maximum line width',
                'iframe-100': '100% pane width',
              },
            },
          },
          {
            name: 'Map width',
            desc: 'Default width for map blocks.',
            control: {
              type: 'dropdown',
              key: 'mapWidth',
              options: {
                'map-default-width': 'Default',
                'map-wide': 'Wide line width',
                'map-max': 'Maximum line width',
                'map-100': '100% pane width',
              },
            },
          },
          {
            name: 'Chart width',
            desc: 'Default width for chart blocks.',
            control: {
              type: 'dropdown',
              key: 'chartWidth',
              options: {
                'chart-default-width': 'Default',
                'chart-wide': 'Wide line width',
                'chart-max': 'Maximum line width',
                'chart-100': '100% pane width',
              },
            },
          },
        ],
      },
      {
        type: 'group',
        heading: 'Typography',
        items: [
          this.sliderSetting(
            'Small font size',
            'Text in sidebars and tabs.',
            'textSmall',
            { min: 9, max: 20, step: 1 },
            () => this.plugin.refresh(),
          ),
          this.sliderSetting(
            'Line height',
            'Line height of text.',
            'lineHeight',
            { min: 1.1, max: 2, step: 0.1 },
            () => this.plugin.refresh(),
            value => String(value),
          ),
          this.sliderSetting(
            'Normal line width',
            'Number of characters per line.',
            'lineWidth',
            { min: 20, max: 100, step: 1 },
            () => this.plugin.refresh(),
          ),
          this.sliderSetting(
            'Wide line width',
            'Number of characters per line for wide elements.',
            'lineWidthWide',
            { min: 20, max: 100, step: 1 },
            () => this.plugin.refresh(),
          ),
          this.sliderSetting(
            'Maximum line width',
            'Percentage of space inside a pane that a line can fill.',
            'maxWidth',
            { min: 70, max: 96, step: 1 },
            () => this.plugin.refresh(),
            value => `${value}%`,
          ),
          {
            name: 'Editor font',
            desc: 'Overrides the text font defined in Obsidian appearance settings when in edit mode.',
            control: { type: 'text', key: 'editorFont', placeholder: '' },
          },
        ],
      },
    ];
  }

  // Slider row with an inline "Restore default" button, matching Obsidian's
  // appearance settings. Rendered imperatively because the declarative control
  // API has no per-row extra-button affordance.
  private sliderSetting(
    name: string,
    desc: string,
    key: NumericSettingKey,
    limits: { min: number; max: number; step: number },
    sideEffect: () => void,
    displayFormat?: (value: number) => string,
  ): SettingDefinition {
    return {
      name,
      desc,
      render: (setting: Setting) => {
        let slider!: SliderComponent;
        // Extra button is added before the slider so the reset control renders
        // to its left, matching Obsidian's appearance settings.
        setting.addExtraButton(button => button
          .setIcon('rotate-ccw')
          .setTooltip('Restore default')
          .onClick(async () => {
            const value = DEFAULT_SETTINGS[key];
            this.plugin.settings[key] = value;
            slider.setValue(value);
            await this.plugin.saveData(this.plugin.settings);
            sideEffect();
          }));
        setting.addSlider(component => {
          slider = component
            .setLimits(limits.min, limits.max, limits.step)
            .setValue(this.plugin.settings[key]);
          if (displayFormat) slider.setDisplayFormat(displayFormat);
          slider
            .onChange(async (value) => {
              this.plugin.settings[key] = value;
              await this.plugin.saveData(this.plugin.settings);
              sideEffect();
            });
        });
      },
    };
  }

  async setControlValue(key: string, value: unknown): Promise<void> {
    await super.setControlValue(key, value);

    // Trigger the side effect each setting previously ran in its onChange.
    switch (key) {
      case 'lightScheme':
        this.plugin.updateLightScheme();
        break;
      case 'lightStyle':
        this.plugin.updateLightStyle();
        break;
      case 'darkScheme':
        this.plugin.updateDarkScheme();
        break;
      case 'darkStyle':
        this.plugin.updateDarkStyle();
        break;
      default:
        this.plugin.refresh();
        break;
    }
  }
}
