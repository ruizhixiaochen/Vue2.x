// webpack.base.conf.js是开发和生产共同使用提出来的基础配置文件，主要实现配制入口，配置输出环境，配置模块resolve和插件等
'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
//拼接出绝对路径
  return path.join(__dirname, '..', dir)
}



module.exports = {
//path.join将路径片段进行拼接，而path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃
//path.join('/a', '/b') // 'a/b',path.resolve('/a', '/b') // '/b'
  context: path.resolve(__dirname, '../'),
  entry: {
		//配置入口，默认为单页面所以只有app一个入口
    app: './src/main.js'
  },
  output: {
		//配置出口，默认是/dist作为目标文件夹的路径
    path: config.build.assetsRoot,//路径
    filename: '[name].js',//文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath//公共存放路径
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
		//自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    alias: {
			//创建路径的别名，比如增加'components': resolve('src/components')等
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
	//使用插件配置相应文件的处理方法
  module: {
    rules: [
			//使用vue-loader将vue文件转化成js的模块
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      //js文件需要通过babel-loader进行编译成es5文件以及压缩等操作
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
				//图片、音像、字体都使用url-loader进行处理，超过10000会编译成base64
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
		//以下选项是Node.js全局变量或模块，这里主要是防止webpack注入一些Node.js的东西到vue中 
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
