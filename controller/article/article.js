'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: Number,
  create_time: String,
  update_time: String,
  author: String,
  title: String,
  user_id: Number,   // 作者id
  coverImg: [],  // 封面图片
  clickCount: {type: Number, default: 0},    //点击量
  favoriteCount: {type: Number, default: 0}, //收藏量
  commentCount: {type: Number, default: 0},  //评论量
  category: String,      //分类
  content: String,       //内容
})

articleSchema.index({id: 1});

const article = mongoose.model('article', articleSchema)

export default article