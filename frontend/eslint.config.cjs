const globals = require("globals");
const pluginJs = require("@eslint/js");
const tseslint = require("typescript-eslint");
const pluginReactConfig = require("eslint-plugin-react/configs/recommended.js");
const { fixupConfigRules } = require("@eslint/compat");
const { FlatCompat } = require('@eslint/eslintrc');
const typeScriptEsLintPlugin = require('@typescript-eslint/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
});

module.exports = [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  ...compat.config({
    env: { browser: true, es2020: true },
    extends: [
      'plugin:@typescript-eslint/recommended',
      "plugin:react-hooks/recommended",
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    ignorePatterns: ['node_modules', 'dist', 'build', 'public', '*.cjs'],
    plugins: ['@typescript-eslint', 'react-refresh', 'react-hooks'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-interface': 'error',
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-shadow": ["error"],

      "react-refresh/only-export-components": "warn",

      "react/jsx-wrap-multilines": [
        "error",
        {
          "prop": "ignore"
        }
      ],
      "react/prop-types": "warn",
      "react/jsx-no-bind": "warn",
      "react/react-in-jsx-scope": "off",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-filename-extension": [
        1,
        { "extensions": [".tsx", ".ts", ".js"] }
      ],
    },
  }),
];