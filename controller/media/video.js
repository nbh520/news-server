'use strict'

import VideoModel from '../../models/media/video'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'

class Video extends BaseComponent{
  constructor(){
    super()
    this.getVideoList = this.getVideoList.bind(this)
  }

  //获取视频列表
  async getVideoList(req, res, next){
    //获取视频
    let result = await this.fetch('http://baobab.kaiyanapp.com/api/v4/tabs/selected')
    let data = []
    for (let i of result.itemList) {
      if(i.type != 'video')
        break
      const id = await this.getId('video_id')
      let obj = {
        id,
        title: i.data.title,
        user_id: 0,
        source_id: i.data.id,
        create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
        author: i.data.author.name,
        avatar: i.data.author.icon,
        coverImg: i.data.cover.detail,
        clickCount: 0,
        favoriteCount: i.data.consumption.collectionCount,
        commentCount: i.data.consumption.replyCount,
        voteCount: 0,
        category: i.data.category, //分类
        content: i.data.playUrl, //内容
        description: i.data.description, //视频描述
        source_address: '开眼', // 视频来源 -------> 网易 - 今日头条
        duration: i.data.duration, // 播放时长
      }
      await this.fetch('http://localhost:4001/video/addVideo', {data: obj}, 'POST')
      data.push(obj)
    }
    res.send({
      status: 1,
      data
    })
  }

  //视频添加进数据库
  async addVideo(req, res, next){
    //获取视频信息
    let data = req.body.data
    //添加进video表里
    await VideoModel.create(data)
    try{
      res.send({
        status: 1,
        data: 'success'
      })
    }catch(err){
      res.send({
        status: 0,
        type: ADD_VIDEO_ERROR,
        message: '添加视频错误'
      })
    }
    
  }

}

export default new Video