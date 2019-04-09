'use strict'
import CommentModel from '../../models/comment/comment'
import BaseComponent from '../../prototype/BaseComponent'

class Comment extends BaseComponent{
  constructor(){
    super()
    this.addNewsComment = this.addNewsComment.bind(this)
    this.updateNewsComment = this.updateNewsComment.bind(this)
    this.getNewsComment = this.getNewsComment.bind(this)
    this.queryNewsComment = this.queryNewsComment.bind(this)
    this.getCommentDayLength = this.getCommentDayLength.bind(this)
  }
  //将新闻评论添加进数据库
  async addNewsComment(req, res, next) {
    let comment = req.body.comment
    let article_id = req.body.articleId
    try{
      for (let i in comment) {
        const id = await this.getId('comment_id')
        let obj = {
          id,
          user_id: 3,
          thumbsCount: comment[i].vote,
          avatar: comment[i].user.avatar || 'http: //www.163.com/favicon.ico',
          content: comment[i].content,
          nickname: comment[i].user.nickname || '网易用户',
          create_time: comment[i].createTime,
          update_time: comment[i].createTime,
          article_id,
          sourceId: comment[i].postId
        }
        await this.updateNewsComment(obj)
      }
    }catch(e){
      throw Error('评论添加错误')
    }  
    res.send({
      status: 1
    })
  }

  // 获取全部评论条数
  async getALLCommentLength(req, res, next) {
    try {
      await CommentModel.find(function (err, docs) {
        res.send({
          status: 1,
          data: docs.length
        })
      })
    } catch (err) {
      res.send({
        status: 0,
        type: 'GET_ALLNEWSLENGTH_FAIL',
        message: '获取评论条数错误'
      })
    }
  }


  //获取新闻评论
  async getNewsComment(req, res, next){
    let id = req.query.id
    let data = await this.queryNewsComment(id)
    res.send({
      status: 1,
      data
    }) 
  }

  /**
   * 查询新闻的评论
   *
   * @param {*} id 新闻的id
   * @memberof Comment
   */
  async queryNewsComment(id){
    try{
      const data = await CommentModel.find({article_id: id})
      return data
    }catch(e){
      throw Error('获取新闻评论错误')
    }
  }

  // 获取？天~现在的评论条数
  async getCommentDayLength(req, res, next) {
    let day = req.query.day || 1
    let dayArr = await this.getDayLength(CommentModel, day)
    res.send({
      status: 1,
      data: dayArr
    })
  }

  //判断评论是否重复值并添加进数据库
  async updateNewsComment(data) {
    const sourceId = await  this.findIsValue(CommentModel, {sourceId: data.sourceId})
    if(!sourceId){
      await CommentModel.create(data)
    }
    return;
  }
}

export default new Comment