// 今日头条
import request from 'request'
import cheerio from 'cheerio'
import BaseComponent from '../prototype/BaseComponent'

class WangYiNews extends BaseComponent {
  constructor() {
    super();
  }
  getNewsContent(url, callback) {
    const options = {
      method: 'GET',
      url
    }
    
    request(options, (error, response, body) => {
      if (error) throw new Error(error)
      if (!error && response.statusCode === 200) {
        let $ = cheerio.load(body, {
          decodeEntities: false
        })
        this.getNewsReply(url)

        let data = {
          title: $('h1.title').text(),
          content: $('div.content').html()
        }
        callback(data)
      }
    })
    return;
  }
  getNewsReply(url){
    //提取URL中最后的docid值
    let num = url.lastIndexOf("\/")
    let num1 = url.lastIndexOf(".")
    let str = url.substring(num, num1)
    let newUrl = `http://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads${str}/comments/newList`

    
    console.log(newUrl)
  }
}
export default new WangYiNews