'use strict'
var express = require('express');
var router = express.Router();
import Admin from '../controller/admin/admin'




router.get('/test', function (req, res, next) {
  res.send('success')
})
router.post('/login', Admin.login);
router.get('/getPosition',Admin.getPosition);
export default router