import globals from "globals";
import pluginJs from "@eslint/js";
import airbnbBase from "eslint-config-airbnb-base";
import importPlugin from "eslint-plugin-import";

/** @type {import('eslint').Linter.Config')} */
export default [
  {
    languageOptions: {
      globals: globals.node,
    },
    plugins: {
      import: importPlugin,
    },
    extends: [
      "eslint:recommended",
      "airbnb-base",
    ],
    rules: {
      "arrow-parens": ["error", "as-needed"],
      "no-underscore-dangle": ["error", { "allow": ["_id"] }],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "next" }],
    },
  },
];