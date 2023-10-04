const { jsoncFiles } = require('./package.json').config;

/** @satisfies {import("prettier").Config} */
const prettierConfig = {
  singleQuote: true,

  overrides: [
    {
      files: ['*.jsonc', ...jsoncFiles],
      options: {
        parser: 'json5',
        quoteProps: 'preserve',
        singleQuote: false,
      },
    },
  ],
};

module.exports = prettierConfig;
