'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  VUE_APP_BASE_UPL: 'http://192.168.10.7:8881'
})
