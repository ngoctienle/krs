/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  extends: ['krs/admin'],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  }
}
