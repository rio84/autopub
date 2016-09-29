/**
 * Created by wurui on 9/24/16.
 */
var child_process=require('child_process');
var path=require('path');
var fs=require('fs');
var logger=require('../lib/logger')

var appDir=path.join(__dirname,'../')

module.exports=function(req,res,next){
    logger('gogoging')
    res.redirect('/index.html')
}
module.exports.getlog=function(req,res,next){
    var limit=req.query.limit||100;
    var fn=function(err,result){
        res.send({
            error:err,
            result:result.slice(-limit)
        })
        },
        result=null;

    child_process.spawn('cat', ['autopub.log'], {
         cwd: appDir
    }).on('close', function (code) {
        fn(code,result);

    }).on('error',function(e){


    }).stdout.on('data',function(r){
            //console.log(typeof r.toArray)
        result= r.toString().split('\n')
        })
   // res.redirect('/index.html')
}