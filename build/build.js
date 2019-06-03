// 该文件作用，即构建生产版本。package.json中的scripts的build就是node build/build.js，输入命令行npm run build对该文件进行编译生成生产环境的代码。
'use strict'
require('./check-versions')()// 检查 Node 和 npm 版本

process.env.NODE_ENV = 'production'
/* 
** 使用 config.dev.env.NODE_ENV 作为当前的环境
*/

const ora = require('ora')//加载动画，可以去看ora官方文档
const rm = require('rimraf')//删除文件，可以去看rimraf官方文档
const path = require('path')// 使用 NodeJS 自带的文件路径工具
const chalk = require('chalk')//对文案输出的一个彩色设置
const webpack = require('webpack')// 使用 webpack
const config = require('../config')// 获取 config/index.js 的默认配置
const webpackConfig = require('./webpack.prod.conf')// 使用 prod 环境的 webpack 配置

const spinner = ora('building for production...')//调用start的方法实现加载动画，优化用户体验
spinner.start()
//先删除dist文件再生成新文件，因为有时候会使用hash来命名，删除整个文件可避免冗余
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
