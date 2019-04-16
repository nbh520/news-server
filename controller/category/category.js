'use strict'
import CategoryModel from '../../models/category/category'
import BaseComponent from '../../prototype/BaseComponent'

class Category extends BaseComponent {
  constructor(){
    super()
    this.addNewsCategory = this.addNewsCategory.bind(this)
  }
  async getAllCategory(req, res, next){
    try {      
      await CategoryModel.find({}, {id: 1, name: 1, _id: 0}, function(err, docs){
        res.send({
          status: 0,
          data: docs
        })
      })
    } catch(err) {
      res.send({
        status: 0,
        type: 'GET_TYPE_ERR',
        message: '获取新闻类型出错'
      })
    }
  }
  
  // 添加新闻类型
  async addNewsCategory(req, res, next) {
    const { name } = req.body
    try{
      const findName = await CategoryModel.find({name})
      if (!findName.length) {
        const id = await this.getId('category_id')
        await CategoryModel.create({id, name})
      } 
      res.send({
        status: 1,
        data: '添加成功'
      }) 
    }catch(err){
      res.send({
        status: 0,
        type: 'ADD_CATEGORY_ERR',
        message: '添加新闻类型错误'
      })
    }
  }
}
export default new Category