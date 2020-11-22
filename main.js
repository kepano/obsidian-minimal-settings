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
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // refresh function for when we change settings
        _this.refresh = function () {
            // re-load the style
            _this.updateStyle();
        };
        // add the styling elements we need
        _this.addStyle = function () {
            // add a css block for our settings-dependent styles
            var css = document.createElement('style');
            css.id = 'minimal-theme';
            document.getElementsByTagName("head")[0].appendChild(css);
            // add the main class
            document.body.classList.add('minimal-theme');
            // update the style with the settings-dependent styles
            _this.updateStyle();
        };
        // update the styles (at the start, or as the result of a settings change)
        _this.updateStyle = function () {
            _this.removeStyle();
            document.body.classList.toggle('borders-none', !_this.settings.bordersToggle);
            document.body.classList.toggle('fancy-cursor', _this.settings.fancyCursor);
            document.body.classList.toggle('focus-mode', _this.settings.focusMode);
            document.body.classList.toggle('links-int-on', _this.settings.underlineInternal);
            document.body.classList.toggle('links-ext-on', _this.settings.underlineExternal);
            document.body.classList.toggle('system-shade', _this.settings.useSystemTheme);
            // get the custom css element
            var el = document.getElementById('minimal-theme');
            if (!el)
                throw "minimal-theme element not found!";
            else {
                // set the settings-dependent css
                el.innerText = "\n        body.minimal-theme{\n          --font-normal:" + _this.settings.textNormal + "px;\n          --font-small:" + _this.settings.textSmall + "px;\n          --line-width:" + _this.settings.lineWidth + "rem;\n          --font-monospace:" + _this.settings.monoFont + ";\n          --text:" + _this.settings.textFont + ";\n          --text-editor:" + _this.settings.editorFont + ";\n          --accent-h:" + _this.settings.accentHue + ";\n          --accent-s:" + _this.settings.accentSat + "%;}\n      ";
            }
        };
        _this.enableSystemTheme = function () {
            _this.app.workspace.layoutReady ? _this.refreshSystemTheme() : _this.app.workspace.on('layout-ready', _this.refreshSystemTheme);
        };
        _this.refreshSystemTheme = function () {
            var isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isDarkMode && _this.settings.useSystemTheme) {
                console.log('Dark mode active');
                _this.updateDarkStyle();
            }
            else if (_this.settings.useSystemTheme) {
                console.log('Light mode active');
                _this.updateLightStyle();
            }
        };
        _this.updateDarkStyle = function () {
            document.body.removeClass('theme-light', 'minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black');
            document.body.addClass('theme-dark', _this.settings.darkStyle);
            _this.app.workspace.trigger('css-change');
        };
        _this.updateLightStyle = function () {
            document.body.removeClass('theme-dark', 'minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white');
            document.body.addClass('theme-light', _this.settings.lightStyle);
            _this.app.workspace.trigger('css-change');
        };
        _this.updateTheme = function () {
            document.body.removeClass('theme-dark', 'theme-light');
            document.body.addClass(_this.settings.theme);
            _this.app.workspace.trigger('css-change');
        };
        _this.removeStyle = function () {
            document.body.removeClass('minimal-light', 'minimal-light-tonal', 'minimal-light-contrast', 'minimal-light-white', 'minimal-dark', 'minimal-dark-tonal', 'minimal-dark-black');
            document.body.addClass(_this.settings.lightStyle, _this.settings.darkStyle);
        };
        return _this;
    }
    MinimalTheme.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, lightStyles, darkStyles, theme;
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
                        // Watch for system changes to color theme 
                        window.matchMedia('(prefers-color-scheme: dark)')
                            .addEventListener('change', function (event) {
                            if (event.matches && _this.settings.useSystemTheme) {
                                console.log('Dark mode active');
                                _this.updateDarkStyle();
                            }
                            else if (_this.settings.useSystemTheme) {
                                console.log('Light mode active');
                                _this.updateLightStyle();
                            }
                        });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBXb3Jrc3BhY2UsIE1vZGFsLCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1pbmltYWxUaGVtZSBleHRlbmRzIFBsdWdpbiB7XHJcblx0c2V0dGluZ3M6IE1pbmltYWxTZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cclxuICB0aGlzLnNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpIHx8IG5ldyBNaW5pbWFsU2V0dGluZ3MoKTtcclxuXHJcblx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBNaW5pbWFsU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuICB0aGlzLmFkZFN0eWxlKCk7XHJcblxyXG4gIC8vIFdhdGNoIGZvciBzeXN0ZW0gY2hhbmdlcyB0byBjb2xvciB0aGVtZSBcclxuXHJcbiAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKVxyXG4gICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGV2ZW50ID0+IHtcclxuICAgIGlmIChldmVudC5tYXRjaGVzICYmIHRoaXMuc2V0dGluZ3MudXNlU3lzdGVtVGhlbWUpIHtcclxuICAgICAgY29uc29sZS5sb2coJ0RhcmsgbW9kZSBhY3RpdmUnKTtcclxuICAgICAgdGhpcy51cGRhdGVEYXJrU3R5bGUoKVxyXG5cclxuICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy51c2VTeXN0ZW1UaGVtZSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnTGlnaHQgbW9kZSBhY3RpdmUnKTtcclxuICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKClcclxuICAgIH1cclxuICB9KVxyXG5cclxuICBjb25zdCBsaWdodFN0eWxlcyA9IFsnbWluaW1hbC1saWdodCcsICdtaW5pbWFsLWxpZ2h0LXRvbmFsJywgJ21pbmltYWwtbGlnaHQtY29udHJhc3QnLCAnbWluaW1hbC1saWdodC13aGl0ZSddO1xyXG4gIGNvbnN0IGRhcmtTdHlsZXMgPSBbJ21pbmltYWwtZGFyaycsICdtaW5pbWFsLWRhcmstdG9uYWwnLCAnbWluaW1hbC1kYXJrLWJsYWNrJ107XHJcbiAgY29uc3QgdGhlbWUgPSBbJ3RoZW1lLWxpZ2h0JywgJ3RoZW1lLWRhcmsnXTtcclxuXHJcbiAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtbWluaW1hbC1kYXJrLWN5Y2xlJyxcclxuICAgICAgbmFtZTogJ0N5Y2xlIGJldHdlZW4gZGFyayBtb2RlIHN0eWxlcycsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSBkYXJrU3R5bGVzWyhkYXJrU3R5bGVzLmluZGV4T2YodGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUpICsgMSkgJSBkYXJrU3R5bGVzLmxlbmd0aF07XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTsgIFxyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LWN5Y2xlJyxcclxuICAgICAgbmFtZTogJ0N5Y2xlIGJldHdlZW4gbGlnaHQgbW9kZSBzdHlsZXMnLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGlnaHRTdHlsZSA9IGxpZ2h0U3R5bGVzWyhsaWdodFN0eWxlcy5pbmRleE9mKHRoaXMuc2V0dGluZ3MubGlnaHRTdHlsZSkgKyAxKSAlIGxpZ2h0U3R5bGVzLmxlbmd0aF07XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLWhpZGRlbi1ib3JkZXJzJyxcclxuICAgICAgbmFtZTogJ1RvZ2dsZSBzaWRlYmFyIGJvcmRlcnMnLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuYm9yZGVyc1RvZ2dsZSA9ICF0aGlzLnNldHRpbmdzLmJvcmRlcnNUb2dnbGU7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtc3dpdGNoJyxcclxuICAgICAgbmFtZTogJ1N3aXRjaCBiZXR3ZWVuIGxpZ2h0IGFuZCBkYXJrIG1vZGUnLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MudGhlbWUgPSB0aGVtZVsodGhlbWUuaW5kZXhPZih0aGlzLnNldHRpbmdzLnRoZW1lKSArIDEpICUgdGhlbWUubGVuZ3RoXTtcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVGhlbWUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LWRlZmF1bHQnLFxyXG4gICAgICBuYW1lOiAnVXNlIGxpZ2h0IG1vZGUgKGRlZmF1bHQpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUgPSAnbWluaW1hbC1saWdodCc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUxpZ2h0U3R5bGUoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gIHRoaXMuYWRkQ29tbWFuZCh7XHJcbiAgICAgIGlkOiAndG9nZ2xlLW1pbmltYWwtbGlnaHQtd2hpdGUnLFxyXG4gICAgICBuYW1lOiAnVXNlIGxpZ2h0IG1vZGUgKGFsbCB3aGl0ZSknLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MubGlnaHRTdHlsZSA9ICdtaW5pbWFsLWxpZ2h0LXdoaXRlJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgdGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtbWluaW1hbC1saWdodC10b25hbCcsXHJcbiAgICAgIG5hbWU6ICdVc2UgbGlnaHQgbW9kZSAobG93IGNvbnRyYXN0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gJ21pbmltYWwtbGlnaHQtdG9uYWwnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LWNvbnRyYXN0JyxcclxuICAgICAgbmFtZTogJ1VzZSBsaWdodCBtb2RlIChoaWdoIGNvbnRyYXN0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gJ21pbmltYWwtbGlnaHQtY29udHJhc3QnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstZGVmYXVsdCcsXHJcbiAgICAgIG5hbWU6ICdVc2UgZGFyayBtb2RlIChkZWZhdWx0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSAnbWluaW1hbC1kYXJrJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstdG9uYWwnLFxyXG4gICAgICBuYW1lOiAnVXNlIGRhcmsgbW9kZSAobG93IGNvbnRyYXN0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSAnbWluaW1hbC1kYXJrLXRvbmFsJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICB0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstYmxhY2snLFxyXG4gICAgICBuYW1lOiAnVXNlIGRhcmsgbW9kZSAodHJ1ZSBibGFjayknLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZGFya1N0eWxlID0gJ21pbmltYWwtZGFyay1ibGFjayc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG5cdHRoaXMucmVmcmVzaCgpXHJcblxyXG4gIGlmICh0aGlzLnNldHRpbmdzLnVzZVN5c3RlbVRoZW1lKSB7XHJcbiAgICB0aGlzLmVuYWJsZVN5c3RlbVRoZW1lKCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuXHQvLyByZWZyZXNoIGZ1bmN0aW9uIGZvciB3aGVuIHdlIGNoYW5nZSBzZXR0aW5nc1xyXG4gIHJlZnJlc2ggPSAoKSA9PiB7XHJcbiAgICAvLyByZS1sb2FkIHRoZSBzdHlsZVxyXG4gICAgdGhpcy51cGRhdGVTdHlsZSgpXHJcbiAgfVxyXG5cclxuICAvLyBhZGQgdGhlIHN0eWxpbmcgZWxlbWVudHMgd2UgbmVlZFxyXG4gIGFkZFN0eWxlID0gKCkgPT4ge1xyXG4gICAgLy8gYWRkIGEgY3NzIGJsb2NrIGZvciBvdXIgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xyXG4gICAgY29uc3QgY3NzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcclxuICAgIGNzcy5pZCA9ICdtaW5pbWFsLXRoZW1lJztcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChjc3MpO1xyXG5cclxuICAgIC8vIGFkZCB0aGUgbWFpbiBjbGFzc1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdtaW5pbWFsLXRoZW1lJyk7XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBzdHlsZSB3aXRoIHRoZSBzZXR0aW5ncy1kZXBlbmRlbnQgc3R5bGVzXHJcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XHJcbiAgfVxyXG5cclxuICAvLyB1cGRhdGUgdGhlIHN0eWxlcyAoYXQgdGhlIHN0YXJ0LCBvciBhcyB0aGUgcmVzdWx0IG9mIGEgc2V0dGluZ3MgY2hhbmdlKVxyXG4gIHVwZGF0ZVN0eWxlID0gKCkgPT4ge1xyXG4gIFx0dGhpcy5yZW1vdmVTdHlsZSgpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdib3JkZXJzLW5vbmUnLCAhdGhpcy5zZXR0aW5ncy5ib3JkZXJzVG9nZ2xlKTtcclxuICBcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZmFuY3ktY3Vyc29yJywgdGhpcy5zZXR0aW5ncy5mYW5jeUN1cnNvcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2ZvY3VzLW1vZGUnLCB0aGlzLnNldHRpbmdzLmZvY3VzTW9kZSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xpbmtzLWludC1vbicsIHRoaXMuc2V0dGluZ3MudW5kZXJsaW5lSW50ZXJuYWwpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rcy1leHQtb24nLCB0aGlzLnNldHRpbmdzLnVuZGVybGluZUV4dGVybmFsKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnc3lzdGVtLXNoYWRlJywgdGhpcy5zZXR0aW5ncy51c2VTeXN0ZW1UaGVtZSk7XHJcblxyXG4gICAgLy8gZ2V0IHRoZSBjdXN0b20gY3NzIGVsZW1lbnRcclxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmltYWwtdGhlbWUnKTtcclxuICAgIGlmICghZWwpIHRocm93IFwibWluaW1hbC10aGVtZSBlbGVtZW50IG5vdCBmb3VuZCFcIjtcclxuICAgIGVsc2Uge1xyXG4gICAgICAvLyBzZXQgdGhlIHNldHRpbmdzLWRlcGVuZGVudCBjc3NcclxuICAgICAgZWwuaW5uZXJUZXh0ID0gYFxyXG4gICAgICAgIGJvZHkubWluaW1hbC10aGVtZXtcclxuICAgICAgICAgIC0tZm9udC1ub3JtYWw6JHt0aGlzLnNldHRpbmdzLnRleHROb3JtYWx9cHg7XHJcbiAgICAgICAgICAtLWZvbnQtc21hbGw6JHt0aGlzLnNldHRpbmdzLnRleHRTbWFsbH1weDtcclxuICAgICAgICAgIC0tbGluZS13aWR0aDoke3RoaXMuc2V0dGluZ3MubGluZVdpZHRofXJlbTtcclxuICAgICAgICAgIC0tZm9udC1tb25vc3BhY2U6JHt0aGlzLnNldHRpbmdzLm1vbm9Gb250fTtcclxuICAgICAgICAgIC0tdGV4dDoke3RoaXMuc2V0dGluZ3MudGV4dEZvbnR9O1xyXG4gICAgICAgICAgLS10ZXh0LWVkaXRvcjoke3RoaXMuc2V0dGluZ3MuZWRpdG9yRm9udH07XHJcbiAgICAgICAgICAtLWFjY2VudC1oOiR7dGhpcy5zZXR0aW5ncy5hY2NlbnRIdWV9O1xyXG4gICAgICAgICAgLS1hY2NlbnQtczoke3RoaXMuc2V0dGluZ3MuYWNjZW50U2F0fSU7fVxyXG4gICAgICBgO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW5hYmxlU3lzdGVtVGhlbWUgPSAoKSA9PiB7XHJcbiAgICAodGhpcy5hcHAud29ya3NwYWNlIGFzIGFueSkubGF5b3V0UmVhZHkgPyB0aGlzLnJlZnJlc2hTeXN0ZW1UaGVtZSgpIDogdGhpcy5hcHAud29ya3NwYWNlLm9uKCdsYXlvdXQtcmVhZHknLCB0aGlzLnJlZnJlc2hTeXN0ZW1UaGVtZSk7XHJcbiAgfVxyXG5cclxuICByZWZyZXNoU3lzdGVtVGhlbWUgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBpc0RhcmtNb2RlID0gd2luZG93Lm1hdGNoTWVkaWEgJiYgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXHJcblxyXG4gICAgaWYoaXNEYXJrTW9kZSAmJiB0aGlzLnNldHRpbmdzLnVzZVN5c3RlbVRoZW1lKXtcclxuICAgICAgICBjb25zb2xlLmxvZygnRGFyayBtb2RlIGFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKClcclxuXHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zZXR0aW5ncy51c2VTeXN0ZW1UaGVtZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdMaWdodCBtb2RlIGFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlTGlnaHRTdHlsZSgpXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZURhcmtTdHlsZSA9ICgpID0+IHtcclxuICBcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2xhc3MoJ3RoZW1lLWxpZ2h0JywnbWluaW1hbC1kYXJrJywnbWluaW1hbC1kYXJrLXRvbmFsJywnbWluaW1hbC1kYXJrLWJsYWNrJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZENsYXNzKCd0aGVtZS1kYXJrJyx0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSk7XHJcbiAgICB0aGlzLmFwcC53b3Jrc3BhY2UudHJpZ2dlcignY3NzLWNoYW5nZScpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlTGlnaHRTdHlsZSA9ICgpID0+IHtcclxuICBcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2xhc3MoJ3RoZW1lLWRhcmsnLCdtaW5pbWFsLWxpZ2h0JywnbWluaW1hbC1saWdodC10b25hbCcsJ21pbmltYWwtbGlnaHQtY29udHJhc3QnLCdtaW5pbWFsLWxpZ2h0LXdoaXRlJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFkZENsYXNzKCd0aGVtZS1saWdodCcsdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKCdjc3MtY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVUaGVtZSA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2xhc3MoJ3RoZW1lLWRhcmsnLCd0aGVtZS1saWdodCcpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hZGRDbGFzcyh0aGlzLnNldHRpbmdzLnRoZW1lKTtcclxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS50cmlnZ2VyKCdjc3MtY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICByZW1vdmVTdHlsZSA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2xhc3MoJ21pbmltYWwtbGlnaHQnLCdtaW5pbWFsLWxpZ2h0LXRvbmFsJywnbWluaW1hbC1saWdodC1jb250cmFzdCcsJ21pbmltYWwtbGlnaHQtd2hpdGUnLCdtaW5pbWFsLWRhcmsnLCdtaW5pbWFsLWRhcmstdG9uYWwnLCdtaW5pbWFsLWRhcmstYmxhY2snKTtcclxuICAgIGRvY3VtZW50LmJvZHkuYWRkQ2xhc3ModGhpcy5zZXR0aW5ncy5saWdodFN0eWxlLHRoaXMuc2V0dGluZ3MuZGFya1N0eWxlKTtcclxuICB9XHJcblxyXG59XHJcblxyXG5jbGFzcyBNaW5pbWFsU2V0dGluZ3Mge1xyXG4gIHRoZW1lOiBzdHJpbmcgPSAndGhlbWUtbGlnaHQnO1xyXG4gIGFjY2VudEh1ZTogbnVtYmVyID0gMjAxO1xyXG4gIGFjY2VudFNhdDogbnVtYmVyID0gMTc7XHJcbiAgbGlnaHRTdHlsZTogc3RyaW5nID0gJ21pbmltYWwtbGlnaHQnO1xyXG4gIGRhcmtTdHlsZTogc3RyaW5nID0gJ21pbmltYWwtZGFyayc7XHJcbiAgdGV4dEZvbnQ6IHN0cmluZyA9ICctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnO1xyXG4gIGVkaXRvckZvbnQ6IHN0cmluZyA9ICctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnO1xyXG4gIG1vbm9Gb250OiBzdHJpbmcgPSAnTWVubG8sU0ZNb25vLVJlZ3VsYXIsQ29uc29sYXMsUm9ib3RvIE1vbm8sbW9ub3NwYWNlJztcclxuICBib3JkZXJzVG9nZ2xlOiBib29sZWFuID0gdHJ1ZTtcclxuICBmYW5jeUN1cnNvcjogYm9vbGVhbiA9IHRydWU7XHJcbiAgZm9jdXNNb2RlOiBib29sZWFuID0gdHJ1ZTtcclxuICBsaW5lV2lkdGg6IG51bWJlciA9IDQwO1xyXG4gIHRleHROb3JtYWw6IG51bWJlciA9IDE2O1xyXG4gIHRleHRTbWFsbDogbnVtYmVyID0gMTM7XHJcbiAgdW5kZXJsaW5lSW50ZXJuYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHVuZGVybGluZUV4dGVybmFsOiBib29sZWFuID0gdHJ1ZTtcclxuICB1c2VTeXN0ZW1UaGVtZTogYm9vbGVhbiA9IGZhbHNlO1xyXG59XHJcblxyXG5jbGFzcyBNaW5pbWFsU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xyXG5cclxuXHJcblx0cGx1Z2luOiBNaW5pbWFsVGhlbWU7XHJcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTWluaW1hbFRoZW1lKSB7XHJcbiAgICBzdXBlcihhcHAsIHBsdWdpbik7XHJcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcclxuXHR9XHJcblxyXG5cdGRpc3BsYXkoKTogdm9pZCB7XHJcblx0XHRsZXQge2NvbnRhaW5lckVsfSA9IHRoaXM7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycsIHt0ZXh0OiAnTWluaW1hbCBUaGVtZSBTZXR0aW5ncyd9KTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge3RleHQ6ICdJZiB5b3Ugbm90aWNlIGFueSBpc3N1ZXMsIHVwZGF0ZSB0byB0aGUgbGF0ZXN0IHZlcnNpb24gb2YgTWluaW1hbCBUaGVtZSBhbmQgcmVsb2FkIE9ic2lkaWFuLiBEb3dubG9hZCB0aGUgSGlkZXIgcGx1Z2luIGZvciBhZGRpdGlvbmFsIG9wdGlvbnMgdG8gZnVydGhlciBzaW1wbGlmeSB0aGUgT2JzaWRpYW4gVUkuJ30pO1xyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2EnLCB7dGV4dDogJ+KspCBBY2NlbnQgY29sb3InfSk7XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnKTtcclxuXHJcblxyXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0XHQuc2V0TmFtZSgnQWNjZW50IGNvbG9yIGh1ZScpXHJcblx0ICAgICAgLnNldERlc2MoJ0ZvciBsaW5rcyBhbmQgaW50ZXJhY3RpdmUgZWxlbWVudHMnKVxyXG5cdFx0ICAgIC5hZGRTbGlkZXIoc2xpZGVyID0+IHNsaWRlclxyXG5cdFx0ICAgICAgICAuc2V0TGltaXRzKDAsIDM2MCwgMSlcclxuXHRcdCAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmFjY2VudEh1ZSlcclxuXHQgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuYWNjZW50SHVlID0gdmFsdWU7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG5cdCAgICAgICAgfSkpO1xyXG5cclxuXHRcdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0XHRcdFx0LnNldE5hbWUoJ0FjY2VudCBjb2xvciBzYXR1cmF0aW9uJylcclxuXHQgICAgICAuc2V0RGVzYygnRm9yIGxpbmtzIGFuZCBpbnRlcmFjdGl2ZSBlbGVtZW50cycpXHJcblx0XHQgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4gc2xpZGVyXHJcblx0XHQgICAgICAgIC5zZXRMaW1pdHMoMCwgMTAwLCAxKVxyXG5cdFx0ICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWNjZW50U2F0KVxyXG5cdCAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY2NlbnRTYXQgPSB2YWx1ZTtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcblx0ICAgICAgICB9KSk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICBcdC5zZXROYW1lKCdGYW5jeSBjdXJzb3InKVxyXG4gICAgXHQuc2V0RGVzYygnVGhlIGVkaXRvciBjdXJzb3IgdGFrZXMgb24geW91ciBhY2NlbnQgY29sb3InKVxyXG4gICAgXHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZmFuY3lDdXJzb3IpXHJcblx0ICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmZhbmN5Q3Vyc29yID0gdmFsdWU7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG5cdCAgICAgICAgXHR9KVxyXG5cdCAgICAgIFx0KTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoJ1VzZSBzeXN0ZW0tbGV2ZWwgc2V0dGluZyBmb3IgbGlnaHQgb3IgZGFyayBtb2RlJylcclxuICAgICAgLnNldERlc2MoJ0F1dG9tYXRpY2FsbHkgc3dpdGNoIGJhc2VkIG9uIHlvdXIgb3BlcmF0aW5nIHN5c3RlbSBzZXR0aW5ncycpXHJcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51c2VTeXN0ZW1UaGVtZSlcclxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudXNlU3lzdGVtVGhlbWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoU3lzdGVtVGhlbWUoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG5cdCAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHQgICAgXHQuc2V0TmFtZSgnTGlnaHQgbW9kZSBzdHlsZScpXHJcblx0ICAgIFx0LnNldERlc2MoJ0JhY2tncm91bmQgY29sb3JzIGluIGxpZ2h0IG1vZGUnKVxyXG5cdCAgICBcdC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignbWluaW1hbC1saWdodCcsJ0RlZmF1bHQnKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignbWluaW1hbC1saWdodC13aGl0ZScsJ0FsbCB3aGl0ZScpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWxpZ2h0LXRvbmFsJywnTG93IGNvbnRyYXN0JylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ21pbmltYWwtbGlnaHQtY29udHJhc3QnLCdIaWdoIGNvbnRyYXN0JylcclxuXHQgICAgXHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5saWdodFN0eWxlKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpZ2h0U3R5bGUgPSB2YWx1ZTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlbW92ZVN0eWxlKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuXHQgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0ICAgIFx0LnNldE5hbWUoJ0RhcmsgbW9kZSBzdHlsZScpXHJcblx0ICAgIFx0LnNldERlc2MoJ0JhY2tncm91bmQgY29sb3JzIGluIGRhcmsgbW9kZScpXHJcblx0ICAgIFx0LmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWRhcmsnLCdEZWZhdWx0JylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ21pbmltYWwtZGFyay10b25hbCcsJ0xvdyBjb250cmFzdCcpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWRhcmstYmxhY2snLCdUcnVlIGJsYWNrJylcclxuXHQgICAgXHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kYXJrU3R5bGUpXHJcblx0ICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRhcmtTdHlsZSA9IHZhbHVlO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnJlbW92ZVN0eWxlKCk7XHJcblx0ICAgICAgICB9KSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnVG9nZ2xlIHNpZGViYXIgYm9yZGVycycpXHJcbiAgICAgICAgLnNldERlc2MoJ0hpZGUgb3Igc2hvdyBzaWRlYmFyIGJvcmRlcnMnKVxyXG4gICAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5ib3JkZXJzVG9nZ2xlKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5ib3JkZXJzVG9nZ2xlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG4gICAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnRm9jdXMgbW9kZScpXHJcbiAgICAgIC5zZXREZXNjKCdXaGVuIHNpZGViYXJzIGFyZSBjb2xsYXBzZWQgaGlkZSBhY3Rpb24gYnV0dG9ucyAoYWNjZXNzaWJsZSBieSBob3ZlcmluZyknKVxyXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZm9jdXNNb2RlKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5mb2N1c01vZGUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgICAgLnNldE5hbWUoJ1RleHQgZm9udCcpXHJcbiAgICAgICAgLnNldERlc2MoJ1VzZWQgaW4gcHJldmlldyBtb2RlIOKAlCB0aGUgZm9udCBtdXN0IGFsc28gYmUgaW5zdGFsbGVkIG9uIHlvdXIgY29tcHV0ZXInKVxyXG4gICAgICAgIC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG4gICAgICAgICAgLmFkZE9wdGlvbignLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxzYW5zLXNlcmlmJywnU3lzdGVtIGZvbnQnKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignSW50ZXInLCdJbnRlcicpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgTW9ubyBTJywnaUEgTW9ubycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgRHVvIFMnLCdpQSBEdW8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignaUEgV3JpdGVyIFF1YXR0cm8gUycsJ2lBIFF1YXR0cm8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignU0ZNb25vLVJlZ3VsYXInLCdTRiBNb25vJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ0NvbnNvbGFzJywnQ29uc29sYXMnKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignUm9ib3RvIE1vbm8nLCdSb2JvdG8gTW9ubycpXHJcbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dEZvbnQpXHJcbiAgICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0Rm9udCA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuXHQgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0ICAgIFx0LnNldE5hbWUoJ0VkaXRvciBmb250JylcclxuXHQgICAgXHQuc2V0RGVzYygnVXNlZCBpbiBlZGl0IG1vZGUnKVxyXG5cdCAgICBcdC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsXCJTZWdvZSBVSSBFbW9qaVwiLFwiU2Vnb2UgVUlcIixSb2JvdG8sT3h5Z2VuLVNhbnMsVWJ1bnR1LENhbnRhcmVsbCxzYW5zLXNlcmlmJywnU3lzdGVtIGZvbnQnKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignSW50ZXInLCdJbnRlcicpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgTW9ubyBTJywnaUEgTW9ubycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdpQSBXcml0ZXIgRHVvIFMnLCdpQSBEdW8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignaUEgV3JpdGVyIFF1YXR0cm8gUycsJ2lBIFF1YXR0cm8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignU0ZNb25vLVJlZ3VsYXInLCdTRiBNb25vJylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ0NvbnNvbGFzJywnQ29uc29sYXMnKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignUm9ib3RvIE1vbm8nLCdSb2JvdG8gTW9ubycpXHJcblx0ICAgIFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuZWRpdG9yRm9udClcclxuXHRcdCAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmVkaXRvckZvbnQgPSB2YWx1ZTtcclxuXHRcdCAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0XHQgICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG5cdFx0ICAgICAgICB9KVxyXG5cdCAgICAgICAgKTtcclxuXHJcblx0ICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdCAgICBcdC5zZXROYW1lKCdNb25vc3BhY2UgZm9udCcpXHJcblx0ICAgIFx0LnNldERlc2MoJ1VzZWQgZm9yIGNvZGUgYmxvY2tzLCBmcm9udCBtYXR0ZXIsIGV0YycpXHJcblx0ICAgIFx0LmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdNZW5sbyxTRk1vbm8tUmVndWxhcixDb25zb2xhcyxSb2JvdG8gTW9ubyxtb25vc3BhY2UnLCdTeXN0ZW0gZm9udCcpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdpQSBXcml0ZXIgTW9ubyBTJywnaUEgTW9ubycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdpQSBXcml0ZXIgRHVvIFMnLCdpQSBEdW8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignaUEgV3JpdGVyIFF1YXR0cm8gUycsJ2lBIFF1YXR0cm8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignU0ZNb25vLVJlZ3VsYXInLCdTRiBNb25vJylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ0NvbnNvbGFzJywnQ29uc29sYXMnKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignUm9ib3RvIE1vbm8nLCdSb2JvdG8gTW9ubycpXHJcblx0ICAgIFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubW9ub0ZvbnQpXHJcblx0XHQgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHRcdCAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb25vRm9udCA9IHZhbHVlO1xyXG5cdFx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdCAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcblx0XHQgICAgICAgIH0pXHJcblx0ICAgICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnVW5kZXJsaW5lIGludGVybmFsIGxpbmtzJylcclxuICAgICAgLnNldERlc2MoJ1Nob3cgdW5kZXJsaW5lcyBvbiBpbnRlcm5hbCBsaW5rcycpXHJcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVJbnRlcm5hbClcclxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5kZXJsaW5lSW50ZXJuYWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnVW5kZXJsaW5lIGV4dGVybmFsIGxpbmtzJylcclxuICAgICAgLnNldERlc2MoJ1Nob3cgdW5kZXJsaW5lcyBvbiBleHRlcm5hbCBsaW5rcycpXHJcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVFeHRlcm5hbClcclxuICAgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudW5kZXJsaW5lRXh0ZXJuYWwgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnTGluZSB3aWR0aCcpXHJcbiAgICAgIC5zZXREZXNjKCdUaGUgbWF4aW11bSBudW1iZXIgb2YgY2hhcmFjdGVycyBwZXIgbGluZSAoZGVmYXVsdCA0MCknKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJzQwJylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLmxpbmVXaWR0aCB8fCAnJykgKyAnJylcclxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5saW5lV2lkdGggPSBwYXJzZUludCh2YWx1ZS50cmltKCkpO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoJ0JvZHkgZm9udCBzaXplJylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgZm9yIHRoZSBtYWluIHRleHQgKGRlZmF1bHQgMTYpJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcxNicpXHJcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0Tm9ybWFsIHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHROb3JtYWwgPSBwYXJzZUludCh2YWx1ZS50cmltKCkpO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgLnNldE5hbWUoJ1NpZGViYXIgZm9udCBzaXplJylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgZm9yIHRleHQgaW4gdGhlIHNpZGViYXJzIChkZWZhdWx0IDEzKScpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignMTMnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dFNtYWxsIHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRTbWFsbCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdicicpO1xyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJyk7XHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ0N1c3RvbSBmb250cyd9KTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge3RleHQ6ICdUaGVzZSBzZXR0aW5ncyBvdmVycmlkZSB0aGUgZHJvcGRvd25zIGFib3ZlLiBNYWtlIHN1cmUgdG8gdXNlIHRoZSBleGFjdCBuYW1lIG9mIHRoZSBmb250IGFzIGl0IGFwcGVhcnMgb24geW91ciBzeXN0ZW0uJ30pO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIHRleHQgZm9udCcpXHJcbiAgICAgIC5zZXREZXNjKCdVc2VkIGluIHByZXZpZXcgbW9kZScpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignJylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250IHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIGVkaXRvciBmb250JylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgaW4gZWRpdCBtb2RlJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuZWRpdG9yRm9udCB8fCAnJykgKyAnJylcclxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lZGl0b3JGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIG1vbm9zcGFjZSBmb250JylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgZm9yIGNvZGUgYmxvY2tzLCBmcm9udCBtYXR0ZXIsIGV0YycpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignJylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250IHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwRCxZQUFZLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6QixnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTTtBQUM5QyxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDO0FBQ3hFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQixLQUFLLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBQ2pFLGdCQUFnQjtBQUNoQixvQkFBb0IsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRTtBQUNoSSxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUMxRyxvQkFBb0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3pGLG9CQUFvQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDdkYsb0JBQW9CLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDMUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFF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
