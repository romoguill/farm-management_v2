/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@farm/eslint-config/server.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};
