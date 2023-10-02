const {
  config: { eslintExts },
  scripts,
} = require('./package.json');

const eslintGlob = eslintExts.includes(',')
  ? `*.{${eslintExts}}`
  : `*.${eslintExts}`;

/** @satisfies {import('lint-staged').Config} */
const config = {
  [eslintGlob]: `${scripts['lint:base']} --max-warnings=0`,
};

module.exports = config;
