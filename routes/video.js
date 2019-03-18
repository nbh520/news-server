'use strict'

import express from 'express'
import Video from '../controller/media/video'
const router = express.Router()

router.get('/getVideoList', Video.getVideoList) //获取视频列表
router.post('/addVideo', Video.addVideo) //添加视频进数据库

export default router