var express = require('express');
var router = express.Router();
const ajax = require('../api/ajax')
const request = require('request')
const cheerio = require('cheerio')
const WangYiSpider = require('../spider/wangyi_news')


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

//获取网易新闻内容
router.get('/wangyi/:year/:day/:hour/:article', WangYiSpider.start)


module.exports = router;