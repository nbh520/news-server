'use strict'

import express from 'express'
import Video from '../controller/media/video'
const router = express.Router()

router.get('/getVideoList', Video.getVideoList) //获取视频列表
router.post('/addVideo', Video.addVideo) //添加视频进数据库
router.get('/getRecommendVideo', Video.getRecommendVideo) //获取推荐视频
router.get('/getVideoDayLength', Video.getVideoDayLength) // 获取？天~现在的视频条数
router.get('/getALLVideoLength', Video.getALLVideoLength) // 获取视频条数错误

export default router