'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const articleSchema = new Schema({
  id: {type: Number, unique: true},
  create_time: String,
  update_time: String,
  author: String,
  title: String,    //文章标题
  source_id: String, //来源的ID， 用来判读是否重复
  user_id: Number,   // 作者id
  coverImg: [],  // 封面图片
  clickCount: {type: Number, default: 0},    //点击量
  favoriteCount: {type: Number, default: 0}, //收藏量
  commentCount: {type: Number, default: 0},  //评论量
  voteCount: {type: Number, default: 0}, //点赞量
  avatar: String, //  作者头像
  category: String,      //分类
  content: String,       //内容
  description: String, //新闻描述
  source_address: String, // 新闻来源 -------> 网易 - 今日头条
  status: { type: String, default: 'published'}
})

articleSchema.index({id: 1});

const article = mongoose.model('article', articleSchema)

export default article