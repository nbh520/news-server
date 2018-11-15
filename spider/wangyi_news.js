const cheerio = require('cheerio')
const request = require('request')
const iconv = require('iconv-lite')

class WangYiSpider {
  constructor() {}
  start() {
    let html = ''
    request({
      url: 'http://3g.163.com/news/18/1115/10/E0L8BNJR000189FH.html',
      encoding: null
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        parseHtml(body)
      }
    })

    function parseHtml(data) {
      let $ = cheerio.load(data, {
        decodeEntities: false
      })
      html = `<div class='head'>${$('article .head').html()}</div>
            <div class = 'content' > ${$("article .content").html()} </div>`;
      res.send(html)
    }
  }

}

export default new WangYiSpider()