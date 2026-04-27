import { App } from 'obsidian';
import { MinimalSettings } from '../settings';

export function loadRules() {
  const css = activeDocument.createElement('style');
  css.id = 'minimal-theme';
  activeDocument.getElementsByTagName("head")[0].appendChild(css);
  activeDocument.body.classList.add('minimal-theme');
}

export function unloadRules() {
  const styleElement = activeDocument.getElementById('minimal-theme');
  if (styleElement) {
    styleElement.parentNode?.removeChild(styleElement);
  }
  activeDocument.body.classList.remove('minimal-theme');
}

export function updateStyle(settings: MinimalSettings) {
  removeStyle();
  removeSettings();

  activeDocument.body.addClass(
    settings.lightStyle,
    settings.lightScheme,
    settings.darkStyle,
    settings.darkScheme
  );

  activeDocument.body.classList.toggle('borders-none', !settings.bordersToggle);
  activeDocument.body.classList.toggle('colorful-headings', settings.colorfulHeadings);
  activeDocument.body.classList.toggle('colorful-frame', settings.colorfulFrame);
  activeDocument.body.classList.toggle('colorful-active', settings.colorfulActiveStates);
  activeDocument.body.classList.toggle('minimal-focus-mode', settings.focusMode);
  activeDocument.body.classList.toggle('links-int-on', settings.underlineInternal);
  activeDocument.body.classList.toggle('links-ext-on', settings.underlineExternal);
  activeDocument.body.classList.toggle('full-width-media', settings.fullWidthMedia);
  activeDocument.body.classList.toggle('img-grid', settings.imgGrid);
  activeDocument.body.classList.toggle('minimal-dev-block-width', settings.devBlockWidth);
  activeDocument.body.classList.toggle('minimal-status-off', !settings.minimalStatus);
  activeDocument.body.classList.toggle('full-file-names', !settings.trimNames);
  activeDocument.body.classList.toggle('labeled-nav', settings.labeledNav);
  activeDocument.body.classList.toggle('minimal-folding', settings.folding);

  activeDocument.body.addClass(
    settings.chartWidth,
    settings.tableWidth,
    settings.imgWidth,
    settings.iframeWidth,
    settings.mapWidth
  );

  const el = activeDocument.getElementById('minimal-theme');
  if (!el) throw new Error('minimal-theme element not found!');
  else {
    el.innerText = 
      'body.minimal-theme{'
      + '--font-ui-small:' + settings.textSmall + 'px;'
      + '--line-height:' + settings.lineHeight + ';'
      + '--line-width:' + settings.lineWidth + 'rem;'
      + '--line-width-wide:' + settings.lineWidthWide + 'rem;'
      + '--max-width:' + settings.maxWidth + '%;'
      + '--font-editor-override:' + settings.editorFont + ';';
  }
}

export function removeSettings() {
  activeDocument.body.removeClass(
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
  activeDocument.body.removeClass(
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

export function removeStyle() {
  activeDocument.body.removeClass(
    'minimal-light',
    'minimal-light-tonal',
    'minimal-light-contrast',
    'minimal-light-white',
    'minimal-dark',
    'minimal-dark-tonal',
    'minimal-dark-black'
  );
}

export function removeDarkScheme() {
  activeDocument.body.removeClass(
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

export function removeLightScheme() {
  activeDocument.body.removeClass(
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

export function setFontSize(app: App, textNormal: number) {
  // @ts-ignore
  app.vault.setConfig('baseFontSize', textNormal);
  // @ts-ignore
  app.updateFontSize();
}

