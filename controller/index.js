/**
 * Created by wurui on 9/24/16.
 */

const fs=require('fs');
const path=require('path');


var appDir=path.join(__dirname,'../')


module.exports=async function(ctx){
    //logger('gogoging')
    //ctx.body=123;
    ctx.redirect('/index.html')

}
module.exports.getlog=async function(ctx){
    var limit=ctx.query.limit||100;


    var result= fs.readFileSync(path.join(__dirname,'../autopub.log'));
    ctx.body= result.slice(-limit);
/*
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
   */
}