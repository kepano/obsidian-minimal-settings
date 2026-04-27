import tsparser from '@typescript-eslint/parser';
import { defineConfig } from 'eslint/config';
import obsidianmd from 'eslint-plugin-obsidianmd';
import { DEFAULT_BRANDS } from 'eslint-plugin-obsidianmd/dist/lib/rules/ui/brands.js';

const themeBrands = [
  ...DEFAULT_BRANDS,
  'Atom',
  'Ayu',
  'Catppuccin',
  'Dracula',
  'E-ink',
  'Everforest',
  'Flexoki',
  'Gruvbox',
  'Nord',
  'Rosé Pine',
  'Sky',
  'Solarized',
  'Things',
  'Dataview',
  'Style Settings',
  'Minimal',
];

export default defineConfig([
  {
    ignores: ['main.js', 'node_modules/**'],
  },
  ...obsidianmd.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: './tsconfig.json' },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      // Obsidian's chainable APIs (Setting/Component) define a .then() helper for
      // chaining. That makes them structural Promise-likes, which trips this rule
      // on every `(setting) => setting.method(...)` callback even though no
      // Promise is involved. Disable just the `arguments` portion.
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { arguments: false } },
      ],
      // Obsidian exposes many runtime-only / undocumented APIs that plugins call
      // via `// @ts-ignore`. Those land as `any` and the type-checked unsafe-*
      // rules fire on every call site. Turn them off plugin-wide.
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // This plugin writes theme state (body classes + CSS custom properties) to
      // the main `document.body` on purpose. Obsidian's `relayAppStyles`
      // (app.js) mirrors classes and `--*` props from the main body to every
      // popout window via MutationObserver, so writing to `activeDocument.body`
      // would land on the focused window only and not propagate. Targeting
      // `document.body` directly is the correct pattern here.
      'obsidianmd/prefer-active-doc': 'off',
      'obsidianmd/ui/sentence-case': [
        'error',
        { enforceCamelCaseLower: true, brands: themeBrands },
      ],
    },
  },
]);
