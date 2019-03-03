// 今日头条
import request from 'request'
import cheerio from 'cheerio'

class TodayHeadline{
  constructor(){}
  getNewsContent(url){
    console.log(url)
    const options = {
      url: 'https://www.toutiao.com/a6664109256448410124/',
      method: 'get',
      "Content-Type": "text/html; charset=utf-8",
      encoding: null
    }
    request(options, function (error, response, body) {
        console.log(body)

      if (!error && response.statusCode === 200) {
        console.log(body)
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