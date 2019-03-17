'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const videoSchema = new Schema({
  id: Number,
  title: String,
  source_id: String,
  create_time: String,
  update_time: String,
  author: String,
  avatar: String,
  coverImg: String,
  clickCount: {type: Number, default: 0},    //点击量
  favoriteCount: {type: Number, default: 0}, //收藏量
  commentCount: {type: Number, default: 0},  //评论量
  voteCount: {type: Number, default: 0}, //点赞量
  category: String, //分类
  content: String, //内容
  description: String, //新闻描述
  source_address: String, // 新闻来源 -------> 网易 - 今日头条
})

videoSchema.index({id: 1})

const video = mongoose.model('video', videoSchema)

export default video