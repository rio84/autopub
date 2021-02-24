const path=require('path');
const fs=require('fs');
module.exports.getlog=async function(ctx){
    var limit=ctx.query.limit||100;


    var result= fs.readFileSync(path.join(__dirname,'../../autopub.log'));
    return result.toString().split('\n').slice(-limit);
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