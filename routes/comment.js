'use strict'
import express from 'express'
import Comment from '../controller/comment/comment'
const router = express.Router()

router.post('/addNewsComment', Comment.addNewsComment) //添加评论进数据库
router.get('/getNewsComment', Comment.getNewsComment) //获取新闻评论
router.get('/getCommentDayLength', Comment.getCommentDayLength) // 获取？天~现在的评论条数
router.get('/getALLCommentLength', Comment.getALLCommentLength) // 获取评论条数
export default router