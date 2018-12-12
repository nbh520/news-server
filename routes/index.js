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

/**
 * 获取今日头条新闻
 */
router.get("/get_toutiao_news", function (req, res, next) {
  let result = ajax('https://m.toutiao.com/list/', {
    tag: '__all__',
    ac: 'wap',
    count: 20,
    format: 'json_raw',
    as: 'A125A8CEDCF8987',
    cp: '58EC18F948F79E1',
    min_behot_time: parseInt(new Date().getTime() / 1000)
  }).then(data => {
    res.send({
      data
    })
  })
})

//获取网易新闻内容
router.get('/wangyi/:year/:day/:hour/:article', WangYiSpider.start)

router.get('/user', function (req, res, next) {
  req.session.user = 'sdaf'
  console.log(req.session.user)

});




module.exports = router;