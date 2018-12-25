'use strict'

import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/BaseComponent'
import moment from 'moment'

class Article extends BaseComponent{
  constructor(){
    super()
    this.addArticle = this.addArticle.bind(this)
  }
  async addArticle(req, res, next){
    let result = await super.fetch('https://link.jianshu.com/?t=http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1')
    let data = result.data

    try{
      data.forEach(async data => {
        const article_id = await this.getId('article_id').then(item => console.log(article_id))
        let newArticle = {
          id: article_id,
          create_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          update_time: moment().format('YYYY-MM-DD HH:mm:ss'),
          author: data.source,
          title: data.title,
          source_id: data.item_id,
          user_id: 0,
          coverImg: data.image_list,
          category: '暂无',
          content: data.source_url
        }
        // await ArticleModel.create(newArticle)
        console.log(article_id)
      })
      
    }catch(err){
      throw Error('添加错误')
    }
    res.send({
      status: 1,
      result: data
    })
  }
  getTodayNews(){
    
  }
}
export default new Article