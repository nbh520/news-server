'use strict'

import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'
import Today from '../../spider/TodayHeadline'
import WangYiNews from '../../spider/WangYiNews'

class Article extends BaseComponent{
  constructor(){
    super()
    // this.addArticle = this.addArticle.bind(this)
    this.getCurrentNews = this.getCurrentNews.bind(this)
    this.addNews = this.addNews.bind(this)
    this.getNews = this.getNews.bind(this)
  }
  test(req, res, next) {
    res.send('success')
  }
  async addArticle(req, res, next){
  //   let result = await this.fetch('http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1')
  //   let data = result.data

  //   try{
  //     // data.forEach(data => {
  //     //   const article_id = this.getId('article_id').then(res => console.log('result ' + res))
  //     //   // let newArticle = {
  //     //   //   id: article_id,
  //     //   //   create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
  //     //   //   update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
  //     //   //   author: data.source,
  //     //   //   title: data.title,
  //     //   //   source_id: data.item_id,
  //     //   //   user_id: 0,
  //     //   //   coverImg: data.image_list,
  //     //   //   category: '暂无',
  //     //   //   content: data.source_url
  //     //   // }
  //     //   // await ArticleModel.create(newArticle)
  //     //   // console.log('result ' + article_id)
  //     // })
  //   }catch(err){
  //     throw Error('添加错误')
  //   }
  //   res.send({
  //     status: 1,
  //     result: data
  //   })
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
        description: item.digest
      }
      data.push(obj)
    })
    this.addNews(data)
    res.send({
      status: 0,
      data
    })
  }

  //获取文章内容
  async getArticleContent(req, res, next) {
    let newsUrl = req.query.url
    WangYiNews.getNewsContent(newsUrl).then(data => {
      res.send({
        status: 1,
        data
      })
    })
    
  }

  //获取文章新评论
  getArticleComment(req,res, next){
    
  }
  //获取实时新闻
  async getCurrentNews(req, res, next){
    let result = await this.fetch('http://c.3g.163.com/nc/article/list/T1467284926140/0-20.html')
    
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