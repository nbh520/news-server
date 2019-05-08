'use strict'
var express = require('express');
var router = express.Router();
import search from '../controller/search/search'

router.post('/test', search.test)
router.get('/search', search.search) // 默认搜索
export default router