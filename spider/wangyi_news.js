const cheerio = require('cheerio')
const request = require('request')
const iconv = require('iconv-lite')

class WangYiSpider {
  constructor() {}
  start(req, res, next) {
    let strUrl = '' //传入过来的数据转成URL
    const article = {
      year: req.params.year,
      day: req.params.day,
      hour: req.params.hour,
      article: req.params.article
    };
    Object.keys(article).forEach(key => {
      strUrl = strUrl + article[key] + '/'
    })
    strUrl = strUrl.substr(0, strUrl.lastIndexOf('/'))
    const url = 'http://3g.163.com/news/' + strUrl + '.html'
    //爬取网易文章数据
    request({
      url,
      encoding: null
    }, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let $ = cheerio.load(body, {
          decodeEntities: false
        })
        let html = `<div class='head'>${$('article .head').html()}</div>
            <div class = 'content' > ${$("article .content").html()} </div>`;
        res.send(html)
      }
    })
  }

}

module.exports = new WangYiSpider()