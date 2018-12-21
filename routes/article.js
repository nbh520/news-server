'use strict'
import express from 'express'
import Article from '../controller/article/article'
const router = express.Router()

router.get('/addArticle', Article.addArticle)

export default router