const start = require('@toolkit/webpack-ts/scripts/start')
const config = require('../config/dev.conf')
const webpackConfig = require('./webpack.conf')

start(config, webpackConfig)
