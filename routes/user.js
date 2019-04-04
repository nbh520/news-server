'use strict'
var express = require('express');
var router = express.Router();
import User from '../controller/user/user'

router.post('/addUser', User.addUser) //向用户表添加数据
router.post('/queryValue', User.queryValue) //查询用户表里的某个键值
router.get('/getUserDayLength', User.getUserDayLength) // 获取？天~现在的用户条数
router.get('/queryUserAddress', User.queryUserAddress) // 查询用户分布地区
export default router
