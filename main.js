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
            document.body.classList.toggle('fancy-cursor', _this.settings.fancyCursor);
            document.body.classList.toggle('links-int-on', _this.settings.underlineInternal);
            document.body.classList.toggle('links-ext-on', _this.settings.underlineExternal);
            // get the custom css element
            var el = document.getElementById('minimal-theme');
            if (!el)
                throw "minimal-theme element not found!";
            else {
                // set the settings-dependent css
                el.innerText = "\n        body.minimal-theme{\n          --font-normal:" + _this.settings.textNormal + "px;\n          --font-small:" + _this.settings.textSmall + "px;\n          --line-width:" + _this.settings.lineWidth + "rem;\n          --font-monospace:" + _this.settings.monoFont + ";\n          --text:" + _this.settings.textFont + ";\n          --text-editor:" + _this.settings.editorFont + ";\n          --accent-h:" + _this.settings.accentHue + ";\n          --accent-s:" + _this.settings.accentSat + "%;}\n      ";
            }
        };
        _this.updateDarkStyle = function () {
            document.body.classList.remove('theme-light');
            document.body.classList.remove('minimal-dark');
            document.body.classList.remove('minimal-dark-tonal');
            document.body.classList.remove('minimal-dark-black');
            document.body.classList.add('theme-dark');
            document.body.classList.add(_this.settings.darkStyle);
        };
        _this.updateLightStyle = function () {
            document.body.classList.remove('theme-dark');
            document.body.classList.remove('minimal-light');
            document.body.classList.remove('minimal-light-tonal');
            document.body.classList.remove('minimal-light-contrast');
            document.body.classList.add('theme-light');
            document.body.classList.add(_this.settings.lightStyle);
        };
        _this.removeStyle = function () {
            document.body.classList.remove('minimal-light');
            document.body.classList.remove('minimal-light-tonal');
            document.body.classList.remove('minimal-light-contrast');
            document.body.classList.remove('minimal-dark');
            document.body.classList.remove('minimal-dark-tonal');
            document.body.classList.remove('minimal-dark-black');
            document.body.classList.add(_this.settings.lightStyle);
            document.body.classList.add(_this.settings.darkStyle);
        };
        return _this;
    }
    MinimalTheme.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
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
                            name: 'use dark mode (default)',
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return MinimalTheme;
}(obsidian.Plugin));
var MinimalSettings = /** @class */ (function () {
    function MinimalSettings() {
        this.accentHue = 201;
        this.accentSat = 17;
        this.lightStyle = 'minimal-light';
        this.darkStyle = 'minimal-dark';
        this.textFont = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
        this.editorFont = '-apple-system,BlinkMacSystemFont,"Segoe UI Emoji","Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,sans-serif';
        this.monoFont = 'Menlo,SFMono-Regular,Consolas,Roboto Mono,monospace';
        this.fancyCursor = true;
        this.lineWidth = 40;
        this.textNormal = 16;
        this.textSmall = 13;
        this.underlineInternal = true;
        this.underlineExternal = true;
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
        containerEl.createEl('strong', { text: 'Minimal Theme Settings' });
        containerEl.createEl('p', { text: 'If you notice any issues, update to the latest version of Minimal Theme and reload Obsidian. Download the Hider plugin for additional options to further simplify the Obsidian UI.' });
        containerEl.createEl('a', { text: '⬤ Accent color' });
        containerEl.createEl('h3');
        new obsidian.Setting(containerEl)
            .setName('Accent color hue')
            .setDesc('For links and interactive elements')
            .addSlider(function (slider) { return slider
            .setLimits(0, 255, 1)
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
            .setName('Light mode background')
            .setDesc('Background colors in light mode')
            .addDropdown(function (dropdown) { return dropdown
            .addOption('minimal-light', 'Default')
            .addOption('minimal-light-tonal', 'Low contrast')
            .addOption('minimal-light-contrast', 'High contrast')
            .setValue(_this.plugin.settings.lightStyle)
            .onChange(function (value) {
            _this.plugin.settings.lightStyle = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.removeStyle();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Dark mode background')
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
        containerEl.createEl('strong', { text: 'Custom fonts' });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiaW1wb3J0IHsgQXBwLCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNaW5pbWFsVGhlbWUgZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBNaW5pbWFsU2V0dGluZ3M7XHJcblxyXG5cdGFzeW5jIG9ubG9hZCgpIHtcclxuXHJcbiAgICB0aGlzLnNldHRpbmdzID0gYXdhaXQgdGhpcy5sb2FkRGF0YSgpIHx8IG5ldyBNaW5pbWFsU2V0dGluZ3MoKTtcclxuXHJcblx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBNaW5pbWFsU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xyXG5cclxuICAgIHRoaXMuYWRkU3R5bGUoKTtcclxuXHJcblx0dGhpcy5hZGRDb21tYW5kKHtcclxuICAgICAgaWQ6ICd0b2dnbGUtbWluaW1hbC1saWdodC1kZWZhdWx0JyxcclxuICAgICAgbmFtZTogJ1VzZSBsaWdodCBtb2RlIChkZWZhdWx0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gJ21pbmltYWwtbGlnaHQnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LXRvbmFsJyxcclxuICAgICAgbmFtZTogJ1VzZSBsaWdodCBtb2RlIChsb3cgY29udHJhc3QpJyxcclxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldHRpbmdzLmxpZ2h0U3R5bGUgPSAnbWluaW1hbC1saWdodC10b25hbCc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgIFx0dGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWxpZ2h0LWNvbnRyYXN0JyxcclxuICAgICAgbmFtZTogJ1VzZSBsaWdodCBtb2RlIChoaWdoIGNvbnRyYXN0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5saWdodFN0eWxlID0gJ21pbmltYWwtbGlnaHQtY29udHJhc3QnO1xyXG4gICAgICAgIHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVMaWdodFN0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstZGVmYXVsdCcsXHJcbiAgICAgIG5hbWU6ICd1c2UgZGFyayBtb2RlIChkZWZhdWx0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSAnbWluaW1hbC1kYXJrJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstdG9uYWwnLFxyXG4gICAgICBuYW1lOiAnVXNlIGRhcmsgbW9kZSAobG93IGNvbnRyYXN0KScsXHJcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUgPSAnbWluaW1hbC1kYXJrLXRvbmFsJztcclxuICAgICAgICB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlRGFya1N0eWxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHR0aGlzLmFkZENvbW1hbmQoe1xyXG4gICAgICBpZDogJ3RvZ2dsZS1taW5pbWFsLWRhcmstYmxhY2snLFxyXG4gICAgICBuYW1lOiAnVXNlIGRhcmsgbW9kZSAodHJ1ZSBibGFjayknLFxyXG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0dGluZ3MuZGFya1N0eWxlID0gJ21pbmltYWwtZGFyay1ibGFjayc7XHJcbiAgICAgICAgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZURhcmtTdHlsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHR0aGlzLnJlZnJlc2goKVxyXG5cdH1cclxuXHJcblx0Ly8gcmVmcmVzaCBmdW5jdGlvbiBmb3Igd2hlbiB3ZSBjaGFuZ2Ugc2V0dGluZ3NcclxuICByZWZyZXNoID0gKCkgPT4ge1xyXG4gICAgLy8gcmUtbG9hZCB0aGUgc3R5bGVcclxuICAgIHRoaXMudXBkYXRlU3R5bGUoKVxyXG4gIH1cclxuXHJcbiAgLy8gYWRkIHRoZSBzdHlsaW5nIGVsZW1lbnRzIHdlIG5lZWRcclxuICBhZGRTdHlsZSA9ICgpID0+IHtcclxuICAgIC8vIGFkZCBhIGNzcyBibG9jayBmb3Igb3VyIHNldHRpbmdzLWRlcGVuZGVudCBzdHlsZXNcclxuICAgIGNvbnN0IGNzcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XHJcbiAgICBjc3MuaWQgPSAnbWluaW1hbC10aGVtZSc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQoY3NzKTtcclxuXHJcbiAgICAvLyBhZGQgdGhlIG1haW4gY2xhc3NcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbWluaW1hbC10aGVtZScpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSB0aGUgc3R5bGUgd2l0aCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IHN0eWxlc1xyXG4gICAgdGhpcy51cGRhdGVTdHlsZSgpO1xyXG4gIH1cclxuXHJcbiAgLy8gdXBkYXRlIHRoZSBzdHlsZXMgKGF0IHRoZSBzdGFydCwgb3IgYXMgdGhlIHJlc3VsdCBvZiBhIHNldHRpbmdzIGNoYW5nZSlcclxuICB1cGRhdGVTdHlsZSA9ICgpID0+IHtcclxuICBcdHRoaXMucmVtb3ZlU3R5bGUoKTtcclxuICBcdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgnZmFuY3ktY3Vyc29yJywgdGhpcy5zZXR0aW5ncy5mYW5jeUN1cnNvcik7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ2xpbmtzLWludC1vbicsIHRoaXMuc2V0dGluZ3MudW5kZXJsaW5lSW50ZXJuYWwpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdsaW5rcy1leHQtb24nLCB0aGlzLnNldHRpbmdzLnVuZGVybGluZUV4dGVybmFsKTtcclxuXHJcbiAgICAvLyBnZXQgdGhlIGN1c3RvbSBjc3MgZWxlbWVudFxyXG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1hbC10aGVtZScpO1xyXG4gICAgaWYgKCFlbCkgdGhyb3cgXCJtaW5pbWFsLXRoZW1lIGVsZW1lbnQgbm90IGZvdW5kIVwiO1xyXG4gICAgZWxzZSB7XHJcbiAgICAgIC8vIHNldCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IGNzc1xyXG4gICAgICBlbC5pbm5lclRleHQgPSBgXHJcbiAgICAgICAgYm9keS5taW5pbWFsLXRoZW1le1xyXG4gICAgICAgICAgLS1mb250LW5vcm1hbDoke3RoaXMuc2V0dGluZ3MudGV4dE5vcm1hbH1weDtcclxuICAgICAgICAgIC0tZm9udC1zbWFsbDoke3RoaXMuc2V0dGluZ3MudGV4dFNtYWxsfXB4O1xyXG4gICAgICAgICAgLS1saW5lLXdpZHRoOiR7dGhpcy5zZXR0aW5ncy5saW5lV2lkdGh9cmVtO1xyXG4gICAgICAgICAgLS1mb250LW1vbm9zcGFjZToke3RoaXMuc2V0dGluZ3MubW9ub0ZvbnR9O1xyXG4gICAgICAgICAgLS10ZXh0OiR7dGhpcy5zZXR0aW5ncy50ZXh0Rm9udH07XHJcbiAgICAgICAgICAtLXRleHQtZWRpdG9yOiR7dGhpcy5zZXR0aW5ncy5lZGl0b3JGb250fTtcclxuICAgICAgICAgIC0tYWNjZW50LWg6JHt0aGlzLnNldHRpbmdzLmFjY2VudEh1ZX07XHJcbiAgICAgICAgICAtLWFjY2VudC1zOiR7dGhpcy5zZXR0aW5ncy5hY2NlbnRTYXR9JTt9XHJcbiAgICAgIGA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGVEYXJrU3R5bGUgPSAoKSA9PiB7XHJcbiAgXHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLWxpZ2h0Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmltYWwtZGFyaycpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pbWFsLWRhcmstdG9uYWwnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWluaW1hbC1kYXJrLWJsYWNrJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLWRhcmsnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCh0aGlzLnNldHRpbmdzLmRhcmtTdHlsZSk7XHJcbiAgfVxyXG5cclxuICB1cGRhdGVMaWdodFN0eWxlID0gKCkgPT4ge1xyXG4gIFx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS1kYXJrJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmltYWwtbGlnaHQnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWluaW1hbC1saWdodC10b25hbCcpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pbWFsLWxpZ2h0LWNvbnRyYXN0Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLWxpZ2h0Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5saWdodFN0eWxlKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZVN0eWxlID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pbWFsLWxpZ2h0Jyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmltYWwtbGlnaHQtdG9uYWwnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWluaW1hbC1saWdodC1jb250cmFzdCcpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdtaW5pbWFsLWRhcmsnKTtcclxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbWluaW1hbC1kYXJrLXRvbmFsJyk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ21pbmltYWwtZGFyay1ibGFjaycpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKHRoaXMuc2V0dGluZ3MubGlnaHRTdHlsZSk7XHJcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQodGhpcy5zZXR0aW5ncy5kYXJrU3R5bGUpO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIE1pbmltYWxTZXR0aW5ncyB7XHJcbiAgYWNjZW50SHVlOiBudW1iZXIgPSAyMDE7XHJcbiAgYWNjZW50U2F0OiBudW1iZXIgPSAxNztcclxuICBsaWdodFN0eWxlOiBzdHJpbmcgPSAnbWluaW1hbC1saWdodCc7XHJcbiAgZGFya1N0eWxlOiBzdHJpbmcgPSAnbWluaW1hbC1kYXJrJztcclxuICB0ZXh0Rm9udDogc3RyaW5nID0gJy1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsc2Fucy1zZXJpZic7XHJcbiAgZWRpdG9yRm9udDogc3RyaW5nID0gJy1hcHBsZS1zeXN0ZW0sQmxpbmtNYWNTeXN0ZW1Gb250LFwiU2Vnb2UgVUkgRW1vamlcIixcIlNlZ29lIFVJXCIsUm9ib3RvLE94eWdlbi1TYW5zLFVidW50dSxDYW50YXJlbGwsc2Fucy1zZXJpZic7XHJcbiAgbW9ub0ZvbnQ6IHN0cmluZyA9ICdNZW5sbyxTRk1vbm8tUmVndWxhcixDb25zb2xhcyxSb2JvdG8gTW9ubyxtb25vc3BhY2UnO1xyXG4gIGZhbmN5Q3Vyc29yOiBib29sZWFuID0gdHJ1ZTtcclxuICBsaW5lV2lkdGg6IG51bWJlciA9IDQwO1xyXG4gIHRleHROb3JtYWw6IG51bWJlciA9IDE2O1xyXG4gIHRleHRTbWFsbDogbnVtYmVyID0gMTM7XHJcbiAgdW5kZXJsaW5lSW50ZXJuYWw6IGJvb2xlYW4gPSB0cnVlO1xyXG4gIHVuZGVybGluZUV4dGVybmFsOiBib29sZWFuID0gdHJ1ZTtcclxufVxyXG5cclxuY2xhc3MgTWluaW1hbFNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcclxuXHJcblxyXG5cdHBsdWdpbjogTWluaW1hbFRoZW1lO1xyXG4gIGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IE1pbmltYWxUaGVtZSkge1xyXG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xyXG4gICAgdGhpcy5wbHVnaW4gPSBwbHVnaW47XHJcblx0fVxyXG5cclxuXHRkaXNwbGF5KCk6IHZvaWQge1xyXG5cdFx0bGV0IHtjb250YWluZXJFbH0gPSB0aGlzO1xyXG5cclxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XHJcblxyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ3N0cm9uZycsIHt0ZXh0OiAnTWluaW1hbCBUaGVtZSBTZXR0aW5ncyd9KTtcclxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge3RleHQ6ICdJZiB5b3Ugbm90aWNlIGFueSBpc3N1ZXMsIHVwZGF0ZSB0byB0aGUgbGF0ZXN0IHZlcnNpb24gb2YgTWluaW1hbCBUaGVtZSBhbmQgcmVsb2FkIE9ic2lkaWFuLiBEb3dubG9hZCB0aGUgSGlkZXIgcGx1Z2luIGZvciBhZGRpdGlvbmFsIG9wdGlvbnMgdG8gZnVydGhlciBzaW1wbGlmeSB0aGUgT2JzaWRpYW4gVUkuJ30pO1xyXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2EnLCB7dGV4dDogJ+KspCBBY2NlbnQgY29sb3InfSk7XHJcblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnKTtcclxuXHJcblx0XHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdFx0XHRcdC5zZXROYW1lKCdBY2NlbnQgY29sb3IgaHVlJylcclxuXHQgICAgICAuc2V0RGVzYygnRm9yIGxpbmtzIGFuZCBpbnRlcmFjdGl2ZSBlbGVtZW50cycpXHJcblx0XHQgICAgLmFkZFNsaWRlcihzbGlkZXIgPT4gc2xpZGVyXHJcblx0XHQgICAgICAgIC5zZXRMaW1pdHMoMCwgMjU1LCAxKVxyXG5cdFx0ICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuYWNjZW50SHVlKVxyXG5cdCAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY2NlbnRIdWUgPSB2YWx1ZTtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcblx0ICAgICAgICB9KSk7XHJcblxyXG5cdFx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHRcdFx0XHQuc2V0TmFtZSgnQWNjZW50IGNvbG9yIHNhdHVyYXRpb24nKVxyXG5cdCAgICAgIC5zZXREZXNjKCdGb3IgbGlua3MgYW5kIGludGVyYWN0aXZlIGVsZW1lbnRzJylcclxuXHRcdCAgICAuYWRkU2xpZGVyKHNsaWRlciA9PiBzbGlkZXJcclxuXHRcdCAgICAgICAgLnNldExpbWl0cygwLCAxMDAsIDEpXHJcblx0XHQgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5hY2NlbnRTYXQpXHJcblx0ICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmFjY2VudFNhdCA9IHZhbHVlO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuXHQgICAgICAgIH0pKTtcclxuXHJcbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgIFx0LnNldE5hbWUoJ0ZhbmN5IGN1cnNvcicpXHJcbiAgICBcdC5zZXREZXNjKCdUaGUgZWRpdG9yIGN1cnNvciB0YWtlcyBvbiB5b3VyIGFjY2VudCBjb2xvcicpXHJcbiAgICBcdC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5mYW5jeUN1cnNvcilcclxuXHQgICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZmFuY3lDdXJzb3IgPSB2YWx1ZTtcclxuXHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcblx0ICAgICAgICBcdH0pXHJcblx0ICAgICAgXHQpO1xyXG5cclxuXHQgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0ICAgIFx0LnNldE5hbWUoJ0xpZ2h0IG1vZGUgYmFja2dyb3VuZCcpXHJcblx0ICAgIFx0LnNldERlc2MoJ0JhY2tncm91bmQgY29sb3JzIGluIGxpZ2h0IG1vZGUnKVxyXG5cdCAgICBcdC5hZGREcm9wZG93bihkcm9wZG93biA9PiBkcm9wZG93blxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignbWluaW1hbC1saWdodCcsJ0RlZmF1bHQnKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignbWluaW1hbC1saWdodC10b25hbCcsJ0xvdyBjb250cmFzdCcpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWxpZ2h0LWNvbnRyYXN0JywnSGlnaCBjb250cmFzdCcpXHJcblx0ICAgIFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGlnaHRTdHlsZSlcclxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5saWdodFN0eWxlID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZW1vdmVTdHlsZSgpO1xyXG4gICAgICAgIH0pKTtcclxuXHJcblx0ICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG5cdCAgICBcdC5zZXROYW1lKCdEYXJrIG1vZGUgYmFja2dyb3VuZCcpXHJcblx0ICAgIFx0LnNldERlc2MoJ0JhY2tncm91bmQgY29sb3JzIGluIGRhcmsgbW9kZScpXHJcblx0ICAgIFx0LmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWRhcmsnLCdEZWZhdWx0JylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ21pbmltYWwtZGFyay10b25hbCcsJ0xvdyBjb250cmFzdCcpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdtaW5pbWFsLWRhcmstYmxhY2snLCdUcnVlIGJsYWNrJylcclxuXHQgICAgXHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5kYXJrU3R5bGUpXHJcblx0ICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRhcmtTdHlsZSA9IHZhbHVlO1xyXG5cdCAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcblx0ICAgICAgICAgIHRoaXMucGx1Z2luLnJlbW92ZVN0eWxlKCk7XHJcblx0ICAgICAgICB9KSk7XHJcblxyXG4gICAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuICAgICAgICAuc2V0TmFtZSgnVGV4dCBmb250JylcclxuICAgICAgICAuc2V0RGVzYygnVXNlZCBpbiBwcmV2aWV3IG1vZGUg4oCUIHRoZSBmb250IG11c3QgYWxzbyBiZSBpbnN0YWxsZWQgb24geW91ciBjb21wdXRlcicpXHJcbiAgICAgICAgLmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnLCdTeXN0ZW0gZm9udCcpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdJbnRlcicsJ0ludGVyJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG4gICAgICAgICAgLmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcbiAgICAgICAgICAuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0Rm9udClcclxuICAgICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG4gICAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG5cdCAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcclxuXHQgICAgXHQuc2V0TmFtZSgnRWRpdG9yIGZvbnQnKVxyXG5cdCAgICBcdC5zZXREZXNjKCdVc2VkIGluIGVkaXQgbW9kZScpXHJcblx0ICAgIFx0LmFkZERyb3Bkb3duKGRyb3Bkb3duID0+IGRyb3Bkb3duXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCctYXBwbGUtc3lzdGVtLEJsaW5rTWFjU3lzdGVtRm9udCxcIlNlZ29lIFVJIEVtb2ppXCIsXCJTZWdvZSBVSVwiLFJvYm90byxPeHlnZW4tU2FucyxVYnVudHUsQ2FudGFyZWxsLHNhbnMtc2VyaWYnLCdTeXN0ZW0gZm9udCcpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdJbnRlcicsJ0ludGVyJylcclxuICAgICAgICAgIC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuXHQgICAgXHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5lZGl0b3JGb250KVxyXG5cdFx0ICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcblx0XHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuZWRpdG9yRm9udCA9IHZhbHVlO1xyXG5cdFx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuXHRcdCAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcblx0XHQgICAgICAgIH0pXHJcblx0ICAgICAgICApO1xyXG5cclxuXHQgICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcblx0ICAgIFx0LnNldE5hbWUoJ01vbm9zcGFjZSBmb250JylcclxuXHQgICAgXHQuc2V0RGVzYygnVXNlZCBmb3IgY29kZSBibG9ja3MsIGZyb250IG1hdHRlciwgZXRjJylcclxuXHQgICAgXHQuYWRkRHJvcGRvd24oZHJvcGRvd24gPT4gZHJvcGRvd25cclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ01lbmxvLFNGTW9uby1SZWd1bGFyLENvbnNvbGFzLFJvYm90byBNb25vLG1vbm9zcGFjZScsJ1N5c3RlbSBmb250JylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ2lBIFdyaXRlciBNb25vIFMnLCdpQSBNb25vJylcclxuXHQgICAgXHRcdC5hZGRPcHRpb24oJ2lBIFdyaXRlciBEdW8gUycsJ2lBIER1bycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdpQSBXcml0ZXIgUXVhdHRybyBTJywnaUEgUXVhdHRybycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdTRk1vbm8tUmVndWxhcicsJ1NGIE1vbm8nKVxyXG5cdCAgICBcdFx0LmFkZE9wdGlvbignQ29uc29sYXMnLCdDb25zb2xhcycpXHJcblx0ICAgIFx0XHQuYWRkT3B0aW9uKCdSb2JvdG8gTW9ubycsJ1JvYm90byBNb25vJylcclxuXHQgICAgXHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tb25vRm9udClcclxuXHRcdCAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG5cdFx0ICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250ID0gdmFsdWU7XHJcblx0XHQgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xyXG5cdFx0ICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuXHRcdCAgICAgICAgfSlcclxuXHQgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdVbmRlcmxpbmUgaW50ZXJuYWwgbGlua3MnKVxyXG4gICAgICAuc2V0RGVzYygnU2hvdyB1bmRlcmxpbmVzIG9uIGludGVybmFsIGxpbmtzJylcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVuZGVybGluZUludGVybmFsKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVJbnRlcm5hbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdVbmRlcmxpbmUgZXh0ZXJuYWwgbGlua3MnKVxyXG4gICAgICAuc2V0RGVzYygnU2hvdyB1bmRlcmxpbmVzIG9uIGV4dGVybmFsIGxpbmtzJylcclxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnVuZGVybGluZUV4dGVybmFsKVxyXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy51bmRlcmxpbmVFeHRlcm5hbCA9IHZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXHJcbiAgICAgIC5zZXROYW1lKCdMaW5lIHdpZHRoJylcclxuICAgICAgLnNldERlc2MoJ1RoZSBtYXhpbXVtIG51bWJlciBvZiBjaGFyYWN0ZXJzIHBlciBsaW5lIChkZWZhdWx0IDQwKScpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignNDAnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MubGluZVdpZHRoIHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmxpbmVXaWR0aCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQm9keSBmb250IHNpemUnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgdGhlIG1haW4gdGV4dCAoZGVmYXVsdCAxNiknKVxyXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJzE2JylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHROb3JtYWwgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dE5vcm1hbCA9IHBhcnNlSW50KHZhbHVlLnRyaW0oKSk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnU2lkZWJhciBmb250IHNpemUnKVxyXG4gICAgICAuc2V0RGVzYygnVXNlZCBmb3IgdGV4dCBpbiB0aGUgc2lkZWJhcnMgKGRlZmF1bHQgMTMpJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcxMycpXHJcbiAgICAgICAgLnNldFZhbHVlKCh0aGlzLnBsdWdpbi5zZXR0aW5ncy50ZXh0U21hbGwgfHwgJycpICsgJycpXHJcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGV4dFNtYWxsID0gcGFyc2VJbnQodmFsdWUudHJpbSgpKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcclxuICAgICAgICB9KSk7XHJcblxyXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoJ2JyJyk7XHJcbiAgICBjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnKTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdzdHJvbmcnLCB7dGV4dDogJ0N1c3RvbSBmb250cyd9KTtcclxuICAgIGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge3RleHQ6ICdUaGVzZSBzZXR0aW5ncyBvdmVycmlkZSB0aGUgZHJvcGRvd25zIGFib3ZlLiBNYWtlIHN1cmUgdG8gdXNlIHRoZSBleGFjdCBuYW1lIG9mIHRoZSBmb250IGFzIGl0IGFwcGVhcnMgb24geW91ciBzeXN0ZW0uJ30pO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIHRleHQgZm9udCcpXHJcbiAgICAgIC5zZXREZXNjKCdVc2VkIGluIHByZXZpZXcgbW9kZScpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignJylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250IHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnRleHRGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIGVkaXRvciBmb250JylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgaW4gZWRpdCBtb2RlJylcclxuICAgICAgLmFkZFRleHQodGV4dCA9PiB0ZXh0LnNldFBsYWNlaG9sZGVyKCcnKVxyXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MuZWRpdG9yRm9udCB8fCAnJykgKyAnJylcclxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5lZGl0b3JGb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxyXG4gICAgICAuc2V0TmFtZSgnQ3VzdG9tIG1vbm9zcGFjZSBmb250JylcclxuICAgICAgLnNldERlc2MoJ1VzZWQgZm9yIGNvZGUgYmxvY2tzLCBmcm9udCBtYXR0ZXIsIGV0YycpXHJcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignJylcclxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250IHx8ICcnKSArICcnKVxyXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcclxuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLm1vbm9Gb250ID0gdmFsdWU7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XHJcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSkpO1xyXG5cclxuXHR9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBsdWdpbiIsIlNldHRpbmciLCJQbHVnaW5TZXR0aW5nVGFiIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsSUFBSSxhQUFhLEdBQUcsTUFBTSxDQUFDLGNBQWM7QUFDekMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsWUFBWSxLQUFLLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ3BGLFFBQVEsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQzFHLElBQUksT0FBTyxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMsQ0FBQztBQUNGO0FBQ08sU0FBUyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNoQyxJQUFJLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEIsSUFBSSxTQUFTLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDM0MsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ3pGLENBQUM7QUF1Q0Q7QUFDTyxTQUFTLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFDN0QsSUFBSSxTQUFTLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxPQUFPLEtBQUssWUFBWSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLFVBQVUsT0FBTyxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDaEgsSUFBSSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLE9BQU8sRUFBRSxNQUFNLEVBQUU7QUFDL0QsUUFBUSxTQUFTLFNBQVMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ25HLFFBQVEsU0FBUyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO0FBQ3RHLFFBQVEsU0FBUyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ3RILFFBQVEsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFVBQVUsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzlFLEtBQUssQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUNEO0FBQ08sU0FBUyxXQUFXLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRTtBQUMzQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDckgsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxNQUFNLEtBQUssVUFBVSxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsV0FBVyxFQUFFLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM3SixJQUFJLFNBQVMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sVUFBVSxDQUFDLEVBQUUsRUFBRSxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3RFLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRSxFQUFFO0FBQ3RCLFFBQVEsSUFBSSxDQUFDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLFFBQVEsT0FBTyxDQUFDLEVBQUUsSUFBSTtBQUN0QixZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pLLFlBQVksSUFB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
