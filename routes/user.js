'use strict'
var express = require('express');
var router = express.Router();
import User from '../controller/user/user'

router.post('/addUser', User.addUser) //向用户表添加数据
router.post('/queryValue', User.queryValue) //查询用户表里的某个键值

export default router
