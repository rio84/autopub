/**
 * Created by wurui on 9/24/16.
 */
const child_process=require('child_process');

const fs=require('fs');
const path=require('path');
const tarDir=path.join(__dirname,'../data/tar')

const deployDir=path.join(__dirname,'../..');//'/Users/wurui/localhost/ox_apps';//'/Users/wurui/localhost/lab';

const logger=require('./logger')

module.exports={
    stopServer:function(port,fn){
/*
COMMAND     PID  USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
Google    80967 wurui   21u  IPv6 0x8c6f487f9df6b10b      0t0  TCP localhost:60476->localhost:28426 (ESTABLISHED)
node      80981 wurui   11u  IPv6 0x8c6f487f9edcc44b      0t0  TCP *:28426 (LISTEN)
node      80981 wurui   12u  IPv6 0x8c6f487f9df6a44b      0t0  TCP localhost:28426->localhost:60476 (ESTABLISHED)
*/
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
        //lsof -i tcp:28426 | grep LISTEN | awk -F ' ' '{print $2}'
        var cmd=child_process.exec(`lsof -i tcp:${port} | grep LISTEN | awk -F ' ' '{print $2}'`).on('close', function (code) {
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
    linkNodeModules:function(tagInfo,fn){
        logger('linkNodeModules start')
        var deployPath=deployDir+'/'+tagInfo.repos
        var cmd=child_process.spawn('ln', ['-s','../ox_app_tpl/node_modules','node_modules'], {
            cwd: deployPath
        }).on('close', function (r) {

            logger('linkNodeModules close',r)

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

        var logPath=deployPath+'/logs.log';

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
    release: function(tarPath,fn){
        logger('>>>>>>>>>>>>>>>>>>>>>deploy start')
        var deploy=this;
        var tmpdir=tarDir+'/tmp'+(new Date()).getTime();

        //var tarName=[tagInfo.owner,tagInfo.repos,tagInfo.version].join('-')+'.tar.gz';

        fs.mkdirSync(tmpdir);

        
        
        var tagInfo={tarPath:tarPath};
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
            if(!fs.existsSync(deployPath)){
                fs.mkdirSync(deployPath)
            }


           // logger(name);
            var tmpPath=tmpdir+'/'+tarfilename;
            child_process.spawnSync('rm',['-fr',deployPath+'/controller'])
            child_process.spawnSync('rm',['-fr',deployPath+'/lib'])
            child_process.spawnSync('rm',['-fr',deployPath+'/static'])

            child_process.spawnSync('mv',['-f',tmpPath+'/static',deployPath+'/static'])
            child_process.spawnSync('mv',['-f',tmpPath+'/controller',deployPath+'/controller'])
            child_process.spawnSync('mv',['-f',tmpPath+'/lib',deployPath+'/lib'])
            child_process.spawnSync('mv',['-f',tmpPath+'/app.js',deployPath+'/app.js'])
            child_process.spawnSync('mv',['-f',tmpPath+'/routes.js',deployPath+'/routes.js'])
            child_process.spawnSync('mv',['-f',tmpPath+'/package.json',deployPath+'/package.json'])

            if(!fs.existsSync(deployPath+'/data')){
                fs.mkdirSync(deployPath+'/data')
            }
            /*
            if(!fs.existsSync(deployPath+'/logs.log')){
                fs.mkdirSync(deployPath+'/logs.log')
            }*/
            
            cb(null,null)
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
            tagInfo.repos=tarfilename;
            tmpdir=tmpdir+'/'+tarfilename
            var tmpPath=tmpdir+'/'+tarfilename;
            var packageJSON=null;
            if(fs.existsSync(tmpPath+'/package.json')){
                packageJSON=JSON.parse(fs.readFileSync(tmpPath+'/package.json')||'null');
            }
            
            tagInfo.port=packageJSON.port;
            

            if(!fs.existsSync(deployDir)){
                logger('abort! No deployDir:'+deployDir)
                return fn('NOT Exists deploy dir `'+deployDir+'`')
            }


            /** if dependencies are not changed, copy node_modules from last deployDir
             * */

            var needNpmInstall=!fs.existsSync(deployDir+'/'+tagInfo.repos+'/node_modules');
     
            logger('needNpmInstall:',needNpmInstall)

            deploy.stopServer(tagInfo.port,function(){

                if(needNpmInstall){
                    coverDir(function(){
                        clearTemp();
                        deploy.linkNodeModules(tagInfo,function(){

                            deploy.startServer(tagInfo,fn)
                        })
                    });
                }else{
                    //child_process.spawnSync('mv',['-f',deployPath+'/node_modules',tmpPath])
                    coverDir(function(){
                        clearTemp();
                        deploy.startServer(tagInfo,fn)

                    });
                }

            })
            


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
    nginx_set_domain:async function(port,domain){
        
        const conf_file=path.join(__dirname,'../data/oxapp-nginx.conf');
        var content=fs.readFileSync(conf_file).toString();
        var begin_sign=`\n#${port} begin`,end_sign=`#${port} end\n`,
            split=content.split(begin_sign);
        if(split.length>1){
            content=split[0]+(split[1].split(end_sign)[1]||'');
        }
        if(domain){
            var conf_text=`${begin_sign}
server {
    listen 80;
    server_name ${domain};
    location / {
            proxy_set_header Host $host;
            proxy_pass http://127.0.0.1:${port}/;
            proxy_set_header X-Forwarded-For $remote_addr;
    }
}
${end_sign}`
            content+=conf_text;
        }

        fs.writeFileSync(conf_file,content);
        return await new Promise((resolve,reject)=>{
            var cmd=child_process.spawn('nginx', ['-s','reload'], {
                cwd: tarDir
            }).on('close', resolve).on('error',reject);
            cmd.stdout.on('data', function (data) {
                console.log('stdout: ' + data);
            });

            cmd.stderr.on('data', function (data) {
                console.log('stderr: ' + data);
                //logger('stderr: ' + data);
            });
        })
    },
    undeploy:async function(port,pjid){
        return await new Promise((resolve,reject)=>{
            this.stopServer(port,(err)=>{
                if(err){
                    return reject(err)
                }
                this.nginx_set_domain(port,'');
                child_process.spawnSync('rm',['-fr',deployDir+'/'+pjid])
                resolve(0)

            });
        })
        
        
    }
}
