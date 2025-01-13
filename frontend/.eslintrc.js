module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "plugin:react/recommended",
    "airbnb",
    "prettier",
  ],
  overrides: [
    {
      files: ["**.ts", "**.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": [
      "warn",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        argsIgnorePattern: "^_",
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        js: "never",
        jsx: "never",
        tsx: "never",
      },
    ],
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "arrow-function", // or 'function-declaration' if you want declarations
        unnamedComponents: "arrow-function",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "react/require-default-props": "off",
    "no-param-reassign": "off",
    "no-nested-ternary": "off",
    "react-hooks/exhaustive-deps": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
    camelcase: "off",
    "react/jsx-filename-extension": [
      1,
      {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    ],
  },
  settings: {
    react: {
      version: "18.2.0",
    },
  },
};
