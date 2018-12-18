'use strict'
import AdminModel from '../../models/admin/admin'
import formidable from 'formidable'
import crypto from 'crypto'
class Admin {
  constructor() {
    // super()
    this.login = this.login.bind(this)
    this.encryption = this.encryption.bind(this)
  }
  async login(req, res, next) {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.send({
          status: 0,
          type: 'FORM_DATA_ERROR',
          message: '表单信息错误'
        })
        return
      }
      const {username, password, status = 1} = fields
      try{
        if(!username)
          throw new Error('用户名参数错误')
        else if(!password)
          throw new Error('密码参数错误')
      }catch(err){
        res.send({
          status: 0,
          type: 'GET_ERROR_PARAM',
          message: err.message,
        })
        return
      }
      const newPassword = this.encryption(password)
      res.send({
        newPassword
      })
    })
  }
  encryption(password){
    const newPassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password))
    return newPassword
  }
  Md5(password){
    const md5 = crypto.createHash('md5')
    return md5.update(password).digest('base64')
  }
}

export default new Admin()