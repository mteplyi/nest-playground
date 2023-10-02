const { jsoncFiles } = require('./package.json').config;

/** @satisfies {import("prettier").Config} */
const config = {
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

module.exports = config;
