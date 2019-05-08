'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const commentSchema = new Schema({
  id: Number,
  article_id: String, //评论文章id
  to_uid: {type: String, default: null},    //评论目标人的id，如果没有目标人，则该字段为空
  user_id: {type: String, default: null},   //评论人id
  content: String,  //评论内容
  create_time: String, //创建时间
  update_time: String, //修改时间
  thumbsCount: {type: Number, default: 0}, //点赞次数
  avatar: String, //头像
  nickname: String, //评论人昵称
  sourceId: String, //来源id  == 唯一值
  status: { type: String, default: 'published'} // 评论状态 published：发布，del：删除
})

commentSchema.index({id: 1})

const comment = mongoose.model('comment', commentSchema)

export default comment