'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  id: Number,
  nickname: String,
  avatar: String,
  create_time: String,
  update_time: String,
  username: String,
  password: String,
  address: String,
})

userSchema.index({
  id: 1
})

const User = mongoose.model('user', userSchema)

export default User