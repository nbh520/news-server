var express = require('express');
var router = express.Router();
import admin from './admin'
import test from './test'
import article from './article'
import comment from './comment'
import video from './video'

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// module.exports = router;
export default app => {
  app.use('/admin', admin)
  app.use('/test',test)
  app.use('/article', article)
  app.use('/comment',comment)
  app.use('/video', video)
}