var express = require('express');
var router = express.Router();


var index=require('../controller/index')
var oauth=require('../controller/oauth')



router.get('/', index);

router.get('/oauth/callback/:key', oauth.callback);
router.get('/oauth/callback/', oauth.callback);


router.get('/oauth', function(req,res,next){
    res.redirect('./oauth.html')
});
router.post('/oauth', oauth.index);


module.exports = router;
