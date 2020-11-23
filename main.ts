import { App, Workspace, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MinimalTheme extends Plugin {
  settings: MinimalSettings;

  async onload() {

  this.settings = await this.loadData() || new MinimalSettings();

  this.addSettingTab(new MinimalSettingTab(this.app, this));

  this.addStyle();

  // Watch for system changes to color theme 

  let media = window.matchMedia('(prefers-color-scheme: dark)');

  let callback = () => {
    if (media.matches) {
      console.log('Dark mode active');
      this.updateDarkStyle()

    } else {
      console.log('Light mode active');
      this.updateLightStyle()
    }
  }
  media.addEventListener('change', callback);

  // Remove listener when we unload

  this.register(() => media.removeEventListener('change', callback));

  const lightStyles = ['minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white'];
  const darkStyles = ['minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black'];
  const theme = ['theme-light', 'theme-dark'];

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


  this.refresh()

  if (this.settings.useSystemTheme) {
    this.enableSystemTheme();
  }

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

  // update the styles (at the start, or as the result of a settings change)
  updateStyle() {
    this.removeStyle();
    document.body.classList.toggle('borders-none', !this.settings.bordersToggle);
    document.body.classList.toggle('fancy-cursor', this.settings.fancyCursor);
    document.body.classList.toggle('focus-mode', this.settings.focusMode);
    document.body.classList.toggle('links-int-on', this.settings.underlineInternal);
    document.body.classList.toggle('links-ext-on', this.settings.underlineExternal);
    document.body.classList.toggle('system-shade', this.settings.useSystemTheme);

    // get the custom css element
    const el = document.getElementById('minimal-theme');
    if (!el) throw "minimal-theme element not found!";
    else {
      // set the settings-dependent css
      el.innerText = `
        body.minimal-theme{
          --font-normal:${this.settings.textNormal}px;
          --font-small:${this.settings.textSmall}px;
          --line-width:${this.settings.lineWidth}rem;
          --font-monospace:${this.settings.monoFont};
          --text:${this.settings.textFont};
          --text-editor:${this.settings.editorFont};
          --accent-h:${this.settings.accentHue};
          --accent-s:${this.settings.accentSat}%;}
      `;
    }
  }

  enableSystemTheme() {
    (this.app.workspace as any).layoutReady ? this.refreshSystemTheme() : this.app.workspace.on('layout-ready', this.refreshSystemTheme);
  }

  refreshSystemTheme() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

    if(isDarkMode && this.settings.useSystemTheme){
        console.log('Dark mode active');
        this.updateDarkStyle()

      } else if (this.settings.useSystemTheme) {
        console.log('Light mode active');
        this.updateLightStyle()
      }
  }

  updateDarkStyle() {
    document.body.removeClass('theme-light','minimal-dark','minimal-dark-tonal','minimal-dark-black');
    document.body.addClass('theme-dark',this.settings.darkStyle);
    this.app.workspace.trigger('css-change');
  }

  updateLightStyle() {
    document.body.removeClass('theme-dark','minimal-light','minimal-light-tonal','minimal-light-contrast','minimal-light-white');
    document.body.addClass('theme-light',this.settings.lightStyle);
    this.app.workspace.trigger('css-change');
  }

  updateTheme() {
    document.body.removeClass('theme-dark','theme-light');
    document.body.addClass(this.settings.theme);
    this.app.workspace.trigger('css-change');
  }

  removeStyle() {
    document.body.removeClass('minimal-light','minimal-light-tonal','minimal-light-contrast','minimal-light-white','minimal-dark','minimal-dark-tonal','minimal-dark-black');
    document.body.addClass(this.settings.lightStyle,this.settings.darkStyle);
  }

}

class MinimalSettings {
  theme: string = 'theme-light';
  accentHue: number = 201;
  accentSat: number = 17;
  lightStyle: string = 'minimal-light';
  darkStyle: string = 'minimal-dark';
  textFont: string = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
  editorFont: string = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
  monoFont: string = 'Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace';
  bordersToggle: boolean = true;
  fancyCursor: boolean = true;
  focusMode: boolean = true;
  lineWidth: number = 40;
  textNormal: number = 16;
  textSmall: number = 13;
  underlineInternal: boolean = true;
  underlineExternal: boolean = true;
  useSystemTheme: boolean = false;
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
    containerEl.createEl('h3', {text: 'Minimal Theme Settings'});
    containerEl.createEl('p', {text: 'If you notice any issues, update to the latest version of Minimal Theme and reload Obsidian. Download the Hider plugin for additional options to further simplify the Obsidian UI.'});
    containerEl.createEl('a', {text: '⬤ Accent color'});
    containerEl.createEl('h3');


      new Setting(containerEl)
        .setName('Accent color hue')
        .setDesc('For links and interactive elements')
        .addSlider(slider => slider
            .setLimits(0, 360, 1)
            .setValue(this.plugin.settings.accentHue)
          .onChange((value) => {
            this.plugin.settings.accentHue = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

      new Setting(containerEl)
        .setName('Accent color saturation')
        .setDesc('For links and interactive elements')
        .addSlider(slider => slider
            .setLimits(0, 100, 1)
            .setValue(this.plugin.settings.accentSat)
          .onChange((value) => {
            this.plugin.settings.accentSat = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Fancy cursor')
      .setDesc('The editor cursor takes on your accent color')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.fancyCursor)
          .onChange((value) => {
            this.plugin.settings.fancyCursor = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Use system-level setting for light or dark mode')
      .setDesc('Automatically switch based on your operating system settings')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.useSystemTheme)
          .onChange((value) => {
            this.plugin.settings.useSystemTheme = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refreshSystemTheme();
            })
          );

      new Setting(containerEl)
        .setName('Light mode style')
        .setDesc('Background colors in light mode')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-light','Default')
          .addOption('minimal-light-white','All white')
          .addOption('minimal-light-tonal','Low contrast')
          .addOption('minimal-light-contrast','High contrast')
          .setValue(this.plugin.settings.lightStyle)
        .onChange((value) => {
          this.plugin.settings.lightStyle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.removeStyle();
        }));

      new Setting(containerEl)
        .setName('Dark mode style')
        .setDesc('Background colors in dark mode')
        .addDropdown(dropdown => dropdown
          .addOption('minimal-dark','Default')
          .addOption('minimal-dark-tonal','Low contrast')
          .addOption('minimal-dark-black','True black')
          .setValue(this.plugin.settings.darkStyle)
          .onChange((value) => {
            this.plugin.settings.darkStyle = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.removeStyle();
          }));

      new Setting(containerEl)
        .setName('Toggle sidebar borders')
        .setDesc('Hide or show sidebar borders')
        .addToggle(toggle => toggle.setValue(this.plugin.settings.bordersToggle)
          .onChange((value) => {
            this.plugin.settings.bordersToggle = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
          }));

    new Setting(containerEl)
      .setName('Focus mode')
      .setDesc('When sidebars are collapsed hide action buttons (accessible by hovering)')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.focusMode)
          .onChange((value) => {
            this.plugin.settings.focusMode = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

      new Setting(containerEl)
        .setName('Text font')
        .setDesc('Used in preview mode — the font must also be installed on your computer')
        .addDropdown(dropdown => dropdown
          .addOption('-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif','System font')
          .addOption('Inter','Inter')
          .addOption('iA Writer Mono S','iA Mono')
          .addOption('iA Writer Duo S','iA Duo')
          .addOption('iA Writer Quattro S','iA Quattro')
          .addOption('SFMono-Regular','SF Mono')
          .addOption('Consolas','Consolas')
          .addOption('Roboto Mono','Roboto Mono')
          .setValue(this.plugin.settings.textFont)
            .onChange((value) => {
              this.plugin.settings.textFont = value;
              this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );

      new Setting(containerEl)
        .setName('Editor font')
        .setDesc('Used in edit mode')
        .addDropdown(dropdown => dropdown
          .addOption('-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif','System font')
          .addOption('Inter','Inter')
          .addOption('iA Writer Mono S','iA Mono')
          .addOption('iA Writer Duo S','iA Duo')
          .addOption('iA Writer Quattro S','iA Quattro')
          .addOption('SFMono-Regular','SF Mono')
          .addOption('Consolas','Consolas')
          .addOption('Roboto Mono','Roboto Mono')
          .setValue(this.plugin.settings.editorFont)
            .onChange((value) => {
              this.plugin.settings.editorFont = value;
              this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );

      new Setting(containerEl)
        .setName('Monospace font')
        .setDesc('Used for code blocks, front matter, etc')
        .addDropdown(dropdown => dropdown
          .addOption('Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace','System font')
          .addOption('iA Writer Mono S','iA Mono')
          .addOption('iA Writer Duo S','iA Duo')
          .addOption('iA Writer Quattro S','iA Quattro')
          .addOption('SFMono-Regular','SF Mono')
          .addOption('Consolas','Consolas')
          .addOption('Roboto Mono','Roboto Mono')
          .setValue(this.plugin.settings.monoFont)
            .onChange((value) => {
              this.plugin.settings.monoFont = value;
              this.plugin.saveData(this.plugin.settings);
              this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Underline internal links')
      .setDesc('Show underlines on internal links')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.underlineInternal)
          .onChange((value) => {
            this.plugin.settings.underlineInternal = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Underline external links')
      .setDesc('Show underlines on external links')
      .addToggle(toggle => toggle.setValue(this.plugin.settings.underlineExternal)
          .onChange((value) => {
            this.plugin.settings.underlineExternal = value;
            this.plugin.saveData(this.plugin.settings);
            this.plugin.refresh();
            })
          );

    new Setting(containerEl)
      .setName('Line width')
      .setDesc('The maximum number of characters per line (default 40)')
      .addText(text => text.setPlaceholder('40')
        .setValue((this.plugin.settings.lineWidth || '') + '')
        .onChange((value) => {
          this.plugin.settings.lineWidth = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Body font size')
      .setDesc('Used for the main text (default 16)')
      .addText(text => text.setPlaceholder('16')
        .setValue((this.plugin.settings.textNormal || '') + '')
        .onChange((value) => {
          this.plugin.settings.textNormal = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Sidebar font size')
      .setDesc('Used for text in the sidebars (default 13)')
      .addText(text => text.setPlaceholder('13')
        .setValue((this.plugin.settings.textSmall || '') + '')
        .onChange((value) => {
          this.plugin.settings.textSmall = parseInt(value.trim());
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    containerEl.createEl('br');
    containerEl.createEl('h3');
    containerEl.createEl('h3', {text: 'Custom fonts'});
    containerEl.createEl('p', {text: 'These settings override the dropdowns above. Make sure to use the exact name of the font as it appears on your system.'});

    new Setting(containerEl)
      .setName('Custom text font')
      .setDesc('Used in preview mode')
      .addText(text => text.setPlaceholder('')
        .setValue((this.plugin.settings.textFont || '') + '')
        .onChange((value) => {
          this.plugin.settings.textFont = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Custom editor font')
      .setDesc('Used in edit mode')
      .addText(text => text.setPlaceholder('')
        .setValue((this.plugin.settings.editorFont || '') + '')
        .onChange((value) => {
          this.plugin.settings.editorFont = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

    new Setting(containerEl)
      .setName('Custom monospace font')
      .setDesc('Used for code blocks, front matter, etc')
      .addText(text => text.setPlaceholder('')
        .setValue((this.plugin.settings.monoFont || '') + '')
        .onChange((value) => {
          this.plugin.settings.monoFont = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

  }
}
