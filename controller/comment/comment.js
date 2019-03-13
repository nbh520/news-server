'use strict'
import CommentModel from '../../models/comment/comment'
import BaseComponent from '../../prototype/BaseComponent'

class Comment extends BaseComponent{
  constructor(){
    super()
    this.addNewsComment = this.addNewsComment.bind(this)
  }
  //将新闻评论添加进数据库
  async addNewsComment(req, res, next) {
    let comment = req.body.comment
    for(let i  of comment){
      i.id = await this.getId('comment_id')
      i.thumbsCount = i.vote
      i.user_id = i.user_id || 3
      await CommentModel.create(i)
    }

    res.send("success")
  }
}

export default new Comment