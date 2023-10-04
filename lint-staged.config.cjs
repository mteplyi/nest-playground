const {
  config: { eslintExts },
  scripts,
} = require('./package.json');

const eslintGlob = eslintExts.includes(',')
  ? `*.{${eslintExts}}`
  : `*.${eslintExts}`;

const tsFiles = [
  '*.{js,cjs,ts}',
  'tsconfig*(.*).json',
  'package.json',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
];
const tsGlob = `{${tsFiles.join(',')}}`;

/** @satisfies {import('lint-staged').Config} */
const lintStagedConfig = {
  [eslintGlob]: `${scripts['lint:eslint:base']} --max-warnings=0`,
  [tsGlob]: () => scripts['lint:ts'],
};

module.exports = lintStagedConfig;
