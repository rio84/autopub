/**
 * Created by wurui on 9/24/16.
 */
var request=require('request');
var jsonstore=require('../lib/jsonstore')
var deploy=require('../lib/deploy')
var fs=require('fs');
var path=require('path');
var tarDir=path.join(__dirname,'../data/tar')

var subscriber=require('../lib/subscriber')

var logger=require('../lib/logger')
module.exports.index=function(req,res,next){

};
var release=function(tagInfo,fn){
    if(!fs.existsSync(tarDir)){
        fs.mkdirSync(tarDir)
    }

    var owner=tagInfo.owner,
        repo=tagInfo.repos,
        version=tagInfo.version,
        tarball_url='https://api.github.com/repos/'+owner+'/'+repo+'/tarball/rls/'+version;
    var accessJson=jsonstore.r('git_token_'+repo);
    if(!accessJson || !accessJson.access_token ){
        return fn('no access_token for '+repo)
    }
    var access_token=accessJson.access_token;
    var headers={
        "User-Agent": 'autopub',
        Authorization: "token "+access_token,
        Accept: 'application/json'
    };
        //api='https://api.github.com/repos/'+owner+'/'+repo+'/tags';
    logger('!----------------------> Release start! '+repo+'@'+version+'] <--------------------!')

    try{
        var targzPath=tarDir+'/'+[owner,repo,version].join('-')+'.tar.gz';

        var targot=function(){
            logger('deploying')
            deploy.release(tagInfo,function(err,r){
                logger('callAll subscriber')
                subscriber.callAll({
                    owner:owner,
                    repos:repo,
                    version:version
                },function(result){
                    logger(result.join('\n'))
                    fn(err,r)
                });

            })
        };
        if(fs.existsSync(targzPath) && false){//不走这段,妈的!多此一举
            logger('tar.gz exists')
            targot();
        }else{
            logger('get tarball start')
            var totalLength,
                currentLength= 0,
                lastTS=Date.now();
            request({
                url:tarball_url,
                headers:headers
            }).on('response',function(response){

                totalLength=response.headers['content-length'];
                logger('response',totalLength)

            }).on('error',function(e){
                logger('error',totalLength)
                fn(e)
            }).on('data',function(buf){
                var percent='';
                currentLength+=buf.toString().length;
                if(totalLength){
                    percent=((currentLength/totalLength)*100).toFixed(2)+'%';
                }
                if(Date.now()-lastTS>5000) {
                    lastTS=Date.now();
                    logger(['progress:[', (currentLength||'unknown').toLocaleString(), 'of', (totalLength||'unknown').toLocaleString(), ']', percent].join(' '))
                }
            }).pipe(
                fs.createWriteStream(
                    targzPath
                )
            ).on('error',function(err){
                fn(err)
            }).on('close',function(err,result){
                logger(['progress:[', currentLength, 'of', totalLength, ']', '100%'].join(' '))
                targot();
            });
        }
    }catch(err){
        logger('catch error '+ err)
        fn(err)
    }

};


module.exports.test=function(req,res,next){
    logger('asdasfdasf')
    return res.send('ok')

    var access_token=jsonstore.r('git_token').access_token;
    var headers={
        "User-Agent": 'autopub',
        Authorization: "token "+access_token,
        Accept: 'application/json'
    };


    var owner='rio84',
        port='8000',
        repo='HiStock';
    var api='https://api.github.com/repos/'+owner+'/'+repo+'/tags';

    logger('api:',api)
    return request({
        url: api,
        headers: headers
    },function(err,response,body){
       // logger(response.statusCode,body)

        var json=JSON.parse(body);
        logger('tag got!')

//todo:
        var tag0=json[0];
        var matchName;//=tag0.name.match(/^rls\/((\d\.)*\d)$/)

        if(tag0 && (matchName=tag0.name.match(/^rls\/((\d\.)*\d)$/))){
            var targzPath=tarDir+'/'+[owner,repo,matchName[1]].join('-')+'.tar.gz';
            var gotTar=function(err,result){
                logger('deploying')
                deploy.release({
                    owner:owner,
                    repos:repo,
                    port:port,
                    tag:matchName[1]
                },function(err,r){
                    res.send({
                        error:err,
                        result:r
                    })
                })

            };
            if(fs.existsSync(targzPath)){
                gotTar();
            }else {
                logger('getting tarbll ' + tag0.name)
                request({
                    url: tag0.tarball_url,
                    headers: headers
                }).pipe(fs.createWriteStream(targzPath)).on('error', function (err) {

                    res.send({
                        code: 500,
                        error: err
                    })
                }).on('close', gotTar);
            }
        }else{
            res.send({code:response.statusCode,msg:'no tag'})
        }


       // res.send({code:response.statusCode,data:JSON.parse(body)})
    });


    
}
///repos/:owner/:repo/releases

module.exports.hook=function(req,res,next){
   // logger('query',req.query)
   // logger('body',req.body)
    var json=req.body;
    if(typeof json =='string'){
        json=JSON.parse(json);
    }
    var rlsReg=/refs\/tags\/rls\/(\d\.)*\d+$/
    var ref=json.ref;
    if(rlsReg.test(ref) ){
        if(json.deleted){
           return res.status(200).send('Do nothing! tag deleted!')
        }

        var version=ref.substr(ref.lastIndexOf('/')+1);
        try {
            release({
                owner: json.repository.owner.name,
                repos: json.repository.name,
                version: version
            }, function (err, r) {
                res.status(200).send(err || 'ok! version=' + version)
            })
        }catch(e){
            res.status(500).send(e)
        }
    }else{
        res.status(200).send('Do nothing! tag name is not match!')
    }

}