// @ts-check

import eslintJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import jestPlugin from 'eslint-plugin-jest'; // Import Jest plugin

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
    ],
  },
  eslintJs.configs.recommended,
  eslintConfigPrettier,
  { // Configuration for main source files
    files: ['src/**/*.js'], // Apply this config only to src files
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        Event: 'readonly', // Explicitly add Event
        // Add other browser globals as needed
      },
    },
    rules: {
      // Add any project-specific rules here
    },
  },
  { // Configuration for test files
    files: ['src/**/*.test.js'],
    ...jestPlugin.configs['flat/recommended'], // Use Jest recommended flat config
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      // Add any Jest specific rule overrides here if needed
    },
    // languageOptions for tests can also be specified if they differ,
    // but Jest globals are handled by jestPlugin.configs['flat/recommended']
  }
];
