'use strict'

import UserModel from '../../models/user/user'
import BaseComponent from '../../prototype/BaseComponent'

class User extends BaseComponent{
  constructor(){
    super()
    this.addUser = this.addUser.bind(this)
    this.getUserDayLength = this.getUserDayLength.bind(this)
  }

  //添加用户
  async addUser(req, res, next){
    let data = req.body.data
    let userId
    if(!data.id){
      userId = await this.getId('user_id')
      data.id = userId
    }
    try{
      await UserModel.create(data)
      res.send({
        status: 1,
        data: 'success'
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'ADD_USER_ERROR',
        message: '添加用户错误'
      })
      throw new Error('添加错误')
    }
    
  }

  // 查询用户分布地区
  async queryUserAddress(req, res, next) {
    try{
      UserModel.find({}, 'address', function (err, docs) {
        let obj = {}
        docs.forEach(doc => {
          let address = doc['address']
          if (obj.hasOwnProperty(address)) {
            obj[address] = obj[address] + 1
          } else {
            obj[address] = 1
          }
        })
        res.send({
          status: 1,
          data: obj
        })
      })
    } catch(err) {
      res.send({
        status: 0,
        type: 'QUERY_ERROR',
        message: '查询用户分布地区错误:' + err
      })
    }  
  }

   // 获取全部用户条数
   async getALLUserLength(req, res, next) {
     try {
       await UserModel.find(function (err, docs) {
         res.send({
           status: 1,
           data: docs.length
         })
       })
     } catch (err) {
       res.send({
         status: 0,
         type: 'GET_ALLNEWSLENGTH_FAIL',
         message: '获取用户条数错误'
       })
     }
   }
   

  // 获取？天~现在的用户条数
  async getUserDayLength(req, res, next) {
    let day = req.query.day || 1
    let dayArr = await this.getDayLength(UserModel, day)
    res.send({
      status: 1,
      data: dayArr
    })
  }

  /**
   * @param {查找条件} data.name
   * @param {要查找的键} data.key
   * @memberof 查找用户表里的某一键值
   */
  async queryValue(req, res, next){
    try{
      let { key, name } = req.body.data
      let result = await UserModel.findOne({nickname: name})
      res.send({
        status: 1,
        data: result[key]
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'QUERY_USER_ERROR',
        message: '查询用户表失败'
      })
      throw new Error("查询失败")
    }
    
  }
}

export default new User