import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // Global ignores
  { ignores: ["dist/", ".vite-cache/", "scripts/", "public/", "*.config.js", "vite.config.ts"] },

  // Base JS/TS rules
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Language options for type-aware rules
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // React hooks plugin
  {
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },

  // React refresh
  {
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },

  // Project-specific overrides
  {
    rules: {
      // No unused vars (catches dead code)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "react-hooks/set-state-in-effect": "warn",
      // This provider intentionally stores a stable observer API in a ref.
      "react-hooks/refs": "off",
    },
  },

  // Override for data files — less strict
  {
    files: ["**/data/**", "**/types/**"],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  // Prettier — must be last to disable conflicting rules
  prettierConfig,
);
