// 今日头条
import request from 'request'
import cheerio from 'cheerio'
import BaseComponent from '../prototype/BaseComponent'

class TodayHeadline extends BaseComponent {
  constructor(){
    super();
  }
  async getNewsContent(url){
    console.log(url)
    const options = {
      method: 'GET',
      url: 'https://www.toutiao.com/a6664109256448410124/',
      headers: {
        'Postman-Token': '9d024de2-6005-49c7-b7d1-384a3f33a619',
        'cache-control': 'no-cache'
        }
    }
    request(options, function (error, response, body) {
      if(error) throw new Error(error)
      console.log(body)

      if (!error && response.statusCode === 200) {
        // console.log(JSON.stringify(body))
        let $ = cheerio.load(body, {
          decodeEntities: false
        })
        // let html = `<div class='head'>${$('article .head').html()}</div>
        //     <div class = 'content' > ${$("article .content").html()} </div>`;
        console.log($.html())
      }
    }
    )
  }
}
export default new TodayHeadline