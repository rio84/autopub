/**
 * Created by wurui on 9/24/16.
 */
var child_process=require('child_process');

var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var deployDir='/Users/wurui/localhost/lab';
var logsDir='/Users/wurui/localhost/logs'

module.exports={
    stopServer:function(tagInfo,fn){

        var pid=null;
        child_process.spawn('lsof', ['-i','tcp:'+tagInfo.port,'-t'], {
            // cwd: deployPath
        }).on('close', function (code) {
            if(!pid){
                fn('not find pid')
            }else{
                console.log('killing pid',pid)
                child_process.spawn('kill', ['-9',pid-0], {
                    //cwd: tarDir
                }).on('close', function (code) {
                    console.log('kill close',code)
                    fn(null,code)

                }).on('error',function(e,r){
                    console.log('kill error',e,r)
                    fn(e);

                })
            }

            //fn(null,r)

        }).on('error',function(e){

            console.log('lsof error',e)
        }).stdout.on('data',function(r){
                pid= r.toString();
            })

    },
    npmInstall:function(tagInfo,fn){
        console.log('cnpm install')
        var deployPath=deployDir+'/'+tagInfo.repos
        child_process.spawn('cnpm', ['install'], {
            cwd: deployPath
        }).on('close', function (r) {

            console.log('npmInstall close',r)

            fn(null,r)

        }).on('error',function(e){
            console.log('npmInstall error',e)

            fn(e)

        })
    },
    startServer:function(tagInfo,fn){
        var deployPath=deployDir+'/'+tagInfo.repos;

        var logPath=logsDir+'/'+tagInfo.repos+'.log';

        var out = fs.openSync(logPath, 'a');
        var err = fs.openSync(logPath, 'a');
        var cmd=child_process.spawn('node', ['app.js'], {
            cwd: deployPath,
            detached: true,
            stdio: [ 'ignore', out, err ]
        }).on('close', function (a,b) {

            console.log('startServer close',a)

        }).on('error',function(e){
            //fn(e)
            console.log('startServer error',e)
        });

        cmd.unref();
        fn(null)

    },
    release:function(tagInfo,fn){

        var deploy=this;
        var tmpdir=tarDir+'/tmp'+(new Date()).getTime();
        var tarName=[tagInfo.owner,tagInfo.repos,tagInfo.tag].join('-')+'.tar.gz';
        fs.mkdirSync(tmpdir);

        var tarPath=tarDir+'/'+tarName;
        var deployPath=deployDir+'/'+tagInfo.repos

        var
            coverDir=function(cb){
                var result= fs.readdirSync(tmpdir);
                for(var i= 0,name;name=result[i++];){
                    if(!/^\./.test(name)){

                        break
                    }
                }

                child_process.spawnSync('rm',['-fr',deployPath])
               // console.log(name);
                fs.rename(tmpdir+'/'+name,deployPath,function(err,r){
                    console.log('rename',err,r)
                    fs.unlinkSync(tarPath);
                    fs.rmdirSync(tmpdir);
                    cb(err,r)
                });
            },
            afterTar=function() {
                deploy.stopServer(tagInfo,function(){
                    coverDir(function(){
                        deploy.npmInstall(tagInfo,function(){
                            deploy.startServer(tagInfo,fn)
                        })
                    });
                })
            };


        child_process.spawn('tar', ['-xvf',tarPath,'-C',tmpdir], {
            cwd: tarDir
        }).on('close', afterTar).on('error',function(e){

            fn({
                type:'tar error',
                data: e.message
            })
        })
    }
}
