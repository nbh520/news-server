const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost/news'
mongoose.connect(DB_URL)
const conn = mongoose.connection
conn.once('open', function () {
  console.log("数据库连接成功 ")
})