// 今日头条
import request from 'request'
import cheerio from 'cheerio'
import BaseComponent from '../prototype/BaseComponent'

class WangYiNews extends BaseComponent {
  constructor() {
    super();
  }

  async getNewsContent(url,) {
    return new Promise((resolve, reject) => {
      let result = {}
      const options = {
        method: 'GET',
        url
      }
      request(options, async (error, response, body) => {
        if (error) throw new Error(error)
        if (!error && response.statusCode === 200) {
          let $ = cheerio.load(body, {
            decodeEntities: false
          })
          let reply = await this.getHotReply(url)
          result = {
            title: $('h1.title').text(),
            content: $('div.content').html(),
            reply
          }
          resolve(result)
        }
      })
    });
  }

  async getWangYiNewsContent(id){
    let url = "http://3g.163.com/news/19/0313/09/"+ id +".html"
    console.log(url)
  }

  /**
   * @param {*} attr 排序的属性 如number属性
   * @param {*} rev true表示升序排列，false降序排序
   * @returns
   * @memberof WangYiNews
   */
  sortBy(attr, rev) {
    if (rev == undefined) {
      rev = 1;
    } else {
      rev = (rev) ? 1 : -1;
    }
    return function (a, b) {
      a = a[attr];
      b = b[attr];
      if (a < b) {
        return rev * -1;
      }
      if (a > b) {
        return rev * 1;
      }
      return 0;
    }
  }
  //获取网易新闻热评
  async getHotReply(url){
    //提取URL中最后的docid值
    let num = url.lastIndexOf("\/")
    let num1 = url.lastIndexOf(".")
    let str = url.substring(num, num1)
    let newUrl = `http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads${str}/comments/newList`
    let HotCommentUrl = `http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads${str}/comments/hotList`
    let HotCommentData = await this.fetch(HotCommentUrl)
    let replyArr = [];
     for (let i in HotCommentData.comments) {
       let obj = {
         avatar: HotCommentData.comments[i].user.avatar || 'http://www.163.com/favicon.ico',
         content: HotCommentData.comments[i].content, //评论
         createTime: HotCommentData.comments[i].createTime, //创建时间
         vote: HotCommentData.comments[i].vote, //点赞数
         nickname: HotCommentData.comments[i].user.nickname || '游客', //用户名
       }
       replyArr.push(obj)
     }
    return replyArr.sort(this.sortBy('vote',false))
  }

  //根据Id 获取热评
  async getIdHotComment(id){
    let url = `http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/${id}/comments/hotList`
    console.log(url)
  }
}
export default new WangYiNews