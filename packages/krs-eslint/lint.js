const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

module.exports = {
  extends: ['eslint-config-airbnb', 'eslint-config-airbnb-typescript'].map(
    require.resolve
  ),

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project,
    ecmaVersion: 2020
  },
  globals: {
    React: true,
    JSX: true
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    // add specific rules configurations here
    '@typescript-eslint/semi': 'off',
    'jsx-quotes': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'import/no-absolute-path': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-undef': 'off'
  }
}
