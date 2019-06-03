// config内的文件其实是服务于build的，大部分是定义一个变量export出去。
'use strict'//采用严格模式
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//webpack-merge提供了一个合并函数，它将数组和合并对象创建一个新对象。
//如果遇到函数，它将执行它们，通过算法运行结果，然后再次将返回的值封装在函数中.这边将dev和prod进行合并
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
