const path = require('path')
const baseConfig = require('./base.conf')

module.exports = Object.assign({}, baseConfig, {
  pages: {
    app: {
      entry: path.join(__dirname, '../src/main.tsx')
    }
  }
})
