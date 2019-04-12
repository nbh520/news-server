const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')
class Jwt {
  constructor(data){
    this.data = data
  }
  getToken() {
    let data = this.data
    let created = Math.floor(Date.now() / 1000)
    let cert = fs.readFileSync(path.join(__dirname, '../pem'))
  }
}