/**
 * Created by wurui on 9/24/16.
 */
var logger=require('../lib/logger')
module.exports=function(req,res,next){
    logger('gogoging')
    res.redirect('/index.html')
}