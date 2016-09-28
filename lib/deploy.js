/**
 * Created by wurui on 9/24/16.
 */
var child_process=require('child_process');

var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var deployDir='/Users/wurui/localhost/lab';
var logsDir='/Users/wurui/localhost/logs'
var logger=require('./logger')

module.exports={
    stopServer:function(tagInfo,fn){

        var pid=null;
        child_process.spawn('lsof', ['-i','tcp:'+tagInfo.port,'-t'], {
            // cwd: deployPath
        }).on('close', function (code) {
            if(!pid){
                fn('not find pid')
            }else{
                logger('killing pid',pid)
                child_process.spawn('kill', ['-9',pid-0], {
                    //cwd: tarDir
                }).on('close', function (code) {
                    logger('kill close',code)
                    fn(null,code)

                }).on('error',function(e,r){
                    logger('kill error',e,r)
                    fn(e);

                })
            }

            //fn(null,r)

        }).on('error',function(e){

            logger('lsof error',e)
        }).stdout.on('data',function(r){
                pid= r.toString();
            })

    },
    npmInstall:function(tagInfo,fn){
        logger('cnpm install')
        var deployPath=deployDir+'/'+tagInfo.repos
        child_process.spawn('cnpm', ['install'], {
            cwd: deployPath
        }).on('close', function (r) {

            logger('npmInstall close',r)

            fn(null,r)

        }).on('error',function(e){
            logger('npmInstall error',e)

            fn(e)

        })
    },
    startServer:function(tagInfo,fn){
        var deployPath=deployDir+'/'+tagInfo.repos;

        var logPath=logsDir+'/'+tagInfo.repos+'.log';

        var out = fs.openSync(logPath, 'a');
        var err = fs.openSync(logPath, 'a');
        //node app.js -> npm start
        var cmd=child_process.spawn('npm', ['start'], {
            env:{
                NODE_ENV:'online'
            },
            cwd: deployPath,
            detached: true,
            stdio: [ 'ignore', out, err ]
        }).on('close', function (a,b) {

            logger('startServer close',a)

        }).on('error',function(e){
            //fn(e)
            logger('startServer error',e)
        });
        logger('startServer Done!')

        cmd.unref();

        fn(null)

    },
    release:function(tagInfo,fn){

        var deploy=this;
        var tmpdir=tarDir+'/tmp'+(new Date()).getTime();

        var tarName=[tagInfo.owner,tagInfo.repos,tagInfo.version].join('-')+'.tar.gz';

        fs.mkdirSync(tmpdir);

        var tarPath=tarDir+'/'+tarName;
        //var deployPath=deployDir+'/'+tagInfo.repos;

        var tarfilename;

        var coverDir=function(cb){
               var deployPath=deployDir+'/'+tagInfo.repos

               // logger(name);
                child_process.spawnSync('rm',['-fr',deployPath])

                fs.rename(tmpdir+'/'+tarfilename,deployPath,function(err,r){
                    logger('rename',err,r)
                    fs.unlinkSync(tarPath);
                    fs.rmdirSync(tmpdir);
                    cb(err,r)
                });
            },
            afterTar=function() {
                var result= fs.readdirSync(tmpdir);
                for(var i= 0,name;name=result[i++];){
                    if(!/^\./.test(name)){
                        tarfilename=name;
                        break
                    }
                }
                var tmpPath=tmpdir+'/'+tarfilename;
                var packageJSON=JSON.parse(fs.readFileSync(tmpPath+'/package.json')||'null');
                var autopubConf=JSON.parse(fs.readFileSync(tmpPath+'/autopub.json')||'null');
                if(!autopubConf){
                    return fn('`autopub.json` Not Found!')
                }


                deployDir=autopubConf.deployDir;
                logsDir=autopubConf.logsDir;
                tagInfo.port=autopubConf.port;

                if(!fs.existsSync(deployDir)){
                    return fn('NOT Exists deploy dir :'+deployDir)
                }


                /** if dependencies are not changed, copy node_modules from last deployDir
                 * */

                var deployPath=deployDir+'/'+tagInfo.repos,
                    jsonPath=deployPath+'/package.json',
                    lastPackageJSON,
                    needNpmInstall=true;
                if(packageJSON && packageJSON.dependencies
                    && fs.existsSync(deployPath)
                    && fs.existsSync(jsonPath)
                    && (lastPackageJSON=JSON.parse(fs.readFileSync(jsonPath)||'null'))
                ){
                    var lastDeps=lastPackageJSON.dependencies,
                        nowDeps=packageJSON.dependencies;
                    if(Object.keys(lastDeps).length == Object.keys(nowDeps).length ){
                        needNpmInstall=false;
                        for(var k in nowDeps){
                            if(nowDeps[k] != lastDeps[k]){
                                needNpmInstall=true;
                                break
                            }
                        }
                    }

                    //tagInfo.dependencies=packageJSON.dependencies;
                }

                logger('needNpmInstall:',needNpmInstall)

                deploy.stopServer(tagInfo,function(){

                    if(needNpmInstall){
                        coverDir(function(){
                            deploy.npmInstall(tagInfo,function(){
                                deploy.startServer(tagInfo,fn)
                            })
                        });
                    }else{
                        child_process.spawnSync('mv',['-f',deployPath+'/node_modules',tmpPath])
                        coverDir(function(){
                            deploy.startServer(tagInfo,fn)

                        });
                    }

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
