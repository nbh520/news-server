'use strict'

import VideoModel from '../../models/media/video'
import BaseComponent from '../../prototype/BaseComponent'
import UserModel from '../../models/user/user'
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
      if(i.type === 'video'){
        //判断用户表里是否有这个用户  
        let isName = await this.findIsValue(UserModel, {
          username: i.data.author.name
        })
        if (!isName) {
          //获取一个用户Id
          let userId = await this.getId('user_id')
          //添加一个用户到用户表里面
          await this.fetch('http://localhost:4001/user/addUser', {
            data: {
              id: userId,
              nickname: i.data.author.name,
              avatar: i.data.author.icon,
              create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
              username: i.data.author.name,
              password: '123456',
              address: '中国',
            }
          }, 'POST')
        }

        //判断表里是否有视频信息
        let isVideo = await this.findIsValue(VideoModel, {
          source_id: i.data.id
        })
        // 如果表里没有这个数据
        if (!isVideo) {
          let videoId = await this.getId('video_id')
          let videoUserName = i.data.author.name
          let videoUserId = await this.fetch('http://localhost:4001/user/queryValue', {
                data: {
                  key: 'id',
                  name: videoUserName
                }
          }, 'POST')
          let obj = {
            id: videoId,
            title: i.data.title,
            user_id: videoUserId.data,
            source_id: i.data.id,
            create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            author: videoUserName,
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
          //将视频信息添加进数据库
          await this.fetch('http://localhost:4001/video/addVideo', {
            data: obj
          }, 'POST')
          
          
          data.push(obj)
        }
        
      }
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