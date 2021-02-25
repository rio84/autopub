const path=require('path');
const fs=require('fs');
const child_process=require('child_process');

module.exports.getlog=async function(ctx){
    var limit=ctx.query.limit||100;
    var appname=ctx.query.appname;
    
    var logPath=path.join(__dirname,'../../',appname?`../${appname}`:'','autopub.log');
    if(appname){

        var autopubjsonfile=path.join(__dirname,`../../../${appname}/autopub.json`)

        if(fs.existsSync(autopubjsonfile)){
            var json=JSON.parse(fs.readFileSync(autopubjsonfile).toString());
            if(json.logsDir){
                if(process.env.NODE_ENV=='development'){
                    logPath='/usr/local/nginx/logs/access.log'
                }else{
                    logPath=path.join(json.logsDir,`${appname}.log`)
                }
                //
                
            }else{
                throw 'NO logfile specified';
            }
           
                            
        }else{
            throw 'NO Such File'
        }
    }else{
        logPath=path.join(__dirname,'../../autopub.log');
    }
    return await new Promise((resolve,reject)=>{
        var result=[];
        child_process.spawn('tail', ['-n',limit,logPath], {
             
        }).on('close', function (code) {
            resolve(result);

        }).on('error',function(e){
            reject(e);

        }).stdout.on('data',function(r){
                //console.log(typeof r.toArray)
            result=result.concat( r.toString().split('\n'))
        })
        
        //return result.reverse();
    })
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