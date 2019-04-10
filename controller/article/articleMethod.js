'use strict'
import ArticleModel from '../../models/article/article'
import UserModel from '../../models/user/user'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'
import WangYiNews from '../../spider/WangYiNews'

// 获取新闻的类型的URL
// export function getNewsType(){
//   const type = {
//     '娱乐': 'BA10TA81wangning',
//     '电视': 'BD2A86BEwangning',
//     '电影': 'BD2A9LEIwangning',
//     '明星': 'BD2AB5L9wangning',
//     '音乐': 'BD2AC4LMwangning',
//     '体育': 'BA8E6OEOwangning',
//     '财经': 'BA8EE5GMwangning',
//     '军事': 'BAI67OGGwangning',
//     '军情': 'DE0CGUSJwangning',
//   }
// }
class articleMethod extends BaseComponent{
  constructor(){
    super()
    this.newsType = {
      '娱乐': 'BA10TA81wangning',
      '电视': 'BD2A86BEwangning',
      '电影': 'BD2A9LEIwangning',
      '明星': 'BD2AB5L9wangning',
      '音乐': 'BD2AC4LMwangning',
      '体育': 'BA8E6OEOwangning',
      '财经': 'BA8EE5GMwangning',
      '军事': 'BAI67OGGwangning',
      '军情': 'DE0CGUSJwangning'
    }
    this.city = ['北京', '武汉', '深圳', '广州', '上海', '杭州', '成都', '深圳', '北京', '上海', '深圳', '北京', '深圳' ]
  }
  async createNewsData(data) {
    if(typeof data == 'undefined') return
    if(!Array.isArray(data)){
      data = [].push(data)
    }
    try {
      for (let i of data) {
        const isValue = await this.findIsValue(ArticleModel, {
          source_id: i.source_id
        })
        if (!isValue) {
          const article_id = await this.getId('article_id')
          i.id = article_id
          await ArticleModel.create(i)
          // 创建一个用户
          await this.createDefaultUserData(i)
          //获取该新闻的评论并添加进数据库
          this.createNewsHotComment(i.source_id)
          // this.getNewsComment(i.source_id, '网易')
        }
      }
    } catch (err) {
      throw Error(err)
    }
  }

  // 创建一个默认的用户
  async createDefaultUserData({ author, avatar }) {
    try{
      const isValue = await this.findIsValue(UserModel, { username: author})
      if(!isValue){
        const user_id = await this.getId('user_id')
        let obj = {
          id: user_id,
          nickname: author,
          username: author,
          avatar,
          create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          password: '123456',
          address: this.city[Math.floor(Math.random() * this.city.length )],
        }
        await UserModel.create(obj)
      }
    } catch(err) {
      throw Error(err)
    }
  }

  // 创建热评添加进数据库
  async createNewsHotComment(id){
    let hotComments = await WangYiNews.getIdHotComment(id)
    //评论添加进数据库
    this.fetch('http://localhost:4001/comment/addNewsComment', {
      comment: hotComments,
      articleId: id
    }, 'POST')
  }

  // 根据网易新闻url获取新闻内容
  async getNewsContentByWY(url){
    let result = await WangYiNews.getNewsContent(url)
    result.content = result.content.replace(/data-src/g, 'src')
    return result
  }

  test(){
    console.log('测试')
  }
}

export default new articleMethod