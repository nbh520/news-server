// 'use strict'
import AdminModel from '../../models/admin/admin'
import formidable from 'formidable'
import AddressComponent from '../../prototype/addressComponent'
import crypto from 'crypto'
import moment from 'moment'
class Admin extends AddressComponent {
  constructor() {
    super()
    this.login = this.login.bind(this)
    this.getAdminInfo = this.getAdminInfo.bind(this)
    this.encryption = this.encryption.bind(this)
  }
  //登录
  async login(req, res, next) {
      const {username, password, status = 1} = req.body
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
        const tokens = ['editor-token','admin-token']
        if(!admin){
          const adminTip = status == 1 ? '管理员' : '超级管理员'
          const admin_id = await this.getId('admin_id')
          const cityInfo = await this.guessPosition(req) //获取城市信息
          const newAdmin = {
            username,
            password: newPassword,
            id: admin_id,
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            admin: adminTip,
            status,
            city: cityInfo.city
          }
          await AdminModel.create(newAdmin)
          // req.session.admin.id = admin_id
          res.send({
            status: 1,
            success: '注册管理员成功',
            city: cityInfo.city
          })
          console.log(cityInfo.city)
        }else if(newPassword.toString() !== admin.password.toString()){
          res.send({
            status: 0,
            type: 'ERROR_PASSWORD',
            message: '密码错误'
          })
        }else{
          req.session.admin_id = 'admin.id'
          console.log(req.session)
          console.log(tokens[admin.status - 1])
          res.send({
            status: 1,
            success: '登录成功',
            data: tokens[admin.status - 1]
          })
        }
      }catch(err){
        res.send({
          status: 0,
          type: 'LOGIN_ADMIN_FAILED',
          message: '登录管理员失败'
        })
        console.log(err)
      }
      
    // })
  }
  //获取管理员信息
  async getAdminInfo(req, res, next){
    const users = {
      'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
      },
      'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
      }
    }
    const { token } = req.query 
    const info = users[token]
    // this.getToken()
    if(info){
      res.send({
        status: 1, 
        data: info
      })
    }
    res.send({
      status: 0,
      type: 'GET_ADMININFO_FAIL',
      message: '获取管理员信息错误'
    })
    
  }

  //退出管理员
  async logout(req, res, next){
    res.send({
      status: 1, 
      data: 'success'
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