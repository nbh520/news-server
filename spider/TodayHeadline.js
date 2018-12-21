// 今日头条
const request = require('request')
const cheerio = require('cheerio')

class TodayHeadline{
  constructor(){}
  getNews(){
    request('https://www.toutiao.com/api/pc/feed/?category=news_tech',function (error, res, body) {
        let $ = cheerio.load(body, { decodeEntities: false})
        console.log(body)
      })
  }
}
new TodayHeadline().getNews()