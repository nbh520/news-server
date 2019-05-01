'use strict'
var express = require('express');
var router = express.Router();
import search from '../controller/search/search'

router.post('/test', search.test)
export default router