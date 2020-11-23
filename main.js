'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var MinimalTheme = /** @class */ (function (_super) {
    __extends(MinimalTheme, _super);
    function MinimalTheme() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinimalTheme.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, media, callback, lightStyles, darkStyles, theme;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = (_b.sent()) || new MinimalSettings();
                        this.addSettingTab(new MinimalSettingTab(this.app, this));
                        this.addStyle();
                        media = window.matchMedia('(prefers-color-scheme: dark)');
                        callback = function () {
                            if (media.matches) {
                                console.log('Dark mode active');
                                _this.updateDarkStyle();
                            }
                            else {
                                console.log('Light mode active');
                                _this.updateLightStyle();
                            }
                        };
                        media.addEventListener('change', callback);
                        // Remove listener when we unload
                        this.register(function () { return media.removeEventListener('change', callback); });
                        lightStyles = ['minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white'];
                        darkStyles = ['minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black'];
                        theme = ['theme-light', 'theme-dark'];
                        this.addCommand({
                            id: 'toggle-minimal-dark-cycle',
                            name: 'Cycle between dark mode styles',
                            callback: function () {
                                _this.settings.darkStyle = darkStyles[(darkStyles.indexOf(_this.settings.darkStyle) + 1) % darkStyles.length];
                                _this.saveData(_this.settings);
                                _this.updateDarkStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-light-cycle',
                            name: 'Cycle between light mode styles',
                            callback: function () {
                                _this.settings.lightStyle = lightStyles[(lightStyles.indexOf(_this.settings.lightStyle) + 1) % lightStyles.length];
                                _this.saveData(_this.settings);
                                _this.updateLightStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-hidden-borders',
                            name: 'Toggle sidebar borders',
                            callback: function () {
                                _this.settings.bordersToggle = !_this.settings.bordersToggle;
                                _this.saveData(_this.settings);
                                _this.refresh();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-switch',
                            name: 'Switch between light and dark mode',
                            callback: function () {
                                _this.settings.theme = theme[(theme.indexOf(_this.settings.theme) + 1) % theme.length];
                                _this.saveData(_this.settings);
                                _this.updateTheme();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-light-default',
                            name: 'Use light mode (default)',
                            callback: function () {
                                _this.settings.lightStyle = 'minimal-light';
                                _this.saveData(_this.settings);
                                _this.updateLightStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-light-white',
                            name: 'Use light mode (all white)',
                            callback: function () {
                                _this.settings.lightStyle = 'minimal-light-white';
                                _this.saveData(_this.settings);
                                _this.updateLightStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-light-tonal',
                            name: 'Use light mode (low contrast)',
                            callback: function () {
                                _this.settings.lightStyle = 'minimal-light-tonal';
                                _this.saveData(_this.settings);
                                _this.updateLightStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-light-contrast',
                            name: 'Use light mode (high contrast)',
                            callback: function () {
                                _this.settings.lightStyle = 'minimal-light-contrast';
                                _this.saveData(_this.settings);
                                _this.updateLightStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-dark-default',
                            name: 'Use dark mode (default)',
                            callback: function () {
                                _this.settings.darkStyle = 'minimal-dark';
                                _this.saveData(_this.settings);
                                _this.updateDarkStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-dark-tonal',
                            name: 'Use dark mode (low contrast)',
                            callback: function () {
                                _this.settings.darkStyle = 'minimal-dark-tonal';
                                _this.saveData(_this.settings);
                                _this.updateDarkStyle();
                            }
                        });
                        this.addCommand({
                            id: 'toggle-minimal-dark-black',
                            name: 'Use dark mode (true black)',
                            callback: function () {
                                _this.settings.darkStyle = 'minimal-dark-black';
                                _this.saveData(_this.settings);
                                _this.updateDarkStyle();
                            }
                        });
                        this.refresh();
                        if (this.settings.useSystemTheme) {
                            this.enableSystemTheme();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // refresh function for when we change settings
    MinimalTheme.prototype.refresh = function () {
        // re-load the style
        this.updateStyle();
    };
    // add the styling elements we need
    MinimalTheme.prototype.addStyle = function () {
        // add a css block for our settings-dependent styles
        var css = document.createElement('style');
        css.id = 'minimal-theme';
        document.getElementsByTagName("head")[0].appendChild(css);
        // add the main class
        document.body.classList.add('minimal-theme');
        // update the style with the settings-dependent styles
        this.updateStyle();
    };
    // update the styles (at the start, or as the result of a settings change)
    MinimalTheme.prototype.updateStyle = function () {
        this.removeStyle();
        document.body.classList.toggle('borders-none', !this.settings.bordersToggle);
        document.body.classList.toggle('fancy-cursor', this.settings.fancyCursor);
        document.body.classList.toggle('focus-mode', this.settings.focusMode);
        document.body.classList.toggle('links-int-on', this.settings.underlineInternal);
        document.body.classList.toggle('links-ext-on', this.settings.underlineExternal);
        document.body.classList.toggle('system-shade', this.settings.useSystemTheme);
        // get the custom css element
        var el = document.getElementById('minimal-theme');
        if (!el)
            throw "minimal-theme element not found!";
        else {
            // set the settings-dependent css
            el.innerText = "\n        body.minimal-theme{\n          --font-normal:" + this.settings.textNormal + "px;\n          --font-small:" + this.settings.textSmall + "px;\n          --line-width:" + this.settings.lineWidth + "rem;\n          --font-monospace:" + this.settings.monoFont + ";\n          --text:" + this.settings.textFont + ";\n          --text-editor:" + this.settings.editorFont + ";\n          --accent-h:" + this.settings.accentHue + ";\n          --accent-s:" + this.settings.accentSat + "%;}\n      ";
        }
    };
    MinimalTheme.prototype.enableSystemTheme = function () {
        this.app.workspace.layoutReady ? this.refreshSystemTheme() : this.app.workspace.on('layout-ready', this.refreshSystemTheme);
    };
    MinimalTheme.prototype.refreshSystemTheme = function () {
        var isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDarkMode && this.settings.useSystemTheme) {
            console.log('Dark mode active');
            this.updateDarkStyle();
        }
        else if (this.settings.useSystemTheme) {
            console.log('Light mode active');
            this.updateLightStyle();
        }
    };
    MinimalTheme.prototype.updateDarkStyle = function () {
        document.body.removeClass('theme-light', 'minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black');
        document.body.addClass('theme-dark', this.settings.darkStyle);
        this.app.workspace.trigger('css-change');
    };
    MinimalTheme.prototype.updateLightStyle = function () {
        document.body.removeClass('theme-dark', 'minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white');
        document.body.addClass('theme-light', this.settings.lightStyle);
        this.app.workspace.trigger('css-change');
    };
    MinimalTheme.prototype.updateTheme = function () {
        document.body.removeClass('theme-dark', 'theme-light');
        document.body.addClass(this.settings.theme);
        this.app.workspace.trigger('css-change');
    };
    MinimalTheme.prototype.removeStyle = function () {
        document.body.removeClass('minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white', 'minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black');
        document.body.addClass(this.settings.lightStyle, this.settings.darkStyle);
    };
    return MinimalTheme;
}(obsidian.Plugin));
var MinimalSettings = /** @class */ (function () {
    function MinimalSettings() {
        this.theme = 'theme-light';
        this.accentHue = 201;
        this.accentSat = 17;
        this.lightStyle = 'minimal-light';
        this.darkStyle = 'minimal-dark';
        this.textFont = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
        this.editorFont = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
        this.monoFont = 'Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace';
        this.bordersToggle = true;
        this.fancyCursor = true;
        this.focusMode = true;
        this.lineWidth = 40;
        this.textNormal = 16;
        this.textSmall = 13;
        this.underlineInternal = true;
        this.underlineExternal = true;
        this.useSystemTheme = false;
    }
    return MinimalSettings;
}());
var MinimalSettingTab = /** @class */ (function (_super) {
    __extends(MinimalSettingTab, _super);
    function MinimalSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    MinimalSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h3', { text: 'Minimal Theme Settings' });
        containerEl.createEl('p', { text: 'If you notice any issues, update to the latest version of Minimal Theme and reload Obsidian. Download the Hider plugin for additional options to further simplify the Obsidian UI.' });
        containerEl.createEl('a', { text: '⬤ Accent color' });
        containerEl.createEl('h3');
        new obsidian.Setting(containerEl)
            .setName('Accent color hue')
            .setDesc('For links and interactive elements')
            .addSlider(function (slider) { return slider
            .setLimits(0, 360, 1)
            .setValue(_this.plugin.settings.accentHue)
            .onChange(function (value) {
            _this.plugin.settings.accentHue = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Accent color saturation')
            .setDesc('For links and interactive elements')
            .addSlider(function (slider) { return slider
            .setLimits(0, 100, 1)
            .setValue(_this.plugin.settings.accentSat)
            .onChange(function (value) {
            _this.plugin.settings.accentSat = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Fancy cursor')
            .setDesc('The editor cursor takes on your accent color')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.fancyCursor)
            .onChange(function (value) {
            _this.plugin.settings.fancyCursor = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Use system-level setting for light or dark mode')
            .setDesc('Automatically switch based on your operating system settings')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.useSystemTheme)
            .onChange(function (value) {
            _this.plugin.settings.useSystemTheme = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refreshSystemTheme();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Light mode style')
            .setDesc('Background colors in light mode')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('minimal-light', 'Default')
            .addOption('minimal-light-white', 'All white')
            .addOption('minimal-light-tonal', 'Low contrast')
            .addOption('minimal-light-contrast', 'High contrast')
            .setValue(_this.plugin.settings.lightStyle)
            .onChange(function (value) {
            _this.plugin.settings.lightStyle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.removeStyle();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Dark mode style')
            .setDesc('Background colors in dark mode')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('minimal-dark', 'Default')
            .addOption('minimal-dark-tonal', 'Low contrast')
            .addOption('minimal-dark-black', 'True black')
            .setValue(_this.plugin.settings.darkStyle)
            .onChange(function (value) {
            _this.plugin.settings.darkStyle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.removeStyle();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Toggle sidebar borders')
            .setDesc('Hide or show sidebar borders')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.bordersToggle)
            .onChange(function (value) {
            _this.plugin.settings.bordersToggle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Focus mode')
            .setDesc('When sidebars are collapsed hide action buttons (accessible by hovering)')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.focusMode)
            .onChange(function (value) {
            _this.plugin.settings.focusMode = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Text font')
            .setDesc('Used in preview mode — the font must also be installed on your computer')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif', 'System font')
            .addOption('Inter', 'Inter')
            .addOption('iA Writer Mono S', 'iA Mono')
            .addOption('iA Writer Duo S', 'iA Duo')
            .addOption('iA Writer Quattro S', 'iA Quattro')
            .addOption('SFMono-Regular', 'SF Mono')
            .addOption('Consolas', 'Consolas')
            .addOption('Roboto Mono', 'Roboto Mono')
            .setValue(_this.plugin.settings.textFont)
            .onChange(function (value) {
            _this.plugin.settings.textFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Editor font')
            .setDesc('Used in edit mode')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif', 'System font')
            .addOption('Inter', 'Inter')
            .addOption('iA Writer Mono S', 'iA Mono')
            .addOption('iA Writer Duo S', 'iA Duo')
            .addOption('iA Writer Quattro S', 'iA Quattro')
            .addOption('SFMono-Regular', 'SF Mono')
            .addOption('Consolas', 'Consolas')
            .addOption('Roboto Mono', 'Roboto Mono')
            .setValue(_this.plugin.settings.editorFont)
            .onChange(function (value) {
            _this.plugin.settings.editorFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Monospace font')
            .setDesc('Used for code blocks, front matter, etc')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace', 'System font')
            .addOption('iA Writer Mono S', 'iA Mono')
            .addOption('iA Writer Duo S', 'iA Duo')
            .addOption('iA Writer Quattro S', 'iA Quattro')
            .addOption('SFMono-Regular', 'SF Mono')
            .addOption('Consolas', 'Consolas')
            .addOption('Roboto Mono', 'Roboto Mono')
            .setValue(_this.plugin.settings.monoFont)
            .onChange(function (value) {
            _this.plugin.settings.monoFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Underline internal links')
            .setDesc('Show underlines on internal links')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.underlineInternal)
            .onChange(function (value) {
            _this.plugin.settings.underlineInternal = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Underline external links')
            .setDesc('Show underlines on external links')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.underlineExternal)
            .onChange(function (value) {
            _this.plugin.settings.underlineExternal = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Line width')
            .setDesc('The maximum number of characters per line (default 40)')
            .addText(function (text) { return text.setPlaceholder('40')
            .setValue((_this.plugin.settings.lineWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.lineWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Body font size')
            .setDesc('Used for the main text (default 16)')
            .addText(function (text) { return text.setPlaceholder('16')
            .setValue((_this.plugin.settings.textNormal || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.textNormal = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Sidebar font size')
            .setDesc('Used for text in the sidebars (default 13)')
            .addText(function (text) { return text.setPlaceholder('13')
            .setValue((_this.plugin.settings.textSmall || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.textSmall = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        containerEl.createEl('br');
        containerEl.createEl('h3');
        containerEl.createEl('h3', { text: 'Custom fonts' });
        containerEl.createEl('p', { text: 'These settings override the dropdowns above. Make sure to use the exact name of the font as it appears on your system.' });
        new obsidian.Setting(containerEl)
            .setName('Custom text font')
            .setDesc('Used in preview mode')
            .addText(function (text) { return text.setPlaceholder('')
            .setValue((_this.plugin.settings.textFont || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.textFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Custom editor font')
            .setDesc('Used in edit mode')
            .addText(function (text) { return text.setPlaceholder('')
            .setValue((_this.plugin.settings.editorFont || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.editorFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Custom monospace font')
            .setDesc('Used for code blocks, front matter, etc')
            .addText(function (text) { return text.setPlaceholder('')
            .setValue((_this.plugin.settings.monoFont || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.monoFont = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return MinimalSettingTab;
}(obsidian.PluginSettingTab));

module.exports = MinimalTheme;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBXb3Jrc3BhY2UsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmltYWxUaGVtZSBleHRlbmRzIFBsdWdpbiB7XHJcbiAgc2V0dGluZ3M6IE1pbmltYWxTZXR0aW5ncztcclxuXHJcbiAgYXN5bmMgb25sb2FkKCkge1xyXG5cclxuICB0aGlzLnNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpIHx8IG5ldyBNaW5pbWFsU2V0dGluZ3MoKTtcclxuXHJcbiAgdGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBNaW5pbWFsU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuICB0aGlzLmFkZFN0eWxlKCk7XHJcblxyXG4gIC8vIFdhdGNoIGZvciBzeXN0ZW0gY2hhbmdlcyB0byBjb2xvciB0aGVtZSBcclxuXHJcbiAgbGV0IG1lZGlhID0gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKTtcclxuXHJcbiAgbGV0IGNhbGxiYWNrID0gKCkgPT4ge1xyXG4gICAgaWYgKG1lZGlhLm1hdGNoZXMpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBhY3RpdmUnKTtcclxuICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKVxyXG5cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdMaWdodCBtb2RlIGFjdGl2ZScpO1xyXG4gICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKVxyXG4gICAgfVxyXG4gIH1cclxuICBtZWRpYS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBjYWxsYmFjayk7XHJcblxyXG4gIC8vIFJlbW92ZSBsaXN0ZW5lciB3aGVuIHdlIHVubG9hZFxyXG5cclxuICB0aGlzLnJlZ2lzdGVyKCgpID0+IG1lZGlhLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNhbGxiYWNrKSk7XHJcblxyXG4gIGNvbnN0IGxpZ2h0U3R5bGVzID0gWydtaW5pbWFsLWxpZ2h0JywgJ21pbmltYWwtbGlnaHQtdG9uYWwnLCAnbWluaW1hbC1saWdodC1jb250cmFzdCcsICdtaW5pbWFsLWxpZ2h0LXdoaXRlJ107XHJcbiAgY29uc3QgZGFya1N0eWxlcyA9IFsnbWluaW1hbC1kYXJrJywgJ21pbmltYWwtZGFyay10b25hbCcsICdtaW5pbWFsLWRhcmstYmxhY2snXTtcclxuICBjb25zdCB0aGVtZSA9IFsndGhlbWUtbGlnaHQnLCAndGhlbWUtZGFyayddO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstY3ljbGUnLFxyXG4gICAgICBuYW1lOiAnQ3ljbGUgYmV0d2VlbiBkYXJrIG1vZGUgc3R5bGVzJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSA9IGRhcmtTdHlsZXNbKGRhcmtTdHlsZXMuaW5kZXhPZih0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSkgKyAxKSAlIGRhcmtTdHlsZXMubGVuZ3RoXTtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pOyAgXHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtbGlnaHQtY3ljbGUnLFxyXG4gICAgICBuYW1lOiAnQ3ljbGUgYmV0d2VlbiBsaWdodCBtb2RlIHN0eWxlcycsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gbGlnaHRTdHlsZXNbKGxpZ2h0U3R5bGVzLmluZGV4T2YodGhpcy5zZXR0aW5ncy5saWdodFN0eWxlKSArIDEpICUgbGlnaHRTdHlsZXMubGVuZ3RoXTtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtaGlkZGVuLWJvcmRlcnMnLFxyXG4gICAgICBuYW1lOiAnVG9nZ2xlIHNpZGViYXIgYm9yZGVycycsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5ib3JkZXJzVG9nZ2xlID0gIXRoaXMuc2V0dGluZ3MuYm9yZGVyc1RvZ2dsZTtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtbWluaW1hbC1zd2l0Y2gnLFxyXG4gICAgICBuYW1lOiAnU3dpdGNoIGJldHdlZW4gbGlnaHQgYW5kIGRhcmsgbW9kZScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy50aGVtZSA9IHRoZW1lWyh0aGVtZS5pbmRleE9mKHRoaXMuc2V0dGluZ3MudGhlbWUpICsgMSkgJSB0aGVtZS5sZW5ndGhdO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVUaGVtZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtbGlnaHQtZGVmYXVsdCcsXHJcbiAgICAgIG5hbWU6ICdVc2UgbGlnaHQgbW9kZSAoZGVmYXVsdCknLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGlnaHRTdHlsZSA9ICdtaW5pbWFsLWxpZ2h0JztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtbWluaW1hbC1saWdodC13aGl0ZScsXHJcbiAgICAgIG5hbWU6ICdVc2UgbGlnaHQgbW9kZSAoYWxsIHdoaXRlKScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gJ21pbmltYWwtbGlnaHQtd2hpdGUnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LXRvbmFsJyxcclxuICAgICAgbmFtZTogJ1VzZSBsaWdodCBtb2RlIChsb3cgY29udHJhc3QpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUgPSAnbWluaW1hbC1saWdodC10b25hbCc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtbGlnaHQtY29udHJhc3QnLFxyXG4gICAgICBuYW1lOiAnVXNlIGxpZ2h0IG1vZGUgKGhpZ2ggY29udHJhc3QpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUgPSAnbWluaW1hbC1saWdodC1jb250cmFzdCc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtZGFyay1kZWZhdWx0JyxcclxuICAgICAgbmFtZTogJ1VzZSBkYXJrIG1vZGUgKGRlZmF1bHQpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSA9ICdtaW5pbWFsLWRhcmsnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtZGFyay10b25hbCcsXHJcbiAgICAgIG5hbWU6ICdVc2UgZGFyayBtb2RlIChsb3cgY29udHJhc3QpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSA9ICdtaW5pbWFsLWRhcmstdG9uYWwnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtZGFyay1ibGFjaycsXHJcbiAgICAgIG5hbWU6ICdVc2UgZGFyayBtb2RlICh0cnVlIGJsYWNrKScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSAnbWluaW1hbC1kYXJrLWJsYWNrJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgdGhpcy5yZWZyZXNoKClcclxuXHJcbiAgaWYgKHRoaXMuc2V0dGluZ3MudXNlU3lzdGVtVGhlbWUpIHtcclxuICAgIHRoaXMuZW5hYmxlU3lzdGVtVGhlbWUoKTtcclxuICB9XHJcblxyXG59XHJcblxyXG4gIC8vIHJlZnJlc2ggZnVuY3Rpb24gZm9yIHdoZW4gd2UgY2hhbmdlIHNldHRpbmdzXHJcbiAgcmVmcmVzaCgpIHtcclxuICAgIC8vIHJlLWxvYWQgdGhlIHN0eWxlXHJcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKClcclxuICB9XHJcblxyXG4gIC8vIGFkZCB0aGUgc3R5bGluZyBlbGVtZW50cyB3ZSBuZWVkXHJcbiAgYWRkU3R5bGUoKSB7XHJcbiAgICAvLyBhZGQgYSBjc3MgYmxvY2sgZm9yIG91ciBzZXR0aW5ncy1kZXBlbmRlbnQgc3R5bGVzXHJcbiAgICBjb25zdCBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xyXG4gICAgY3NzLmlkID0gJ21pbmltYWwtdGhlbWUnO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGNzcyk7XHJcblxyXG4gICAgLy8gYWRkIHRoZSBtYWluIGNsYXNzXHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ21pbmltYWwtdGhlbWUnKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHN0eWxlIHdpdGggdGhlIHNldHRpbmdzLWRlcGVuZGVudCBzdHlsZXNcclxuICAgIHRoaXMudXBkYXRlU3R5bGUoKTtcclxuICB9XHJcblxyXG4gIC8vIHVwZGF0ZSB0aGUgc3R5bGVzIChhdCB0aGUgc3RhcnQsIG9yIGFzIHRoZSByZXN1bHQgb2YgYSBzZXR0aW5ncyBjaGFuZ2UpXHJcbiAgdXBkYXRlU3R5bGUoKSB7XHJcbiAgICB0aGlzLnJlbW92ZVN0eWxlKCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2JvcmRlcnMtbm9uZScsICF0aGlzLnNldHRpbmdzLmJvcmRlcnNUb2dnbGUpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdmYW5jeS1jdXJzb3InLCB0aGlzLnNldHRpbmdzLmZhbmN5Q3Vyc29yKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZm9jdXMtbW9kZScsIHRoaXMuc2V0dGluZ3MuZm9jdXNNb2RlKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnbGlua3MtaW50LW9uJywgdGhpcy5zZXR0aW5ncy51bmRlcmxpbmVJbnRlcm5hbCk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xpbmtzLWV4dC1vbicsIHRoaXMuc2V0dGluZ3MudW5kZXJsaW5lRXh0ZXJuYWwpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdzeXN0ZW0tc2hhZGUnLCB0aGlzLnNldHRpbmdzLnVzZVN5c3RlbVRoZW1lKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGN1c3RvbSBjc3MgZWxlbWVudFxyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1hbC10aGVtZScpO1xyXG4gICAgaWYgKCFlbCkgdGhyb3cgXCJtaW5pbWFsLXRoZW1lIGVsZW1lbnQgbm90IGZvdW5kIVwiO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIC8vIHNldCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IGNzc1xyXG4gICAgICBlbC5pbm5lclRleHQgPSBgXHJcbiAgICAgICAgYm9keS5taW5pbWFsLXRoZW1le1xyXG4gICAgICAgICAgLS1mb250LW5vcm1hbDoke3RoaXMuc2V0dGluZ3MudGV4dE5vcm1hbH1weDtcclxuICAgICAgICAgIC0tZm9udC1zbWFsbDoke3RoaXMuc2V0dGluZ3MudGV4dFNtYWxsfXB4O1xyXG4gICAgICAgICAgLS1saW5lLXdpZHRoOiR7dGhpcy5zZXR0aW5ncy5saW5lV2lkdGh9cmVtO1xyXG4gICAgICAgICAgLS1mb250LW1vbm9zcGFjZToke3RoaXMuc2V0dGluZ3MubW9ub0ZvbnR9O1xyXG4gICAgICAgICAgLS10ZXh0OiR7dGhpcy5zZXR0aW5ncy50ZXh0Rm9udH07XHJcbiAgICAgICAgICAtLXRleHQtZWRpdG9yOiR7dGhpcy5zZXR0aW5ncy5lZGl0b3JGb250fTtcclxuICAgICAgICAgIC0tYWNjZW50LWg6JHt0aGlzLnNldHRpbmdzLmFjY2VudEh1ZX07XHJcbiAgICAgICAgICAtLWFjY2VudC1zOiR7dGhpcy5zZXR0aW5ncy5hY2NlbnRTYXR9JTt9XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbmFibGVTeXN0ZW1UaGVtZSgpIHtcclxuICAgICh0aGlzLmFwcC53b3Jrc3BhY2UgYXMgYW55KS5sYXlvdXRSZWFkeSA/IHRoaXMucmVmcmVzaFN5c3RlbVRoZW1lKCkgOiB0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2xheW91dC1yZWFkeScsIHRoaXMucmVmcmVzaFN5c3RlbVRoZW1lKTtcclxuICB9XHJcblxyXG4gIHJlZnJlc2hTeXN0ZW1UaGVtZSgpIHtcclxuICAgIGNvbnN0IGlzRGFya01vZGUgPSB3aW5kb3cubWF0Y2hNZWRpYSAmJiB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXNcclxuXHJcbiAgICBpZihpc0RhcmtNb2RlICYmIHRoaXMuc2V0dGluZ3MudXNlU3lzdGVtVGhlbWUpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdEYXJrIG1vZGUgYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKVxyXG5cclxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNldHRpbmdzLnVzZVN5c3RlbVRoZW1lKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0xpZ2h0IG1vZGUgYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKClcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlRGFya1N0eWxlKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcygndGhlbWUtbGlnaHQnLCdtaW5pbWFsLWRhcmsnLCdtaW5pbWFsLWRhcmstdG9uYWwnLCdtaW5pbWFsLWRhcmstYmxhY2snKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkQ2xhc3MoJ3RoZW1lLWRhcmsnLHRoaXMuc2V0dGluZ3MuZGFya1N0eWxlKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKCdjc3MtY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVMaWdodFN0eWxlKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcygndGhlbWUtZGFyaycsJ21pbmltYWwtbGlnaHQnLCdtaW5pbWFsLWxpZ2h0LXRvbmFsJywnbWluaW1hbC1saWdodC1jb250cmFzdCcsJ21pbmltYWwtbGlnaHQtd2hpdGUnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkQ2xhc3MoJ3RoZW1lLWxpZ2h0Jyx0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoJ2Nzcy1jaGFuZ2UnKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZVRoZW1lKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcygndGhlbWUtZGFyaycsJ3RoZW1lLWxpZ2h0Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZENsYXNzKHRoaXMuc2V0dGluZ3MudGhlbWUpO1xyXG4gICAgdGhpcy5hcHAud29ya3NwYWNlLnRyaWdnZXIoJ2Nzcy1jaGFuZ2UnKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVN0eWxlKCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDbGFzcygnbWluaW1hbC1saWdodCcsJ21pbmltYWwtbGlnaHQtdG9uYWwnLCdtaW5pbWFsLWxpZ2h0LWNvbnRyYXN0JywnbWluaW1hbC1saWdodC13aGl0ZScsJ21pbmltYWwtZGFyaycsJ21pbmltYWwtZGFyay10b25hbCcsJ21pbmltYWwtZGFyay1ibGFjaycpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUsdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIE1pbmltYWxTZXR0aW5ncyB7XHJcbiAgdGhlbWU6IHN0cmluZyA9ICd0aGVtZS1saWdodCc7XHJcbiAgYWNjZW50SHVlOiBudW1iZXIgPSAyMDE7XHJcbiAgYWNjZW50U2F0OiBudW1iZXIgPSAxNztcclxuICBsaWdodFN0eWxlOiBzdHJpbmcgPSAnbWluaW1hbC1saWdodCc7XHJcbiAgZGFya1N0eWxlOiBzdHJpbmcgPSAnbWluaW1hbC1kYXJrJztcclxuICB0ZXh0Rm9udDogc3RyaW5nID0gJy1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsc2Fucy1zZXJpZic7XHJcbiAgZWRpdG9yRm9udDogc3RyaW5nID0gJy1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsc2Fucy1zZXJpZic7XHJcbiAgbW9ub0ZvbnQ6IHN0cmluZyA9ICdNZW5sbyxTRk1vbm8tUmVndWxhcixDb25zb2xhcyxSb2JvdG8gTW9ubyxtb25vc3BhY2UnO1xyXG4gIGJvcmRlcnNUb2dnbGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGZhbmN5Q3Vyc29yOiBib29sZWFuID0gdHJ1ZTtcclxuICBmb2N1c01vZGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIGxpbmVXaWR0aDogbnVtYmVyID0gNDA7XHJcbiAgdGV4dE5vcm1hbDogbnVtYmVyID0gMTY7XHJcbiAgdGV4dFNtYWxsOiBudW1iZXIgPSAxMztcclxuICB1bmRlcmxpbmVJbnRlcm5hbDogYm9vbGVhbiA9IHRydWU7XHJcbiAgdW5kZXJsaW5lRXh0ZXJuYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHVzZVN5c3RlbVRoZW1lOiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuXHJcbmNsYXNzIE1pbmltYWxTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XHJcblxyXG5cclxuICBwbHVnaW46IE1pbmltYWxUaGVtZTtcclxuICBjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBNaW5pbWFsVGhlbWUpIHtcclxuICAgIHN1cGVyKGFwcCwgcGx1Z2luKTtcclxuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xyXG4gIH1cclxuXHJcbiAgZGlzcGxheSgpOiB2b2lkIHtcclxuICAgIGxldCB7Y29udGFpbmVyRWx9ID0gdGhpcztcclxuXHJcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJywge3RleHQ6ICdNaW5pbWFsIFRoZW1lIFNldHRpbmdzJ30pO1xyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7dGV4dDogJ0lmIHlvdSBub3RpY2UgYW55IGlzc3VlcywgdXBkYXRlIHRvIHRoZSBsYXRlc3QgdmVyc2lvbiBvZiBNaW5pbWFsIFRoZW1lIGFuZCByZWxvYWQgT2JzaWRpYW4uIERvd25sb2FkIHRoZSBIaWRlciBwbHVnaW4gZm9yIGFkZGl0aW9uYWwgb3B0aW9ucyB0byBmdXJ0aGVyIHNpbXBsaWZ5IHRoZSBPYnNpZGlhbiBVSS4nfSk7XHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnYScsIHt0ZXh0OiAn4qykIEFjY2VudCBjb2xvcid9KTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycpO1xyXG5cclxuXHJcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgIC5zZXROYW1lKCdBY2NlbnQgY29sb3IgaHVlJylcclxuICAgICAgICAuc2V0RGVzYygnRm9yIGxpbmtzIGFuZCBpbnRlcmFjdGl2ZSBlbGVtZW50cycpXHJcbiAgICAgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4gc2xpZGVyXHJcbiAgICAgICAgICAgIC5zZXRMaW1pdHMoMCwgMzYwLCAxKVxyXG4gICAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWNjZW50SHVlKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY2NlbnRIdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICB9KSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnQWNjZW50IGNvbG9yIHNhdHVyYXRpb24nKVxyXG4gICAgICAgIC5zZXREZXNjKCdGb3IgbGlua3MgYW5kIGludGVyYWN0aXZlIGVsZW1lbnRzJylcclxuICAgICAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiBzbGlkZXJcclxuICAgICAgICAgICAgLnNldExpbWl0cygwLCAxMDAsIDEpXHJcbiAgICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY2NlbnRTYXQpXHJcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFjY2VudFNhdCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgIH0pKTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoJ0ZhbmN5IGN1cnNvcicpXHJcbiAgICAgIC5zZXREZXNjKCdUaGUgZWRpdG9yIGN1cnNvciB0YWtlcyBvbiB5b3VyIGFjY2VudCBjb2xvcicpXHJcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5mYW5jeUN1cnNvcilcclxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZmFuY3lDdXJzb3IgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnVXNlIHN5c3RlbS1sZXZlbCBzZXR0aW5nIGZvciBsaWdodCBvciBkYXJrIG1vZGUnKVxyXG4gICAgICAuc2V0RGVzYygnQXV0b21hdGljYWxseSBzd2l0Y2ggYmFzZWQgb24geW91ciBvcGVyYXRpbmcgc3lzdGVtIHNldHRpbmdzJylcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVzZVN5c3RlbVRoZW1lKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VTeXN0ZW1UaGVtZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2hTeXN0ZW1UaGVtZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgIC5zZXROYW1lKCdMaWdodCBtb2RlIHN0eWxlJylcclxuICAgICAgICAuc2V0RGVzYygnQmFja2dyb3VuZCBjb2xvcnMgaW4gbGlnaHQgbW9kZScpXHJcbiAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdtaW5pbWFsLWxpZ2h0JywnRGVmYXVsdCcpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdtaW5pbWFsLWxpZ2h0LXdoaXRlJywnQWxsIHdoaXRlJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ21pbmltYWwtbGlnaHQtdG9uYWwnLCdMb3cgY29udHJhc3QnKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignbWluaW1hbC1saWdodC1jb250cmFzdCcsJ0hpZ2ggY29udHJhc3QnKVxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxpZ2h0U3R5bGUpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGlnaHRTdHlsZSA9IHZhbHVlO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnRGFyayBtb2RlIHN0eWxlJylcclxuICAgICAgICAuc2V0RGVzYygnQmFja2dyb3VuZCBjb2xvcnMgaW4gZGFyayBtb2RlJylcclxuICAgICAgICAuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cclxuICAgICAgICAgIC5hZGRPcHRpb24oJ21pbmltYWwtZGFyaycsJ0RlZmF1bHQnKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignbWluaW1hbC1kYXJrLXRvbmFsJywnTG93IGNvbnRyYXN0JylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ21pbmltYWwtZGFyay1ibGFjaycsJ1RydWUgYmxhY2snKVxyXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmRhcmtTdHlsZSlcclxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGFya1N0eWxlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVtb3ZlU3R5bGUoKTtcclxuICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAgIC5zZXROYW1lKCdUb2dnbGUgc2lkZWJhciBib3JkZXJzJylcclxuICAgICAgICAuc2V0RGVzYygnSGlkZSBvciBzaG93IHNpZGViYXIgYm9yZGVycycpXHJcbiAgICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmJvcmRlcnNUb2dnbGUpXHJcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmJvcmRlcnNUb2dnbGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICB9KSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdGb2N1cyBtb2RlJylcclxuICAgICAgLnNldERlc2MoJ1doZW4gc2lkZWJhcnMgYXJlIGNvbGxhcHNlZCBoaWRlIGFjdGlvbiBidXR0b25zIChhY2Nlc3NpYmxlIGJ5IGhvdmVyaW5nKScpXHJcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5mb2N1c01vZGUpXHJcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZvY3VzTW9kZSA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnVGV4dCBmb250JylcclxuICAgICAgICAuc2V0RGVzYygnVXNlZCBpbiBwcmV2aWV3IG1vZGUg4oCUIHRoZSBmb250IG11c3QgYWxzbyBiZSBpbnN0YWxsZWQgb24geW91ciBjb21wdXRlcicpXHJcbiAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnLCdTeXN0ZW0gZm9udCcpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdJbnRlcicsJ0ludGVyJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0Rm9udClcclxuICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnRWRpdG9yIGZvbnQnKVxyXG4gICAgICAgIC5zZXREZXNjKCdVc2VkIGluIGVkaXQgbW9kZScpXHJcbiAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnLCdTeXN0ZW0gZm9udCcpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdJbnRlcicsJ0ludGVyJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lZGl0b3JGb250KVxyXG4gICAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZWRpdG9yRm9udCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgLnNldE5hbWUoJ01vbm9zcGFjZSBmb250JylcclxuICAgICAgICAuc2V0RGVzYygnVXNlZCBmb3IgY29kZSBibG9ja3MsIGZyb250IG1hdHRlciwgZXRjJylcclxuICAgICAgICAuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cclxuICAgICAgICAgIC5hZGRPcHRpb24oJ01lbmxvLFNGTW9uby1SZWd1bGFyLENvbnNvbGFzLFJvYm90byBNb25vLG1vbm9zcGFjZScsJ1N5c3RlbSBmb250JylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb25vRm9udClcclxuICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdVbmRlcmxpbmUgaW50ZXJuYWwgbGlua3MnKVxyXG4gICAgICAuc2V0RGVzYygnU2hvdyB1bmRlcmxpbmVzIG9uIGludGVybmFsIGxpbmtzJylcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVuZGVybGluZUludGVybmFsKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVJbnRlcm5hbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdVbmRlcmxpbmUgZXh0ZXJuYWwgbGlua3MnKVxyXG4gICAgICAuc2V0RGVzYygnU2hvdyB1bmRlcmxpbmVzIG9uIGV4dGVybmFsIGxpbmtzJylcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVuZGVybGluZUV4dGVybmFsKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVFeHRlcm5hbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdMaW5lIHdpZHRoJylcclxuICAgICAgLnNldERlc2MoJ1RoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHBlciBsaW5lIChkZWZhdWx0IDQwKScpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignNDAnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MubGluZVdpZHRoIHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpbmVXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQm9keSBmb250IHNpemUnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgdGhlIG1haW4gdGV4dCAoZGVmYXVsdCAxNiknKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJzE2JylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHROb3JtYWwgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dE5vcm1hbCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnU2lkZWJhciBmb250IHNpemUnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgdGV4dCBpbiB0aGUgc2lkZWJhcnMgKGRlZmF1bHQgMTMpJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcxMycpXHJcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0U21hbGwgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dFNtYWxsID0gcGFyc2VJbnQodmFsdWUudHJpbSgpKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2JyJyk7XHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnKTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycsIHt0ZXh0OiAnQ3VzdG9tIGZvbnRzJ30pO1xyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7dGV4dDogJ1RoZXNlIHNldHRpbmdzIG92ZXJyaWRlIHRoZSBkcm9wZG93bnMgYWJvdmUuIE1ha2Ugc3VyZSB0byB1c2UgdGhlIGV4YWN0IG5hbWUgb2YgdGhlIGZvbnQgYXMgaXQgYXBwZWFycyBvbiB5b3VyIHN5c3RlbS4nfSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdDdXN0b20gdGV4dCBmb250JylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgaW4gcHJldmlldyBtb2RlJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dEZvbnQgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dEZvbnQgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdDdXN0b20gZWRpdG9yIGZvbnQnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBpbiBlZGl0IG1vZGUnKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJycpXHJcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lZGl0b3JGb250IHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVkaXRvckZvbnQgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdDdXN0b20gbW9ub3NwYWNlIGZvbnQnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgY29kZSBibG9ja3MsIGZyb250IG1hdHRlciwgZXRjJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9ub0ZvbnQgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubW9ub0ZvbnQgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiUGx1Z2luIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQXVDRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDekYsb0JBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN2RixvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDM0MsYUFBYTtBQUNiLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNsRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDekYsS0FBSztBQUNMOzs7SUNyRzBDLGdDQUFNO0lBQWhEOztLQW9QQztJQWpQTyw2QkFBTSxHQUFaOzs7Ozs7O3dCQUVBLEtBQUEsSUFBSSxDQUFBO3dCQUFZLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXJDLEdBQUssUUFBUSxHQUFHLENBQUEsU0FBcUIsS0FBSSxJQUFJLGVBQWUsRUFBRSxDQUFDO3dCQUUvRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUUxRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7d0JBSVosS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQzt3QkFFMUQsUUFBUSxHQUFHOzRCQUNiLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQ0FDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dDQUNoQyxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7NkJBRXZCO2lDQUFNO2dDQUNMLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQ0FDakMsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7NkJBQ3hCO3lCQUNGLENBQUE7d0JBQ0QsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQzs7d0JBSTNDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBTSxPQUFBLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUEsQ0FBQyxDQUFDO3dCQUU3RCxXQUFXLEdBQUcsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsd0JBQXdCLEVBQUUscUJBQXFCLENBQUMsQ0FBQzt3QkFDeEcsVUFBVSxHQUFHLENBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDLENBQUM7d0JBQzFFLEtBQUssR0FBRyxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFFNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixFQUFFLEVBQUUsMkJBQTJCOzRCQUMvQixJQUFJLEVBQUUsZ0NBQWdDOzRCQUN0QyxRQUFRLEVBQUU7Z0NBQ1IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7Z0NBQzVHLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUM3QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7NkJBQ3hCO3lCQUNGLENBQUMsQ0FBQzt3QkFFTCxJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNaLEVBQUUsRUFBRSw0QkFBNEI7NEJBQ2hDLElBQUksRUFBRSxpQ0FBaUM7NEJBQ3ZDLFFBQVEsRUFBRTtnQ0FDUixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQ0FDakgsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzZCQUN6Qjt5QkFDRixDQUFDLENBQUM7d0JBRUwsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixFQUFFLEVBQUUsdUJBQXVCOzRCQUMzQixJQUFJLEVBQUUsd0JBQXdCOzRCQUM5QixRQUFRLEVBQUU7Z0NBQ1IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztnQ0FDM0QsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzdCLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzs2QkFDaEI7eUJBQ0YsQ0FBQyxDQUFDO3dCQUVMLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ1osRUFBRSxFQUFFLHVCQUF1Qjs0QkFDM0IsSUFBSSxFQUFFLG9DQUFvQzs0QkFDMUMsUUFBUSxFQUFFO2dDQUNSLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dDQUNyRixLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDN0IsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOzZCQUNwQjt5QkFDRixDQUFDLENBQUM7d0JBR0wsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixFQUFFLEVBQUUsOEJBQThCOzRCQUNsQyxJQUFJLEVBQUUsMEJBQTBCOzRCQUNoQyxRQUFRLEVBQUU7Z0NBQ1IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDO2dDQUMzQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDN0IsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7NkJBQ3pCO3lCQUNGLENBQUMsQ0FBQzt3QkFFTCxJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNaLEVBQUUsRUFBRSw0QkFBNEI7NEJBQ2hDLElBQUksRUFBRSw0QkFBNEI7NEJBQ2xDLFFBQVEsRUFBRTtnQ0FDUixLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxxQkFBcUIsQ0FBQztnQ0FDakQsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzdCLEtBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDOzZCQUN6Qjt5QkFDRixDQUFDLENBQUM7d0JBRUwsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDWixFQUFFLEVBQUUsNEJBQTRCOzRCQUNoQyxJQUFJLEVBQUUsK0JBQStCOzRCQUNyQyxRQUFRLEVBQUU7Z0NBQ1IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUM7Z0NBQ2pELEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUM3QixLQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs2QkFDekI7eUJBQ0YsQ0FBQyxDQUFDO3dCQUVMLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ1osRUFBRSxFQUFFLCtCQUErQjs0QkFDbkMsSUFBSSxFQUFFLGdDQUFnQzs0QkFDdEMsUUFBUSxFQUFFO2dDQUNSLEtBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLHdCQUF3QixDQUFDO2dDQUNwRCxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDN0IsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7NkJBQ3pCO3lCQUNGLENBQUMsQ0FBQzt3QkFFTCxJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNaLEVBQUUsRUFBRSw2QkFBNkI7NEJBQ2pDLElBQUksRUFBRSx5QkFBeUI7NEJBQy9CLFFBQVEsRUFBRTtnQ0FDUixLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7Z0NBQ3pDLEtBQUksQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dDQUM3QixLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7NkJBQ3hCO3lCQUNGLENBQUMsQ0FBQzt3QkFFTCxJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNaLEVBQUUsRUFBRSwyQkFBMkI7NEJBQy9CLElBQUksRUFBRSw4QkFBOEI7NEJBQ3BDLFFBQVEsRUFBRTtnQ0FDUixLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztnQ0FDL0MsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Z0NBQzdCLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs2QkFDeEI7eUJBQ0YsQ0FBQyxDQUFDO3dCQUVMLElBQUksQ0FBQyxVQUFVLENBQUM7NEJBQ1osRUFBRSxFQUFFLDJCQUEyQjs0QkFDL0IsSUFBSSxFQUFFLDRCQUE0Qjs0QkFDbEMsUUFBUSxFQUFFO2dDQUNSLEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO2dDQUMvQyxLQUFJLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQ0FDN0IsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOzZCQUN4Qjt5QkFDRixDQUFDLENBQUM7d0JBR0wsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO3dCQUVkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUU7NEJBQ2hDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3lCQUMxQjs7Ozs7S0FFRjs7SUFHQyw4QkFBTyxHQUFQOztRQUVFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTtLQUNuQjs7SUFHRCwrQkFBUSxHQUFSOztRQUVFLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxlQUFlLENBQUM7UUFDekIsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7UUFHMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDOztRQUc3QyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEI7O0lBR0Qsa0NBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3RSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDMUUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2hGLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFHN0UsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsRUFBRTtZQUFFLE1BQU0sa0NBQWtDLENBQUM7YUFDN0M7O1lBRUgsRUFBRSxDQUFDLFNBQVMsR0FBRyw0REFFSyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsb0NBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxvQ0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLHlDQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsNEJBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxtQ0FDZixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsZ0NBQzNCLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxnQ0FDdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLGdCQUN2QyxDQUFDO1NBQ0g7S0FDRjtJQUVELHdDQUFpQixHQUFqQjtRQUNHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBaUIsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUN0STtJQUVELHlDQUFrQixHQUFsQjtRQUNFLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtRQUVqRyxJQUFHLFVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBQztZQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO1NBRXZCO2FBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUE7U0FDeEI7S0FDSjtJQUVELHNDQUFlLEdBQWY7UUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUMsY0FBYyxFQUFDLG9CQUFvQixFQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDbEcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQzFDO0lBRUQsdUNBQWdCLEdBQWhCO1FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFDLGVBQWUsRUFBQyxxQkFBcUIsRUFBQyx3QkFBd0IsRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdILFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMxQztJQUVELGtDQUFXLEdBQVg7UUFDRSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDMUM7SUFFRCxrQ0FBVyxHQUFYO1FBQ0UsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLHdCQUF3QixFQUFDLHFCQUFxQixFQUFDLGNBQWMsRUFBQyxvQkFBb0IsRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pLLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUU7SUFFSCxtQkFBQztBQUFELENBcFBBLENBQTBDQSxlQUFNLEdBb1AvQztBQUVEO0lBQUE7UUFDRSxVQUFLLEdBQVcsYUFBYSxDQUFDO1FBQzlCLGNBQVMsR0FBVyxHQUFHLENBQUM7UUFDeEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixlQUFVLEdBQVcsZUFBZSxDQUFDO1FBQ3JDLGNBQVMsR0FBVyxjQUFjLENBQUM7UUFDbkMsYUFBUSxHQUFXLDZHQUE2RyxDQUFDO1FBQ2pJLGVBQVUsR0FBVyw2R0FBNkcsQ0FBQztRQUNuSSxhQUFRLEdBQVcscURBQXFELENBQUM7UUFDekUsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsZ0JBQVcsR0FBWSxJQUFJLENBQUM7UUFDNUIsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFDeEIsY0FBUyxHQUFXLEVBQUUsQ0FBQztRQUN2QixzQkFBaUIsR0FBWSxJQUFJLENBQUM7UUFDbEMsc0JBQWlCLEdBQVksSUFBSSxDQUFDO1FBQ2xDLG1CQUFjLEdBQVksS0FBSyxDQUFDO0tBQ2pDO0lBQUQsc0JBQUM7QUFBRCxDQUFDLElBQUE7QUFFRDtJQUFnQyxxQ0FBZ0I7SUFJOUMsMkJBQVksR0FBUSxFQUFFLE1BQW9CO1FBQTFDLFlBQ0Usa0JBQU0sR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUVuQjtRQURDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztLQUN0QjtJQUVELG1DQUFPLEdBQVA7UUFBQSxpQkFrUUM7UUFqUU0sSUFBQSxXQUFXLEdBQUksSUFBSSxZQUFSLENBQVM7UUFFekIsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3BCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFDLENBQUMsQ0FBQztRQUM3RCxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSxvTEFBb0wsRUFBQyxDQUFDLENBQUM7UUFDeE4sV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO1FBQ3BELFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFHekIsSUFBSUMsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGtCQUFrQixDQUFDO2FBQzNCLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNO2FBQ3RCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUNwQixRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQzFDLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLHlCQUF5QixDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNO2FBQ3RCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUNwQixRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQzFDLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVYsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGNBQWMsQ0FBQzthQUN2QixPQUFPLENBQUMsOENBQThDLENBQUM7YUFDdkQsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUM7YUFDakUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCLENBQUMsR0FBQSxDQUNILENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsaURBQWlELENBQUM7YUFDMUQsT0FBTyxDQUFDLDhEQUE4RCxDQUFDO2FBQ3ZFLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDO2FBQ3BFLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzVDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1NBQ2hDLENBQUMsR0FBQSxDQUNILENBQUM7UUFFTixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsa0JBQWtCLENBQUM7YUFDM0IsT0FBTyxDQUFDLGlDQUFpQyxDQUFDO2FBQzFDLFdBQVcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVE7YUFDOUIsU0FBUyxDQUFDLGVBQWUsRUFBQyxTQUFTLENBQUM7YUFDcEMsU0FBUyxDQUFDLHFCQUFxQixFQUFDLFdBQVcsQ0FBQzthQUM1QyxTQUFTLENBQUMscUJBQXFCLEVBQUMsY0FBYyxDQUFDO2FBQy9DLFNBQVMsQ0FBQyx3QkFBd0IsRUFBQyxlQUFlLENBQUM7YUFDbkQsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUMzQyxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDM0IsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVOLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixPQUFPLENBQUMsZ0NBQWdDLENBQUM7YUFDekMsV0FBVyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUTthQUM5QixTQUFTLENBQUMsY0FBYyxFQUFDLFNBQVMsQ0FBQzthQUNuQyxTQUFTLENBQUMsb0JBQW9CLEVBQUMsY0FBYyxDQUFDO2FBQzlDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBQyxZQUFZLENBQUM7YUFDNUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUN4QyxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDM0IsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQzthQUNqQyxPQUFPLENBQUMsOEJBQThCLENBQUM7YUFDdkMsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7YUFDckUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFVixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQywwRUFBMEUsQ0FBQzthQUNuRixTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUMvRCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckIsQ0FBQyxHQUFBLENBQ0gsQ0FBQztRQUVOLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxXQUFXLENBQUM7YUFDcEIsT0FBTyxDQUFDLHlFQUF5RSxDQUFDO2FBQ2xGLFdBQVcsQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVE7YUFDOUIsU0FBUyxDQUFDLDZHQUE2RyxFQUFDLGFBQWEsQ0FBQzthQUN0SSxTQUFTLENBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQzthQUMxQixTQUFTLENBQUMsa0JBQWtCLEVBQUMsU0FBUyxDQUFDO2FBQ3ZDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBQyxRQUFRLENBQUM7YUFDckMsU0FBUyxDQUFDLHFCQUFxQixFQUFDLFlBQVksQ0FBQzthQUM3QyxTQUFTLENBQUMsZ0JBQWdCLEVBQUMsU0FBUyxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxVQUFVLEVBQUMsVUFBVSxDQUFDO2FBQ2hDLFNBQVMsQ0FBQyxhQUFhLEVBQUMsYUFBYSxDQUFDO2FBQ3RDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDckMsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUNILENBQUM7UUFFTixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUM1QixXQUFXLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRO2FBQzlCLFNBQVMsQ0FBQyw2R0FBNkcsRUFBQyxhQUFhLENBQUM7YUFDdEksU0FBUyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQUM7YUFDMUIsU0FBUyxDQUFDLGtCQUFrQixFQUFDLFNBQVMsQ0FBQzthQUN2QyxTQUFTLENBQUMsaUJBQWlCLEVBQUMsUUFBUSxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBQyxZQUFZLENBQUM7YUFDN0MsU0FBUyxDQUFDLGdCQUFnQixFQUFDLFNBQVMsQ0FBQzthQUNyQyxTQUFTLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQzthQUNoQyxTQUFTLENBQUMsYUFBYSxFQUFDLGFBQWEsQ0FBQzthQUN0QyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO2FBQ3ZDLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FDSCxDQUFDO1FBRU4sSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2FBQ3pCLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQzthQUNsRCxXQUFXLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRO2FBQzlCLFNBQVMsQ0FBQyxxREFBcUQsRUFBQyxhQUFhLENBQUM7YUFDOUUsU0FBUyxDQUFDLGtCQUFrQixFQUFDLFNBQVMsQ0FBQzthQUN2QyxTQUFTLENBQUMsaUJBQWlCLEVBQUMsUUFBUSxDQUFDO2FBQ3JDLFNBQVMsQ0FBQyxxQkFBcUIsRUFBQyxZQUFZLENBQUM7YUFDN0MsU0FBUyxDQUFDLGdCQUFnQixFQUFDLFNBQVMsQ0FBQzthQUNyQyxTQUFTLENBQUMsVUFBVSxFQUFDLFVBQVUsQ0FBQzthQUNoQyxTQUFTLENBQUMsYUFBYSxFQUFDLGFBQWEsQ0FBQzthQUN0QyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ3JDLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FDSCxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLDBCQUEwQixDQUFDO2FBQ25DLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQzthQUM1QyxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDO2FBQ3ZFLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7WUFDL0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3JCLENBQUMsR0FBQSxDQUNILENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsMEJBQTBCLENBQUM7YUFDbkMsT0FBTyxDQUFDLG1DQUFtQyxDQUFDO2FBQzVDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUM7YUFDdkUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMvQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckIsQ0FBQyxHQUFBLENBQ0gsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxZQUFZLENBQUM7YUFDckIsT0FBTyxDQUFDLHdEQUF3RCxDQUFDO2FBQ2pFLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDO2FBQ3ZDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3JELFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3hELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGdCQUFnQixDQUFDO2FBQ3pCLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQzthQUM5QyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQzthQUN2QyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUN0RCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN6RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQzthQUM1QixPQUFPLENBQUMsNENBQTRDLENBQUM7YUFDckQsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7YUFDdkMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDckQsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDeEQsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUMsQ0FBQztRQUNuRCxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBRSx3SEFBd0gsRUFBQyxDQUFDLENBQUM7UUFFNUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGtCQUFrQixDQUFDO2FBQzNCLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQzthQUMvQixPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQzthQUNyQyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNwRCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQzthQUM3QixPQUFPLENBQUMsbUJBQW1CLENBQUM7YUFDNUIsT0FBTyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUM7YUFDckMsUUFBUSxDQUFDLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7YUFDdEQsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDeEMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsdUJBQXVCLENBQUM7YUFDaEMsT0FBTyxDQUFDLHlDQUF5QyxDQUFDO2FBQ2xELE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDO2FBQ3JDLFFBQVEsQ0FBQyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3BELFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO0tBRVQ7SUFDSCx3QkFBQztBQUFELENBNVFBLENBQWdDQyx5QkFBZ0I7Ozs7In0=
