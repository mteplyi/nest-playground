const { jsoncFiles } = require('./package.json').config;

const jsFiles = '*.{js,cjs}';
const tsFiles = '*.ts';
const inlineTypeImports = false;

/** @satisfies {import("eslint").Linter.Config} */
const eslintConfig = {
  root: true,

  overrides: [
    {
      files: [jsFiles, tsFiles],
      env: {
        jest: true,
        node: true,
      },

      overrides: [
        {
          files: jsFiles,
          extends: [
            'airbnb-base',
            'plugin:n/recommended',
            'plugin:import/recommended',
          ],
        },

        {
          files: tsFiles,
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
            project: 'tsconfig.lint.json',
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

            'import/consistent-type-specifier-style': [
              'error',
              inlineTypeImports ? 'prefer-inline' : 'prefer-top-level',
            ],
          },
        },

        {
          files: '*',
          extends: ['plugin:unicorn/recommended', 'plugin:promise/recommended'],
          plugins: [
            'unused-imports',
            // 'sort-class-members',
          ],
          rules: {
            'class-methods-use-this': 'off',
            'consistent-return': 'off',
            'no-prototype-builtins': 'off',
            'no-void': ['error', { allowAsStatement: true }],
            'no-underscore-dangle': [
              'error',
              { allowAfterSuper: true, allowAfterThis: true },
            ],

            'n/no-missing-import': 'off',
            'n/no-missing-require': 'off',
            'n/no-unpublished-import': ['error', { ignoreTypeImport: true }],
            'n/no-unpublished-require': 'error',

            'import/extensions': ['error', 'never', { json: 'always' }],
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
            'import/prefer-default-export': 'off',

            'unicorn/no-null': 'off',
            'unicorn/prefer-module': 'off',
            'unicorn/prefer-top-level-await': 'off',
            'unicorn/prevent-abbreviations': 'off',

            'promise/always-return': ['error', { ignoreLastCallback: true }],

            'unused-imports/no-unused-imports': 'error',

            // 'sort-class-members/sort-class-members': [
            //   'error',
            //   {
            //     order: [
            //       '[static-properties]',
            //       '[private-static-properties]',
            //       '[static-accessor-pairs]',
            //       '[static-methods]',
            //       '[private-static-accessor-pairs]',
            //       '[private-static-methods]',
            //       '[properties]',
            //       '[conventional-private-properties]',
            //       '[private-properties]',
            //       'constructor',
            //       '[accessor-pairs]',
            //       '[methods]',
            //       '[conventional-private-accessor-pairs]',
            //       '[conventional-private-methods]',
            //       '[private-accessor-pairs]',
            //       '[private-methods]',
            //       '[everything-else]',
            //     ],
            //     groups: {
            //       'conventional-private-accessor-pairs': [
            //         { accessorPair: true, name: '/_.+/' },
            //       ],
            //       'private-accessor-pairs': [
            //         { accessorPair: true, private: true },
            //       ],
            //       'static-accessor-pairs': [
            //         { accessorPair: true, static: true },
            //       ],
            //       'private-static-accessor-pairs': [
            //         { accessorPair: true, private: true, static: true },
            //       ],
            //       'private-methods': [{ type: 'method', private: true }],
            //       'private-properties': [{ type: 'property', private: true }],
            //       'private-static-methods': [
            //         { type: 'method', private: true, static: true },
            //       ],
            //       'private-static-properties': [
            //         { type: 'property', private: true, static: true },
            //       ],
            //     },
            //     accessorPairPositioning: 'getThenSet',
            //   },
            // ],
          },
        },

        {
          files: ['*.{spec,e2e-spec}.!(*.*)', 'reset.d.ts'],
          rules: {
            'n/no-unpublished-require': 'off',
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

module.exports = eslintConfig;
