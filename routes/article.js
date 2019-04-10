'use strict'
import express from 'express'
import Article from '../controller/article/article'
const router = express.Router()

router.get('/getArticleContent', Article.getArticleContent) //获取新闻内容
router.get('/getCurrentNews', Article.getCurrentNews)  //获取实时新闻
router.get('/addNews', Article.addNews)
router.get('/test', Article.test)
router.get('/getNews', Article.getNews) //获取新闻
router.get('/getNewsContent', Article.getNewsContent) //获取该新闻内容
router.get('/getNewsList', Article.getNewsList) //获取多少条新闻
router.post('/getNewsAllLists', Article.getNewsAllLists) //获取所有新闻并展现给管理员端
router.post('/getPageNews', Article.getPageNews) //根据页数获取指定条新闻
router.get('/getALLNewsLength', Article.getALLNewsLength) // 获取全部新闻的条数
router.get('/getNewsDayLength', Article.getNewsDayLength) // 获取？天~现在的每天新闻条数
router.post('/queryDayNews', Article.queryDayNews) // 查询某天的所有新闻
router.post('/queryAuthorNews', Article.queryAuthorNews) // 查询某个作者的所有新闻
router.post('/queryTimeNews', Article.queryTimeNews) // 查询某个时间段的新闻
router.get('/getNewsById', Article.getNewsById) // 根据id获取新闻数据
export default router