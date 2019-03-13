'use strict'
import express from 'express'
import Comment from '../controller/comment/comment'
const router = express.Router()

router.post('/addNewsComment', Comment.addNewsComment) //添加评论进数据库
export default router