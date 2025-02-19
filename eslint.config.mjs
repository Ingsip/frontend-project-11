/*import globals from "globals";
import pluginJs from "@eslint/js";*/

/* @type {import('eslint').Linter.Config[]} */
/*export default [
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
];*/

/*export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        // Eslint doesn't supply ecmaVersion in `parser.js` `context.parserOptions`
        // This is required to avoid ecmaVersion < 2015 error or 'import' / 'export' error
        ecmaVersion: 'latest', //  или ecmaVersion: 2020
        sourceType: 'module',
      },
    },
    plugins: { import: importPlugin },
    rules: {
      ...importPlugin.configs.recommended.rules,
    },
  },
  ...compat.extends('airbnb-base'),
  {
    rules: {
      'no-underscore-dangle': [
        'error',
        {
          allow: ['__filename', '__dirname'],
        },
      ],
      'import/extensions': [
        'error',
        {
          js: 'always',
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-console': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
];*/


import eslintPluginImport from 'eslint-plugin-import';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**'],
  },
  {
    files: ['webpack.config.js'],
    languageOptions: {
        globals: {
            __dirname: 'readonly',
            module: 'readonly',
            require: 'readonly',
        },
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
        },
    },
    plugins: {
      import: eslintPluginImport,
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/namespace': 'error',
      'import/no-self-import': 'error',
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'], 
        },
      },
    },
  },
  {
    files: ['src/view.js', 'src/parser.js', 'src/application.js'],
    languageOptions: {
      globals: {
        document: 'readonly',  // Определяем глобальную переменную document
        window: 'readonly',
        DOMParser: 'readonly',
        URL: 'readonly',
        setTimeout: 'readonly',
        FormData: 'readonly',
        submitButton: 'readonly',
      },
    },
  },
];