const { jsoncFiles } = require('./package.json').config;

const inlineTypeImports = false;

/** @satisfies {import("eslint").Linter.Config} */
const config = {
  root: true,

  overrides: [
    {
      files: '*.{js,cjs,mjs,ts,cts,mts}',
      env: {
        jest: true,
        node: true,
      },

      overrides: [
        {
          files: '*.{js,cjs,mjs}',
          extends: [
            'airbnb-base',
            'plugin:n/recommended',
            'plugin:import/recommended',
          ],
        },

        {
          files: '*.{ts,cts,mts}',
          extends: [
            'airbnb-base',
            'airbnb-typescript/base',
            'plugin:@typescript-eslint/strict-type-checked',
            'plugin:@typescript-eslint/stylistic-type-checked',
            'plugin:n/recommended',
            'plugin:import/recommended',
            'plugin:import/typescript',
          ],
          parser: '@typescript-eslint/parser',
          parserOptions: {
            project: 'tsconfig.json',
            tsconfigRootDir: __dirname,
          },
          rules: {
            '@typescript-eslint/consistent-type-imports': [
              'error',
              {
                fixStyle: inlineTypeImports
                  ? 'inline-type-imports'
                  : 'separate-type-imports',
              },
            ],
            '@typescript-eslint/no-extraneous-class': 'off',
          },
        },

        {
          files: '*',
          extends: ['plugin:unicorn/recommended'],
          plugins: ['unused-imports'],
          rules: {
            'class-methods-use-this': 'off',
            'no-prototype-builtins': 'off',
            'no-void': ['error', { allowAsStatement: true }],

            'n/no-missing-import': 'off',
            'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],

            'import/first': 'error',
            'import/no-duplicates': [
              'error',
              { 'prefer-inline': inlineTypeImports },
            ],
            'import/no-empty-named-blocks': 'error',
            'import/no-self-import': 'error',
            'import/no-useless-path-segments': [
              'error',
              { commonjs: true, noUselessIndex: true },
            ],
            'import/order': [
              'error',
              {
                groups: [
                  'builtin',
                  'external',
                  'internal',
                  'parent',
                  'sibling',
                  'index',
                  'object',
                ],
                alphabetize: { order: 'asc', orderImportKind: 'desc' },
                'newlines-between': 'never',
              },
            ],
            'import/newline-after-import': [
              'error',
              { considerComments: true },
            ],
            'import/consistent-type-specifier-style': [
              'error',
              inlineTypeImports ? 'prefer-inline' : 'prefer-top-level',
            ],
            'import/no-default-export': 'error',
            'import/prefer-default-export': 'off',

            'unicorn/no-null': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/prevent-abbreviations': 'off',

            'unused-imports/no-unused-imports': 'error',
          },
        },

        {
          files: ['*.{spec,e2e-spec}.!(*.*)', 'reset.d.ts'],
          rules: {
            'n/no-unpublished-import': 'off',
            'import/no-extraneous-dependencies': 'off',
          },
        },
      ],
    },

    {
      files: '*.{json,jsonc,json5}',
      parser: 'jsonc-eslint-parser',

      overrides: [
        {
          files: '*.json',
          excludedFiles: jsoncFiles,
          extends: 'plugin:jsonc/recommended-with-json',
        },

        {
          files: ['*.jsonc,', ...jsoncFiles],
          extends: 'plugin:jsonc/recommended-with-jsonc',
        },

        {
          files: '*.json5',
          extends: 'plugin:jsonc/recommended-with-json5',
        },
      ],
    },

    {
      files: '*',
      extends: ['plugin:prettier/recommended', 'plugin:@cspell/recommended'],
    },
  ],
};

module.exports = config;
