var express = require('express');
var router = express.Router();


var index=require('../controller/index')



router.get('/', index);


module.exports = router;
