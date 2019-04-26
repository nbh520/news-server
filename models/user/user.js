'use strict'

import mongoose from 'mongoose'
import moment from 'moment'
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  nickname: String,
  avatar: {type: String, default: 'http://localhost:4001/news/images/avatar/default.png'},
  create_time: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  update_time: { type: String, default: moment().format('YYYY-MM-DD HH:mm:ss') },
  username: String,
  password: String,
  address: String,
  favorite: [],  //  用户收藏
  like: [],  	     //  用户点赞
  comment: []		 //  用户评论
})

userSchema.index({
  id: 1
})

const User = mongoose.model('user', userSchema)

export default User