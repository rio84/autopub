var express = require('express');
var router = express.Router();


var index=require('../controller/index')
var oauth=require('../controller/oauth')
var gitAdmin=require('../controller/git_admin')
var subscribe=require('../controller/subscribe')


router.get('/', index);
router.post('/subscribe', subscribe.post);
router.get('/subscribe', subscribe.get);

router.get('/getlog', index.getlog);

router.get('/oauth/callback/:key', oauth.callback);
router.get('/oauth/callback/', oauth.callback);


router.get('/oauth', function(req,res,next){
    res.redirect('./oauth.html')
});
router.post('/oauth', oauth.index);


router.post('/githook', gitAdmin.hook);
router.get('/githook', gitAdmin.hook);

router.get('/test',gitAdmin.test)


module.exports = router;
