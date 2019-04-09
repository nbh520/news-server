'use strict'

import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'
import Today from '../../spider/TodayHeadline'
import WangYiNews from '../../spider/WangYiNews'
import ajax from '../../api/ajax'
import articleMethod from './articleMethod.js'

class Article extends BaseComponent{
  constructor(){
    super()
    this.getCurrentNews = this.getCurrentNews.bind(this)
    this.addNews = this.addNews.bind(this)
    this.getNews = this.getNews.bind(this)
    this.getRandomArrayElements = this.getRandomArrayElements.bind(this)
    this.getNewsList = this.getNewsList.bind(this)
    this.getNewsDayLength = this.getNewsDayLength.bind(this)
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
    result.forEach(async item => {
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
      //添加进数据库
      data.push(obj)
    })
    //新闻添加进数据库
    articleMethod.createNewsData(data)
    // this.addNews(data)
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

  // 获取新闻条数
  async getNewsList(req, res, next) {
    let limit = req.query.limit || 10
    try{
      let result = await ArticleModel.find().select({_id: 0}).exec()
      let data = this.getRandomArrayElements(result, limit)
      res.send({
        status: 1,
        data
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'NEWS_GET_ERROR',
        message: '获取新闻错误'
      })
    }
    
  }

  // 获取？天~现在的新闻条数
  async getNewsDayLength(req, res, next) {
    let  day  =  req.query.day || 1
    let dayArr = await this.getDayLength(ArticleModel, day)
    res.send({
      status: 1,
      data: dayArr
    })
  }

  // 获取新闻类型
  async getNewsType(req, res, next){

  }

  // 查询某天的所有新闻
  async queryDayNews(req, res, next) {
    let day = req.body.day || moment().format('YYYY-MM-DD')
    day = day + ' 00:00:00'    
    try{
      await ArticleModel.find({
       create_time: {
         $gte: day,
         $lte: moment(day, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD HH:mm:ss')
       }
      },function(err, docs){
        res.send({
          status: 1,
          data: docs
        })
      })
      
    } catch(err) {
      res.send({
        status: 0,
        type: 'QUERY_NEWS_ERROR',
        message: '查询错误'
      })
    }
    
  }

  // 搜索某个媒体的所有新闻
  async queryAuthorNews(req, res, next) {
    const { author } = req.body
    try {
      await ArticleModel.find({ author }, function(err, docs) {
        res.send({
          status: 1,
          data: docs
        })
      })
    
    } catch(err){
      res.send({
        status: 0,
        type: 'QUERYAUTHORNEWS_FAIL',
        message: '查询错误'
      })
    }
    
  }

  //获取新闻内容
  async getNewsContent(req, res, next){
    let url = req.query.url
    let source = req.query.source
    if (source == '网易') {
      WangYiNews.getNewsContent(url).then(async data => {
        res.send({
          status: 1,
          data
        })
      })
    }
    
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

  // 根据id删除新闻
  async deleteIdNews(req, res, next) {
    const { id } = req.body
    try{
      await ArticleModel.remove({ id }, function() {
        res.send({
          status: 1,
          data: 'success'
        })
      })
    } catch(err) {
      res.send({
        status: 0,
        type: 'DELETE_NEWS_FAIL',
        message: '删除新闻错误'
      })
    }
    
  }

  // 查询时间段的新闻
  async queryTimeNews(req, res, next) {
    const { startTime, lastTime } = req.body
    try{
      await ArticleModel.find({ create_time: {$gte: startTime, $lte: lastTime}}, function(err, docs){
        res.send({
          status: 1,
          data: docs
        })
      })
    } catch(err) {
      res.send({
        status: 0,
        type: 'QUERY_TIMENEWS_FAIL',
        message: '查询某个时间段新闻错误'
      })
    }
  }

  //获取新闻评论
  async getNewsComment(id, source) {
    if (source == '网易') {
      let hotComments = await WangYiNews.getIdHotComment(id)
      //评论添加进数据库
      ajax('http://localhost:4001/comment/addNewsComment', {
        comment: hotComments,
        articleId: id
      }, 'POST')
    }
  }

  //获取所有新闻
  async getNewsAllLists(req, res, next){
    try{
      let newsList = ArticleModel.find(function(err, docs){
        if(err){
          res.send({
            status: 0,
            type: 'GET_NWESLIST_FAIL',
            message: '获取新闻列表错误'
          })
        }
        res.send({
          status: 1,
          data: docs
        })
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_NWESLIST_FAIL',
        message: '获取新闻列表错误'
      })
      throw new Error(err)
    }
  }

  // 获取全部新闻条数
  async getALLNewsLength(req, res, next){
    try{
      ArticleModel.find(function(err, docs){
        res.send({
          status: 1,
          data: docs.length
        })
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_ALLNEWSLENGTH_FAIL',
        message: '获取新闻条数错误'
      })
    }
  }

  //根据页数获取指定条新闻
  async getPageNews(req, res, next) {
    const { page, limit } = req.body
    try{
      let newsList = ArticleModel.find(function(err, docs){
        let dataArr = docs.slice((page - 1) * limit, (page - 1) * limit + limit)
        res.send({
          status: 1,
          data: {
            total: docs.length,
            items: dataArr
          }
        })
      })
    }catch(err) {
      res.send({
        status: 0,
        type: 'GET_NWESLIST_FAIL',
        message: '获取新闻错误'
      })
      throw Error(err)
    }
    
  }


  //从数组随机选取几个元素
  getRandomArrayElements(arr, count){
    let shuffled = arr.slice(0),
        i = arr.length,
        min = i - count,
        temp,
        index;
    while(i-- > min){
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  }
}
export default new Article