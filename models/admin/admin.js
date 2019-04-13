'use strict'
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  username: String,
  password: String,
  id: Number,
  create_time: String,
  update_time: String,
  admin: { type: String, default: '管理员' },
  status: Number, //超级管理员----普通管理员
  avatar: { type: String, default: 'http://localhost:4001/news/images/default.gif' },
  city: String
})

adminSchema.index({id: 1}, {unique: true});
const Admin = mongoose.model('Admin', adminSchema);


export default Admin