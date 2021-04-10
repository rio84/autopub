/**
 * Created by wurui on 9/24/16.
 */
var child_process=require('child_process');
var requirejs = require('requirejs');
var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var deployDir='/home/localhost/lab';
var logsDir='/home/localhost/logs'
var logger=require('./logger')

module.exports={
    stopServer:function(tagInfo,fn){

        var pids=[];
        var loop_kill=()=>{
            var pid=pids.shift();
            if(!pid){
                return fn(null)
            }
            child_process.spawn('kill', ['-9',pid-0], {
                //cwd: tarDir
            }).on('close', function (code) {
                logger('kill '+pid+' close',code)
                loop_kill()

            }).on('error',function(e,r){
                logger('kill '+pid+' error',e,r)
                loop_kill()
            });
        };
        var cmd=child_process.exec(`lsof -i tcp:${tagInfo.port} | grep LISTEN | awk -F ' ' '{print $2}'`).on('close', function (code) {
            pids=pids.join('').split('\n').filter(x=>!!x);
            if(!pids.length){
                fn('not find pid')
            }else{
                logger('killing pids',pids)
                loop_kill();
            }

            //fn(null,r)

        }).on('error',function(e){

            logger('lsof error',e)
        });
        cmd.stdout.on('data',function(r){
            //pids+=r.toString();
            pids.push(r.toString());
        });


        cmd.stderr.on('data', function (data) {
            logger('stderr: ' + data);
        });


    },
    npmInstall:function(tagInfo,fn){
        logger('npm install')
        var deployPath=deployDir+'/'+tagInfo.repos
        var cmd=child_process.spawn('npm', ['install','--production'], {
            cwd: deployPath
        }).on('close', function (r) {

            logger('npmInstall close',r)

            fn(null,r)

        }).on('error',function(e){
            //logger('npmInstall error',e)

            fn(e)

        });
        cmd.stdout.on('data', function (data) {
            //console.log('stdout: ' + data);
        });

        cmd.stderr.on('data', function (data) {
            //logger('stderr: ' + data);
        });
    },
    startServer:function(tagInfo,fn){
        var deployPath=deployDir+'/'+tagInfo.repos;

        var logPath=logsDir+'/'+tagInfo.repos+'.log';

        var out = fs.openSync(logPath, 'a');
        var err = fs.openSync(logPath, 'a');
        //node app.js -> npm start
        var env=process.env;
        env.NODE_ENV='online';
        var cmd=child_process.spawn('npm', ['start'], {
            env:env,
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

        //var tarName=[tagInfo.owner,tagInfo.repos,tagInfo.version].join('-')+'.tar.gz';

        fs.mkdirSync(tmpdir);

        var tarPath=tagInfo.tarPath;//tarDir+'/'+tarName;
        //var deployPath=deployDir+'/'+tagInfo.repos;

        var tarfilename;
        var clearTemp=function(){
            fs.unlink(tarPath,function(e){
                logger('unlink',tarPath,e)
            });
            
            var cmd=child_process.spawn('rm',['-fr',tmpdir])
            cmd.stdout.on('data', function (data) {
              logger('clearTemp stdout: ' + data);
            });

            cmd.stderr.on('data', function (data) {
              logger('clearTemp stderr: ' + data);
            });

            cmd.on('close', function (code) {
                if(code !=0){
                    logger('clearTemp close with code ',code)
                }else{

                }
            });
     
        };

        var coverDir=function(cb){

               var deployPath=deployDir+'/'+tagInfo.repos

               // logger(name);
                child_process.spawnSync('rm',['-fr',deployPath])

                fs.rename(tmpdir+'/'+tarfilename,deployPath,function(err,r){
                    logger('rename',err,r)
                  
                    cb(err,r)
                });
            },
            afterTar=function() {
                logger('tar ok')
                var result= fs.readdirSync(tmpdir);
                for(var i= 0,name;name=result[i++];){
                    if(!/^\./.test(name)){
                        tarfilename=name;
                        break
                    }
                }
                if(!tarfilename){
                    return fn('empty tar.gz!')
                }
                var tmpPath=tmpdir+'/'+tarfilename;
                var packageJSON=null;
                if(fs.existsSync(tmpPath+'/package.json')){
                    packageJSON=JSON.parse(fs.readFileSync(tmpPath+'/package.json')||'null');
                }
                /*

                var autopubConf=JSON.parse(fs.readFileSync(tmpPath+'/autopub.json')||'null');
                if(!autopubConf){
                    return fn('`autopub.json` Not Found!')
                }
                */
                var autopubConf=tagInfo;


                deployDir=autopubConf.deployDir;
                logsDir=autopubConf.logsDir;
                tagInfo.port=autopubConf.port;
                var isStatic=autopubConf.static;

                if(!fs.existsSync(deployDir)){
                    logger('abort! No deployDir:'+deployDir)
                    return fn('NOT Exists deploy dir `'+deployDir+'`')
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

                if(isStatic){
                    logger('isStatic')
                    /*
                    deploy.buildStatic(tmpPath,deployPath,function(buildErr){
                        if(buildErr){
                            coverDir(function(err,r){
                                logger('cover dir ok:',!err);
                                clearTemp();
                                fn(err)
                            });
                        }else{
                            logger('buildStatic done')
                            clearTemp();
                            fn(null)
                        }

                    });*/
                    if(needNpmInstall){
                        coverDir(function(){
                            clearTemp();
                            deploy.npmInstall(tagInfo,function(){

                                deploy.deployStatic(tagInfo,fn)
                            })
                        });
                    }else{
                        child_process.spawnSync('mv',['-f',deployPath+'/node_modules',tmpPath])
                        coverDir(function(){
                            clearTemp();
                            deploy.deployStatic(tagInfo,fn)

                        });
                    }
                    
                }else{
                    deploy.stopServer(tagInfo,function(){

                        if(needNpmInstall){
                            coverDir(function(){
                                clearTemp();
                                deploy.npmInstall(tagInfo,function(){

                                    deploy.startServer(tagInfo,fn)
                                })
                            });
                        }else{
                            child_process.spawnSync('mv',['-f',deployPath+'/node_modules',tmpPath])
                            coverDir(function(){
                                clearTemp();
                                deploy.startServer(tagInfo,fn)

                            });
                        }

                    })
                }


            };


        var cmd=child_process.spawn('tar', ['-xvf',tarPath,'-C',tmpdir], {
            cwd: tarDir
        }).on('close', afterTar).on('error',function(e){

            fn({
                type:'tar error',
                data: e.message
            })
        });

        cmd.stdout.on('data', function (data) {
            //console.log('stdout: ' + data);
        });

        cmd.stderr.on('data', function (data) {
            //logger('stderr: ' + data);
        });
    },
    buildStatic:function(tmpPath,deployPath,fn){
        var rjs_conf_file=tmpPath+'/rjs.json';;
        if(fs.existsSync(rjs_conf_file)){

            var config=fs.readFileSync(rjs_conf_file).toString();
            config=config && JSON.parse(config);
            if(!config){
                return fn('config error');
            }

            config.appDir=tmpPath;
            config.dir=deployPath;
            if(config.fileExclusionRegExp){
                config.fileExclusionRegExp=new RegExp(config.fileExclusionRegExp)    
            }
            logger('optimize start');

            requirejs.optimize(config, function (buildResponse) {
                //buildResponse is just a text output of the modules
                //included. Load the built file for the contents.
                //Use config.out to get the optimized file contents.
                //var contents = fs.readFileSync(config.out, 'utf8');
                fn(null)
            }, function(err) {
                //optimization err callback
                fn(err)
            });
            
        }else{
            fn('no config file')
        }

    },
    deployStatic:function(tagInfo,fn){
        var version=tagInfo.version;

        var deployPath=deployDir+'/'+tagInfo.repos;

        if(!fs.existsSync(deployPath+'/deploy.js')){
            return fn(null)
        }

        var cmd=child_process.spawn('node', ['deploy.js',version], {
            env:process.env,
            cwd: deployPath,
            detached: true,
           // stdio: [ 'ignore', out, err ]
        }).on('close', function (a,b) {

            logger('deployStatic close',a)
            fn(null)
        }).on('error',function(e){
            //fn(e)
            logger('deployStatic error',e)
            fn(e)
        });

     //   logger('deployStatic Done!')

    //    cmd.unref();


    },

}
