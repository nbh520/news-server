var express = require('express');
var router = express.Router();
const ajax = require('../api/ajax')
const request = require('request')
const cheerio = require('cheerio')
import WangYiSpider from '../spider/wangyi_news'


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

/**
 * 获取当前实时新闻
 */
router.get('/now_news', function (req, res, next) {
  let result = ajax('http://c.m.163.com/nc/article/headline/T1348647853363/0-40.html').then(data => {
    res.send({
      code: 0,
      data: data['T1348647853363']
    })
  })
})
router.get('/test', function (req, res, next) {
  request({
    url: 'http://3g.163.com/news/18/1115/10/E0L8BNJR000189FH.htmle',
    encoding: null
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      // body = iconv.decode(body, 'utf-8')
      let $ = cheerio.load(body, {
        decodeEntities: false
      })
      let html = `<div class='head'>${$('article .head').html()}</div>
            <div class = 'content' > ${$("article .content").html()} </div>`;
      res.send(html)
    }
  })
})

router.get('/wangyi', function (req, res, next) {})
module.exports = router;