
module.exports = {
  printWidth: 100,
  semi: true,
  vueIndentScriptAndStyle: true,
  singleQuote: true,
   // 是否使用尾逗号
  trailingComma: 'all',
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-packagejson'],
  overrides: [
    {
      files: '.*rc',
      options: {
        parser: 'json',
      },
    },
  ],
};
