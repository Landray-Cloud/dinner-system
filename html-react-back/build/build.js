const build = require('@toolkit/webpack-ts/scripts/build')
const config = require('../config/prod.conf')
const webpackConfig = require('./webpack.conf')

build(config, webpackConfig)
