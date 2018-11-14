var express = require('express');
var router = express.Router();
const ajax = require('../api/ajax')

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
    res.send(data)
  })
})

module.exports = router;