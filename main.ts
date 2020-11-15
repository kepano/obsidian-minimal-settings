import { App, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

export default class MinimalTheme extends Plugin {
	settings: MinimalSettings;

	async onload() {
		// load settings
    this.settings = await this.loadData() || new MinimalSettings();

    // add the settings tab
		this.addSettingTab(new MinimalSettingTab(this.app, this));
    // add the toggle on/off command

    this.addStyle();

		this.refresh()
	}

	// refresh function for when we change settings
  refresh = () => {
    // re-load the style
    this.updateStyle()
  }

  // add the styling elements we need
  addStyle = () => {
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
  updateStyle = () => {
  	this.removeStyle();
  	document.body.classList.toggle('fancy-cursor', this.settings.fancyCursor);
  	document.body.classList.add(this.settings.lightStyle);
  	document.body.classList.add(this.settings.darkStyle);

    // get the custom css element
    const el = document.getElementById('minimal-theme');
    if (!el) throw "minimal-theme element not found!";
    else {
      // set the settings-dependent css
      el.innerText = `
        body.minimal-theme{--font-monospace:${this.settings.monoFont};--text-editor:${this.settings.editorFont};--accent-h:${this.settings.accentHue};--accent-s:${this.settings.accentSat}%;}
      `;
    }
  }

  removeStyle = () => {
    document.body.classList.remove('minimal-light');
    document.body.classList.remove('minimal-light-tonal');
    document.body.classList.remove('minimal-light-contrast');
    document.body.classList.remove('minimal-dark');
    document.body.classList.remove('minimal-dark-tonal');
  }


}

class MinimalSettings {
  accentHue: number = 201;
  accentSat: number = 17;
  lightStyle: string = 'minimal-light';
  darkStyle: string = 'minimal-dark';
  editorFont: string = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
  monoFont: string = 'Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace';
  fancyCursor: boolean = true;
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

		containerEl.createEl('strong', {text: 'Minimal Theme Settings'});
		containerEl.createEl('p', {text: 'If you notice any issues, update to the latest version of Minimal Theme and reload Obsidian. Download the Hider plugin for additional options to further simplify the Obsidian UI.'});
		containerEl.createEl('a', {text: '⬤ Accent color'});
		containerEl.createEl('h3');

			new Setting(containerEl)
				.setName('Accent color hue')
	      .setDesc('For links and interactive elements')
		    .addSlider(slider => slider
		        .setLimits(0, 255, 1)
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
	    	.setName('Light mode background')
	    	.setDesc('Background colors in light mode')
	    	.addDropdown(dropdown => dropdown
	    		.addOption('minimal-light','Default')
	    		.addOption('minimal-light-tonal','Low contrast')
	    		.addOption('minimal-light-contrast','High contrast')
	    		.setValue(this.plugin.settings.lightStyle)
        .onChange((value) => {
          this.plugin.settings.lightStyle = value;
          this.plugin.saveData(this.plugin.settings);
          this.plugin.refresh();
        }));

	    new Setting(containerEl)
	    	.setName('Dark mode background')
	    	.setDesc('Background colors in dark mode')
	    	.addDropdown(dropdown => dropdown
	    		.addOption('minimal-dark','Default')
	    		.addOption('minimal-dark-tonal','Low contrast')
	    		.setValue(this.plugin.settings.darkStyle)
	        .onChange((value) => {
	          this.plugin.settings.darkStyle = value;
	          this.plugin.saveData(this.plugin.settings);
	          this.plugin.refresh();
	        }));

	    new Setting(containerEl)
	    	.setName('Editor font')
	    	.setDesc('Make sure the font is also installed on your computer')
	    	.addDropdown(dropdown => dropdown
	    		.addOption('-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif','System fonts')
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
	    	.setDesc('Used for code blocks, front matter, etc.')
	    	.addDropdown(dropdown => dropdown
	    		.addOption('Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace','System fonts')
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

	}
}
