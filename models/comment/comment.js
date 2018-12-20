'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema({
  id: Number,
  article_id: Number, //评论文章id
  to_uid: Number,    //评论目标人的id，如果没有目标人，则该字段为空
  user_id: Number,   //评论人id
  content: String,  //评论内容
  create_time: String, //创建时间
  update_time: String, //修改时间
  thumbsCount: {type: Number, default: 0}, //点赞次数
})

commentSchema.index({id: 1})

const comment = mongoose.model('comment', commentSchema)

export default comment