const child_process=require('child_process');
const path=require('path');
const fs=require('fs');

module.exports={
    lsof:async function(port){

        return new Promise((resolve,reject)=>{
            var pid,err='';
            var cmd=child_process.spawn('lsof', ['-i','tcp:'+port,'-t'], {
                // cwd: deployPath
            }).on('close',  (code) =>{
                //console.log('close',code)
                resolve(pid);
            }).on('error',(e)=>{
                
                reject(e||err)
                
            });
            cmd.stdout.on('data',(r)=>{

                pid= r.toString();
                //console.log('data',pid)
                //resolve(pid)
            });

            cmd.stderr.on('data',  (e)=> {
                err+=e.toString();
                
                //reject(e)
            });

        })
    },
    killPort:async function(port){
        var pid=await this.lsof(port);
        return new Promise((resolve,reject)=>{
            child_process.spawn('kill', ['-9',pid-0], {
                
            }).on('close', function (code) {
                
                resolve()

            }).on('error',function(e,r){
                
                reject(e)

            })

        })
    },
    startApp:async function(json){
        var deployPath=json.deployDir+'/'+json.name;

        var logPath=json.logsDir+'/'+json.name+'.log';
        var nodeENV=process.env.NODE_ENV||'online';
        if(nodeENV=='online'){
            var out = fs.openSync(logPath, 'a');
            var err = fs.openSync(logPath, 'a');
            var env=process.env;
            env.NODE_ENV='online';
            var cmd=child_process.spawn('npm', ['start'], {
                env:env,
                cwd: deployPath,
                detached: true,
                stdio: [ 'ignore', out, err ]
            }).on('close', function (a,b) {

                //logger('startServer close',a)

            }).on('error',function(e){
                //fn(e)
                //logger('startServer error',e)
            });
            cmd.unref();

        }else{
            var deployPath=path.join(__dirname,'../../',json.name);
            var cmd=child_process.spawn('npm', ['start'], {
                env:process.env,
                cwd: deployPath,
                detached: true,
                //stdio: [ 'ignore', out, err ]
            }).on('close', function (a,b) {

                //logger('startServer close',a)

            }).on('error',function(e){
                //fn(e)
                //logger('startServer error',e)
            });
            cmd.unref();
        }

        
        //logger('startServer Done!')

        

        //fn(null)
    }
}