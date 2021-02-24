
const Router=require('koa-router');

const router = new Router();

const index=require('../controller/p/index')
const api=require('../controller/api/index')
//var osshook=require('../controller/osshook')
//var uploadtar=require('../controller/uploadtar')
//var oauth=require('../controller/oauth')
//var gitAdmin=require('../controller/git_admin')
//var subscribe=require('../controller/subscribe')

router.all('/api/:group/:which', api)

router.all('/:group/:page\.:ext?', index)
router.all('/:page\.:ext?', index)
router.get('/', index);

/*
router.get('/', index);

router.post('/subscribe', subscribe.post);
router.get('/subscribe', subscribe.get);

router.get('/getlog', index.getlog);
*/

/*
router.get('/oauth/callback/:key', oauth.callback);
router.get('/oauth/callback/', oauth.callback);


router.get('/oauth', function(req,res,next){
    res.redirect('./oauth.html')
});
router.post('/oauth', oauth.index);


router.post('/githook', gitAdmin.hook);
router.get('/githook', gitAdmin.hook);

router.post('/osshook', osshook.index);
router.get('/osshook', osshook.index);
*/
//router.post('/uploadtar', uploadtar.index);
//router.get('/test',gitAdmin.test)

router.all('(.*)', async (ctx, next)=> {
    //console.log(ctx.url,ctx.status);

    if(ctx.status < 400){
      return next()
    }

    var url = ctx.url.split('?')[0],
        ext = url.substr(url.lastIndexOf('.') + 1);
 
    // console.log(req.headers.accept);
    switch (ext) {
        case 'xsl':
            
            ctx.redirect('/xsl/404.xsl');
            
            
            break;
        case 'js':
        case 'css':
            ctx.body='/* url:' + ctx.url + 'NOT FOUND */';
            break;
        case 'png':
        case 'jpg':
        case 'gif':
        case 'jpeg':
            ctx.type='image';
            //ctx.status = 404;
            
            ctx.redirect('/img/404-img.png');
            break
        default:
            
            ctx.status = 404;
            
           // res.type('xml');
            //res.redirect('/p/404?backurl=' + encodeURIComponent(req.url));
            break;

    }


})

module.exports = router;
