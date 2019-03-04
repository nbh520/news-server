// 今日头条
import request from 'request'
import cheerio from 'cheerio'
import BaseComponent from '../prototype/BaseComponent'

class WangYiNews extends BaseComponent {
  constructor() {
    super();
  }
  getNewsContent(url, callback) {
    // let result = {}
    const options = {
      method: 'GET',
      url
    }
    let result = request(options, (error, response, body) => {
      if (error) throw new Error(error)
      if (!error && response.statusCode === 200) {
        let $ = cheerio.load(body, {
          decodeEntities: false
        })
        let data = {
          title: $('h1.title').text(),
          content: $('div.content').html()
        }
        callback(data)
      }
    })
    return;
  }
}
export default new WangYiNews