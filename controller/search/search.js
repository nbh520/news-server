'use strict'
import BaseComponent from '../../prototype/BaseComponent'
import VideoModel from '../../models/media/video'
import ArticleModel from '../../models/article/article'
import UserModel from '../../models/user/user'
class Search extends BaseComponent {
  constructor() {
    super()
  }
  test(req, res, next) {
    res.send('success')
  }

  // 默认搜索
  async search(req, res, next) {
    let { keyword, page = 1 } = req.query
    try {
      // 查询文章
      let article = await ArticleModel.find({title: new RegExp(keyword)})
      article = article.slice((page - 1) * 10, page * 10)
      // 查询作者
      let author = await UserModel.find({ nickname: keyword })
      res.send({
        status: 1,
        data: {
          article,
          author
        }
      })
    } catch(err) {
      throw new Error(err)
      res.send({
        status: 0,
        type: 'FIND_FAIL',
        message: '查找出错'
      })
    }
    

  }
}

export default new Search