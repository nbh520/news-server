'use strict'
var express = require('express');
var router = express.Router();
import Admin from '../controller/admin/admin'




router.get('/test', function (req, res, next) {
  res.send('success')
})
router.post('/login', Admin.login);
router.get('/getAdminInfo', Admin.getAdminInfo)//获取管理员信息
router.post('/logout', Admin.logout) //退出管理员
router.get('/getPosition',Admin.getPosition);
export default router