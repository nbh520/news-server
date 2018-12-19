'use strict'
import AdminModel from '../../models/admin/admin'
import formidable from 'formidable'
import AddressComponent from '../../prototype/addressComponent'
import crypto from 'crypto'
class Admin extends AddressComponent {
  constructor() {
    super()
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
      try{
        const admin = await AdminModel.findOne({username})
        if(!admin){
          const adminTip = status == 1 ? '管理员' : '超级管理员'
          const admin_id = await this.getId('admin_id')
          const cityInfo = await this.guessPosition(req);
          const newAdmin = {
            username,
            password: newPassword,
            id: admin_id,
            create_time: new Date(),
            admin: adminTip,
            status,
            city: cityInfo.city
          }
          await AdminModel.create(newAdmin)
          req.session.admin.id = admin_id
          res.send({
            status: 1,
            success: '注册管理员成功',
          })
        }else if(newPassword.toString() !== admin.password.toString()){
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '密码错误'
          })
        }else{
          req.session.admin_id = admin.id
          res.send({
            status: 1,
            success: '登录成功'
          })
        }
      }catch(err){
        res.send({
          status: 0,
          type: 'LOGIN_ADMIN_FAILED',
          message: '登录管理员失败'
        })
      }
      
    })
  }
  async getPosition(req, res, next){
    const cityInfo = await super.guessPosition(req)
    res.send({
      success: cityInfo
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