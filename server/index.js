const userApi = require('./api/userApi')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const host = process.env.HOST || '127.0.0.1'
var cors = require("cors")

// axios 默认发送的是 application/json 格式，需要使用下面的中间件进行解析
app.use(bodyParser.json())
// 解决 post 通过 客户端 axios 传递过来的数据 没有的情况
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(
  cors({
    origin: ["http://localhost:8080"],
    methods: ["GET", "POST"],
    alloweHeaders: ["Content-Type", "Authorization"]
  })
)
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
})
// 各种后端api路由
app.use('/api/user', userApi)

// 监听端口
app.listen(3211,host)
console.log('success listen at port:3211......')