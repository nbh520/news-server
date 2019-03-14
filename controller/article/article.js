'use strict'

import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'
import Today from '../../spider/TodayHeadline'
import WangYiNews from '../../spider/WangYiNews'
import ajax from '../../api/ajax'

class Article extends BaseComponent{
  constructor(){
    super()
    this.getCurrentNews = this.getCurrentNews.bind(this)
    this.addNews = this.addNews.bind(this)
    this.getNews = this.getNews.bind(this)
  }
  test(req, res, next) {
    res.send('success')
  }

  //添加新闻到数据库
  async addNews(data) {
    if(data instanceof Array){
      try{
        for(let i of data){
          const isValue = await this.findIsValue(ArticleModel, {source_id: i.source_id})
          if (!isValue){
            const article_id = await this.getId('article_id')
            i.id = article_id
            await ArticleModel.create(i)
            //获取该新闻的评论并添加进数据库
            this.getNewsComment(i.source_id, '网易')
          }             
        }       
      }catch(e){
        throw Error('添加错误')
      }  
    }
    return;
  }

  //获取新闻
  async getNews(req, res, next){
    //获取网易云接口数据
    let result = await this.fetch('http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html')
    let data = []
    Object.keys(result).forEach(key => {
      result = result[key]
    })
    result.forEach(item => {
      if(!item.url || !item.digest)
        return;
      let obj ={
        create_time: item.ptime,
        update_time: item.mtime,
        commentCount: item.replyCount,
        voteCount: item.votecount,
        author: item.source,
        title: item.title,
        source_id: item.docid,
        user_id: 1,
        coverImg: item.imgsrc,
        category: '暂无',
        content: item.url,
        description: item.digest,
        avatar: 'http://www.163.com/favicon.ico',
        source_address: '网易'
      }
      data.push(obj)
    })
    //新闻添加进数据库
    this.addNews(data)
    res.send({
      status: 1,
      data
    })
  }

  //获取文章内容
  async getArticleContent(req, res, next) {
    let newsUrl = req.query.url
    WangYiNews.getNewsContent(newsUrl).then(async data => {
      res.send({
        status: 1,
        data
      })
      
    })
  }



  //获取新闻评论
  async getNewsComment(id, source){
    if(source === '网易'){
      let hotComments = await WangYiNews.getIdHotComment(id)
      //评论添加进数据库
      ajax('http://localhost:4001/comment/addNewsComment', {comment: hotComments,articleId: id }, 'POST')
    }
  }

  //获取新闻内容
  async getNewsContent(req, res, next){
    let id = req.query.id
    let source = req.query.source
    if(source == '网易'){
      WangYiNews.getWangYiNewsContent(id)
    }
    res.send('success')
  }

  //获取实时新闻
  async getCurrentNews(req, res, next){
    let result = await this.fetch('http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html')
    
    Object.keys(result).forEach(key => {
      result = result[key]
    })
    let data = []
    result.forEach(item => {
      let obj = {
        source: item.source, //新闻来源
        title: item.title, //新闻标题
        image: item.imgsrc, //封面图片
        ctime: item.ptime, //创建时间
        lmodify: item.lmodify, //修改时间
        replyCount: item.replyCount, //回复评论数
        description: item.digest,  // 描述
      }
      data.push(obj)     
    })
    res.send({
      status: 1,
      data
    })
  }
}
export default new Article