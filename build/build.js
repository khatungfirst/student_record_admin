'use strict'
require('./check-versions')()

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../configs')
const webpackConfig = require('./webpack.prod.conf')
const devWbpackConfig = require('./webpack.dev.conf')
require('dotenv').config();
const spinner = ora(
  'building for ' + process.env.NODE_ENV + ' environment...'
)
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  console.log("#####################",process.env.NODE_ENV === 'production' )
  if(process.env.NODE_ENV === 'production'){
    webpack(webpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )
  
      if (stats.hasErrors()) {
        console.log(chalk.red(' Build failed with errors.\n'))
        process.exit(1)
      }
  
      console.log(chalk.cyan(' Build complete.\n'))
      console.log(
        chalk.yellow(
          ' Tip: built files are meant to be served over an HTTP server.\n' +
          " Opening index.html over file:// won't work.\n"
        )
      )
    })
  }else{
    webpack(devWbpackConfig, (err, stats) => {
      spinner.stop()
      if (err) throw err
      process.stdout.write(
        stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n'
      )
  
      if (stats.hasErrors()) {
        console.log(chalk.red(' Build failed with errors.\n'))
        process.exit(1)
      }
  
      console.log(chalk.cyan(' Build complete.\n'))
      console.log(
        chalk.yellow(
          ' Tip: built files are meant to be served over an HTTP server.\n' +
          " Opening index.html over file:// won't work.\n"
        )
      )
    })
  }
 
})
