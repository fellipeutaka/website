import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";
import react from "ultracite/oxlint/react";

export default defineConfig({
  extends: [core, react, next],
  ignorePatterns: [
    ...(core.ignorePatterns ?? []),
    ".agents/**",
    ".claude/**",
    ".opencode/**",
    ".source/**",
    "next-env.d.ts",
  ],
  options: { typeAware: true, typeCheck: true },
  rules: {
    "sort-keys": "off",
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "prefer-destructuring": "off",
    "no-use-before-define": ["error", { functions: false }],
    "no-negated-condition": "off",
    "unicorn/no-negated-condition": "off",
    "react/function-component-definition": [
      "error",
      {
        namedComponents: ["function-declaration", "arrow-function"],
        unnamedComponents: "arrow-function",
      },
    ],
    // CVA style factories use the same capitalized names as their UI parts.
    "react/capitalized-calls": "off",
    // Optional returns and effect cleanup functions are checked by TypeScript.
    "typescript/consistent-return": "off",
    "import/no-default-export": "error",
    "no-shadow": "off",
    "no-unused-vars": ["error", { ignoreRestSiblings: true }],
    "typescript/consistent-type-definitions": ["error", "interface"],
    "typescript/no-non-null-assertion": "off",
  },
  overrides: [
    {
      files: ["src/components/ui/icons.tsx", "src/components/ui/spinner.tsx"],
      // Native SVGs need role="img" to expose an accessible image name.
      rules: { "jsx-a11y/prefer-tag-over-role": "off" },
    },
    {
      files: [
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "src/app/**/template.tsx",
        "src/app/**/loading.tsx",
        "src/app/**/error.tsx",
        "src/app/**/not-found.tsx",
        "src/app/**/default.tsx",
        "src/app/**/icon.tsx",
        "src/app/**/apple-icon.tsx",
        "src/app/**/manifest.ts",
        "src/app/**/opengraph-image.tsx",
        "src/app/**/twitter-image.tsx",
        "src/app/**/robots.ts",
        "src/app/**/sitemap.ts",
        "src/middleware.ts",
        "*.config.{js,mjs,ts}",
      ],
      rules: { "import/no-default-export": "off" },
    },
  ],
});
