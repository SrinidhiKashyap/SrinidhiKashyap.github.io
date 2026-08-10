import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  // Global ignores
  { ignores: ["dist/", "scripts/", "public/"] },

  // Base JS/TS rules
  js.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

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
      // Allow explicit `any` in rare cases — but flag it
      "@typescript-eslint/no-explicit-any": "warn",

      // Prefer interfaces over type aliases for object shapes
      "@typescript-eslint/consistent-type-definitions": ["error", "interface"],

      // Enforce readonly arrays
      "@typescript-eslint/array-type": ["error", { default: "generic" }],

      // No unused vars (catches dead code)
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      // No floating promises
      "@typescript-eslint/no-floating-promises": "error",

      // No `require` — we're ESM
      "@typescript-eslint/no-require-imports": "error",
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