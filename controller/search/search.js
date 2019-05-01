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
    let { keyword } = req.body
  }
}

export default new Search