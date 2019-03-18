'use strict'

import UserModel from '../../models/user/user'
import BaseComponent from '../../prototype/BaseComponent'

class User extends BaseComponent{
  constructor(){
    super()
    this.addUser = this.addUser.bind(this)
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