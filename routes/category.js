'use strict'
import express from 'express'
import Category from '../controller/category/category'
const router = express.Router()


router.get('/getAllCategory', Category.getAllCategory) // 获取所有的类型
router.post('/addNewsCategory', Category.addNewsCategory) // 添加新闻类型
export default router