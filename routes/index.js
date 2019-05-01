var express = require('express');
var router = express.Router();
import admin from './admin'
import test from './test'
import article from './article'
import comment from './comment'
import video from './video'
import user from './user'
import category from './category'
import search from './search'

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
  app.use('/user', user)
  app.use('/category', category)
  app.use('/search', search)
}