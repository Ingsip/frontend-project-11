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
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly', // Определяем глобальную переменную document
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
