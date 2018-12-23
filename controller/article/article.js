'use strict'

import ArticleModel from '../../models/article/article'
import BaseComponent from '../../prototype/BaseComponent'

class Article extends BaseComponent{
  constructor(){
    super()
  }
  async addArticle(req, res, next){
    let result = await super.fetch('https://link.jianshu.com/?t=http://www.toutiao.com/api/pc/feed/?category=news_tech&utm_source=toutiao&widen=1&max_behot_time=0&max_behot_time_tmp=0&tadrequire=true&as=A155493CA8EBB0F&cp=59C84BEB601F7E1')
    res.send({
      status: 0,
      result
    })
  }
  //获取今日头条新闻
  getTodayNews(){
    
  }
}
export default new Article